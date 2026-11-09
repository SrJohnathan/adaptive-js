/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Renderer SSR. Foco no que costuma quebrar em silencio: escape de atributos,
 * tags void, booleanos, style object e Fragment. Tudo aqui roda sem DOM, entao
 * erro aparece na hora em vez de no browser.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { renderToString, renderToStringWithMetadata } from "@adaptive-js/ssr";
import { jsx, Fragment } from "@adaptive-js/jsx";

// O runtime automático usa o 3º argumento para a key, então o helper precisa
// colocar os filhos dentro de props.children.
const h = (tag: any, props: any = {}, ...children: any[]) =>
  jsx(tag as any, children.length > 0 ? { ...props, children } : props);

test("tag simples com texto", () => {
  assert.equal(renderToString(h("div", {}, "oi")), "<div>oi</div>");
});

test("texto e escapado", () => {
  const html = renderToString(h("div", {}, "<script>x</script>"));
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test("aspas em atributo nao permitem escapar do atributo", () => {
  const html = renderToString(h("div", { title: 'a" onload="alert(1)' }));
  // O payload fica inteiro dentro do valor do atributo: a aspa vira &quot;, o
  // que impede o onload= de virar um atributo novo.
  assert.equal(html, '<div title="a&quot; onload=&quot;alert(1)"></div>');

  // O payload inteiro precisa continuar dentro de um unico valor de atributo.
  // Contar "=" nao serve: "onload=" aparece como texto escapado, nao como
  // atributo novo.
  const open = html.indexOf('"');
  const close = html.lastIndexOf('"');
  assert.match(
    html.slice(open + 1, close),
    /onload=&quot;alert\(1\)/,
    "o payload nao pode fechar a aspa e virar atributo proprio",
  );
});

test("ampersand em atributo e em texto", () => {
  assert.match(renderToString(h("div", { title: "a & b" })), /&amp;/);
  assert.match(renderToString(h("div", {}, "a & b")), /a &amp; b/);
});

test("tags void sao self-closing e nao ganham filho", () => {
  for (const tag of ["br", "img", "input", "hr", "meta", "link"]) {
    const html = renderToString(h(tag, {}));
    assert.equal(html, `<${tag} />`, `${tag} deveria ser void`);
    assert.doesNotMatch(html, new RegExp(`</${tag}>`), `${tag} nao pode ter closing`);
  }
});

test("booleanos: true vira atributo, false some", () => {
  assert.match(renderToString(h("input", { disabled: true })), /disabled/);
  assert.doesNotMatch(renderToString(h("input", { disabled: false })), /disabled/);
});

test("style como objeto vira inline", () => {
  const html = renderToString(h("div", { style: { color: "red", fontSize: "12px" } }));
  assert.match(html, /color:\s*red/);
  assert.match(html, /font-size:\s*12px/, "camelCase precisa virar kebab-case");
});

test("null, undefined, false e booleano sao ignorados como filhos", () => {
  const html = renderToString(h("div", {}, null, undefined, false, true, "visivel"));
  assert.equal(html, "<div>visivel</div>");
});

test("numeros including zero renderizam", () => {
  assert.equal(renderToString(h("div", {}, 0)), "<div>0</div>");
});

test("Fragment achata sem tag extra", () => {
  const html = renderToString(h(Fragment, {}, h("b", {}, "1"), h("i", {}, "2")));
  assert.equal(html, "<b>1</b><i>2</i>");
});

test("arrays de filhos sao achatados em qualquer profundidade", () => {
  const html = renderToString(
    h("ul", {}, [h("li", {}, "a"), [h("li", {}, "b"), h("li", {}, "c")]]),
  );
  assert.equal(html, "<ul><li>a</li><li>b</li><li>c</li></ul>");
});

test("children inline e children em props sao equivalentes", () => {
  // O transform do ci emite a key no 3º argumento e os filhos em props, então
  // essa é a forma canônica. A forma compacta do helper tem de dar o mesmo HTML.
  const viaArgs = renderToString(h("div", {}, h("b", {}, "x")));
  const viaArray = renderToString(jsx("div", { children: [jsx("b", { children: "x" })] }));
  assert.equal(viaArgs, viaArray);
  assert.equal(viaArgs, "<div><b>x</b></div>");
});

test("3o argumento e a key, nunca um filho", () => {
  // Regressão: tratar o 3º argumento como filho fazia a key virar conteúdo e
  // sumia com os filhos de todo elemento com key.
  const vnode = jsx("li", { children: ["0", ": ", "alpha"] }, "alpha") as any;
  assert.equal(vnode.key, "alpha");
  assert.deepEqual(vnode.children, ["0", ": ", "alpha"]);
});

test("componente que retorna fragment nao adiciona wrapper", () => {
  const Comp = () => h(Fragment, {}, h("span", {}, "a"), h("span", {}, "b"));
  assert.equal(renderToString(h("div", {}, h(Comp, {}))), "<div><span>a</span><span>b</span></div>");
});

test("nesting profundo nao estoura", () => {
  let node: any = h("span", {}, "fundo");
  for (let i = 0; i < 60; i++) node = h("div", {}, node);
  const html = renderToString(node);
  assert.equal((html.match(/<div>/g) ?? []).length, 60);
});

test("renderToStringWithMetadata coleta module ids das ilhas", () => {
  const { html, clientModuleIds } = renderToStringWithMetadata({
    tag: "div",
    props: {},
    children: [
      {
        tag: "adaptive-client-boundary",
        props: {
          "data-adaptive-client-module": "components/x",
          "data-adaptive-client-mode": "client",
          "data-adaptive-client-export": "X",
          "data-adaptive-client-props": "{}",
          "data-adaptive-client-has-children": "false",
        },
        children: [],
      },
    ],
  });

  assert.match(html, /adaptive-client-start:/);
  assert.deepEqual(clientModuleIds, ["components/x"]);
});

test("renderToString em pagina sem ilha devolve lista vazia", () => {
  const { clientModuleIds } = renderToStringWithMetadata(h("div", {}, "so texto"));
  assert.deepEqual(clientModuleIds, []);
});
