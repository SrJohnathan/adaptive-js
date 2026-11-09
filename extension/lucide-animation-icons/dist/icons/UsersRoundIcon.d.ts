import { type AnimatedLucideIconProps } from "../base.js";
export type UsersRoundIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UsersRoundIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UsersRoundIconProps): import("@adaptive-js/jsx").AdaptiveNode;
