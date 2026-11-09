export type ExternalPattern = string | RegExp | ((id: string, parentId?: string, isResolved?: boolean) => boolean | null | void);
export type AdaptiveClientConfig = {
    /**
     * Módulos que o Rolldown não deve bundlar no client.
     * Suporta pacotes simples ("monaco-editor"), wildcards ("lodash/*"), RegExp ou funções de filtro.
     */
    external?: ExternalPattern | ExternalPattern[];
};
export type AdaptiveActionsConfig = {
    /** Origens adicionais permitidas no endpoint /_action (além do Host). */
    allowedOrigins?: string[];
};
export type AdaptiveConfig = {
    client?: AdaptiveClientConfig;
    actions?: AdaptiveActionsConfig;
};
/**
 * Resolve e importa o config do app.
 * Retorna `{}` se não existir arquivo.
 */
export declare function loadAdaptiveConfig(appDir: string): Promise<AdaptiveConfig>;
/** Resolve origens permitidas para /_action a partir de config + env. */
export declare function resolveActionAllowedOrigins(config?: AdaptiveConfig): string[] | undefined;
