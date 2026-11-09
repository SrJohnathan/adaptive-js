import { type AnimatedLucideIconProps } from "../base.js";
export type FilePenLineIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FilePenLineIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FilePenLineIconProps): import("@adaptive-js/jsx").AdaptiveNode;
