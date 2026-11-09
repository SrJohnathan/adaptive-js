import { type AnimatedLucideIconProps } from "../base.js";
export type MoveVerticalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MoveVerticalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MoveVerticalIconProps): import("@adaptive-js/jsx").AdaptiveNode;
