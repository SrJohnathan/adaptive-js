import { type AnimatedLucideIconProps } from "../base.js";
export type BotOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BotOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BotOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;
