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

export type UsersIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function UsersIcon({
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
}: UsersIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const path1Ref = ref<SVGPathElement>(null);
  const path2Ref = ref<SVGPathElement>(null);
  const path3Ref = ref<SVGPathElement>(null);
  const circleRef = ref<SVGCircleElement>(null);

  const getTargets = () => collectElements(path1Ref.current, path2Ref.current, path3Ref.current, circleRef.current);

  const startAnimation = () => {
    if (!path1Ref.current || !path2Ref.current || !path3Ref.current || !circleRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          path1Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(2px)" },
            { transform: "translateY(-1px)" },
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
            { transform: "translateY(4px)" },
            { transform: "translateY(-2px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path3Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(2px)" },
            { transform: "translateY(-1px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          100,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          circleRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(4px)" },
            { transform: "translateY(-2px)" },
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
      aria-label="users"
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
          ref={path1Ref}
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={path2Ref}
          d="M16 3.128a4 4 0 0 1 0 7.744"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={path3Ref}
          d="M22 21v-2a4 4 0 0 0-3-3.87"
          style={{ transformOrigin: "center" }}
        />
        <circle
          ref={circleRef}
          cx={9}
          cy={7}
          r={4}
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}