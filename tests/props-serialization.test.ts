/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Round-trip de props: serializeClientProps -> JSON -> parseClientProps.
 * Tudo que nao sobrevive a essa volta chega no client como undefined e some do
 * props, sem erro. Por isso os casos "degradado" tambem sao testados.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  serializeClientProps,
  parseClientProps,
  stripChildrenFromProps,
} from "../packages/web/dist/hy/boundary/props-serialization.js";

function roundTrip(props: Record<string, any>) {
  return parseClientProps(serializeClientProps(props));
}

test("primitivos fazem round-trip exato", () => {
  const input = {
    texto: "oi",
    numero: 42,
    decimal: 1.5,
    verdadeiro: true,
    falso: false,
    nulo: null,
    vazio: "",
  };
  assert.deepEqual(roundTrip(input), input);
});

test("undefined e omitido nao viram chave", () => {
  const out = roundTrip({ a: undefined, b: 1 });
  assert.equal("a" in out, false, "undefined deve ser removido, nao serializado como null");
  assert.deepEqual(out, { b: 1 });
});

test("Date volta como Date", () => {
  const d = new Date("2026-03-15T10:30:00.000Z");
  const out = roundTrip({ quando: d });
  assert.ok(out.quando instanceof Date, "reviveValue precisa reconstruir o Date");
  assert.equal(out.quando.toISOString(), d.toISOString());
});

test("BigInt volta como BigInt", () => {
  const out = roundTrip({ grande: 9007199254740993n });
  assert.equal(typeof out.grande, "bigint");
  assert.equal(out.grande, 9007199254740993n);
});

test("funcoes e symbols sao descartados", () => {
  const out = roundTrip({ onClick: () => {}, sym: Symbol("x"), ok: 1 });
  assert.equal("onClick" in out, false);
  assert.equal("sym" in out, false);
  assert.deepEqual(out, { ok: 1 });
});

test("referencia circular nao lanca", () => {
  const a: any = { nome: "a" };
  a.self = a;
  const raw = serializeClientProps({ a });
  const out = parseClientProps(raw);
  assert.equal(out.a.nome, "a");
  assert.equal(out.a.self, undefined, "circular vira undefined em vez de estourar");
});

test("estrutura aninhada preserva forma", () => {
  const input = {
    usuario: { nome: "Ana", tags: ["a", "b"], meta: { ativo: true } },
    lista: [1, { x: 2 }],
  };
  assert.deepEqual(roundTrip(input), input);
});

test("chave 'ref' nunca e serializada", () => {
  const out = roundTrip({ ref: { current: null }, visivel: true });
  assert.equal("ref" in out, false, "ref e um canal do cliente, nao prop serializavel");
  assert.deepEqual(out, { visivel: true });
});

test("string vazia de payload nao lanca", () => {
  assert.deepEqual(parseClientProps(""), {});
});

test("JSON invalido devolve objeto vazio", () => {
  assert.deepEqual(parseClientProps("{quebrado"), {});
  assert.deepEqual(parseClientProps("null"), {});
});

test("stripChildrenFromProps nao muta a entrada", () => {
  const input = { children: ["x"], a: 1 };
  const out = stripChildrenFromProps(input);
  assert.equal("children" in out, false);
  assert.equal("children" in input, true, "a entrada original nao pode ser alterada");
  assert.equal(out.a, 1);
});

test("stripChildrenFromProps sem children devolve a mesma referencia", () => {
  const input = { a: 1 };
  assert.equal(stripChildrenFromProps(input), input);
});

test("parseClientProps nao executa codigo do payload", () => {
  // O payload vem do HTML; um atacante que consiga injeta-lo nao deve ganhar
  // execucao. __proto__ precisa ser tratado como chave comum.
  const raw = JSON.stringify({ __proto__: { polluto: true }, ok: 1 });
  const out = parseClientProps(raw);
  assert.equal(({} as any).polluto, undefined, "nao pode polluir Object.prototype");
  assert.equal(out.ok, 1);
});
