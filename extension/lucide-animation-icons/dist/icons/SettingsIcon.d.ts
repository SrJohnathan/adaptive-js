import { type AnimatedLucideIconProps } from "../base.js";
export type SettingsIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SettingsIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SettingsIconProps): import("@adaptive-js/jsx").AdaptiveNode;
