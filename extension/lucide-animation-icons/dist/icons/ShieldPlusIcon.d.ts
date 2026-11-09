import { type AnimatedLucideIconProps } from "../base.js";
export type ShieldPlusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ShieldPlusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ShieldPlusIconProps): import("@adaptive-js/jsx").AdaptiveNode;
