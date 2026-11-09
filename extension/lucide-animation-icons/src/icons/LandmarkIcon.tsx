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

export type LandmarkIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function LandmarkIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 350,
  animateOnHover = true,
  iconRef,
  ...props
}: LandmarkIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const column1Ref = ref<SVGLineElement>(null);
  const column2Ref = ref<SVGLineElement>(null);
  const column3Ref = ref<SVGLineElement>(null);
  const column4Ref = ref<SVGLineElement>(null);
  const roofRef = ref<SVGPolygonElement>(null);

  const getTargets = () => collectElements(column1Ref.current, column2Ref.current, column3Ref.current, column4Ref.current, roofRef.current);

  const startAnimation = () => {
    if (!column1Ref.current || !roofRef.current) return;

    controller.current?.start([
      () =>
        createIconAnimation(
          column4Ref.current!,
          [
            { opacity: 0, transform: "translateX(-10px)" },
            { opacity: 0.8, transform: "translateX(2px)" },
            { opacity: 1, transform: "translateX(0)" }
          ],
          duration,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          column3Ref.current!,
          [
            { opacity: 0, transform: "translateX(-10px)" },
            { opacity: 0.8, transform: "translateX(2px)" },
            { opacity: 1, transform: "translateX(0)" }
          ],
          duration,
          100,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          column2Ref.current!,
          [
            { opacity: 0, transform: "translateX(-10px)" },
            { opacity: 0.8, transform: "translateX(2px)" },
            { opacity: 1, transform: "translateX(0)" }
          ],
          duration,
          200,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          column1Ref.current!,
          [
            { opacity: 0, transform: "translateX(-10px)" },
            { opacity: 0.8, transform: "translateX(2px)" },
            { opacity: 1, transform: "translateX(0)" }
          ],
          duration,
          300,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          roofRef.current!,
          [
            { opacity: 0, transform: "translateY(-10px)" },
            { opacity: 0.8, transform: "translateY(2px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          duration,
          400,
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
      aria-label="landmark"
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
        <line x1="3" x2="21" y1="22" y2="22" class="floor" />
        <line
          ref={column1Ref}
          x1="6"
          x2="6"
          y1="18"
          y2="11"
          style={{ transformOrigin: "center" }}
        />
        <line
          ref={column2Ref}
          x1="10"
          x2="10"
          y1="18"
          y2="11"
          style={{ transformOrigin: "center" }}
        />
        <line
          ref={column3Ref}
          x1="14"
          x2="14"
          y1="18"
          y2="11"
          style={{ transformOrigin: "center" }}
        />
        <line
          ref={column4Ref}
          x1="18"
          x2="18"
          y1="18"
          y2="11"
          style={{ transformOrigin: "center" }}
        />
        <polygon
          ref={roofRef}
          points="12 2 20 7 4 7"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}