import { type AnimatedLucideIconProps } from "../base.js";
export type LightbulbIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function LightbulbIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: LightbulbIconProps): import("@adaptive-js/jsx").AdaptiveNode;
