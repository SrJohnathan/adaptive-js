import { type AnimatedLucideIconProps } from "../base.js";
export type UserPenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UserPenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UserPenIconProps): import("@adaptive-js/jsx").AdaptiveNode;
