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

export type AirplayIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function AirplayIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 400,
  animateOnHover = true,
  iconRef,
  ...props
}: AirplayIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const path2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(path2Ref.current);

  const startAnimation = () => {
    if (!path2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(2px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "cubic-bezier(0, 0, 0.3, 1.6)"
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
      aria-label="airplay"
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
        <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
        <path
          ref={path2Ref}
          d="m12 15 5 6H7Z"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}