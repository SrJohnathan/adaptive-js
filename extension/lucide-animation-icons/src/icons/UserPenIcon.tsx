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

export type UserPenIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function UserPenIcon({
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
}: UserPenIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const pathRef = ref<SVGPathElement>(null);
  const circleRef = ref<SVGCircleElement>(null);
  const penRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(pathRef.current, circleRef.current, penRef.current);

  const startAnimation = () => {
    if (!pathRef.current || !circleRef.current || !penRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          pathRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(2px)" },
            { transform: "translateY(-2px)" },
            { transform: "translateY(0)" }
          ],
          600,
          0,
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
          600,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          penRef.current!,
          [
            { transform: "rotate(0deg) translate(0px, 0px)" },
            { transform: "rotate(-0.5deg) translate(-1px, 1.5px)" },
            { transform: "rotate(0.5deg) translate(1.5px, -1px)" },
            { transform: "rotate(0deg) translate(0px, 0px)" }
          ],
          500,
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
      aria-label="user-pen"
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
          ref={pathRef}
          d="M11.5 15H7a4 4 0 0 0-4 4v2"
          style={{ transformOrigin: "center" }}
        />
        <circle
          ref={circleRef}
          cx="10"
          cy="7"
          r="4"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={penRef}
          d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
          style={{ transformOrigin: "21.378px 16.626px" }}
        />
      </svg>
    </div>
  );
}