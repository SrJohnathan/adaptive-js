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

export type CropIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CropIcon({
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
}: CropIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const element0Ref = ref<SVGPathElement>(null);
  const element1Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(element0Ref.current, element1Ref.current);

  const startAnimation = () => {
    if (!element0Ref.current || !element1Ref.current) {
      return;
    }

    controller.current?.start([

      () =>
        createIconAnimation(
          element0Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(1px, -1px)" },
            { transform: "translate(0, 0)" }
          ],
          300,
          0,
          "ease"
        ),

      () =>
        createIconAnimation(
          element1Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(-1px, 1px)" },
            { transform: "translate(0, 0)" }
          ],
          300,
          0,
          "ease"
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
      aria-label="crop"
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
        style={{ transformOrigin: "center" }}
      >
        <path d="M6 2v14a2 2 0 0 0 2 2h14" />
		<path d="M18 22V8a2 2 0 0 0-2-2H2" />
      </svg>
    </div>
  );
}
