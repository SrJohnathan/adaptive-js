import { type AnimatedLucideIconProps } from "../base.js";
export type ClapperboardIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ClapperboardIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ClapperboardIconProps): import("@adaptive-js/jsx").AdaptiveNode;
