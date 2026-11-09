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

export type CalendarX2IconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CalendarX2Icon({
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
}: CalendarX2IconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const diag1Ref = ref<SVGPathElement>(null);
  const diag2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(diag1Ref.current, diag2Ref.current);

  const startAnimation = () => {
    if (!diag1Ref.current || !diag2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          diag1Ref.current!,
          [
            { opacity: 0, strokeDashoffset: "8" },
            { opacity: 1, strokeDashoffset: "8" },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          diag2Ref.current!,
          [
            { opacity: 0, strokeDashoffset: "8" },
            { opacity: 1, strokeDashoffset: "8" },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          250,
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
      aria-label="calendar-x-2"
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
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path
          ref={diag1Ref}
          d="m14 14-4 4"
          style={{ strokeDasharray: "8", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
        <path
          ref={diag2Ref}
          d="m10 14 4 4"
          style={{ strokeDasharray: "8", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}