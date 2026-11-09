import { type AnimatedLucideIconProps } from "../base.js";
export type UndoIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UndoIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UndoIconProps): import("@adaptive-js/jsx").AdaptiveNode;
