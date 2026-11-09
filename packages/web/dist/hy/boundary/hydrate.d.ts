import type { HydrationInstruction } from "../hydrate/types.js";
export declare function hydrateExistingBoundary(root: HTMLElement, config: {
    debugName: string;
    instructions?: HydrationInstruction[];
    component?: (props?: Record<string, any>) => any;
    props?: Record<string, any>;
    boundaryId?: string;
}): Node[];
export declare function hydrateExistingBoundaryBetweenMarkers(start: Comment, end: Comment, config: {
    debugName: string;
    instructions?: HydrationInstruction[];
    component?: (props?: Record<string, any>) => any;
    props?: Record<string, any>;
    boundaryId?: string;
}): Node[];
export declare function hydrateExistingComponent(root: HTMLElement, Component: (props?: Record<string, any>) => any, props: Record<string, any>, boundaryId?: string): Node[];
export declare function hydrateExistingComponentBetweenMarkers(start: Comment, end: Comment, Component: (props?: Record<string, any>) => any, props: Record<string, any>, boundaryId?: string): Node[];
