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

export type RainbowIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function RainbowIcon({
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
}: RainbowIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const arc1Ref = ref<SVGPathElement>(null);
  const arc2Ref = ref<SVGPathElement>(null);
  const arc3Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(arc1Ref.current, arc2Ref.current, arc3Ref.current);

  const startAnimation = () => {
    if (!arc1Ref.current || !arc2Ref.current || !arc3Ref.current) {
      return;
    }

    const path1Length = arc1Ref.current.getTotalLength();
    const path2Length = arc2Ref.current.getTotalLength();
    const path3Length = arc3Ref.current.getTotalLength();

    arc1Ref.current.style.strokeDasharray = `${path1Length}`;
    arc1Ref.current.style.strokeDashoffset = `${path1Length * 2}`;
    arc2Ref.current.style.strokeDasharray = `${path2Length}`;
    arc2Ref.current.style.strokeDashoffset = `${path2Length * 2}`;
    arc3Ref.current.style.strokeDasharray = `${path3Length}`;
    arc3Ref.current.style.strokeDashoffset = `${path3Length * 2}`;

    controller.current?.start([
      () =>
        createIconAnimation(
          arc1Ref.current!,
          [
            { strokeDashoffset: `${path1Length * 2}` },
            { strokeDashoffset: `${path1Length * 2}` },
            { strokeDashoffset: `${path1Length}` }
          ],
          800,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          arc2Ref.current!,
          [
            { strokeDashoffset: `${path2Length * 2}` },
            { strokeDashoffset: `${path2Length * 2}` },
            { strokeDashoffset: `${path2Length}` }
          ],
          800,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          arc3Ref.current!,
          [
            { strokeDashoffset: `${path3Length * 2}` },
            { strokeDashoffset: `${path3Length * 2}` },
            { strokeDashoffset: `${path3Length}` }
          ],
          800,
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
      aria-label="rainbow"
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
        <path
          ref={arc1Ref}
          d="M22 17a10 10 0 0 0-20 0"
          style={{ strokeDasharray: "64", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
        <path
          ref={arc2Ref}
          d="M18 17a6 6 0 0 0-12 0"
          style={{ strokeDasharray: "38", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
        <path
          ref={arc3Ref}
          d="M14 17a2 2 0 0 0-4 0"
          style={{ strokeDasharray: "14", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}