import { type AnimatedLucideIconProps } from "../base.js";
export type DrumIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function DrumIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: DrumIconProps): import("@adaptive-js/jsx").AdaptiveNode;
