/*
 * Segurança do endpoint de server actions.
 *
 * O handler executa código do servidor a partir de um POST. A única defesa
 * contra CSRF é comparar a origem. Se o header Origin não vem, a comparação
 * inteira é pulada e a action roda sem verificação nenhuma — foi o que o curl
 * sem Origin mostrou: 200.
 *
 * Navegador sempre manda Sec-Fetch-Site, mesmo sem Origin (Safari antigo não
 * mandava Origin em POST same-origin). Então a regra aceita qualquer um dos
 * dois, e rejeita quando não dá para determinar nada.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

import { handle_actions_request } from "../packages/runtime/dist/actions/handle_actions_request.js";

const ACTIONS_FILE = `
"use server";

export const somar = (a, b) => a + b;
export const verContexto = (msg, ctx) => ({
  temContexto: Boolean(ctx),
  metodo: ctx?.request?.method ?? null,
});
export const falhar = () => {
  throw new Error("stack interno que nao deve vazar");
};
`;

let serverDir: string;

async function setup() {
  const root = path.join(process.cwd(), "dist-test", "actions-fixture");
  serverDir = path.join(root, "server");
  const srcDir = path.join(root, "src");
  await fs.mkdir(path.join(srcDir, "actions"), { recursive: true });
  await fs.mkdir(serverDir, { recursive: true });
  await fs.writeFile(path.join(srcDir, "actions", "index.ts"), ACTIONS_FILE, "utf8");
  await fs.writeFile(
    path.join(serverDir, "server-modules.json"),
    JSON.stringify(["actions/index"]),
    "utf8",
  );
  return { srcDir, serverBuildDir: serverDir };
}

function call(overrides: any) {
  return handle_actions_request({
    moduleId: "actions/index",
    actionName: "somar",
    args: [2, 3],
    isProduction: false,
    sourceDir: "",
    serverBuildDir: "",
    ...overrides,
  });
}

const JSON_CT = { "content-type": "application/json" };

test("action legitima com origin da propria pagina roda", async () => {
  const { srcDir, serverBuildDir } = await setup();
  const res = await call({
    sourceDir: srcDir,
    serverBuildDir,
    request: { method: "POST", headers: { ...JSON_CT, host: "localhost:3000", origin: "http://localhost:3000" } },
  });
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { ok: true, data: 5 });
});

test("sem Origin e sem Sec-Fetch-Site: rejeitado", async () => {
  // Era o buraco: o if (origin) pulava toda a verificacao.
  const { srcDir, serverBuildDir } = await setup();
  const res = await call({
    sourceDir: srcDir,
    serverBuildDir,
    request: { method: "POST", headers: { ...JSON_CT, host: "localhost:3000" } },
  });
  assert.equal(res.status, 403, "sem nenhuma informacao de origem nao pode executar");
  assert.equal(res.body.ok, false);
  assert.equal((res.body as any).error, "ORIGIN_UNVERIFIABLE");
});

test("Sec-Fetch-Site same-origin basta, sem Origin", async () => {
  // Safari antigo nao mandava Origin em POST same-origin.
  const { srcDir, serverBuildDir } = await setup();
  const res = await call({
    sourceDir: srcDir,
    serverBuildDir,
    request: { method: "POST", headers: { ...JSON_CT, host: "localhost:3000", "sec-fetch-site": "same-origin" } },
  });
  assert.equal(res.status, 200);
});

test("Sec-Fetch-Site same-site de outra porta nao basta", async () => {
  const { srcDir, serverBuildDir } = await setup();
  const res = await call({
    sourceDir: srcDir,
    serverBuildDir,
    request: { method: "POST", headers: { ...JSON_CT, host: "localhost:3000", "sec-fetch-site": "same-site" } },
  });
  assert.equal(res.status, 403);
});

test("escape hatch por env para quem chama de servidor para servidor", async () => {
  const { srcDir, serverBuildDir } = await setup();
  const before = process.env.ADAPTIVE_ACTION_ALLOW_NO_ORIGIN;
  process.env.ADAPTIVE_ACTION_ALLOW_NO_ORIGIN = "1";
  try {
    const res = await call({
      sourceDir: srcDir,
      serverBuildDir,
      request: { method: "POST", headers: { ...JSON_CT, host: "localhost:3000" } },
    });
    assert.equal(res.status, 200, "backend chamando backend nao tem Origin");
  } finally {
    if (before === undefined) delete process.env.ADAPTIVE_ACTION_ALLOW_NO_ORIGIN;
    else process.env.ADAPTIVE_ACTION_ALLOW_NO_ORIGIN = before;
  }
});

test("contexto chega como ultimo argumento", async () => {
  const { srcDir, serverBuildDir } = await setup();
  const res = await call({
    sourceDir: srcDir,
    serverBuildDir,
    actionName: "verContexto",
    args: ["oi"],
    request: { method: "POST", headers: { ...JSON_CT, host: "localhost:3000", origin: "http://localhost:3000" } },
  });
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { ok: true, data: { temContexto: true, metodo: "POST" } });
});

test("erro da action vaza mensagem em dev e nao em producao", async () => {
  const { srcDir, serverBuildDir } = await setup();
  const headers = { ...JSON_CT, host: "localhost:3000", origin: "http://localhost:3000" };

  const dev = await call({ sourceDir: srcDir, serverBuildDir, actionName: "falhar", args: [], request: { method: "POST", headers } });
  assert.equal(dev.status, 500);
  assert.match((dev.body as any).message, /stack interno/);

  const prod = await call({
    sourceDir: srcDir,
    serverBuildDir,
    actionName: "falhar",
    args: [],
    isProduction: true,
    request: { method: "POST", headers },
  });
  assert.equal(prod.status, 500);
  assert.equal((prod.body as any).message, "An unexpected error occurred.", "stack nao pode vazar em producao");
});

test("producao exige o manifesto de server modules", async () => {
  const { srcDir, serverBuildDir } = await setup();
  const res = await call({
    sourceDir: srcDir,
    serverBuildDir: path.join(serverDir, "nao-existe"),
    isProduction: true,
    request: { method: "POST", headers: { ...JSON_CT, host: "localhost:3000", origin: "http://localhost:3000" } },
  });
  assert.equal(res.status, 403);
});
