import { type AnimatedLucideIconProps } from "../base.js";
export type UserCogIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UserCogIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UserCogIconProps): import("@adaptive-js/jsx").AdaptiveNode;
