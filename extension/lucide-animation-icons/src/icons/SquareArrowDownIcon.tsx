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

export type SquareArrowDownIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function SquareArrowDownIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 200,
  animateOnHover = true,
  iconRef,
  ...props
}: SquareArrowDownIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const element0Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(element0Ref.current);

  const startAnimation = () => {
    if (!element0Ref.current) {
      return;
    }

    controller.current?.start([

      () =>
        createIconAnimation(
          element0Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-1.5px)" },
            { transform: "translateY(0)" }
          ],
          200,
          0,
          "ease-out"
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
      aria-label="square-arrow-down"
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
        style={{ transformOrigin: "center" }}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
		<path d="M8 12 L12 16 L16 12" />
		<path d="M12 12v4" />
		<path d="M12 8v4" />
      </svg>
    </div>
  );
}
