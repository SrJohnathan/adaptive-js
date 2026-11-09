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

export type BoxesIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BoxesIcon({
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
}: BoxesIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const path1Ref = ref<SVGPathElement>(null);
  const path2Ref = ref<SVGPathElement>(null);
  const path3Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(path1Ref.current, path2Ref.current, path3Ref.current);

  const startAnimation = () => {
    if (!path1Ref.current || !path2Ref.current || !path3Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          path1Ref.current!,
          [
            { transform: "translate(0px, 0px)" },
            { transform: "translate(-1.5px, 1.5px)" },
            { transform: "translate(0px, 0px)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { transform: "translate(0px, 0px)" },
            { transform: "translate(1.5px, 1.5px)" },
            { transform: "translate(0px, 0px)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        ),
      () =>
        createIconAnimation(
          path3Ref.current!,
          [
            { transform: "translate(0px, 0px)" },
            { transform: "translate(0px, -1.5px)" },
            { transform: "translate(0px, 0px)" }
          ],
          duration,
          0,
          "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
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
      aria-label="boxes"
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
        style={{ overflow: "visible" }}
      >
        <path
          ref={path1Ref}
          d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z m4.03 3.58 -4.74 -2.85 m4.74 2.85 5-3 m-5 3v5.17"
          style={{ transformOrigin: "center", transform: "translate(-1.5px, 1.5px)" }}
        />
        <path
          ref={path2Ref}
          d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z m5 3-5-3 m5 3 4.74-2.85 M17 16.5v5.17"
          style={{ transformOrigin: "center", transform: "translate(1.5px, 1.5px)" }}
        />
        <path
          ref={path3Ref}
          d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z M12 8 7.26 5.15 m4.74 2.85 4.74-2.85 M12 13.5V8"
          style={{ transformOrigin: "center", transform: "translate(0px, -1.5px)" }}
        />
      </svg>
    </div>
  );
}