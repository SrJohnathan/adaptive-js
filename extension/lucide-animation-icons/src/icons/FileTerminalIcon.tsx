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

export type FileTerminalIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function FileTerminalIcon({
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
}: FileTerminalIconProps) {
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
            { opacity: 0 },
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
      aria-label="file-terminal"
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
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="m8 16 2-2-2-2" />
        <path
          ref={cursorRef}
          d="M12 18h4"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}