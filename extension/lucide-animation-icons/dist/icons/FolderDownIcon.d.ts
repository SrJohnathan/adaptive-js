import { type AnimatedLucideIconProps } from "../base.js";
export type FolderDownIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FolderDownIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FolderDownIconProps): import("@adaptive-js/jsx").AdaptiveNode;
