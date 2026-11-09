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

export type BinaryIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BinaryIcon({
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
}: BinaryIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const rect1Ref = ref<SVGRectElement>(null);
  const rect2Ref = ref<SVGRectElement>(null);
  const path1Ref = ref<SVGPathElement>(null);
  const path2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(rect1Ref.current, rect2Ref.current, path1Ref.current, path2Ref.current);

  const startAnimation = () => {
    if (!rect1Ref.current || !rect2Ref.current || !path1Ref.current || !path2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          rect1Ref.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-8px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          rect2Ref.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(8px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path1Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-10px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(10px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
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
      aria-label="binary"
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
        <rect
          ref={rect1Ref}
          x="14"
          y="14"
          width="4"
          height="6"
          rx="2"
          style={{ transformOrigin: "center" }}
        />
        <rect
          ref={rect2Ref}
          x="6"
          y="4"
          width="4"
          height="6"
          rx="2"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={path1Ref}
          d="M6 20h4 M6 14h2v6"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={path2Ref}
          d="M14 4h2v6 M14 10h4"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}