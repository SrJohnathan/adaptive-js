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

export type MonitorCogIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function MonitorCogIcon({
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
}: MonitorCogIconProps) {
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
            { transform: "rotate(0deg)" },
            { transform: "rotate(180deg)" },
            { transform: "rotate(0deg)" }
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
      aria-label="monitor-cog"
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
        style={{ transformOrigin: "18px 6px" }}
      >
        <path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <g class="cog-group">
        <path d="m15.2 4.9-.9-.4" />
        <path d="m15.2 7.1-.9.4" />
        <path d="m16.9 3.2-.4-.9" />
        <path d="m16.9 8.8-.4.9" />
        <path d="m19.5 2.3-.4.9" />
        <path d="m19.5 9.7-.4-.9" />
        <path d="m21.7 4.5-.9.4" />
        <path d="m21.7 7.5-.9-.4" />
        <circle cx="18" cy="6" r="3" />
        </g>
      </svg>
    </div>
  );
}
