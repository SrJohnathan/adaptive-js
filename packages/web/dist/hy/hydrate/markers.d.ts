export declare function isClientBoundaryStartComment(node: Node): node is Comment;
export declare function isAdaptiveBoundaryComment(node: Node): node is Comment;
export declare function isSafeToRemoveAdaptiveComment(node: Node): node is Comment;
export declare function findMatchingMarkerEnd(root: Node, start: Comment, startPrefix: string, endText: string): Comment | null;
export declare function collectSiblingNodesBetween(start: Node, end: Node): Node[];
