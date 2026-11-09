import {
    createReactiveEffect,
    init,
    ref,
    signal,
    untrack,
} from "@adaptive-js/web";
import type { AdaptiveNode } from "@adaptive-js/web";
import type { JSX } from "@adaptive-js/web/jsx-runtime";
import { SkeletonLoader } from "./skeleton-loader.js";

type MaybeSignal<T> = T | (() => T);
type Dimension = number | string;

export interface ImageLoadingChunkProgressProps {
    progress: (progress: number) => void;
    src: string;
    width?: Dimension;
    height?: Dimension;
    feedbackSrc?: string;
    setSkeleton: boolean;
    style: CSSStyleDeclaration;
    className?: string;
    alt?: string;
}

type ImageState = {
    abort: AbortController | null;
    objectUrl: string | null;
    toRevoke: string[];
    disposed: boolean;
};

function read<T>(value: MaybeSignal<T> | undefined): T | undefined {
    if (typeof value === "function") return (value as () => T)();
    return value;
}

function asBlobParts(chunks: Uint8Array[]): BlobPart[] {
    return chunks as unknown as BlobPart[];
}

function toCssSize(value?: Dimension): string | undefined {
    if (value === undefined || value === null) return undefined;
    return typeof value === "number" ? `${value}px` : value;
}

function toStyleObject(
    style?: CSSStyleDeclaration | JSX.StyleObject | null,
): JSX.StyleObject {
    if (!style) return {};
    const source = style as unknown as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const key of Object.keys(source)) {
        const value = source[key];
        if (typeof value === "string" || typeof value === "number") {
            out[key] = String(value);
        }
    }
    return out as JSX.StyleObject;
}

export const ImageLoadingChunkProgress = (
    props: ImageLoadingChunkProgressProps,
): AdaptiveNode => {
    const [loaded, setLoaded] = signal(false);
    const [failed, setFailed] = signal(false);
    const [progressValue, setProgressValue] = signal(0);
    const [displaySrc, setDisplaySrc] = signal<string | undefined>(
        read(props.feedbackSrc),
    );

    const state = ref<ImageState>({
        abort: null,
        objectUrl: null,
        toRevoke: [],
        disposed: false,
    });

    const revokeUrl = (url: string | null | undefined) => {
        if (!url) return;
        try {
            URL.revokeObjectURL(url);
        } catch {
            return;
        }
    };

    const clearUrls = () => {
        const st = state.current;
        if (!st) return;
        revokeUrl(st.objectUrl);
        st.objectUrl = null;
        for (const url of st.toRevoke) revokeUrl(url);
        st.toRevoke = [];
    };

    const applyPreview = (blob: Blob, st: ImageState) => {
        if (st.disposed) return;
        const next = URL.createObjectURL(blob);
        if (st.objectUrl && st.objectUrl !== next) {
            st.toRevoke.push(st.objectUrl);
        }
        st.objectUrl = next;
        setDisplaySrc(next);
    };

    const download = (url: string) => {
        const st = state.current;
        if (!st) return;

        st.abort?.abort();
        clearUrls();
        setFailed(false);
        setLoaded(false);
        setProgressValue(0);
        setDisplaySrc(read(props.feedbackSrc));

        if (!url) {
            setLoaded(true);
            return;
        }

        const controller = new AbortController();
        st.abort = controller;

        const report = (received: number, total: number) => {
            const ratio = total > 0 ? Math.min(received / total, 1) : 0;
            setProgressValue(ratio);
            props.progress(ratio);
        };

        void fetch(url, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response;
            })
            .then(async (response) => {
                const type =
                    response.headers.get("content-type") ||
                    "application/octet-stream";
                const lengthHeader = response.headers.get("content-length");
                const total = lengthHeader ? Number(lengthHeader) : 0;
                const body = response.body;

                if (!body || typeof body.getReader !== "function") {
                    const blob = await response.blob();
                    report(blob.size, blob.size);
                    if (st.disposed || controller.signal.aborted) return;
                    applyPreview(blob, st);
                    setProgressValue(1);
                    props.progress(1);
                    setLoaded(true);
                    return;
                }

                const reader = body.getReader();
                const chunks: Uint8Array[] = [];
                let received = 0;
                let frameQueued = false;

                const flush = () => {
                    frameQueued = false;
                    if (st.disposed || controller.signal.aborted) return;
                    applyPreview(new Blob(asBlobParts(chunks), { type }), st);
                };

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    if (!value) continue;
                    chunks.push(value);
                    received += value.length;
                    report(received, total);
                    if (!frameQueued) {
                        frameQueued = true;
                        if (typeof requestAnimationFrame === "function") {
                            requestAnimationFrame(flush);
                        } else {
                            flush();
                        }
                    }
                }

                if (st.disposed || controller.signal.aborted) return;
                applyPreview(new Blob(asBlobParts(chunks), { type }), st);
                setProgressValue(1);
                props.progress(1);
                setLoaded(true);
            })
            .catch(() => {
                if (st.disposed || controller.signal.aborted) return;
                setFailed(true);
                setLoaded(true);
            });
    };

    const handleImageLoad = () => {
        const st = state.current;
        if (!st) return;
        for (const url of st.toRevoke) revokeUrl(url);
        st.toRevoke = [];
    };

    init(() => {
        const stop = createReactiveEffect(() => {
            const url = read(props.src) ?? "";
            untrack(() => download(url));
        });

        return () => {
            if (typeof stop === "function") stop();
            const st = state.current;
            if (!st) return;
            st.disposed = true;
            st.abort?.abort();
            st.abort = null;
            clearUrls();
            setDisplaySrc(undefined);
        };
    });

    const showSkeleton = () => Boolean(read(props.setSkeleton)) && !loaded();

    const wrapperStyle = (): JSX.StyleObject => {
        const width = toCssSize(read(props.width));
        const height = toCssSize(read(props.height));
        const style: JSX.StyleObject = {
            position: "relative",
            display: "inline-block",
            lineHeight: "0",
        };
        if (width) style.width = width;
        if (height) style.height = height;
        return style;
    };

    const imageStyle = (): JSX.StyleObject => {
        const width = toCssSize(read(props.width));
        const height = toCssSize(read(props.height));
        const style: JSX.StyleObject = {
            ...toStyleObject(read(props.style)),
        };
        if (width) style.width = "100%";
        if (height) style.height = "100%";
        if (!displaySrc()) style.display = "none";
        return style;
    };

    const skeletonStyle = (): JSX.StyleObject => ({
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
    });

    return (
        <div
            class={() => {
                const custom = props.className ? ` ${props.className}` : "";
                return `image-loading-chunk-progress${custom}${
                    failed() ? " is-failed" : ""
                }${loaded() ? " is-loaded" : ""}`;
            }}
            style={wrapperStyle}
            data-progress={() => progressValue()}
            aria-busy={() => (!loaded() ? "true" : "false")}
        >
            {() =>
                showSkeleton() ? (
                    <SkeletonLoader
                        variant="rectangular"
                        width={read(props.width)}
                        height={read(props.height)}
                        style={skeletonStyle()}
                    />
                ) : null
            }
            <img
                src={() => displaySrc() as string}
                alt={props.alt ?? ""}
                style={imageStyle}
                onLoad={handleImageLoad}
                loading="eager"
                decoding="async"
            />
        </div>
    );
};
