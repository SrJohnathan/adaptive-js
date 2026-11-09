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

export type MessageCircleDashedIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function MessageCircleDashedIcon({
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
}: MessageCircleDashedIconProps) {
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
      aria-label="message-circle-dashed"
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
        <g class="message-circle-dashed-group">
        <path d="M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1" class="message-circle-dashed-path1" />
        <path d="M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1" class="message-circle-dashed-path2" />
        <path d="M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5" class="message-circle-dashed-path3" />
        <path d="M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1" class="message-circle-dashed-path4" />
        <path d="M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1" class="message-circle-dashed-path5" />
        <path d="M3.5 17.5 2 22l4.5-1.5" class="message-circle-dashed-path6" />
        <path d="M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5" class="message-circle-dashed-path7" />
        <path d="M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1" class="message-circle-dashed-path8" />
        </g>
      </svg>
    </div>
  );
}
