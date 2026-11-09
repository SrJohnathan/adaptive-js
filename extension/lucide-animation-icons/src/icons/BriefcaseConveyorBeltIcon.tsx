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

export type BriefcaseConveyorBeltIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BriefcaseConveyorBeltIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 800,
  animateOnHover = true,
  iconRef,
  ...props
}: BriefcaseConveyorBeltIconProps) {
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
            {transform: "rotate(0deg)"},
            {transform: "rotate(12deg)"},
            {transform: "rotate(-10deg)"},
            {transform: "rotate(3deg)"},
            {transform: "rotate(0deg)"}
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
      aria-label="briefcase-conveyor-belt"
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
        style={{ transformOrigin: "top center" }}
      >
        <g class="briefcase-group bg-red-500">
        <path d="M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" class="briefcase-body" />
        <rect x="4" y="6" width="16" height="10" rx="2" class="briefcase-case" />
        </g>
        <path d="M21 20H3" class="belt-line" />
        <path d="M6 20v2" />
        <path d="M10 20v2" />
        <path d="M14 20v2" />
        <path d="M18 20v2" />
      </svg>
    </div>
  );
}
