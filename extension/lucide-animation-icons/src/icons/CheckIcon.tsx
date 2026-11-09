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

export type CheckIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CheckIcon({
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
}: CheckIconProps) {
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
      aria-label="check"
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
          ref={checkPathRef}
          d="M4 12l5 5L20 6"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
