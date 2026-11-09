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

export type ChartBarIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ChartBarIcon({
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
}: ChartBarIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const bar0Ref = ref<SVGPathElement>(null);
  const bar1Ref = ref<SVGPathElement>(null);
  const bar2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(bar0Ref.current, bar1Ref.current, bar2Ref.current);

  const startAnimation = () => {
    if (!bar0Ref.current || !bar1Ref.current || !bar2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          bar0Ref.current!,
          [
            { strokeDashoffset: "0", opacity: 1 },
            { strokeDashoffset: "12", opacity: 0 },
            { strokeDashoffset: "0", opacity: 1 }
          ],
          600,
          0,
          "ease"
        ),
      () =>
        createIconAnimation(
          bar1Ref.current!,
          [
            { strokeDashoffset: "0", opacity: 1 },
            { strokeDashoffset: "12", opacity: 0 },
            { strokeDashoffset: "0", opacity: 1 }
          ],
          600,
          100,
          "ease"
        ),
      () =>
        createIconAnimation(
          bar2Ref.current!,
          [
            { strokeDashoffset: "0", opacity: 1 },
            { strokeDashoffset: "12", opacity: 0 },
            { strokeDashoffset: "0", opacity: 1 }
          ],
          600,
          200,
          "ease"
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
      aria-label="chart-bar"
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
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path
          ref={bar2Ref}
          d="M7 16h8"
          style={{ strokeDasharray: "12", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
        <path
          ref={bar1Ref}
          d="M7 11h12"
          style={{ strokeDasharray: "12", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
        <path
          ref={bar0Ref}
          d="M7 6h3"
          style={{ strokeDasharray: "12", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
