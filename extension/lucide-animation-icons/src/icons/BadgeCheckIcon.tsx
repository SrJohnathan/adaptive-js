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

export type BadgeCheckIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BadgeCheckIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 1200,
  animateOnHover = true,
  iconRef,
  ...props
}: BadgeCheckIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const badgePathRef = ref<SVGPathElement>(null);
  const checkPathRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(badgePathRef.current, checkPathRef.current);

  const startAnimation = () => {
    if (!badgePathRef.current || !checkPathRef.current) {
      return;
    }

    const pathLength = checkPathRef.current.getTotalLength();
    checkPathRef.current.style.strokeDasharray = `${pathLength}`;
    checkPathRef.current.style.strokeDashoffset = "0";

    controller.current?.start([
      () =>
        createIconAnimation(
          badgePathRef.current!,
          [
            { transform: "scale(1)" },
            { transform: "scale(0.9)" },
            { transform: "scale(1)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          checkPathRef.current!,
          [
            { strokeDashoffset: "0", opacity: 1 },
            { strokeDashoffset: pathLength, opacity: 1 },
            { strokeDashoffset: "0", opacity: 1 }
          ],
          duration,
          0,
          "ease-in-out"
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
      aria-label="badge-check"
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
          ref={badgePathRef}
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={checkPathRef}
          d="m9 12 2 2 4-4"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}