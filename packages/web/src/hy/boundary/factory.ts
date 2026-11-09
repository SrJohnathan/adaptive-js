/*
 * Copyright (c) 2026 Antonio Johnathan
 * Factory de boundary - cria descriptor sem VDOM
 */


  import {
    CLIENT_BOUNDARY_MODE_CLIENT,
    CLIENT_BOUNDARY_MODE_HYDRATE,
    CLIENT_BOUNDARY_TAG,
    CLIENT_COMPONENT_SYMBOL,
    type ClientComponentFunction
  } from "@adaptive-js/shared";
  import { createElement } from "@adaptive-js/core";
  import { buildPlaceholder, isClientEnabled } from "./dev-logs.js";

  function serializeClientProps(props: Record<string, any>) {
  return JSON.stringify(serializeValue(props, new WeakSet()));
}
function stripChildrenFromProps(props: Record<string, any>) {
  if (!("children" in props)) return props;
  const next = { ...props };
  delete next.children;
  return next;
}
function serializeValue(value: any, seen: WeakSet<object>): any {
  if (value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (typeof value === "bigint") return { __adaptive_type: "bigint", value: value.toString() };
  if (value instanceof Date) return { __adaptive_type: "date", value: value.toISOString() };
  if (Array.isArray(value)) return value.map((i) => serializeValue(i, seen));
  if (typeof value === "function" || typeof value === "symbol") return { __adaptive_type: "unsupported", value: typeof value };
  if (typeof value === "object") {
    if (seen.has(value)) return { __adaptive_type: "circular" };
    seen.add(value);
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) {
      if (k === "ref") continue;
      const sanitized = serializeValue(v, seen);
      if (sanitized !== undefined) out[k] = sanitized;
    }
    seen.delete(value);
    return out;
  }
  return undefined;
}

  export function createBoundaryComponent({ mode, moduleId, exportName, serverRender, wrapServerProps }: {
    mode: string; moduleId: string; exportName: string;
    serverRender?: ((props?: Record<string, any>) => any) | null;
    wrapServerProps?: (props: Record<string, any>) => Record<string, any>;
  }) {
    const isClient = mode === CLIENT_BOUNDARY_MODE_CLIENT;
    const hasChildren = (props: Record<string, any> = {}) =>
      props.children !== undefined && (!Array.isArray(props.children) || props.children.length > 0);

    const component = ((props: Record<string, any> = {}) => {
      // "hydrate" significa "o server renderizou, o client assume depois", entao
      // serverRender sempre entra. "client" so renderiza aqui se a flag ligar.
      let inner: any = null;
      if (typeof serverRender === "function") {
        if (!isClient || isClientEnabled()) {
          inner = createElement(serverRender, wrapServerProps ? wrapServerProps(props) : props);
        } else {
          // Ilha client desligada: o placeholder mostra onde ela vai aparecer.
          inner = buildPlaceholder(moduleId, exportName);
          mode = CLIENT_BOUNDARY_MODE_HYDRATE
        }
      } else if (isClient && !isClientEnabled()) {
        inner = buildPlaceholder(moduleId, exportName);
        mode = CLIENT_BOUNDARY_MODE_HYDRATE
      }

      return createElement(CLIENT_BOUNDARY_TAG, {
        "data-adaptive-client-mode": mode,
        "data-adaptive-client-module": moduleId,
        "data-adaptive-client-export": exportName,
        "data-adaptive-client-props": serializeClientProps(stripChildrenFromProps(props)),
        "data-adaptive-client-has-children": hasChildren(props) ? "true" : undefined,
        children: inner
      });
    }) as ClientComponentFunction;

    component[CLIENT_COMPONENT_SYMBOL] = { moduleId, exportName, mode };
    return component;
  }

export function isClientComponent(value: unknown): value is ClientComponentFunction {
  return typeof value === "function" && Boolean((value as ClientComponentFunction)[CLIENT_COMPONENT_SYMBOL]);
}
