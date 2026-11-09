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

export type ClipboardPenIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ClipboardPenIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 1000,
  animateOnHover = true,
  iconRef,
  ...props
}: ClipboardPenIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const clipRef = ref<SVGRectElement>(null);
  const boardRef = ref<SVGPathElement>(null);
  const penRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(clipRef.current, boardRef.current, penRef.current);

  const startAnimation = () => {
    if (!clipRef.current || !boardRef.current || !penRef.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          clipRef.current!,
          [
            { transform: "translateY(0)" },
            { transform: "translateY(-2px)" },
            { transform: "translateY(1px)" },
            { transform: "translateY(0)" }
          ],
          500,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          boardRef.current!,
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-1deg)" },
            { transform: "rotate(1deg)" },
            { transform: "rotate(0deg)" }
          ],
          500,
          0,
          "ease-in-out"
        ),
      () =>
        createIconAnimation(
          penRef.current!,
          [
            { transform: "rotate(0deg) translate(0px, 0px)" },
            { transform: "rotate(-0.5deg) translate(-1px, 1.5px)" },
            { transform: "rotate(0.5deg) translate(1.5px, -1px)" },
            { transform: "rotate(0deg) translate(0px, 0px)" }
          ],
          500,
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
      aria-label="clipboard-pen"
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
        <rect
          ref={clipRef}
          width="8"
          height="4"
          x="8"
          y="2"
          rx="1"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={boardRef}
          d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"
          style={{ transformOrigin: "center" }}
        />
        <path d="M4 13.5V6a2 2 0 0 1 2-2h2" />
        <path
          ref={penRef}
          d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
          style={{ transformOrigin: "13.378px 15.626px" }}
        />
      </svg>
    </div>
  );
}