import { type AnimatedLucideIconProps } from "../base.js";
export type DownloadIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function DownloadIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: DownloadIconProps): import("@adaptive-js/jsx").AdaptiveNode;
