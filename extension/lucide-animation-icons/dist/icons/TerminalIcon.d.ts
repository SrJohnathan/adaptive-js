import { type AnimatedLucideIconProps } from "../base.js";
export type TerminalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TerminalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TerminalIconProps): import("@adaptive-js/jsx").AdaptiveNode;
