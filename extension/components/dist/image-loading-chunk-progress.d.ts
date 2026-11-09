import type { AdaptiveNode } from "@adaptive-js/web";
type Dimension = number | string;
export interface ImageLoadingChunkProgressProps {
    progress: (progress: number) => void;
    src: string;
    width?: Dimension;
    height?: Dimension;
    feedbackSrc?: string;
    setSkeleton: boolean;
    style: CSSStyleDeclaration;
    className?: string;
    alt?: string;
}
export declare const ImageLoadingChunkProgress: (props: ImageLoadingChunkProgressProps) => AdaptiveNode;
export {};
