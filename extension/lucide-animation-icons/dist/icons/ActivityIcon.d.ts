import { type AnimatedLucideIconProps } from "../base.js";
export type ActivityIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ActivityIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ActivityIconProps): import("@adaptive-js/jsx").AdaptiveNode;
