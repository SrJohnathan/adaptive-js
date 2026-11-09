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

export type BoltIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BoltIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 3000,
  animateOnHover = true,
  iconRef,
  ...props
}: BoltIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const pathRef = ref<SVGPathElement>(null);
  const circleRef = ref<SVGCircleElement>(null);

  const getTargets = () => collectElements(pathRef.current, circleRef.current);

  const startAnimation = () => {
    if (!pathRef.current || !circleRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          pathRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(180deg)" },
            { transform: "rotate(360deg)" }
          ],
          duration,
          0,
          "ease"
        ),
      () =>
        createIconAnimation(
          circleRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(180deg)" },
            { transform: "rotate(360deg)" }
          ],
          duration,
          0,
          "ease"
        )
    ]);
  };

  const stopAnimation = () => {
    controller.current?.reset(getTargets(), Math.max(180, duration - 120));
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
      aria-label="bolt"
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
        <path
          ref={pathRef}
          d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
          style={{ transformOrigin: "center" }}
        />
        <circle
          ref={circleRef}
          cx="12"
          cy="12"
          r="4"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}