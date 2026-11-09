import { CLIENT_COMPONENT_SYMBOL } from "../hydration/client-boundary.js";
export type ClientMetadata = {
    moduleId: string;
    exportName: string;
    mode: string;
};
export type ClientComponentFunction = ((props?: Record<string, any>) => any) & {
    [CLIENT_COMPONENT_SYMBOL]?: ClientMetadata;
};
export declare function getClientComponentMetadata(value: unknown): ClientMetadata | null;
