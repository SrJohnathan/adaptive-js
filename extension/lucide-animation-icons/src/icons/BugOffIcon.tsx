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

export type BugOffIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BugOffIcon({
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
}: BugOffIconProps) {
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
            { transform: "translateX(0)" },
            { transform: "translateX(-7%)" },
            { transform: "translateX(7%)" },
            { transform: "translateX(-7%)" },
            { transform: "translateX(7%)" },
            { transform: "translateX(0)" }
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
      aria-label="bug-off"
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
        <path d="M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2" />
        <path d="M14.12 3.88 16 2" />
        <path d="M22 13h-4v-2a4 4 0 0 0-4-4h-1.3" />
        <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
        <path d="m2 2 20 20" />
        <path d="M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13" />
        <path d="M12 20v-8" />
        <path d="M6 13H2" />
        <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      </svg>
    </div>
  );
}