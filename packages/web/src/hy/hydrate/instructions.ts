/*
 * Copyright (c) 2026 Antonio Johnathan
 * Agrupa e aplica instruções - sem VDOM
 */
import { findHydrationElement, findHydrationElementBetweenMarkers } from "./elements.js";
import { bindDelegatedEvent, wrapHydrationEventHandler } from "./events.js";
import { bindRef, hydrateDynamicProp } from "./props.js";
import { debugHydrationLog, warnHydrationInstructionMissing } from "./mismatch.js";
import { findReactiveAsyncMarkers, findReactiveAsyncMarkersBetweenMarkers, findReactiveListMarkers, findReactiveListMarkersBetweenMarkers, findReactiveMarkers, findReactiveMarkersBetweenMarkers, findReactiveStructMarkers, findReactiveStructMarkersBetweenMarkers, hydrateReactiveAsyncWithMarkers, hydrateReactiveListWithMarkers, hydrateReactiveRangeWithMarkers, hydrateReactiveStructWithMarkers } from "./reactive.js";
import type { HydrationInstruction } from "./types.js";
import {createReactiveEffect} from "../../reactive/index.js";

function groupHydrationInstructions(instructions: HydrationInstruction[]) {
  const grouped = {
    events: [] as Array<Extract<HydrationInstruction, { kind: "event" }>>,
    refs: [] as Array<Extract<HydrationInstruction, { kind: "ref" }>>,
    reactiveRanges: [] as Array<Extract<HydrationInstruction, { kind: "reactive-range" }>>,
    reactiveStructs: [] as Array<Extract<HydrationInstruction, { kind: "reactive-struct" }>>,
    reactiveLists: [] as Array<Extract<HydrationInstruction, { kind: "reactive-list" }>>,
    reactiveAsyncs: [] as Array<Extract<HydrationInstruction, { kind: "reactive-async" }>>,
    dynamicProps: [] as Array<Extract<HydrationInstruction, { kind: "dynamic-prop" }>>,
    layoutEffects: [] as Array<Extract<HydrationInstruction, { kind: "layout-effect" }>>,
    effects: [] as Array<Extract<HydrationInstruction, { kind: "effect" }>>
  };
  for (const instruction of instructions) {
    switch (instruction.kind) {
      case "event": grouped.events.push(instruction); break;
      case "ref": grouped.refs.push(instruction); break;
      case "reactive-range": grouped.reactiveRanges.push(instruction); break;
      case "reactive-struct": grouped.reactiveStructs.push(instruction); break;
      case "reactive-list": grouped.reactiveLists.push(instruction); break;
      case "reactive-async": grouped.reactiveAsyncs.push(instruction); break;
      case "dynamic-prop": grouped.dynamicProps.push(instruction); break;
      case "layout-effect": grouped.layoutEffects.push(instruction); break;
      case "effect": grouped.effects.push(instruction); break;
    }
  }
  return grouped;
}

function runCollectedEffect(instruction: Extract<HydrationInstruction, { kind: "effect" | "layout-effect" }>, type: "layout" | "effect") {
  // delega para reactive - sem VDOM

  createReactiveEffect(() => {
    const cleanup = instruction.effect();
    return cleanup;
  }, type);
}

export function applyHydrationInstructions(root: ParentNode, instructions: HydrationInstruction[]): void {
  const ordered = groupHydrationInstructions(instructions);
  ordered.events.forEach((instruction) => {
    const element = findHydrationElement(root, instruction.id);
    if (!element) { warnHydrationInstructionMissing(root, instruction.kind, instruction.id); return; }
    debugHydrationLog("[hydrate:event:bind]", instruction.id, instruction.event, (element as HTMLElement).tagName);
    bindDelegatedEvent(element as HTMLElement, instruction.event, wrapHydrationEventHandler(instruction.id, instruction.event, instruction.handler));
  });
  ordered.refs.forEach((instruction) => {
    const element = findHydrationElement(root, instruction.id);
    if (!element) { warnHydrationInstructionMissing(root, instruction.kind, instruction.id); return; }
    bindRef(instruction.ref, element as HTMLElement);
  });
  ordered.reactiveRanges.forEach((instruction) => {
    const markers = findReactiveMarkers(root, instruction.id);
    hydrateReactiveRangeWithMarkers(markers.start, markers.end, instruction);
  });
  ordered.reactiveStructs.forEach((instruction) => {
    const markers = findReactiveStructMarkers(root, instruction.id);
    hydrateReactiveStructWithMarkers(markers.start, markers.end, instruction);
  });
  ordered.reactiveLists.forEach((instruction) => {
    const markers = findReactiveListMarkers(root, instruction.id);
    hydrateReactiveListWithMarkers(markers.start, markers.end, instruction);
  });
  ordered.reactiveAsyncs.forEach((instruction) => {
    const markers = findReactiveAsyncMarkers(root, instruction.id);
    hydrateReactiveAsyncWithMarkers(markers.start, markers.end, instruction);
  });
  ordered.dynamicProps.forEach((instruction) => {
    const element = findHydrationElement(root, instruction.id);
    if (!element) { warnHydrationInstructionMissing(root, instruction.kind, instruction.id); return; }
    hydrateDynamicProp(element as HTMLElement, instruction);
  });
  ordered.layoutEffects.forEach((instruction) => { runCollectedEffect(instruction, "layout"); });
  ordered.effects.forEach((instruction) => { runCollectedEffect(instruction, "effect"); });
}

export function applyHydrationInstructionsBetweenMarkers(start: Comment, end: Comment, instructions: HydrationInstruction[]): void {
  const ordered = groupHydrationInstructions(instructions);
  ordered.events.forEach((instruction) => {
    const element = findHydrationElementBetweenMarkers(start, end, instruction.id);
    if (!element) { warnHydrationInstructionMissing(start.parentNode as ParentNode | null, instruction.kind, instruction.id); return; }
    bindDelegatedEvent(element as HTMLElement, instruction.event, wrapHydrationEventHandler(instruction.id, instruction.event, instruction.handler));
  });
  ordered.refs.forEach((instruction) => {
    const element = findHydrationElementBetweenMarkers(start, end, instruction.id);
    if (!element) { warnHydrationInstructionMissing(start.parentNode as ParentNode | null, instruction.kind, instruction.id); return; }
    bindRef(instruction.ref, element as HTMLElement);
  });
  ordered.reactiveRanges.forEach((instruction) => {
    const markers = findReactiveMarkersBetweenMarkers(start, end, instruction.id);
    hydrateReactiveRangeWithMarkers(markers.start, markers.end, instruction);
  });
  ordered.reactiveStructs.forEach((instruction) => {
    const markers = findReactiveStructMarkersBetweenMarkers(start, end, instruction.id);
    hydrateReactiveStructWithMarkers(markers.start, markers.end, instruction);
  });
  ordered.reactiveLists.forEach((instruction) => {
    const markers = findReactiveListMarkersBetweenMarkers(start, end, instruction.id);
    hydrateReactiveListWithMarkers(markers.start, markers.end, instruction);
  });
  ordered.reactiveAsyncs.forEach((instruction) => {
    const markers = findReactiveAsyncMarkersBetweenMarkers(start, end, instruction.id);
    hydrateReactiveAsyncWithMarkers(markers.start, markers.end, instruction);
  });
  ordered.dynamicProps.forEach((instruction) => {
    const element = findHydrationElementBetweenMarkers(start, end, instruction.id);
    if (!element) { warnHydrationInstructionMissing(start.parentNode as ParentNode | null, instruction.kind, instruction.id); return; }
    hydrateDynamicProp(element as HTMLElement, instruction);
  });
  ordered.layoutEffects.forEach((instruction) => { runCollectedEffect(instruction, "layout"); });
  ordered.effects.forEach((instruction) => { runCollectedEffect(instruction, "effect"); });
}
