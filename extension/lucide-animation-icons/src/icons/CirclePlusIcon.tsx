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

export type CirclePlusIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CirclePlusIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 300,
  animateOnHover = true,
  iconRef,
  ...props
}: CirclePlusIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const horizRef = ref<SVGPathElement>(null);
  const vertRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(horizRef.current, vertRef.current);

  const startAnimation = () => {
    if (!horizRef.current || !vertRef.current) {
      return;
    }

    const pathLength = 8;
    const setDash = (el: SVGPathElement) => {
      el.style.strokeDasharray = `${pathLength}`;
      el.style.strokeDashoffset = `${pathLength}`;
    };

    setDash(horizRef.current);
    setDash(vertRef.current);

    controller.current?.start([
      () =>
        createIconAnimation(
          vertRef.current!,
          [
            { opacity: 0, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          horizRef.current!,
          [
            { opacity: 0, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          100,
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
      aria-label="circle-plus"
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
        <circle cx="12" cy="12" r="10" />
        <path
          ref={horizRef}
          d="M8 12h8"
          style={{ strokeDasharray: "8", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
        <path
          ref={vertRef}
          d="M12 8v8"
          style={{ strokeDasharray: "8", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
