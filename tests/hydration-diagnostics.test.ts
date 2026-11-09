/*
 * Relay de diagnóstico da hidratação.
 *
 * O painel de dev (injetado pelo ci) só funciona se o runtime emitir evento.
 * Esses testes montam um window falso e verificam o contrato: sem isso o erro
 * continua morrendo em silêncio.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  HYDRATION_ERROR_EVENT,
  HYDRATION_MISMATCH_EVENT,
  clearHydrationMismatches,
  getHydrationMismatches,
  reportHydrationError,
  warnMismatch,
} from "@adaptive-js/web";

type Emitted = { name: string; detail: any };

function withFakeWindow(fn: () => void) {
  const emitted: Emitted[] = [];
  const previous = (globalThis as any).window;
  (globalThis as any).window = {
    dispatchEvent(ev: any) {
      emitted.push({ name: ev.type, detail: ev.detail });
      return true;
    },
    addEventListener() {},
    location: { pathname: "/teste" },
  };
  (globalThis as any).CustomEvent = class {
    type: string;
    detail: any;
    constructor(type: string, init: any) {
      this.type = type;
      this.detail = init?.detail;
    }
  };
  try {
    fn();
  } finally {
    if (previous === undefined) delete (globalThis as any).window;
    else (globalThis as any).window = previous;
  }
  return emitted;
}

test("mismatch emite evento para o painel de dev", () => {
  clearHydrationMismatches();
  const emitted = withFakeWindow(() => {
    warnMismatch({ path: "hydrate.react", message: "texto diferente", expected: "a", found: "b" });
  });

  const event = emitted.find((e) => e.name === HYDRATION_MISMATCH_EVENT);
  assert.ok(event, "mismatch precisa emitir " + HYDRATION_MISMATCH_EVENT);
  assert.equal(event!.detail.message, "texto diferente");
  assert.equal(event!.detail.expected, "a");
  assert.equal(event!.detail.found, "b");
});

test("erro lançado na hidratação emite evento e vai para o console", () => {
  const errors: string[] = [];
  const previousError = console.error;
  console.error = (...args: any[]) => { errors.push(String(args[0])); };

  const emitted = withFakeWindow(() => {
    reportHydrationError(new Error("ilha morreu"), { moduleId: "components/x", exportName: "X" });
  });

  console.error = previousError;

  const event = emitted.find((e) => e.name === HYDRATION_ERROR_EVENT);
  assert.ok(event, "erro precisa emitir " + HYDRATION_ERROR_EVENT);
  assert.equal(event!.detail.message, "ilha morreu");
  assert.equal(event!.detail.moduleId, "components/x");
  assert.equal(event!.detail.exportName, "X");
  assert.match(event!.detail.path, /components\/x\.X$/);
  // console.error, não warn: erro que some no console é o que a gente corrigiu
  assert.equal(errors.length, 1);
});

test("mismatch repetido nao duplica no histórico nem no painel", () => {
  clearHydrationMismatches();
  const emitted = withFakeWindow(() => {
    warnMismatch({ path: "hydrate.a", message: "mesma" });
    warnMismatch({ path: "hydrate.a", message: "mesma" });
    warnMismatch({ path: "hydrate.b", message: "mesma" });
  });

  assert.equal(emitted.length, 2, "chave path:message deduplica");
  assert.equal(getHydrationMismatches().length, 2);
  clearHydrationMismatches();
});

test("erro sem Error funciona: string e valor inesperado", () => {
  const previousError = console.error;
  console.error = () => {};

  const emitted = withFakeWindow(() => {
    reportHydrationError("quebrou sem ser Error");
    reportHydrationError({ qualquer: "coisa" });
  });

  console.error = previousError;

  const events = emitted.filter((e) => e.name === HYDRATION_ERROR_EVENT);
  assert.equal(events.length, 2);
  assert.equal(events[0].detail.message, "quebrou sem ser Error");
  assert.equal(events[0].detail.stack, undefined);
  assert.equal(events[1].detail.message, "[object Object]");
});
