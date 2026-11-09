import { type HydrationManifestInstruction } from "@adaptive-js/shared";
import type { RenderContext } from "./types.js";
export declare function nextKey(context: RenderContext, kind: "event" | "ref" | "reactive" | "dynamicProp"): string;
export declare function maybeAllocateHydrationId(props: Record<string, any>, context: RenderContext): string | null;
export declare function appendManifestForProps(props: Record<string, any>, id: string, context: RenderContext): void;
export declare function renderManifest(boundaryId: string, instructions: HydrationManifestInstruction[]): string;
