import { type AnimatedLucideIconProps } from "../base.js";
export type PlusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PlusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PlusIconProps): import("@adaptive-js/jsx").AdaptiveNode;
