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

export type MaximizeIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function MaximizeIcon({
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
}: MaximizeIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const element0Ref = ref<SVGPathElement>(null);
  const element1Ref = ref<SVGPathElement>(null);
  const element2Ref = ref<SVGPathElement>(null);
  const element3Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(element0Ref.current, element1Ref.current, element2Ref.current, element3Ref.current);

  const startAnimation = () => {
    if (!element0Ref.current || !element1Ref.current || !element2Ref.current || !element3Ref.current) {
      return;
    }

    controller.current?.start([

      () =>
        createIconAnimation(
          element0Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(2px, 2px)" },
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
            { transform: "translate(-2px, 2px)" },
            { transform: "translate(0, 0)" }
          ],
          300,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),

      () =>
        createIconAnimation(
          element2Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(2px, -2px)" },
            { transform: "translate(0, 0)" }
          ],
          300,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),

      () =>
        createIconAnimation(
          element3Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(-2px, -2px)" },
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
      aria-label="maximize"
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
        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
		<path d="M21 8V5a2 2 0 0 0-2-2h-3" />
		<path d="M3 16v3a2 2 0 0 0 2 2h3" />
		<path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      </svg>
    </div>
  );
}
