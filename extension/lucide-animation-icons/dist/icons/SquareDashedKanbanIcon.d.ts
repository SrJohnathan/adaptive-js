import { type AnimatedLucideIconProps } from "../base.js";
export type SquareDashedKanbanIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquareDashedKanbanIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquareDashedKanbanIconProps): import("@adaptive-js/jsx").AdaptiveNode;
