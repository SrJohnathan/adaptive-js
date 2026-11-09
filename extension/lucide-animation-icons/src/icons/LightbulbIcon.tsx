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

export type LightbulbIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function LightbulbIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 800,
  animateOnHover = true,
  iconRef,
  ...props
}: LightbulbIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const path1Ref = ref<SVGPathElement>(null);
  const path2Ref = ref<SVGPathElement>(null);
  const path3Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(path1Ref.current, path2Ref.current, path3Ref.current);

  const startAnimation = () => {
    if (!path1Ref.current || !path2Ref.current || !path3Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          path1Ref.current!,
          [
            { transform: "rotate(0deg)", fillOpacity: 0 },
            { transform: "rotate(-20deg)", fillOpacity: 1 },
            { transform: "rotate(15deg)", fillOpacity: 0 },
            { transform: "rotate(-7deg)", fillOpacity: 1 },
            { transform: "rotate(0deg)", fillOpacity: 0 }
          ],
          800,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(0deg)" },
            { transform: "rotate(10deg)" },
            { transform: "rotate(-5deg)" },
            { transform: "rotate(0deg)" }
          ],
          800,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path3Ref.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(0deg)" },
            { transform: "rotate(10deg)" },
            { transform: "rotate(-5deg)" },
            { transform: "rotate(0deg)" }
          ],
          800,
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
      aria-label="lightbulb"
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
          d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
          style={{ transformBox: "fill-box", transformOrigin: "bottom center", fillOpacity: 0 }}
        />
        <path
          ref={path2Ref}
          d="M9 18h6"
          style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
        />
        <path
          ref={path3Ref}
          d="M10 22h4"
          style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}
        />
      </svg>
    </div>
  );
}