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

export type ArrowDownIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ArrowDownIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 200,
  animateOnHover = true,
  iconRef,
  ...props
}: ArrowDownIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const head1Ref = ref<SVGPathElement>(null);
  const head2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(head1Ref.current, head2Ref.current);

  const startAnimation = () => {
    if (!head1Ref.current || !head2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          head1Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-3px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          head2Ref.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-3px)" },
            { transform: "translateY(0)" }
          ],
          duration,
          0,
          "ease-out"
        )
    ]);
  };

  const stopAnimation = () => {
    controller.current?.reset(getTargets(), Math.max(180, duration - 120));
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
      aria-label="arrow-down"
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
          ref={head1Ref}
          d="m5 12 7 7 7-7"
          style={{ transformOrigin: "center", transition: "all 0.2s ease-out" }}
        />
        <path
          ref={head2Ref}
          d="M12 14v5"
          style={{ transformOrigin: "center", transition: "all 0.2s ease-out" }}
        />
        <path d="M12 5v9" />
      </svg>
    </div>
  );
}