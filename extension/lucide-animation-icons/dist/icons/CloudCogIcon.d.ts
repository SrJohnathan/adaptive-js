import { type AnimatedLucideIconProps } from "../base.js";
export type CloudCogIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CloudCogIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CloudCogIconProps): import("@adaptive-js/jsx").AdaptiveNode;
