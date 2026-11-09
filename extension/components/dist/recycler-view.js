import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { cleanupEffectScope, createEffectScope, createReactiveEffect, init, ref, renderToDOM, runWithEffectScope, signal, untrack, } from "@adaptive-js/web";
const DEFAULT_OVERSCAN = 4;
const POOL_PAD = 2;
const DEFAULT_NEAR_EDGE = 120;
let recyclerInstanceSeq = 0;
function isItemValueGetter(v) {
    return typeof v === "function";
}
function isItemStyleGetter(v) {
    return typeof v === "function";
}
function isItemNode(node) {
    return (typeof node === "object" &&
        node !== null &&
        !Array.isArray(node) &&
        !(node instanceof Node) &&
        "type" in node &&
        typeof node.type === "string");
}
function applyItemNode(parent, node, _scope) {
    if (node == null)
        return;
    if (node instanceof Node) {
        parent.appendChild(node);
        return;
    }
    if (isItemNode(node)) {
        const el = document.createElement(node.type);
        const bindScalar = (write, value) => {
            if (value == null)
                return;
            if (isItemValueGetter(value)) {
                createReactiveEffect(() => {
                    write(String(value()));
                });
            }
            else {
                write(String(value));
            }
        };
        bindScalar((v) => {
            el.className = v;
        }, node.class);
        if (node.style != null) {
            const styleValue = node.style;
            if (isItemStyleGetter(styleValue)) {
                createReactiveEffect(() => {
                    const next = styleValue();
                    if (next)
                        Object.assign(el.style, next);
                });
            }
            else {
                Object.assign(el.style, styleValue);
            }
        }
        if (node.props) {
            for (const [k, v] of Object.entries(node.props)) {
                if (v == null)
                    continue;
                if (isItemValueGetter(v)) {
                    createReactiveEffect(() => {
                        const next = v();
                        if (typeof next === "boolean") {
                            if (next)
                                el.setAttribute(k, "");
                            else
                                el.removeAttribute(k);
                        }
                        else {
                            el.setAttribute(k, String(next));
                        }
                    });
                }
                else if (typeof v === "boolean") {
                    if (v)
                        el.setAttribute(k, "");
                    else
                        el.removeAttribute(k);
                }
                else {
                    el.setAttribute(k, String(v));
                }
            }
        }
        if (node.onClick) {
            el.addEventListener("click", node.onClick);
        }
        if (node.onContextMenu) {
            el.addEventListener("contextmenu", node.onContextMenu);
        }
        if (node.children?.length) {
            for (const child of node.children) {
                applyItemNode(el, child, _scope);
            }
        }
        else if (node.value != null) {
            const text = document.createTextNode("");
            el.appendChild(text);
            bindScalar((v) => {
                text.textContent = v;
            }, node.value);
        }
        parent.appendChild(el);
        return;
    }
    parent.appendChild(renderToDOM(node));
}
function itemsSignature(items, keyOf) {
    let s = String(items.length);
    for (let i = 0; i < items.length; i += 1) {
        s += "\0" + keyOf(items[i], i);
    }
    return s;
}
export function RecyclerView(props) {
    const instanceId = `rv${++recyclerInstanceSeq}`;
    let scopeSeq = 0;
    const viewportRef = ref(null);
    const spacerRef = ref(null);
    const scrollTopRef = ref(0);
    const viewportHeightRef = ref(typeof props.height === "number" ? props.height : 0);
    const layoutFrameRef = ref(0);
    const slotsRef = ref([]);
    const heightByKeyRef = ref(new Map());
    // só muda na transição vazio <-> não-vazio (nunca por count)
    const [isEmpty, setIsEmpty] = signal(false);
    const measuringRef = ref(false);
    const nearLockRef = ref(null);
    const lastItemsSigRef = ref("");
    const overscan = () => Math.max(0, props.overscan ?? DEFAULT_OVERSCAN);
    const estimatedHeight = () => Math.max(1, props.itemHeight);
    const nearThreshold = () => Math.max(0, props.nearEdgeThreshold ?? DEFAULT_NEAR_EDGE);
    const getItems = () => typeof props.items === "function" ? props.items() : props.items;
    const keyOf = (item, index) => String(props.getItemKey(item, index));
    const nextScopeName = (itemKey) => `${instanceId}:sc${++scopeSeq}:k${itemKey}`;
    const getHeightForIndex = (items, index) => {
        const item = items[index];
        if (item === undefined)
            return estimatedHeight();
        const key = keyOf(item, index);
        return heightByKeyRef.current?.get(key) ?? estimatedHeight();
    };
    const getItemTop = (items, index) => {
        let top = 0;
        for (let i = 0; i < index; i += 1) {
            top += getHeightForIndex(items, i);
        }
        return top;
    };
    const getTotalHeight = (items) => getItemTop(items, items.length);
    const getViewportHeight = () => {
        const viewport = viewportRef.current;
        const parent = viewport?.parentElement;
        if (typeof props.height === "number")
            return props.height;
        if (typeof props.height === "string" && props.height.endsWith("px")) {
            const value = Number.parseFloat(props.height);
            if (Number.isFinite(value))
                return value;
        }
        return (parent?.clientHeight ||
            viewport?.clientHeight ||
            viewportHeightRef.current ||
            0);
    };
    const poolSize = () => {
        const vh = getViewportHeight() || viewportHeightRef.current || 400;
        const visible = Math.ceil(vh / estimatedHeight()) + 1;
        return visible + overscan() * 2 + POOL_PAD;
    };
    const applySpacer = (items) => {
        const el = spacerRef.current;
        if (!el)
            return;
        const next = `${getTotalHeight(items)}px`;
        if (el.style.height !== next)
            el.style.height = next;
    };
    const hideHost = (host) => {
        host.style.visibility = "hidden";
        host.style.top = "-9999px";
    };
    const showHost = (host, topPx) => {
        host.style.visibility = "visible";
        host.style.top = `${topPx}px`;
        host.style.height = "auto";
        host.style.minHeight = `${estimatedHeight()}px`;
    };
    const repositionVisibleSlots = () => {
        const items = getItems();
        applySpacer(items);
        for (const slot of slotsRef.current ?? []) {
            if (slot.index < 0 || !slot.host)
                continue;
            showHost(slot.host, getItemTop(items, slot.index));
        }
    };
    const disconnectResize = (slot) => {
        if (slot.resizeObserver) {
            slot.resizeObserver.disconnect();
            slot.resizeObserver = null;
        }
    };
    const disposeSlotContent = (slot) => {
        disconnectResize(slot);
        if (slot.scope) {
            cleanupEffectScope(slot.scope);
            slot.scope = null;
        }
        const host = slot.host;
        if (host) {
            while (host.firstChild)
                host.removeChild(host.firstChild);
        }
    };
    const recordMeasuredHeight = (key, height) => {
        const h = Math.max(1, Math.ceil(height));
        const map = heightByKeyRef.current ?? new Map();
        heightByKeyRef.current = map;
        if (Object.is(map.get(key), h))
            return;
        measuringRef.current = true;
        map.set(key, h);
        repositionVisibleSlots();
        queueMicrotask(() => {
            measuringRef.current = false;
        });
    };
    const observeHostHeight = (slot, key) => {
        const host = slot.host;
        if (!host)
            return;
        disconnectResize(slot);
        const measure = () => {
            const h = Math.max(host.scrollHeight, host.getBoundingClientRect().height);
            if (h > 0)
                recordMeasuredHeight(key, h);
        };
        requestAnimationFrame(measure);
        const ro = new ResizeObserver(() => {
            measure();
        });
        ro.observe(host);
        slot.resizeObserver = ro;
    };
    const pruneHeights = (items) => {
        const map = heightByKeyRef.current;
        if (!map || map.size === 0)
            return;
        const live = new Set(items.map((item, index) => keyOf(item, index)));
        for (const key of Array.from(map.keys())) {
            if (!live.has(key))
                map.delete(key);
        }
    };
    const bindSlotImpl = (slot, index, key) => {
        slot.index = index;
        slot.key = key;
        const host = slot.host;
        if (!host)
            return;
        const items = getItems();
        const row = items[index];
        if (row === undefined) {
            disposeSlotContent(slot);
            slot.index = -1;
            slot.key = "";
            hideHost(host);
            return;
        }
        disposeSlotContent(slot);
        const scope = createEffectScope(nextScopeName(key));
        slot.scope = scope;
        showHost(host, getItemTop(items, index));
        runWithEffectScope(scope, () => {
            const tree = props.item(row, index);
            applyItemNode(host, tree, scope);
        });
        observeHostHeight(slot, key);
    };
    // Tudo que o bind lê (getItems, props.item -> campos do conv) NUNCA pode ser
    // rastreado por quem chamou (init, efeito de items, ref callback).
    const bindSlot = (slot, index, key) => untrack(() => bindSlotImpl(slot, index, key));
    const clearSlot = (slot) => {
        disposeSlotContent(slot);
        slot.index = -1;
        slot.key = "";
        if (slot.host)
            hideHost(slot.host);
    };
    const handleSlotClick = (slotId, event) => {
        const slot = slotsRef.current?.[slotId];
        if (!slot || slot.index < 0)
            return;
        const row = getItems()[slot.index];
        if (row === undefined)
            return;
        props.onItemClick?.(row, slot.index, event);
    };
    const createHost = (slotId) => {
        const host = document.createElement("div");
        host.style.cssText =
            "position:absolute;left:0;right:0;height:auto;box-sizing:border-box;overflow:visible;";
        host.style.minHeight = `${estimatedHeight()}px`;
        host.addEventListener("click", (e) => handleSlotClick(slotId, e));
        return host;
    };
    // Casca estática: o pool cresce imperativamente (sem re-render do JSX),
    // para nunca recriar os hosts/spacer já existentes.
    const ensureSlotCount = (n) => {
        const slots = slotsRef.current ?? [];
        const spacer = spacerRef.current;
        while (slots.length < n) {
            const slot = {
                host: null,
                index: -1,
                key: "",
                scope: null,
                resizeObserver: null,
            };
            slots.push(slot);
            if (spacer) {
                const host = createHost(slots.length - 1);
                slot.host = host;
                hideHost(host);
                spacer.appendChild(host);
            }
        }
        slotsRef.current = slots;
    };
    const registerHost = (slotId) => (el) => {
        const slots = slotsRef.current ?? [];
        let slot = slots[slotId];
        if (!slot) {
            ensureSlotCount(slotId + 1);
            slot = slotsRef.current[slotId];
        }
        if (!slot)
            return;
        if (!el) {
            disposeSlotContent(slot);
            slot.host = null;
            return;
        }
        slot.host = el;
        if (slot.index < 0)
            hideHost(el);
        // sem bindSlot aqui: o bind é feito por reassignSlots, fora de qualquer
        // efeito reativo (evita vazar tracking de props.item para a casca).
    };
    const indexFromScroll = (scrollTop, items) => {
        if (items.length === 0)
            return 0;
        let y = 0;
        for (let i = 0; i < items.length; i += 1) {
            const next = y + getHeightForIndex(items, i);
            if (next > scrollTop)
                return i;
            y = next;
        }
        return Math.max(0, items.length - 1);
    };
    const reassignSlotsImpl = (force = false) => {
        if (measuringRef.current && !force) {
            repositionVisibleSlots();
            return;
        }
        const items = getItems();
        const count = items.length;
        setIsEmpty(count === 0);
        const vh = getViewportHeight();
        if (vh > 0)
            viewportHeightRef.current = vh;
        if (force)
            pruneHeights(items);
        const n = poolSize();
        ensureSlotCount(n);
        const slots = slotsRef.current ?? [];
        applySpacer(items);
        if (count === 0) {
            for (let s = 0; s < slots.length; s += 1)
                clearSlot(slots[s]);
            return;
        }
        const scrollTop = scrollTopRef.current ?? 0;
        const firstVisible = indexFromScroll(scrollTop, items);
        const firstIndex = Math.max(0, firstVisible - overscan());
        // Reciclagem de verdade (como o RecyclerView do Android): o índice i
        // sempre cai no MESMO slot (i % n). Quando a janela anda 1 item, só 1
        // slot troca de conteúdo; os demais mantêm DOM, scope e imagens.
        // (Antes: slot s <- firstIndex + s, então qualquer deslocamento da
        // janela por 1 rebindava o pool inteiro.)
        const lastIndex = Math.min(count, firstIndex + n);
        const claimed = new Set();
        for (let index = firstIndex; index < lastIndex; index += 1) {
            const slotId = index % n;
            const slot = slots[slotId];
            claimed.add(slotId);
            const key = keyOf(items[index], index);
            if (slot.index === index && slot.key === key && slot.host && slot.scope) {
                showHost(slot.host, getItemTop(items, index));
                continue;
            }
            slot.index = index;
            slot.key = key;
            if (slot.host) {
                bindSlot(slot, index, key);
            }
        }
        // slots sem índice na janela (fim da lista / pool maior que o necessário)
        for (let s = 0; s < slots.length; s += 1) {
            if (claimed.has(s))
                continue;
            const slot = slots[s];
            if (slot.index !== -1)
                clearSlot(slot);
        }
    };
    const reassignSlots = (force = false) => untrack(() => reassignSlotsImpl(force));
    const scheduleLayout = () => {
        if (layoutFrameRef.current)
            return;
        layoutFrameRef.current = requestAnimationFrame(() => {
            layoutFrameRef.current = 0;
            reassignSlots(false);
        });
    };
    const checkNearEdge = () => {
        const viewport = viewportRef.current;
        const handler = props.onNearEdge;
        if (!viewport || !handler)
            return;
        const threshold = nearThreshold();
        const top = viewport.scrollTop;
        const maxScroll = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
        const bottomDistance = maxScroll - top;
        if (top <= threshold) {
            if (nearLockRef.current !== "start") {
                nearLockRef.current = "start";
                handler({ edge: "start", scrollTop: top, distance: top });
            }
        }
        else if (bottomDistance <= threshold) {
            if (nearLockRef.current !== "end") {
                nearLockRef.current = "end";
                handler({
                    edge: "end",
                    scrollTop: top,
                    distance: bottomDistance,
                });
            }
        }
        else {
            nearLockRef.current = null;
        }
    };
    const preserveScrollAround = async (mutate) => {
        const viewport = viewportRef.current;
        if (!viewport) {
            await mutate();
            lastItemsSigRef.current = itemsSignature(getItems(), keyOf);
            reassignSlots(true);
            return;
        }
        const beforeHeight = viewport.scrollHeight;
        const beforeTop = viewport.scrollTop;
        await mutate();
        lastItemsSigRef.current = itemsSignature(getItems(), keyOf);
        reassignSlots(true);
        await new Promise((r) => requestAnimationFrame(() => r()));
        await new Promise((r) => requestAnimationFrame(() => r()));
        const delta = viewport.scrollHeight - beforeHeight;
        if (delta !== 0) {
            viewport.scrollTop = beforeTop + delta;
            scrollTopRef.current = viewport.scrollTop;
            reassignSlots(false);
        }
    };
    // ── ciclo de vida: init + cleanup ─────────────────────────────
    init(() => {
        const viewport = viewportRef.current;
        // 1º bind após hydrate / mount (refs prontos)
        reassignSlots(true);
        untrack(() => {
            lastItemsSigRef.current = itemsSignature(getItems(), keyOf);
        });
        const raf1 = requestAnimationFrame(() => {
            reassignSlots(false);
        });
        props.onReady?.({
            preserveScrollAround,
            getViewport: () => viewportRef.current,
            scrollToOffset: (top) => {
                const vp = viewportRef.current;
                if (!vp)
                    return;
                vp.scrollTop = top;
                scrollTopRef.current = top;
                reassignSlots(false);
            },
        });
        if (!viewport) {
            return () => {
                cancelAnimationFrame(raf1);
                for (const slot of slotsRef.current ?? [])
                    disposeSlotContent(slot);
            };
        }
        let resizeFrame = 0;
        const onScroll = () => {
            scrollTopRef.current = viewport.scrollTop;
            scheduleLayout();
            checkNearEdge();
        };
        const onViewportResize = () => {
            if (measuringRef.current)
                return;
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => {
                const next = getViewportHeight();
                if (next > 0)
                    viewportHeightRef.current = next;
                reassignSlots(false);
            });
        };
        const resizeObserver = new ResizeObserver(onViewportResize);
        resizeObserver.observe(viewport);
        if (viewport.parentElement) {
            resizeObserver.observe(viewport.parentElement);
        }
        viewport.addEventListener("scroll", onScroll, { passive: true });
        // items: effect reativo DENTRO do init — só rebind se keys mudarem
        const stopItems = createReactiveEffect(() => {
            const items = getItems();
            const sig = itemsSignature(items, keyOf);
            if (sig === lastItemsSigRef.current) {
                // mesma lista (ex.: só selected mudou) → não rebind
                return;
            }
            lastItemsSigRef.current = sig;
            // adiado: props.item()/getItems() não podem ser rastreados por este efeito
            queueMicrotask(() => reassignSlots(true));
        });
        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(resizeFrame);
            cancelAnimationFrame(layoutFrameRef.current ?? 0);
            layoutFrameRef.current = 0;
            resizeObserver.disconnect();
            viewport.removeEventListener("scroll", onScroll);
            if (typeof stopItems === "function")
                stopItems();
            for (const slot of slotsRef.current ?? [])
                disposeSlotContent(slot);
        };
    });
    // casca estável (hydrate): N hosts sem ler getItems() no trunk
    const initialN = Math.max(Math.ceil(400 / Math.max(1, props.itemHeight)) +
        (props.overscan ?? DEFAULT_OVERSCAN) * 2 +
        POOL_PAD, 1);
    ensureSlotCount(initialN);
    return (_jsx("div", { className: () => (props.className ? props.className : ""), style: resolveContainerStyle(props.height, props.width, {
            overflow: "hidden",
        }), "data-recycler-instance": instanceId, children: _jsxs("div", { ref: viewportRef, style: {
                position: "absolute",
                inset: "0",
                overflowY: "auto",
                overflowX: "hidden",
            }, children: [_jsx("div", { ref: spacerRef, style: {
                        position: "relative",
                        width: "100%",
                        minHeight: "1px",
                    }, children: Array.from({ length: initialN }, (_, slotId) => (_jsx("div", { ref: registerHost(slotId), style: {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            height: "auto",
                            willChange: "transform",
                            minHeight: `${estimatedHeight()}px`,
                            boxSizing: "border-box",
                            overflow: "visible",
                        }, onClick: (event) => handleSlotClick(slotId, event) }, `${instanceId}-slot-${slotId}`))) }), _jsx("div", { style: { display: () => (isEmpty() ? "" : "none") }, children: props.emptyState ?? null })] }) }));
}
function normalizeCssSize(value) {
    if (value == null)
        return "100%";
    return typeof value === "number" ? `${value}px` : value;
}
function resolveContainerStyle(height, width, extra) {
    return {
        position: "relative",
        height: normalizeCssSize(height),
        width: normalizeCssSize(width),
        ...extra,
    };
}
//# sourceMappingURL=recycler-view.js.map