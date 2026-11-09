/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Contrato entre o SSR e o client. O SSR emite o comentário
 * <!--adaptive-client-start:PAYLOAD--> e o client faz o parse em
 * web/hy/boundary/discovery.ts. Nao existe tipo compartilhado entre os dois
 * lados - o unico vinculo e essa string -, entao qualquer mudanca em um dos lados
 * sem o outro so aparece em runtime, como ilha que nao hidrata.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { renderToString } from "@adaptive-js/ssr";
import { jsx, Fragment } from "@adaptive-js/jsx";
import {
  createClientComponent,
  createHydrateComponent,
} from "@adaptive-js/web";
import {
  CLIENT_BOUNDARY_START_PREFIX,
  CLIENT_BOUNDARY_END,
} from "@adaptive-js/shared";
import { decodeCommentPayload } from "../packages/web/dist/hy/boundary/discovery.js";

function extractBoundaries(html: string) {
  const out: { payload: string; inner: string }[] = [];
  const re = new RegExp(
    `<!--${CLIENT_BOUNDARY_START_PREFIX}([^>]*?)-->([\\s\\S]*?)<!--${CLIENT_BOUNDARY_END}-->`,
    "g",
  );
  for (const m of html.matchAll(re)) {
    out.push({ payload: m[1]!, inner: m[2]! });
  }
  return out;
}

test("payload do marcador sobrevive ao round-trip encode/decode", () => {
  const html = renderToString({
    tag: "div",
    props: {},
    children: [createClientComponent("components/client", "ClientComponet")({ nome: "Ana" })],
  });

  const found = extractBoundaries(html);
  assert.equal(found.length, 1, "deve emitir exatamente um marcador");

  const decoded = decodeCommentPayload(found[0]!.payload);
  assert.notEqual(decoded, null, "decodeCommentPayload nao pode devolver null para payload emitido pelo SSR");
  assert.equal(decoded!.mode, "client");
  assert.equal(decoded!.moduleId, "components/client");
  assert.equal(decoded!.exportName, "ClientComponet");
  assert.equal(decoded!.hasChildren, false);
  assert.deepEqual(JSON.parse(decoded!.rawProps), { nome: "Ana" });
});

test("modo hydrate recebe boundaryId sequencial", () => {
  const A = createHydrateComponent("components/hydrate", "A");
  const B = createHydrateComponent("components/hydrate", "B");

  const html = renderToString({
    tag: "div",
    props: {},
    children: [A(), B()],
  });

  const ids = extractBoundaries(html).map(
    (b) => decodeCommentPayload(b.payload)!.boundaryId,
  );

  assert.deepEqual(ids, ["b0", "b1"], "cada boundary hydrate precisa de id unico e estavel");
});

test("modo client nunca recebe boundaryId", () => {
  const C = createClientComponent("components/client", "C");
  const html = renderToString({ tag: "div", props: {}, children: [C()] });
  const decoded = decodeCommentPayload(extractBoundaries(html)[0]!.payload)!;

  assert.equal(decoded.mode, "client");
  assert.equal(decoded.boundaryId, "", "client nao hidrata DOM existente, entao nao tem id");
});

test("props com caracteres especiais nao quebram o payload", () => {
  const C = createClientComponent("components/client", "C");
  const nasty = {
    texto: 'aspas " e \\ barra',
    html: "<script>alert(1)</script>",
    unicode: "acentuação — ção ✓ 😀",
    novaLinha: "linha1\nlinha2",
    chaveComPonto: "a.b.c",
  };

  const html = renderToString({ tag: "div", props: {}, children: [C(nasty)] });
  const decoded = decodeCommentPayload(extractBoundaries(html)[0]!.payload)!;

  assert.deepEqual(JSON.parse(decoded.rawProps), nasty);
});

test("hasChildren reflete props.children nao a quantidade de filhos", () => {
  const C = createClientComponent("components/client", "C");

  const sem = extractBoundaries(
    renderToString({ tag: "div", props: {}, children: [C()] }),
  )[0]!;
  assert.equal(decodeCommentPayload(sem.payload)!.hasChildren, false);

  const com = extractBoundaries(
    renderToString({
      tag: "div",
      props: {},
      children: [C({ children: ["texto"] })],
    }),
  )[0]!;
  assert.equal(decodeCommentPayload(com.payload)!.hasChildren, true);
});

test("payload corrompido devolve null em vez de estourar", () => {
  assert.equal(decodeCommentPayload("nao-e-json"), null);
  assert.equal(decodeCommentPayload("%E0%A4%A"), null, "percent-encoding invalido");
});

test("children passados como prop nao aninham - quem aninha e o componente", () => {
  // createBoundary tira `children` das props antes de chamar o componente: quem
  // decide o que existe dentro da ilha e o proprio componente.
  const Inner = createClientComponent("components/client", "Inner", () => null);
  const Outer = createHydrateComponent("components/hydrate", "Outer", () => jsx(Fragment, { children: Inner() }));

  const html = renderToString({ tag: "div", props: {}, children: [Outer()] });

  assert.equal(
    (html.match(new RegExp(`<!--${CLIENT_BOUNDARY_START_PREFIX}`, "g")) ?? []).length,
    2,
    "hydrate contendo client deve emitir 2 marcadores de abertura",
  );

  // Regex plano nao serve para aninhamento: ele casa o externo e para no end
  // interno. Por isso discovery.ts usa skipNestedBoundary antes de continuar.
  const flat = extractBoundaries(html);
  assert.equal(flat.length, 1);
  assert.equal(decodeCommentPayload(flat[0]!.payload)!.mode, "hydrate");
  assert.match(flat[0]!.inner, new RegExp(`<!--${CLIENT_BOUNDARY_START_PREFIX}`), "o interno esta dentro do externo");
});

test("client dentro de hydrate recebe id proprio, diferente do pai", () => {
  const Inner = createClientComponent("components/client", "Inner", () => null);
  const Outer = createHydrateComponent("components/hydrate", "Outer", () => jsx(Fragment, { children: Inner() }));

  const html = renderToString({ tag: "div", props: {}, children: [Outer()] });
  const ids = [...html.matchAll(new RegExp(`<!--${CLIENT_BOUNDARY_START_PREFIX}([^>]*?)-->`, "g"))]
    .map((m) => decodeCommentPayload(m[1]!)!.boundaryId);

  assert.deepEqual(ids, ["b0", ""], "hydrate pai tem id, client nao");
});
