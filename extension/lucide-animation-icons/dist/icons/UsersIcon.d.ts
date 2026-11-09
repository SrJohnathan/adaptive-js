import { type AnimatedLucideIconProps } from "../base.js";
export type UsersIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UsersIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UsersIconProps): import("@adaptive-js/jsx").AdaptiveNode;
