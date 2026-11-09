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
