import type { HydrationInstruction } from "../hydrate/types.js";
import { HydrationManifest } from "@adaptive-js/shared";
export declare function bindHydrationManifest(manifest: HydrationManifest, collected: any): {
    instructions: HydrationInstruction[];
    unsupportedFeatures: string[];
};
