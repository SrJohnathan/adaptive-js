import { type AnimatedLucideIconProps } from "../base.js";
export type ShowerHeadIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ShowerHeadIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ShowerHeadIconProps): import("@adaptive-js/jsx").AdaptiveNode;
