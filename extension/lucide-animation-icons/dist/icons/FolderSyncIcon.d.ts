import { type AnimatedLucideIconProps } from "../base.js";
export type FolderSyncIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FolderSyncIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FolderSyncIconProps): import("@adaptive-js/jsx").AdaptiveNode;
