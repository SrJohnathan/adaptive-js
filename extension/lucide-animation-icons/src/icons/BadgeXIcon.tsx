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

export type BadgeXIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BadgeXIcon({
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
}: BadgeXIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const diagonal1Ref = ref<SVGLineElement>(null);
  const diagonal2Ref = ref<SVGLineElement>(null);

  const getTargets = () => collectElements(diagonal1Ref.current, diagonal2Ref.current);

  const startAnimation = () => {
    if (!diagonal1Ref.current || !diagonal2Ref.current) {
      return;
    }

    const pathLength = diagonal1Ref.current.getTotalLength();
    diagonal1Ref.current.style.strokeDasharray = `${pathLength}`;
    diagonal1Ref.current.style.strokeDashoffset = `${pathLength}`;
    diagonal2Ref.current.style.strokeDasharray = `${pathLength}`;
    diagonal2Ref.current.style.strokeDashoffset = `${pathLength}`;

    controller.current?.start([
      () =>
        createIconAnimation(
          diagonal1Ref.current!,
          [
            { opacity: 0, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          diagonal2Ref.current!,
          [
            { opacity: 0, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          250,
          "ease-out"
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
      aria-label="badge-x"
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
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        />
        <line
          ref={diagonal1Ref}
          x1="15"
          x2="9"
          y1="9"
          y2="15"
        />
        <line
          ref={diagonal2Ref}
          x1="9"
          x2="15"
          y1="9"
          y2="15"
        />
      </svg>
    </div>
  );
}