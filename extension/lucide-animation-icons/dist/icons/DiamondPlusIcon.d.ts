import { type AnimatedLucideIconProps } from "../base.js";
export type DiamondPlusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function DiamondPlusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: DiamondPlusIconProps): import("@adaptive-js/jsx").AdaptiveNode;
