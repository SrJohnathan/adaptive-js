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

export type MessageCircleCodeIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function MessageCircleCodeIcon({
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
}: MessageCircleCodeIconProps) {
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
            { transform: "translateX(0)" },
            { transform: "translateX(-1.5px)" },
            { transform: "translateX(0.75px)" },
            { transform: "translateX(0)" }
          ],
          600,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path3Ref.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(1.5px)" },
            { transform: "translateX(-0.75px)" },
            { transform: "translateX(0)" }
          ],
          600,
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
      aria-label="message-circle-code"
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
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          <path
            ref={path2Ref}
            d="M10 9.5 8 12l2 2.5"
            style={{ transformOrigin: "center" }}
          />
          <path
            ref={path3Ref}
            d="m14 9.5 2 2.5-2 2.5"
            style={{ transformOrigin: "center" }}
          />
        </g>
      </svg>
    </div>
  );
}