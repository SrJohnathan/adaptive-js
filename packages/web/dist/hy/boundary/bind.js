/*
 * Copyright (c) 2026 Antonio Johnathan
 * Liga manifest SSR com bindings coletados no client
 */
import { describeCollectedOrigin } from "./collect.js";
export function bindHydrationManifest(manifest, collected) {
    const origin = (key) => describeCollectedOrigin(collected, key);
    const withOrigin = (feature, keys) => keys.length > 0 ? `${feature} [${keys.map((k) => `${k}@${origin(k) ?? "?"}`).join(", ")}]` : feature;
    const instructions = [];
    const unsupported = new Set(collected.unsupportedFeatures);
    // Sem o parametro explicito, `new Map(any)` infere Map<unknown, unknown> e o
    // .get() volta unknown, quebrando todo o switch abaixo.
    const events = new Map(collected.events);
    const refs = new Map(collected.refs);
    const reactive = new Map(collected.reactive);
    const dynamicProps = new Map(collected.dynamicProps);
    for (const ins of manifest.instructions) {
        switch (ins.kind) {
            case "event": {
                const next = events.get(ins.key);
                if (!next) {
                    unsupported.add(`manifest:event:${ins.key}:${ins.id}`);
                    break;
                }
                events.delete(ins.key);
                if (next.event !== ins.event) {
                    unsupported.add(`manifest:event-event:${ins.key}:${ins.id}:${ins.event}!=${next.event}`);
                    break;
                }
                instructions.push({ kind: "event", id: ins.id, event: ins.event, handler: next.handler });
                break;
            }
            case "ref": {
                const next = refs.get(ins.key);
                if (next == null) {
                    unsupported.add(`manifest:ref:${ins.key}:${ins.id}`);
                    break;
                }
                refs.delete(ins.key);
                instructions.push({ kind: "ref", id: ins.id, ref: next });
                break;
            }
            case "reactive-range": {
                const next = reactive.get(ins.key);
                if (!next) {
                    unsupported.add(`manifest:reactive-range:${ins.key}:${ins.id}`);
                    break;
                }
                reactive.delete(ins.key);
                instructions.push({ kind: "reactive-range", id: ins.id, getter: next });
                break;
            }
            case "reactive-struct": {
                const next = reactive.get(ins.key);
                if (!next) {
                    unsupported.add(`manifest:reactive-struct:${ins.key}:${ins.id}`);
                    break;
                }
                reactive.delete(ins.key);
                instructions.push({ kind: "reactive-struct", id: ins.id, render: next });
                break;
            }
            case "reactive-list": {
                const next = reactive.get(ins.key);
                if (!next) {
                    unsupported.add(`manifest:reactive-list:${ins.key}:${ins.id}`);
                    break;
                }
                reactive.delete(ins.key);
                instructions.push({ kind: "reactive-list", id: ins.id, getter: next });
                break;
            }
            case "reactive-async": {
                const next = reactive.get(ins.key);
                if (!next) {
                    unsupported.add(`manifest:reactive-async:${ins.key}:${ins.id}`);
                    break;
                }
                reactive.delete(ins.key);
                instructions.push({ kind: "reactive-async", id: ins.id, getter: next });
                break;
            }
            case "dynamic-prop": {
                const next = dynamicProps.get(ins.key);
                if (!next) {
                    unsupported.add(`manifest:dynamic-prop:${ins.key}:${ins.id}:${ins.prop}`);
                    break;
                }
                dynamicProps.delete(ins.key);
                if (next.prop !== ins.prop) {
                    unsupported.add(`manifest:dynamic-prop-prop:${ins.key}:${ins.id}:${ins.prop}!=${next.prop}`);
                    break;
                }
                instructions.push({ kind: "dynamic-prop", id: ins.id, prop: ins.prop, getter: next.getter });
                break;
            }
        }
    }
    if (events.size > 0)
        unsupported.add(withOrigin(`manifest:event:extra:${Array.from(events.keys()).join(",")}`, Array.from(events.keys())));
    if (refs.size > 0)
        unsupported.add(withOrigin(`manifest:ref:extra:${Array.from(refs.keys()).join(",")}`, Array.from(refs.keys())));
    if (reactive.size > 0)
        unsupported.add(withOrigin(`manifest:reactive:extra:${Array.from(reactive.keys()).join(",")}`, Array.from(reactive.keys())));
    if (dynamicProps.size > 0)
        unsupported.add(withOrigin(`manifest:dynamic-prop:extra:${Array.from(dynamicProps.keys()).join(",")}`, Array.from(dynamicProps.keys())));
    instructions.push(...collected.layoutEffects.map((i) => ({ kind: "layout-effect", effect: i.effect, deps: i.deps, ignoredSources: i.ignoredSources })), ...collected.effects.map((i) => ({ kind: "effect", effect: i.effect, deps: i.deps, ignoredSources: i.ignoredSources })));
    return { instructions, unsupportedFeatures: Array.from(unsupported) };
}
//# sourceMappingURL=bind.js.map