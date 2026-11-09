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

export type MessageSquarePlusIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function MessageSquarePlusIcon({
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
}: MessageSquarePlusIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const groupRef = ref<SVGGElement>(null);
  const path2Ref = ref<SVGPathElement>(null);
  const path3Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(groupRef.current, path2Ref.current, path3Ref.current);

  const startAnimation = () => {
    if (!groupRef.current || !path2Ref.current || !path3Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          groupRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(8deg)" },
            { transform: "rotate(-8deg)" },
            { transform: "rotate(2deg)" },
            { transform: "rotate(0deg)" }
          ],
          duration,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(45deg)" },
            { transform: "rotate(0deg)" }
          ],
          600,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path3Ref.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(45deg)" },
            { transform: "rotate(0deg)" }
          ],
          600,
          50,
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
      aria-label="message-square-plus"
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
        <g
          ref={groupRef}
          style={{ transformOrigin: "bottom left" }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path
            ref={path2Ref}
            d="M12 7v6"
            style={{ transformOrigin: "center" }}
          />
          <path
            ref={path3Ref}
            d="M9 10h6"
            style={{ transformOrigin: "center" }}
          />
        </g>
      </svg>
    </div>
  );
}