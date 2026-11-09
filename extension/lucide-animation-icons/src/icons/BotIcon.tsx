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

export type BotIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BotIcon({
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
}: BotIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const leftEyeRef = ref<SVGLineElement>(null);
  const rightEyeRef = ref<SVGLineElement>(null);

  const getTargets = () => collectElements(leftEyeRef.current, rightEyeRef.current);

  const startAnimation = () => {
    if (!leftEyeRef.current || !rightEyeRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          leftEyeRef.current!,
          [
            { y1: 13, y2: 15 },
            { y1: 14, y2: 14 },
            { y1: 13, y2: 15 }
          ],
          250,
          200,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          rightEyeRef.current!,
          [
            { y1: 13, y2: 15 },
            { y1: 14, y2: 14 },
            { y1: 13, y2: 15 }
          ],
          250,
          200,
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
      aria-label="bot"
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
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <line
          ref={leftEyeRef}
          x1="9"
          y1={13}
          x2="9"
          y2={15}
        />
        <line
          ref={rightEyeRef}
          x1="15"
          y1={13}
          x2="15"
          y2={15}
        />
      </svg>
    </div>
  );
}