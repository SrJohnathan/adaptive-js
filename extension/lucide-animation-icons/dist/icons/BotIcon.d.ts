import { type AnimatedLucideIconProps } from "../base.js";
export type BotIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BotIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BotIconProps): import("@adaptive-js/jsx").AdaptiveNode;
