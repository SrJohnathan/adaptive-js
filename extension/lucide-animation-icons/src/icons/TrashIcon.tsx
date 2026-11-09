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

export type TrashIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function TrashIcon({
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
}: TrashIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const lidRef = ref<SVGPathElement>(null);
  const bodyRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(lidRef.current, bodyRef.current);

  const startAnimation = () => {
    if (!lidRef.current || !bodyRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          lidRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-2px)" },
            { transform: "translateY(0)" }
          ],
          500,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          bodyRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(2px)" },
            { transform: "translateY(0)" }
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
      aria-label="trash"
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
          ref={lidRef}
          d="M3 6h18"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={bodyRef}
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5"
          style={{ transformOrigin: "center" }}
        />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </svg>
    </div>
  );
}