import { type AnimatedLucideIconProps } from "../base.js";
export type SearchIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SearchIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SearchIconProps): import("@adaptive-js/jsx").AdaptiveNode;
