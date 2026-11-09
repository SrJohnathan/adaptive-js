import { RouteDefinition } from "@adaptive-js/shared";
/**
 * Representa um redirect no runtime do Adaptive
 */
export type AdaptiveRedirect = {
    __type: "redirect";
    location: string;
    status: number;
};
/**
 * Cria uma resposta de redirect (SSR-safe e agnóstico de adapter)
 */
export declare function redirect(location: string, status?: number): AdaptiveRedirect;
export interface NavigateOptions {
    replace?: boolean;
    scroll?: boolean;
}
export interface Router {
    pathname: () => string;
    query: () => Record<string, string>;
    params: () => Record<string, string>;
    searchParams: () => URLSearchParams;
    hash: () => string;
    url: () => string;
    push: (href: string, options?: NavigateOptions) => void;
    replace: (href: string, options?: Omit<NavigateOptions, "replace">) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
    prefetch: (href: string) => Promise<void> | void;
    init: () => void;
}
/**
 * Define as rotas disponíveis no roteador do cliente.
 */
export declare function setClientRoutes(routes: RouteDefinition[]): void;
/**
 * Retorna as rotas definidas no cliente.
 */
export declare function getClientRoutes(): RouteDefinition[];
/**
 * Hook de navegação reativa do AdaptiveJS.
 *
 * Fornece getters reativos (pathname, query, params, searchParams, hash, url)
 * e métodos de navegação (push, replace, back, forward, refresh).
 */
export declare function useRouter(): Router;
