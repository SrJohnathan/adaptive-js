import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { createReactiveEffect, init, ref, signal, untrack, } from "@adaptive-js/web";
import { SkeletonLoader } from "./skeleton-loader.js";
function read(value) {
    if (typeof value === "function")
        return value();
    return value;
}
function asBlobParts(chunks) {
    return chunks;
}
function toCssSize(value) {
    if (value === undefined || value === null)
        return undefined;
    return typeof value === "number" ? `${value}px` : value;
}
function toStyleObject(style) {
    if (!style)
        return {};
    const source = style;
    const out = {};
    for (const key of Object.keys(source)) {
        const value = source[key];
        if (typeof value === "string" || typeof value === "number") {
            out[key] = String(value);
        }
    }
    return out;
}
export const ImageLoadingChunkProgress = (props) => {
    const [loaded, setLoaded] = signal(false);
    const [failed, setFailed] = signal(false);
    const [progressValue, setProgressValue] = signal(0);
    const [displaySrc, setDisplaySrc] = signal(read(props.feedbackSrc));
    const state = ref({
        abort: null,
        objectUrl: null,
        toRevoke: [],
        disposed: false,
    });
    const revokeUrl = (url) => {
        if (!url)
            return;
        try {
            URL.revokeObjectURL(url);
        }
        catch {
            return;
        }
    };
    const clearUrls = () => {
        const st = state.current;
        if (!st)
            return;
        revokeUrl(st.objectUrl);
        st.objectUrl = null;
        for (const url of st.toRevoke)
            revokeUrl(url);
        st.toRevoke = [];
    };
    const applyPreview = (blob, st) => {
        if (st.disposed)
            return;
        const next = URL.createObjectURL(blob);
        if (st.objectUrl && st.objectUrl !== next) {
            st.toRevoke.push(st.objectUrl);
        }
        st.objectUrl = next;
        setDisplaySrc(next);
    };
    const download = (url) => {
        const st = state.current;
        if (!st)
            return;
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
        const report = (received, total) => {
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
            const type = response.headers.get("content-type") ||
                "application/octet-stream";
            const lengthHeader = response.headers.get("content-length");
            const total = lengthHeader ? Number(lengthHeader) : 0;
            const body = response.body;
            if (!body || typeof body.getReader !== "function") {
                const blob = await response.blob();
                report(blob.size, blob.size);
                if (st.disposed || controller.signal.aborted)
                    return;
                applyPreview(blob, st);
                setProgressValue(1);
                props.progress(1);
                setLoaded(true);
                return;
            }
            const reader = body.getReader();
            const chunks = [];
            let received = 0;
            let frameQueued = false;
            const flush = () => {
                frameQueued = false;
                if (st.disposed || controller.signal.aborted)
                    return;
                applyPreview(new Blob(asBlobParts(chunks), { type }), st);
            };
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
                if (!value)
                    continue;
                chunks.push(value);
                received += value.length;
                report(received, total);
                if (!frameQueued) {
                    frameQueued = true;
                    if (typeof requestAnimationFrame === "function") {
                        requestAnimationFrame(flush);
                    }
                    else {
                        flush();
                    }
                }
            }
            if (st.disposed || controller.signal.aborted)
                return;
            applyPreview(new Blob(asBlobParts(chunks), { type }), st);
            setProgressValue(1);
            props.progress(1);
            setLoaded(true);
        })
            .catch(() => {
            if (st.disposed || controller.signal.aborted)
                return;
            setFailed(true);
            setLoaded(true);
        });
    };
    const handleImageLoad = () => {
        const st = state.current;
        if (!st)
            return;
        for (const url of st.toRevoke)
            revokeUrl(url);
        st.toRevoke = [];
    };
    init(() => {
        const stop = createReactiveEffect(() => {
            const url = read(props.src) ?? "";
            untrack(() => download(url));
        });
        return () => {
            if (typeof stop === "function")
                stop();
            const st = state.current;
            if (!st)
                return;
            st.disposed = true;
            st.abort?.abort();
            st.abort = null;
            clearUrls();
            setDisplaySrc(undefined);
        };
    });
    const showSkeleton = () => Boolean(read(props.setSkeleton)) && !loaded();
    const wrapperStyle = () => {
        const width = toCssSize(read(props.width));
        const height = toCssSize(read(props.height));
        const style = {
            position: "relative",
            display: "inline-block",
            lineHeight: "0",
        };
        if (width)
            style.width = width;
        if (height)
            style.height = height;
        return style;
    };
    const imageStyle = () => {
        const width = toCssSize(read(props.width));
        const height = toCssSize(read(props.height));
        const style = {
            ...toStyleObject(read(props.style)),
        };
        if (width)
            style.width = "100%";
        if (height)
            style.height = "100%";
        if (!displaySrc())
            style.display = "none";
        return style;
    };
    const skeletonStyle = () => ({
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
    });
    return (_jsxs("div", { class: () => {
            const custom = props.className ? ` ${props.className}` : "";
            return `image-loading-chunk-progress${custom}${failed() ? " is-failed" : ""}${loaded() ? " is-loaded" : ""}`;
        }, style: wrapperStyle, "data-progress": () => progressValue(), "aria-busy": () => (!loaded() ? "true" : "false"), children: [() => showSkeleton() ? (_jsx(SkeletonLoader, { variant: "rectangular", width: read(props.width), height: read(props.height), style: skeletonStyle() })) : null, _jsx("img", { src: () => displaySrc(), alt: props.alt ?? "", style: imageStyle, onLoad: handleImageLoad, loading: "eager", decoding: "async" })] }));
};
//# sourceMappingURL=image-loading-chunk-progress.js.map