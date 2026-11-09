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

export type ArrowDownAtoZIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ArrowDownAtoZIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 300,
  animateOnHover = true,
  iconRef,
  ...props
}: ArrowDownAtoZIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const upRef = ref<SVGGElement>(null);
  const downRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(upRef.current, downRef.current);

  const startAnimation = () => {
    if (!upRef.current || !downRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          upRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(10px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),
      () =>
        createIconAnimation(
          downRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-10px)" },
            { transform: "translateY(0)" }
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
      aria-label="arrow-down-a-z"
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
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
        <g
          ref={upRef}
          style={{ transformOrigin: "center" }}
        >
          <path d="M20 8h-5" />
          <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
        </g>
        <path
          ref={downRef}
          d="M15 14h5l-5 6h5"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}