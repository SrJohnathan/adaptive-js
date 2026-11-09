import { type AnimatedLucideIconProps } from "../base.js";
export type FolderKanbanIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FolderKanbanIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FolderKanbanIconProps): import("@adaptive-js/jsx").AdaptiveNode;
