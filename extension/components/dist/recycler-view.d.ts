import type { AdaptiveNode } from "@adaptive-js/web";
export type ItemValue = string | number | boolean | (() => string | number | boolean);
export type ItemStyle = Partial<CSSStyleDeclaration> | Record<string, string> | (() => Partial<CSSStyleDeclaration> | Record<string, string>);
export interface ItemNode {
    type: string;
    value?: ItemValue;
    class?: ItemValue;
    style?: ItemStyle;
    props?: Record<string, ItemValue>;
    onClick?: (event: MouseEvent) => void;
    onContextMenu?: (event: MouseEvent) => void;
    children?: Array<ItemNode | AdaptiveNode>;
}
export type NearEdgeInfo = {
    edge: "start" | "end";
    scrollTop: number;
    distance: number;
};
export type RecyclerViewApi = {
    preserveScrollAround: (mutate: () => void | Promise<void>) => Promise<void>;
    getViewport: () => HTMLDivElement | null;
    scrollToOffset: (top: number) => void;
};
export type RecyclerViewProps<T> = {
    items: T[] | (() => T[]);
    itemHeight: number;
    overscan?: number;
    height?: number | string;
    width?: number | string;
    className?: string;
    emptyState?: AdaptiveNode;
    item: (item: T, index: number) => ItemNode | AdaptiveNode;
    getItemKey: (item: T, index: number) => string | number;
    onItemClick?: (item: T, index: number, event: MouseEvent) => void;
    onNearEdge?: (info: NearEdgeInfo) => void;
    nearEdgeThreshold?: number;
    onReady?: (api: RecyclerViewApi) => void;
};
export declare function RecyclerView<T>(props: RecyclerViewProps<T>): AdaptiveNode;
