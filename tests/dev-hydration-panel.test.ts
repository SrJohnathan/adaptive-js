/*
 * O painel de hydration roda no browser, sem DOM no ambiente de teste.
 *
 * Um stub mínimo deixa o script ser executado de verdade: se o painel chamar
 * setAttribute com um argumento só, ou tocar em API que não existe, o teste
 * estoura aqui em vez de aparecer no console do dev como
 * "Failed to execute 'setAttribute' on 'Element'".
 */

import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";

import { createDevHydrationPanelScript } from "@adaptive-js/ci/dev";

type Listener = (ev: any) => void;

class ElStub {
  tag: string;
  attrs: Record<string, string> = {};
  children: any[] = [];
  innerHTML = "";
  textContent = "";
  hidden = false;
  listeners: Record<string, Listener[]> = {};
  // innerHTML nao cria filhos de verdade no stub; querySelector precisa devolver
  // sempre o mesmo elemento, senao o painel muta um objeto descartavel.
  sel: Record<string, ElStub> = {};

  constructor(tag: string) {
    this.tag = tag;
  }

  // O DOM real exige dois argumentos. Reproduzir isso é o ponto do stub.
  setAttribute(name: string, value: string) {
    if (arguments.length < 2) {
      throw new TypeError(
        `Failed to execute 'setAttribute' on 'Element': 2 arguments required, but only ${arguments.length} present.`
      );
    }
    this.attrs[name] = value;
  }

  getAttribute(name: string) {
    return this.attrs[name] ?? null;
  }

  appendChild(child: any) {
    this.children.push(child);
    return child;
  }

  addEventListener(type: string, fn: Listener) {
    (this.listeners[type] ||= []).push(fn);
  }

  querySelector(selector: string) {
    return (this.sel[selector] ||= new ElStub("div"));
  }

  contains() {
    return true;
  }
}

function runPanel(t: TestContext) {
  const win: any = {
    listeners: {} as Record<string, Listener[]>,
    addEventListener(type: string, fn: Listener) {
      (this.listeners[type] ||= []).push(fn);
    },
    dispatchEvent(ev: any) {
      for (const fn of this.listeners[ev.type] ?? []) fn(ev);
      return true;
    },
    setInterval: () => 0,
    clearInterval: () => {},
    location: { pathname: "/" },
  };

  const doc: any = {
    head: new ElStub("head"),
    body: new ElStub("body"),
    documentElement: new ElStub("html"),
    createElement: (tag: string) => new ElStub(tag),
    addEventListener: () => {},
    readyState: "complete",
  };

  const saved = {
    window: (globalThis as any).window,
    document: (globalThis as any).document,
    CustomEvent: (globalThis as any).CustomEvent,
  };

  const restore = () => {
    for (const key of ["window", "document", "CustomEvent"] as const) {
      if (saved[key] === undefined) delete (globalThis as any)[key];
      else (globalThis as any)[key] = saved[key];
    }
  };

  (globalThis as any).window = win;
  (globalThis as any).document = doc;
  (globalThis as any).CustomEvent = class {
    type: string;
    detail: any;
    constructor(type: string, init: any) {
      this.type = type;
      this.detail = init?.detail;
    }
  };

  // O stub precisa continuar no lugar: os listeners registrados na carga só
  // tocam em document quando o evento chega, e o evento chega no teste.
  t.after(restore);

  const html = createDevHydrationPanelScript();
  const script = html.slice(html.indexOf(">") + 1, html.lastIndexOf("</script>"));
  try {
    new Function(script)();
  } catch (err) {
    restore();
    throw err;
  }

  return { win, doc };
}

function badgeOf(doc: any): ElStub {
  return doc.body.children.find((c: any) => "data-adaptive-hydration-badge" in c.attrs)!;
}

function panelOf(doc: any): ElStub {
  return doc.body.children.find((c: any) => "data-adaptive-hydration-panel" in c.attrs)!;
}

function listOf(panel: ElStub): ElStub {
  return panel.querySelector("[data-adaptive-hydration-list]");
}

test("painel monta o proprio DOM sem lancar", (t) => {
  const { win, doc } = runPanel(t);
  // O primeiro evento dispara ensureDom(). Era aqui que setAttribute com um
  // argumento só derrubava o painel inteiro.
  assert.doesNotThrow(() => {
    win.dispatchEvent({
      type: "adaptive:hydration-error",
      detail: { path: "hydrate.x", message: "ilha morreu", stack: "Error: ilha morreu\n  at x" },
    });
  });
  assert.ok(badgeOf(doc), "badge precisa existir");
  assert.ok(panelOf(doc), "painel precisa existir");
  assert.ok(doc.head.children.length > 0, "o style precisa entrar no head");
});

test("mismatch mostra no painel com esperado e encontrado", (t) => {
  const { win, doc } = runPanel(t);
  win.dispatchEvent({
    type: "adaptive:hydration-mismatch",
    detail: { path: "hydrate.range", message: "SSR text mismatch", expected: "6", found: "0" },
  });

  assert.match(badgeOf(doc).innerHTML, /mismatch/);

  const panel = panelOf(doc);
  assert.equal(panel.hidden, false, "o painel abre sozinho quando tem erro");
  assert.match(listOf(panel).innerHTML, /SSR text mismatch/);
  assert.match(listOf(panel).innerHTML, /esperado: 6/);
  assert.match(listOf(panel).innerHTML, /encontrado: 0/);
});

test("erro e mismatch sao contados separado", (t) => {
  const { win, doc } = runPanel(t);
  win.dispatchEvent({ type: "adaptive:hydration-error", detail: { path: "a", message: "um" } });
  win.dispatchEvent({ type: "adaptive:hydration-mismatch", detail: { path: "b", message: "dois" } });
  win.dispatchEvent({ type: "adaptive:hydration-mismatch", detail: { path: "c", message: "tres" } });

  const html = badgeOf(doc).innerHTML;
  assert.match(html, /1 erro/);
  assert.match(html, /2 mismatches/);
});

test("erro de recurso nao acende o painel", (t) => {
  const { win, doc } = runPanel(t);
  win.dispatchEvent({ type: "error" });
  assert.equal(doc.body.children.length, 0, "nada deve ser criado sem erro de verdade");
});

test("erro de script entra no painel", (t) => {
  const { win, doc } = runPanel(t);
  win.dispatchEvent({ type: "error", message: "quebrou", error: { stack: "Error: quebrou" } });
  assert.match(badgeOf(doc).innerHTML, /1 erro/);
  assert.match(listOf(panelOf(doc)).innerHTML, /quebrou/);
});

test("rejection sem catch entra no painel", (t) => {
  const { win, doc } = runPanel(t);
  win.dispatchEvent({ type: "unhandledrejection", reason: { message: "promissa quebrada", stack: "at y" } });
  assert.match(listOf(panelOf(doc)).innerHTML, /promissa quebrada/);
});

test("limpar esvazia o badge", (t) => {
  const { win, doc } = runPanel(t);
  win.dispatchEvent({ type: "adaptive:hydration-error", detail: { path: "a", message: "um" } });
  const panel = panelOf(doc);
  const clearBtn = panel.querySelector("[data-adaptive-hydration-clear]");
  clearBtn.listeners.click[0]({});
  assert.match(badgeOf(doc).innerHTML, /ok/);
  assert.equal(panel.hidden, true);
});
