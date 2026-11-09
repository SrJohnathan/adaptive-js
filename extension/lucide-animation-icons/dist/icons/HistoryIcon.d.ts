import { type AnimatedLucideIconProps } from "../base.js";
export type HistoryIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function HistoryIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: HistoryIconProps): import("@adaptive-js/jsx").AdaptiveNode;
