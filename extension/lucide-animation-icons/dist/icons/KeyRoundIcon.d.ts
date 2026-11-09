import { type AnimatedLucideIconProps } from "../base.js";
export type KeyRoundIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function KeyRoundIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: KeyRoundIconProps): import("@adaptive-js/jsx").AdaptiveNode;
