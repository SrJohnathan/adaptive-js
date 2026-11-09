import { type AnimatedLucideIconProps } from "../base.js";
export type ShipIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ShipIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ShipIconProps): import("@adaptive-js/jsx").AdaptiveNode;
