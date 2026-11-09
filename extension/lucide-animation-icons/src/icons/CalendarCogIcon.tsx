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

export type CalendarCogIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CalendarCogIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 800,
  animateOnHover = true,
  iconRef,
  ...props
}: CalendarCogIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const cogRef = ref<SVGGElement>(null);

  const getTargets = () => collectElements(cogRef.current);

  const startAnimation = () => {
    if (!cogRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          cogRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(180deg)" }
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
      aria-label="calendar-cog"
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
        <path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
        <path d="M16 2v4" />
        <path d="M3 10h18" />
        <path d="M8 2v4" />
        <g
          ref={cogRef}
          style={{ transformBox: "fill-box", transformOrigin: "18px 18px" }}
        >
          <path d="m15.2 16.9-.9-.4" />
          <path d="m15.2 19.1-.9.4" />
          <path d="m16.9 15.2-.4-.9" />
          <path d="m16.9 20.8-.4.9" />
          <path d="m19.5 14.3-.4.9" />
          <path d="m19.5 21.7-.4-.9" />
          <path d="m21.7 16.5-.9.4" />
          <path d="m21.7 19.5-.9-.4" />
          <circle cx="18" cy="18" r="3" />
        </g>
      </svg>
    </div>
  );
}