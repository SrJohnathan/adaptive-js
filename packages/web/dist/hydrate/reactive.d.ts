import type { HydrationInstruction } from "./types.js";
export declare function findReactiveMarkers(root: ParentNode, id: string): {
    start: null;
    end: null;
};
export declare function findReactiveMarkersBetweenMarkers(start: Comment, end: Comment, id: string): {
    start: Comment | null;
    end: Comment | null;
};
export declare function findReactiveStructMarkers(root: ParentNode, id: string): {
    start: null;
    end: null;
};
export declare function findReactiveStructMarkersBetweenMarkers(start: Comment, end: Comment, id: string): {
    start: Comment | null;
    end: Comment | null;
};
export declare function findReactiveListMarkers(root: ParentNode, id: string): {
    start: null;
    end: null;
};
export declare function findReactiveListMarkersBetweenMarkers(start: Comment, end: Comment, id: string): {
    start: Comment | null;
    end: Comment | null;
};
export declare function findReactiveAsyncMarkers(root: ParentNode, id: string): {
    start: null;
    end: null;
};
export declare function findReactiveAsyncMarkersBetweenMarkers(start: Comment, end: Comment, id: string): {
    start: Comment | null;
    end: Comment | null;
};
export declare function hydrateReactiveRangeWithMarkers(start: Comment | null, end: Comment | null, instruction: Extract<HydrationInstruction, {
    kind: "reactive-range";
}>): void;
export declare function hydrateReactiveStructWithMarkers(start: Comment | null, end: Comment | null, instruction: Extract<HydrationInstruction, {
    kind: "reactive-struct";
}>): void;
export declare function hydrateReactiveListWithMarkers(start: Comment | null, end: Comment | null, instruction: Extract<HydrationInstruction, {
    kind: "reactive-list";
}>): void;
export declare function hydrateReactiveAsyncWithMarkers(start: Comment | null, end: Comment | null, instruction: Extract<HydrationInstruction, {
    kind: "reactive-async";
}>): void;
