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

export type CheckCheckIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CheckCheckIcon({
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
}: CheckCheckIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const check1Ref = ref<SVGPathElement>(null);
  const check2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(check1Ref.current, check2Ref.current);

  const startAnimation = () => {
    if (!check1Ref.current || !check2Ref.current) {
      return;
    }

    const path1Length = check1Ref.current.getTotalLength();
    const path2Length = check2Ref.current.getTotalLength();
    
    check1Ref.current.style.strokeDasharray = `${path1Length}`;
    check1Ref.current.style.strokeDashoffset = `${path1Length}`;
    check2Ref.current.style.strokeDasharray = `${path2Length}`;
    check2Ref.current.style.strokeDashoffset = `${path2Length}`;

    controller.current?.start([
      () =>
        createIconAnimation(
          check1Ref.current!,
          [
            { strokeDashoffset: `${path1Length}`, opacity: 0 },
            { strokeDashoffset: `${path1Length}`, opacity: 0 },
            { strokeDashoffset: "0", opacity: 1 }
          ],
          500,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          check2Ref.current!,
          [
            { strokeDashoffset: `${path2Length}`, opacity: 0 },
            { strokeDashoffset: `${path2Length}`, opacity: 0 },
            { strokeDashoffset: "0", opacity: 1 }
          ],
          500,
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
      aria-label="check-check"
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
          ref={check1Ref}
          d="M2 12l5 5L18 6"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={check2Ref}
          d="M13 16l1.5 1.5L22 10"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
