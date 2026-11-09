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

export type ChartScatterIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ChartScatterIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 900,
  animateOnHover = true,
  iconRef,
  ...props
}: ChartScatterIconProps) {
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
      aria-label="chart-scatter"
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
        <circle cx="7.5" cy="7.5" r="0.5" fill={color} />
        <circle cx="18.5" cy="5.5" r="0.5" fill={color} />
        <circle cx="11.5" cy="11.5" r="0.5" fill={color} />
        <circle cx="7.5" cy="16.5" r="0.5" fill={color} />
        <circle cx="17.5" cy="14.5" r="0.5" fill={color} />
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      </svg>
    </div>
  );
}
