import { type AnimatedLucideIconProps } from "../base.js";
export type FolderCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FolderCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FolderCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
