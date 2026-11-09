import { type AnimatedLucideIconProps } from "../base.js";
export type SignatureIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SignatureIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SignatureIconProps): import("@adaptive-js/jsx").AdaptiveNode;
