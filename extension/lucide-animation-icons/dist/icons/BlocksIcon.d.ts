import { type AnimatedLucideIconProps } from "../base.js";
export type BlocksIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BlocksIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BlocksIconProps): import("@adaptive-js/jsx").AdaptiveNode;
