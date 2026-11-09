import { type AnimatedLucideIconProps } from "../base.js";
export type CherryIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CherryIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CherryIconProps): import("@adaptive-js/jsx").AdaptiveNode;
