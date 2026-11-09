import { type AnimatedLucideIconProps } from "../base.js";
export type BugOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BugOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BugOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;
