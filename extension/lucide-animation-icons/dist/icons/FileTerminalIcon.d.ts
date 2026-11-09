import { type AnimatedLucideIconProps } from "../base.js";
export type FileTerminalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileTerminalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileTerminalIconProps): import("@adaptive-js/jsx").AdaptiveNode;
