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

export type CalendarDaysIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CalendarDaysIcon({
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
}: CalendarDaysIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const dots = Array.from({ length: 6 }, () => ref<SVGCircleElement>(null));

  const getTargets = () => collectElements(...dots.map(r => r.current));

  const startAnimation = () => {
    if (!dots[0].current) return;

    controller.current?.start(
      dots.map((r, i) =>
        () =>
          createIconAnimation(
            r.current!,
            [
              { opacity: 1 },
              { opacity: 0.3 },
              { opacity: 1 }
            ],
            800,
            i * 170,
            "ease"
          )
      )
    );
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
      aria-label="calendar-days"
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
      >
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        {[
          { cx: 8, cy: 14 },
          { cx: 12, cy: 14 },
          { cx: 16, cy: 14 },
          { cx: 8, cy: 18 },
          { cx: 12, cy: 18 },
          { cx: 16, cy: 18 }
        ].map((pos, i) => (
          <circle
            key={i}
            ref={dots[i]}
            cx={pos.cx}
            cy={pos.cy}
            r="1"
            fill={color}
            stroke="none"
            style={{ transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
  );
}