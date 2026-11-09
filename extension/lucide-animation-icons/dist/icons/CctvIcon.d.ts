import { type AnimatedLucideIconProps } from "../base.js";
export type CctvIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CctvIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CctvIconProps): import("@adaptive-js/jsx").AdaptiveNode;
