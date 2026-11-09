import { type AnimatedLucideIconProps } from "../base.js";
export type ListTodoIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ListTodoIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ListTodoIconProps): import("@adaptive-js/jsx").AdaptiveNode;
