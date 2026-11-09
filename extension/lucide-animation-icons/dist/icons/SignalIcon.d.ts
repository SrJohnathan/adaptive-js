import { type AnimatedLucideIconProps } from "../base.js";
export type SignalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SignalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SignalIconProps): import("@adaptive-js/jsx").AdaptiveNode;
