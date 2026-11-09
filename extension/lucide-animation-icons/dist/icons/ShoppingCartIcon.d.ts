import { type AnimatedLucideIconProps } from "../base.js";
export type ShoppingCartIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ShoppingCartIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ShoppingCartIconProps): import("@adaptive-js/jsx").AdaptiveNode;
