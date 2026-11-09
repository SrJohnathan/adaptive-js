import { type AnimatedLucideIconProps } from "../base.js";
export type CogIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CogIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CogIconProps): import("@adaptive-js/jsx").AdaptiveNode;
