import { type AnimatedLucideIconProps } from "../base.js";
export type FolderPlusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FolderPlusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FolderPlusIconProps): import("@adaptive-js/jsx").AdaptiveNode;
