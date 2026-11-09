/*
 * Copyright (c) 2026 Antonio Johnathan
 * Event delegation - sem VDOM
 */
import { debugHydrationLog } from "./mismatch.js";
const eventHandlers = new WeakMap();
export function bindDelegatedEvent(element, eventName, handler) {
    let handlers = eventHandlers.get(element);
    if (!handlers) {
        handlers = new Map();
        eventHandlers.set(element, handlers);
    }
    const prev = handlers.get(eventName);
    if (prev)
        element.removeEventListener(eventName, prev);
    handlers.set(eventName, handler);
    element.addEventListener(eventName, handler);
}
export function wrapHydrationEventHandler(id, eventName, handler) {
    return function hydratedEventHandler(event) {
        debugHydrationLog("[hydrate:event:fired]", id, eventName);
        return handler.call(this, event);
    };
}
//# sourceMappingURL=events.js.map