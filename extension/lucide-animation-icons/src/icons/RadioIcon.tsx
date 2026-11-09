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

export type RadioIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function RadioIcon({
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
}: RadioIconProps) {
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
      aria-label="radio"
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
        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" class="radio-level radio-line-3" />
        <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" class="radio-level radio-line-2" />
        <circle cx="12" cy="12" r="2" class="radio-level radio-line-1" />
        <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" class="radio-level radio-line-2" />
        <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" class="radio-level radio-line-3" />
      </svg>
    </div>
  );
}
