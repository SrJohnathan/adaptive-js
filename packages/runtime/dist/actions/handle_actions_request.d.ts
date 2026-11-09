export type ActionResult<T = unknown> = {
    status: number;
    body: {
        ok: true;
        data: T;
    };
} | {
    status: number;
    body: {
        ok: false;
        error: string;
        message?: string;
    };
};
export interface ActionRequestMeta {
    headers?: Headers | Record<string, string | string[] | undefined>;
    method?: string;
    url?: string;
}
export interface HandleActionsRequestOptions {
    moduleId: string;
    actionName: string;
    args: any[];
    isProduction: boolean;
    sourceDir: string;
    serverBuildDir: string;
    context?: any;
    request?: ActionRequestMeta;
    allowedOrigins?: string[];
}
/** Resolve origens adicionais permitidas para /_action a partir de env. */
export declare function resolveActionAllowedOriginsFromEnv(): string[] | undefined;
export declare function handle_actions_request(options: HandleActionsRequestOptions): Promise<ActionResult>;
