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

export type GripIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function GripIcon({
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
}: GripIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const circles = Array.from({ length: 9 }, () => ref<SVGCircleElement>(null));

  const getTargets = () => collectElements(...circles.map(r => r.current));

  const startAnimation = () => {
    if (!circles[0].current) return;

    controller.current?.start(
      circles.map((r, i) =>
        () =>
          createIconAnimation(
            r.current!,
            [
              { opacity: 1 },
              { opacity: 0 },
              { opacity: 1 }
            ],
            800,
            i * 50,
            "ease-in"
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
      aria-label="grip"
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
        {[
          { cx: 19, cy: 5 },
          { cx: 12, cy: 5 },
          { cx: 19, cy: 12 },
          { cx: 5, cy: 5 },
          { cx: 12, cy: 12 },
          { cx: 19, cy: 19 },
          { cx: 5, cy: 12 },
          { cx: 12, cy: 19 },
          { cx: 5, cy: 19 }
        ].map((pos, i) => (
          <circle
            key={i}
            ref={circles[i]}
            cx={pos.cx}
            cy={pos.cy}
            r="1"
            style={{ transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
  );
}