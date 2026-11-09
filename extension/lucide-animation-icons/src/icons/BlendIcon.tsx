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

export type BlendIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BlendIcon({
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
}: BlendIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const circle1Ref = ref<SVGCircleElement>(null);
  const circle2Ref = ref<SVGCircleElement>(null);

  const getTargets = () => collectElements(circle1Ref.current, circle2Ref.current);

  const startAnimation = () => {
    if (!circle1Ref.current || !circle2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          circle1Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(1px, 1px)" },
            { transform: "translate(0, 0)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),
      () =>
        createIconAnimation(
          circle2Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(-1px, -1px)" },
            { transform: "translate(0, 0)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
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
      aria-label="blend"
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
        <circle
          ref={circle1Ref}
          cx="9"
          cy="9"
          r="7"
          style={{ transformOrigin: "center" }}
        />
        <circle
          ref={circle2Ref}
          cx="15"
          cy="15"
          r="7"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}