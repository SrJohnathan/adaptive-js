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

export type ChevronsUpDownIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ChevronsUpDownIcon({
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
}: ChevronsUpDownIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const downRef = ref<SVGPathElement>(null);
  const upRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(downRef.current, upRef.current);

  const startAnimation = () => {
    if (!downRef.current || !upRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          downRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(3px)" },
            { transform: "translateY(0)" }
          ],
          200,
          0,
          "ease-in"
        ),
      () =>
        createIconAnimation(
          upRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-3px)" },
            { transform: "translateY(0)" }
          ],
          200,
          0,
          "ease-in"
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
      aria-label="chevrons-up-down"
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
          ref={downRef}
          d="m7 15 5 5 5-5"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={upRef}
          d="m7 9 5-5 5 5"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
