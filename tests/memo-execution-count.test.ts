/*
 * memo precisa executar a função de cálculo o mesmo número de vezes no
 * servidor e no cliente.
 *
 * A assimetria antiga: memo fazia untrack(compute()) para ter o valor durante
 * o render e depois criava events(() => set(compute())). No cliente o events
 * roda na hora, então compute executava DUAS vezes; no servidor events() sai
 * cedo em SSR, então executava UMA. Com uma função que tem efeito colateral
 * -- como contar os cálculos -- o contador do cliente divergia do HTML do
 * servidor e a ilha reportava mismatch na hidratação.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { memo, signal } from "../packages/web/dist/reactive/reactive.js";
import {
  createEffectScope,
  flushEvents,
  runWithEffectScope,
} from "../packages/web/dist/reactive/events.js";

type Probe = {
  calls: () => number;
  read: () => any;
  flush: () => Promise<void>;
};

function probe(compute: () => any, ssrc = false): Probe {
  const saved = (globalThis as any).window;
  if (ssrc) delete (globalThis as any).window;
  else (globalThis as any).window = {};

  try {
    let calls = 0;
    let read: () => any = () => undefined;
    const scope = createEffectScope("memo-probe");

    runWithEffectScope(scope, () => {
      read = memo(() => {
        calls++;
        return compute();
      });
    });

    const flush = async () => {
      await Promise.resolve();
      flushEvents();
    };

    return { calls: () => calls, read, flush };
  } finally {
    if (saved === undefined) delete (globalThis as any).window;
    else (globalThis as any).window = saved;
  }
}

test("memo executa uma vez no cliente, igual ao servidor", async () => {
  const [a] = signal(2);
  const [b] = signal(3);

  const client = probe(() => a() * b(), false);
  const server = probe(() => a() * b(), true);

  assert.equal(client.calls(), 1, "valor disponivel durante o render");
  assert.equal(server.calls(), 1, "servidor tambem calcula uma vez");

  await client.flush();
  assert.equal(client.calls(), 1, "o effect inicial nao pode computar de novo");

  await server.flush();
  assert.equal(server.calls(), 1, "events() nao roda no servidor");

  client.read();
  server.read();
  assert.equal(client.calls(), 1, "ler o memo nao recomputa");
  assert.equal(client.read(), 6);
});

test("apos a mudanca de signal, memo recomputa uma unica vez", async () => {
  const [a, setA] = signal(2);
  const [b] = signal(3);

  const client = probe(() => a() * b(), false);
  assert.equal(client.calls(), 1);

  setA(3);
  await client.flush();
  assert.equal(client.calls(), 2, "uma recomputacao por mudanca");
  assert.equal(client.read(), 9);

  setA(4);
  await client.flush();
  assert.equal(client.calls(), 3);
  assert.equal(client.read(), 12);
});

test("memo que nao le nada nao quebra", async () => {
  const p = probe(() => "constante", false);
  assert.equal(p.calls(), 1);
  await p.flush();
  assert.equal(p.calls(), 1);
  assert.equal(p.read(), "constante");
});

test("memo que le um store continua reagindo", async () => {
  const [a, setA] = signal(1);
  const p = probe(() => (a() > 0 ? "positivo" : "zero"), false);

  assert.equal(p.read(), "positivo");
  setA(0);
  await p.flush();
  assert.equal(p.read(), "zero");
  assert.equal(p.calls(), 2);
});

test("efeito colateral de memo nao diverge mais entre ssr e client", async () => {
  // Este e o cenario real do exemplo: o memo conta os proprios calculos.
  const [a, setA] = signal(2);
  const [b] = signal(3);
  const [calculos, setCalculos] = signal(0);
  const compute = () => {
    setCalculos((n) => n + 1);
    return a() * b();
  };

  const client = probe(compute, false);
  const server = probe(compute, true);
  await client.flush();
  await server.flush();

  assert.equal(client.calls(), server.calls(), "mesma contagem nos dois lados");
  assert.equal(client.calls(), 1);
});
