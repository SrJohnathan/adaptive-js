import { type AnimatedLucideIconProps } from "../base.js";
export type UnplugIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UnplugIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UnplugIconProps): import("@adaptive-js/jsx").AdaptiveNode;
