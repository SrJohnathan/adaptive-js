import { type AnimatedLucideIconProps } from "../base.js";
export type UserRoundCogIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UserRoundCogIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UserRoundCogIconProps): import("@adaptive-js/jsx").AdaptiveNode;
