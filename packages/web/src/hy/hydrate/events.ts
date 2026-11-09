/*
 * Copyright (c) 2026 Antonio Johnathan
 * Event delegation - sem VDOM
 */
import { debugHydrationLog } from "./mismatch.js";

const eventHandlers = new WeakMap<EventTarget, Map<string, EventListener>>();

export function bindDelegatedEvent(element: HTMLElement, eventName: string, handler: EventListener) {
  let handlers = eventHandlers.get(element);
  if (!handlers) {
    handlers = new Map<string, EventListener>();
    eventHandlers.set(element, handlers);
  }
  const prev = handlers.get(eventName);
  if (prev) element.removeEventListener(eventName, prev);
  handlers.set(eventName, handler);
  element.addEventListener(eventName, handler);
}

export function wrapHydrationEventHandler(id: string, eventName: string, handler: EventListener): EventListener {
  return function hydratedEventHandler(this: EventTarget, event: Event) {
    debugHydrationLog("[hydrate:event:fired]", id, eventName);
    return handler.call(this, event);
  };
}
