import { type AnimatedLucideIconProps } from "../base.js";
export type PickaxeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PickaxeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PickaxeIconProps): import("@adaptive-js/jsx").AdaptiveNode;
