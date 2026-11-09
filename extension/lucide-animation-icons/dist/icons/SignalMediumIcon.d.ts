import { type AnimatedLucideIconProps } from "../base.js";
export type SignalMediumIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SignalMediumIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SignalMediumIconProps): import("@adaptive-js/jsx").AdaptiveNode;
