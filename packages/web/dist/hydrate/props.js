/*
 * Copyright (c) 2026 Antonio Johnathan
 * Props reativas e refs
 */
import { createReactiveEffect } from "../reactive/events.js";
import { resolveDomAttributeName, shouldAssignAsProperty } from "./dom.js";
export function bindRef(ref, element) {
    if (typeof ref === "function")
        ref(element);
    else if (ref && typeof ref === "object")
        ref.current = element;
}
export function hydrateDynamicProp(element, instruction) {
    const namespace = element.namespaceURI;
    createReactiveEffect(() => {
        const resolved = instruction.getter();
        if (resolved == null || resolved === false) {
            element.removeAttribute(resolveDomAttributeName(instruction.prop, namespace));
            return;
        }
        if (shouldAssignAsProperty(element, namespace, instruction.prop)) {
            element[instruction.prop] = resolved;
        }
        else {
            element.setAttribute(resolveDomAttributeName(instruction.prop, namespace), String(resolved));
        }
    });
}
export function applyPropertyValue(element, key, value, options) {
    const preserveSelection = options.hydrating &&
        key === "value" &&
        (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) &&
        document.activeElement === element;
    const selection = preserveSelection ? captureSelection(element) : null;
    element[key] = value;
    if (selection)
        restoreSelection(element, selection);
}
function captureSelection(el) {
    return { start: el.selectionStart, end: el.selectionEnd, direction: el.selectionDirection };
}
function restoreSelection(el, sel) {
    if (sel.start == null || sel.end == null)
        return;
    try {
        el.setSelectionRange(sel.start, sel.end, sel.direction ?? undefined);
    }
    catch { }
}
//# sourceMappingURL=props.js.map