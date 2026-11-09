import type { HydrationManifestInstruction } from "@adaptive-js/shared";
export type RenderContext = {
    clientModuleIds?: Set<string>;
    hydrateAidCounter?: {
        value: number;
    };
    hydrateReactiveCounter?: {
        value: number;
    };
    hydrateBoundaryCounter?: {
        value: number;
    };
    hydrateManifest?: HydrationManifestInstruction[];
    currentBoundaryId?: string;
    hydrateInstructionCounters?: {
        event: number;
        ref: number;
        reactive: number;
        dynamicProp: number;
    };
};
