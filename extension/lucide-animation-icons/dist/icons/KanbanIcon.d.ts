import { type AnimatedLucideIconProps } from "../base.js";
export type KanbanIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function KanbanIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: KanbanIconProps): import("@adaptive-js/jsx").AdaptiveNode;
