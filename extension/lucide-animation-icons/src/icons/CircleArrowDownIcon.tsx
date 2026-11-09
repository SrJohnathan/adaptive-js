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

export type CircleArrowDownIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CircleArrowDownIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 200,
  animateOnHover = true,
  iconRef,
  ...props
}: CircleArrowDownIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const pathRef = ref<SVGPathElement>(null);
  const path2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(pathRef.current, path2Ref.current);

  const startAnimation = () => {
    if (!pathRef.current || !path2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          pathRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-1.5px)" },
            { transform: "translateY(0)" }
          ],
          200,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-1.5px)" },
            { transform: "translateY(0)" }
          ],
          200,
          0,
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
      aria-label="circle-arrow-down"
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
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path
          ref={pathRef}
          d="M12 12v4"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={path2Ref}
          d="m8 12 4 4 4-4"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
