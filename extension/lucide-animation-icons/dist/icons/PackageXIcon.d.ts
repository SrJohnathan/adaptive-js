import { type AnimatedLucideIconProps } from "../base.js";
export type PackageXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PackageXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PackageXIconProps): import("@adaptive-js/jsx").AdaptiveNode;
