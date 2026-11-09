import { type AnimatedLucideIconProps } from "../base.js";
export type TicketCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TicketCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TicketCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;
