import { type AnimatedLucideIconProps } from "../base.js";
export type ScanTextIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ScanTextIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ScanTextIconProps): import("@adaptive-js/jsx").AdaptiveNode;
