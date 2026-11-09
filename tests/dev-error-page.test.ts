/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * A pagina de erro do dev server e montada com a mensagem do compilador dentro
 * de um <pre>. Se o escape falhar, um erro de compilacao com "<" no texto - que
 * acontece com JSX mal formado, justamente o caso mais comum - vira HTML
 * executavel. Estes testes existem para travar o escape.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  setDevBuildError,
  clearDevBuildError,
  getDevBuildError,
  renderDevErrorHtml,
} from "../packages/ci/dist/dev-error.js";

test("estado do erro: set, get e clear", () => {
  clearDevBuildError();
  assert.equal(getDevBuildError(), null);

  const parsed = setDevBuildError({ message: "algo quebrou" });
  assert.equal(parsed!.message, "algo quebrou");
  assert.equal(getDevBuildError()!.message, "algo quebrou");

  clearDevBuildError();
  assert.equal(getDevBuildError(), null);
});

test("codeframes do compilador viram detalhes", () => {
  const parsed = setDevBuildError({
    message: "Failed to transform a.tsx",
    sourcePath: "/app/a.tsx",
    errors: [{ codeframe: "  x Unexpected token" }, { message: "fallback sem codeframe" }],
  });

  assert.equal(parsed!.sourcePath, "/app/a.tsx");
  assert.equal(parsed!.details.length, 2);
  assert.match(parsed!.details[0]!, /Unexpected token/);
  assert.match(parsed!.details[1]!, /fallback/);
});

test("erro sem format keeps a message", () => {
  const parsed = setDevBuildError("string simples");
  assert.equal(typeof parsed!.message, "string");
  assert.ok(parsed!.message.length > 0);
});

test("HTML com script na mensagem fica escapado", () => {
  const evil = setDevBuildError({
    message: "Unexpected token <script>alert('xss')</script>",
    errors: [{ codeframe: "<img src=x onerror=alert(1)>" }],
  })!;
  const html = renderDevErrorHtml(evil);

  assert.doesNotMatch(html, /<script>/, "tag real de script nao pode chegar ao HTML");
  assert.doesNotMatch(html, /<img/, "tag real de img nao pode chegar ao HTML");
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&lt;img/);
});

test("mensagem com & e aspas nao quebra o HTML", () => {
  const html = renderDevErrorHtml(
    setDevBuildError({ message: `a & b "aspas" 'simples'` })!,
  );
  assert.match(html, /&amp;/);
  assert.doesNotMatch(html, /a & b/);
});

test("codigo na mensagem aparece como texto legivel", () => {
  const html = renderDevErrorHtml(
    setDevBuildError({ message: "Cannot find module './x'" })!,
  );
  assert.match(html, /Cannot find module/);
  assert.match(html, /Erro de compilacao/);
});

test("codeframe e renderizado em pre, nao como texto solto", () => {
  const html = renderDevErrorHtml(
    setDevBuildError({
      message: "err",
      errors: [{ codeframe: "1 | const a = <div>" }],
    })!,
  );
  assert.match(html, /<pre/);
  assert.match(html, /1 \| const a = &lt;div&gt;/);
});

test("detalhe undefined nao quebra a renderizacao", () => {
  const parsed = setDevBuildError({ message: "m", errors: [] })!;
  const html = renderDevErrorHtml(parsed);
  assert.match(html, /<div/);
  assert.match(html, /<\/div>/);
});

test("mensagem vazia ainda produz pagina", () => {
  const html = renderDevErrorHtml(setDevBuildError({ message: "" })!);
  assert.match(html, /Erro de compilacao/);
});
