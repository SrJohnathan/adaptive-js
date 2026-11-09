import { type AnimatedLucideIconProps } from "../base.js";
export type OrbitIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function OrbitIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: OrbitIconProps): import("@adaptive-js/jsx").AdaptiveNode;
