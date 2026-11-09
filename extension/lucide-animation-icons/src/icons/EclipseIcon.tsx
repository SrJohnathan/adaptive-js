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

export type EclipseIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function EclipseIcon({
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
}: EclipseIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const element0Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(element0Ref.current);

  const startAnimation = () => {
    if (!element0Ref.current) {
      return;
    }

    controller.current?.start([

      () =>
        createIconAnimation(
          element0Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(0, 0)" },
            { transform: "translate(0, 0)" }
          ],
          300,
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
      aria-label="eclipse"
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
        <defs>
			<clipPath id="clipSun" clipPathUnits="userSpaceOnUse">
				<circle cx="12" cy="12" r="10" />
			</clipPath>
		</defs>

		<circle cx="12" cy="12" r="10" class="sun" />

		<g clip-path="url(#clipSun)">
			<path d="M12 2a7 7 0 1 0 10 10" class="moon" />
		</g>
      </svg>
    </div>
  );
}
