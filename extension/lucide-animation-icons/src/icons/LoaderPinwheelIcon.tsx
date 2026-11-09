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

export type LoaderPinwheelIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function LoaderPinwheelIcon({
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
}: LoaderPinwheelIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const pinwheelRef = ref<SVGGElement>(null);

  const getTargets = () => collectElements(pinwheelRef.current);

  const startAnimation = () => {
    if (!pinwheelRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          pinwheelRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(360deg)" }
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
      aria-label="loader-pinwheel"
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
        <g
          ref={pinwheelRef}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
        </g>
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
}