export interface CollectedRow {
    key: string;
    kind: "event" | "dynamic-prop" | "reactive" | "ref";
    detail: string;
    origin: string;
}
export interface HydrationTraceEntry {
    /** performance.now() no momento da decisão */
    at: number;
    readyState: DocumentReadyState;
    debugName: string;
    boundaryId?: string;
    variant: "root" | "markers";
    /** mode do componente raiz segundo o metadata ("client" | "hydrate" | null) */
    rootMode: string | null;
    manifestFound: boolean;
    collectedCount: number;
    /** lista COMPLETA, sem o corte do relatório */
    unsupportedFeatures: string[];
    manifest: unknown;
    collected: CollectedRow[];
    stack?: string;
}
declare global {
    interface Window {
        __ADAPTIVE_HYDRATION_TRACE__?: HydrationTraceEntry[];
    }
}
/** Uma linha por binding coletado no client, na ordem em que a coleta andou. */
export declare function summarizeCollected(collected: any): CollectedRow[];
export declare function traceHydrationMismatch(input: {
    debugName: string;
    boundaryId?: string;
    component?: unknown;
    manifest: unknown;
    collected: any;
    unsupportedFeatures: string[];
    variant: "root" | "markers";
}): HydrationTraceEntry | undefined;
