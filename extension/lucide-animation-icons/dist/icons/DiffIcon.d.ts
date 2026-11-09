import { type AnimatedLucideIconProps } from "../base.js";
export type DiffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function DiffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: DiffIconProps): import("@adaptive-js/jsx").AdaptiveNode;
