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

export type CircleArrowOutDownRightIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CircleArrowOutDownRightIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 500,
  animateOnHover = true,
  iconRef,
  ...props
}: CircleArrowOutDownRightIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const arrowRef = ref<SVGGElement>(null);

  const getTargets = () => collectElements(arrowRef.current);

  const startAnimation = () => {
    if (!arrowRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          arrowRef.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(-2px, -2px)" },
            { transform: "translate(0, 0)" }
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
      aria-label="circle-arrow-out-down-right"
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
        <path d="M12 22a10 10 0 1 1 10-10" />
        <g
          ref={arrowRef}
          style={{ transformOrigin: "center" }}
        >
          <path d="M22 22 12 12" />
          <path d="M22 16v6h-6" />
        </g>
      </svg>
    </div>
  );
}
