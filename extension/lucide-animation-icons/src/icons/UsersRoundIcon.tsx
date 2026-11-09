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

export type UsersRoundIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function UsersRoundIcon({
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
}: UsersRoundIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const path1Ref = ref<SVGPathElement>(null);
  const path2Ref = ref<SVGPathElement>(null);
  const circleRef = ref<SVGCircleElement>(null);

  const getTargets = () => collectElements(path1Ref.current, path2Ref.current, circleRef.current);

  const startAnimation = () => {
    if (!path1Ref.current || !path2Ref.current || !circleRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          path1Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(4px)" },
            { transform: "translateY(-2px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          100,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(1px)" },
            { transform: "translateY(-0.5px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          circleRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(1px)" },
            { transform: "translateY(-0.5px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          100,
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
      aria-label="users-round"
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
      >
        <path
          ref={path1Ref}
          d="M18 21a8 8 0 0 0-16 0"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={path2Ref}
          d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"
          style={{ transformOrigin: "center" }}
        />
        <circle
          ref={circleRef}
          cx={10}
          cy={8}
          r={5}
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}