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

export type ArrowDown01IconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ArrowDown01Icon({
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
}: ArrowDown01IconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const upRef = ref<SVGRectElement>(null);
  const downRef = ref<SVGGElement>(null);

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
      aria-label="arrow-down-0-1"
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
        <path d="m3 16 4 4 4-4" />
        <path d="M7 20V4" />
        <rect
          ref={upRef}
          x="15"
          y="4"
          width="4"
          height="6"
          ry="2"
          style={{ transformOrigin: "center" }}
        />
        <g
          ref={downRef}
          style={{ transformOrigin: "center" }}
        >
          <path d="M17 20v-6h-2" />
          <path d="M15 20h4" />
        </g>
      </svg>
    </div>
  );
}