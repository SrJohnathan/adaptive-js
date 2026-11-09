import { type AnimatedLucideIconProps } from "../base.js";
export type ServerCogIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ServerCogIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ServerCogIconProps): import("@adaptive-js/jsx").AdaptiveNode;
