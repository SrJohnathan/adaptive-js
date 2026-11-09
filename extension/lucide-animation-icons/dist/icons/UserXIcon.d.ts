import { type AnimatedLucideIconProps } from "../base.js";
export type UserXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UserXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UserXIconProps): import("@adaptive-js/jsx").AdaptiveNode;
