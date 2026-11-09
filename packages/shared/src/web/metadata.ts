import {CLIENT_COMPONENT_SYMBOL} from "../hydration/client-boundary.js";


export type ClientMetadata = {
    moduleId: string;
    exportName: string;
    mode:string
};

export type ClientComponentFunction = ((props?: Record<string, any>) => any) & {
    [CLIENT_COMPONENT_SYMBOL]?: ClientMetadata;
};

export function getClientComponentMetadata(
    value: unknown
): ClientMetadata | null {
    if (typeof value !== "function") return null;
    const meta = (value as ClientComponentFunction)[CLIENT_COMPONENT_SYMBOL];
    return meta ?? null;
}