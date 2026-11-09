import { type AnimatedLucideIconProps } from "../base.js";
export type FolderCogIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FolderCogIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FolderCogIconProps): import("@adaptive-js/jsx").AdaptiveNode;
