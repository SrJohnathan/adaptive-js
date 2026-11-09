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

export type GalleryVerticalIconProps = AnimatedLucideIconProps & {
  color?: string;
  strokeWidth?: number;
};

export function GalleryVerticalIcon({
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
}: GalleryVerticalIconProps) {
  const controller = ref<AnimatedIconController>(new AnimatedIconController());
  const path1Ref = ref<SVGPathElement>(null);
  const path2Ref = ref<SVGPathElement>(null);

  const getTargets = () => collectElements(path1Ref.current, path2Ref.current);

  const startAnimation = () => {
    if (!path1Ref.current || !path2Ref.current) {
      return;
    }

    controller.current?.start([
      () =>
        createIconAnimation(
          path1Ref.current!,
          [
            { opacity: 0, transform: "scale(0.8) translateY(4px)" },
            { opacity: 1, transform: "scale(1) translateY(0)" }
          ],
          duration,
          150,
          "cubic-bezier(0.34, 1.56, 0.64, 1)"
        ),
      () =>
        createIconAnimation(
          path2Ref.current!,
          [
            { opacity: 0, transform: "scale(0.8) translateY(-4px)" },
            { opacity: 1, transform: "scale(1) translateY(0)" }
          ],
          duration,
          150,
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
      aria-label="gallery-vertical"
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
          ref={path1Ref}
          d="M3 2h18"
          style={{ transformOrigin: "center", opacity: 1, transform: "scale(1) translateY(0)" }}
        />
        <rect width="18" height="12" x="3" y="6" rx="2" />
        <path
          ref={path2Ref}
          d="M3 22h18"
          style={{ transformOrigin: "center", opacity: 1, transform: "scale(1) translateY(0)" }}
        />
      </svg>
    </div>
  );
}