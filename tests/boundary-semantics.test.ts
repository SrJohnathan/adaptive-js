/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Semantica da flag ADAPTIVE_ENABLED_CLIENT. Ela existe para poder desligar a
 * construcao das islands "client" durante o desenvolvimento, mas nao pode
 * desligar "hydrate" - hydrate significa "o server renderizou, o client assume
 * depois", entao sempre executa.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { renderToString } from "@adaptive-js/ssr";
import { jsx, Fragment } from "@adaptive-js/jsx";
import { isClientEnabled } from "@adaptive-js/web";
import {
  createClientComponent,
  createHydrateComponent,
} from "../packages/web/dist/index.js";


/** Componente real usado nos testes: sem ele o boundary nao tem o que renderizar. */
const REAL = () => ({ tag: "div", props: {}, children: ["conteudo real"] });

function withEnv<T>(value: string | undefined, fn: () => T): T {
  const proc = (globalThis as any).process;
  const had = Object.prototype.hasOwnProperty.call(proc.env, "ADAPTIVE_ENABLED_CLIENT");
  const before = proc.env.ADAPTIVE_ENABLED_CLIENT;

  if (value === undefined) delete proc.env.ADAPTIVE_ENABLED_CLIENT;
  else proc.env.ADAPTIVE_ENABLED_CLIENT = value;

  try {
    return fn();
  } finally {
    if (had) proc.env.ADAPTIVE_ENABLED_CLIENT = before;
    else delete proc.env.ADAPTIVE_ENABLED_CLIENT;
  }
}

test("flag ligada por padrao", () => {
  withEnv(undefined, () => {
    assert.equal(isClientEnabled(), true);
  });
});

test("'0' e 'false' desligam, ignorando caixa e espacos", () => {
  // isClientEnabled normaliza com toLowerCase().trim(): o .env nao precisa
  // acertar a casse nem ter espaco sobrando, e continua desligando.
  for (const v of ["0", "false", "FALSE", "False", "false ", " 0 "]) {
    withEnv(v, () =>
      assert.equal(isClientEnabled(), false, `valor ${JSON.stringify(v)} deveria desligar`),
    );
  }
});

test("qualquer outro valor mantem ligado", () => {
  for (const v of ["1", "true", "no", "nao", "on", ""]) {
    withEnv(v, () => {
      assert.equal(isClientEnabled(), true, `valor ${JSON.stringify(v)} deveria manter ligado`);
    });
  }
});

test("client com serverRender executa no server quando a flag liga", () => {
  const html = withEnv("1", () => {
    const C = createClientComponent("components/client", "C", REAL);
    return renderToString({ tag: "div", props: {}, children: [C()] });
  });
  assert.match(html, /adaptive-client-start:/);
  assert.match(html, /conteudo real/, "flag ligada: o serverRender entra no HTML");
});

test("client sem serverRender so emite marcador", () => {
  const html = withEnv("1", () => {
    const C = createClientComponent("components/client", "C");
    return renderToString({ tag: "div", props: {}, children: [C()] });
  });
  assert.match(html, /adaptive-client-start:/);
  assert.doesNotMatch(html, /conteudo real/, "sem serverRender nao ha o que renderizar");
});

test("client desligado troca serverRender por placeholder", () => {
  const html = withEnv("0", () => {
    const C = createClientComponent("components/client", "C", REAL);
    return renderToString({ tag: "div", props: {}, children: [C()] });
  });
  assert.match(html, /data-adaptive-client-placeholder/, "o placeholder marca onde a ilha vai");
  assert.match(html, /client island/);
  assert.doesNotMatch(html, /conteudo real/, "flag off: o serverRender nao pode executar");
});

test("placeholder so aparece em modo client", () => {
  const html = withEnv("0", () => {
    const H = createHydrateComponent("components/hydrate", "H", REAL);
    return renderToString({ tag: "div", props: {}, children: [H()] });
  });
  assert.doesNotMatch(html, /data-adaptive-client-placeholder/);
  assert.match(html, /conteudo real/, "hydrate nunca vira placeholder");
});

test("hydrate executa mesmo com a flag desligada", () => {
  for (const flag of ["1", "0", "false"]) {
    const html = withEnv(flag, () => {
      const H = createHydrateComponent("components/hydrate", "H", REAL);
      return renderToString({ tag: "div", props: {}, children: [H()] });
    });
    assert.match(html, /conteudo real/, `hydrate falhou com flag=${flag}`);
    assert.doesNotMatch(html, /client island/, `hydrate virou placeholder com flag=${flag}`);
  }
});

test("hydrate pai renderiza e emite marcador do client filho", () => {
    // Quem aninha a ilha filha e o componente pai: createBoundary tira `children`
    // das props, entao passar a ilha por prop nao alcanca o SSR.
    const Inner = createClientComponent("components/client", "Inner", REAL);
    const Outer = () => jsx(Fragment, { children: Inner() });
  
    const html = withEnv("1", () => {
      const H = createHydrateComponent("components/hydrate", "H", Outer);
      return renderToString({ tag: "div", props: {}, children: [H()] });
    });
  
    assert.match(html, /mode%22%3A%22hydrate/);
    assert.match(html, /mode%22%3A%22client/, "o client filho emite o proprio marcador");
    assert.equal(
      (html.match(/adaptive-client-start:/g) ?? []).length,
      2,
      "os dois boundaries devem ser emitidos",
    );

    // hydrate pai tem id, client filho nao: o client monta do zero.
    assert.match(html, /boundaryId%22%3A%22b0/, "hydrate recebe boundaryId");
    assert.match(html, /exportName%22%3A%22Inner%22%2C%22rawProps%22%3A%22%7B%7D%22%2C%22hasChildren%22%3Afalse%2C%22boundaryId%22%3A%22%22/, "client nao recebe boundaryId");
  });
