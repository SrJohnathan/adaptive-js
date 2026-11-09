import type { CspDirectives } from "./types.js";
export declare function buildCspHeader(directives: CspDirectives, nonce?: string): string;
export declare function generateNonce(): string;
