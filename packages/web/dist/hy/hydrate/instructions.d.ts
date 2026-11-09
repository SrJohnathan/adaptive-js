import type { HydrationInstruction } from "./types.js";
export declare function applyHydrationInstructions(root: ParentNode, instructions: HydrationInstruction[]): void;
export declare function applyHydrationInstructionsBetweenMarkers(start: Comment, end: Comment, instructions: HydrationInstruction[]): void;
