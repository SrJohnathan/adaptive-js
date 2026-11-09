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

export type BetweenHorizontalStartIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BetweenHorizontalStartIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 150,
  animateOnHover = true,
  iconRef,
  ...props
}: BetweenHorizontalStartIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const rectTopRef = ref<SVGRectElement>(null);
  const arrowRef = ref<SVGPathElement>(null);
  const rectBottomRef = ref<SVGRectElement>(null);

  const getTargets = () => collectElements(rectTopRef.current, arrowRef.current, rectBottomRef.current);

  const startAnimation = () => {
    if (!rectTopRef.current || !arrowRef.current || !rectBottomRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          rectTopRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-1px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-in"
        ),
      () =>
        createIconAnimation(
          arrowRef.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "ease-in"
        ),
      () =>
        createIconAnimation(
          rectBottomRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(1px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-in"
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
      aria-label="between-horizontal-start"
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
        <rect
          ref={rectTopRef}
          width="13"
          height="7"
          x="8"
          y="3"
          rx="1"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={arrowRef}
          d="m2 9 3 3-3 3"
          style={{ transformOrigin: "center" }}
        />
        <rect
          ref={rectBottomRef}
          width="13"
          height="7"
          x="8"
          y="14"
          rx="1"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}