import { type AnimatedLucideIconProps } from "../base.js";
export type PencilOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PencilOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PencilOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;
