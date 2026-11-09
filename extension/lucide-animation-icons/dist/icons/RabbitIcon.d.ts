import { type AnimatedLucideIconProps } from "../base.js";
export type RabbitIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RabbitIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RabbitIconProps): import("@adaptive-js/jsx").AdaptiveNode;
