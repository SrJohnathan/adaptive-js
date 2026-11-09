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

export type SquareArrowUpRightIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function SquareArrowUpRightIcon({
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
}: SquareArrowUpRightIconProps) {
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
            { transform: "translate(0, 0)" },
            { transform: "translate(-1.5px, 1.5px)" },
            { transform: "translate(0, 0)" }
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
      aria-label="square-arrow-up-right"
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
		<path d="M8 8h8v8" />
		<path d="M12 12 L16 8" />
		<path d="M12 12 L8 16" />
      </svg>
    </div>
  );
}
