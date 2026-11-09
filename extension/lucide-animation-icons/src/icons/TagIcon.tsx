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

export type TagIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function TagIcon({
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
}: TagIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const tagRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(tagRef.current);

  const startAnimation = () => {
    if (!tagRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          tagRef.current!,
          [
            { transform: "scale(1)" },
            { transform: "scale(1.1)" },
            { transform: "scale(1)" }
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
      aria-label="tag"
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
          ref={tagRef}
          d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
          style={{ transformOrigin: "center" }}
        />
        <line x1="7" x2="7.01" y1="7" y2="7" />
      </svg>
    </div>
  );
}