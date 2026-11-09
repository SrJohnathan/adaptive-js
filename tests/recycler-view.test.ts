/*
 * O RecyclerView só existe depois que o client monta: no SSR os hosts do pool
 * saem vazios porque ref não dispara no servidor. Então este teste monta a
 * árvore no DOM e dirige o scroll.
 *
 * O stub reproduz o que o componente realmente toca — style com camelCase,
 * removeChild, parentElement, clientHeight, scrollTop, ResizeObserver, rAF.
 * Se o componente parar de usar uma dessas APIs, o teste estoura aqui.
 */

import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { signal } from "@adaptive-js/web";

type Listener = (ev: any) => void;

const HYPHENATE = /([A-Z])/g;

class StyleStub {
  [key: string]: any;
  constructor() {
    return new Proxy(this, {
      set(target, prop: string, value: any) {
        target[prop] = value;
        return true;
      },
    });
  }
  setProperty(name: string, value: string) {
    this[name] = value;
  }
  removeProperty(name: string) {
    delete this[name];
  }
  getPropertyValue(name: string) {
    return this[name] ?? "";
  }
  get cssText() {
    return Object.keys(this)
      .map((k) => `${k.replace(HYPHENATE, "-$1").toLowerCase()}:${this[k]}`)
      .join(";");
  }
}

/** Base real: `vnode instanceof Node` precisa valer so para nos de DOM. */
class DomNode {
  nodeType = 0;
  parent: DomNode | null = null;
  /** mountKeyedReactiveFunction aborta quando start.parentNode e nulo */
  get parentNode(): any {
    return this.parent;
  }
  get nextSibling(): any {
    const p = this.parent as any;
    if (!p || !Array.isArray(p.childNodes)) return null;
    const i = p.childNodes.indexOf(this);
    return i < 0 ? null : (p.childNodes[i + 1] ?? null);
  }
}

class TextStub extends DomNode {
  textContent = "";
  nodeType = 3;
}

class ElStub extends DomNode {
  tag: string;
  attrs: Record<string, string> = {};
  childNodes: any[] = [];
  textContent = "";
  style: any = new StyleStub();
  listeners: Record<string, Listener[]> = {};
  scrollTop = 0;
  /** clientHeight controlado pelo teste, 0 = sem layout */
  clientHeightValue = 0;

  constructor(tag: string) {
    super();
    this.tag = tag;
  }

  get parentElement() {
    return this.parent as ElStub | null;
  }
  get clientHeight() {
    return this.clientHeightValue;
  }
  get firstChild() {
    return this.childNodes[0] ?? null;
  }
  get children() {
    return this.childNodes.filter((c) => c instanceof ElStub);
  }

  appendChild(child: any) {
    child.parent = this;
    this.childNodes.push(child);
    return child;
  }
  insertBefore(node: any, ref: any) {
    if (node instanceof ElStub) node.parent = this;
    const i = this.childNodes.indexOf(ref);
    if (i < 0) throw new Error("insertBefore: referencia nao existe");
    this.childNodes.splice(i, 0, node);
    return node;
  }
  removeChild(child: any) {
    const i = this.childNodes.indexOf(child);
    if (i < 0) throw new Error("removeChild: filho nao existe");
    this.childNodes.splice(i, 1);
    child.parent = null;
    return child;
  }
  setAttribute(name: string, value: string) {
    if (arguments.length < 2) {
      throw new TypeError("setAttribute exige 2 argumentos");
    }
    this.attrs[name] = value;
  }
  getAttribute(name: string) {
    return this.attrs[name] ?? null;
  }
  removeAttribute(name: string) {
    delete this.attrs[name];
  }
  addEventListener(type: string, fn: Listener) {
    (this.listeners[type] ||= []).push(fn);
  }
  removeEventListener(type: string, fn: Listener) {
    const arr = this.listeners[type];
    if (arr) this.listeners[type] = arr.filter((f) => f !== fn);
  }
  dispatch(type: string) {
    const ev: any = { type, target: this, preventDefault() {}, stopPropagation() {} };
    for (const fn of this.listeners[type] ?? []) fn(ev);
    return ev;
  }
  /** texto visível, para asserção de conteúdo */
  text() {
    let out = this.textContent ?? "";
    for (const c of this.childNodes) {
      out += c instanceof ElStub ? c.text() : (c.textContent ?? "");
    }
    return out;
  }
  walk(visit: (el: ElStub) => void) {
    visit(this);
    for (const c of this.childNodes) if (c instanceof ElStub) c.walk(visit);
  }
}

function installDom(t: TestContext, opts: { height?: number } = {}) {
  const rafQueue: Array<() => void> = [];
  const doc: any = {
    createElement: (tag: string) => new ElStub(tag),
    createElementNS: (_ns: string, tag: string) => new ElStub(tag),
    createTextNode: (data?: string) => {
      const n = new TextStub();
      n.textContent = data ?? "";
      return n;
    },
    createComment: (data?: string) => {
      const n = new TextStub();
      n.textContent = data ?? "";
      n.nodeType = 8;
      return n;
    },
    createDocumentFragment: () => new ElStub("fragment"),
    head: new ElStub("head"),
    body: new ElStub("body"),
    documentElement: new ElStub("html"),
    addEventListener: () => {},
  };
  const winListeners: Record<string, Listener[]> = {};
  const win: any = {
    document: doc,
    location: { pathname: "/lista" },
    addEventListener(type: string, fn: Listener) {
      (winListeners[type] ||= []).push(fn);
    },
    removeEventListener(type: string, fn: Listener) {
      const arr = winListeners[type];
      if (arr) winListeners[type] = arr.filter((f) => f !== fn);
    },
    dispatchEvent(ev: any) {
      for (const fn of winListeners[ev.type] ?? []) fn(ev);
      return true;
    },
    requestAnimationFrame: (fn: () => void) => {
      rafQueue.push(fn);
      return rafQueue.length;
    },
    cancelAnimationFrame: (id: number) => {
      rafQueue[id - 1] = () => {};
    },
    ResizeObserver: class {
      constructor(private cb: () => void) {}
      observe() {}
      unobserve() {}
      disconnect() {}
      trigger() {
        this.cb();
      }
    },
    getComputedStyle: () => ({}),
  };

  const keys = ["window", "document", "requestAnimationFrame", "cancelAnimationFrame", "ResizeObserver", "Node", "HTMLElement", "CustomEvent"];
  const saved: Record<string, any> = {};
  for (const k of keys) saved[k] = (globalThis as any)[k];
  (globalThis as any).window = win;
  (globalThis as any).document = doc;
  (globalThis as any).requestAnimationFrame = win.requestAnimationFrame;
  (globalThis as any).cancelAnimationFrame = win.cancelAnimationFrame;
  (globalThis as any).ResizeObserver = win.ResizeObserver;
  (globalThis as any).Node = DomNode;
  (globalThis as any).HTMLElement = ElStub;

  t.after(() => {
    for (const k of keys) {
      if (saved[k] === undefined) delete (globalThis as any)[k];
      else (globalThis as any)[k] = saved[k];
    }
  });

  return {
    doc,
    /** roda a fila de rAF ate estabilizar */
    async flushFrames() {
      for (let i = 0; i < 8; i++) {
        const pending = rafQueue.splice(0, rafQueue.length);
        if (pending.length === 0) break;
        for (const fn of pending) fn();
        await new Promise((r) => setImmediate(r));
      }
      await new Promise((r) => setTimeout(r, 0));
    },
    async flushMicrotasks() {
      for (let i = 0; i < 8; i++) await new Promise((r) => setImmediate(r));
    },
  };
}

type Row = { id: number; label: string; done: boolean };

async function mountList(
  t: TestContext,
  opts: { rows: Row[]; height?: number; marked?: () => number },
) {
  const dom = installDom(t, opts);
  const { RecyclerView } = await import(
    "../extension/components/src/recycler-view.js"
  );
  // caminho resolvido em runtime: o fonte vive em tests/, mas o compilado sai
  // em dist-test/tests/, então um relativo aponta para lugares diferentes.
  const distUrl = pathToFileURL(
    path.join(process.cwd(), "packages/web/dist/hy/hydrate/render-to-dom.js"),
  ).href;
  const { renderToDOM } = (await import(distUrl)) as any;

  // createReactiveEffect so agenda; sem flush explicito nada roda. O agendador
  // nao esta no export publico de reactive/index, entao entra pelo caminho fundo.
  const evUrl = pathToFileURL(
    path.join(process.cwd(), "packages/web/dist/reactive/events.js"),
  ).href;
  const { flushEffects } = (await import(evUrl)) as any;

  /** roda effects + rAF + microtasks ate o estado estabilizar */
  const settle = async () => {
    for (let i = 0; i < 6; i++) {
      flushEffects();
      await dom.flushFrames();
      flushEffects();
      await dom.flushMicrotasks();
    }
  };

  const props = {
    items: opts.rows,
    itemHeight: 32,
    height: opts.height ?? 320,
    overscan: 2,
    getItemKey: (r: Row) => r.id,
    item: (row: Row, index: number) => ({
      type: "div",
      class: () => `linha${row.done ? " riscada" : ""}`,
      props: { "data-id": () => String(row.id), "data-indice": () => String(index) },
      children: [
        {
          type: "span",
          class: "rotulo",
          // le o sinal de dentro do effect do slot: e o que prova que o
          // efeito criado em bindSlot continua vivo depois do mount
          value: () =>
            opts.marked && row.id === opts.marked() ? "MUDOU" : row.label,
        },
      ],
    }),
    onItemClick: () => {},
  };

  const vnode = (RecyclerView as any)(props);
  const root = renderToDOM(vnode, null);
  await settle();

  // viewport = o div com overflowY auto
  let viewport: ElStub | null = null;
  if (typeof (root as any).walk !== "function") {
    throw new Error(
      `renderToDOM devolveu ${Object.prototype.toString.call(root)} ` +
        `ctor=${(root as any)?.constructor?.name} ` +
        `keys=${JSON.stringify(Object.keys((root as any) ?? {}).slice(0, 8))}`,
    );
  }
  (root as ElStub).walk((el) => {
    if (el.style && el.style.overflowY === "auto") viewport = el;
  });

  /** hosts do pool = divs absolutos dentro do spacer */
  function hosts(): ElStub[] {
    const out: ElStub[] = [];
    (root as ElStub).walk((el) => {
      if (
        el.style &&
        el.style.boxSizing === "border-box" &&
        Object.prototype.hasOwnProperty.call(el.style, "top")
      ) {
        out.push(el);
      }
    });
    return out;
  }

  const dump = (el: any, depth = 0): string => {
    const pad = "  ".repeat(depth);
    if (!(el instanceof ElStub)) return `${pad}#${el.nodeType} "${el.textContent}"`;
    const st = Object.keys(el.style).filter((k) => !k.startsWith("_"));
    return (
      `${pad}<${el.tag}> style{${st.slice(0, 4).join(",")}} kids=${el.childNodes.length}\n` +
      el.childNodes.map((c: any) => dump(c, depth + 1)).join("")
    );
  };
  if (process.env.RV_DEBUG) console.log(dump(root));

  return { dom, root: root as ElStub, viewport: viewport!, hosts, dump, settle, flushEffects };
}

test("pool é fixo: 1000 itens, poucos hosts", async (t) => {
  const rows: Row[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    label: `linha ${i}`,
    done: i % 7 === 0,
  }));
  const { hosts } = await mountList(t, { rows });

  const pool = hosts();
  // poolSize = ceil(320/32)+1 + 2*2 + 2 = 11+1+4+2 = 18
  assert.ok(pool.length > 0, "nenhum host criado");
  assert.ok(
    pool.length < 40,
    `pool deveria ser pequeno, veio ${pool.length}`,
  );
  t.diagnostic(`pool com 1000 itens: ${pool.length} hosts`);
});

test("preenche os primeiros slots com conteúdo", async (t) => {
  const rows: Row[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    label: `linha ${i}`,
    done: false,
  }));
  const { hosts, root } = await mountList(t, { rows });

  const pool = hosts();
  const visiveis = pool.filter((h) => h.style.visibility !== "hidden");
  assert.ok(visiveis.length > 0, "todo host ficou hidden");

  const texto = root.text();
  assert.match(texto, /linha 0/, "primeira linha nao renderizou");
  assert.match(texto, /linha 1/);
  t.diagnostic(`slots visiveis: ${visiveis.length}; texto: ${texto.slice(0, 60)}`);
});

test("scroll recicla hosts e mostra a janela certa", async (t) => {
  const rows: Row[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    label: `linha ${i}`,
    done: false,
  }));
  const { hosts, viewport, settle } = await mountList(t, { rows });

  assert.ok(viewport, "viewport nao encontrado (overflowY auto)");
  viewport.scrollTop = 3200; // linha 100
  viewport.dispatch("scroll");
  await settle();

  const pool = hosts();
  const texto = pool.map((h) => h.text()).join("|");
  t.diagnostic(`apos scroll 3200 -> ${texto.slice(0, 80)}`);

  assert.match(texto, /linha 100/, "a janela nao acompanhou o scroll");
  assert.doesNotMatch(texto, /linha 0\b/, "linha 0 ficou na tela apos scroll");
});

test("effect por slot: signal lida dentro do item reage", async (t) => {
  const rows: Row[] = [
    { id: 0, label: "linha 0", done: false },
    { id: 1, label: "linha 1", done: false },
    { id: 2, label: "linha 2", done: false },
    { id: 3, label: "linha 3", done: false },
  ];
  const [marcado, setMarcado] = signal(-1);
  const { hosts, flushEffects, settle } = await mountList(t, {
    rows,
    height: 320,
    marked: marcado,
  });

  const antes = hosts().map((h) => h.text()).join("|");
  assert.match(antes, /linha 0/, "nada montou antes do sinal mudar");

  // o effect do slot tem que reagir, mesmo com a lista parada
  setMarcado(0);
  flushEffects();
  await settle();

  const depois = hosts().map((h) => h.text()).join("|");
  t.diagnostic(`antes: ${antes} | depois: ${depois}`);
  assert.match(depois, /MUDOU/, "effect por slot nao rodou");
  assert.match(depois, /linha 1/, "as outras linhas sumiram");
});

test("recycle nao deixa linha duplicada nem host sujo", async (t) => {
  const rows: Row[] = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    label: `linha ${i}`,
    done: false,
  }));
  const { hosts, viewport, settle } = await mountList(t, { rows });

  const antes = hosts().map((h) => h.text()).join("|");
  assert.match(antes, /linha 0/, "nada montou antes do scroll");

  viewport.scrollTop = 100 * 32;
  viewport.dispatch("scroll");
  await settle();

  const depois = hosts().map((h) => h.text()).join("|");
  t.diagnostic(`antes: ${antes.slice(0, 44)} -> depois: ${depois.slice(0, 44)}`);

  // janela = firstVisible(100) - overscan(2) => 98..
  assert.match(depois, /linha 98\b/, "a janela nao comecou em 98");
  assert.match(depois, /linha 100\b/);

  const ids = [...depois.matchAll(/linha (\d+)/g)].map((m) => m[1]);
  assert.ok(ids.length > 5, `poucos ids extraidos: ${depois}`);
  assert.equal(ids.length, new Set(ids).size, `linha repetida apos recycle: ${depois}`);
});

test("scroll alem do fim trava na ultima janela", async (t) => {
  // pool fixo, lista curta: rolar muito alem do final tem que mostrar o fim,
  // naoUltima linha e nao buracos.
  const rows: Row[] = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    label: `linha ${i}`,
    done: false,
  }));
  const { hosts, viewport, settle } = await mountList(t, { rows });

  viewport.scrollTop = 99999;
  viewport.dispatch("scroll");
  await settle();

  const depois = hosts().map((h) => h.text()).join("|");
  t.diagnostic(`depois de scroll absurdo: ${depois}`);
  assert.match(depois, /linha 9\b/, "nao mostrou a ultima linha");
});
