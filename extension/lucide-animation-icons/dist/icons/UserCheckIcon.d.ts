import { type AnimatedLucideIconProps } from "../base.js";
export type UserCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UserCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UserCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
