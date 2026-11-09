import { type AnimatedLucideIconProps } from "../base.js";
export type PrinterCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PrinterCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PrinterCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
