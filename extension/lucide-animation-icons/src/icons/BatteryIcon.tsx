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

export type BatteryIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BatteryIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 1500,
  animateOnHover = true,
  iconRef,
  ...props
}: BatteryIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const batteryRef = ref<SVGRectElement>(null);
  const lineRef = ref<SVGLineElement>(null);

  const getTargets = () => collectElements(batteryRef.current, lineRef.current);

  const startAnimation = () => {
    if (!batteryRef.current || !lineRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          batteryRef.current!,
          [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
          ],
          500,
          0,
          "ease"
        ),
      () =>
        createIconAnimation(
          lineRef.current!,
          [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
          ],
          500,
          0,
          "ease"
        )
    ]);
  };

  const stopAnimation = () => {
    controller.current?.reset(getTargets(), Math.max(180, duration - 120));
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
      aria-label="battery"
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
        <rect
          ref={batteryRef}
          width="16"
          height="10"
          x="2"
          y="7"
          rx="2"
          ry="2"
        />
        <line
          ref={lineRef}
          x1="22"
          x2="22"
          y1="11"
          y2="13"
        />
      </svg>
    </div>
  );
}