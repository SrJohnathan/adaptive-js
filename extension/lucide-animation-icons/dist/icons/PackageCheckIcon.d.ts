import { type AnimatedLucideIconProps } from "../base.js";
export type PackageCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PackageCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PackageCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
