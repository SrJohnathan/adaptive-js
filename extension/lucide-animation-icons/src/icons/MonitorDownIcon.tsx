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

export type MonitorDownIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function MonitorDownIcon({
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
}: MonitorDownIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const gRef = ref<SVGGElement>(null);

  const getTargets = () => collectElements(gRef.current);

  const startAnimation = () => {
    if (!gRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          gRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(2px)" },
            { transform: "translateY(0)" }
          ],
          300,
          0,
          "cubic-bezier(0.68, -0.6, 0.32, 1.6)"
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
      aria-label="monitor-down"
      role="img"
      onMouseEnter={mouseHandlers.onMouseEnter}
      onMouseLeave={mouseHandlers.onMouseLeave}
      {...props}
    >
      <svg
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

      >
        <path d="M12 17v4" />
        <path d="M8 21h8" />
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <g
        ref={gRef}
        >
        <path d="M12 13V7" />
        <path d="m15 10-3 3-3-3" />
        </g>
      </svg>
    </div>
  );
}
