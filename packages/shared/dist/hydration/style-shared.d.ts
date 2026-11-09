export declare function toCssPropertyName(styleKey: string): string;
export declare function resolveStyleEntries(style: Record<string, any> | (() => Record<string, any>) | null | undefined): [string, any][];
export declare function serializeStyleLike(style: Record<string, any> | (() => Record<string, any>) | null | undefined): string;
