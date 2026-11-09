import { _ as jsx, a as signal, c as cleanupEffectScope, i as ref, l as createEffectScope, m as runWithEffectScope, p as layoutEvents, u as createReactiveEffect } from "./chunk-i_LCywE4.js";

//#region ../../extension/components/dist/recycler-view.js
const DEFAULT_OVERSCAN = 4;
const POOL_PAD = 2;
function isItemValueGetter(v) {
	return typeof v === "function";
}
function isItemStyleGetter(v) {
	return typeof v === "function";
}
function applyItemNode(parent, node, _scope) {
	const el = document.createElement(node.type);
	const bindScalar = (write, value) => {
		if (value == null) return;
		if (isItemValueGetter(value)) createReactiveEffect(() => {
			write(String(value()));
		});
		else write(String(value));
	};
	bindScalar((v) => {
		el.className = v;
	}, node.class);
	if (node.style != null) {
		const styleValue = node.style;
		if (isItemStyleGetter(styleValue)) createReactiveEffect(() => {
			const next = styleValue();
			if (next) Object.assign(el.style, next);
		});
		else Object.assign(el.style, styleValue);
	}
	if (node.props) for (const [k, v] of Object.entries(node.props)) {
		if (v == null) continue;
		if (isItemValueGetter(v)) createReactiveEffect(() => {
			const next = v();
			if (typeof next === "boolean") {
				if (next) el.setAttribute(k, "");
				else el.removeAttribute(k);
			} else el.setAttribute(k, String(next));
		});
		else if (typeof v === "boolean") {
			if (v) el.setAttribute(k, "");
			else el.removeAttribute(k);
		} else el.setAttribute(k, String(v));
	}
	if (node.onClick) el.addEventListener("click", node.onClick);
	if (node.onContextMenu) el.addEventListener("contextmenu", node.onContextMenu);
	if (node.children?.length) for (const child of node.children) applyItemNode(el, child, _scope);
	else if (node.value != null) {
		const text = document.createTextNode("");
		el.appendChild(text);
		bindScalar((v) => {
			text.textContent = v;
		}, node.value);
	}
	parent.appendChild(el);
	return el;
}
function RecyclerView(props) {
	const viewportRef = ref(null);
	const spacerRef = ref(null);
	const scrollTopRef = ref(0);
	const viewportHeightRef = ref(typeof props.height === "number" ? props.height : 0);
	const layoutFrameRef = ref(0);
	const slotsRef = ref([]);
	const [poolVersion, bumpPool] = signal(0);
	/** evita reassign em loop no microtask */
	const pendingFlushRef = ref(false);
	const overscan = () => Math.max(0, props.overscan ?? DEFAULT_OVERSCAN);
	const rowHeight = () => Math.max(1, props.itemHeight);
	const getItems = () => typeof props.items === "function" ? props.items() : props.items;
	const keyOf = (item, index) => String(props.getItemKey(item, index));
	const getViewportHeight = () => {
		const viewport = viewportRef.current;
		const parent = viewport?.parentElement;
		if (typeof props.height === "number") return props.height;
		if (typeof props.height === "string" && props.height.endsWith("px")) {
			const value = Number.parseFloat(props.height);
			if (Number.isFinite(value)) return value;
		}
		return parent?.clientHeight || viewport?.clientHeight || viewportHeightRef.current || 0;
	};
	const poolSize = () => {
		const vh = getViewportHeight() || viewportHeightRef.current || 400;
		return Math.ceil(vh / rowHeight()) + 1 + overscan() * 2 + POOL_PAD;
	};
	const totalHeight = (count) => count * rowHeight();
	const applySpacer = (count) => {
		const el = spacerRef.current;
		if (!el) return;
		el.style.height = `${totalHeight(count)}px`;
	};
	const disposeSlotContent = (slot) => {
		if (slot.scope) {
			cleanupEffectScope(slot.scope);
			slot.scope = null;
		}
		const host = slot.host;
		if (host) while (host.firstChild) host.removeChild(host.firstChild);
	};
	/**
	* Sempre grava index/key. Se host ainda não existe, fica pendente —
	* registerHost completa o bind quando o ref chega.
	*/
	const bindSlot = (slot, index, key) => {
		slot.index = index;
		slot.key = key;
		const host = slot.host;
		if (!host) return;
		const row = getItems()[index];
		if (row === void 0) {
			disposeSlotContent(slot);
			slot.index = -1;
			slot.key = "";
			host.style.visibility = "hidden";
			host.style.top = "-9999px";
			return;
		}
		disposeSlotContent(slot);
		const scope = createEffectScope("recycler-slot");
		slot.scope = scope;
		const h = rowHeight();
		host.style.visibility = "visible";
		host.style.top = `${index * h}px`;
		host.style.height = `${h}px`;
		runWithEffectScope(scope, () => {
			const tree = props.item(row, index);
			applyItemNode(host, tree, scope);
		});
	};
	const clearSlot = (slot) => {
		disposeSlotContent(slot);
		slot.index = -1;
		slot.key = "";
		if (slot.host) {
			slot.host.style.visibility = "hidden";
			slot.host.style.top = "-9999px";
		}
	};
	const ensureSlotCount = (n) => {
		const slots = slotsRef.current ?? [];
		let grew = false;
		while (slots.length < n) {
			slots.push({
				host: null,
				index: -1,
				key: "",
				scope: null
			});
			grew = true;
		}
		slotsRef.current = slots;
		if (grew) bumpPool((v) => v + 1);
	};
	const registerHost = (slotId) => (el) => {
		let slot = (slotsRef.current ?? [])[slotId];
		if (!slot) {
			ensureSlotCount(slotId + 1);
			slot = slotsRef.current[slotId];
		}
		if (!slot) return;
		if (!el) {
			disposeSlotContent(slot);
			slot.host = null;
			return;
		}
		slot.host = el;
		if (slot.index >= 0) bindSlot(slot, slot.index, slot.key || String(slot.index));
	};
	const indexFromScroll = (scrollTop, count) => {
		if (count <= 0) return 0;
		return Math.max(0, Math.min(count - 1, Math.floor(scrollTop / rowHeight())));
	};
	const reassignSlots = (force = false) => {
		const items = getItems();
		const count = items.length;
		const vh = getViewportHeight();
		if (vh > 0) viewportHeightRef.current = vh;
		const n = poolSize();
		ensureSlotCount(n);
		const slots = slotsRef.current ?? [];
		applySpacer(count);
		if (count === 0) {
			for (let s = 0; s < slots.length; s += 1) clearSlot(slots[s]);
			return;
		}
		const scrollTop = scrollTopRef.current ?? 0;
		const firstVisible = indexFromScroll(scrollTop, count);
		const firstIndex = Math.max(0, firstVisible - overscan());
		for (let s = 0; s < n; s += 1) {
			const slot = slots[s];
			const index = firstIndex + s < count ? firstIndex + s : -1;
			if (index < 0) {
				if (slot.index !== -1 || force) clearSlot(slot);
				continue;
			}
			const key = keyOf(items[index], index);
			if (!force && slot.index === index && slot.key === key && slot.host && slot.scope) {
				const h = rowHeight();
				slot.host.style.top = `${index * h}px`;
				continue;
			}
			bindSlot(slot, index, key);
		}
	};
	const scheduleLayout = () => {
		if (layoutFrameRef.current) return;
		layoutFrameRef.current = requestAnimationFrame(() => {
			layoutFrameRef.current = 0;
			reassignSlots(false);
		});
	};
	/** Após o pool montar refs no DOM */
	const scheduleFlush = () => {
		if (pendingFlushRef.current) return;
		pendingFlushRef.current = true;
		queueMicrotask(() => {
			pendingFlushRef.current = false;
			reassignSlots(true);
		});
	};
	layoutEvents(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		let frame = 0;
		const syncViewportHeight = () => {
			const next = getViewportHeight();
			if (next > 0) viewportHeightRef.current = next;
			reassignSlots(true);
		};
		requestAnimationFrame(() => {
			syncViewportHeight();
		});
		const resizeObserver = new ResizeObserver(() => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(syncViewportHeight);
		});
		const onScroll = () => {
			scrollTopRef.current = viewport.scrollTop;
			scheduleLayout();
		};
		resizeObserver.observe(viewport);
		if (viewport.parentElement) resizeObserver.observe(viewport.parentElement);
		viewport.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			cancelAnimationFrame(layoutFrameRef.current ?? 0);
			layoutFrameRef.current = 0;
			resizeObserver.disconnect();
			viewport.removeEventListener("scroll", onScroll);
			for (const slot of slotsRef.current ?? []) disposeSlotContent(slot);
		};
	}, [
		props.height,
		props.width,
		props.itemHeight
	]);
	layoutEvents(() => {
		getItems();
		scheduleFlush();
	}, []);
	return jsx("div", {
		className: () => props.className ? props.className : "",
		style: resolveContainerStyle(props.height, props.width, { overflow: "hidden" }),
		children: jsx("div", {
			ref: viewportRef,
			style: {
				position: "absolute",
				inset: "0",
				overflowY: "auto",
				overflowX: "hidden"
			},
			children: () => {
				poolVersion();
				const items = getItems();
				if (items.length === 0) return props.emptyState ?? null;
				const n = Math.max(poolSize(), slotsRef.current?.length ?? 0, 1);
				ensureSlotCount(n);
				const h = rowHeight();
				const total = totalHeight(items.length);
				scheduleFlush();
				return jsx("div", {
					ref: spacerRef,
					style: {
						position: "relative",
						height: `${total}px`,
						width: "100%"
					},
					children: Array.from({ length: n }, (_, slotId) => jsx("div", {
						ref: registerHost(slotId),
						style: {
							position: "absolute",
							left: 0,
							right: 0,
							height: `${h}px`,
							boxSizing: "border-box",
							top: "-9999px",
							visibility: "hidden",
							overflow: "hidden"
						},
						onClick: (event) => {
							const slot = slotsRef.current?.[slotId];
							if (!slot || slot.index < 0) return;
							const row = getItems()[slot.index];
							if (row === void 0) return;
							props.onItemClick?.(row, slot.index, event);
						}
					}, `slot-${slotId}`))
				});
			}
		})
	});
}
function normalizeCssSize(value) {
	if (value == null) return "100%";
	return typeof value === "number" ? `${value}px` : value;
}
function resolveContainerStyle(height, width, extra) {
	return {
		position: "relative",
		height: normalizeCssSize(height),
		width: normalizeCssSize(width),
		...extra
	};
}

//#endregion
//#region ../../extension/components/dist/reveal.js
function createMarker(type) {
	const Marker = (props) => {
		return props.children ?? null;
	};
	Marker._revealType = type;
	return Marker;
}
const If = createMarker("if");
const Else = createMarker("else");
function extractBranches(children, fallback) {
	let ifBranch = null;
	let elseBranch = fallback ?? null;
	if (children == null) return {
		ifBranch,
		elseBranch
	};
	const list = Array.isArray(children) ? children.flat(Infinity) : [children];
	let hasMarker = false;
	for (const child of list) {
		if (child == null || child === false || child === true) continue;
		const t = (child?.tag)?._revealType;
		if (t === "if") {
			hasMarker = true;
			ifBranch = child.props?.children ?? child.children ?? null;
		} else if (t === "else") {
			hasMarker = true;
			elseBranch = child.props?.children ?? child.children ?? null;
		}
	}
	if (!hasMarker) ifBranch = children;
	return {
		ifBranch,
		elseBranch
	};
}
function withBranchKey(node, key) {
	if (node == null || node === false || node === true) return node;
	if (Array.isArray(node)) {
		const list = node.flat(Infinity).filter((v) => v != null && v !== false && v !== true);
		if (list.length === 1) return withBranchKey(list[0], key);
		return list.map((v, i) => withBranchKey(v, `${key}-${i}`));
	}
	if (typeof node === "object" && node.tag != null) return {
		...node,
		props: {
			...node.props ?? {},
			key
		}
	};
	return {
		tag: "Fragment",
		props: { key },
		children: [node]
	};
}
function RevealFn(props) {
	return (() => {
		const raw = props.when;
		const show = typeof raw === "function" ? raw() : !!raw;
		const { ifBranch, elseBranch } = extractBranches(props.children, props.fallback);
		return show ? withBranchKey(ifBranch ?? null, "on") : withBranchKey(elseBranch ?? null, "off");
	});
}
const Reveal = RevealFn;
Reveal.If = If;
Reveal.Else = Else;

//#endregion
export { RecyclerView as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstQkExeEh4WFMuanMiLCJuYW1lcyI6WyJfanN4Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZW5zaW9uL2NvbXBvbmVudHMvZGlzdC9yZWN5Y2xlci12aWV3LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZW5zaW9uL2NvbXBvbmVudHMvZGlzdC9yZXZlYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYi9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgY2xlYW51cEVmZmVjdFNjb3BlLCBjcmVhdGVFZmZlY3RTY29wZSwgY3JlYXRlUmVhY3RpdmVFZmZlY3QsIGxheW91dEV2ZW50cywgcmVmLCBydW5XaXRoRWZmZWN0U2NvcGUsIHNpZ25hbCwgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuY29uc3QgREVGQVVMVF9PVkVSU0NBTiA9IDQ7XG5jb25zdCBQT09MX1BBRCA9IDI7XG5mdW5jdGlvbiBpc0l0ZW1WYWx1ZUdldHRlcih2KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XG59XG5mdW5jdGlvbiBpc0l0ZW1TdHlsZUdldHRlcih2KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XG59XG5mdW5jdGlvbiBhcHBseUl0ZW1Ob2RlKHBhcmVudCwgbm9kZSwgX3Njb3BlKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUudHlwZSk7XG4gICAgY29uc3QgYmluZFNjYWxhciA9ICh3cml0ZSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChpc0l0ZW1WYWx1ZUdldHRlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNyZWF0ZVJlYWN0aXZlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3cml0ZShTdHJpbmcodmFsdWUoKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3cml0ZShTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYmluZFNjYWxhcigodikgPT4ge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSB2O1xuICAgIH0sIG5vZGUuY2xhc3MpO1xuICAgIGlmIChub2RlLnN0eWxlICE9IG51bGwpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IG5vZGUuc3R5bGU7XG4gICAgICAgIGlmIChpc0l0ZW1TdHlsZUdldHRlcihzdHlsZVZhbHVlKSkge1xuICAgICAgICAgICAgY3JlYXRlUmVhY3RpdmVFZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSBzdHlsZVZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWwuc3R5bGUsIG5leHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVsLnN0eWxlLCBzdHlsZVZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobm9kZS5wcm9wcykge1xuICAgICAgICBmb3IgKGNvbnN0IFtrLCB2XSBvZiBPYmplY3QuZW50cmllcyhub2RlLnByb3BzKSkge1xuICAgICAgICAgICAgaWYgKHYgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChpc0l0ZW1WYWx1ZUdldHRlcih2KSkge1xuICAgICAgICAgICAgICAgIGNyZWF0ZVJlYWN0aXZlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dCA9IHYoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXh0ID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGssIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShrLCBTdHJpbmcobmV4dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdiA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodilcbiAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGssIFwiXCIpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGssIFN0cmluZyh2KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5vZGUub25DbGljaykge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbm9kZS5vbkNsaWNrKTtcbiAgICB9XG4gICAgaWYgKG5vZGUub25Db250ZXh0TWVudSkge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgbm9kZS5vbkNvbnRleHRNZW51KTtcbiAgICB9XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4/Lmxlbmd0aCkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGFwcGx5SXRlbU5vZGUoZWwsIGNoaWxkLCBfc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICBiaW5kU2NhbGFyKCh2KSA9PiB7XG4gICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gdjtcbiAgICAgICAgfSwgbm9kZS52YWx1ZSk7XG4gICAgfVxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG4gICAgcmV0dXJuIGVsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFJlY3ljbGVyVmlldyhwcm9wcykge1xuICAgIGNvbnN0IHZpZXdwb3J0UmVmID0gcmVmKG51bGwpO1xuICAgIGNvbnN0IHNwYWNlclJlZiA9IHJlZihudWxsKTtcbiAgICBjb25zdCBzY3JvbGxUb3BSZWYgPSByZWYoMCk7XG4gICAgY29uc3Qgdmlld3BvcnRIZWlnaHRSZWYgPSByZWYodHlwZW9mIHByb3BzLmhlaWdodCA9PT0gXCJudW1iZXJcIiA/IHByb3BzLmhlaWdodCA6IDApO1xuICAgIGNvbnN0IGxheW91dEZyYW1lUmVmID0gcmVmKDApO1xuICAgIGNvbnN0IHNsb3RzUmVmID0gcmVmKFtdKTtcbiAgICBjb25zdCBbcG9vbFZlcnNpb24sIGJ1bXBQb29sXSA9IHNpZ25hbCgwKTtcbiAgICAvKiogZXZpdGEgcmVhc3NpZ24gZW0gbG9vcCBubyBtaWNyb3Rhc2sgKi9cbiAgICBjb25zdCBwZW5kaW5nRmx1c2hSZWYgPSByZWYoZmFsc2UpO1xuICAgIGNvbnN0IG92ZXJzY2FuID0gKCkgPT4gTWF0aC5tYXgoMCwgcHJvcHMub3ZlcnNjYW4gPz8gREVGQVVMVF9PVkVSU0NBTik7XG4gICAgY29uc3Qgcm93SGVpZ2h0ID0gKCkgPT4gTWF0aC5tYXgoMSwgcHJvcHMuaXRlbUhlaWdodCk7XG4gICAgY29uc3QgZ2V0SXRlbXMgPSAoKSA9PiB0eXBlb2YgcHJvcHMuaXRlbXMgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BzLml0ZW1zKCkgOiBwcm9wcy5pdGVtcztcbiAgICBjb25zdCBrZXlPZiA9IChpdGVtLCBpbmRleCkgPT4gU3RyaW5nKHByb3BzLmdldEl0ZW1LZXkoaXRlbSwgaW5kZXgpKTtcbiAgICBjb25zdCBnZXRWaWV3cG9ydEhlaWdodCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgdmlld3BvcnQgPSB2aWV3cG9ydFJlZi5jdXJyZW50O1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB2aWV3cG9ydD8ucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wcy5oZWlnaHQgPT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuaGVpZ2h0O1xuICAgICAgICBpZiAodHlwZW9mIHByb3BzLmhlaWdodCA9PT0gXCJzdHJpbmdcIiAmJiBwcm9wcy5oZWlnaHQuZW5kc1dpdGgoXCJweFwiKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBOdW1iZXIucGFyc2VGbG9hdChwcm9wcy5oZWlnaHQpO1xuICAgICAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAocGFyZW50Py5jbGllbnRIZWlnaHQgfHxcbiAgICAgICAgICAgIHZpZXdwb3J0Py5jbGllbnRIZWlnaHQgfHxcbiAgICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0UmVmLmN1cnJlbnQgfHxcbiAgICAgICAgICAgIDApO1xuICAgIH07XG4gICAgY29uc3QgcG9vbFNpemUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZoID0gZ2V0Vmlld3BvcnRIZWlnaHQoKSB8fCB2aWV3cG9ydEhlaWdodFJlZi5jdXJyZW50IHx8IDQwMDtcbiAgICAgICAgY29uc3QgdmlzaWJsZSA9IE1hdGguY2VpbCh2aCAvIHJvd0hlaWdodCgpKSArIDE7XG4gICAgICAgIHJldHVybiB2aXNpYmxlICsgb3ZlcnNjYW4oKSAqIDIgKyBQT09MX1BBRDtcbiAgICB9O1xuICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gKGNvdW50KSA9PiBjb3VudCAqIHJvd0hlaWdodCgpO1xuICAgIGNvbnN0IGFwcGx5U3BhY2VyID0gKGNvdW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gc3BhY2VyUmVmLmN1cnJlbnQ7XG4gICAgICAgIGlmICghZWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3RvdGFsSGVpZ2h0KGNvdW50KX1weGA7XG4gICAgfTtcbiAgICBjb25zdCBkaXNwb3NlU2xvdENvbnRlbnQgPSAoc2xvdCkgPT4ge1xuICAgICAgICBpZiAoc2xvdC5zY29wZSkge1xuICAgICAgICAgICAgY2xlYW51cEVmZmVjdFNjb3BlKHNsb3Quc2NvcGUpO1xuICAgICAgICAgICAgc2xvdC5zY29wZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaG9zdCA9IHNsb3QuaG9zdDtcbiAgICAgICAgaWYgKGhvc3QpIHtcbiAgICAgICAgICAgIHdoaWxlIChob3N0LmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICAgICAgaG9zdC5yZW1vdmVDaGlsZChob3N0LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZW1wcmUgZ3JhdmEgaW5kZXgva2V5LiBTZSBob3N0IGFpbmRhIG7Do28gZXhpc3RlLCBmaWNhIHBlbmRlbnRlIOKAlFxuICAgICAqIHJlZ2lzdGVySG9zdCBjb21wbGV0YSBvIGJpbmQgcXVhbmRvIG8gcmVmIGNoZWdhLlxuICAgICAqL1xuICAgIGNvbnN0IGJpbmRTbG90ID0gKHNsb3QsIGluZGV4LCBrZXkpID0+IHtcbiAgICAgICAgc2xvdC5pbmRleCA9IGluZGV4O1xuICAgICAgICBzbG90LmtleSA9IGtleTtcbiAgICAgICAgY29uc3QgaG9zdCA9IHNsb3QuaG9zdDtcbiAgICAgICAgaWYgKCFob3N0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBpdGVtcyA9IGdldEl0ZW1zKCk7XG4gICAgICAgIGNvbnN0IHJvdyA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgaWYgKHJvdyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkaXNwb3NlU2xvdENvbnRlbnQoc2xvdCk7XG4gICAgICAgICAgICBzbG90LmluZGV4ID0gLTE7XG4gICAgICAgICAgICBzbG90LmtleSA9IFwiXCI7XG4gICAgICAgICAgICBob3N0LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgaG9zdC5zdHlsZS50b3AgPSBcIi05OTk5cHhcIjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkaXNwb3NlU2xvdENvbnRlbnQoc2xvdCk7XG4gICAgICAgIGNvbnN0IHNjb3BlID0gY3JlYXRlRWZmZWN0U2NvcGUoXCJyZWN5Y2xlci1zbG90XCIpO1xuICAgICAgICBzbG90LnNjb3BlID0gc2NvcGU7XG4gICAgICAgIGNvbnN0IGggPSByb3dIZWlnaHQoKTtcbiAgICAgICAgaG9zdC5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gICAgICAgIGhvc3Quc3R5bGUudG9wID0gYCR7aW5kZXggKiBofXB4YDtcbiAgICAgICAgaG9zdC5zdHlsZS5oZWlnaHQgPSBgJHtofXB4YDtcbiAgICAgICAgcnVuV2l0aEVmZmVjdFNjb3BlKHNjb3BlLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmVlID0gcHJvcHMuaXRlbShyb3csIGluZGV4KTtcbiAgICAgICAgICAgIGFwcGx5SXRlbU5vZGUoaG9zdCwgdHJlZSwgc2NvcGUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGNsZWFyU2xvdCA9IChzbG90KSA9PiB7XG4gICAgICAgIGRpc3Bvc2VTbG90Q29udGVudChzbG90KTtcbiAgICAgICAgc2xvdC5pbmRleCA9IC0xO1xuICAgICAgICBzbG90LmtleSA9IFwiXCI7XG4gICAgICAgIGlmIChzbG90Lmhvc3QpIHtcbiAgICAgICAgICAgIHNsb3QuaG9zdC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIHNsb3QuaG9zdC5zdHlsZS50b3AgPSBcIi05OTk5cHhcIjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZW5zdXJlU2xvdENvdW50ID0gKG4pID0+IHtcbiAgICAgICAgY29uc3Qgc2xvdHMgPSBzbG90c1JlZi5jdXJyZW50ID8/IFtdO1xuICAgICAgICBsZXQgZ3JldyA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoc2xvdHMubGVuZ3RoIDwgbikge1xuICAgICAgICAgICAgc2xvdHMucHVzaCh7IGhvc3Q6IG51bGwsIGluZGV4OiAtMSwga2V5OiBcIlwiLCBzY29wZTogbnVsbCB9KTtcbiAgICAgICAgICAgIGdyZXcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHNsb3RzUmVmLmN1cnJlbnQgPSBzbG90cztcbiAgICAgICAgaWYgKGdyZXcpXG4gICAgICAgICAgICBidW1wUG9vbCgodikgPT4gdiArIDEpO1xuICAgIH07XG4gICAgY29uc3QgcmVnaXN0ZXJIb3N0ID0gKHNsb3RJZCkgPT4gKGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IHNsb3RzID0gc2xvdHNSZWYuY3VycmVudCA/PyBbXTtcbiAgICAgICAgbGV0IHNsb3QgPSBzbG90c1tzbG90SWRdO1xuICAgICAgICAvLyBQb29sIHBvZGUgdGVyIGNyZXNjaWRvIG5vIG1lc21vIHRpY2s6IGdhcmFudGUgZW50cmFkYVxuICAgICAgICBpZiAoIXNsb3QpIHtcbiAgICAgICAgICAgIGVuc3VyZVNsb3RDb3VudChzbG90SWQgKyAxKTtcbiAgICAgICAgICAgIHNsb3QgPSBzbG90c1JlZi5jdXJyZW50W3Nsb3RJZF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzbG90KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICBkaXNwb3NlU2xvdENvbnRlbnQoc2xvdCk7XG4gICAgICAgICAgICBzbG90Lmhvc3QgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNsb3QuaG9zdCA9IGVsO1xuICAgICAgICAvLyBBdHJpYnVpw6fDo28gcGVuZGVudGUgKHJlYXNzaWduIGNvcnJldSBhbnRlcyBkb3MgcmVmcylcbiAgICAgICAgaWYgKHNsb3QuaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgYmluZFNsb3Qoc2xvdCwgc2xvdC5pbmRleCwgc2xvdC5rZXkgfHwgU3RyaW5nKHNsb3QuaW5kZXgpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaW5kZXhGcm9tU2Nyb2xsID0gKHNjcm9sbFRvcCwgY291bnQpID0+IHtcbiAgICAgICAgaWYgKGNvdW50IDw9IDApXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGNvdW50IC0gMSwgTWF0aC5mbG9vcihzY3JvbGxUb3AgLyByb3dIZWlnaHQoKSkpKTtcbiAgICB9O1xuICAgIGNvbnN0IHJlYXNzaWduU2xvdHMgPSAoZm9yY2UgPSBmYWxzZSkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtcyA9IGdldEl0ZW1zKCk7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gaXRlbXMubGVuZ3RoO1xuICAgICAgICBjb25zdCB2aCA9IGdldFZpZXdwb3J0SGVpZ2h0KCk7XG4gICAgICAgIGlmICh2aCA+IDApXG4gICAgICAgICAgICB2aWV3cG9ydEhlaWdodFJlZi5jdXJyZW50ID0gdmg7XG4gICAgICAgIGNvbnN0IG4gPSBwb29sU2l6ZSgpO1xuICAgICAgICBlbnN1cmVTbG90Q291bnQobik7XG4gICAgICAgIGNvbnN0IHNsb3RzID0gc2xvdHNSZWYuY3VycmVudCA/PyBbXTtcbiAgICAgICAgYXBwbHlTcGFjZXIoY291bnQpO1xuICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgc2xvdHMubGVuZ3RoOyBzICs9IDEpXG4gICAgICAgICAgICAgICAgY2xlYXJTbG90KHNsb3RzW3NdKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSBzY3JvbGxUb3BSZWYuY3VycmVudCA/PyAwO1xuICAgICAgICBjb25zdCBmaXJzdFZpc2libGUgPSBpbmRleEZyb21TY3JvbGwoc2Nyb2xsVG9wLCBjb3VudCk7XG4gICAgICAgIGNvbnN0IGZpcnN0SW5kZXggPSBNYXRoLm1heCgwLCBmaXJzdFZpc2libGUgLSBvdmVyc2NhbigpKTtcbiAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBuOyBzICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHNsb3QgPSBzbG90c1tzXTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZmlyc3RJbmRleCArIHMgPCBjb3VudCA/IGZpcnN0SW5kZXggKyBzIDogLTE7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNsb3QuaW5kZXggIT09IC0xIHx8IGZvcmNlKVxuICAgICAgICAgICAgICAgICAgICBjbGVhclNsb3Qoc2xvdCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBrZXlPZihpdGVtc1tpbmRleF0sIGluZGV4KTtcbiAgICAgICAgICAgIC8vIE1lc21vIMOtbmRpY2Ura2V5IGUgasOhIHRlbSBET00gbW9udGFkbyDihpIgc8OzIHBvc2nDp8Ojb1xuICAgICAgICAgICAgaWYgKCFmb3JjZSAmJlxuICAgICAgICAgICAgICAgIHNsb3QuaW5kZXggPT09IGluZGV4ICYmXG4gICAgICAgICAgICAgICAgc2xvdC5rZXkgPT09IGtleSAmJlxuICAgICAgICAgICAgICAgIHNsb3QuaG9zdCAmJlxuICAgICAgICAgICAgICAgIHNsb3Quc2NvcGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoID0gcm93SGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgc2xvdC5ob3N0LnN0eWxlLnRvcCA9IGAke2luZGV4ICogaH1weGA7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaW5kU2xvdChzbG90LCBpbmRleCwga2V5KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgc2NoZWR1bGVMYXlvdXQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChsYXlvdXRGcmFtZVJlZi5jdXJyZW50KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsYXlvdXRGcmFtZVJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGxheW91dEZyYW1lUmVmLmN1cnJlbnQgPSAwO1xuICAgICAgICAgICAgcmVhc3NpZ25TbG90cyhmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIEFww7NzIG8gcG9vbCBtb250YXIgcmVmcyBubyBET00gKi9cbiAgICBjb25zdCBzY2hlZHVsZUZsdXNoID0gKCkgPT4ge1xuICAgICAgICBpZiAocGVuZGluZ0ZsdXNoUmVmLmN1cnJlbnQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHBlbmRpbmdGbHVzaFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICAgICAgcGVuZGluZ0ZsdXNoUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJlYXNzaWduU2xvdHModHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbGF5b3V0RXZlbnRzKCgpID0+IHtcbiAgICAgICAgY29uc3Qgdmlld3BvcnQgPSB2aWV3cG9ydFJlZi5jdXJyZW50O1xuICAgICAgICBpZiAoIXZpZXdwb3J0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgZnJhbWUgPSAwO1xuICAgICAgICBjb25zdCBzeW5jVmlld3BvcnRIZWlnaHQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gZ2V0Vmlld3BvcnRIZWlnaHQoKTtcbiAgICAgICAgICAgIGlmIChuZXh0ID4gMClcbiAgICAgICAgICAgICAgICB2aWV3cG9ydEhlaWdodFJlZi5jdXJyZW50ID0gbmV4dDtcbiAgICAgICAgICAgIHJlYXNzaWduU2xvdHModHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGNsaWVudDogdW0gZnJhbWUgcGFyYSBvIGxheW91dCByZXNvbHZlciBoZWlnaHQgMTAwJVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgc3luY1ZpZXdwb3J0SGVpZ2h0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZSk7XG4gICAgICAgICAgICBmcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzeW5jVmlld3BvcnRIZWlnaHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICAgICAgICBzY3JvbGxUb3BSZWYuY3VycmVudCA9IHZpZXdwb3J0LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIHNjaGVkdWxlTGF5b3V0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUodmlld3BvcnQpO1xuICAgICAgICBpZiAodmlld3BvcnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh2aWV3cG9ydC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB2aWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZSk7XG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShsYXlvdXRGcmFtZVJlZi5jdXJyZW50ID8/IDApO1xuICAgICAgICAgICAgbGF5b3V0RnJhbWVSZWYuY3VycmVudCA9IDA7XG4gICAgICAgICAgICByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB2aWV3cG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2xvdCBvZiBzbG90c1JlZi5jdXJyZW50ID8/IFtdKVxuICAgICAgICAgICAgICAgIGRpc3Bvc2VTbG90Q29udGVudChzbG90KTtcbiAgICAgICAgfTtcbiAgICB9LCBbcHJvcHMuaGVpZ2h0LCBwcm9wcy53aWR0aCwgcHJvcHMuaXRlbUhlaWdodF0pO1xuICAgIC8vIGl0ZW1zIG11ZGFyYW1cbiAgICBsYXlvdXRFdmVudHMoKCkgPT4ge1xuICAgICAgICBnZXRJdGVtcygpO1xuICAgICAgICBzY2hlZHVsZUZsdXNoKCk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogKCkgPT4gcHJvcHMuY2xhc3NOYW1lID8gcHJvcHMuY2xhc3NOYW1lIDogXCJcIiwgc3R5bGU6IHJlc29sdmVDb250YWluZXJTdHlsZShwcm9wcy5oZWlnaHQsIHByb3BzLndpZHRoLCB7XG4gICAgICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcbiAgICAgICAgfSksIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgcmVmOiB2aWV3cG9ydFJlZiwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgIGluc2V0OiBcIjBcIixcbiAgICAgICAgICAgICAgICBvdmVyZmxvd1k6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93WDogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIH0sIGNoaWxkcmVuOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9vbFZlcnNpb24oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IGdldEl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHMuZW1wdHlTdGF0ZSA/PyBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBuID0gTWF0aC5tYXgocG9vbFNpemUoKSwgc2xvdHNSZWYuY3VycmVudD8ubGVuZ3RoID8/IDAsIDEpO1xuICAgICAgICAgICAgICAgIGVuc3VyZVNsb3RDb3VudChuKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoID0gcm93SGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSB0b3RhbEhlaWdodChpdGVtcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIC8vIFJlZnMgZG9zIGhvc3RzIGFpbmRhIG7Do28gZXhpc3RlbSBuZXN0ZSB0aWNrXG4gICAgICAgICAgICAgICAgc2NoZWR1bGVGbHVzaCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeChcImRpdlwiLCB7IHJlZjogc3BhY2VyUmVmLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogYCR7dG90YWx9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICB9LCBjaGlsZHJlbjogQXJyYXkuZnJvbSh7IGxlbmd0aDogbiB9LCAoXywgc2xvdElkKSA9PiAoX2pzeChcImRpdlwiLCB7IHJlZjogcmVnaXN0ZXJIb3N0KHNsb3RJZCksIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogYCR7aH1weGAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IFwiLTk5OTlweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvbkNsaWNrOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNSZWYuY3VycmVudD8uW3Nsb3RJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzbG90IHx8IHNsb3QuaW5kZXggPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGdldEl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gbGlzdFtzbG90LmluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5vbkl0ZW1DbGljaz8uKHJvdywgc2xvdC5pbmRleCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBgc2xvdC0ke3Nsb3RJZH1gKSkpIH0pKTtcbiAgICAgICAgICAgIH0gfSkgfSkpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplQ3NzU2l6ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgICAgICByZXR1cm4gXCIxMDAlXCI7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiA/IGAke3ZhbHVlfXB4YCA6IHZhbHVlO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUNvbnRhaW5lclN0eWxlKGhlaWdodCwgd2lkdGgsIGV4dHJhKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgaGVpZ2h0OiBub3JtYWxpemVDc3NTaXplKGhlaWdodCksXG4gICAgICAgIHdpZHRoOiBub3JtYWxpemVDc3NTaXplKHdpZHRoKSxcbiAgICAgICAgLi4uZXh0cmEsXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlY3ljbGVyLXZpZXcuanMubWFwIiwiZnVuY3Rpb24gY3JlYXRlTWFya2VyKHR5cGUpIHtcbiAgICBjb25zdCBNYXJrZXIgPSAocHJvcHMpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb3BzLmNoaWxkcmVuID8/IG51bGw7XG4gICAgfTtcbiAgICBNYXJrZXIuX3JldmVhbFR5cGUgPSB0eXBlO1xuICAgIHJldHVybiBNYXJrZXI7XG59XG5leHBvcnQgY29uc3QgSWYgPSBjcmVhdGVNYXJrZXIoXCJpZlwiKTtcbmV4cG9ydCBjb25zdCBFbHNlID0gY3JlYXRlTWFya2VyKFwiZWxzZVwiKTtcbmZ1bmN0aW9uIGV4dHJhY3RCcmFuY2hlcyhjaGlsZHJlbiwgZmFsbGJhY2spIHtcbiAgICBsZXQgaWZCcmFuY2ggPSBudWxsO1xuICAgIGxldCBlbHNlQnJhbmNoID0gZmFsbGJhY2sgPz8gbnVsbDtcbiAgICBpZiAoY2hpbGRyZW4gPT0gbnVsbClcbiAgICAgICAgcmV0dXJuIHsgaWZCcmFuY2gsIGVsc2VCcmFuY2ggfTtcbiAgICBjb25zdCBsaXN0ID0gQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbi5mbGF0KEluZmluaXR5KSA6IFtjaGlsZHJlbl07XG4gICAgbGV0IGhhc01hcmtlciA9IGZhbHNlO1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgbGlzdCkge1xuICAgICAgICBpZiAoY2hpbGQgPT0gbnVsbCB8fCBjaGlsZCA9PT0gZmFsc2UgfHwgY2hpbGQgPT09IHRydWUpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgdGFnID0gY2hpbGQ/LnRhZztcbiAgICAgICAgY29uc3QgdCA9IHRhZz8uX3JldmVhbFR5cGU7XG4gICAgICAgIGlmICh0ID09PSBcImlmXCIpIHtcbiAgICAgICAgICAgIGhhc01hcmtlciA9IHRydWU7XG4gICAgICAgICAgICBpZkJyYW5jaCA9XG4gICAgICAgICAgICAgICAgY2hpbGQucHJvcHM/LmNoaWxkcmVuID8/XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmNoaWxkcmVuID8/XG4gICAgICAgICAgICAgICAgICAgIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodCA9PT0gXCJlbHNlXCIpIHtcbiAgICAgICAgICAgIGhhc01hcmtlciA9IHRydWU7XG4gICAgICAgICAgICBlbHNlQnJhbmNoID1cbiAgICAgICAgICAgICAgICBjaGlsZC5wcm9wcz8uY2hpbGRyZW4gPz9cbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuY2hpbGRyZW4gPz9cbiAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWhhc01hcmtlcikge1xuICAgICAgICAvLyB1c28gYW50aWdvOiA8UmV2ZWFsPjxUZXN0IC8+PC9SZXZlYWw+XG4gICAgICAgIGlmQnJhbmNoID0gY2hpbGRyZW47XG4gICAgfVxuICAgIHJldHVybiB7IGlmQnJhbmNoLCBlbHNlQnJhbmNoIH07XG59XG5mdW5jdGlvbiB3aXRoQnJhbmNoS2V5KG5vZGUsIGtleSkge1xuICAgIGlmIChub2RlID09IG51bGwgfHwgbm9kZSA9PT0gZmFsc2UgfHwgbm9kZSA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgLy8gbGlzdGE6IGFwbGljYSBubyDDum5pY28gZmlsaG8gcmVsZXZhbnRlIG91IGVudm9sdmVcbiAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgICAgICBjb25zdCBsaXN0ID0gbm9kZS5mbGF0KEluZmluaXR5KS5maWx0ZXIoKHYpID0+IHYgIT0gbnVsbCAmJiB2ICE9PSBmYWxzZSAmJiB2ICE9PSB0cnVlKTtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIHdpdGhCcmFuY2hLZXkobGlzdFswXSwga2V5KTtcbiAgICAgICAgcmV0dXJuIGxpc3QubWFwKCh2LCBpKSA9PiB3aXRoQnJhbmNoS2V5KHYsIGAke2tleX0tJHtpfWApKTtcbiAgICB9XG4gICAgLy8gdm5vZGUgQWRhcHRpdmUgeyB0YWcsIHByb3BzLCBjaGlsZHJlbiB9XG4gICAgaWYgKHR5cGVvZiBub2RlID09PSBcIm9iamVjdFwiICYmIG5vZGUudGFnICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLm5vZGUsXG4gICAgICAgICAgICBwcm9wczogeyAuLi4obm9kZS5wcm9wcyA/PyB7fSksIGtleSB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyB0ZXh0byAvIG7Dum1lcm8g4oaSIGVudm9sdmUgZW0gZnJhZ21lbnQgY29tIGtleSB2aWEgcHJvcHMgZmFrZSBuw6NvIGFqdWRhO1xuICAgIC8vIHBhcmEgdGV4dG8gcHVybyBvIGtleWVkIGJsb2NrIHBvZGUgdXNhciBhIHByw7NwcmlhIGtleSBzdHJpbmc6XG4gICAgcmV0dXJuIHsgdGFnOiBcIkZyYWdtZW50XCIsIHByb3BzOiB7IGtleSB9LCBjaGlsZHJlbjogW25vZGVdIH07XG59XG5mdW5jdGlvbiBSZXZlYWxGbihwcm9wcykge1xuICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgICBjb25zdCByYXcgPSBwcm9wcy53aGVuO1xuICAgICAgICBjb25zdCBzaG93ID0gdHlwZW9mIHJhdyA9PT0gXCJmdW5jdGlvblwiID8gcmF3KCkgOiAhIXJhdztcbiAgICAgICAgY29uc3QgeyBpZkJyYW5jaCwgZWxzZUJyYW5jaCB9ID0gZXh0cmFjdEJyYW5jaGVzKHByb3BzLmNoaWxkcmVuLCBwcm9wcy5mYWxsYmFjayk7XG4gICAgICAgIHJldHVybiBzaG93XG4gICAgICAgICAgICA/IHdpdGhCcmFuY2hLZXkoaWZCcmFuY2ggPz8gbnVsbCwgXCJvblwiKVxuICAgICAgICAgICAgOiB3aXRoQnJhbmNoS2V5KGVsc2VCcmFuY2ggPz8gbnVsbCwgXCJvZmZcIik7XG4gICAgfSk7XG59XG5leHBvcnQgY29uc3QgUmV2ZWFsID0gUmV2ZWFsRm47XG5SZXZlYWwuSWYgPSBJZjtcblJldmVhbC5FbHNlID0gRWxzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJldmVhbC5qcy5tYXAiXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sV0FBVztBQUNqQixTQUFTLGtCQUFrQixHQUFHO0NBQzFCLE9BQU8sT0FBTyxNQUFNO0FBQ3hCO0FBQ0EsU0FBUyxrQkFBa0IsR0FBRztDQUMxQixPQUFPLE9BQU8sTUFBTTtBQUN4QjtBQUNBLFNBQVMsY0FBYyxRQUFRLE1BQU0sUUFBUTtDQUN6QyxNQUFNLEtBQUssU0FBUyxjQUFjLEtBQUssSUFBSTtDQUMzQyxNQUFNLGNBQWMsT0FBTyxVQUFVO0VBQ2pDLElBQUksU0FBUyxNQUNUO0VB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