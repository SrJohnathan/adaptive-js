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

export type MessageSquareDashedIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function MessageSquareDashedIcon({
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
}: MessageSquareDashedIconProps) {
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
            {transform: "rotate(8deg)"},
            {transform: "rotate(-8deg)"},
            {transform: "rotate(2deg)"},
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
      aria-label="message-square-dashed"
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
        style={{ transformOrigin: "bottom left" }}
      >
        <g class="message-square-dashed-group">
        <path d="M5 3a2 2 0 0 0-2 2" class="message-square-dashed-path1" />
        <path d="M9 3h1" class="message-square-dashed-path2" />
        <path d="M14 3h1" class="message-square-dashed-path3" />
        <path d="M19 3a2 2 0 0 1 2 2" class="message-square-dashed-path4" />
        <path d="M21 9v1" class="message-square-dashed-path5" />
        <path d="M21 14v1a2 2 0 0 1-2 2" class="message-square-dashed-path6" />
        <path d="M14 17h1" class="message-square-dashed-path7" />
        <path d="M10 17H7l-4 4v-7" class="message-square-dashed-path8" />
        <path d="M3 9v1" class="message-square-dashed-path9" />
        </g>
      </svg>
    </div>
  );
}
