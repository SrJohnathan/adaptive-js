import { type AnimatedLucideIconProps } from "../base.js";
export type ThermometerIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ThermometerIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ThermometerIconProps): import("@adaptive-js/jsx").AdaptiveNode;
