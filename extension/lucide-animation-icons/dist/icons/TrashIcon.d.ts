import { type AnimatedLucideIconProps } from "../base.js";
export type TrashIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TrashIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TrashIconProps): import("@adaptive-js/jsx").AdaptiveNode;
