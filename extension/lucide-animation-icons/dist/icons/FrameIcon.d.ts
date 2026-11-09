import { type AnimatedLucideIconProps } from "../base.js";
export type FrameIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FrameIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FrameIconProps): import("@adaptive-js/jsx").AdaptiveNode;
