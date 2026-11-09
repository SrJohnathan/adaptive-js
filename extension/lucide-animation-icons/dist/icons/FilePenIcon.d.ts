import { type AnimatedLucideIconProps } from "../base.js";
export type FilePenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FilePenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FilePenIconProps): import("@adaptive-js/jsx").AdaptiveNode;
