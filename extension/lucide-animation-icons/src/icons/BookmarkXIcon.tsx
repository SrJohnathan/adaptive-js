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

export type BookmarkXIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function BookmarkXIcon({
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
}: BookmarkXIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const bookmarkPathRef = ref<SVGPathElement>(null);
  const diagonal1Ref = ref<SVGPathElement>(null);
  const diagonal2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(bookmarkPathRef.current, diagonal1Ref.current, diagonal2Ref.current);

  const startAnimation = () => {
    if (!bookmarkPathRef.current || !diagonal1Ref.current || !diagonal2Ref.current) {
      return;
    }

    const pathLength = diagonal1Ref.current.getTotalLength();
    diagonal1Ref.current.style.strokeDasharray = `${pathLength}`;
    diagonal1Ref.current.style.strokeDashoffset = `${pathLength}`;
    diagonal2Ref.current.style.strokeDasharray = `${pathLength}`;
    diagonal2Ref.current.style.strokeDashoffset = `${pathLength}`;

    controller.current?.start([
      () =>
        createIconAnimation(
          bookmarkPathRef.current!,
          [
            { transform: "scale(1, 1)" },
            { transform: "scale(0.9, 1.3)" },
            { transform: "scale(1.1, 0.9)" },
            { transform: "scale(0.95, 1.05)" },
            { transform: "scale(1, 1)" }
          ],
          duration,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          diagonal1Ref.current!,
          [
            { opacity: 0, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          0,
          "ease-out"
        ),
      () =>
        createIconAnimation(
          diagonal2Ref.current!,
          [
            { opacity: 0, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: `${pathLength}` },
            { opacity: 1, strokeDashoffset: "0" }
          ],
          300,
          250,
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
      aria-label="bookmark-x"
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
          ref={bookmarkPathRef}
          d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
          style={{ transformOrigin: "center" }}
        />
        <path
          ref={diagonal1Ref}
          d="m14.5 7.5-5 5"
        />
        <path
          ref={diagonal2Ref}
          d="m9.5 7.5 5 5"
        />
      </svg>
    </div>
  );
}