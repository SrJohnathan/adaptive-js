import { type AnimatedLucideIconProps } from "../base.js";
export type MicOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MicOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MicOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;
