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

export type CircleXIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CircleXIcon({
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
}: CircleXIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const diag1Ref = ref<SVGPathElement>(null);
  const diag2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(diag1Ref.current, diag2Ref.current);

  const startAnimation = () => {
    if (!diag1Ref.current || !diag2Ref.current) {
      return;
    }

    const pathLength = 8.5;
    const setDash = (el: SVGPathElement) => {
      el.style.strokeDasharray = `${pathLength}`;
      el.style.strokeDashoffset = `${pathLength}`;
    };

    setDash(diag1Ref.current);
    setDash(diag2Ref.current);

    controller.current?.start([
      () =>
        createIconAnimation(
          diag1Ref.current!,
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
          diag2Ref.current!,
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
      aria-label="circle-x"
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
          ref={diag1Ref}
          d="m15 9-6 6"
          style={{ strokeDasharray: "8.5", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
        <path
          ref={diag2Ref}
          d="m9 9 6 6"
          style={{ strokeDasharray: "8.5", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
