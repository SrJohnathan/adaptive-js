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

export type AccessibilityIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function AccessibilityIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 1400,
  animateOnHover = true,
  iconRef,
  ...props
}: AccessibilityIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const group1Ref = ref<SVGGElement>(null);
  const group2Ref = ref<SVGGElement>(null);
  const path3Ref = ref<SVGPathElement>(null);

  const getTargets = () =>
    collectElements(group1Ref.current, group2Ref.current, path3Ref.current);

  const startAnimation = () => {
    if (!group1Ref.current || !group2Ref.current || !path3Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          group1Ref.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(5deg)" },
            { transform: "rotate(-5deg)" },
            { transform: "rotate(0deg)" }
          ],
          800,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          group2Ref.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(360deg)" }
          ],
          1000,
          400,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          path3Ref.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-60deg)" },
            { transform: "rotate(0deg)" }
          ],
          400,
          200,
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
      aria-label="accessibility"
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
        <circle cx="16" cy="4" r="1" />
        <g
          ref={group1Ref}
          style={{ transformOrigin: "center" }}
        >
          <path d="M18,19l1-7-6,1" />
          <path d="M8,5l5.5,3-2.4,3.5" />
          <path
            ref={path3Ref}
            d="M8 5 L5 8"
            style={{ transformOrigin: "8px 5px" }}
          />
        </g>
        <g
          ref={group2Ref}
          style={{ transformOrigin: "9px 16px" }}
        >
          <path d="M4.2,14.5c-.8,2.6.7,5.4,3.3,6.2,1.2.4,2.4.3,3.6-.2" />
          <path d="M13.8,17.5c.8-2.6-.7-5.4-3.3-6.2-1.2-.4-2.4-.3-3.6.2" />
        </g>
        <path d="M13,13.1c-.5-.7-1.1-1.2-1.9-1.6" />
      </svg>
    </div>
  );
}
