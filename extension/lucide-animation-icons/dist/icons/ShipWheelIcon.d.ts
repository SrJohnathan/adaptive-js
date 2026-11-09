import { type AnimatedLucideIconProps } from "../base.js";
export type ShipWheelIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ShipWheelIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ShipWheelIconProps): import("@adaptive-js/jsx").AdaptiveNode;
