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

export type ClipboardCheckIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function ClipboardCheckIcon({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className,
  onMouseEnter,
  onMouseLeave,
  duration = 1200,
  animateOnHover = true,
  iconRef,
  ...props
}: ClipboardCheckIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const clipRef = ref<SVGRectElement>(null);
  const boardRef = ref<SVGPathElement>(null);
  const checkRef = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(clipRef.current, boardRef.current, checkRef.current);

  const startAnimation = () => {
    if (!clipRef.current || !boardRef.current || !checkRef.current) {
      return;
    }

    const pathLength = checkRef.current?.getTotalLength() || 10;

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
          checkRef.current!,
          [
            { strokeDashoffset: "0", opacity: 1 },
            { strokeDashoffset: `${pathLength}`, opacity: 1 },
            { strokeDashoffset: "0", opacity: 1 }
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
      aria-label="clipboard-check"
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
          d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={checkRef}
          d="m9 14 2 2 4-4"
          style={{ strokeDashoffset: "0", opacity: 1, transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}