import { type AnimatedLucideIconProps } from "../base.js";
export type FilePlusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FilePlusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FilePlusIconProps): import("@adaptive-js/jsx").AdaptiveNode;
