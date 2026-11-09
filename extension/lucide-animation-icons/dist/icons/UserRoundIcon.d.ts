import { type AnimatedLucideIconProps } from "../base.js";
export type UserRoundIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UserRoundIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UserRoundIconProps): import("@adaptive-js/jsx").AdaptiveNode;
