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

export type BookmarkMinusIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BookmarkMinusIcon({
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
}: BookmarkMinusIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const bookmarkPathRef = ref<SVGPathElement>(null);
  const horizontalRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(bookmarkPathRef.current, horizontalRef.current);

  const startAnimation = () => {
    if (!bookmarkPathRef.current || !horizontalRef.current) {
      return;
    }

    const pathLength = horizontalRef.current.getTotalLength();
    horizontalRef.current.style.strokeDasharray = `${pathLength}`;
    horizontalRef.current.style.strokeDashoffset = `${pathLength}`;

    controller.current?.start([
      () =>
        createIconAnimation(
          bookmarkPathRef.current!,
          [
            { transform: "scale(1, 1)" },
            { transform: "scale(0.9, 1.3)" },
            { transform: "scale(1.1, 0.9)" },
            { transform: "scale(0.95, 1.05)" },
            { transform: "scale(1, 1)" }
          ],
          duration,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          horizontalRef.current!,
          [
            { opacity: 0, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
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
      aria-label="bookmark-minus"
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
          ref={bookmarkPathRef}
          d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={horizontalRef}
          d="M9 10h6"
        />
      </svg>
    </div>
  );
}