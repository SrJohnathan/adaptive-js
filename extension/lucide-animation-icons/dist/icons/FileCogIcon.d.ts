import { type AnimatedLucideIconProps } from "../base.js";
export type FileCogIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileCogIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileCogIconProps): import("@adaptive-js/jsx").AdaptiveNode;
