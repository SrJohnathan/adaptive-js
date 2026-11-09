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

export type CircleChevronRightIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CircleChevronRightIcon({
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
}: CircleChevronRightIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const chevronRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(chevronRef.current);

  const startAnimation = () => {
    if (!chevronRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          chevronRef.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(0)" }
          ],
          300,
          0,
          "ease-in"
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
      aria-label="circle-chevron-right"
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
        <path
          ref={chevronRef}
          d="m10 8 4 4-4 4"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
