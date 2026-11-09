import { ref } from "@adaptive-js/web";
import {
  AnimatedIconController,
  cn,
  collectElements,
  createIconAnimation,
  createMouseHandlers,
  type AnimatedLucideIconProps,
  useAnimatedIconHandle
} from "../base.js";

export type CalendarSyncIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CalendarSyncIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 400,
  animateOnHover = true,
  iconRef,
  ...props
}: CalendarSyncIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const syncRef = ref<SVGGElement>(null);

  const getTargets = () => collectElements(syncRef.current);

  const startAnimation = () => {
    if (!syncRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          syncRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-50deg)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        )
    ]);
  };

  const stopAnimation = () => {
    controller.current?.destroy(getTargets());
  };

  useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);

  const mouseHandlers = createMouseHandlers(
    animateOnHover,
    startAnimation,
    stopAnimation,
    onMouseEnter,
    onMouseLeave
  );

  return (
    <div
      className={cn("adaptive-lucide-animation-icon", className)}
      aria-label="calendar-sync"
      role="img"
      onMouseEnter={mouseHandlers.onMouseEnter}
      onMouseLeave={mouseHandlers.onMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        overflow="visible"
      >
        <g
          ref={syncRef}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <path d="M11 10v4h4" />
          <path d="m11 14 1.535-1.605a5 5 0 0 1 8 1.5" />
          <path d="M21 22v-4h-4" />
          <path d="m21 18-1.535 1.605a5 5 0 0 1-8-1.5" />
        </g>
        <path d="M16 2v4" />
        <path d="M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3" />
        <path d="M3 10h4" />
        <path d="M8 2v4" />
      </svg>
    </div>
  );
}