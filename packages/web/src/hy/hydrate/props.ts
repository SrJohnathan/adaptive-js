/*
 * Copyright (c) 2026 Antonio Johnathan
 * Props reativas e refs
 */
import { createReactiveEffect } from "../../reactive/events.js";
import { resolveDomAttributeName, shouldAssignAsProperty } from "./dom.js";
import type { HydrationInstruction } from "./types.js";

export function bindRef(ref: any, element: HTMLElement) {
  if (typeof ref === "function") ref(element);
  else if (ref && typeof ref === "object") ref.current = element;
}

export function hydrateDynamicProp(element: HTMLElement, instruction: Extract<HydrationInstruction, { kind: "dynamic-prop" }>) {
  const namespace = element.namespaceURI;
  createReactiveEffect(() => {
    const resolved = instruction.getter();
    if (resolved == null || resolved === false) {
      element.removeAttribute(resolveDomAttributeName(instruction.prop, namespace));
      return;
    }
    if (shouldAssignAsProperty(element, namespace, instruction.prop)) {
      (element as any)[instruction.prop] = resolved;
    } else {
      element.setAttribute(resolveDomAttributeName(instruction.prop, namespace), String(resolved));
    }
  });
}

export function applyPropertyValue(element: HTMLElement, key: string, value: any, options: { hydrating: boolean; path: string }) {
  const preserveSelection =
    options.hydrating &&
    key === "value" &&
    (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) &&
    document.activeElement === element;

  const selection = preserveSelection ? captureSelection(element as any) : null;
  (element as any)[key] = value;
  if (selection) restoreSelection(element as any, selection);
}

function captureSelection(el: HTMLInputElement | HTMLTextAreaElement) {
  return { start: el.selectionStart, end: el.selectionEnd, direction: el.selectionDirection as any };
}

function restoreSelection(el: HTMLInputElement | HTMLTextAreaElement, sel: any) {
  if (sel.start == null || sel.end == null) return;
  try {
    el.setSelectionRange(sel.start, sel.end, sel.direction ?? undefined);
  } catch {}
}
