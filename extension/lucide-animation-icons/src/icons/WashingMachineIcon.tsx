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

export type WashingMachineIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function WashingMachineIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 3000,
  animateOnHover = true,
  iconRef,
  ...props
}: WashingMachineIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const drumRef = ref<SVGGElement>(null);

  const getTargets = () => collectElements(drumRef.current);

  const startAnimation = () => {
    if (!drumRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          drumRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-1080deg)" }
          ],
          duration,
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
      aria-label="washing-machine"
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
        <path d="M3 6h3" />
        <path d="M17 6h.01" />
        <rect width="18" height="20" x="3" y="2" rx="2" />
        <g
          ref={drumRef}
          style={{ transformBox: "fill-box", transformOrigin: "center 13px" }}
        >
          <circle cx="12" cy="13" r="5" />
          <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
        </g>
      </svg>
    </div>
  );
}