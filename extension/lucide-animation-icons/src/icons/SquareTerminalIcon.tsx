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

export type SquareTerminalIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function SquareTerminalIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 800,
  animateOnHover = true,
  iconRef,
  ...props
}: SquareTerminalIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const cursorRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(cursorRef.current);

  const startAnimation = () => {
    if (!cursorRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          cursorRef.current!,
          [
            { opacity: 1 },
            { opacity: 0.2 },
            { opacity: 1 }
          ],
          duration,
          0,
          "linear"
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
      aria-label="square-terminal"
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
        <path d="m7 11 2-2-2-2" />
        <path
          ref={cursorRef}
          d="M11 13h4"
          style={{ transformOrigin: "center" }}
        />
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
    </div>
  );
}