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

export type UserXIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function UserXIcon({
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
}: UserXIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const pathRef = ref<SVGPathElement>(null);
  const circleRef = ref<SVGCircleElement>(null);
  const diag1Ref = ref<SVGLineElement>(null);
  const diag2Ref = ref<SVGLineElement>(null);

  const getTargets = () => collectElements(pathRef.current, circleRef.current, diag1Ref.current, diag2Ref.current);

  const startAnimation = () => {
    if (!pathRef.current || !circleRef.current || !diag1Ref.current || !diag2Ref.current) {
      return;
    }

    const pathLength = 17;

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
          diag1Ref.current!,
          [
            { opacity: 0, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          diag2Ref.current!,
          [
            { opacity: 0, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          150,
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
      aria-label="user-x"
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
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          style={{ transformOrigin: "center" }}
        />
        <circle
          ref={circleRef}
          cx="9"
          cy="7"
          r="4"
          style={{ transformOrigin: "center" }}
        />
        <line
          ref={diag1Ref}
          x1="22"
          x2="17"
          y1="8"
          y2="13"
          style={{ strokeDasharray: "17", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
        <line
          ref={diag2Ref}
          x1="17"
          x2="22"
          y1="8"
          y2="13"
          style={{ strokeDasharray: "17", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}