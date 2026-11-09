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

export type UnfoldHorizontalIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function UnfoldHorizontalIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 400,
  animateOnHover = true,
  iconRef,
  ...props
}: UnfoldHorizontalIconProps) {
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
            { transform: "translateX(0)" },
            { transform: "translateX(-2px)" },
            { transform: "translateX(0)" }
          ],
          400,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),

      () =>
        createIconAnimation(
          element1Ref.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(0)" }
          ],
          400,
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
      aria-label="unfold-horizontal"
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
        <path d="M12 2v2 M12 8v2 M12 14v2 M12 20v2" />
		<g>
			<path d="M8 12H2" />
			<path d="m5 9-3 3 3 3" />
		</g>
		<g>
			<path d="M16 12h6" />
			<path d="m19 15 3-3-3-3" />
		</g>
      </svg>
    </div>
  );
}
