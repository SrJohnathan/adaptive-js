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

export type CpuIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function CpuIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 1000,
  animateOnHover = true,
  iconRef,
  ...props
}: CpuIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const vLines = [ref<SVGPathElement>(null), ref<SVGPathElement>(null), ref<SVGPathElement>(null), ref<SVGPathElement>(null)];
  const hLines = [ref<SVGPathElement>(null), ref<SVGPathElement>(null), ref<SVGPathElement>(null), ref<SVGPathElement>(null)];

  const getTargets = () => collectElements(
    ...vLines.map(r => r.current),
    ...hLines.map(r => r.current)
  );

  const startAnimation = () => {
    if (!vLines[0].current) return;

    controller.current?.start([
      ...vLines.map((r, i) => () =>
        createIconAnimation(
          r.current!,
          [
            { transform: "scaleY(1)", opacity: 1 },
            { transform: "scaleY(1.1)", opacity: 0.8 },
            { transform: "scaleY(1)", opacity: 1 }
          ],
          duration,
          i * 50,
          "ease-in-out"
        )
      ),
      ...hLines.map((r, i) => () =>
        createIconAnimation(
          r.current!,
          [
            { transform: "scaleX(1)", opacity: 1 },
            { transform: "scaleX(1.1)", opacity: 0.8 },
            { transform: "scaleX(1)", opacity: 1 }
          ],
          duration,
          i * 50 + 200,
          "ease-in-out"
        )
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
      aria-label="cpu"
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
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <rect width="6" height="6" x="9" y="9" rx="1" />
        <path ref={vLines[0]} d="M15 2v2" style={{ transformOrigin: "center" }} />
        <path ref={vLines[1]} d="M15 20v2" style={{ transformOrigin: "center" }} />
        <path ref={hLines[0]} d="M2 15h2" style={{ transformOrigin: "center" }} />
        <path ref={hLines[1]} d="M2 9h2" style={{ transformOrigin: "center" }} />
        <path ref={hLines[2]} d="M20 15h2" style={{ transformOrigin: "center" }} />
        <path ref={hLines[3]} d="M20 9h2" style={{ transformOrigin: "center" }} />
        <path ref={vLines[2]} d="M9 2v2" style={{ transformOrigin: "center" }} />
        <path ref={vLines[3]} d="M9 20v2" style={{ transformOrigin: "center" }} />
      </svg>
    </div>
  );
}