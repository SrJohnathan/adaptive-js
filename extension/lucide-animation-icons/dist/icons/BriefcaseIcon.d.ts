import { type AnimatedLucideIconProps } from "../base.js";
export type BriefcaseIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BriefcaseIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BriefcaseIconProps): import("@adaptive-js/jsx").AdaptiveNode;
