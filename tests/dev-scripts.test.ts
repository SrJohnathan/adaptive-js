/*
 * Scripts injetados no HTML de dev.
 *
 * O painel de hydration e o live reload viajam como string dentro de um <script>.
 * String não é validada pelo compilador: um erro de sintaxe só aparece no
 * browser, e aí o painel que existe pra mostrar erro some junto com ele.
 *
 * new Function() faz parse sem executar, que é exatamente o teste necessário.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { createDevHydrationPanelScript, createDevLiveReloadScript } from "@adaptive-js/ci/dev";

function bodyOf(html: string): string {
  const open = html.indexOf(">");
  const close = html.lastIndexOf("</script>");
  assert.ok(open > 0 && close > open, "o script precisa ter corpo");
  return html.slice(open + 1, close);
}

test("painel de hydration gera JS sintaticamente valido", () => {
  const script = bodyOf(createDevHydrationPanelScript());
  assert.doesNotThrow(() => new Function(script), "o painel nao pode ter erro de sintaxe");
});

test("script de live reload gera JS sintaticamente valido", () => {
  const script = bodyOf(createDevLiveReloadScript("build-1"));
  assert.doesNotThrow(() => new Function(script));
});

test("painel escuta os dois eventos que o runtime dispara", () => {
  const script = bodyOf(createDevHydrationPanelScript());
  assert.match(script, /adaptive:hydration-error/);
  assert.match(script, /adaptive:hydration-mismatch/);
});

test("painel tambem pega erro que escapou do try\\/catch do runtime", () => {
  const script = bodyOf(createDevHydrationPanelScript());
  assert.match(script, /addEventListener\("error"/);
  assert.match(script, /addEventListener\("unhandledrejection"/);
});

test("painel nao recarrega a pagina e nao usa fetch", () => {
  const script = bodyOf(createDevHydrationPanelScript());
  // A decisão foi painel local: nada de round trip nem reload, que esconderia
  // o estado real da ilha quebrada.
  assert.doesNotMatch(script, /location\.reload/);
  assert.doesNotMatch(script, /\bfetch\(/);
  assert.doesNotMatch(script, /XMLHttpRequest/);
});

test("painel ignora erro de recurso, que nao e erro de hydration", () => {
  // Evento de recurso (favicon 404) chega sem message e sem Error. Se passar,
  // qualquer 404 da pagina acende o painel sem motivo.
  const script = bodyOf(createDevHydrationPanelScript());
  assert.match(script, /if \(!ev \|\| \(!ev\.message && !ev\.error\)\) return;/);
});

test("CSS do painel usa aspas simples onde precisa de atributo", () => {
  // Regressão: aspas duplas dentro de string delimitada por aspas duplas
  // quebravam o JS gerado e o painel nunca carregava.
  const script = bodyOf(createDevHydrationPanelScript());
  assert.doesNotMatch(script, /\[data-open="true"\]/);
  assert.doesNotMatch(script, /\[data-adaptive-hydration-kind="error"\]/);
  assert.match(script, /\[data-open='true'\]/);
});
