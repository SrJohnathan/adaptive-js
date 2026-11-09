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

export type SquareStackIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function SquareStackIcon({
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
}: SquareStackIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const path1Ref = ref<SVGPathElement>(null);
  const path2Ref = ref<SVGPathElement>(null);
  const rectRef = ref<SVGRectElement>(null);

  const getTargets = () => collectElements(path1Ref.current, path2Ref.current, rectRef.current);

  const startAnimation = () => {
    if (!path1Ref.current || !path2Ref.current || !rectRef.current) return;

    controller.current?.start([
      () =>
        createIconAnimation(
          path1Ref.current!,
          [
            { transform: "scale(1)" },
            { transform: "scale(0.9)" },
            { transform: "scale(1)" }
          ],
          duration,
          300,
          "ease"
        ),
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { transform: "scale(1)" },
            { transform: "scale(0.9)" },
            { transform: "scale(1)" }
          ],
          duration,
          150,
          "ease"
        ),
      () =>
        createIconAnimation(
          rectRef.current!,
          [
            { transform: "scale(1)" },
            { transform: "scale(0.9)" },
            { transform: "scale(1)" }
          ],
          duration,
          0,
          "ease"
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
      aria-label="square-stack"
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
          d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={path2Ref}
          d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"
          style={{ transformOrigin: "center" }}
        />
        <rect
          ref={rectRef}
          width="8"
          height="8"
          x="14"
          y="14"
          rx="2"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}