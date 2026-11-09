import { type AnimatedLucideIconProps } from "../base.js";
export type SquareTerminalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquareTerminalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquareTerminalIconProps): import("@adaptive-js/jsx").AdaptiveNode;
