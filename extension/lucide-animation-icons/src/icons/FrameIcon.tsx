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

export type FrameIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function FrameIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 170,
  animateOnHover = true,
  iconRef,
  ...props
}: FrameIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const topRef = ref<SVGLineElement>(null);
  const leftRef = ref<SVGLineElement>(null);
  const rightRef = ref<SVGLineElement>(null);
  const bottomRef = ref<SVGLineElement>(null);

  const getTargets = () => collectElements(topRef.current, leftRef.current, rightRef.current, bottomRef.current);

  const startAnimation = () => {
    if (!topRef.current || !leftRef.current || !rightRef.current || !bottomRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          topRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(4px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          bottomRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-4px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          leftRef.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-4px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          rightRef.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(4px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "ease-in-out"
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
      aria-label="frame"
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
        <line
          ref={topRef}
          x1="6"
          x2="6"
          y1="2"
          y2="22"
          style={{ transformOrigin: "center" }}
        />
        <line
          ref={bottomRef}
          x1="18"
          x2="18"
          y1="2"
          y2="22"
          style={{ transformOrigin: "center" }}
        />
        <line
          ref={leftRef}
          x1="6"
          x2="18"
          y1="2"
          y2="2"
          style={{ transformOrigin: "center" }}
        />
        <line
          ref={rightRef}
          x1="6"
          x2="18"
          y1="22"
          y2="22"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}