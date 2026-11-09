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

export type HardDriveDownloadIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function HardDriveDownloadIcon({
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
}: HardDriveDownloadIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const gRef = ref<SVGGElement>(null);

  const getTargets = () => collectElements(gRef.current);

  const startAnimation = () => {
    if (!gRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          gRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(2px)" },
            { transform: "translateY(0)" }
          ],
          300,
          0,
          "cubic-bezier(0.68, -0.6, 0.32, 1.6)"
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
      aria-label="hard-drive-download"
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
        ref={gRef}
        >
        <path d="M12 2v8" />
        <path d="m16 6-4 4-4-4" />
        </g>
        <rect width="20" height="8" x="2" y="14" rx="2" />
        <path d="M6 18h.01" />
        <path d="M10 18h.01" />
      </svg>
    </div>
  );
}
