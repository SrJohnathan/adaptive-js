export type ActionMultipartPart = {
    data: Uint8Array;
    name?: string;
    filename?: string;
    type?: string;
};
export type ActionCallRequest = {
    moduleId: string;
    actionName: string;
    args: unknown[];
};
/** h3 v2 entrega Headers; outros adapters entregam objeto comum. */
export declare function getActionHeader(headers: Headers | Record<string, string | string[] | undefined> | undefined, name: string): string | null;
export declare function parseActionCallRequest(options: {
    headers?: Headers | Record<string, string | string[] | undefined>;
    body?: unknown;
    parts?: FormData | ActionMultipartPart[];
}): ActionCallRequest;
