import type { ReactiveSource } from "../../reactive/index.js";
export type AdaptiveHydrationMismatch = {
    path: string;
    /** Ausente quando a rota nao pode ser lida; o report nunca deve falhar por isso. */
    route?: string;
    message: string;
    expected?: string;
    found?: string;
    htmlSnippet?: string;
    timestamp: number;
};
export type HydrateOptions = {
    recover?: boolean;
    removeMarkers?: boolean;
};
export type HydrationInstruction = {
    kind: "event";
    id: string;
    event: string;
    handler: EventListener;
} | {
    kind: "ref";
    id: string;
    ref: any;
} | {
    kind: "reactive-range";
    id: string;
    getter: () => any;
} | {
    kind: "reactive-struct";
    id: string;
    render: () => any;
} | {
    kind: "reactive-list";
    id: string;
    getter: () => any[];
} | {
    kind: "reactive-async";
    id: string;
    getter: () => Promise<any> | any;
} | {
    kind: "dynamic-prop";
    id: string;
    prop: string;
    getter: () => any;
} | {
    kind: "layout-effect";
    effect: () => void | (() => void);
    deps?: any[];
    ignoredSources?: ReactiveSource[];
} | {
    kind: "effect";
    effect: () => void | (() => void);
    deps?: any[];
    ignoredSources?: ReactiveSource[];
};
