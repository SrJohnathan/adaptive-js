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

export type ArrowRightLeftIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ArrowRightLeftIcon({
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
}: ArrowRightLeftIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const rightRefs = [ref<SVGPathElement>(null), ref<SVGPathElement>(null)];
  const leftRefs = [ref<SVGPathElement>(null), ref<SVGPathElement>(null)];

  const getTargets = () => collectElements(
    rightRefs[0].current, rightRefs[1].current,
    leftRefs[0].current, leftRefs[1].current
  );

  const startAnimation = () => {
    if (!rightRefs[0].current || !leftRefs[0].current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          rightRefs[0].current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(3px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),
      () =>
        createIconAnimation(
          rightRefs[1].current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(3px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),
      () =>
        createIconAnimation(
          leftRefs[0].current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-3px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),
      () =>
        createIconAnimation(
          leftRefs[1].current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-3px)" },
            { transform: "translateX(0)" }
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
      aria-label="arrow-right-left"
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
          ref={rightRefs[0]}
          d="M16 3l4 4-4 4"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={rightRefs[1]}
          d="M20 7H4"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={leftRefs[0]}
          d="M8 21l-4-4 4-4"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={leftRefs[1]}
          d="M4 17h16"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}