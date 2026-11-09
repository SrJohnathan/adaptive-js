/*
 * Um reactive-range hidratado precisa comparar o texto do SSR uma vez, na
 * primeira execucao do effect. Nas execucoes seguintes o texto mudar e a
 * atualizacao reativa funcionando, nao um erro de hydration.
 *
 * Alem do ruido, havia um efeito pior: warnMismatch deduplica por
 * path+message num Set global, entao a atualizacao reativa queima a entrada e
 * um mismatch de SSR verdadeiro daquela ilha nunca mais era reportado.
 *
 * O DOM stub e minimo de proposito: hydrateReactiveRangeWithMarkers recebe os
 * markers prontos, entao nao e preciso simular a busca recursiva do runtime.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { hydrateReactiveRangeWithMarkers } from "../packages/web/dist/hy/hydrate/reactive.js";
import { signal } from "../packages/web/dist/reactive/reactive.js";
import { flushEvents } from "../packages/web/dist/reactive/events.js";

const TEXT = 3;
const COMMENT = 8;

class NodeStub {
  nodeType: number;
  data: string;
  parentNode: any = null;
  childNodes: any[] = [];

  constructor(nodeType: number, data: string) {
    this.nodeType = nodeType;
    this.data = data;
  }

  get nextSibling() {
    const siblings = this.parentNode?.childNodes ?? [];
    const i = siblings.indexOf(this);
    return i === -1 ? null : siblings[i + 1] ?? null;
  }

  get textContent() {
    return this.data;
  }

  removeChild(child: any) {
    const i = this.childNodes.indexOf(child);
    if (i !== -1) this.childNodes.splice(i, 1);
    child.parentNode = null;
    return child;
  }

}

class ElementStub extends NodeStub {
  constructor() {
    super(1, "");
  }
}

async function withDom<T>(run: (mismatches: any[]) => T | Promise<T>, doc?: any): Promise<T> {
  const saved = {
    window: (globalThis as any).window,
    document: (globalThis as any).document,
    Node: (globalThis as any).Node,
    CustomEvent: (globalThis as any).CustomEvent,
  };

  const win: any = { addEventListener() {}, removeEventListener() {}, dispatchEvent: () => true };
  (globalThis as any).window = win;
  (globalThis as any).Node = { TEXT_NODE: TEXT, COMMENT_NODE: COMMENT, ELEMENT_NODE: 1 };
  (globalThis as any).CustomEvent = class {
    type: string;
    detail: any;
    constructor(type: string, init: any) {
      this.type = type;
      this.detail = init?.detail;
    }
  };
  (globalThis as any).document = doc ?? {
    createTextNode: (data: string) => new NodeStub(TEXT, data),
    createComment: (data: string) => new NodeStub(COMMENT, data),
    querySelector: () => null,
    querySelectorAll: () => [],
  };

  try {
    return await run((win.__ADAPTIVE_HYDRATION_MISMATCHES__ ??= []) as any[]);
  } finally {
    for (const key of ["window", "document", "Node", "CustomEvent"] as const) {
      if (saved[key] === undefined) delete (globalThis as any)[key];
      else (globalThis as any)[key] = saved[key];
    }
  }
}

async function hydrateRange(ssrText: string, initial: string, id: string) {
  const parent = new ElementStub();
  const start = new NodeStub(COMMENT, `adaptive-reactive-child-start:${id}`);
  const text = new NodeStub(TEXT, ssrText);
  const end = new NodeStub(COMMENT, `adaptive-reactive-child-end:${id}`);
  for (const n of [start, text, end]) {
    n.parentNode = parent;
    parent.childNodes.push(n);
  }

  const valor = signal(initial);
  hydrateReactiveRangeWithMarkers(
    start as any,
    end as any,
    { kind: "reactive-range", id, getter: () => valor[0]() } as any
  );
  // O primeiro run do effect e agendado em microtask; flushEvents sozinho
  // cobre so o que o scheduler enfileirou de forma sincrona.
  await Promise.resolve();
  flushEvents();

  return { valor, texto: text };
}

test("texto igual ao SSR nao reporta mismatch", async () => {
  await withDom(async (mismatches) => {
    const { texto } = await hydrateRange("6", "6", "igual");
    assert.equal(texto.data, "6");
    assert.equal(mismatches.length, 0);
  });
});

test("texto do SSR diferente do cliente reporta mismatch na hidratacao", async () => {
  await withDom(async (mismatches) => {
    const { texto } = await hydrateRange("0", "6", "diverge");
    assert.equal(texto.data, "6", "o client corrige o texto do servidor");
    assert.equal(mismatches.length, 1);
    assert.equal(mismatches[0].message, "SSR text mismatch");
    assert.equal(mismatches[0].expected, "6");
    assert.equal(mismatches[0].found, "0");
  });
});

test("atualizacao reativa depois da hidratacao nao e mismatch", async () => {
  await withDom(async (mismatches) => {
    const { valor, texto } = await hydrateRange("6", "6", "reativo");
    assert.equal(mismatches.length, 0);

    valor[1]("7");
    await Promise.resolve();
    flushEvents();
    assert.equal(texto.data, "7", "o effect continua atualizando o DOM");
    assert.equal(mismatches.length, 0, "mudar o texto nao pode virar erro de hydration");

    valor[1]("8");
    await Promise.resolve();
    flushEvents();
    assert.equal(texto.data, "8");
    assert.equal(mismatches.length, 0);
  });
});

test("mismatch nao aborta a correcao do DOM quando relatar falha", async () => {
  // readHydrationRoute depende do documento. Se ela lancar dentro de
  // warnMismatch, a excecao sobe para o effect e a ilha fica com o texto do
  // servidor para sempre -- sem mismatch reportado e sem DOM corrigido.
  await withDom(
    async (mismatches) => {
      const { texto } = await hydrateRange("0", "6", "report-quebra");
      assert.equal(texto.data, "6", "o DOM foi corrigido mesmo com o report falhando");
      assert.equal(mismatches.length, 1, "o mismatch foi reportado mesmo assim");
      assert.equal(mismatches[0].message, "SSR text mismatch");
      assert.equal(mismatches[0].route, undefined, "so a rota se perde");
    },
    {
      createTextNode: (data: string) => new NodeStub(TEXT, data),
      createComment: (data: string) => new NodeStub(COMMENT, data),
      querySelector() {
        throw new Error("documento em estado invalido");
      },
    }
  );
});
