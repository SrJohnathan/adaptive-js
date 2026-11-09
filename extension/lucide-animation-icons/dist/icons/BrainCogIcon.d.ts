import { type AnimatedLucideIconProps } from "../base.js";
export type BrainCogIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BrainCogIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BrainCogIconProps): import("@adaptive-js/jsx").AdaptiveNode;
