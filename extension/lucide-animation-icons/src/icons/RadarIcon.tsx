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

export type RadarIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function RadarIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 2000,
  animateOnHover = true,
  iconRef,
  ...props
}: RadarIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const radarRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(radarRef.current);

  const startAnimation = () => {
    if (!radarRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          radarRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(720deg)" }
          ],
          duration,
          0,
          "linear"
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
      aria-label="radar"
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
        <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
        <path d="M4 6h.01" />
        <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
        <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
        <path d="M12 18h.01" />
        <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
        <circle cx="12" cy="12" r="2" />
        <path
          ref={radarRef}
          d="m13.41 10.59 5.66-5.66"
          style={{ transformOrigin: "center center" }}
        />
      </svg>
    </div>
  );
}