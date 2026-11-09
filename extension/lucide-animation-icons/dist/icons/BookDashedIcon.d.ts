import { type AnimatedLucideIconProps } from "../base.js";
export type BookDashedIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookDashedIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookDashedIconProps): import("@adaptive-js/jsx").AdaptiveNode;
