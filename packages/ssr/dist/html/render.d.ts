import type { RenderContext } from "./types.js";
export declare function renderToString(node: any): string;
export declare function renderToStringWithMetadata(node: any): {
    html: string;
    clientModuleIds: string[];
};
export declare function renderNode(node: any, context: RenderContext): string;
