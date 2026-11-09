import { type AnimatedLucideIconProps } from "../base.js";
export type BriefcaseMedicalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BriefcaseMedicalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BriefcaseMedicalIconProps): import("@adaptive-js/jsx").AdaptiveNode;
