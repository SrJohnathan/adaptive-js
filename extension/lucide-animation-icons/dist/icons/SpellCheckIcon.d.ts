import { type AnimatedLucideIconProps } from "../base.js";
export type SpellCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SpellCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SpellCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
