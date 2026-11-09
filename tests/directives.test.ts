/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Parser de diretivas do ci. Decisao de projeto: Adaptive usa exatamente
 * 'client' e 'hydrate'. Os aliases "use client"/"use hydrate" do React NAO sao
 * aceitos de proposito - o teste abaixo fixa esse comportamento para ninguem
 * reintroduzir por engano.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  getHydratableDirective,
  stripHydrateDirective,
  stripClientDirective,
} from "../packages/ci/dist/utilly.js";

test("reconhece 'client' e 'hydrate' nas duas formas de aspas", () => {
  assert.equal(getHydratableDirective("'client'\nexport const A = 1"), "client");
  assert.equal(getHydratableDirective('"client"\nexport const A = 1'), "client");
  assert.equal(getHydratableDirective("'hydrate'\nexport const A = 1"), "hydrate");
  assert.equal(getHydratableDirective('"hydrate"\nexport const A = 1'), "hydrate");
});

test("tolera ponto e virgula, espacos e comentarios antes", () => {
  assert.equal(getHydratableDirective("'client';\nexport const A = 1"), "client");
  assert.equal(getHydratableDirective("  \n\t 'hydrate' \n export const A = 1"), "hydrate");
  assert.equal(
    getHydratableDirective("// comentario\n'client'\nexport const A = 1"),
    "client",
  );
  assert.equal(
    getHydratableDirective("/* bloco */\n'client'\nexport const A = 1"),
    "client",
  );
});

test("aliases do React sao rejeitados de proposito", () => {
  assert.equal(getHydratableDirective('"use client"\nexport const A = 1'), null);
  assert.equal(getHydratableDirective('"use hydrate"\nexport const A = 1'), null);
});

test("string solta nao e diretiva", () => {
  assert.equal(getHydratableDirective("client\nexport const A = 1"), null);
  assert.equal(getHydratableDirective("hydrate"), null);
  assert.equal(getHydratableDirective("'clientista'\nexport const A = 1"), null);
});

test("diretiva que nao e a primeira sentenca nao vale", () => {
  assert.equal(getHydratableDirective("import x from 'y';\n'client'\n"), null);
});

test("arquivo sem diretiva devolve null", () => {
  assert.equal(getHydratableDirective("export const A = 1"), null);
  assert.equal(getHydratableDirective(""), null);
});

test("strip remove a diretiva e nao toca no resto", () => {
  assert.equal(stripHydrateDirective("'hydrate'\nexport const A = 1"), "export const A = 1");
  assert.equal(stripClientDirective("'client';\nexport const A = 1"), "export const A = 1");
});

test("strip remove so a primeira diretiva", () => {
  const src = "'client'\nconst x = 'hydrate';\n";
  const out = stripClientDirective(src);
  assert.equal(out, "const x = 'hydrate';\n", "string depois da diretiva nao pode ser removida");
});

test("strip sem diretiva devolve a fonte intacta", () => {
  const src = "export const A = 1";
  assert.equal(stripHydrateDirective(src), src);
});

test("strip remove bloco de comentario que precedia a diretiva", () => {
  const out = stripClientDirective("// c1\n/* c2 */\n'client'\nexport const A = 1");
  assert.equal(out, "export const A = 1");
});
