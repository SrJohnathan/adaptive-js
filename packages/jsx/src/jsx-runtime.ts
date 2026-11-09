/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * Runtime minimalista - sem VDOM, preserva thunks pra hidratação fina
 */

import type { AdaptiveNode } from "./types.js";

// factory usado pelo compilador automático (react-jsx)
// jsx(type, props)      -> filhos em props.children
// jsx(type, props, key) -> 3º argumento é a KEY, não um filho
//
// O transform do ci (oxc, runtime automatic) emite a key no 3º argumento:
//   _jsxs("li", { children: [...] }, item)
// Tratar o 3º argumento como filho faz a key virar conteúdo e descarta todos os
// filhos de qualquer elemento que tenha key.
export function jsx(type: any, props: any, key?: unknown) {
  const { children: propChildren, key: propsKey, ...rest } = props ?? {};
  const normalized =
      propChildren == null ? []
          : Array.isArray(propChildren) ? propChildren
              : [propChildren];
  const finalKey = key !== undefined ? key : propsKey;
  // props sem children + key separada - padrão react-jsx
  return {
    tag: type,
    props: rest,
    children: normalized,
    ...(finalKey != null ? { key: finalKey } : {}),
  } as any;
}

export const jsxs = jsx;
export const jsxDEV = jsx;

// Fragment sem DOM extra - Symbol compartilhado server/client
export const Fragment = Symbol.for("adaptive.fragment");

// Tipagem - apagada no build, não vai pro bundle
export namespace JSX {
  export type Element = AdaptiveNode;
  export interface ElementChildrenAttribute { children: {} }
  export interface IntrinsicAttributes { key?: string | number }

  // ---------------------------------------------------------------- base

  // qualquer valor reativo pode ser passado como thunk
  export type MaybeSignal<T> = T | (() => T);

  // filhos: nó, texto, número, vazio, thunk reativo ou lista de qualquer um deles
  export type Child =
      | AdaptiveNode
      | string
      | number
      | boolean
      | null
      | undefined
      | (() => Child)
      | Child[];

  export type StyleValue = string | number | boolean | null | undefined;

  // chaves de CSSStyleDeclaration (camelCase) + custom properties (--x)
  export type StyleObject =
      {
        [K in keyof CSSStyleDeclaration as K extends string
          ? CSSStyleDeclaration[K] extends string ? K : never
          : never]?: MaybeSignal<StyleValue>;
      } & {
    [prop: `--${string}`]: MaybeSignal<StyleValue>;
  };

  export type Ref<T> = { current: T | null } | ((el: T | null) => void);

  

  // ---------------------------------------------------------------- eventos
  // sempre função direta, nunca thunk

  export type TargetedEvent<T, E extends Event = Event> =
      E & { target: T; currentTarget: T };

  export type EventHandler<T, E extends Event = Event> =
      (e: TargetedEvent<T, E>) => void;

  export interface DOMEvents<T> {
    // mouse
    onClick?: EventHandler<T, MouseEvent>;
    onDblClick?: EventHandler<T, MouseEvent>;
    onMouseDown?: EventHandler<T, MouseEvent>;
    onMouseUp?: EventHandler<T, MouseEvent>;
    onMouseMove?: EventHandler<T, MouseEvent>;
    onMouseEnter?: EventHandler<T, MouseEvent>;
    onMouseLeave?: EventHandler<T, MouseEvent>;
    onContextMenu?: EventHandler<T, MouseEvent>;
    // pointer
    onPointerDown?: EventHandler<T, PointerEvent>;
    onPointerUp?: EventHandler<T, PointerEvent>;
    onPointerMove?: EventHandler<T, PointerEvent>;
    onPointerEnter?: EventHandler<T, PointerEvent>;
    onPointerLeave?: EventHandler<T, PointerEvent>;
    onPointerCancel?: EventHandler<T, PointerEvent>;
    // touch
    onTouchStart?: EventHandler<T, TouchEvent>;
    onTouchMove?: EventHandler<T, TouchEvent>;
    onTouchEnd?: EventHandler<T, TouchEvent>;
    // teclado
    onKeyDown?: EventHandler<T, KeyboardEvent>;
    onKeyUp?: EventHandler<T, KeyboardEvent>;
    // foco
    onFocus?: EventHandler<T, FocusEvent>;
    onBlur?: EventHandler<T, FocusEvent>;
    // formulário
    onInput?: EventHandler<T, InputEvent>;
    onChange?: EventHandler<T, Event>;
    onSubmit?: EventHandler<T, SubmitEvent>;
    onReset?: EventHandler<T, Event>;
    onInvalid?: EventHandler<T, Event>;
    // scroll / wheel
    onScroll?: EventHandler<T, Event>;
    onWheel?: EventHandler<T, WheelEvent>;
    // drag & drop
    onDragStart?: EventHandler<T, DragEvent>;
    onDrag?: EventHandler<T, DragEvent>;
    onDragEnd?: EventHandler<T, DragEvent>;
    onDragEnter?: EventHandler<T, DragEvent>;
    onDragLeave?: EventHandler<T, DragEvent>;
    onDragOver?: EventHandler<T, DragEvent>;
    onDrop?: EventHandler<T, DragEvent>;
    // clipboard
    onCopy?: EventHandler<T, ClipboardEvent>;
    onCut?: EventHandler<T, ClipboardEvent>;
    onPaste?: EventHandler<T, ClipboardEvent>;
    // carregamento / mídia
    onLoad?: EventHandler<T, Event>;
    onError?: EventHandler<T, Event>;
    onPlay?: EventHandler<T, Event>;
    onPause?: EventHandler<T, Event>;
    onEnded?: EventHandler<T, Event>;
    onTimeUpdate?: EventHandler<T, Event>;
    // animação / transição
    onAnimationStart?: EventHandler<T, AnimationEvent>;
    onAnimationEnd?: EventHandler<T, AnimationEvent>;
    onTransitionEnd?: EventHandler<T, TransitionEvent>;
  }

  // ---------------------------------------------------------------- atributos globais

  export interface HTMLAttributes<T> extends DOMEvents<T> {
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

    // data-* e aria-* continuam livres
    [attr: `data-${string}`]: any;
    [attr: `aria-${string}`]: any;
  }

  // ---------------------------------------------------------------- atributos específicos

  export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: MaybeSignal<string>;
    target?: MaybeSignal<"_self" | "_blank" | "_parent" | "_top" | (string & {})>;
    rel?: MaybeSignal<string>;
    download?: MaybeSignal<boolean | string>;
  }

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: MaybeSignal<"button" | "submit" | "reset">;
    disabled?: MaybeSignal<boolean>;
    name?: MaybeSignal<string>;
    value?: MaybeSignal<string | number>;
  }

  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
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

  export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
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

  export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: MaybeSignal<string | number>;
    disabled?: MaybeSignal<boolean>;
    multiple?: MaybeSignal<boolean>;
    required?: MaybeSignal<boolean>;
    name?: MaybeSignal<string>;
  }

  export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: MaybeSignal<string | number>;
    selected?: MaybeSignal<boolean>;
    disabled?: MaybeSignal<boolean>;
  }

  export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    htmlFor?: MaybeSignal<string>;
  }

  export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    action?: MaybeSignal<string>;
    method?: MaybeSignal<"get" | "post" | "dialog">;
    encType?: MaybeSignal<string>;
    noValidate?: MaybeSignal<boolean>;
  }

  export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    src?: MaybeSignal<string>;
    alt?: MaybeSignal<string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    loading?: MaybeSignal<"lazy" | "eager">;
    decoding?: MaybeSignal<"async" | "sync" | "auto">;
  }

  export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    src?: MaybeSignal<string>;
    controls?: MaybeSignal<boolean>;
    autoPlay?: MaybeSignal<boolean>;
    loop?: MaybeSignal<boolean>;
    muted?: MaybeSignal<boolean>;
    preload?: MaybeSignal<"none" | "metadata" | "auto">;
    poster?: MaybeSignal<string>;
  }

  export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
  }

  export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    src?: MaybeSignal<string>;
    sandbox?: MaybeSignal<string>;
    allow?: MaybeSignal<string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
  }

  export interface TableCellHTMLAttributes<T> extends HTMLAttributes<T> {
    colSpan?: MaybeSignal<number>;
    rowSpan?: MaybeSignal<number>;
  }

  export interface OpenableHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: MaybeSignal<boolean>;
  }

  export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: MaybeSignal<number>;
    max?: MaybeSignal<number>;
  }

  export interface SVGAttributes<T> extends HTMLAttributes<T> {
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

    // apresentação
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

    // texto
    fontSize?: MaybeSignal<string | number>;
    fontFamily?: MaybeSignal<string>;
    fontWeight?: MaybeSignal<string | number>;
    textAnchor?: MaybeSignal<"start" | "middle" | "end">;
    dominantBaseline?: MaybeSignal<string>;
    dx?: MaybeSignal<string | number>;
    dy?: MaybeSignal<string | number>;

    // gradientes, clip e mask
    gradientUnits?: MaybeSignal<"userSpaceOnUse" | "objectBoundingBox">;
    gradientTransform?: MaybeSignal<string>;
    clipPathUnits?: MaybeSignal<"userSpaceOnUse" | "objectBoundingBox">;
    maskUnits?: MaybeSignal<"userSpaceOnUse" | "objectBoundingBox">;
  }

  // ---------------------------------------------------------------- elementos

  export interface IntrinsicElements {
    // fallback seguro - todo elemento desconhecido ainda é HTML
    [elem: string]: HTMLAttributes<any>;

    // estrutura
    main: HTMLAttributes<HTMLElement>;
    section: HTMLAttributes<HTMLElement>;
    article: HTMLAttributes<HTMLElement>;
    aside: HTMLAttributes<HTMLElement>;
    header: HTMLAttributes<HTMLElement>;
    footer: HTMLAttributes<HTMLElement>;
    nav: HTMLAttributes<HTMLElement>;
    div: HTMLAttributes<HTMLDivElement>;
    span: HTMLAttributes<HTMLSpanElement>;

    // texto
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

    // listas
    ul: HTMLAttributes<HTMLUListElement>;
    ol: HTMLAttributes<HTMLOListElement>;
    li: HTMLAttributes<HTMLLIElement>;

    // links e mídia
    a: AnchorHTMLAttributes<HTMLAnchorElement>;
    img: ImgHTMLAttributes<HTMLImageElement>;
    video: MediaHTMLAttributes<HTMLVideoElement>;
    audio: MediaHTMLAttributes<HTMLAudioElement>;
    canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
    iframe: IframeHTMLAttributes<HTMLIFrameElement>;

    // formulário
    form: FormHTMLAttributes<HTMLFormElement>;
    label: LabelHTMLAttributes<HTMLLabelElement>;
    input: InputHTMLAttributes<HTMLInputElement>;
    textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
    select: SelectHTMLAttributes<HTMLSelectElement>;
    option: OptionHTMLAttributes<HTMLOptionElement>;
    button: ButtonHTMLAttributes<HTMLButtonElement>;
    fieldset: HTMLAttributes<HTMLFieldSetElement>;
    progress: ProgressHTMLAttributes<HTMLProgressElement>;

    // tabela
    table: HTMLAttributes<HTMLTableElement>;
    thead: HTMLAttributes<HTMLTableSectionElement>;
    tbody: HTMLAttributes<HTMLTableSectionElement>;
    tr: HTMLAttributes<HTMLTableRowElement>;
    th: TableCellHTMLAttributes<HTMLTableCellElement>;
    td: TableCellHTMLAttributes<HTMLTableCellElement>;

    // interativos
    dialog: OpenableHTMLAttributes<HTMLDialogElement>;
    details: OpenableHTMLAttributes<HTMLDetailsElement>;
    summary: HTMLAttributes<HTMLElement>;

    // svg
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