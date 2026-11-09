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

export type RadioTowerIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function RadioTowerIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 700,
  animateOnHover = true,
  iconRef,
  ...props
}: RadioTowerIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const svgRef = ref<SVGSVGElement>(null);

  const getTargets = () => collectElements(svgRef.current);

  const startAnimation = () => {
    if (!svgRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          svgRef.current!,
          [
            {opacity: "0"},
            {opacity: "1"}
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
      aria-label="radio-tower"
      role="img"
      onMouseEnter={mouseHandlers.onMouseEnter}
      onMouseLeave={mouseHandlers.onMouseLeave}
      {...props}
    >
      <svg
        ref={svgRef}
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
        <path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" class="radio-level radio-line-3" />
        <path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" class="radio-level radio-line-2" />
        <circle cx="12" cy="9" r="2" class="radio-level radio-line-1" />
        <path d="M16.2 4.8c2 2 2.26 5.11.8 7.47" class="radio-level radio-line-2" />
        <path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1" class="radio-level radio-line-3" />
        <path d="M9.5 18h5" class="tower-base" />
        <path d="m8 22 4-11 4 11" class="tower-base" />
      </svg>
    </div>
  );
}
