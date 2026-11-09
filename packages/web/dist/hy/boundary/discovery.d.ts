import { HydrationManifest } from "@adaptive-js/shared";
export declare function findCommentBoundaries(moduleId: string): {
    start: Comment;
    end: Comment;
    mode: string;
    moduleId: string;
    exportName: string;
    rawProps: string;
    hasChildren: boolean;
    boundaryId: string;
}[];
export declare function decodeCommentPayload(raw: string): {
    mode: string;
    moduleId: string;
    exportName: string;
    rawProps: string;
    hasChildren: boolean;
    boundaryId: string;
} | null;
export declare function readHydrationManifestFromRoot(root: HTMLElement, boundaryId?: string): {
    script: HTMLScriptElement;
    manifest: HydrationManifest;
} | null;
export declare function readHydrationManifestBetweenMarkers(start: Comment, end: Comment, boundaryId?: string): {
    script: HTMLScriptElement;
    manifest: HydrationManifest;
} | null;
export declare function parseHydrationManifest(raw: string): HydrationManifest | null;
export declare function skipNestedBoundary(current: Comment, parent: Node, end: Node): Node | null;
