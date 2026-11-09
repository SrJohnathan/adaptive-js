import type { HydrationInstruction } from "./types.js";
export declare function bindRef(ref: any, element: HTMLElement): void;
export declare function hydrateDynamicProp(element: HTMLElement, instruction: Extract<HydrationInstruction, {
    kind: "dynamic-prop";
}>): void;
export declare function applyPropertyValue(element: HTMLElement, key: string, value: any, options: {
    hydrating: boolean;
    path: string;
}): void;
