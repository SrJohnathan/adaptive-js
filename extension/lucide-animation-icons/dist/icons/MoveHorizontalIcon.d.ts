import { type AnimatedLucideIconProps } from "../base.js";
export type MoveHorizontalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MoveHorizontalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MoveHorizontalIconProps): import("@adaptive-js/jsx").AdaptiveNode;
