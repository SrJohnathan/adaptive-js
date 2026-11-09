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

export type ArrowBigUpDashIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ArrowBigUpDashIcon({
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
}: ArrowBigUpDashIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const dashRef = ref<SVGPathElement>(null);
  const arrowRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(dashRef.current, arrowRef.current);

  const startAnimation = () => {
    if (!dashRef.current || !arrowRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          dashRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-1px)" },
            { transform: "translateY(0)" }
          ],
          200,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          arrowRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-3px)" },
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
      aria-label="arrow-big-up-dash"
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
        <path
          ref={dashRef}
          d="M9 19h6"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={arrowRef}
          d="M9 15v-3H5l7-7 7 7h-4v3H9z"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}