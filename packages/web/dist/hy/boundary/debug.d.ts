export declare function formatHydrationMismatchReport(config: any): string;
export declare function dumpBoundaryHtmlForDebug(_: any): void;
export declare function captureBoundaryHtmlSnippet(root?: Element, len?: number): string;
export declare function captureMismatchSnippet(_: any): {
    targetId: string;
    domPath: string;
    html: string;
} | null;
