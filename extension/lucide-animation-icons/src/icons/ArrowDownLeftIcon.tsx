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

export type ArrowDownLeftIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ArrowDownLeftIcon({
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
}: ArrowDownLeftIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const headRef = ref<SVGPathElement>(null);
  const head2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(headRef.current, head2Ref.current);

  const startAnimation = () => {
    if (!headRef.current || !head2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          headRef.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(3px, -3px)" },
            { transform: "translate(0, 0)" }
          ],
          200,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          head2Ref.current!,
          [
            { transform: "translate(0, 0)" },
            { transform: "translate(3px, -3px)" },
            { transform: "translate(0, 0)" }
          ],
          200,
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
      aria-label="arrow-down-left"
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
          ref={headRef}
          d="M17 17H7V7"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={head2Ref}
          d="M7 17 L12 12"
          style={{ transformOrigin: "center" }}
        />
        <path d="M17 7 L12 12" />
      </svg>
    </div>
  );
}