import { type AnimatedLucideIconProps } from "../base.js";
export type VoteIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function VoteIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: VoteIconProps): import("@adaptive-js/jsx").AdaptiveNode;
