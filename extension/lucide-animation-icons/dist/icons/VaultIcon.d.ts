import { type AnimatedLucideIconProps } from "../base.js";
export type VaultIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function VaultIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: VaultIconProps): import("@adaptive-js/jsx").AdaptiveNode;
