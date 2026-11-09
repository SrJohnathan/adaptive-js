import { type AnimatedLucideIconProps } from "../base.js";
export type SquareKanbanIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquareKanbanIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquareKanbanIconProps): import("@adaptive-js/jsx").AdaptiveNode;
