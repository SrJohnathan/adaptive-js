import { type AnimatedLucideIconProps } from "../base.js";
export type UserIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UserIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UserIconProps): import("@adaptive-js/jsx").AdaptiveNode;
