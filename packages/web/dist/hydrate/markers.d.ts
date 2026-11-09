export declare function isClientBoundaryStartComment(node: Node): boolean;
export declare function isAdaptiveBoundaryComment(node: Node): boolean;
export declare function isSafeToRemoveAdaptiveComment(node: Node): boolean;
export declare function findMatchingMarkerEnd(root: Node, start: Comment, startPrefix: string, endText: string): Comment | null;
export declare function collectSiblingNodesBetween(start: Node, end: Node): Node[];
