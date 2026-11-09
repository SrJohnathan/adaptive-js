import { type AnimatedLucideIconProps } from "../base.js";
export type UndoDotIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UndoDotIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UndoDotIconProps): import("@adaptive-js/jsx").AdaptiveNode;
