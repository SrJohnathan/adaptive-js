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

export type AlignHorizontalSpaceAroundIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function AlignHorizontalSpaceAroundIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 600,
  animateOnHover = true,
  iconRef,
  ...props
}: AlignHorizontalSpaceAroundIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const rectRef = ref<SVGRectElement>(null);
  const leftLineRef = ref<SVGPathElement>(null);
  const rightLineRef = ref<SVGPathElement>(null);

  const getTargets = () =>
    collectElements(rectRef.current, leftLineRef.current, rightLineRef.current);

  const startAnimation = () => {
    if (!rectRef.current || !leftLineRef.current || !rightLineRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          rectRef.current!,
          [
            { transform: "scaleX(1)" },
            { transform: "scaleX(0.85)" },
            { transform: "scaleX(1)" }
          ],
          duration,
          0,
          "cubic-bezier(0.16, 1, 0.3, 1)"
        ),
      () =>
        createIconAnimation(
          leftLineRef.current!,
          [
            { transform: "translateX(0) scaleY(1)" },
            { transform: "translateX(2px) scaleY(0.9)" },
            { transform: "translateX(0) scaleY(1)" }
          ],
          duration,
          0,
          "cubic-bezier(0.16, 1, 0.3, 1)"
        ),
      () =>
        createIconAnimation(
          rightLineRef.current!,
          [
            { transform: "translateX(0) scaleY(1)" },
            { transform: "translateX(-2px) scaleY(0.9)" },
            { transform: "translateX(0) scaleY(1)" }
          ],
          duration,
          0,
          "cubic-bezier(0.16, 1, 0.3, 1)"
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
      aria-label="align-horizontal-space-around"
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
          ref={rectRef}
          width="6"
          height="10"
          x="9"
          y="7"
          rx="2"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={leftLineRef}
          d="M4 22V2"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={rightLineRef}
          d="M20 22V2"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}