import { type AnimatedLucideIconProps } from "../base.js";
export type BoneIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BoneIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BoneIconProps): import("@adaptive-js/jsx").AdaptiveNode;
