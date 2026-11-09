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

export type LayoutPanelTopIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function LayoutPanelTopIcon({
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
}: LayoutPanelTopIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const topRef = ref<SVGRectElement>(null);
  const bottomLeftRef = ref<SVGRectElement>(null);
  const bottomRightRef = ref<SVGRectElement>(null);

  const getTargets = () => collectElements(topRef.current, bottomLeftRef.current, bottomRightRef.current);

  const startAnimation = () => {
    if (!topRef.current || !bottomLeftRef.current || !bottomRightRef.current) return;

    controller.current?.start([
      () =>
        createIconAnimation(
          topRef.current!,
          [
            { opacity: 0, transform: "translateY(-5px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-in"
        ),
      () =>
        createIconAnimation(
          bottomLeftRef.current!,
          [
            { opacity: 0, transform: "translateX(-10px)" },
            { opacity: 0.8, transform: "translateX(2px)" },
            { opacity: 1, transform: "translateX(0)" }
          ],
          400,
          100,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          bottomRightRef.current!,
          [
            { opacity: 0, transform: "translateX(10px)" },
            { opacity: 0.8, transform: "translateX(-2px)" },
            { opacity: 1, transform: "translateX(0)" }
          ],
          400,
          200,
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
      aria-label="layout-panel-top"
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
          ref={topRef}
          width="18"
          height="7"
          x="3"
          y="3"
          rx="1"
          style={{ transformOrigin: "center" }}
        />
        <rect
          ref={bottomLeftRef}
          width="7"
          height="7"
          x="3"
          y="14"
          rx="1"
          style={{ transformOrigin: "center" }}
        />
        <rect
          ref={bottomRightRef}
          width="7"
          height="7"
          x="14"
          y="14"
          rx="1"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}