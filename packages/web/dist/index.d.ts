import { AdaptiveRouteContext } from "@adaptive-js/shared";
import type { ClientComponentFunction } from "@adaptive-js/shared";
export * from "./jsx-runtime.js";
export { Fragment } from "@adaptive-js/jsx";
export type { AdaptiveChild, AdaptiveNode, AdaptiveType, Ref, StyleObject, MaybeSignal } from "@adaptive-js/jsx";
export { getClientComponentMetadata } from "@adaptive-js/shared";
export type { ClientMetadata } from "@adaptive-js/shared";
/**
 * Marca um export como componente client/hydrate.
 * O ci injeta esta chamada no rodapé de cada módulo com diretiva,
 * depois que a diretiva é removida do código.
 */
export declare function markClientExport(value: unknown, moduleId: string, exportName: string, mode: "client" | "hydrate"): void;
/**
 * Executado no bundle do client para localizar os componentes marcados.
 * A implementação real vive em hy/boundary: ela varre os comentários
 * <!--adaptive-client-*-> que o SSR deixou no HTML, monta as islands "client" e
 * hidrata as "hydrate" reusing os nós que o servidor já renderizou.
 *
 * Continua sendo executado só no bundle do browser - no SSR puro nada chama
 * isto, e hy/boundary não toca em window/document no topo do módulo.
 */
export { hydrateClientComponents } from "./hy/boundary/index.js";
export { HYDRATION_ERROR_EVENT, HYDRATION_MISMATCH_EVENT, clearHydrationMismatches, getHydrationMismatches, reportHydrationError, warnMismatch, } from "./hy/hydrate/mismatch.js";
export { renderToDOM } from "./hy/hydrate/index.js";
export * from "./front/handler-scope.js";
export * from "./front/context-runtime.js";
export * from "./front/router.js";
export * from "./reactive/index.js";
export type PageContext = AdaptiveRouteContext;
export { callServerAction } from "@adaptive-js/shared";
export { isClientEnabled, ENABLED_CLIENT_FLAG } from "./hy/boundary/dev-logs.js";
/**
 * Marca um export como componente "client" e devolve o vnode que o SSR
 * transforma no marcador da ilha.
 *
 * O codegen sempre passa a implementacao como serverRender nos dois modos, e
 * quem decide se ela roda no servidor e a flag ADAPTIVE_ENABLED_CLIENT:
 * "client" so server-renderiza com a flag ligada, desligada cai num
 * placeholder. Ver factory.ts.
 */
export declare function createClientComponent(moduleId: string, exportName?: string, serverRender?: ((props?: Record<string, any>) => any) | null): ClientComponentFunction;
/**
 * Marca um export como componente "hydrate": o server renderiza e o client
 * assume depois sobre o DOM existente. serverRender aqui e o SSR da ilha, e
 * roda mesmo com ADAPTIVE_ENABLED_CLIENT desligada.
 */
export declare function createHydrateComponent(moduleId: string, exportName?: string, serverRender?: ((props?: Record<string, any>) => any) | null): ClientComponentFunction;
