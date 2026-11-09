import { type AnimatedLucideIconProps } from "../base.js";
export type Axis3DIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function Axis3DIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: Axis3DIconProps): import("@adaptive-js/jsx").AdaptiveNode;
