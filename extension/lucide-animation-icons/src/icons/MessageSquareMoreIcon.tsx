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

export type MessageSquareMoreIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function MessageSquareMoreIcon({
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
}: MessageSquareMoreIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const groupRef = ref<SVGGElement>(null);
  const line1Ref = ref<SVGLineElement>(null);
  const line2Ref = ref<SVGLineElement>(null);
  const line3Ref = ref<SVGLineElement>(null);

  const getTargets = () => collectElements(groupRef.current, line1Ref.current, line2Ref.current, line3Ref.current);

  const startAnimation = () => {
    if (!groupRef.current || !line1Ref.current || !line2Ref.current || !line3Ref.current) {
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
          line1Ref.current!,
          [
            { y1: 10, y2: 10 },
            { y1: 8.5, y2: 11.5 },
            { y1: 10, y2: 10 }
          ],
          600,
          200,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          line2Ref.current!,
          [
            { y1: 10, y2: 10 },
            { y1: 8.5, y2: 11.5 },
            { y1: 10, y2: 10 }
          ],
          600,
          100,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          line3Ref.current!,
          [
            { y1: 10, y2: 10 },
            { y1: 8.5, y2: 11.5 },
            { y1: 10, y2: 10 }
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
      aria-label="message-square-more"
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
        <g
          ref={groupRef}
          style={{ transformOrigin: "bottom left" }}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line
            ref={line1Ref}
            x1="16"
            y1={10}
            x2="16"
            y2={10}
            style={{ transformOrigin: "center" }}
          />
          <line
            ref={line2Ref}
            x1="12"
            y1={10}
            x2="12"
            y2={10}
            style={{ transformOrigin: "center" }}
          />
          <line
            ref={line3Ref}
            x1="8"
            y1={10}
            x2="8"
            y2={10}
            style={{ transformOrigin: "center" }}
          />
        </g>
      </svg>
    </div>
  );
}