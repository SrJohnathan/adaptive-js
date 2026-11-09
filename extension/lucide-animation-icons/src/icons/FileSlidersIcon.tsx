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

export type FileSlidersIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function FileSlidersIcon({
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
}: FileSlidersIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const line1Ref = ref<SVGPathElement>(null);
  const line2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(line1Ref.current, line2Ref.current);

  const startAnimation = () => {
    if (!line1Ref.current || !line2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          line1Ref.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(4px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "cubic-bezier(0.34, 1.56, 0.64, 1)"
        ),
      () =>
        createIconAnimation(
          line2Ref.current!,
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-4px)" },
            { transform: "translateX(0)" }
          ],
          duration,
          0,
          "cubic-bezier(0.34, 1.56, 0.64, 1)"
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
      aria-label="file-sliders"
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
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path
          ref={line1Ref}
          d="M8 12h8"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={line2Ref}
          d="M14 16v2"
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}