import { type AnimatedLucideIconProps } from "../base.js";
export type ShieldCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ShieldCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ShieldCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
