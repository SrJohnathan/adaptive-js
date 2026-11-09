import { type AnimatedLucideIconProps } from "../base.js";
export type UserRoundPenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UserRoundPenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UserRoundPenIconProps): import("@adaptive-js/jsx").AdaptiveNode;
