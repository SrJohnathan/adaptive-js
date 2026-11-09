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

export type Maximize2IconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function Maximize2Icon({
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
}: Maximize2IconProps) {
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
            { transform: "translate(-2px, 2px)" },
            { transform: "translate(0, 0)" }
          ],
          300,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),

      () =>
        createIconAnimation(
          element1Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(2px, -2px)" },
            { transform: "translate(0, 0)" }
          ],
          300,
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
      aria-label="maximize-2"
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
        <polyline points="15 3 21 3 21 9" />
		<polyline points="9 21 3 21 3 15" />
		<line x1="21" x2="14" y1="3" y2="10" />
		<line x1="3" x2="10" y1="21" y2="14" />
      </svg>
    </div>
  );
}
