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

export type DrumIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function DrumIcon({
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
}: DrumIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const stick1Ref = ref<SVGPathElement>(null);
  const stick2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(stick1Ref.current, stick2Ref.current);

  const startAnimation = () => {
    if (!stick1Ref.current || !stick2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          stick1Ref.current!,
          [
            { transform: "rotate(0deg) translate(0px, 0px)" },
            { transform: "rotate(-10deg) translate(-1px, 1px)" },
            { transform: "rotate(0deg) translate(0px, 0px)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          stick2Ref.current!,
          [
            { transform: "rotate(0deg) translate(0px, 0px)" },
            { transform: "rotate(10deg) translate(1px, -1px)" },
            { transform: "rotate(0deg) translate(0px, 0px)" }
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
      aria-label="drum"
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
        <path ref={stick1Ref} d="m2 2 8 8" style={{ transformOrigin: "center" }} />
        <path ref={stick2Ref} d="m22 2-8 8" style={{ transformOrigin: "center" }} />
        <ellipse cx="12" cy="9" rx="10" ry="5" />
        <path d="M7 13.4v7.9" />
        <path d="M12 14v8" />
        <path d="M17 13.4v7.9" />
        <path d="M2 9v8a10 5 0 0 0 20 0V9" />
      </svg>
    </div>
  );
}