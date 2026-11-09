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

export type AlarmClockIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function AlarmClockIcon({
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
}: AlarmClockIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const primaryPath1Ref = ref<SVGPathElement>(null);
  const primaryPath2Ref = ref<SVGPathElement>(null);
  const primaryPath3Ref = ref<SVGPathElement>(null);
  const primaryPath4Ref = ref<SVGPathElement>(null);
  const secondaryPath1Ref = ref<SVGPathElement>(null);
  const secondaryPath2Ref = ref<SVGPathElement>(null);

  const getTargets = () =>
    collectElements(
      primaryPath1Ref.current,
      primaryPath2Ref.current,
      primaryPath3Ref.current,
      primaryPath4Ref.current,
      secondaryPath1Ref.current,
      secondaryPath2Ref.current
    );

  const startAnimation = () => {
    if (
      !primaryPath1Ref.current ||
      !primaryPath2Ref.current ||
      !primaryPath3Ref.current ||
      !primaryPath4Ref.current ||
      !secondaryPath1Ref.current ||
      !secondaryPath2Ref.current
    ) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          primaryPath1Ref.current!,
          [
            { transform: "translate(0, -1.5px)" },
            { transform: "translate(-1px, -1.5px)" },
            { transform: "translate(1px, -1.5px)" },
            { transform: "translate(-1px, -1.5px)" },
            { transform: "translate(1px, -1.5px)" },
            { transform: "translate(0, -1.5px)" }
          ],
          duration,
          0,
          "linear"
        ),
      () =>
        createIconAnimation(
          primaryPath2Ref.current!,
          [
            { transform: "translate(0, -1.5px)" },
            { transform: "translate(-1px, -1.5px)" },
            { transform: "translate(1px, -1.5px)" },
            { transform: "translate(-1px, -1.5px)" },
            { transform: "translate(1px, -1.5px)" },
            { transform: "translate(0, -1.5px)" }
          ],
          duration,
          0,
          "linear"
        ),
      () =>
        createIconAnimation(
          primaryPath3Ref.current!,
          [
            { transform: "translate(0, -1.5px)" },
            { transform: "translate(-1px, -1.5px)" },
            { transform: "translate(1px, -1.5px)" },
            { transform: "translate(-1px, -1.5px)" },
            { transform: "translate(1px, -1.5px)" },
            { transform: "translate(0, -1.5px)" }
          ],
          duration,
          0,
          "linear"
        ),
      () =>
        createIconAnimation(
          primaryPath4Ref.current!,
          [
            { transform: "translate(0, -1.5px)" },
            { transform: "translate(-1px, -1.5px)" },
            { transform: "translate(1px, -1.5px)" },
            { transform: "translate(-1px, -1.5px)" },
            { transform: "translate(1px, -1.5px)" },
            { transform: "translate(0, -1.5px)" }
          ],
          duration,
          0,
          "linear"
        ),
      () =>
        createIconAnimation(
          secondaryPath1Ref.current!,
          [
            { transform: "translate(0, -2.5px)" },
            { transform: "translate(-2px, -2.5px)" },
            { transform: "translate(2px, -2.5px)" },
            { transform: "translate(-2px, -2.5px)" },
            { transform: "translate(2px, -2.5px)" },
            { transform: "translate(0, -2.5px)" }
          ],
          duration,
          0,
          "linear"
        ),
      () =>
        createIconAnimation(
          secondaryPath2Ref.current!,
          [
            { transform: "translate(0, -2.5px)" },
            { transform: "translate(-2px, -2.5px)" },
            { transform: "translate(2px, -2.5px)" },
            { transform: "translate(-2px, -2.5px)" },
            { transform: "translate(2px, -2.5px)" },
            { transform: "translate(0, -2.5px)" }
          ],
          duration,
          0,
          "linear"
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
      aria-label="alarm-clock"
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
          ref={primaryPath1Ref}
          d="M18 20.5L19.5 22"
        />
        <path
          ref={primaryPath2Ref}
          d="M6 20.5L4.5 22"
        />
        <path
          ref={primaryPath3Ref}
          d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
        />
        <path
          ref={primaryPath4Ref}
          d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
        />
        <path
          ref={secondaryPath1Ref}
          d="M18 2L21.747 5.31064"
        />
        <path
          ref={secondaryPath2Ref}
          d="M6 2L2.25304 5.31064"
        />
      </svg>
    </div>
  );
}