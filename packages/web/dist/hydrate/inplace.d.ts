type DomCursor = {
    node: Node | null;
    end: Node;
    parent: Node | null;
};
export declare function normalizeVNodeList(value: any): any[];
export declare function hydrateVNodeAgainstDOM(vnode: any, cursor: DomCursor): void;
export {};
