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

export type FileUpIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function FileUpIcon({
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
}: FileUpIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const gRef = ref<SVGGElement>(null);

  const getTargets = () => collectElements(gRef.current);

  const startAnimation = () => {
    if (!gRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          gRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-2px)" },
            { transform: "translateY(0)" }
          ],
          300,
          0,
          "cubic-bezier(0.68, -0.6, 0.32, 1.6)"
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
      aria-label="file-up"
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
        <g
        ref={gRef}
        >
        <path d="M12 12v6" />
        <path d="m15 15-3-3-3 3" />
        </g>
      </svg>
    </div>
  );
}
