import { type AnimatedLucideIconProps } from "../base.js";
export type UserRoundCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UserRoundCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UserRoundCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
