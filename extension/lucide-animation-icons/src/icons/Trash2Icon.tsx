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

export type Trash2IconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function Trash2Icon({
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
}: Trash2IconProps) {
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
      aria-label="trash-2"
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
          d="M10 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7h2"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={bodyRef}
          d="M8 11h8"
          style={{ transformOrigin: "center" }}
        />
        <path d="M6 4h.01" />
        <path d="M18 4h.01" />
        <path d="M10 7v12" />
        <path d="M14 7v12" />
      </svg>
    </div>
  );
}