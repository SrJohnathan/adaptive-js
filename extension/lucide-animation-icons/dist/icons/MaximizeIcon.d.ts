import { type AnimatedLucideIconProps } from "../base.js";
export type MaximizeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MaximizeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MaximizeIconProps): import("@adaptive-js/jsx").AdaptiveNode;
