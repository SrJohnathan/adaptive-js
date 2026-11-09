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

export type BetweenVerticalStartIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BetweenVerticalStartIcon({
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
}: BetweenVerticalStartIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const rectLeftRef = ref<SVGRectElement>(null);
  const arrowRef = ref<SVGPathElement>(null);
  const rectRightRef = ref<SVGRectElement>(null);

  const getTargets = () => collectElements(rectLeftRef.current, arrowRef.current, rectRightRef.current);

  const startAnimation = () => {
    if (!rectLeftRef.current || !arrowRef.current || !rectRightRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          rectLeftRef.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-1px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "ease-in"
        ),
      () =>
        createIconAnimation(
          arrowRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(2px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-in"
        ),
      () =>
        createIconAnimation(
          rectRightRef.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(1px)" },
            { transform: "translateX(0)" }
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
      aria-label="between-vertical-start"
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
          ref={rectLeftRef}
          width="7"
          height="13"
          x="3"
          y="8"
          rx="1"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={arrowRef}
          d="m15 2-3 3-3-3"
          style={{ transformOrigin: "center" }}
        />
        <rect
          ref={rectRightRef}
          width="7"
          height="13"
          x="14"
          y="8"
          rx="1"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}