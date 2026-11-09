import { type AnimatedLucideIconProps } from "../base.js";
export type CopyIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CopyIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CopyIconProps): import("@adaptive-js/jsx").AdaptiveNode;
