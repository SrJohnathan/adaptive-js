/*
 * Copyright (c) 2026 Antonio Johnathan
 * Coleta de bindings reativos - sem VDOM, varre VNode efêmero
 */
import { CONTEXT_PROVIDER_TAG, getClientComponentMetadata, isClientBoundaryTag, isHydrateSlotTag, isSupportedDynamicHydrationPropName } from "@adaptive-js/shared";
import { runHydrationCollection, runWithContext, untrack } from "../../reactive/index.js";
import { createElement } from "@adaptive-js/core";
function describeComponent(state, tag) {
    const name = typeof tag === "function" ? (tag.name || "anon") : String(tag);
    return state.currentModuleId ? `${state.currentModuleId}:${name}` : name;
}
function describeBindingOrigin(state, propKey) {
    const chain = state.componentPath.length > 0 ? state.componentPath.join(" > ") : "(raiz do boundary)";
    return propKey ? `${chain} :: ${propKey}` : chain;
}
function resolveComponentProps(node) {
    const props = { ...(node.props ?? {}) };
    const children = node.children ?? node.props?.children;
    if (children != null)
        props.children = children;
    return props;
}
function resolveInstructionKey(kind, index) {
    switch (kind) {
        case "event": return `e${index}`;
        case "ref": return `f${index}`;
        case "reactive": return `rx${index}`;
        case "dynamicProp": return `p${index}`;
    }
}
function nextInstructionKey(state, kind) {
    const v = state.counters[kind];
    state.counters[kind] += 1;
    return resolveInstructionKey(kind, v);
}
export function collectHydrationBindings(Component, props, moduleId) {
    if (typeof Component !== "function") {
        return { events: new Map(), refs: new Map(), reactive: new Map(), dynamicProps: new Map(), layoutEffects: [], effects: [], unsupportedFeatures: [], paths: new Map() };
    }
    const collected = runHydrationCollection(() => {
        const bindings = {
            events: new Map(),
            refs: new Map(),
            reactive: new Map(),
            dynamicProps: new Map(),
            counters: { event: 0, ref: 0, reactive: 0, dynamicProp: 0 },
            unsupportedFeatures: new Set(),
            paths: new Map(),
            componentPath: [],
            currentModuleId: moduleId,
        };
        collectFromNode(createElement(Component, props ?? {}), bindings);
        return { ...bindings, unsupportedFeatures: Array.from(bindings.unsupportedFeatures) };
    });
    return {
        events: collected.value.events,
        refs: collected.value.refs,
        reactive: collected.value.reactive,
        dynamicProps: collected.value.dynamicProps,
        layoutEffects: collected.effectInstructions.filter((i) => i.kind === "layout-effect").map((i) => ({ effect: i.effect, deps: i.deps, ignoredSources: i.ignoredSources })),
        effects: collected.effectInstructions.filter((i) => i.kind === "effect").map((i) => ({ effect: i.effect, deps: i.deps, ignoredSources: i.ignoredSources })),
        unsupportedFeatures: Array.from(new Set([...collected.unsupportedFeatures, ...collected.value.unsupportedFeatures])),
        paths: collected.value.paths
    };
}
function collectFromNode(node, state) {
    if (node == null || node === false || typeof node === "string" || typeof node === "number" || typeof node === "boolean")
        return;
    if (typeof node === "function") {
        const key = nextInstructionKey(state, "reactive");
        state.reactive.set(key, node);
        state.paths.set(key, describeBindingOrigin(state));
        return;
    }
    if (Array.isArray(node)) {
        for (const c of node)
            collectFromNode(c, state);
        return;
    }
    if (node.tag === CONTEXT_PROVIDER_TAG) {
        runWithContext(node.props.context.id, node.props.value, () => { collectFromNode(node.children ?? [], state); });
        return;
    }
    if (typeof node.tag === "function") {
        const meta = getClientComponentMetadata(node.tag);
        // Diretiva aninhada (hydrate ou client) = boundary/escopo próprio: o server emite um
        // manifest separado e o filho hidrata sozinho. A raiz também tem meta, mas não pode ser pulada.
        if (meta && state.componentPath.length > 0)
            return;
        state.componentPath.push(describeComponent(state, node.tag));
        try {
            collectFromNode(untrack(() => node.tag(resolveComponentProps(node))), state);
        }
        finally {
            state.componentPath.pop();
        }
        return;
    }
    if (node.tag === "Fragment" || typeof node.tag === "symbol") {
        collectFromNode(node.children ?? [], state);
        return;
    }
    if (isHydrateSlotTag(node.tag) || isClientBoundaryTag(node.tag))
        return;
    const props = node.props ?? {};
    for (const [key, value] of Object.entries(props)) {
        if (key.startsWith("on") && typeof value === "function") {
            const k = nextInstructionKey(state, "event");
            state.events.set(k, { event: key.slice(2).toLowerCase(), handler: value });
            state.paths.set(k, describeBindingOrigin(state, key));
            continue;
        }
        if (key === "ref" && value != null) {
            const k = nextInstructionKey(state, "ref");
            state.refs.set(k, value);
            state.paths.set(k, describeBindingOrigin(state));
            continue;
        }
        if (key !== "children" && key !== "ref" && typeof value === "function" && isSupportedDynamicHydrationPropName(key)) {
            const k = nextInstructionKey(state, "dynamicProp");
            state.dynamicProps.set(k, { prop: key, getter: value });
            state.paths.set(k, describeBindingOrigin(state, key));
            continue;
        }
        if (!key.startsWith("on") && key !== "children" && key !== "ref" && typeof value === "function" && !isSupportedDynamicHydrationPropName(key)) {
            state.unsupportedFeatures.add(`dynamic-prop:${key}`);
        }
    }
    collectFromNode(node.children ?? [], state);
}
export function describeCollectedOrigin(collected, key) {
    const paths = collected?.paths;
    return paths instanceof Map ? paths.get(key) : undefined;
}
//# sourceMappingURL=collect.js.map