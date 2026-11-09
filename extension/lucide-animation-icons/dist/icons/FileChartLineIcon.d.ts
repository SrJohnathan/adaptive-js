import { type AnimatedLucideIconProps } from "../base.js";
export type FileChartLineIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileChartLineIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileChartLineIconProps): import("@adaptive-js/jsx").AdaptiveNode;
