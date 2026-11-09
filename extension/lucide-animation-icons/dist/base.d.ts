import { RefBox } from "@adaptive-js/web";
export type BaseDivProps = {
    className?: string;
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
    [key: string]: any;
};
export type AnimatedLucideIconHandle = {
    startAnimation: () => void;
    stopAnimation: () => void;
};
export type AnimatedLucideIconProps = BaseDivProps & {
    size?: number | (() => number);
    duration?: number;
    strokeWidth?: number;
    animateOnHover?: boolean;
    iconRef?: RefBox<AnimatedLucideIconHandle> | ((handle: AnimatedLucideIconHandle | null) => void);
};
export type AnimationTarget = SVGElement;
export type AnimationFactory = () => Animation | null;
export type VariantPrimitive = string | number;
export type VariantTransition = {
    duration?: number;
    delay?: number;
    ease?: string;
    times?: number[];
    [key: string]: unknown;
};
export type VariantState = {
    transition?: VariantTransition;
    [key: string]: VariantPrimitive | VariantPrimitive[] | VariantTransition | undefined;
};
export type VariantDefinitionMap = Record<string, VariantState>;
export declare class AnimatedIconController {
    private activeAnimations;
    stopRunningAnimations(): void;
    start(factories: AnimationFactory[]): void;
    reset(targets: AnimationTarget[], duration: number): void;
    destroy(targets: AnimationTarget[]): void;
}
export declare function cn(...values: Array<string | null | undefined | false>): string;
export declare function assignHandle(target: AnimatedLucideIconProps["iconRef"], handle: AnimatedLucideIconHandle | null): void;
export declare function collectElements(...elements: Array<SVGElement | null>): SVGElement[];
export declare function finishAnimation(elements: SVGElement[]): void;
export declare function createNormalAnimation(element: SVGElement, duration: number, delay?: number): Animation;
export declare function createIconAnimation(element: SVGElement, keyframes: Keyframe[], duration: number, delay?: number, easing?: string): Animation;
export declare function createVariantAnimation(element: SVGElement | null, variants: VariantDefinitionMap, stateName: string, fallbackDuration?: number): Animation | null;
export declare function useAnimatedIconHandle(iconRef: AnimatedLucideIconProps["iconRef"], controller: RefBox<AnimatedIconController | null>, getTargets: () => SVGElement[], startAnimation: () => void, stopAnimation: () => void): void;
export declare function createMouseHandlers(animateOnHover: boolean, startAnimation: () => void, stopAnimation: () => void, onMouseEnter?: (event: MouseEvent) => void, onMouseLeave?: (event: MouseEvent) => void): {
    onMouseEnter: (event: MouseEvent) => void;
    onMouseLeave: (event: MouseEvent) => void;
};
