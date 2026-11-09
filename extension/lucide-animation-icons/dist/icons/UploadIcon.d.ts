import { type AnimatedLucideIconProps } from "../base.js";
export type UploadIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UploadIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UploadIconProps): import("@adaptive-js/jsx").AdaptiveNode;
