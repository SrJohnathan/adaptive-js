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

export type CalendarCheck2IconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CalendarCheck2Icon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 500,
  animateOnHover = true,
  iconRef,
  ...props
}: CalendarCheck2IconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const checkPathRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(checkPathRef.current);

  const startAnimation = () => {
    if (!checkPathRef.current) {
      return;
    }

    const pathLength = checkPathRef.current.getTotalLength();
    checkPathRef.current.style.strokeDasharray = `${pathLength}`;
    checkPathRef.current.style.strokeDashoffset = `${pathLength}`;

    controller.current?.start([
      () =>
        createIconAnimation(
          checkPathRef.current!,
          [
            { strokeDashoffset: `${pathLength}`, opacity: 0 },
            { strokeDashoffset: `${pathLength}`, opacity: 0 },
            { strokeDashoffset: "0", opacity: 1 }
          ],
          500,
          0,
          "ease-out"
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
      aria-label="calendar-check-2"
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
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
        <path d="M3 10h18" />
        <path
          ref={checkPathRef}
          d="m16 20 2 2 4-4"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}