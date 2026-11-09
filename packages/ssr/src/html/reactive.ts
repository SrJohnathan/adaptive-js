/*
 * Copyright (c) 2026 Antonio Johnathan
 * Lógica de markers reativos - decide que tipo de comentário gerar
 */

import {
  REACTIVE_ASYNC_END,
  REACTIVE_ASYNC_START,
  REACTIVE_CHILD_END,
  REACTIVE_CHILD_START,
  REACTIVE_LIST_END,
  REACTIVE_LIST_START,
  REACTIVE_STRUCT_END,
  REACTIVE_STRUCT_START
} from "@adaptive-js/shared";

export function resolveReactiveMarkerPair(value: any) {
  if (value != null && typeof value === "object" && typeof (value as any).then === "function") {
    return { start: REACTIVE_ASYNC_START, end: REACTIVE_ASYNC_END };
  }
  if (Array.isArray(value)) {
    const isText = value.every((x: any) =>
        Array.isArray(x)
            ? x.every((y: any) => y == null || typeof y !== "object")
            : x == null || typeof x !== "object"
    );
    return isText
        ? { start: REACTIVE_CHILD_START, end: REACTIVE_CHILD_END }
        : { start: REACTIVE_LIST_START, end: REACTIVE_LIST_END };
  }
  if (value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return { start: REACTIVE_CHILD_START, end: REACTIVE_CHILD_END };
  }
  return { start: REACTIVE_STRUCT_START, end: REACTIVE_STRUCT_END };
}

export function resolveManifestKind(start: string) {
  if (start === REACTIVE_CHILD_START) return "reactive-range";
  if (start === REACTIVE_STRUCT_START) return "reactive-struct";
  if (start === REACTIVE_LIST_START) return "reactive-list";
  return "reactive-async";
}

export function resolvePreview(v: any) {
  return v != null && typeof v === "object" && typeof (v as any).then === "function" ? "" : v;
}
