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

export type CircleCheckBigIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CircleCheckBigIcon({
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
}: CircleCheckBigIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const checkPathRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(checkPathRef.current);

  const startAnimation = () => {
    if (!checkPathRef.current) {
      return;
    }

    const pathLength = 17;
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
      aria-label="circle-check-big"
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
        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
        <path
          ref={checkPathRef}
          d="m9 11 3 3L22 4"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
