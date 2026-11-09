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

export type ExpandIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ExpandIcon({
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
}: ExpandIconProps) {
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
            { transform: "translate(0, 0)" },
            { transform: "translate(2px, 2px)" },
            { transform: "translate(0, 0)" }
          ],
          duration,
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
      aria-label="expand"
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
        <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" class="corner top-right" />
        <path d="M3 16.2V21m0 0h4.8M3 21l6-6" class="corner bottom-left" />
        <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" class="corner top-left" />
        <path d="M3 7.8V3m0 0h4.8M3 3l6 6" class="corner bottom-right" />
      </svg>
    </div>
  );
}
