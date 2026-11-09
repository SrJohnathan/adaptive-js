import { type AnimatedLucideIconProps } from "../base.js";
export type LayersIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function LayersIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: LayersIconProps): import("@adaptive-js/jsx").AdaptiveNode;
