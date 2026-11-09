import { type AnimatedLucideIconProps } from "../base.js";
export type NotebookPenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function NotebookPenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: NotebookPenIconProps): import("@adaptive-js/jsx").AdaptiveNode;
