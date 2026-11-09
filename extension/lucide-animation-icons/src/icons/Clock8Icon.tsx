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

export type Clock8Props = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function Clock8({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 600,
  animateOnHover = true,
  iconRef,
  ...props
}: Clock8Props) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const minuteRef = ref<SVGLineElement>(null);
  const hourRef = ref<SVGLineElement>(null);

  const getTargets = () => collectElements(minuteRef.current, hourRef.current);

  const startAnimation = () => {
    if (!minuteRef.current || !hourRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          minuteRef.current!,
          [
            { transform: "rotate(0)" },
            { transform: "rotate(360deg)" }
          ],
          600,
          0,
          "cubic-bezier(0.4, 0, 0.2, 1)"
        ),
      () =>
        createIconAnimation(
          hourRef.current!,
          [
            { transform: "rotate(0)" },
            { transform: "rotate(27deg)" }
          ],
          500,
          0,
          "ease-in-out"
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
      aria-label="clock-8"
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
        <circle cx="12" cy="12" r="10" />
        <line
          ref={minuteRef}
          x1="12"
          y1="6"
          x2="12"
          y2="12"
          style={{transformOrigin: "center"}}
        />
        <line
          ref={hourRef}
          x1="12"
          y1="12"
          x2="8"
          y2="14"
          style={{transformOrigin: "center"}}
        />
      </svg>
    </div>
  );
}
