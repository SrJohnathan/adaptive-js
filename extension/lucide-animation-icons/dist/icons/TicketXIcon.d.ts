import { type AnimatedLucideIconProps } from "../base.js";
export type TicketXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TicketXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TicketXIconProps): import("@adaptive-js/jsx").AdaptiveNode;
