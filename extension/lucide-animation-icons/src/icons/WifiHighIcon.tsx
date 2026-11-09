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

export type WifiHighIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function WifiHighIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 600,
  animateOnHover = true,
  iconRef,
  ...props
}: WifiHighIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const line1Ref = ref<SVGPathElement>(null);
  const line2Ref = ref<SVGPathElement>(null);
  const dotRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(line1Ref.current, line2Ref.current, dotRef.current);

  const startAnimation = () => {
    if (!line1Ref.current || !line2Ref.current || !dotRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          line2Ref.current!,
          [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
          ],
          duration,
          100,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          line1Ref.current!,
          [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
          ],
          duration,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          dotRef.current!,
          [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
          ],
          duration,
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
      aria-label="wifi-high"
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
          ref={dotRef}
          d="M12 20h.01"
          style={{ transformOrigin: "center", opacity: 1 }}
        />
        <path
          ref={line1Ref}
          d="M8.5 16.429a5 5 0 0 1 7 0"
          style={{ transformOrigin: "center", opacity: 1 }}
        />
        <path
          ref={line2Ref}
          d="M5 12.859a10 10 0 0 1 14 0"
          style={{ transformOrigin: "center", opacity: 1 }}
        />
      </svg>
    </div>
  );
}