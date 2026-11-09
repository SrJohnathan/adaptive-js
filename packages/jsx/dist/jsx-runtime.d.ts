import type { AdaptiveNode } from "./types.js";
export declare function jsx(type: any, props: any, key?: unknown): any;
export declare const jsxs: typeof jsx;
export declare const jsxDEV: typeof jsx;
export declare const Fragment: unique symbol;
export declare namespace JSX {
    type Element = AdaptiveNode;
    interface ElementChildrenAttribute {
        children: {};
    }
    interface IntrinsicAttributes {
        key?: string | number;
    }
    type MaybeSignal<T> = T | (() => T);
    type Child = AdaptiveNode | string | number | boolean | null | undefined | (() => Child) | Child[];
    type StyleValue = string | number | boolean | null | undefined;
    type StyleObject = {
        [K in keyof CSSStyleDeclaration as K extends string ? CSSStyleDeclaration[K] extends string ? K : never : never]?: MaybeSignal<StyleValue>;
    } & {
        [prop: `--${string}`]: MaybeSignal<StyleValue>;
    };
    type Ref<T> = {
        current: T | null;
    } | ((el: T | null) => void);
    type TargetedEvent<T, E extends Event = Event> = E & {
        target: T;
        currentTarget: T;
    };
    type EventHandler<T, E extends Event = Event> = (e: TargetedEvent<T, E>) => void;
    interface DOMEvents<T> {
        onClick?: EventHandler<T, MouseEvent>;
        onDblClick?: EventHandler<T, MouseEvent>;
        onMouseDown?: EventHandler<T, MouseEvent>;
        onMouseUp?: EventHandler<T, MouseEvent>;
        onMouseMove?: EventHandler<T, MouseEvent>;
        onMouseEnter?: EventHandler<T, MouseEvent>;
        onMouseLeave?: EventHandler<T, MouseEvent>;
        onContextMenu?: EventHandler<T, MouseEvent>;
        onPointerDown?: EventHandler<T, PointerEvent>;
        onPointerUp?: EventHandler<T, PointerEvent>;
        onPointerMove?: EventHandler<T, PointerEvent>;
        onPointerEnter?: EventHandler<T, PointerEvent>;
        onPointerLeave?: EventHandler<T, PointerEvent>;
        onPointerCancel?: EventHandler<T, PointerEvent>;
        onTouchStart?: EventHandler<T, TouchEvent>;
        onTouchMove?: EventHandler<T, TouchEvent>;
        onTouchEnd?: EventHandler<T, TouchEvent>;
        onKeyDown?: EventHandler<T, KeyboardEvent>;
        onKeyUp?: EventHandler<T, KeyboardEvent>;
        onFocus?: EventHandler<T, FocusEvent>;
        onBlur?: EventHandler<T, FocusEvent>;
        onInput?: EventHandler<T, InputEvent>;
        onChange?: EventHandler<T, Event>;
        onSubmit?: EventHandler<T, SubmitEvent>;
        onReset?: EventHandler<T, Event>;
        onInvalid?: EventHandler<T, Event>;
        onScroll?: EventHandler<T, Event>;
        onWheel?: EventHandler<T, WheelEvent>;
        onDragStart?: EventHandler<T, DragEvent>;
        onDrag?: EventHandler<T, DragEvent>;
        onDragEnd?: EventHandler<T, DragEvent>;
        onDragEnter?: EventHandler<T, DragEvent>;
        onDragLeave?: EventHandler<T, DragEvent>;
        onDragOver?: EventHandler<T, DragEvent>;
        onDrop?: EventHandler<T, DragEvent>;
        onCopy?: EventHandler<T, ClipboardEvent>;
        onCut?: EventHandler<T, ClipboardEvent>;
        onPaste?: EventHandler<T, ClipboardEvent>;
        onLoad?: EventHandler<T, Event>;
        onError?: EventHandler<T, Event>;
        onPlay?: EventHandler<T, Event>;
        onPause?: EventHandler<T, Event>;
        onEnded?: EventHandler<T, Event>;
        onTimeUpdate?: EventHandler<T, Event>;
        onAnimationStart?: EventHandler<T, AnimationEvent>;
        onAnimationEnd?: EventHandler<T, AnimationEvent>;
        onTransitionEnd?: EventHandler<T, TransitionEvent>;
    }
    interface HTMLAttributes<T> extends DOMEvents<T> {
        key?: string | number;
        ref?: Ref<T>;
        children?: Child;
        className?: MaybeSignal<string>;
        /** alias de className */
        class?: MaybeSignal<string>;
        id?: MaybeSignal<string>;
        hidden?: MaybeSignal<boolean>;
        tabIndex?: MaybeSignal<number>;
        title?: MaybeSignal<string>;
        style?: MaybeSignal<StyleObject | string>;
        role?: MaybeSignal<string>;
        lang?: MaybeSignal<string>;
        dir?: MaybeSignal<"ltr" | "rtl" | "auto">;
        slot?: MaybeSignal<string>;
        draggable?: MaybeSignal<boolean>;
        contentEditable?: MaybeSignal<boolean | "true" | "false" | "plaintext-only">;
        spellcheck?: MaybeSignal<boolean>;
        inert?: MaybeSignal<boolean>;
        [attr: `data-${string}`]: any;
        [attr: `aria-${string}`]: any;
    }
    interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
        href?: MaybeSignal<string>;
        target?: MaybeSignal<"_self" | "_blank" | "_parent" | "_top" | (string & {})>;
        rel?: MaybeSignal<string>;
        download?: MaybeSignal<boolean | string>;
    }
    interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
        type?: MaybeSignal<"button" | "submit" | "reset">;
        disabled?: MaybeSignal<boolean>;
        name?: MaybeSignal<string>;
        value?: MaybeSignal<string | number>;
    }
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        type?: MaybeSignal<string>;
        value?: MaybeSignal<string | number>;
        checked?: MaybeSignal<boolean>;
        placeholder?: MaybeSignal<string>;
        disabled?: MaybeSignal<boolean>;
        readOnly?: MaybeSignal<boolean>;
        required?: MaybeSignal<boolean>;
        multiple?: MaybeSignal<boolean>;
        autoFocus?: MaybeSignal<boolean>;
        autoComplete?: MaybeSignal<string>;
        name?: MaybeSignal<string>;
        min?: MaybeSignal<string | number>;
        max?: MaybeSignal<string | number>;
        step?: MaybeSignal<string | number>;
        minLength?: MaybeSignal<number>;
        maxLength?: MaybeSignal<number>;
        pattern?: MaybeSignal<string>;
        accept?: MaybeSignal<string>;
    }
    interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: MaybeSignal<string>;
        placeholder?: MaybeSignal<string>;
        disabled?: MaybeSignal<boolean>;
        readOnly?: MaybeSignal<boolean>;
        required?: MaybeSignal<boolean>;
        name?: MaybeSignal<string>;
        rows?: MaybeSignal<number>;
        cols?: MaybeSignal<number>;
        maxLength?: MaybeSignal<number>;
        wrap?: MaybeSignal<"soft" | "hard" | "off">;
    }
    interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: MaybeSignal<string | number>;
        disabled?: MaybeSignal<boolean>;
        multiple?: MaybeSignal<boolean>;
        required?: MaybeSignal<boolean>;
        name?: MaybeSignal<string>;
    }
    interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: MaybeSignal<string | number>;
        selected?: MaybeSignal<boolean>;
        disabled?: MaybeSignal<boolean>;
    }
    interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
        htmlFor?: MaybeSignal<string>;
    }
    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        action?: MaybeSignal<string>;
        method?: MaybeSignal<"get" | "post" | "dialog">;
        encType?: MaybeSignal<string>;
        noValidate?: MaybeSignal<boolean>;
    }
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        src?: MaybeSignal<string>;
        alt?: MaybeSignal<string>;
        width?: MaybeSignal<number | string>;
        height?: MaybeSignal<number | string>;
        loading?: MaybeSignal<"lazy" | "eager">;
        decoding?: MaybeSignal<"async" | "sync" | "auto">;
    }
    interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
        src?: MaybeSignal<string>;
        controls?: MaybeSignal<boolean>;
        autoPlay?: MaybeSignal<boolean>;
        loop?: MaybeSignal<boolean>;
        muted?: MaybeSignal<boolean>;
        preload?: MaybeSignal<"none" | "metadata" | "auto">;
        poster?: MaybeSignal<string>;
    }
    interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
        width?: MaybeSignal<number | string>;
        height?: MaybeSignal<number | string>;
    }
    interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
        src?: MaybeSignal<string>;
        sandbox?: MaybeSignal<string>;
        allow?: MaybeSignal<string>;
        width?: MaybeSignal<number | string>;
        height?: MaybeSignal<number | string>;
    }
    interface TableCellHTMLAttributes<T> extends HTMLAttributes<T> {
        colSpan?: MaybeSignal<number>;
        rowSpan?: MaybeSignal<number>;
    }
    interface OpenableHTMLAttributes<T> extends HTMLAttributes<T> {
        open?: MaybeSignal<boolean>;
    }
    interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: MaybeSignal<number>;
        max?: MaybeSignal<number>;
    }
    interface SVGAttributes<T> extends HTMLAttributes<T> {
        fill?: MaybeSignal<string>;
        stroke?: MaybeSignal<string>;
        strokeWidth?: MaybeSignal<string | number>;
        strokeLinecap?: MaybeSignal<"butt" | "round" | "square">;
        strokeLinejoin?: MaybeSignal<"miter" | "round" | "bevel">;
        fillRule?: MaybeSignal<"nonzero" | "evenodd">;
        clipRule?: MaybeSignal<"nonzero" | "evenodd">;
        opacity?: MaybeSignal<string | number>;
        transform?: MaybeSignal<string>;
        viewBox?: MaybeSignal<string>;
        preserveAspectRatio?: MaybeSignal<string>;
        xmlns?: MaybeSignal<string>;
        d?: MaybeSignal<string>;
        points?: MaybeSignal<string>;
        x?: MaybeSignal<string | number>;
        y?: MaybeSignal<string | number>;
        x1?: MaybeSignal<string | number>;
        y1?: MaybeSignal<string | number>;
        x2?: MaybeSignal<string | number>;
        y2?: MaybeSignal<string | number>;
        cx?: MaybeSignal<string | number>;
        cy?: MaybeSignal<string | number>;
        r?: MaybeSignal<string | number>;
        rx?: MaybeSignal<string | number>;
        ry?: MaybeSignal<string | number>;
        width?: MaybeSignal<string | number>;
        height?: MaybeSignal<string | number>;
        offset?: MaybeSignal<string | number>;
        stopColor?: MaybeSignal<string>;
        stopOpacity?: MaybeSignal<string | number>;
        href?: MaybeSignal<string>;
        overflow?: MaybeSignal<"visible" | "hidden" | "scroll" | "auto" | "inherit">;
        fillOpacity?: MaybeSignal<string | number>;
        strokeOpacity?: MaybeSignal<string | number>;
        strokeDasharray?: MaybeSignal<string | number>;
        strokeDashoffset?: MaybeSignal<string | number>;
        strokeMiterlimit?: MaybeSignal<string | number>;
        vectorEffect?: MaybeSignal<string>;
        pathLength?: MaybeSignal<number>;
        display?: MaybeSignal<string>;
        visibility?: MaybeSignal<"visible" | "hidden" | "collapse">;
        pointerEvents?: MaybeSignal<string>;
        cursor?: MaybeSignal<string>;
        clipPath?: MaybeSignal<string>;
        mask?: MaybeSignal<string>;
        filter?: MaybeSignal<string>;
        color?: MaybeSignal<string>;
        fontSize?: MaybeSignal<string | number>;
        fontFamily?: MaybeSignal<string>;
        fontWeight?: MaybeSignal<string | number>;
        textAnchor?: MaybeSignal<"start" | "middle" | "end">;
        dominantBaseline?: MaybeSignal<string>;
        dx?: MaybeSignal<string | number>;
        dy?: MaybeSignal<string | number>;
        gradientUnits?: MaybeSignal<"userSpaceOnUse" | "objectBoundingBox">;
        gradientTransform?: MaybeSignal<string>;
        clipPathUnits?: MaybeSignal<"userSpaceOnUse" | "objectBoundingBox">;
        maskUnits?: MaybeSignal<"userSpaceOnUse" | "objectBoundingBox">;
    }
    interface IntrinsicElements {
        [elem: string]: HTMLAttributes<any>;
        main: HTMLAttributes<HTMLElement>;
        section: HTMLAttributes<HTMLElement>;
        article: HTMLAttributes<HTMLElement>;
        aside: HTMLAttributes<HTMLElement>;
        header: HTMLAttributes<HTMLElement>;
        footer: HTMLAttributes<HTMLElement>;
        nav: HTMLAttributes<HTMLElement>;
        div: HTMLAttributes<HTMLDivElement>;
        span: HTMLAttributes<HTMLSpanElement>;
        h1: HTMLAttributes<HTMLHeadingElement>;
        h2: HTMLAttributes<HTMLHeadingElement>;
        h3: HTMLAttributes<HTMLHeadingElement>;
        h4: HTMLAttributes<HTMLHeadingElement>;
        h5: HTMLAttributes<HTMLHeadingElement>;
        h6: HTMLAttributes<HTMLHeadingElement>;
        p: HTMLAttributes<HTMLParagraphElement>;
        pre: HTMLAttributes<HTMLPreElement>;
        code: HTMLAttributes<HTMLElement>;
        strong: HTMLAttributes<HTMLElement>;
        em: HTMLAttributes<HTMLElement>;
        small: HTMLAttributes<HTMLElement>;
        br: HTMLAttributes<HTMLBRElement>;
        hr: HTMLAttributes<HTMLHRElement>;
        blockquote: HTMLAttributes<HTMLQuoteElement>;
        ul: HTMLAttributes<HTMLUListElement>;
        ol: HTMLAttributes<HTMLOListElement>;
        li: HTMLAttributes<HTMLLIElement>;
        a: AnchorHTMLAttributes<HTMLAnchorElement>;
        img: ImgHTMLAttributes<HTMLImageElement>;
        video: MediaHTMLAttributes<HTMLVideoElement>;
        audio: MediaHTMLAttributes<HTMLAudioElement>;
        canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
        iframe: IframeHTMLAttributes<HTMLIFrameElement>;
        form: FormHTMLAttributes<HTMLFormElement>;
        label: LabelHTMLAttributes<HTMLLabelElement>;
        input: InputHTMLAttributes<HTMLInputElement>;
        textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
        select: SelectHTMLAttributes<HTMLSelectElement>;
        option: OptionHTMLAttributes<HTMLOptionElement>;
        button: ButtonHTMLAttributes<HTMLButtonElement>;
        fieldset: HTMLAttributes<HTMLFieldSetElement>;
        progress: ProgressHTMLAttributes<HTMLProgressElement>;
        table: HTMLAttributes<HTMLTableElement>;
        thead: HTMLAttributes<HTMLTableSectionElement>;
        tbody: HTMLAttributes<HTMLTableSectionElement>;
        tr: HTMLAttributes<HTMLTableRowElement>;
        th: TableCellHTMLAttributes<HTMLTableCellElement>;
        td: TableCellHTMLAttributes<HTMLTableCellElement>;
        dialog: OpenableHTMLAttributes<HTMLDialogElement>;
        details: OpenableHTMLAttributes<HTMLDetailsElement>;
        summary: HTMLAttributes<HTMLElement>;
        svg: SVGAttributes<SVGSVGElement>;
        g: SVGAttributes<SVGGElement>;
        path: SVGAttributes<SVGPathElement>;
        circle: SVGAttributes<SVGCircleElement>;
        ellipse: SVGAttributes<SVGEllipseElement>;
        line: SVGAttributes<SVGLineElement>;
        polyline: SVGAttributes<SVGPolylineElement>;
        polygon: SVGAttributes<SVGPolygonElement>;
        rect: SVGAttributes<SVGRectElement>;
        text: SVGAttributes<SVGTextElement>;
        defs: SVGAttributes<SVGDefsElement>;
        use: SVGAttributes<SVGUseElement>;
        clipPath: SVGAttributes<SVGClipPathElement>;
        mask: SVGAttributes<SVGMaskElement>;
        linearGradient: SVGAttributes<SVGLinearGradientElement>;
        radialGradient: SVGAttributes<SVGRadialGradientElement>;
        stop: SVGAttributes<SVGStopElement>;
    }
}
