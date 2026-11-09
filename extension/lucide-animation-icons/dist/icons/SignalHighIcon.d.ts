import { type AnimatedLucideIconProps } from "../base.js";
export type SignalHighIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SignalHighIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SignalHighIconProps): import("@adaptive-js/jsx").AdaptiveNode;
