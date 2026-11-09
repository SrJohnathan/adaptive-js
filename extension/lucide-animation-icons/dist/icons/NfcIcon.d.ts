import { type AnimatedLucideIconProps } from "../base.js";
export type NfcIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function NfcIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: NfcIconProps): import("@adaptive-js/jsx").AdaptiveNode;
