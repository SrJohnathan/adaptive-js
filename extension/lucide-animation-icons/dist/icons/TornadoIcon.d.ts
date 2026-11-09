import { type AnimatedLucideIconProps } from "../base.js";
export type TornadoIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TornadoIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TornadoIconProps): import("@adaptive-js/jsx").AdaptiveNode;
