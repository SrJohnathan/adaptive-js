import { type AnimatedLucideIconProps } from "../base.js";
export type PowerOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PowerOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PowerOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;
