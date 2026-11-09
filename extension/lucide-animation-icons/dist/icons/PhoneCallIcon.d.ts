import { type AnimatedLucideIconProps } from "../base.js";
export type PhoneCallIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PhoneCallIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PhoneCallIconProps): import("@adaptive-js/jsx").AdaptiveNode;
