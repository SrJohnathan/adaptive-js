import { type AnimatedLucideIconProps } from "../base.js";
export type BrushCleaningIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BrushCleaningIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BrushCleaningIconProps): import("@adaptive-js/jsx").AdaptiveNode;
