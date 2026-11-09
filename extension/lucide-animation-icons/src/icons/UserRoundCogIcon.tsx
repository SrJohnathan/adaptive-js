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

export type UserRoundCogIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function UserRoundCogIcon({
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
}: UserRoundCogIconProps) {
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
      aria-label="user-round-cog"
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
        style={{ transformOrigin: "18px 18px" }}
      >
        <path d="M2 21a8 8 0 0 1 10.434-7.62" />
        <circle cx="10" cy="8" r="5" />
        <g class="cog-group">
        <circle cx="18" cy="18" r="3" />
        <path d="m19.5 14.3-.4.9" />
        <path d="m16.9 20.8-.4.9" />
        <path d="m21.7 19.5-.9-.4" />
        <path d="m15.2 16.9-.9-.4" />
        <path d="m21.7 16.5-.9.4" />
        <path d="m15.2 19.1-.9.4" />
        <path d="m19.5 21.7-.4-.9" />
        <path d="m16.9 15.2-.4-.9" />
        </g>
      </svg>
    </div>
  );
}
