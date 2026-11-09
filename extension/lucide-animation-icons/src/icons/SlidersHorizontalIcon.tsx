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

export type SlidersHorizontalIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function SlidersHorizontalIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 400,
  animateOnHover = true,
  iconRef,
  ...props
}: SlidersHorizontalIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const lines = Array.from({ length: 9 }, () => ref<SVGLineElement>(null));

  const getTargets = () => collectElements(...lines.map(r => r.current));

  const startAnimation = () => {
    if (!lines[0].current) return;

    controller.current?.start(
      lines.map((r, i) => {
        const start = r.current?.getAttribute?.('x1') || 
          (i === 0 ? 14 : i === 1 ? 10 : i === 2 ? 14 : i === 3 ? 12 : i === 4 ? 8 : i === 5 ? 8 : i === 6 ? 12 : i === 7 ? 16 : 16);
        const end = i === 0 ? 10 : i === 1 ? 5 : i === 2 ? 9 : i === 3 ? 18 : i === 4 ? 13 : i === 5 ? 14 : i === 6 ? 4 : i === 7 ? 8 : 8;
        const prop = i <= 2 ? 'x1' : i <= 5 ? 'x1' : 'x1';
        
        return () =>
          createIconAnimation(
            r.current!,
            [
              { [prop]: start },
              { [prop]: end }
            ],
            duration,
            0,
            "cubic-bezier(0.34, 1.56, 0.64, 1)"
          );
      })
    );
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
      aria-label="sliders-horizontal"
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
        {[
          { x1: 21, y1: 4, x2: 3, y2: 4 },
          { x1: 3, y1: 4, x2: 14, y2: 4 },
          { x1: 14, y1: 2, x2: 14, y2: 6 },
          { x1: 3, y1: 12, x2: 12, y2: 12 },
          { x1: 8, y1: 12, x2: 8, y2: 3 },
          { x1: 8, y1: 10, x2: 14, y2: 14 },
          { x1: 3, y1: 20, x2: 12, y2: 20 },
          { x1: 16, y1: 20, x2: 21, y2: 20 },
          { x1: 16, y1: 18, x2: 22, y2: 22 }
        ].map((line, i) => (
          <line
            key={i}
            ref={lines[i]}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            style={{ transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
  );
}