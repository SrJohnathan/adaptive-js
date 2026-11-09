export type RenderToDOM = (vnode: any, namespace: string | null) => Node;
/**
 * Extrai key de um vnode Adaptive.
 * Em Adaptive/JSX a key pode estar em:
 * - vnode.key (padrão React-like)
 * - vnode.props.key
 * - vnode.props["data-key"]
 */
export declare function getVNodeKey(value: any): string | number | null;
export declare function mountKeyedReactiveFunction(thunk: () => any, namespace: string | null, renderToDOM: RenderToDOM): DocumentFragment;
