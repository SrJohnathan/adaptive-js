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

export type BatteryWarningIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BatteryWarningIcon({
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
}: BatteryWarningIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const warning1Ref = ref<SVGPathElement>(null);
  const warning2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(warning1Ref.current, warning2Ref.current);

  const startAnimation = () => {
    if (!warning1Ref.current || !warning2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          warning1Ref.current!,
          [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
          ],
          duration,
          0,
          "ease"
        ),
      () =>
        createIconAnimation(
          warning2Ref.current!,
          [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
          ],
          duration,
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
      aria-label="battery-warning"
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
        <path
          ref={warning1Ref}
          d="M10 17h.01"
        />
        <path
          ref={warning2Ref}
          d="M10 7v6"
        />
        <path d="M14 7h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <path d="M22 11v2" />
        <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      </svg>
    </div>
  );
}