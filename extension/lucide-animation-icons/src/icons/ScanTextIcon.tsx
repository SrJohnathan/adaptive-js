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

export type ScanTextIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ScanTextIcon({
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
}: ScanTextIconProps) {
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
            {strokeDashoffset: "0", opacity: "1"},
            {strokeDashoffset: "12", opacity: "0"},
            {strokeDashoffset: "0", opacity: "1"}
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
      aria-label="scan-text"
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
        <path d="M3 7V5a2 2 0 0 1 2-2h2" class="frame" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" class="frame" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" class="frame" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" class="frame" />
        <path d="M7 8h8" class="line line-0" />
        <path d="M7 12h10" class="line line-1" />
        <path d="M7 16h6" class="line line-2" />
      </svg>
    </div>
  );
}
