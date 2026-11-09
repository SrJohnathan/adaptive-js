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

export type BookDashedIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BookDashedIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 600,
  animateOnHover = true,
  iconRef,
  ...props
}: BookDashedIconProps) {
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
            { transform: "scale(1) rotate(0deg) translateY(0)" },
            { transform: "scale(1.04) rotate(-8deg) translateY(-2px)" },
            { transform: "scale(1.04) rotate(8deg) translateY(-2px)" },
            { transform: "scale(1.04) rotate(-8deg) translateY(-2px)" },
            { transform: "scale(1) rotate(0deg) translateY(0)" }
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
      aria-label="book-dashed"
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
        <path d="M12 17h1.5" />
        <path d="M12 22h1.5" />
        <path d="M12 2h1.5" />
        <path d="M17.5 22H19a1 1 0 0 0 1-1" />
        <path d="M17.5 2H19a1 1 0 0 1 1 1v1.5" />
        <path d="M20 14v3h-2.5" />
        <path d="M20 8.5V10" />
        <path d="M4 10V8.5" />
        <path d="M4 19.5V14" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H8" />
        <path d="M8 22H6.5a1 1 0 0 1 0-5H8" />
      </svg>
    </div>
  );
}