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

export type Axis3DIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function Axis3DIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 900,
  animateOnHover = true,
  iconRef,
  ...props
}: Axis3DIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const path2Ref = ref<SVGPathElement>(null);
  const path3Ref = ref<SVGPathElement>(null);
  const path4Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(path2Ref.current, path3Ref.current, path4Ref.current);

  const startAnimation = () => {
    if (!path2Ref.current || !path3Ref.current || !path4Ref.current) {
      return;
    }

    const pathLength = 10;

    controller.current?.start([
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { strokeDashoffset: pathLength, opacity: 0 },
            { strokeDashoffset: 0, opacity: 1 }
          ],
          300,
          200,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path3Ref.current!,
          [
            { strokeDashoffset: pathLength, opacity: 0 },
            { strokeDashoffset: 0, opacity: 1 }
          ],
          300,
          400,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path4Ref.current!,
          [
            { strokeDashoffset: pathLength, opacity: 0 },
            { strokeDashoffset: 0, opacity: 1 }
          ],
          300,
          600,
          "ease-in-out"
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
      aria-label="axis-3d"
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
        <path d="M4 4v15a1 1 0 0 0 1 1h15" />
        <g>
          <path
            ref={path2Ref}
            d="M4.293 19.707 6 18"
            style={{ strokeDasharray: "10", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
          />
          <path
            ref={path3Ref}
            d="m9 15 1.5-1.5"
            style={{ strokeDasharray: "10", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
          />
          <path
            ref={path4Ref}
            d="M13.5 10.5 15 9"
            style={{ strokeDasharray: "10", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
          />
        </g>
      </svg>
    </div>
  );
}