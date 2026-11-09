import { type AnimatedLucideIconProps } from "../base.js";
export type SearchCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SearchCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SearchCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
