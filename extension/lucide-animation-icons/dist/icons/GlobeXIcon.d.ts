import { type AnimatedLucideIconProps } from "../base.js";
export type GlobeXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function GlobeXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: GlobeXIconProps): import("@adaptive-js/jsx").AdaptiveNode;
