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

export type ClapperboardIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ClapperboardIcon({
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
}: ClapperboardIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const outerRef = ref<SVGGElement>(null);
  const innerRef = ref<SVGGElement>(null);

  const getTargets = () => collectElements(outerRef.current, innerRef.current);

  const startAnimation = () => {
    if (!outerRef.current || !innerRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          outerRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-10deg)" },
            { transform: "rotate(-10deg)" },
            { transform: "rotate(0deg)" }
          ],
          800,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          innerRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-10deg)" },
            { transform: "rotate(16deg)" },
            { transform: "rotate(0deg)" }
          ],
          400,
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
      aria-label="clapperboard"
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
          ref={outerRef}
          style={{ transformBox: "fill-box", transformOrigin: "4px 20px" }}
        >
          <g
            ref={innerRef}
            style={{ transformBox: "fill-box", transformOrigin: "3px 11px" }}
          >
            <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
            <path d="m6.2 5.3 3.1 3.9" />
            <path d="m12.4 3.4 3.1 4" />
          </g>
          <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
        </g>
      </svg>
    </div>
  );
}
