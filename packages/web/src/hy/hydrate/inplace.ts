/*
 * Copyright (c) 2026 Antonio Johnathan
 * In-place hydration - DOM-first, sem VDOM
 * VNode é efêmero, serve só para extrair eventos/refs e ligar ao DOM do server
 */
import { CONTEXT_PROVIDER_TAG } from "../../front/context-runtime.js";
import { runWithContext, untrack } from "../../reactive/index.js";
import { createReactiveEffect } from "../../reactive/events.js";
import { events } from "../../reactive/index.js";
import { resolveDomAttributeName, shouldAssignAsProperty } from "./dom.js";
import { bindDelegatedEvent } from "./events.js";
import { bindRef } from "./props.js";
import { warnMismatch } from "./mismatch.js";
import {applyStyleObject} from "./style.js";

const HYDRATED_IN_PLACE = new WeakSet<Element>();

type DomCursor = { node: Node | null; end: Node; parent: Node | null };

export function normalizeVNodeList(value: any): any[] {
  if (value == null || value === false || value === true) return [];
  if (typeof value === "function") {
    try { return normalizeVNodeList(untrack(() => value())); } catch { return []; }
  }
  if (Array.isArray(value)) return value.flatMap((item) => normalizeVNodeList(item));
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return [{ __adaptive_text: String(value) }];
  if (value && typeof value === "object" && "tag" in value) return [value];
  return [];
}

function advanceMeaningfulSibling(cursor: DomCursor): Node | null {
  let current = cursor.node;
  while (current && current !== cursor.end) {
    if (current.nodeType === Node.COMMENT_NODE) { current = current.nextSibling; continue; }
    if (current.nodeType === Node.TEXT_NODE) {
      if ((current.textContent ?? "").trim() === "") { current = current.nextSibling; continue; }
      cursor.node = current; return current;
    }
    if (current.nodeType === Node.ELEMENT_NODE) { cursor.node = current; return current; }
    current = current.nextSibling;
  }
  cursor.node = current; return null;
}

function advanceMeaningfulChild(from: Node | null, parent: Element): { node: Node | null; found: Node | null } {
  let current = from;
  while (current && current.parentNode === parent) {
    if (current.nodeType === Node.COMMENT_NODE) { current = current.nextSibling; continue; }
    if (current.nodeType === Node.TEXT_NODE) {
      if ((current.textContent ?? "").trim() === "") { current = current.nextSibling; continue; }
      return { node: current, found: current };
    }
    if (current.nodeType === Node.ELEMENT_NODE) return { node: current, found: current };
    current = current.nextSibling;
  }
  return { node: null, found: null };
}

export function hydrateVNodeAgainstDOM(vnode: any, cursor: DomCursor) {
  if (vnode == null || vnode === false || vnode === true) return;
  if (vnode.__adaptive_text != null) {
    const dom = advanceMeaningfulSibling(cursor);
    if (dom && dom.nodeType === Node.TEXT_NODE) cursor.node = dom.nextSibling;
    return;
  }
  if (typeof vnode.tag === "function") {
    let resolved: any;
    try { resolved = untrack(() => vnode.tag({ ...(vnode.props ?? {}), children: vnode.children ?? [] })); } catch (err) { console.error("[inplace] resolve failed", err); return; }
    for (const child of normalizeVNodeList(resolved)) hydrateVNodeAgainstDOM(child, cursor);
    return;
  }
  if (vnode.tag === "Fragment" || typeof vnode.tag === "symbol") {
    for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOM(child, cursor);
    return;
  }
  if (vnode.tag === CONTEXT_PROVIDER_TAG) {
    runWithContext(vnode.props.context.id, vnode.props.value, () => {
      for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOM(child, cursor);
    });
    return;
  }
  const dom = advanceMeaningfulSibling(cursor);
  if (!dom || dom.nodeType !== Node.ELEMENT_NODE) {
    warnMismatch({ path: "hydrate.inplace.element", message: "SSR DOM element not found", expected: String(vnode.tag ?? "?"), found: dom ? (dom as any).tagName : "null", node: dom ?? undefined });
    return;
  }
  const el = dom as Element;
  cursor.node = el.nextSibling;
  if (!HYDRATED_IN_PLACE.has(el)) { HYDRATED_IN_PLACE.add(el); bindHostPropsInPlace(el as HTMLElement, vnode.props ?? {}); }
  const childCursor = { node: el.firstChild as Node | null };
  for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOMInside(child, el, childCursor);
}

function hydrateVNodeAgainstDOMInside(vnode: any, parentEl: Element, cursor: { node: Node | null }) {
  if (vnode == null || vnode === false || vnode === true) return;
  if (vnode.__adaptive_text != null) {
    const { found } = advanceMeaningfulChild(cursor.node, parentEl);
    if (found && found.nodeType === Node.TEXT_NODE) cursor.node = found.nextSibling;
    return;
  }
  if (typeof vnode.tag === "function") {
    let resolved: any;
    try { resolved = untrack(() => vnode.tag({ ...(vnode.props ?? {}), children: vnode.children ?? [] })); } catch { return; }
    for (const child of normalizeVNodeList(resolved)) hydrateVNodeAgainstDOMInside(child, parentEl, cursor);
    return;
  }
  if (vnode.tag === "Fragment" || typeof vnode.tag === "symbol") {
    for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOMInside(child, parentEl, cursor);
    return;
  }
  if (vnode.tag === CONTEXT_PROVIDER_TAG) {
    runWithContext(vnode.props.context.id, vnode.props.value, () => {
      for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOMInside(child, parentEl, cursor);
    });
    return;
  }
  const { found } = advanceMeaningfulChild(cursor.node, parentEl);
  if (!found || found.nodeType !== Node.ELEMENT_NODE) {
    warnMismatch({ path: "hydrate.inplace.child", message: "SSR child not found", expected: String(vnode.tag ?? "?"), found: found ? (found as any).tagName : "null", node: parentEl });
    return;
  }
  const el = found as Element;
  cursor.node = el.nextSibling;
  if (!HYDRATED_IN_PLACE.has(el)) { HYDRATED_IN_PLACE.add(el); bindHostPropsInPlace(el as HTMLElement, vnode.props ?? {}); }
  const nested = { node: el.firstChild as Node | null };
  for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOMInside(child, el, nested);
}

function bindHostPropsInPlace(el: HTMLElement, props: Record<string, any>) {
  const namespace = el.namespaceURI;
  for (const [key, value] of Object.entries(props)) {
    if (key === "children" || key === "client") continue;
    if (key.startsWith("on") && typeof value === "function") { bindDelegatedEvent(el, key.slice(2).toLowerCase(), value as EventListener); continue; }
    if (key === "ref" && value != null) { bindRef(value, el); continue; }
    if (key === "className") {
      if (typeof value === "function") createReactiveEffect(() => { el.setAttribute("class", value() ?? ""); });
      continue;
    }
    if (key === "style") {
      if (typeof value === "function") {
        createReactiveEffect(() => {

          applyStyleObject?.(el, value());
        }); // TODO: importar estático quando bundler resolver circular
      } else if (typeof value === "object" && value !== null) {
        for (const [styleKey, styleValue] of Object.entries(value as Record<string, any>)) {
          if (typeof styleValue === "function") {
            createReactiveEffect(() => {
              const resolved = styleValue();
              const cssKey = styleKey.replace(/([A-Z])/g, "-$1").toLowerCase();
              if (resolved == null || resolved === false) el.style.removeProperty(cssKey);
              else (el.style as any)[styleKey] = resolved;
            }, "layout");
          }
        }
      }
      continue;
    }
    if (typeof value === "function") {
      createReactiveEffect(() => {
        const resolved = value();
        if (resolved === false || resolved == null) { el.removeAttribute(resolveDomAttributeName(key, namespace)); return; }
        if (shouldAssignAsProperty(el, namespace, key)) (el as any)[key] = resolved;
        else el.setAttribute(resolveDomAttributeName(key, namespace), String(resolved));
      }, "layout");
    }
  }
}
