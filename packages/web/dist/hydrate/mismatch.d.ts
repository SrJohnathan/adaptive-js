import type { AdaptiveHydrationMismatch } from "./types.js";
export declare function warnMismatch(details: {
    path: string;
    message: string;
    expected?: string;
    found?: string;
    node?: Node;
}): void;
export declare function warnHydrationInstructionMissing(root: ParentNode | null, kind: string, id: string): void;
export declare function getHydrationMismatches(): AdaptiveHydrationMismatch[];
export declare function clearHydrationMismatches(): void;
export declare function debugHydrationLog(...args: any[]): void;
