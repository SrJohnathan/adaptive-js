import { type AnimatedLucideIconProps } from "../base.js";
export type AwardIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function AwardIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: AwardIconProps): import("@adaptive-js/jsx").AdaptiveNode;
