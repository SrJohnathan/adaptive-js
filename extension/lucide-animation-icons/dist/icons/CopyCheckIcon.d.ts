import { type AnimatedLucideIconProps } from "../base.js";
export type CopyCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CopyCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CopyCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
