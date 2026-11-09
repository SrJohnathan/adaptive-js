import { type AnimatedLucideIconProps } from "../base.js";
export type InfinityIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function InfinityIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: InfinityIconProps): import("@adaptive-js/jsx").AdaptiveNode;
