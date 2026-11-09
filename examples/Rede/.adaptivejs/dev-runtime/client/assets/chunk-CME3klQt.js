//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) {
		__defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	}
	if (!no_symbols) {
		__defProp(target, Symbol.toStringTag, { value: "Module" });
	}
	return target;
};

//#endregion
//#region ../../packages/shared/dist/hydration/hydration-manifest.js
const HYDRATION_MANIFEST_ATTR = "data-adaptive-hydration-manifest";
const HYDRATION_BOUNDARY_ID_ATTR = "data-adaptive-boundary-id";

//#endregion
//#region ../../packages/shared/dist/hydration/client-boundary.js
const CLIENT_COMPONENT_SYMBOL = Symbol.for("adaptive.client_component");
const CLIENT_BOUNDARY_TAG = "adaptive-client-boundary";
const CLIENT_BOUNDARY_MODE_CLIENT = "client";
const CLIENT_BOUNDARY_MODE_HYDRATE = "hydrate";
const CLIENT_BOUNDARY_START_PREFIX = "adaptive-client-start:";
const CLIENT_BOUNDARY_END = "adaptive-client-end";
const REACTIVE_CHILD_START = "adaptive-reactive-start";
const REACTIVE_CHILD_END = "adaptive-reactive-end";
const REACTIVE_STRUCT_START = "adaptive-struct-start";
const REACTIVE_STRUCT_END = "adaptive-struct-end";
const REACTIVE_LIST_START = "adaptive-list-start";
const REACTIVE_LIST_END = "adaptive-list-end";
const REACTIVE_ASYNC_START = "adaptive-async-start";
const REACTIVE_ASYNC_END = "adaptive-async-end";
const HYDRATE_SLOT_TAG = "adaptive-hydrate-slot";
function isClientBoundaryTag(tag) {
	return tag === CLIENT_BOUNDARY_TAG;
}
function isHydrateSlotTag(tag) {
	return tag === HYDRATE_SLOT_TAG;
}

//#endregion
//#region ../../packages/shared/dist/hydration/hydration-supported-props.js
const UNSUPPORTED_DYNAMIC_HYDRATION_PROPS = /* @__PURE__ */ new Set([
	"children",
	"ref",
	"client",
	"key",
	"dangerouslySetInnerHTML",
	"innerHTML",
	"outerHTML",
	"textContent"
]);
function isSupportedDynamicHydrationPropName(key) {
	return !UNSUPPORTED_DYNAMIC_HYDRATION_PROPS.has(key);
}

//#endregion
//#region ../../packages/shared/dist/hydration/hydration-payload.js
/**
* Hydration bootstrap via JSON data island (não executa JS).
* CSP script-src não bloqueia type="application/json".
*/
const ADAPTIVE_HYDRATION_SCRIPT_ID = "__ADAPTIVE_HYDRATION__";
function defaultBrowserRoot() {
	if (typeof globalThis === "undefined") return null;
	return globalThis.document ?? null;
}
function parseHydrationPayload(root = defaultBrowserRoot()) {
	if (!root) return null;
	const el = root.querySelector(`#${ADAPTIVE_HYDRATION_SCRIPT_ID}`);
	if (!el) return null;
	try {
		const data = JSON.parse(el.textContent ?? "");
		if (!data || typeof data !== "object") return null;
		return {
			route: typeof data.route === "string" ? data.route : "/",
			params: data.params && typeof data.params === "object" && !Array.isArray(data.params) ? data.params : {},
			query: data.query && typeof data.query === "object" && !Array.isArray(data.query) ? data.query : {}
		};
	} catch {
		return null;
	}
}
function applyHydrationPayloadToWindow(root = defaultBrowserRoot()) {
	const payload = parseHydrationPayload(root);
	if (!payload) return null;
	const win = globalThis.window;
	if (win) {
		win.__ROUTE__ = payload.route;
		win.__PARAMS__ = payload.params;
		win.__QUERYS__ = payload.query;
	}
	return payload;
}

//#endregion
//#region ../../packages/shared/dist/web/context-runtime.js
const CONTEXT_PROVIDER_TAG = Symbol.for("adaptive.context.provider");

//#endregion
//#region ../../packages/shared/dist/web/metadata.js
function getClientComponentMetadata(value) {
	if (typeof value !== "function") return null;
	return value[CLIENT_COMPONENT_SYMBOL] ?? null;
}

//#endregion
//#region ../../packages/shared/dist/routing.js
function matchRouteServer(routePath, pathname) {
	if (routePath === "/" && pathname === "/") return {
		matched: true,
		params: {}
	};
	const trim = (value) => value.replace(/^\/|\/$/g, "");
	const routeSegments = trim(routePath).split("/").filter(Boolean);
	const pathSegments = trim(pathname).split("/").filter(Boolean);
	const params = {};
	let routeIndex = 0;
	let pathIndex = 0;
	while (routeIndex < routeSegments.length) {
		const routeSegment = routeSegments[routeIndex];
		const pathSegment = pathSegments[pathIndex];
		if (routeSegment.startsWith("*")) {
			const name = routeSegment.replace(/^\*/, "").replace(/\?$/, "");
			const optional = routeSegment.endsWith("?");
			const rest = pathSegments.slice(pathIndex);
			if (rest.length === 0 && !optional) return { matched: false };
			params[name] = rest.join("/");
			return {
				matched: true,
				params
			};
		}
		if (routeSegment.startsWith(":") && routeSegment.endsWith("?")) {
			const name = routeSegment.slice(1, -1);
			if (pathSegment !== void 0) {
				params[name] = pathSegment;
				pathIndex++;
			}
			routeIndex++;
			continue;
		}
		if (pathSegment === void 0) return { matched: false };
		if (routeSegment.startsWith(":")) {
			params[routeSegment.slice(1)] = pathSegment;
			routeIndex++;
			pathIndex++;
			continue;
		}
		if (routeSegment !== pathSegment) return { matched: false };
		routeIndex++;
		pathIndex++;
	}
	if (pathIndex < pathSegments.length) return { matched: false };
	return {
		matched: true,
		params
	};
}

//#endregion
//#region ../../packages/shared/dist/ssr/adaptive-form-data.js
let _Symbol$iterator;
_Symbol$iterator = Symbol.iterator;
function isAdaptiveFormData(value) {
	if (!value || typeof value !== "object") return false;
	return typeof value.append === "function" && typeof value.get === "function" && typeof value.entries === "function";
}

//#endregion
//#region ../../packages/shared/dist/ssr/call-server-action.js
async function callServerAction(moduleId, actionName, args) {
	const request = createActionRequest(moduleId, actionName, args);
	const response = await fetch("/_action", request);
	const payload = await response.json();
	if (!response.ok || !payload.ok) throw new Error(!payload.ok ? payload.message ?? payload.error : `Server action '${actionName}' failed.`);
	return payload.data;
}
function createActionRequest(moduleId, actionName, args) {
	if (args.length === 1 && isAdaptiveFormData(args[0])) return {
		method: "POST",
		headers: new Headers({
			"X-Adaptive-Module": moduleId,
			"X-Adaptive-Action": actionName,
			"X-Adaptive-Args-Mode": "formdata-single"
		}),
		body: args[0].toNative()
	};
	if (containsBinary(args)) {
		const formData = new FormData();
		appendFormValue(formData, "args", args);
		return {
			method: "POST",
			headers: new Headers({
				"X-Adaptive-Module": moduleId,
				"X-Adaptive-Action": actionName,
				"X-Adaptive-Args-Mode": "structured"
			}),
			body: formData
		};
	}
	return {
		method: "POST",
		headers: new Headers({
			"Content-Type": "application/json",
			"X-Adaptive-Module": moduleId,
			"X-Adaptive-Action": actionName,
			"X-Adaptive-Args-Mode": "json"
		}),
		body: JSON.stringify({
			module: moduleId,
			action: actionName,
			args
		})
	};
}
function containsBinary(value) {
	if (value == null) return false;
	if (typeof File !== "undefined" && value instanceof File) return true;
	if (typeof Blob !== "undefined" && value instanceof Blob) return true;
	if (isAdaptiveFormData(value)) return true;
	if (Array.isArray(value)) return value.some((item) => containsBinary(item));
	if (typeof value === "object") return Object.values(value).some((item) => containsBinary(item));
	return false;
}
function appendFormValue(formData, key, value) {
	if (value == null) {
		formData.append(key, "");
		return;
	}
	if (typeof File !== "undefined" && value instanceof File) {
		formData.append(key, value);
		return;
	}
	if (typeof Blob !== "undefined" && value instanceof Blob) {
		formData.append(key, value);
		return;
	}
	if (value instanceof Date) {
		formData.append(key, value.toISOString());
		return;
	}
	if (isAdaptiveFormData(value)) {
		for (const [entryKey, entryValue] of value.entries()) appendFormValue(formData, `${key}[${entryKey}]`, entryValue);
		return;
	}
	if (Array.isArray(value)) {
		value.forEach((item, index) => appendFormValue(formData, `${key}[${index}]`, item));
		return;
	}
	if (typeof value === "object") {
		for (const [nestedKey, nestedValue] of Object.entries(value)) appendFormValue(formData, `${key}[${nestedKey}]`, nestedValue);
		return;
	}
	formData.append(key, String(value));
}

//#endregion
//#region ../../packages/jsx/dist/jsx-runtime.js
function jsx(type, props, key) {
	const { children: propChildren, key: propsKey, ...rest } = props ?? {};
	const normalized = propChildren == null ? [] : Array.isArray(propChildren) ? propChildren : [propChildren];
	const finalKey = key !== void 0 ? key : propsKey;
	return {
		tag: type,
		props: rest,
		children: normalized,
		...finalKey != null ? { key: finalKey } : {}
	};
}
const jsxs = jsx;
const Fragment = Symbol.for("adaptive.fragment");

//#endregion
//#region ../../packages/core/dist/create-element.js
const createElement = jsx;

//#endregion
//#region ../../packages/web/dist/hy/hydrate/markers.js
function isClientBoundaryStartComment(node) {
	return node.nodeType === Node.COMMENT_NODE && node.data.startsWith("adaptive-client-start:");
}
function isAdaptiveBoundaryComment(node) {
	if (node.nodeType !== Node.COMMENT_NODE) return false;
	const d = node.data;
	return d.startsWith("adaptive-") || d.startsWith("adaptive-client-start:");
}
function isSafeToRemoveAdaptiveComment(node) {
	if (node.nodeType !== Node.COMMENT_NODE) return false;
	const d = node.data;
	if (d.startsWith("adaptive-reactive-anchor-")) return false;
	return d.startsWith("adaptive-reactive-") || d.startsWith("adaptive-struct-") || d.startsWith("adaptive-list-") || d.startsWith("adaptive-async-") || d.startsWith("adaptive-empty");
}
function findMatchingMarkerEnd(root, start, startPrefix, endText) {
	let depth = 0;
	let current = start.nextSibling;
	while (current) {
		if (current.nodeType === Node.COMMENT_NODE) {
			const data = current.data;
			if (data.startsWith(startPrefix)) depth++;
			else if (data === endText) {
				if (depth === 0) return current;
				depth--;
			}
		}
		if (current === root) break;
		current = current.nextSibling;
		if (root instanceof Element && current && !root.contains(current) && current !== root.nextSibling) {}
	}
	return null;
}
function collectSiblingNodesBetween(start, end) {
	const nodes = [];
	let cur = start.nextSibling;
	while (cur && cur !== end) {
		nodes.push(cur);
		cur = cur.nextSibling;
	}
	return nodes;
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/mismatch.js
/**
* Eventos que o painel de dev escuta. O painel é injetado pelo ci em
* desenvolvimento, então em produção ninguém escuta e o custo é um dispatch.
*/
const HYDRATION_MISMATCH_EVENT = "adaptive:hydration-mismatch";
const HYDRATION_ERROR_EVENT = "adaptive:hydration-error";
const mismatchLog = /* @__PURE__ */ new Set();
const mismatchHistory = [];
/**
* Relatar nunca pode derrubar quem esta reportando.
*
* warnMismatch e chamado de dentro de effects reativos. Se qualquer coisa aqui
* lancar (ler a rota, capturar snippet, despachar o evento), a excecao sobe e o
* effect morre no meio -- a ilha fica com o HTML do servidor e nenhum sinal de
* que a correcao do DOM nao aconteceu.
*/
function warnMismatch(details) {
	const key = `${details.path}:${details.message}`;
	if (mismatchLog.has(key)) return;
	mismatchLog.add(key);
	let route;
	let htmlSnippet;
	try {
		route = readHydrationRoute();
	} catch {}
	try {
		htmlSnippet = captureNodeSnippet(details.node);
	} catch {}
	const entry = {
		path: details.path,
		route,
		message: details.message,
		expected: details.expected,
		found: details.found,
		htmlSnippet,
		timestamp: Date.now()
	};
	mismatchHistory.push(entry);
	if (typeof window !== "undefined") {
		var _window;
		(_window = window).__ADAPTIVE_HYDRATION_MISMATCHES__ ?? (_window.__ADAPTIVE_HYDRATION_MISMATCHES__ = []);
		window.__ADAPTIVE_HYDRATION_MISMATCHES__.push(entry);
		dispatch(HYDRATION_MISMATCH_EVENT, entry);
	}
	if (isHydrationDebugEnabled()) console.warn("[Adaptive hydration mismatch]", entry);
}
/**
* Erro lançado dentro da hidratação. Antes isso era console.warn e a ilha
* morria em silêncio, com o HTML do servidor ainda na tela e nenhuma pista de
* que algo quebrou.
*/
function reportHydrationError(error, scope) {
	const isError = error instanceof Error;
	const moduleId = scope?.moduleId;
	const exportName = scope?.exportName;
	const detail = {
		path: [
			"hydrate",
			moduleId,
			exportName
		].filter(Boolean).join("."),
		message: isError ? error.message : String(error),
		stack: isError ? error.stack : void 0,
		moduleId,
		exportName,
		timestamp: Date.now()
	};
	if (typeof window !== "undefined") {
		var _window2;
		(_window2 = window).__ADAPTIVE_HYDRATION_ERRORS__ ?? (_window2.__ADAPTIVE_HYDRATION_ERRORS__ = []);
		window.__ADAPTIVE_HYDRATION_ERRORS__.push(detail);
		dispatch(HYDRATION_ERROR_EVENT, detail);
	}
	console.error("[Adaptive hydration]", detail.message, error);
}
function dispatch(name, detail) {
	try {
		window.dispatchEvent(new CustomEvent(name, { detail }));
	} catch {}
}
function warnHydrationInstructionMissing(root, kind, id) {
	warnMismatch({
		path: `hydrate.instruction.${kind}.${id}`,
		message: "Hydration instruction target was not found in existing DOM",
		expected: `[data-aid="${id}"]`,
		found: "nothing",
		node: root instanceof Node ? root : void 0
	});
}
function isHydrationDebugEnabled() {
	if (typeof window !== "undefined" && window.__ADAPTIVE_DEBUG_HYDRATION__ === true) return true;
	return globalThis?.process?.env?.ADAPTIVE_PUBLIC_DEBUG_HYDRATION === "true";
}
function debugHydrationLog(...args) {
	if (!isHydrationDebugEnabled()) return;
	console.log(...args);
}
function readHydrationRoute() {
	if (typeof window === "undefined" || typeof document === "undefined") return "server";
	applyHydrationPayloadToWindow(document);
	return window.__ROUTE__ ?? window.location.pathname;
}
function captureNodeSnippet(node) {
	if (!node) return void 0;
	if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
	if (node.nodeType === Node.COMMENT_NODE) return `<!--${node.textContent ?? ""}-->`;
	if (node.nodeType === Node.ELEMENT_NODE) return node.outerHTML.slice(0, 200);
}

//#endregion
//#region \0@oxc-project+runtime@0.152.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}

//#endregion
//#region \0@oxc-project+runtime@0.152.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}

//#endregion
//#region \0@oxc-project+runtime@0.152.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}

//#endregion
//#region \0@oxc-project+runtime@0.152.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}

//#endregion
//#region ../../packages/web/dist/reactive/events.js
const isSSR = () => typeof window === "undefined";
function isAdaptiveHydrationDebugEnabled() {
	if (!isSSR() && window.__ADAPTIVE_DEBUG_HYDRATION__ === true) return true;
	return globalThis?.process?.env?.ADAPTIVE_PUBLIC_DEBUG_HYDRATION === "true";
}
function debugSignalLog(...args) {
	if (!isAdaptiveHydrationDebugEnabled()) return;
	console.log("[adaptive:hydration]", ...args);
}
let activeHydrationCollection = null;
function runHydrationCollection(fn) {
	const previous = activeHydrationCollection;
	const state = {
		unsupportedFeatures: /* @__PURE__ */ new Set(),
		effectInstructions: []
	};
	activeHydrationCollection = state;
	try {
		return {
			value: fn(),
			unsupportedFeatures: Array.from(state.unsupportedFeatures),
			effectInstructions: [...state.effectInstructions]
		};
	} finally {
		activeHydrationCollection = previous;
	}
}
var EventSystem = class {
	constructor() {
		_defineProperty(this, "currentEffect", null);
		_defineProperty(this, "currentScope", null);
		_defineProperty(this, "cleanups", /* @__PURE__ */ new Map());
		_defineProperty(this, "effectSources", /* @__PURE__ */ new Map());
		_defineProperty(this, "ignoredSources", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "effectPhases", /* @__PURE__ */ new WeakMap());
		_defineProperty(this, "effectScopes", /* @__PURE__ */ new Map());
		_defineProperty(this, "disposedEffects", /* @__PURE__ */ new WeakSet());
		_defineProperty(this, "pending", /* @__PURE__ */ new WeakSet());
		_defineProperty(this, "layoutQueue", /* @__PURE__ */ new Set());
		_defineProperty(this, "effectQueue", /* @__PURE__ */ new Set());
		_defineProperty(this, "flushing", false);
		_defineProperty(this, "batchDepth", 0);
		_defineProperty(this, "nextScopeId", 1);
		_defineProperty(this, "noScopeCache", /* @__PURE__ */ new Map());
	}
	getCurrentEffect() {
		return this.currentEffect;
	}
	getCurrentScope() {
		return this.currentScope;
	}
	isDisposed(effect) {
		return this.disposedEffects.has(effect);
	}
	setCurrentEffect(effect) {
		this.currentEffect = effect;
	}
	createScope(label) {
		return {
			id: this.nextScopeId++,
			label,
			hooks: [],
			hookIndex: 0
		};
	}
	runWithScope(scope, fn) {
		const prev = this.currentScope;
		const prevIndex = scope.hookIndex;
		this.currentScope = scope;
		scope.hookIndex = 0;
		try {
			return fn();
		} finally {
			scope.hookIndex = prevIndex;
			this.currentScope = prev;
		}
	}
	runWithContext(ctxId, value, fn) {
		const scope = this.currentScope;
		if (!scope) return fn();
		const previousContext = scope.context;
		const nextContext = new Map(previousContext ?? []);
		nextContext.set(ctxId, value);
		scope.context = nextContext;
		try {
			return fn();
		} finally {
			scope.context = previousContext;
		}
	}
	readContext(ctxId, defaultValue) {
		const scope = this.currentScope;
		if (!scope?.context?.has(ctxId)) return defaultValue;
		return scope.context.get(ctxId);
	}
	trackSource(effect, source) {
		let set = this.effectSources.get(effect);
		if (!set) {
			set = /* @__PURE__ */ new Set();
			this.effectSources.set(effect, set);
		}
		set.add(source);
	}
	cleanupSources(effect) {
		const set = this.effectSources.get(effect);
		if (!set) return;
		for (const source of set) try {
			source.removeSubscriber(effect);
		} catch {}
		set.clear();
		this.effectSources.delete(effect);
	}
	runCleanup(effect) {
		const cleanup = this.cleanups.get(effect);
		if (typeof cleanup === "function") try {
			cleanup();
		} catch (error) {
			console.error("Adaptive cleanup error:", error);
		}
		this.cleanups.delete(effect);
	}
	disposeEffect(effect) {
		this.layoutQueue.delete(effect);
		this.effectQueue.delete(effect);
		this.pending.delete(effect);
		this.runCleanup(effect);
		this.cleanupSources(effect);
		this.ignoredSources.delete(effect);
		this.effectPhases.delete(effect);
		this.effectScopes.delete(effect);
		this.disposedEffects.add(effect);
		for (const [key, val] of this.noScopeCache) if (val.runner === effect) {
			this.noScopeCache.delete(key);
			break;
		}
	}
	registerCleanup(effect, cleanup) {
		if (typeof cleanup === "function") this.cleanups.set(effect, cleanup);
		else this.cleanups.delete(effect);
	}
	setIgnoredSources(effect, sources = []) {
		if (sources.length === 0) {
			this.ignoredSources.delete(effect);
			return;
		}
		const next = /* @__PURE__ */ new WeakSet();
		sources.forEach((s) => next.add(s));
		this.ignoredSources.set(effect, next);
	}
	setEffectPhase(effect, phase) {
		this.effectPhases.set(effect, phase);
	}
	shouldIgnoreTrigger(effect, source) {
		const ignored = this.ignoredSources.get(effect);
		return ignored ? ignored.has(source) : false;
	}
	schedule(effect, phase = "effect") {
		if (this.isDisposed(effect)) return;
		if (this.pending.has(effect)) return;
		if (this.currentScope && !this.effectScopes.has(effect)) this.effectScopes.set(effect, this.currentScope);
		this.pending.add(effect);
		if (phase === "layout") this.layoutQueue.add(effect);
		else this.effectQueue.add(effect);
		if (this.batchDepth === 0) queueMicrotask(() => this.flush());
	}
	scheduleFromSource(effect, source) {
		if (this.isDisposed(effect)) return;
		if (this.shouldIgnoreTrigger(effect, source)) {
			debugSignalLog("ignored trigger", effect, source);
			return;
		}
		const phase = this.effectPhases.get(effect) ?? "effect";
		this.schedule(effect, phase);
	}
	executeEffect(effect) {
		if (this.isDisposed(effect)) return;
		const prev = this.currentEffect;
		this.currentEffect = effect;
		this.cleanupSources(effect);
		this.runCleanup(effect);
		if (this.currentScope && !this.effectScopes.has(effect)) this.effectScopes.set(effect, this.currentScope);
		try {
			const result = effect();
			this.registerCleanup(effect, result);
		} catch (e) {
			console.error("Adaptive effect error:", e);
		} finally {
			this.currentEffect = prev;
		}
	}
	flush() {
		if (this.flushing) return;
		if (this.layoutQueue.size === 0 && this.effectQueue.size === 0) return;
		this.flushing = true;
		try {
			while (this.layoutQueue.size > 0) {
				const toRun = Array.from(this.layoutQueue);
				this.layoutQueue.clear();
				for (const eff of toRun) {
					this.pending.delete(eff);
					this.executeEffect(eff);
				}
			}
			while (this.effectQueue.size > 0) {
				const toRun = Array.from(this.effectQueue);
				this.effectQueue.clear();
				for (const eff of toRun) {
					this.pending.delete(eff);
					this.executeEffect(eff);
				}
			}
		} finally {
			this.flushing = false;
		}
	}
	batch(fn) {
		this.batchDepth++;
		try {
			return fn();
		} finally {
			this.batchDepth--;
			if (this.batchDepth === 0) this.flush();
		}
	}
	untrack(fn) {
		const prev = this.currentEffect;
		this.currentEffect = null;
		try {
			return fn();
		} finally {
			this.currentEffect = prev;
		}
	}
	/**
	* Executa fn e devolve quais sources ela leu, sem agendar nada.
	*
	* Serve para quem precisa do valor síncrono E da lista de dependências,
	* sem pagar uma segunda execução da função. O memo é o caso: ele
	* calcula na hora para ter o valor durante o render, mas se o effect
	* rodar logo em seguida para computar de novo, a função é executada
	* duas vezes no cliente e uma no servidor.
	*/
	trackSources(fn) {
		const probe = (() => {});
		const prev = this.currentEffect;
		this.currentEffect = probe;
		try {
			const value = fn();
			const set = this.effectSources.get(probe);
			return {
				value,
				sources: set ? [...set] : []
			};
		} finally {
			this.currentEffect = prev;
			this.effectSources.delete(probe);
		}
	}
	/**
	* Assina effect em sources sem executar o corpo dele.
	*
	* Assinar exige ler a source com o effect ativo -- é o read que registra
	* a assinatura. Ler uma source pura não roda código de usuário, então
	* dá para assinar sem recomputar.
	*/
	linkSources(effect, sources) {
		if (sources.length === 0) return;
		const prev = this.currentEffect;
		this.currentEffect = effect;
		try {
			for (const source of sources) source.get?.();
		} finally {
			this.currentEffect = prev;
		}
	}
	cleanupScope(scope) {
		for (const [eff, effScope] of this.effectScopes.entries()) if (effScope === scope) this.disposeEffect(eff);
		for (const hook of scope.hooks) {
			if (!hook) continue;
			if (typeof hook === "object") {
				if ("scheduled" in hook) hook.scheduled = false;
				if ("runner" in hook && hook.runner) this.disposeEffect(hook.runner);
				if ("dispose" in hook && typeof hook.dispose === "function") try {
					hook.dispose();
				} catch {}
				if (hook.signal && Array.isArray(hook.signal)) {}
			}
		}
		scope.hooks.length = 0;
		scope.hookIndex = 0;
		scope.context = void 0;
	}
	cleanupAll() {
		for (const eff of Array.from(this.effectSources.keys())) this.disposeEffect(eff);
		this.layoutQueue.clear();
		this.effectQueue.clear();
		this.noScopeCache.clear();
	}
	getNoScopeEntry(effect) {
		return this.noScopeCache.get(effect);
	}
	setNoScopeEntry(effect, deps, runner) {
		this.noScopeCache.set(effect, {
			deps,
			runner
		});
	}
};
const system = new EventSystem();
var EventSource = class {
	constructor(initial) {
		_defineProperty(this, "subscribers", /* @__PURE__ */ new Set());
		_defineProperty(this, "value", void 0);
		this.value = initial;
	}
	get() {
		const effect = system.getCurrentEffect();
		if (effect && !system.isDisposed(effect)) {
			this.subscribers.add(effect);
			system.trackSource(effect, this);
		}
		return this.value;
	}
	set(next) {
		if (Object.is(this.value, next)) return;
		this.value = next;
		debugSignalLog("set", next, "subs:", this.subscribers.size);
		for (const sub of [...this.subscribers]) system.scheduleFromSource(sub, this);
	}
	update(fn) {
		this.set(fn(this.value));
	}
	removeSubscriber(effect) {
		this.subscribers.delete(effect);
	}
	_getSubscribers() {
		return this.subscribers;
	}
};
function createEventSignal(initial) {
	const source = new EventSource(initial);
	const get = () => source.get();
	const set = ((v) => {
		if (typeof v === "function") source.update(v);
		else source.set(v);
	});
	set.__adaptiveSource = source;
	return [get, set];
}
function runWithContext(ctxId, value, fn) {
	return system.runWithContext(ctxId, value, fn);
}
function useHookSlot(factory) {
	const scope = system.getCurrentScope();
	if (!scope) return factory();
	const index = scope.hookIndex++;
	if (!scope.hooks[index]) scope.hooks[index] = factory();
	return scope.hooks[index];
}
function resolveIgnored(ignore) {
	if (!ignore?.length) return [];
	return ignore.map((item) => item.__adaptiveSource).filter((s) => Boolean(s));
}
function haveDepsChanged(prev, next) {
	if (!prev) return true;
	if (prev.length !== next.length) return true;
	return next.some((d, i) => !Object.is(d, prev[i]));
}
function events(effect, deps = [], options = {}) {
	const phase = options.phase ?? "effect";
	const ignored = resolveIgnored(options.ignore);
	const subscribeTo = options.subscribeTo;
	const resolvedDeps = deps.map((d) => typeof d === "function" ? d() : d);
	if (activeHydrationCollection) {
		activeHydrationCollection.effectInstructions.push({
			kind: phase === "layout" ? "layout-effect" : "effect",
			effect,
			deps: resolvedDeps,
			ignoredSources: ignored
		});
		debugSignalLog("collect", phase, effect);
		return;
	}
	if (isSSR()) return;
	const scope = system.getCurrentScope();
	if (!scope) {
		const cached = system.getNoScopeEntry(effect);
		if (cached && !haveDepsChanged(cached.deps, resolvedDeps)) return;
		const runner = () => effect();
		system.setIgnoredSources(runner, ignored);
		system.setEffectPhase(runner, phase);
		system.setNoScopeEntry(effect, resolvedDeps, runner);
		if (subscribeTo) {
			system.linkSources(runner, subscribeTo);
			return;
		}
		system.schedule(runner, phase);
		return;
	}
	const index = scope.hookIndex++;
	if (!scope.hooks[index]) {
		const state = {
			effect,
			deps: void 0,
			initialized: false,
			runner: () => state.effect()
		};
		scope.hooks[index] = state;
	}
	const hook = scope.hooks[index];
	hook.effect = effect;
	system.setIgnoredSources(hook.runner, ignored);
	system.setEffectPhase(hook.runner, phase);
	if (hook.initialized && !haveDepsChanged(hook.deps, resolvedDeps)) return;
	hook.initialized = true;
	hook.deps = resolvedDeps;
	if (subscribeTo) {
		system.linkSources(hook.runner, subscribeTo);
		return;
	}
	system.schedule(hook.runner, phase);
}
function layoutEvents(effect, deps = [], options = {}) {
	events(effect, deps, {
		...options,
		phase: "layout"
	});
}
function flushEvents() {
	system.flush();
}
function untrack(fn) {
	return system.untrack(fn);
}
function createEventsScope(label) {
	return system.createScope(label);
}
function createEffectScope(label) {
	return system.createScope(label);
}
function runWithEffectScope(scope, fn) {
	return system.runWithScope(scope, fn);
}
function cleanupEventsScope(scope) {
	system.cleanupScope(scope);
}
function cleanupEffectScope(scope) {
	system.cleanupScope(scope);
}
function getEventsSystem() {
	return system;
}
function createReactiveEffect(effect, phase = "layout", options = {}) {
	const runner = () => effect();
	system.setIgnoredSources(runner, resolveIgnored(options.ignore));
	system.setEffectPhase(runner, phase);
	system.schedule(runner, phase);
	return () => {
		system.disposeEffect(runner);
	};
}

//#endregion
//#region ../../packages/web/dist/reactive/reactive.js
function signal(initialValue) {
	return useHookSlot(() => createEventSignal(initialValue));
}
function rootSignal(initialValue) {
	return createEventSignal(initialValue);
}
function ref(initialValue = null) {
	return useHookSlot(() => ({ current: initialValue }));
}

//#endregion
//#region ../../packages/web/dist/reactive/init.js
/**
* Executa quando o componente aparece na tela (por instância / scope).
* Return = cleanup na saída da tela (unmount).
*
* Agora 100% ligado ao ciclo de vida:
* - mount: roda em layout phase, após DOM inserido
* - unmount: cleanup é chamado quando cleanupEventsScope(scope) roda
*           no boundary-component.ts (isConnected === false)
*/
function init(effect) {
	if (isSSR()) return;
	const system = getEventsSystem();
	const scope = system.getCurrentScope();
	if (!scope) {
		const runner = () => effect();
		system.setEffectPhase(runner, "layout");
		system.schedule(runner, "layout");
		return;
	}
	const index = scope.hookIndex++;
	if (!scope.hooks[index]) scope.hooks[index] = {
		scheduled: false,
		runner: null
	};
	const hook = scope.hooks[index];
	if (hook.scheduled) return;
	hook.scheduled = true;
	const runner = () => effect();
	hook.runner = runner;
	system.setEffectPhase(runner, "layout");
	system.effectScopes?.set?.(runner, scope);
	system.schedule(runner, "layout");
}
/**
* Efeito cliente genérico (compat com useClientEffect antigo).
* Roda como effect normal no client, respeita deps.
*/
function useClientEffect(effect, deps = []) {
	if (isSSR()) return;
	events(effect, deps, { phase: "effect" });
}

//#endregion
//#region ../../packages/web/dist/reactive/adaptive-observer.js
var AdaptiveObserver = class {
	constructor(initial) {
		_defineProperty(this, "_get", void 0);
		_defineProperty(this, "_set", void 0);
		_defineProperty(this, "_source", void 0);
		const [get, set] = createEventSignal(initial);
		this._get = get;
		this._set = set;
		this._source = set.__adaptiveSource;
	}
	get() {
		return this._get();
	}
	set(value) {
		this._set(value);
	}
	update(fn) {
		this._source.update(fn);
	}
	removeSubscriber(effect) {
		this._source.removeSubscriber(effect);
	}
	get value() {
		return this._get();
	}
};

//#endregion
//#region ../../packages/web/dist/hy/hydrate/constants.js
const HYDRATION_ATTR = "data-aid";
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
const SVG_ATTRIBUTE_NAME_MAP = {
	className: "class",
	strokeWidth: "stroke-width",
	strokeLinecap: "stroke-linecap",
	strokeLinejoin: "stroke-linejoin",
	strokeDasharray: "stroke-dasharray",
	strokeDashoffset: "strokeDashoffset",
	strokeMiterlimit: "stroke-miterlimit",
	fillRule: "fill-rule",
	clipRule: "clip-rule",
	viewBox: "viewBox",
	preserveAspectRatio: "preserveAspectRatio",
	vectorEffect: "vector-effect",
	xmlnsXlink: "xmlns:xlink"
};

//#endregion
//#region ../../packages/web/dist/hy/hydrate/dom.js
function resolveChildNamespace(tag, parentNamespace) {
	if (tag === "svg") return SVG_NAMESPACE;
	if (tag === "math") return MATHML_NAMESPACE;
	if (tag === "foreignObject") return null;
	return parentNamespace;
}
function shouldAssignAsProperty(element, namespace, key) {
	if (namespace === "http://www.w3.org/2000/svg" || namespace === "http://www.w3.org/1998/Math/MathML") return false;
	return key in element;
}
function resolveDomAttributeName(key, namespace) {
	if (namespace === "http://www.w3.org/2000/svg" || namespace === "http://www.w3.org/1998/Math/MathML") return SVG_ATTRIBUTE_NAME_MAP[key] ?? key;
	return key === "className" ? "class" : key;
}

//#endregion
//#region ../../packages/web/dist/hy/style-shared.js
function resolveStyleEntries(style) {
	const resolved = typeof style === "function" ? style() : style;
	if (!resolved || typeof resolved !== "object") return [];
	return Object.entries(resolved).flatMap(([styleKey, styleValue]) => {
		const value = typeof styleValue === "function" ? styleValue() : styleValue;
		if (value == null || value === false) return [];
		return [[styleKey, value]];
	});
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/style.js
function applyStyleObject(el, style) {
	if (!style || typeof style !== "object") return;
	for (const [key, value] of resolveStyleEntries(style)) if (value == null || value === false) el.style.removeProperty(key.replace(/([A-Z])/g, "-$1").toLowerCase());
	else el.style[key] = value;
}

//#endregion
//#region ../../packages/web/dist/hy/keyed-reactive-block.js
/**
* Extrai key de um vnode Adaptive.
* Em Adaptive/JSX a key pode estar em:
* - vnode.key (padrão React-like)
* - vnode.props.key
* - vnode.props["data-key"]
*/
function getVNodeKey(value) {
	if (value == null || value === false || value === true) return null;
	if (typeof value === "function") return null;
	if (Array.isArray(value)) {
		const list = value.flat(Infinity).filter((v) => v != null && v !== false && v !== true);
		if (list.length === 1) return getVNodeKey(list[0]);
		const keys = list.map(getVNodeKey);
		if (keys.every((k) => k != null)) return keys.join("|");
		return null;
	}
	if (typeof value === "object") {
		if (value.key != null && value.key !== false) return value.key;
		if (value.props != null) {
			const k = value.props.key;
			if (k != null && k !== false) return k;
			const dk = value.props["data-key"];
			if (dk != null && dk !== false) return dk;
		}
	}
	return null;
}
function mountKeyedReactiveFunction(thunk, namespace, renderToDOM) {
	const start = document.createTextNode("");
	const end = document.createTextNode("");
	const fragment = document.createDocumentFragment();
	fragment.appendChild(start);
	fragment.appendChild(end);
	let currentKey = void 0;
	let currentScope = null;
	let hasMounted = false;
	const cache = /* @__PURE__ */ new Map();
	createReactiveEffect(() => {
		return () => {
			for (const entry of cache.values()) cleanupEffectScope(entry.scope);
			cache.clear();
			if (currentScope) {
				cleanupEffectScope(currentScope);
				currentScope = null;
			}
		};
	}, "layout");
	createReactiveEffect(() => {
		const nextValue = thunk();
		const parent = start.parentNode;
		if (!parent) return;
		const nextKey = getVNodeKey(nextValue);
		if (hasMounted && nextKey != null && currentKey != null && Object.is(nextKey, currentKey)) return;
		if (currentScope) {
			cleanupEffectScope(currentScope);
			currentScope = null;
		}
		let node = start.nextSibling;
		while (node && node !== end) {
			const next = node.nextSibling;
			parent.removeChild(node);
			node = next;
		}
		currentScope = createEffectScope(`reactive-keyed:${String(nextKey ?? "nokey")}`);
		const rendered = runWithEffectScope(currentScope, () => renderToDOM(nextValue, namespace));
		parent.insertBefore(rendered, end);
		currentKey = nextKey;
		hasMounted = true;
	});
	return fragment;
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/render-to-dom.js
function renderToDOM(vnode, namespace = null) {
	if (vnode instanceof Node) return vnode;
	if (vnode == null || vnode === false || vnode === true) return document.createComment("adaptive-empty");
	if (typeof vnode === "string" || typeof vnode === "number") return document.createTextNode(String(vnode));
	if (Array.isArray(vnode)) {
		const fragment = document.createDocumentFragment();
		for (const child of vnode) fragment.appendChild(renderToDOM(child, namespace));
		return fragment;
	}
	if (typeof vnode === "function") return mountKeyedReactiveFunction(vnode, namespace, renderToDOM);
	if (vnode.tag === CONTEXT_PROVIDER_TAG) return runWithContext(vnode.props.context.id, vnode.props.value, () => renderToDOM(vnode.children ?? [], namespace));
	if (vnode.tag === "Fragment" || typeof vnode.tag === "symbol") {
		const fragment = document.createDocumentFragment();
		const children = vnode.children ?? [];
		for (const child of Array.isArray(children) ? children : [children]) fragment.appendChild(renderToDOM(child, namespace));
		return fragment;
	}
	if (typeof vnode.tag === "function") return untrack(() => renderToDOM(vnode.tag({
		...vnode.props ?? {},
		children: vnode.children ?? []
	}), namespace));
	const nextNamespace = resolveChildNamespace(vnode.tag, namespace);
	const el = nextNamespace ? document.createElementNS(nextNamespace, vnode.tag) : document.createElement(vnode.tag);
	const props = vnode.props ?? {};
	for (const [key, value] of Object.entries(props)) {
		if (key === "children" || key === "client") continue;
		if (key === "ref") {
			if (typeof value === "function") value(el);
			else if (value && typeof value === "object") value.current = el;
			continue;
		}
		if (key === "xmlns" && nextNamespace) continue;
		if (key === "className") {
			if (typeof value === "function") createReactiveEffect(() => {
				el.setAttribute("class", value() ?? "");
			});
			else el.setAttribute("class", value);
			continue;
		}
		if (key.startsWith("on") && typeof value === "function") {
			el.addEventListener(key.slice(2).toLowerCase(), value);
			continue;
		}
		if (key === "style") {
			if (typeof value === "function") events(() => {
				applyStyleObject(el, value());
			});
			else if (typeof value === "object" && value !== null) {
				for (const [styleKey, styleValue] of Object.entries(value)) if (typeof styleValue === "function") events(() => {
					const resolved = styleValue();
					if (resolved == null || resolved === false) el.style.removeProperty(styleKey.replace(/([A-Z])/g, "-$1").toLowerCase());
					else el.style[styleKey] = resolved;
				});
				else if (styleValue != null && styleValue !== false) el.style[styleKey] = styleValue;
			}
			continue;
		}
		if (value === false || value == null) continue;
		if (typeof value === "function") {
			createReactiveEffect(() => {
				const resolved = value();
				if (resolved === false || resolved == null) {
					el.removeAttribute(resolveDomAttributeName(key, nextNamespace));
					return;
				}
				if (shouldAssignAsProperty(el, nextNamespace, key)) el[key] = resolved;
				else el.setAttribute(resolveDomAttributeName(key, nextNamespace), String(resolved));
			}, "layout");
			continue;
		}
		if (shouldAssignAsProperty(el, nextNamespace, key)) el[key] = value;
		else el.setAttribute(resolveDomAttributeName(key, nextNamespace), String(value));
	}
	const children = vnode.children ?? [];
	const list = Array.isArray(children) ? children : [children];
	for (const child of list) el.appendChild(renderToDOM(child, nextNamespace));
	return el;
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/mount.js
function mountClientComponent(root, Component, props) {
	root.replaceChildren(renderToDOM(createElement(Component, props)));
	return Array.from(root.childNodes);
}
function mountClientComponentBetweenMarkers(start, end, Component, props) {
	const parent = start.parentNode;
	if (!parent) return [];
	let cur = start.nextSibling;
	while (cur && cur !== end) {
		const next = cur.nextSibling;
		parent.removeChild(cur);
		cur = next;
	}
	const rendered = renderToDOM(createElement(Component, props));
	const mounted = rendered.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? Array.from(rendered.childNodes) : [rendered];
	parent.insertBefore(rendered, end);
	start.remove();
	end.remove();
	return mounted;
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/elements.js
function findHydrationElement(root, id) {
	if (root instanceof Element && root.getAttribute("data-aid") === id) return root;
	return findHydrationElementInSubtree(root, id, root);
}
function findHydrationElementBetweenMarkers(start, end, id) {
	let current = start.nextSibling;
	while (current && current !== end) {
		if (isClientBoundaryStartComment(current)) {
			const boundaryEnd = findMatchingMarkerEnd(start.parentNode, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
			current = boundaryEnd ? boundaryEnd.nextSibling : end;
			continue;
		}
		if (current.nodeType === Node.ELEMENT_NODE) {
			const el = current;
			if (el.getAttribute("data-aid") === id) return el;
			if (!el.hasAttribute("data-adaptive-client-module")) {
				const nested = findHydrationElementInSubtree(el, id, el);
				if (nested) return nested;
			}
		}
		current = current.nextSibling;
	}
	return null;
}
function findHydrationElementInSubtree(root, id, boundaryRoot) {
	let current = root.firstChild;
	while (current) {
		if (isClientBoundaryStartComment(current)) {
			const boundaryEnd = findMatchingMarkerEnd(root, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
			current = boundaryEnd ? boundaryEnd.nextSibling : current.nextSibling;
			continue;
		}
		if (current.nodeType === Node.ELEMENT_NODE) {
			const el = current;
			if (el.getAttribute("data-aid") === id) return el;
			if (el.hasAttribute("data-adaptive-client-module") && el !== boundaryRoot) {
				current = current.nextSibling;
				continue;
			}
			const nested = findHydrationElementInSubtree(el, id, boundaryRoot);
			if (nested) return nested;
		}
		current = current.nextSibling;
	}
	return null;
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/events.js
const eventHandlers = /* @__PURE__ */ new WeakMap();
function bindDelegatedEvent(element, eventName, handler) {
	let handlers = eventHandlers.get(element);
	if (!handlers) {
		handlers = /* @__PURE__ */ new Map();
		eventHandlers.set(element, handlers);
	}
	const prev = handlers.get(eventName);
	if (prev) element.removeEventListener(eventName, prev);
	handlers.set(eventName, handler);
	element.addEventListener(eventName, handler);
}
function wrapHydrationEventHandler(id, eventName, handler) {
	return function hydratedEventHandler(event) {
		debugHydrationLog("[hydrate:event:fired]", id, eventName);
		return handler.call(this, event);
	};
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/props.js
function bindRef(ref, element) {
	if (typeof ref === "function") ref(element);
	else if (ref && typeof ref === "object") ref.current = element;
}
function hydrateDynamicProp(element, instruction) {
	const namespace = element.namespaceURI;
	createReactiveEffect(() => {
		const resolved = instruction.getter();
		if (resolved == null || resolved === false) {
			element.removeAttribute(resolveDomAttributeName(instruction.prop, namespace));
			return;
		}
		if (shouldAssignAsProperty(element, namespace, instruction.prop)) element[instruction.prop] = resolved;
		else element.setAttribute(resolveDomAttributeName(instruction.prop, namespace), String(resolved));
	});
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/reactive-markers.js
function findMarkerPairInRoot(root, startMarker, endMarker) {
	let rangeStart = null;
	let rangeEnd = null;
	function search(node) {
		let current = node.firstChild;
		while (current) {
			if (isClientBoundaryStartComment(current)) {
				const boundaryEnd = findMatchingMarkerEnd(node, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
				current = boundaryEnd ? boundaryEnd.nextSibling : current.nextSibling;
				continue;
			}
			if (current.nodeType === Node.COMMENT_NODE) {
				const data = current.data;
				if (data === startMarker) rangeStart = current;
				else if (data === endMarker) {
					rangeEnd = current;
					if (rangeStart) return true;
				}
			} else if (current.nodeType === Node.ELEMENT_NODE) {
				const el = current;
				if (!el.hasAttribute("data-adaptive-client-module")) {
					if (search(el)) return true;
				}
			}
			current = current.nextSibling;
		}
		return false;
	}
	search(root);
	return {
		start: rangeStart,
		end: rangeEnd
	};
}
function findMarkerPairBetweenMarkers(start, end, startMarker, endMarker) {
	const parent = start.parentNode;
	if (!parent) return {
		start: null,
		end: null
	};
	let rangeStart = null;
	let rangeEnd = null;
	function searchInElement(element) {
		let current = element.firstChild;
		while (current) {
			if (isClientBoundaryStartComment(current)) {
				const boundaryEnd = findMatchingMarkerEnd(element, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
				current = boundaryEnd ? boundaryEnd.nextSibling : null;
				continue;
			}
			if (current.nodeType === Node.ELEMENT_NODE) {
				const child = current;
				if (!child.hasAttribute("data-adaptive-client-module")) {
					if (searchInElement(child)) return true;
				}
			} else if (current.nodeType === Node.COMMENT_NODE) {
				const data = current.data;
				if (data === startMarker) rangeStart = current;
				else if (data === endMarker) {
					rangeEnd = current;
					if (rangeStart) return true;
				}
			}
			current = current.nextSibling;
		}
		return false;
	}
	let current = start.nextSibling;
	while (current && current !== end) {
		if (isClientBoundaryStartComment(current)) {
			const boundaryEnd = findMatchingMarkerEnd(parent, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
			current = boundaryEnd ? boundaryEnd.nextSibling : end;
			continue;
		}
		if (current.nodeType === Node.COMMENT_NODE) {
			const data = current.data;
			if (data === startMarker) rangeStart = current;
			else if (data === endMarker) {
				rangeEnd = current;
				if (rangeStart) break;
			}
		} else if (current.nodeType === Node.ELEMENT_NODE) {
			const el = current;
			if (!el.hasAttribute("data-adaptive-client-module")) {
				if (searchInElement(el)) break;
			}
		}
		current = current.nextSibling;
	}
	return {
		start: rangeStart,
		end: rangeEnd
	};
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/inplace.js
const HYDRATED_IN_PLACE = /* @__PURE__ */ new WeakSet();
function normalizeVNodeList(value) {
	if (value == null || value === false || value === true) return [];
	if (typeof value === "function") try {
		return normalizeVNodeList(untrack(() => value()));
	} catch {
		return [];
	}
	if (Array.isArray(value)) return value.flatMap((item) => normalizeVNodeList(item));
	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return [{ __adaptive_text: String(value) }];
	if (value && typeof value === "object" && "tag" in value) return [value];
	return [];
}
function advanceMeaningfulSibling(cursor) {
	let current = cursor.node;
	while (current && current !== cursor.end) {
		if (current.nodeType === Node.COMMENT_NODE) {
			current = current.nextSibling;
			continue;
		}
		if (current.nodeType === Node.TEXT_NODE) {
			if ((current.textContent ?? "").trim() === "") {
				current = current.nextSibling;
				continue;
			}
			cursor.node = current;
			return current;
		}
		if (current.nodeType === Node.ELEMENT_NODE) {
			cursor.node = current;
			return current;
		}
		current = current.nextSibling;
	}
	cursor.node = current;
	return null;
}
function advanceMeaningfulChild(from, parent) {
	let current = from;
	while (current && current.parentNode === parent) {
		if (current.nodeType === Node.COMMENT_NODE) {
			current = current.nextSibling;
			continue;
		}
		if (current.nodeType === Node.TEXT_NODE) {
			if ((current.textContent ?? "").trim() === "") {
				current = current.nextSibling;
				continue;
			}
			return {
				node: current,
				found: current
			};
		}
		if (current.nodeType === Node.ELEMENT_NODE) return {
			node: current,
			found: current
		};
		current = current.nextSibling;
	}
	return {
		node: null,
		found: null
	};
}
function hydrateVNodeAgainstDOM(vnode, cursor) {
	if (vnode == null || vnode === false || vnode === true) return;
	if (vnode.__adaptive_text != null) {
		const dom = advanceMeaningfulSibling(cursor);
		if (dom && dom.nodeType === Node.TEXT_NODE) cursor.node = dom.nextSibling;
		return;
	}
	if (typeof vnode.tag === "function") {
		let resolved;
		try {
			resolved = untrack(() => vnode.tag({
				...vnode.props ?? {},
				children: vnode.children ?? []
			}));
		} catch (err) {
			console.error("[inplace] resolve failed", err);
			return;
		}
		for (const child of normalizeVNodeList(resolved)) hydrateVNodeAgainstDOM(child, cursor);
		return;
	}
	if (vnode.tag === "Fragment" || typeof vnode.tag === "symbol") {
		for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOM(child, cursor);
		return;
	}
	if (vnode.tag === CONTEXT_PROVIDER_TAG) {
		runWithContext(vnode.props.context.id, vnode.props.value, () => {
			for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOM(child, cursor);
		});
		return;
	}
	const dom = advanceMeaningfulSibling(cursor);
	if (!dom || dom.nodeType !== Node.ELEMENT_NODE) {
		warnMismatch({
			path: "hydrate.inplace.element",
			message: "SSR DOM element not found",
			expected: String(vnode.tag ?? "?"),
			found: dom ? dom.tagName : "null",
			node: dom ?? void 0
		});
		return;
	}
	const el = dom;
	cursor.node = el.nextSibling;
	if (!HYDRATED_IN_PLACE.has(el)) {
		HYDRATED_IN_PLACE.add(el);
		bindHostPropsInPlace(el, vnode.props ?? {});
	}
	const childCursor = { node: el.firstChild };
	for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOMInside(child, el, childCursor);
}
function hydrateVNodeAgainstDOMInside(vnode, parentEl, cursor) {
	if (vnode == null || vnode === false || vnode === true) return;
	if (vnode.__adaptive_text != null) {
		const { found } = advanceMeaningfulChild(cursor.node, parentEl);
		if (found && found.nodeType === Node.TEXT_NODE) cursor.node = found.nextSibling;
		return;
	}
	if (typeof vnode.tag === "function") {
		let resolved;
		try {
			resolved = untrack(() => vnode.tag({
				...vnode.props ?? {},
				children: vnode.children ?? []
			}));
		} catch {
			return;
		}
		for (const child of normalizeVNodeList(resolved)) hydrateVNodeAgainstDOMInside(child, parentEl, cursor);
		return;
	}
	if (vnode.tag === "Fragment" || typeof vnode.tag === "symbol") {
		for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOMInside(child, parentEl, cursor);
		return;
	}
	if (vnode.tag === CONTEXT_PROVIDER_TAG) {
		runWithContext(vnode.props.context.id, vnode.props.value, () => {
			for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOMInside(child, parentEl, cursor);
		});
		return;
	}
	const { found } = advanceMeaningfulChild(cursor.node, parentEl);
	if (!found || found.nodeType !== Node.ELEMENT_NODE) {
		warnMismatch({
			path: "hydrate.inplace.child",
			message: "SSR child not found",
			expected: String(vnode.tag ?? "?"),
			found: found ? found.tagName : "null",
			node: parentEl
		});
		return;
	}
	const el = found;
	cursor.node = el.nextSibling;
	if (!HYDRATED_IN_PLACE.has(el)) {
		HYDRATED_IN_PLACE.add(el);
		bindHostPropsInPlace(el, vnode.props ?? {});
	}
	const nested = { node: el.firstChild };
	for (const child of normalizeVNodeList(vnode.children ?? [])) hydrateVNodeAgainstDOMInside(child, el, nested);
}
function bindHostPropsInPlace(el, props) {
	const namespace = el.namespaceURI;
	for (const [key, value] of Object.entries(props)) {
		if (key === "children" || key === "client") continue;
		if (key.startsWith("on") && typeof value === "function") {
			bindDelegatedEvent(el, key.slice(2).toLowerCase(), value);
			continue;
		}
		if (key === "ref" && value != null) {
			bindRef(value, el);
			continue;
		}
		if (key === "className") {
			if (typeof value === "function") createReactiveEffect(() => {
				el.setAttribute("class", value() ?? "");
			});
			continue;
		}
		if (key === "style") {
			if (typeof value === "function") createReactiveEffect(() => {
				applyStyleObject?.(el, value());
			});
			else if (typeof value === "object" && value !== null) {
				for (const [styleKey, styleValue] of Object.entries(value)) if (typeof styleValue === "function") createReactiveEffect(() => {
					const resolved = styleValue();
					const cssKey = styleKey.replace(/([A-Z])/g, "-$1").toLowerCase();
					if (resolved == null || resolved === false) el.style.removeProperty(cssKey);
					else el.style[styleKey] = resolved;
				}, "layout");
			}
			continue;
		}
		if (typeof value === "function") createReactiveEffect(() => {
			const resolved = value();
			if (resolved === false || resolved == null) {
				el.removeAttribute(resolveDomAttributeName(key, namespace));
				return;
			}
			if (shouldAssignAsProperty(el, namespace, key)) el[key] = resolved;
			else el.setAttribute(resolveDomAttributeName(key, namespace), String(resolved));
		}, "layout");
	}
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/reactive.js
function isPromiseLike(v) {
	return v != null && typeof v === "object" && typeof v.then === "function";
}
/**
* Extrai assinatura de tipo para vnodes, detectando quando .map() renderiza tipos diferentes de componentes.
* Para detectar mudanças em listas filtradas, também considera o tamanho do array.
*/
function getVNodeTypeSignature(value) {
	if (Array.isArray(value)) {
		if (value.length === 0) return "empty";
		const signatures = value.map((v) => getVNodeTypeSignature(v));
		const unique = new Set(signatures);
		const typeStr = unique.size === 1 ? signatures[0] : Array.from(unique).join("|");
		return `[${value.length}]:${typeStr}`;
	}
	if (value && typeof value === "object" && "tag" in value) {
		const tag = value.tag;
		const key = value.key || value.props?.key;
		const baseType = typeof tag === "function" ? tag.name || "Anon" : typeof tag === "string" ? tag : "Sym";
		if (key) return `${baseType}#${key}`;
		const children = value.children;
		if (children) {
			const childSig = getVNodeTypeSignature(children);
			if (childSig && childSig !== "empty") return `${baseType}(${childSig})`;
		}
		return baseType;
	}
	if (typeof value === "function") return `Fn[${value.name || "?"}]`;
	return typeof value;
}
function findReactiveMarkers(root, id) {
	return findMarkerPairInRoot(root, `${REACTIVE_CHILD_START}:${id}`, `${REACTIVE_CHILD_END}:${id}`);
}
function findReactiveMarkersBetweenMarkers(start, end, id) {
	return findMarkerPairBetweenMarkers(start, end, `${REACTIVE_CHILD_START}:${id}`, `${REACTIVE_CHILD_END}:${id}`);
}
function findReactiveStructMarkers(root, id) {
	return findMarkerPairInRoot(root, `${REACTIVE_STRUCT_START}:${id}`, `${REACTIVE_STRUCT_END}:${id}`);
}
function findReactiveStructMarkersBetweenMarkers(start, end, id) {
	return findMarkerPairBetweenMarkers(start, end, `${REACTIVE_STRUCT_START}:${id}`, `${REACTIVE_STRUCT_END}:${id}`);
}
function findReactiveListMarkers(root, id) {
	return findMarkerPairInRoot(root, `${REACTIVE_LIST_START}:${id}`, `${REACTIVE_LIST_END}:${id}`);
}
function findReactiveListMarkersBetweenMarkers(start, end, id) {
	return findMarkerPairBetweenMarkers(start, end, `${REACTIVE_LIST_START}:${id}`, `${REACTIVE_LIST_END}:${id}`);
}
function findReactiveAsyncMarkers(root, id) {
	return findMarkerPairInRoot(root, `${REACTIVE_ASYNC_START}:${id}`, `${REACTIVE_ASYNC_END}:${id}`);
}
function findReactiveAsyncMarkersBetweenMarkers(start, end, id) {
	return findMarkerPairBetweenMarkers(start, end, `${REACTIVE_ASYNC_START}:${id}`, `${REACTIVE_ASYNC_END}:${id}`);
}
function hydrateReactiveRangeWithMarkers(start, end, instruction) {
	if (!start || !end) {
		warnMismatch({
			path: `hydrate.instruction.reactive-range.${instruction.id}`,
			message: "Reactive range markers not found",
			expected: `<!--${REACTIVE_CHILD_START}:${instruction.id}-->`,
			found: "nothing"
		});
		return;
	}
	const textNode = ensureReactiveTextNodeBetweenMarkers(start, end);
	if (!textNode) return;
	const parent = start.parentNode;
	if (parent) {
		parent.removeChild(start);
		parent.removeChild(end);
	}
	createHydratedReactiveTextBinding(textNode, instruction);
}
function ensureReactiveTextNodeBetweenMarkers(start, end) {
	const nodes = collectSiblingNodesBetween(start, end);
	if (nodes.length === 1 && nodes[0].nodeType === Node.TEXT_NODE) return nodes[0];
	const parent = start.parentNode;
	if (!parent) return null;
	const textNode = document.createTextNode(nodes.map((n) => n.textContent ?? "").join(""));
	parent.insertBefore(textNode, end);
	nodes.forEach((n) => parent.removeChild(n));
	return textNode;
}
function createHydratedReactiveTextBinding(textNode, instruction) {
	debugHydrationLog("[hydrate:range:bind]", instruction.id, textNode.data);
	let firstRun = true;
	createReactiveEffect(() => {
		const nextText = normalizeReactiveTextValue(instruction.getter());
		debugHydrationLog("[hydrate:range:run]", instruction.id, nextText);
		if (firstRun && textNode.data !== nextText) warnMismatch({
			path: `hydrate.instruction.reactive-range.${instruction.id}`,
			message: "SSR text mismatch",
			expected: nextText,
			found: textNode.data,
			node: textNode
		});
		firstRun = false;
		textNode.data = nextText;
	});
}
function normalizeReactiveTextValue(value) {
	if (value == null || value === false) return "";
	if (Array.isArray(value)) return value.map((i) => normalizeReactiveTextValue(i)).join("");
	return String(value);
}
function hydrateReactiveStructWithMarkers(start, end, instruction) {
	hydrateReactiveContentWithMarkers(start, end, {
		id: instruction.id,
		kind: "reactive-struct",
		getter: instruction.render
	});
}
function hydrateReactiveListWithMarkers(start, end, instruction) {
	hydrateReactiveContentWithMarkers(start, end, {
		id: instruction.id,
		kind: "reactive-list",
		getter: instruction.getter
	});
}
function hydrateReactiveAsyncWithMarkers(start, end, instruction) {
	hydrateReactiveContentWithMarkers(start, end, {
		id: instruction.id,
		kind: "reactive-async",
		getter: instruction.getter
	});
}
function hydrateReactiveContentWithMarkers(start, end, config) {
	if (!start || !end) {
		warnMismatch({
			path: `hydrate.instruction.${config.kind}.${config.id}`,
			message: "Reactive markers not found",
			expected: `markers for ${config.kind}:${config.id}`,
			found: "nothing"
		});
		return;
	}
	const parent = start.parentNode;
	if (!parent) return;
	const startAnchor = document.createTextNode("");
	const endAnchor = document.createTextNode("");
	parent.replaceChild(startAnchor, start);
	parent.replaceChild(endAnchor, end);
	let initialized = false;
	let pendingToken = 0;
	let currentScope = null;
	let currentKey = void 0;
	let currentTypeSig = void 0;
	createReactiveEffect(() => {
		const nextValue = config.getter();
		const currentToken = ++pendingToken;
		const nextKey = getVNodeKey(nextValue);
		const nextTypeSig = config.kind === "reactive-list" ? getVNodeTypeSignature(nextValue) : void 0;
		if (!initialized) {
			initialized = true;
			currentKey = nextKey;
			currentTypeSig = nextTypeSig;
			if (isPromiseLike(nextValue)) {
				nextValue.then((resolved) => {
					if (currentToken !== pendingToken) return;
					if (currentScope) {
						cleanupEffectScope(currentScope);
						currentScope = null;
					}
					currentScope = createEffectScope("hydrate-range");
					currentKey = getVNodeKey(resolved);
					currentTypeSig = getVNodeTypeSignature(resolved);
					replaceReactiveRangeContent(startAnchor, endAnchor, resolved, currentScope);
				});
				return;
			}
			currentScope = createEffectScope("hydrate-range");
			if (config.kind === "reactive-list") replaceReactiveRangeContent(startAnchor, endAnchor, nextValue, currentScope);
			else runWithEffectScope(currentScope, () => {
				hydrateExistingReactiveContent(startAnchor, endAnchor, nextValue);
			});
			return;
		}
		const keyUnchanged = nextKey != null && currentKey != null && Object.is(nextKey, currentKey);
		const typeUnchanged = config.kind === "reactive-list" ? nextTypeSig === currentTypeSig : true;
		if (keyUnchanged && typeUnchanged) return;
		if (isPromiseLike(nextValue)) {
			nextValue.then((resolved) => {
				if (currentToken !== pendingToken) return;
				const resolvedKey = getVNodeKey(resolved);
				const resolvedTypeSig = getVNodeTypeSignature(resolved);
				if (resolvedKey != null && currentKey != null && Object.is(resolvedKey, currentKey) && resolvedTypeSig === currentTypeSig) return;
				if (currentScope) {
					cleanupEffectScope(currentScope);
					currentScope = null;
				}
				currentScope = createEffectScope("hydrate-range");
				currentKey = resolvedKey;
				currentTypeSig = resolvedTypeSig;
				replaceReactiveRangeContent(startAnchor, endAnchor, resolved, currentScope);
			});
			return;
		}
		if (currentScope) {
			cleanupEffectScope(currentScope);
			currentScope = null;
		}
		currentScope = createEffectScope("hydrate-range");
		currentKey = nextKey;
		currentTypeSig = nextTypeSig;
		replaceReactiveRangeContent(startAnchor, endAnchor, nextValue, currentScope);
	});
}
function replaceReactiveRangeContent(start, end, value, scope) {
	const parent = start.parentNode;
	if (!parent) return;
	let current = start.nextSibling;
	while (current && current !== end) {
		const next = current.nextSibling;
		parent.removeChild(current);
		current = next;
	}
	const insert = () => {
		normalizeToNodes(value).forEach((node) => {
			parent.insertBefore(node, end);
		});
	};
	if (scope) runWithEffectScope(scope, insert);
	else insert();
}
function normalizeToNodes(value) {
	if (value == null || value === false) return [];
	if (Array.isArray(value)) return value.flatMap((item) => normalizeToNodes(item));
	if (value instanceof Node) return [value];
	if (typeof value === "function") return normalizeToNodes(value());
	if (typeof value === "object" && value !== null && "tag" in value) try {
		const frag = renderToDOM(value, null);
		if (frag instanceof DocumentFragment) return Array.from(frag.childNodes);
		return [frag];
	} catch {
		return [];
	}
	return [document.createTextNode(String(value))];
}
function hydrateExistingReactiveContent(start, end, value) {
	const cursor = {
		node: start.nextSibling,
		end,
		parent: start.parentNode
	};
	for (const vnode of normalizeVNodeList(value)) hydrateVNodeAgainstDOM(vnode, cursor);
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/instructions.js
function groupHydrationInstructions(instructions) {
	const grouped = {
		events: [],
		refs: [],
		reactiveRanges: [],
		reactiveStructs: [],
		reactiveLists: [],
		reactiveAsyncs: [],
		dynamicProps: [],
		layoutEffects: [],
		effects: []
	};
	for (const instruction of instructions) switch (instruction.kind) {
		case "event":
			grouped.events.push(instruction);
			break;
		case "ref":
			grouped.refs.push(instruction);
			break;
		case "reactive-range":
			grouped.reactiveRanges.push(instruction);
			break;
		case "reactive-struct":
			grouped.reactiveStructs.push(instruction);
			break;
		case "reactive-list":
			grouped.reactiveLists.push(instruction);
			break;
		case "reactive-async":
			grouped.reactiveAsyncs.push(instruction);
			break;
		case "dynamic-prop":
			grouped.dynamicProps.push(instruction);
			break;
		case "layout-effect":
			grouped.layoutEffects.push(instruction);
			break;
		case "effect": grouped.effects.push(instruction);
	}
	return grouped;
}
function runCollectedEffect(instruction, type) {
	createReactiveEffect(() => {
		return instruction.effect();
	}, type);
}
function applyHydrationInstructions(root, instructions) {
	const ordered = groupHydrationInstructions(instructions);
	ordered.events.forEach((instruction) => {
		const element = findHydrationElement(root, instruction.id);
		if (!element) {
			warnHydrationInstructionMissing(root, instruction.kind, instruction.id);
			return;
		}
		debugHydrationLog("[hydrate:event:bind]", instruction.id, instruction.event, element.tagName);
		bindDelegatedEvent(element, instruction.event, wrapHydrationEventHandler(instruction.id, instruction.event, instruction.handler));
	});
	ordered.refs.forEach((instruction) => {
		const element = findHydrationElement(root, instruction.id);
		if (!element) {
			warnHydrationInstructionMissing(root, instruction.kind, instruction.id);
			return;
		}
		bindRef(instruction.ref, element);
	});
	ordered.reactiveRanges.forEach((instruction) => {
		const markers = findReactiveMarkers(root, instruction.id);
		hydrateReactiveRangeWithMarkers(markers.start, markers.end, instruction);
	});
	ordered.reactiveStructs.forEach((instruction) => {
		const markers = findReactiveStructMarkers(root, instruction.id);
		hydrateReactiveStructWithMarkers(markers.start, markers.end, instruction);
	});
	ordered.reactiveLists.forEach((instruction) => {
		const markers = findReactiveListMarkers(root, instruction.id);
		hydrateReactiveListWithMarkers(markers.start, markers.end, instruction);
	});
	ordered.reactiveAsyncs.forEach((instruction) => {
		const markers = findReactiveAsyncMarkers(root, instruction.id);
		hydrateReactiveAsyncWithMarkers(markers.start, markers.end, instruction);
	});
	ordered.dynamicProps.forEach((instruction) => {
		const element = findHydrationElement(root, instruction.id);
		if (!element) {
			warnHydrationInstructionMissing(root, instruction.kind, instruction.id);
			return;
		}
		hydrateDynamicProp(element, instruction);
	});
	ordered.layoutEffects.forEach((instruction) => {
		runCollectedEffect(instruction, "layout");
	});
	ordered.effects.forEach((instruction) => {
		runCollectedEffect(instruction, "effect");
	});
}
function applyHydrationInstructionsBetweenMarkers(start, end, instructions) {
	const ordered = groupHydrationInstructions(instructions);
	ordered.events.forEach((instruction) => {
		const element = findHydrationElementBetweenMarkers(start, end, instruction.id);
		if (!element) {
			warnHydrationInstructionMissing(start.parentNode, instruction.kind, instruction.id);
			return;
		}
		bindDelegatedEvent(element, instruction.event, wrapHydrationEventHandler(instruction.id, instruction.event, instruction.handler));
	});
	ordered.refs.forEach((instruction) => {
		const element = findHydrationElementBetweenMarkers(start, end, instruction.id);
		if (!element) {
			warnHydrationInstructionMissing(start.parentNode, instruction.kind, instruction.id);
			return;
		}
		bindRef(instruction.ref, element);
	});
	ordered.reactiveRanges.forEach((instruction) => {
		const markers = findReactiveMarkersBetweenMarkers(start, end, instruction.id);
		hydrateReactiveRangeWithMarkers(markers.start, markers.end, instruction);
	});
	ordered.reactiveStructs.forEach((instruction) => {
		const markers = findReactiveStructMarkersBetweenMarkers(start, end, instruction.id);
		hydrateReactiveStructWithMarkers(markers.start, markers.end, instruction);
	});
	ordered.reactiveLists.forEach((instruction) => {
		const markers = findReactiveListMarkersBetweenMarkers(start, end, instruction.id);
		hydrateReactiveListWithMarkers(markers.start, markers.end, instruction);
	});
	ordered.reactiveAsyncs.forEach((instruction) => {
		const markers = findReactiveAsyncMarkersBetweenMarkers(start, end, instruction.id);
		hydrateReactiveAsyncWithMarkers(markers.start, markers.end, instruction);
	});
	ordered.dynamicProps.forEach((instruction) => {
		const element = findHydrationElementBetweenMarkers(start, end, instruction.id);
		if (!element) {
			warnHydrationInstructionMissing(start.parentNode, instruction.kind, instruction.id);
			return;
		}
		hydrateDynamicProp(element, instruction);
	});
	ordered.layoutEffects.forEach((instruction) => {
		runCollectedEffect(instruction, "layout");
	});
	ordered.effects.forEach((instruction) => {
		runCollectedEffect(instruction, "effect");
	});
}

//#endregion
//#region ../../packages/web/dist/hy/hydrate/cleanup.js
function cleanupAdaptiveMarkersAfterSuccess(root) {
	cleanupAdaptiveMarkersInNode(root, { boundaryRoot: root });
}
function cleanupAdaptiveMarkersInNode(root, opts) {
	let current = root.firstChild;
	while (current) {
		const next = current.nextSibling;
		if (isClientBoundaryStartComment(current)) {
			const end = findMatchingMarkerEnd(root, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
			current = end ? end.nextSibling : next;
			continue;
		}
		if (current.nodeType === Node.COMMENT_NODE && isSafeToRemoveAdaptiveComment(current)) current.remove();
		else if (current.nodeType === Node.ELEMENT_NODE || current.nodeType === Node.DOCUMENT_FRAGMENT_NODE) cleanupAdaptiveMarkersInNode(current, opts);
		current = next;
	}
}
function cleanupAdaptiveMarkersAfterSuccessBetweenMarkers(start, end) {
	const retained = collectSiblingNodesBetween(start, end).filter((n) => n.nodeType !== Node.COMMENT_NODE);
	retained.forEach((node) => {
		if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) cleanupAdaptiveMarkersInNode(node);
	});
	let current = start.nextSibling;
	while (current && current !== end) {
		const next = current.nextSibling;
		if (isClientBoundaryStartComment(current)) {
			const boundaryEnd = findMatchingMarkerEnd(start.parentNode, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
			current = boundaryEnd ? boundaryEnd.nextSibling : next;
			continue;
		}
		if (isSafeToRemoveAdaptiveComment(current)) current.remove();
		current = next;
	}
	if (isAdaptiveBoundaryComment(start)) start.remove();
	if (isAdaptiveBoundaryComment(end)) end.remove();
	return retained.filter((n) => n.isConnected);
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/discovery.js
function findCommentBoundaries(moduleId) {
	const boundaries = [];
	const walker = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT);
	const stack = [];
	let current = walker.nextNode();
	while (current) {
		const comment = current;
		const content = comment.data ?? "";
		if (content.startsWith("adaptive-client-start:")) {
			const payload = decodeCommentPayload(content.slice(CLIENT_BOUNDARY_START_PREFIX.length));
			if (payload) stack.push({
				start: comment,
				mode: payload.mode,
				moduleId: payload.moduleId,
				exportName: payload.exportName,
				rawProps: payload.rawProps,
				hasChildren: payload.hasChildren,
				boundaryId: payload.boundaryId
			});
		} else if (content === "adaptive-client-end") {
			const boundary = stack.pop();
			if (boundary && boundary.moduleId === moduleId) boundaries.push({
				...boundary,
				end: comment
			});
		}
		current = walker.nextNode();
	}
	return boundaries;
}
function decodeCommentPayload(raw) {
	try {
		return JSON.parse(decodeURIComponent(raw));
	} catch {
		return null;
	}
}
function readHydrationManifestFromRoot(root, boundaryId = "") {
	let current = root.firstChild;
	while (current) {
		if (current.nodeType === Node.COMMENT_NODE && current.data.startsWith("adaptive-client-start:")) {
			current = skipNestedBoundary(current, root, root);
			continue;
		}
		if (current.nodeType === Node.ELEMENT_NODE && current.tagName === "SCRIPT" && current.hasAttribute("data-adaptive-hydration-manifest")) {
			const script = current;
			const candidate = script.getAttribute("data-adaptive-boundary-id") ?? "";
			if (!boundaryId || candidate === boundaryId) {
				const manifest = parseHydrationManifest(script.textContent ?? "");
				if (manifest) return {
					script,
					manifest
				};
			}
		}
		current = current.nextSibling;
	}
	return null;
}
function readHydrationManifestBetweenMarkers(start, end, boundaryId = "") {
	let current = start.nextSibling;
	const parent = start.parentNode;
	while (current && current !== end) {
		if (current.nodeType === Node.COMMENT_NODE && current.data.startsWith("adaptive-client-start:")) {
			current = skipNestedBoundary(current, parent, end);
			continue;
		}
		if (current.nodeType === Node.ELEMENT_NODE && current.tagName === "SCRIPT" && current.hasAttribute("data-adaptive-hydration-manifest")) {
			const script = current;
			const candidate = script.getAttribute("data-adaptive-boundary-id") ?? "";
			if (!boundaryId || candidate === boundaryId) {
				const manifest = parseHydrationManifest(script.textContent ?? "");
				if (manifest) return {
					script,
					manifest
				};
			}
		}
		current = current.nextSibling;
	}
	return null;
}
function parseHydrationManifest(raw) {
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function skipNestedBoundary(current, parent, end) {
	const boundaryEnd = findMatchingMarkerEnd(parent, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
	return boundaryEnd ? boundaryEnd.nextSibling : end;
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/collect.js
function describeComponent(state, tag) {
	const name = typeof tag === "function" ? tag.name || "anon" : String(tag);
	return state.currentModuleId ? `${state.currentModuleId}:${name}` : name;
}
function describeBindingOrigin(state, propKey) {
	const chain = state.componentPath.length > 0 ? state.componentPath.join(" > ") : "(raiz do boundary)";
	return propKey ? `${chain} :: ${propKey}` : chain;
}
function resolveComponentProps(node) {
	const props = { ...node.props ?? {} };
	const children = node.children ?? node.props?.children;
	if (children != null) props.children = children;
	return props;
}
function resolveInstructionKey(kind, index) {
	switch (kind) {
		case "event": return `e${index}`;
		case "ref": return `f${index}`;
		case "reactive": return `rx${index}`;
		case "dynamicProp": return `p${index}`;
	}
}
function nextInstructionKey(state, kind) {
	const v = state.counters[kind];
	state.counters[kind] += 1;
	return resolveInstructionKey(kind, v);
}
function collectHydrationBindings(Component, props, moduleId) {
	if (typeof Component !== "function") return {
		events: /* @__PURE__ */ new Map(),
		refs: /* @__PURE__ */ new Map(),
		reactive: /* @__PURE__ */ new Map(),
		dynamicProps: /* @__PURE__ */ new Map(),
		layoutEffects: [],
		effects: [],
		unsupportedFeatures: [],
		paths: /* @__PURE__ */ new Map()
	};
	const collected = runHydrationCollection(() => {
		const bindings = {
			events: /* @__PURE__ */ new Map(),
			refs: /* @__PURE__ */ new Map(),
			reactive: /* @__PURE__ */ new Map(),
			dynamicProps: /* @__PURE__ */ new Map(),
			counters: {
				event: 0,
				ref: 0,
				reactive: 0,
				dynamicProp: 0
			},
			unsupportedFeatures: /* @__PURE__ */ new Set(),
			paths: /* @__PURE__ */ new Map(),
			componentPath: [],
			currentModuleId: moduleId
		};
		collectFromNode(createElement(Component, props ?? {}), bindings);
		return {
			...bindings,
			unsupportedFeatures: Array.from(bindings.unsupportedFeatures)
		};
	});
	return {
		events: collected.value.events,
		refs: collected.value.refs,
		reactive: collected.value.reactive,
		dynamicProps: collected.value.dynamicProps,
		layoutEffects: collected.effectInstructions.filter((i) => i.kind === "layout-effect").map((i) => ({
			effect: i.effect,
			deps: i.deps,
			ignoredSources: i.ignoredSources
		})),
		effects: collected.effectInstructions.filter((i) => i.kind === "effect").map((i) => ({
			effect: i.effect,
			deps: i.deps,
			ignoredSources: i.ignoredSources
		})),
		unsupportedFeatures: Array.from(/* @__PURE__ */ new Set([...collected.unsupportedFeatures, ...collected.value.unsupportedFeatures])),
		paths: collected.value.paths
	};
}
function collectFromNode(node, state) {
	if (node == null || node === false || typeof node === "string" || typeof node === "number" || typeof node === "boolean") return;
	if (typeof node === "function") {
		const key = nextInstructionKey(state, "reactive");
		state.reactive.set(key, node);
		state.paths.set(key, describeBindingOrigin(state));
		return;
	}
	if (Array.isArray(node)) {
		for (const c of node) collectFromNode(c, state);
		return;
	}
	if (node.tag === CONTEXT_PROVIDER_TAG) {
		runWithContext(node.props.context.id, node.props.value, () => {
			collectFromNode(node.children ?? [], state);
		});
		return;
	}
	if (typeof node.tag === "function") {
		if (getClientComponentMetadata(node.tag) && state.componentPath.length > 0) return;
		state.componentPath.push(describeComponent(state, node.tag));
		try {
			collectFromNode(untrack(() => node.tag(resolveComponentProps(node))), state);
		} finally {
			state.componentPath.pop();
		}
		return;
	}
	if (node.tag === "Fragment" || typeof node.tag === "symbol") {
		collectFromNode(node.children ?? [], state);
		return;
	}
	if (isHydrateSlotTag(node.tag) || isClientBoundaryTag(node.tag)) return;
	const props = node.props ?? {};
	for (const [key, value] of Object.entries(props)) {
		if (key.startsWith("on") && typeof value === "function") {
			const k = nextInstructionKey(state, "event");
			state.events.set(k, {
				event: key.slice(2).toLowerCase(),
				handler: value
			});
			state.paths.set(k, describeBindingOrigin(state, key));
			continue;
		}
		if (key === "ref" && value != null) {
			const k = nextInstructionKey(state, "ref");
			state.refs.set(k, value);
			state.paths.set(k, describeBindingOrigin(state));
			continue;
		}
		if (key !== "children" && key !== "ref" && typeof value === "function" && isSupportedDynamicHydrationPropName(key)) {
			const k = nextInstructionKey(state, "dynamicProp");
			state.dynamicProps.set(k, {
				prop: key,
				getter: value
			});
			state.paths.set(k, describeBindingOrigin(state, key));
			continue;
		}
		if (!key.startsWith("on") && key !== "children" && key !== "ref" && typeof value === "function" && !isSupportedDynamicHydrationPropName(key)) state.unsupportedFeatures.add(`dynamic-prop:${key}`);
	}
	collectFromNode(node.children ?? [], state);
}
function describeCollectedOrigin(collected, key) {
	const paths = collected?.paths;
	return paths instanceof Map ? paths.get(key) : void 0;
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/bind.js
function bindHydrationManifest(manifest, collected) {
	const origin = (key) => describeCollectedOrigin(collected, key);
	const withOrigin = (feature, keys) => keys.length > 0 ? `${feature} [${keys.map((k) => `${k}@${origin(k) ?? "?"}`).join(", ")}]` : feature;
	const instructions = [];
	const unsupported = new Set(collected.unsupportedFeatures);
	const events = new Map(collected.events);
	const refs = new Map(collected.refs);
	const reactive = new Map(collected.reactive);
	const dynamicProps = new Map(collected.dynamicProps);
	for (const ins of manifest.instructions) switch (ins.kind) {
		case "event": {
			const next = events.get(ins.key);
			if (!next) {
				unsupported.add(`manifest:event:${ins.key}:${ins.id}`);
				break;
			}
			events.delete(ins.key);
			if (next.event !== ins.event) {
				unsupported.add(`manifest:event-event:${ins.key}:${ins.id}:${ins.event}!=${next.event}`);
				break;
			}
			instructions.push({
				kind: "event",
				id: ins.id,
				event: ins.event,
				handler: next.handler
			});
			break;
		}
		case "ref": {
			const next = refs.get(ins.key);
			if (next == null) {
				unsupported.add(`manifest:ref:${ins.key}:${ins.id}`);
				break;
			}
			refs.delete(ins.key);
			instructions.push({
				kind: "ref",
				id: ins.id,
				ref: next
			});
			break;
		}
		case "reactive-range": {
			const next = reactive.get(ins.key);
			if (!next) {
				unsupported.add(`manifest:reactive-range:${ins.key}:${ins.id}`);
				break;
			}
			reactive.delete(ins.key);
			instructions.push({
				kind: "reactive-range",
				id: ins.id,
				getter: next
			});
			break;
		}
		case "reactive-struct": {
			const next = reactive.get(ins.key);
			if (!next) {
				unsupported.add(`manifest:reactive-struct:${ins.key}:${ins.id}`);
				break;
			}
			reactive.delete(ins.key);
			instructions.push({
				kind: "reactive-struct",
				id: ins.id,
				render: next
			});
			break;
		}
		case "reactive-list": {
			const next = reactive.get(ins.key);
			if (!next) {
				unsupported.add(`manifest:reactive-list:${ins.key}:${ins.id}`);
				break;
			}
			reactive.delete(ins.key);
			instructions.push({
				kind: "reactive-list",
				id: ins.id,
				getter: next
			});
			break;
		}
		case "reactive-async": {
			const next = reactive.get(ins.key);
			if (!next) {
				unsupported.add(`manifest:reactive-async:${ins.key}:${ins.id}`);
				break;
			}
			reactive.delete(ins.key);
			instructions.push({
				kind: "reactive-async",
				id: ins.id,
				getter: next
			});
			break;
		}
		case "dynamic-prop": {
			const next = dynamicProps.get(ins.key);
			if (!next) {
				unsupported.add(`manifest:dynamic-prop:${ins.key}:${ins.id}:${ins.prop}`);
				break;
			}
			dynamicProps.delete(ins.key);
			if (next.prop !== ins.prop) {
				unsupported.add(`manifest:dynamic-prop-prop:${ins.key}:${ins.id}:${ins.prop}!=${next.prop}`);
				break;
			}
			instructions.push({
				kind: "dynamic-prop",
				id: ins.id,
				prop: ins.prop,
				getter: next.getter
			});
			break;
		}
	}
	if (events.size > 0) unsupported.add(withOrigin(`manifest:event:extra:${Array.from(events.keys()).join(",")}`, Array.from(events.keys())));
	if (refs.size > 0) unsupported.add(withOrigin(`manifest:ref:extra:${Array.from(refs.keys()).join(",")}`, Array.from(refs.keys())));
	if (reactive.size > 0) unsupported.add(withOrigin(`manifest:reactive:extra:${Array.from(reactive.keys()).join(",")}`, Array.from(reactive.keys())));
	if (dynamicProps.size > 0) unsupported.add(withOrigin(`manifest:dynamic-prop:extra:${Array.from(dynamicProps.keys()).join(",")}`, Array.from(dynamicProps.keys())));
	instructions.push(...collected.layoutEffects.map((i) => ({
		kind: "layout-effect",
		effect: i.effect,
		deps: i.deps,
		ignoredSources: i.ignoredSources
	})), ...collected.effects.map((i) => ({
		kind: "effect",
		effect: i.effect,
		deps: i.deps,
		ignoredSources: i.ignoredSources
	})));
	return {
		instructions,
		unsupportedFeatures: Array.from(unsupported)
	};
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/debug.js
function formatHydrationMismatchReport(config) {
	return `[mismatch] ${config.debugName} ${config.boundaryId ?? ""} ${config.unsupportedFeatures?.join(", ") ?? ""}`;
}
function dumpBoundaryHtmlForDebug(_) {
	if (globalThis?.process?.env?.ADAPTIVE_PUBLIC_DEBUG_HYDRATION === "true") console.warn("[dump]", _.debugName);
}
function captureBoundaryHtmlSnippet(root, len = 400) {
	return root ? root.outerHTML.slice(0, len) : "";
}
function captureMismatchSnippet(_) {
	return null;
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/registry.js
const clientBoundaryScopes = /* @__PURE__ */ new Map();
let mountedClientBoundaries = /* @__PURE__ */ new WeakSet();
function resetMountedBoundaries() {
	mountedClientBoundaries = /* @__PURE__ */ new WeakSet();
}
const registeredHydrationModules = /* @__PURE__ */ new Map();
const boundaryHydrationNotices = /* @__PURE__ */ new Set();
function cleanupDisconnectedClientComponentScopes() {
	for (const [node, record] of clientBoundaryScopes.entries()) if (!record.isConnected()) clientBoundaryScopes.delete(node);
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/hydration-trace.js
/** Uma linha por binding coletado no client, na ordem em que a coleta andou. */
function summarizeCollected(collected) {
	const origin = (key) => describeCollectedOrigin(collected, key) ?? "(sem origem)";
	const rows = [];
	for (const [key, v] of collected.events ?? []) rows.push({
		key,
		kind: "event",
		detail: v.event,
		origin: origin(key)
	});
	for (const [key, v] of collected.dynamicProps ?? []) rows.push({
		key,
		kind: "dynamic-prop",
		detail: v.prop,
		origin: origin(key)
	});
	for (const [key] of collected.reactive ?? []) rows.push({
		key,
		kind: "reactive",
		detail: "",
		origin: origin(key)
	});
	for (const [key] of collected.refs ?? []) rows.push({
		key,
		kind: "ref",
		detail: "",
		origin: origin(key)
	});
	return rows;
}
function traceHydrationMismatch(input) {
	var _window;
	if (typeof window === "undefined") return;
	const rows = summarizeCollected(input.collected);
	const entry = {
		at: Math.round(performance.now()),
		readyState: document.readyState,
		debugName: input.debugName,
		boundaryId: input.boundaryId,
		variant: input.variant,
		rootMode: typeof input.component === "function" ? getClientComponentMetadata(input.component)?.mode ?? null : null,
		manifestFound: input.manifest != null,
		collectedCount: rows.length,
		unsupportedFeatures: [...input.unsupportedFeatures],
		manifest: input.manifest,
		collected: rows,
		stack: (/* @__PURE__ */ new Error("hydration mismatch")).stack
	};
	const log = (_window = window).__ADAPTIVE_HYDRATION_TRACE__ ?? (_window.__ADAPTIVE_HYDRATION_TRACE__ = []);
	log.push(entry);
	if (log.length > 50) log.shift();
	console.groupCollapsed(`[Adaptive Hydration] ${entry.debugName} (${entry.boundaryId ?? "?"}) — ${entry.unsupportedFeatures.length} divergências, ${entry.collectedCount} bindings coletados no client`);
	console.log("rootMode:", entry.rootMode, "| manifest encontrado:", entry.manifestFound, "| readyState:", entry.readyState, "| t =", entry.at, "ms");
	console.log("divergências (completas):", entry.unsupportedFeatures);
	console.log("coletado no client:");
	console.table(rows);
	console.log("manifest vindo do server:", input.manifest);
	console.log(entry.stack);
	console.groupEnd();
	return entry;
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/hydrate.js
function getBoundaryDebugName(Component) {
	return Component?.name || "anonymous";
}
function onlyUnlocatableFeatures(features) {
	return features.length > 0 && features.every((f) => f.includes(":extra:"));
}
function recordBoundaryHydrationNotice(debugName, report, snippet) {
	const key = `${debugName}:${snippet.slice(0, 80)}`;
	if (boundaryHydrationNotices.has(key)) return;
	boundaryHydrationNotices.add(key);
	console.warn(`[Adaptive Hydration] mismatch in ${debugName}\n${report}\n${snippet}`);
}
function adoptExistingBoundary(config) {
	const nodes = config.snapshot();
	if (config.unsupportedFeatures.length > 0) {
		const report = formatHydrationMismatchReport({
			debugName: config.debugName,
			boundaryId: config.boundaryId,
			unsupportedFeatures: config.unsupportedFeatures
		});
		const mismatch = captureMismatchSnippet({
			nodes,
			unsupportedFeatures: config.unsupportedFeatures
		});
		const rootElement = nodes.find((n) => n.nodeType === 1);
		const snippet = mismatch ? `[data-aid="${mismatch.targetId}"] ${mismatch.domPath}\n${mismatch.html}` : onlyUnlocatableFeatures(config.unsupportedFeatures) ? `[sem data-aid]` : `[raiz ${config.boundaryId ?? "?"}]\n${captureBoundaryHtmlSnippet(rootElement, 400)}`;
		recordBoundaryHydrationNotice(config.debugName, report, snippet);
		dumpBoundaryHtmlForDebug({
			debugName: config.debugName,
			boundaryId: config.boundaryId,
			report,
			nodes
		});
	}
	return nodes;
}
function isEmptyCollect(c) {
	return c.events.size === 0 && c.refs.size === 0 && c.reactive.size === 0 && c.dynamicProps.size === 0 && c.effects.length === 0 && c.layoutEffects.length === 0;
}
function hydrateExistingBoundary(root, config) {
	const manifestRecord = readHydrationManifestFromRoot(root, config.boundaryId);
	const collected = collectHydrationBindings(config.component, config.props, config.boundaryId);
	const bound = manifestRecord ? bindHydrationManifest(manifestRecord.manifest, collected) : isEmptyCollect(collected) ? {
		instructions: [],
		unsupportedFeatures: []
	} : {
		instructions: [],
		unsupportedFeatures: ["manifest:missing"]
	};
	const instructions = config.instructions ?? bound.instructions;
	if (bound.unsupportedFeatures.length === 0) {
		applyHydrationInstructions(root, instructions);
		flushEvents();
		manifestRecord?.script.remove();
		cleanupAdaptiveMarkersAfterSuccess(root);
		return Array.from(root.childNodes);
	}
	traceHydrationMismatch({
		debugName: config.debugName,
		boundaryId: config.boundaryId,
		component: config.component,
		manifest: manifestRecord?.manifest ?? null,
		collected,
		unsupportedFeatures: bound.unsupportedFeatures,
		variant: "root"
	});
	const res = adoptExistingBoundary({
		debugName: config.debugName,
		instructions,
		unsupportedFeatures: bound.unsupportedFeatures,
		snapshot: () => Array.from(root.childNodes)
	});
	queueMicrotask(() => {
		cleanupAdaptiveMarkersAfterSuccess(root);
	});
	return res;
}
function hydrateExistingBoundaryBetweenMarkers(start, end, config) {
	const manifestRecord = readHydrationManifestBetweenMarkers(start, end, config.boundaryId);
	const collected = collectHydrationBindings(config.component, config.props, config.boundaryId);
	const bound = manifestRecord ? bindHydrationManifest(manifestRecord.manifest, collected) : isEmptyCollect(collected) ? {
		instructions: [],
		unsupportedFeatures: []
	} : {
		instructions: [],
		unsupportedFeatures: ["manifest:missing"]
	};
	const instructions = config.instructions ?? bound.instructions;
	if (bound.unsupportedFeatures.length === 0) {
		applyHydrationInstructionsBetweenMarkers(start, end, instructions);
		flushEvents();
		manifestRecord?.script.remove();
		return cleanupAdaptiveMarkersAfterSuccessBetweenMarkers(start, end);
	}
	traceHydrationMismatch({
		debugName: config.debugName,
		boundaryId: config.boundaryId,
		component: config.component,
		manifest: manifestRecord?.manifest ?? null,
		collected,
		unsupportedFeatures: bound.unsupportedFeatures,
		variant: "root"
	});
	const res = adoptExistingBoundary({
		debugName: config.debugName,
		instructions,
		unsupportedFeatures: bound.unsupportedFeatures,
		snapshot: () => collectSiblingNodesBetween(start, end)
	});
	queueMicrotask(() => {
		cleanupAdaptiveMarkersAfterSuccessBetweenMarkers(start, end);
	});
	return res;
}
function hydrateExistingComponent(root, Component, props, boundaryId = "") {
	return hydrateExistingBoundary(root, {
		debugName: getBoundaryDebugName(Component),
		component: Component,
		props,
		boundaryId
	});
}
function hydrateExistingComponentBetweenMarkers(start, end, Component, props, boundaryId = "") {
	return hydrateExistingBoundaryBetweenMarkers(start, end, {
		debugName: getBoundaryDebugName(Component),
		component: Component,
		props,
		boundaryId
	});
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/props-serialization.js
function reviveValue(value) {
	if (Array.isArray(value)) return value.map((i) => reviveValue(i));
	if (!value || typeof value !== "object") return value;
	if (value.__adaptive_type === "date") return new Date(value.value);
	if (value.__adaptive_type === "bigint") return BigInt(value.value);
	if (value.__adaptive_type === "unsupported" || value.__adaptive_type === "circular") return void 0;
	const out = {};
	for (const [k, v] of Object.entries(value)) {
		const revived = reviveValue(v);
		if (revived !== void 0) out[k] = revived;
	}
	return out;
}
function parseClientProps(raw) {
	try {
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? reviveValue(parsed) : {};
	} catch {
		return {};
	}
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/cleanup.js
function cleanupClientBoundaryAttributes(node) {
	node.removeAttribute("data-adaptive-client-mode");
	node.removeAttribute("data-adaptive-client-module");
	node.removeAttribute("data-adaptive-client-export");
	node.removeAttribute("data-adaptive-client-props");
	node.removeAttribute("data-adaptive-client-has-children");
	node.removeAttribute("data-adaptive-client-mounted");
}
function cssEscape(value) {
	if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
	return value.replace(/["\\]/g, "\\$&");
}

//#endregion
//#region ../../packages/web/dist/front/handler-scope.js
let isDispatchingHandler = false;
let currentHandlerScope = null;
let nextHandlerScopeId = 1;
const handlers = /* @__PURE__ */ new Map();
function createHandlerScope(label) {
	return {
		id: nextHandlerScopeId++,
		label,
		handlers: /* @__PURE__ */ new Map()
	};
}
function runWithHandlerScope(scope, fn) {
	const previous = currentHandlerScope;
	currentHandlerScope = scope;
	try {
		return fn();
	} finally {
		currentHandlerScope = previous;
	}
}
function cleanupHandlerScope(scope) {
	for (const id of scope.handlers.keys()) {
		const group = handlers.get(id);
		if (group) {
			group.delete(scope.id);
			if (group.size === 0) handlers.delete(id);
		}
	}
	scope.handlers.clear();
}
function useHandler(id) {
	return (payload) => {
		const group = handlers.get(id);
		if (!group || group.size === 0) return;
		isDispatchingHandler = true;
		try {
			for (const callback of [...group.values()]) callback(payload);
		} finally {
			isDispatchingHandler = false;
		}
	};
}

//#endregion
//#region ../../packages/web/dist/front/router.js
var RouterState = class {
	constructor() {
		_defineProperty(this, "pathnameObserver", new AdaptiveObserver(this.getInitialPathname()));
		_defineProperty(this, "queryObserver", new AdaptiveObserver(this.getInitialQuery()));
		_defineProperty(this, "paramsObserver", new AdaptiveObserver(this.getInitialParams()));
		_defineProperty(this, "hashObserver", new AdaptiveObserver(this.getInitialHash()));
		_defineProperty(this, "urlObserver", new AdaptiveObserver(this.getInitialUrl()));
		_defineProperty(this, "initialized", false);
		_defineProperty(this, "routes", []);
		_defineProperty(this, "loadedScripts", /* @__PURE__ */ new Set());
		_defineProperty(this, "pathname", () => {
			return this.pathnameObserver.get();
		});
		_defineProperty(this, "query", () => {
			return this.queryObserver.get();
		});
		_defineProperty(this, "params", () => {
			return this.paramsObserver.get();
		});
		_defineProperty(this, "hash", () => {
			return this.hashObserver.get();
		});
		_defineProperty(this, "url", () => {
			return this.urlObserver.get();
		});
		_defineProperty(this, "searchParams", () => {
			this.urlObserver.get();
			if (isSSR()) return new URLSearchParams();
			return new URLSearchParams(window.location.search);
		});
		_defineProperty(this, "push", (href, options = {}) => {
			if (isSSR()) return;
			const replace = options.replace ?? false;
			const scroll = options.scroll ?? true;
			if (replace) window.history.replaceState(null, "", href);
			else window.history.pushState(null, "", href);
			this.sync();
			if (scroll) window.scrollTo(0, 0);
			this.loadAndRenderRoute(href).then((applied) => {
				if (!applied) {
					window.location.href = href;
					return;
				}
				this.sync();
			});
		});
		_defineProperty(this, "replace", (href, options = {}) => {
			this.push(href, {
				...options,
				replace: true
			});
		});
		_defineProperty(this, "back", () => {
			if (isSSR()) return;
			window.history.back();
		});
		_defineProperty(this, "forward", () => {
			if (isSSR()) return;
			window.history.forward();
		});
		_defineProperty(this, "refresh", () => {
			if (isSSR()) return;
			window.location.reload();
		});
		_defineProperty(this, "prefetch", (_href) => {});
	}
	ensureHydrationGlobals() {
		if (isSSR()) return;
		applyHydrationPayloadToWindow(document);
	}
	getInitialPathname() {
		if (isSSR()) return "/";
		this.ensureHydrationGlobals();
		return window.__ROUTE__ ?? window.location.pathname;
	}
	getInitialQuery() {
		if (isSSR()) return {};
		this.ensureHydrationGlobals();
		if (window.__QUERYS__) return window.__QUERYS__;
		const query = {};
		const sp = new URLSearchParams(window.location.search);
		for (const [key, val] of sp.entries()) query[key] = val;
		return query;
	}
	getInitialParams() {
		if (isSSR()) return {};
		this.ensureHydrationGlobals();
		return window.__PARAMS__ ?? {};
	}
	getInitialHash() {
		if (isSSR()) return "";
		return window.location.hash;
	}
	getInitialUrl() {
		if (isSSR()) return "/";
		return window.location.pathname + window.location.search + window.location.hash;
	}
	setRoutes(routes) {
		this.routes = routes;
		this.sync();
	}
	getRoutes() {
		return this.routes;
	}
	init() {
		if (isSSR() || this.initialized) return;
		this.initialized = true;
		document.querySelectorAll("script[type=module][src]").forEach((script) => {
			try {
				this.loadedScripts.add(new URL(script.src, window.location.href).toString());
			} catch {}
		});
		this.sync();
		window.addEventListener("popstate", () => {
			this.sync();
			const target = window.location.pathname + window.location.search + window.location.hash;
			this.loadAndRenderRoute(target).then((applied) => {
				if (!applied) {
					window.location.reload();
					return;
				}
				this.sync();
			});
		});
		window.addEventListener("hashchange", () => {
			this.sync();
		});
		document.addEventListener("click", (e) => {
			const link = e.target.closest("a");
			if (link && link.href && (!link.target || link.target === "_self") && !e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && link.origin === window.location.origin && !link.hasAttribute("download") && link.getAttribute("rel") !== "external") {
				const href = link.getAttribute("href");
				if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
					e.preventDefault();
					this.push(href);
				}
			}
		});
	}
	sync() {
		if (isSSR()) return;
		const pathname = window.location.pathname;
		const search = window.location.search;
		const hash = window.location.hash;
		window.__ROUTE__ = pathname;
		const query = {};
		const sp = new URLSearchParams(search);
		for (const [key, val] of sp.entries()) query[key] = val;
		const params = this.matchParams(pathname);
		this.pathnameObserver.set(pathname);
		this.queryObserver.set(query);
		if (params) this.paramsObserver.set(params);
		this.hashObserver.set(hash);
		this.urlObserver.set(pathname + search + hash);
		window.dispatchEvent(new CustomEvent("adaptive:routechange", { detail: {
			pathname,
			search,
			hash,
			url: pathname + search + hash
		} }));
	}
	/**
	* Busca o HTML renderizado no servidor para a rota informada e substitui
	* o conteúdo de #root, permitindo navegação SPA real (sem full reload).
	* Retorna `true` se a troca de conteúdo foi aplicada com sucesso.
	*/
	async loadAndRenderRoute(href) {
		if (isSSR()) return false;
		try {
			const targetUrl = new URL(href, window.location.href);
			if (targetUrl.origin !== window.location.origin) return false;
			const response = await fetch(targetUrl.toString(), {
				headers: { "X-Adaptive-Navigation": "1" },
				credentials: "same-origin"
			});
			if (!response.ok) return false;
			if (!(response.headers.get("content-type") ?? "").includes("text/html")) return false;
			const html = await response.text();
			const doc = new DOMParser().parseFromString(html, "text/html");
			const newRoot = doc.getElementById("root");
			const currentRoot = document.getElementById("root");
			if (!newRoot || !currentRoot) return false;
			currentRoot.innerHTML = newRoot.innerHTML;
			if (doc.title) document.title = doc.title;
			if (parseHydrationPayload(doc)) applyHydrationPayloadToWindow(doc);
			const scriptSrcs = Array.from(doc.querySelectorAll("script[type=module][src]")).map((script) => new URL(script.getAttribute("src"), targetUrl).toString());
			for (const src of scriptSrcs) {
				if (this.loadedScripts.has(src)) continue;
				this.loadedScripts.add(src);
				try {
					await import(
						/* webpackIgnore: true */
						src
);
				} catch (err) {
					console.warn("[Adaptive Router] Falha ao importar módulo da rota:", src, err);
				}
			}
			return true;
		} catch (err) {
			console.warn("[Adaptive Router] Falha na navegação SPA, usando fallback:", err);
			return false;
		}
	}
	matchParams(pathname) {
		for (const route of this.routes) {
			const { matched, params } = matchRouteServer(route.path, pathname);
			if (matched) return params;
		}
		return {};
	}
};
let globalRouter = null;
function getGlobalRouter() {
	if (!globalRouter) globalRouter = new RouterState();
	return globalRouter;
}
/**
* Hook de navegação reativa do AdaptiveJS.
*
* Fornece getters reativos (pathname, query, params, searchParams, hash, url)
* e métodos de navegação (push, replace, back, forward, refresh).
*/
function useRouter() {
	const router = getGlobalRouter();
	useClientEffect(() => {
		router.init();
	}, []);
	return router;
}

//#endregion
//#region ../../packages/web/dist/hy/boundary/index.js
function hydrateClientComponents(moduleId, exportsMap) {
	if (typeof document === "undefined") return;
	registeredHydrationModules.set(moduleId, exportsMap);
	if (!isSSR()) useRouter().init();
	runWhenDomReady(() => hydrateSafely(moduleId, exportsMap));
}
function hydrateSafely(moduleId, exportsMap) {
	try {
		hydrateClientComponentsNow(moduleId, exportsMap);
	} catch (err) {
		reportHydrationError(err, { moduleId });
	}
}
if (!isSSR()) window.addEventListener("adaptive:routechange", () => {
	resetMountedBoundaries();
	runWhenDomReady(() => {
		for (const [moduleId, exportsMap] of registeredHydrationModules.entries()) try {
			hydrateClientComponentsNow(moduleId, exportsMap);
		} catch (err) {
			reportHydrationError(err, { moduleId });
		}
	});
});
function runWhenDomReady(cb) {
	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", cb, { once: true });
	else cb();
}
function hydrateClientComponentsNow(moduleId, exportsMap) {
	cleanupDisconnectedClientComponentScopes();
	findCommentBoundaries(moduleId).forEach((boundary) => {
		if (mountedClientBoundaries.has(boundary.start)) return;
		const Component = exportsMap[boundary.exportName];
		if (typeof Component !== "function") return;
		const props = boundary.rawProps ? parseClientProps(boundary.rawProps) : {};
		if (boundary.hasChildren) props.children = boundary.mode === "hydrate" ? createElement(HYDRATE_SLOT_TAG, { hydrate: true }) : collectSiblingNodesBetween(boundary.start, boundary.end);
		const prev = clientBoundaryScopes.get(boundary.start);
		if (prev) {
			cleanupEventsScope(prev.scope);
			cleanupHandlerScope(prev.handlerScope);
		}
		const nextScope = createEventsScope(`client:${moduleId}:${boundary.exportName}`);
		const nextHandlerScope = createHandlerScope(`handler:${moduleId}:${boundary.exportName}`);
		mountedClientBoundaries.add(boundary.start);
		let mountedNodes = [];
		mountedNodes = runWithEffectScope(nextScope, () => runWithHandlerScope(nextHandlerScope, () => {
			if (boundary.mode === "client") return mountClientComponentBetweenMarkers(boundary.start, boundary.end, Component, props);
			if (boundary.mode === "hydrate") return hydrateExistingComponentBetweenMarkers(boundary.start, boundary.end, Component, props, boundary.boundaryId);
			return [];
		}));
		clientBoundaryScopes.set(boundary.start, {
			scope: nextScope,
			handlerScope: nextHandlerScope,
			isConnected: () => mountedNodes.length > 0 ? mountedNodes.some((n) => n.isConnected) : Boolean(document.body?.isConnected),
			isWithin: (container) => mountedNodes.length > 0 ? mountedNodes.some((n) => container.contains(n)) : true
		});
	});
	document.querySelectorAll(`[data-adaptive-client-module="${cssEscape(moduleId)}"]`).forEach((node) => {
		if (mountedClientBoundaries.has(node)) return;
		const exportName = node.dataset.adaptiveClientExport || "default";
		const mode = node.dataset.adaptiveClientMode || "client";
		const boundaryId = node.getAttribute("data-adaptive-boundary-id") ?? "";
		const Component = exportsMap[exportName];
		if (typeof Component !== "function") return;
		const rawProps = node.dataset.adaptiveClientProps;
		const props = rawProps ? parseClientProps(rawProps) : {};
		if (node.dataset.adaptiveClientHasChildren === "true") props.children = mode === "hydrate" ? createElement(HYDRATE_SLOT_TAG, { hydrate: true }) : Array.from(node.childNodes);
		const prev = clientBoundaryScopes.get(node);
		if (prev) {
			cleanupEventsScope(prev.scope);
			cleanupHandlerScope(prev.handlerScope);
		}
		mountedClientBoundaries.add(node);
		const nextHandlerScope = createHandlerScope(`handler:${moduleId}:${exportName}`);
		const nextScope = createEventsScope(`client:${moduleId}:${exportName}`);
		const mountedNodes = runWithEffectScope(nextScope, () => runWithHandlerScope(nextHandlerScope, () => {
			if (mode === "client") return mountClientComponent(node, Component, props);
			if (mode === "hydrate") return hydrateExistingComponent(node, Component, props, boundaryId);
			return [];
		}));
		clientBoundaryScopes.set(node, {
			scope: nextScope,
			handlerScope: nextHandlerScope,
			isConnected: () => mountedNodes.length > 0 ? mountedNodes.some((c) => c.isConnected) : node.isConnected,
			isWithin: (container) => mountedNodes.length > 0 ? mountedNodes.some((c) => container.contains(c)) : container.contains(node)
		});
		cleanupClientBoundaryAttributes(node);
	});
}

//#endregion
//#region ../../packages/web/dist/index.js
/**
* Marca um export como componente client/hydrate.
* O ci injeta esta chamada no rodapé de cada módulo com diretiva,
* depois que a diretiva é removida do código.
*/
function markClientExport(value, moduleId, exportName, mode) {
	if (typeof value !== "function") return;
	value[CLIENT_COMPONENT_SYMBOL] = {
		moduleId,
		exportName,
		mode
	};
}

//#endregion
export { jsx as _, init as a, __exportAll as b, signal as c, createReactiveEffect as d, events as f, Fragment as g, _defineProperty as h, useHandler as i, cleanupEffectScope as l, runWithEffectScope as m, hydrateClientComponents as n, ref as o, layoutEvents as p, useRouter as r, rootSignal as s, markClientExport as t, createEffectScope as u, jsxs as v, callServerAction as y };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstQ01FM2tsUXQuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvc2hhcmVkL2Rpc3QvaHlkcmF0aW9uL2h5ZHJhdGlvbi1tYW5pZmVzdC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC9kaXN0L2h5ZHJhdGlvbi9jbGllbnQtYm91bmRhcnkuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9zaGFyZWQvZGlzdC9oeWRyYXRpb24vaHlkcmF0aW9uLXN1cHBvcnRlZC1wcm9wcy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC9kaXN0L2h5ZHJhdGlvbi9oeWRyYXRpb24tcGF5bG9hZC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC9kaXN0L3dlYi9jb250ZXh0LXJ1bnRpbWUuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9zaGFyZWQvZGlzdC93ZWIvbWV0YWRhdGEuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9zaGFyZWQvZGlzdC9yb3V0aW5nLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvc2hhcmVkL2Rpc3Qvc3NyL2FkYXB0aXZlLWZvcm0tZGF0YS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC9kaXN0L3Nzci9jYWxsLXNlcnZlci1hY3Rpb24uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9qc3gvZGlzdC9qc3gtcnVudGltZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvZGlzdC9jcmVhdGUtZWxlbWVudC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3dlYi9kaXN0L2h5L2h5ZHJhdGUvbWFya2Vycy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3dlYi9kaXN0L2h5L2h5ZHJhdGUvbWlzbWF0Y2guanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9yZWFjdGl2ZS9ldmVudHMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9yZWFjdGl2ZS9yZWFjdGl2ZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3dlYi9kaXN0L3JlYWN0aXZlL2luaXQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9yZWFjdGl2ZS9hZGFwdGl2ZS1vYnNlcnZlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3dlYi9kaXN0L2h5L2h5ZHJhdGUvY29uc3RhbnRzLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2ViL2Rpc3QvaHkvaHlkcmF0ZS9kb20uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9zdHlsZS1zaGFyZWQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9oeWRyYXRlL3N0eWxlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2ViL2Rpc3QvaHkva2V5ZWQtcmVhY3RpdmUtYmxvY2suanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9oeWRyYXRlL3JlbmRlci10by1kb20uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9ib3VuZGFyeS9tb3VudC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3dlYi9kaXN0L2h5L2h5ZHJhdGUvZWxlbWVudHMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9oeWRyYXRlL2V2ZW50cy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3dlYi9kaXN0L2h5L2h5ZHJhdGUvcHJvcHMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9oeWRyYXRlL3JlYWN0aXZlLW1hcmtlcnMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9oeWRyYXRlL2lucGxhY2UuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9oeWRyYXRlL3JlYWN0aXZlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2ViL2Rpc3QvaHkvaHlkcmF0ZS9pbnN0cnVjdGlvbnMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9oeWRyYXRlL2NsZWFudXAuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9ib3VuZGFyeS9kaXNjb3ZlcnkuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9ib3VuZGFyeS9jb2xsZWN0LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2ViL2Rpc3QvaHkvYm91bmRhcnkvYmluZC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3dlYi9kaXN0L2h5L2JvdW5kYXJ5L2RlYnVnLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2ViL2Rpc3QvaHkvYm91bmRhcnkvcmVnaXN0cnkuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9ib3VuZGFyeS9oeWRyYXRpb24tdHJhY2UuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9oeS9ib3VuZGFyeS9oeWRyYXRlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2ViL2Rpc3QvaHkvYm91bmRhcnkvcHJvcHMtc2VyaWFsaXphdGlvbi5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3dlYi9kaXN0L2h5L2JvdW5kYXJ5L2NsZWFudXAuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9mcm9udC9oYW5kbGVyLXNjb3BlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2ViL2Rpc3QvZnJvbnQvcm91dGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvd2ViL2Rpc3QvaHkvYm91bmRhcnkvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy93ZWIvZGlzdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogU2VlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBIWURSQVRJT05fTUFOSUZFU1RfQVRUUiA9IFwiZGF0YS1hZGFwdGl2ZS1oeWRyYXRpb24tbWFuaWZlc3RcIjtcbmV4cG9ydCBjb25zdCBMRUdBQ1lfSFlEUkFUSU9OX01BTklGRVNUX0FUVFIgPSBcImRhdGEtYWRhcHRpdmUtbWFuaWZlc3RcIjtcbmV4cG9ydCBjb25zdCBIWURSQVRJT05fQk9VTkRBUllfSURfQVRUUiA9IFwiZGF0YS1hZGFwdGl2ZS1ib3VuZGFyeS1pZFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aHlkcmF0aW9uLW1hbmlmZXN0LmpzLm1hcCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IENMSUVOVF9DT01QT05FTlRfU1lNQk9MID0gU3ltYm9sLmZvcihcImFkYXB0aXZlLmNsaWVudF9jb21wb25lbnRcIik7XG5leHBvcnQgY29uc3QgQ0xJRU5UX0JPVU5EQVJZX1RBRyA9IFwiYWRhcHRpdmUtY2xpZW50LWJvdW5kYXJ5XCI7XG5leHBvcnQgY29uc3QgQ0xJRU5UX0JPVU5EQVJZX01PREVfQ0xJRU5UID0gXCJjbGllbnRcIjtcbmV4cG9ydCBjb25zdCBDTElFTlRfQk9VTkRBUllfTU9ERV9IWURSQVRFID0gXCJoeWRyYXRlXCI7XG5leHBvcnQgY29uc3QgQ0xJRU5UX0JPVU5EQVJZX1NUQVJUX1BSRUZJWCA9IFwiYWRhcHRpdmUtY2xpZW50LXN0YXJ0OlwiO1xuZXhwb3J0IGNvbnN0IENMSUVOVF9CT1VOREFSWV9FTkQgPSBcImFkYXB0aXZlLWNsaWVudC1lbmRcIjtcbmV4cG9ydCBjb25zdCBSRUFDVElWRV9DSElMRF9TVEFSVCA9IFwiYWRhcHRpdmUtcmVhY3RpdmUtc3RhcnRcIjtcbmV4cG9ydCBjb25zdCBSRUFDVElWRV9DSElMRF9FTkQgPSBcImFkYXB0aXZlLXJlYWN0aXZlLWVuZFwiO1xuZXhwb3J0IGNvbnN0IFJFQUNUSVZFX1NUUlVDVF9TVEFSVCA9IFwiYWRhcHRpdmUtc3RydWN0LXN0YXJ0XCI7XG5leHBvcnQgY29uc3QgUkVBQ1RJVkVfU1RSVUNUX0VORCA9IFwiYWRhcHRpdmUtc3RydWN0LWVuZFwiO1xuZXhwb3J0IGNvbnN0IFJFQUNUSVZFX0xJU1RfU1RBUlQgPSBcImFkYXB0aXZlLWxpc3Qtc3RhcnRcIjtcbmV4cG9ydCBjb25zdCBSRUFDVElWRV9MSVNUX0VORCA9IFwiYWRhcHRpdmUtbGlzdC1lbmRcIjtcbmV4cG9ydCBjb25zdCBSRUFDVElWRV9BU1lOQ19TVEFSVCA9IFwiYWRhcHRpdmUtYXN5bmMtc3RhcnRcIjtcbmV4cG9ydCBjb25zdCBSRUFDVElWRV9BU1lOQ19FTkQgPSBcImFkYXB0aXZlLWFzeW5jLWVuZFwiO1xuZXhwb3J0IGNvbnN0IEhZRFJBVEVfU0xPVF9UQUcgPSBcImFkYXB0aXZlLWh5ZHJhdGUtc2xvdFwiO1xuZXhwb3J0IGNvbnN0IEhZRFJBVEVfU0xPVF9TVEFSVCA9IFwiYWRhcHRpdmUtaHlkcmF0ZS1zbG90LXN0YXJ0XCI7XG5leHBvcnQgY29uc3QgSFlEUkFURV9TTE9UX0VORCA9IFwiYWRhcHRpdmUtaHlkcmF0ZS1zbG90LWVuZFwiO1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ2xpZW50Qm91bmRhcnlUYWcodGFnKSB7XG4gICAgcmV0dXJuIHRhZyA9PT0gQ0xJRU5UX0JPVU5EQVJZX1RBRztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0h5ZHJhdGVTbG90VGFnKHRhZykge1xuICAgIHJldHVybiB0YWcgPT09IEhZRFJBVEVfU0xPVF9UQUc7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGllbnQtYm91bmRhcnkuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIFNlZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5jb25zdCBVTlNVUFBPUlRFRF9EWU5BTUlDX0hZRFJBVElPTl9QUk9QUyA9IG5ldyBTZXQoW1xuICAgIFwiY2hpbGRyZW5cIixcbiAgICBcInJlZlwiLFxuICAgIFwiY2xpZW50XCIsXG4gICAgXCJrZXlcIixcbiAgICBcImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXCIsXG4gICAgXCJpbm5lckhUTUxcIixcbiAgICBcIm91dGVySFRNTFwiLFxuICAgIFwidGV4dENvbnRlbnRcIlxuXSk7XG5leHBvcnQgZnVuY3Rpb24gaXNTdXBwb3J0ZWREeW5hbWljSHlkcmF0aW9uUHJvcE5hbWUoa2V5KSB7XG4gICAgcmV0dXJuICFVTlNVUFBPUlRFRF9EWU5BTUlDX0hZRFJBVElPTl9QUk9QUy5oYXMoa2V5KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh5ZHJhdGlvbi1zdXBwb3J0ZWQtcHJvcHMuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIFNlZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG4vKipcbiAqIEh5ZHJhdGlvbiBib290c3RyYXAgdmlhIEpTT04gZGF0YSBpc2xhbmQgKG7Do28gZXhlY3V0YSBKUykuXG4gKiBDU1Agc2NyaXB0LXNyYyBuw6NvIGJsb3F1ZWlhIHR5cGU9XCJhcHBsaWNhdGlvbi9qc29uXCIuXG4gKi9cbmV4cG9ydCBjb25zdCBBREFQVElWRV9IWURSQVRJT05fU0NSSVBUX0lEID0gXCJfX0FEQVBUSVZFX0hZRFJBVElPTl9fXCI7XG5leHBvcnQgZnVuY3Rpb24gc2FmZUpzb25Gb3JTY3JpcHQodmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gICAgICAgIC5yZXBsYWNlKC88L2csIFwiXFxcXHUwMDNjXCIpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiXFxcXHUwMDNlXCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxcXHUyMDI4XCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXHUyMDI5L2csIFwiXFxcXHUyMDI5XCIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkSHlkcmF0aW9uUGF5bG9hZEh0bWwocGF5bG9hZCkge1xuICAgIGNvbnN0IGJvZHkgPSBzYWZlSnNvbkZvclNjcmlwdCh7XG4gICAgICAgIHJvdXRlOiBwYXlsb2FkLnJvdXRlLFxuICAgICAgICBwYXJhbXM6IHBheWxvYWQucGFyYW1zID8/IHt9LFxuICAgICAgICBxdWVyeTogcGF5bG9hZC5xdWVyeSA/PyB7fSxcbiAgICB9KTtcbiAgICByZXR1cm4gKGA8c2NyaXB0IHR5cGU9XCJhcHBsaWNhdGlvbi9qc29uXCIgaWQ9XCIke0FEQVBUSVZFX0hZRFJBVElPTl9TQ1JJUFRfSUR9XCI+YCArXG4gICAgICAgIGJvZHkgK1xuICAgICAgICBgPC9zY3JpcHQ+YCk7XG59XG5mdW5jdGlvbiBkZWZhdWx0QnJvd3NlclJvb3QoKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBkb2MgPSBnbG9iYWxUaGlzLmRvY3VtZW50O1xuICAgIHJldHVybiBkb2MgPz8gbnVsbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUh5ZHJhdGlvblBheWxvYWQocm9vdCA9IGRlZmF1bHRCcm93c2VyUm9vdCgpKSB7XG4gICAgaWYgKCFyb290KVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBlbCA9IHJvb3QucXVlcnlTZWxlY3RvcihgIyR7QURBUFRJVkVfSFlEUkFUSU9OX1NDUklQVF9JRH1gKTtcbiAgICBpZiAoIWVsKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShlbC50ZXh0Q29udGVudCA/PyBcIlwiKTtcbiAgICAgICAgaWYgKCFkYXRhIHx8IHR5cGVvZiBkYXRhICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3V0ZTogdHlwZW9mIGRhdGEucm91dGUgPT09IFwic3RyaW5nXCIgPyBkYXRhLnJvdXRlIDogXCIvXCIsXG4gICAgICAgICAgICBwYXJhbXM6IGRhdGEucGFyYW1zICYmIHR5cGVvZiBkYXRhLnBhcmFtcyA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShkYXRhLnBhcmFtcylcbiAgICAgICAgICAgICAgICA/IGRhdGEucGFyYW1zXG4gICAgICAgICAgICAgICAgOiB7fSxcbiAgICAgICAgICAgIHF1ZXJ5OiBkYXRhLnF1ZXJ5ICYmIHR5cGVvZiBkYXRhLnF1ZXJ5ID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KGRhdGEucXVlcnkpXG4gICAgICAgICAgICAgICAgPyBkYXRhLnF1ZXJ5XG4gICAgICAgICAgICAgICAgOiB7fSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYXBwbHlIeWRyYXRpb25QYXlsb2FkVG9XaW5kb3cocm9vdCA9IGRlZmF1bHRCcm93c2VyUm9vdCgpKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHBhcnNlSHlkcmF0aW9uUGF5bG9hZChyb290KTtcbiAgICBpZiAoIXBheWxvYWQpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHdpbiA9IGdsb2JhbFRoaXMud2luZG93O1xuICAgIGlmICh3aW4pIHtcbiAgICAgICAgd2luLl9fUk9VVEVfXyA9IHBheWxvYWQucm91dGU7XG4gICAgICAgIHdpbi5fX1BBUkFNU19fID0gcGF5bG9hZC5wYXJhbXM7XG4gICAgICAgIHdpbi5fX1FVRVJZU19fID0gcGF5bG9hZC5xdWVyeTtcbiAgICB9XG4gICAgcmV0dXJuIHBheWxvYWQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oeWRyYXRpb24tcGF5bG9hZC5qcy5tYXAiLCJleHBvcnQgY29uc3QgQ09OVEVYVF9QUk9WSURFUl9UQUcgPSBTeW1ib2wuZm9yKFwiYWRhcHRpdmUuY29udGV4dC5wcm92aWRlclwiKTtcbmNvbnN0IHNlcnZlckNvbnRleHRTdGFjayA9IFtdO1xuZXhwb3J0IGZ1bmN0aW9uIHJ1bldpdGhTZXJ2ZXJDb250ZXh0KGlkLCB2YWx1ZSwgZm4pIHtcbiAgICBzZXJ2ZXJDb250ZXh0U3RhY2sucHVzaCh7IGlkLCB2YWx1ZSB9KTtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHNlcnZlckNvbnRleHRTdGFjay5wb3AoKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmVhZFNlcnZlckNvbnRleHQoaWQsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGZvciAobGV0IGluZGV4ID0gc2VydmVyQ29udGV4dFN0YWNrLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4IC09IDEpIHtcbiAgICAgICAgY29uc3QgZnJhbWUgPSBzZXJ2ZXJDb250ZXh0U3RhY2tbaW5kZXhdO1xuICAgICAgICBpZiAoZnJhbWUuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJhbWUudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRleHQtcnVudGltZS5qcy5tYXAiLCJpbXBvcnQgeyBDTElFTlRfQ09NUE9ORU5UX1NZTUJPTCB9IGZyb20gXCIuLi9oeWRyYXRpb24vY2xpZW50LWJvdW5kYXJ5LmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xpZW50Q29tcG9uZW50TWV0YWRhdGEodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1ldGEgPSB2YWx1ZVtDTElFTlRfQ09NUE9ORU5UX1NZTUJPTF07XG4gICAgcmV0dXJuIG1ldGEgPz8gbnVsbDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1ldGFkYXRhLmpzLm1hcCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoUm91dGVTZXJ2ZXIocm91dGVQYXRoLCBwYXRobmFtZSkge1xuICAgIGlmIChyb3V0ZVBhdGggPT09IFwiL1wiICYmIHBhdGhuYW1lID09PSBcIi9cIikge1xuICAgICAgICByZXR1cm4geyBtYXRjaGVkOiB0cnVlLCBwYXJhbXM6IHt9IH07XG4gICAgfVxuICAgIGNvbnN0IHRyaW0gPSAodmFsdWUpID0+IHZhbHVlLnJlcGxhY2UoL15cXC98XFwvJC9nLCBcIlwiKTtcbiAgICBjb25zdCByb3V0ZVNlZ21lbnRzID0gdHJpbShyb3V0ZVBhdGgpLnNwbGl0KFwiL1wiKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgY29uc3QgcGF0aFNlZ21lbnRzID0gdHJpbShwYXRobmFtZSkuc3BsaXQoXCIvXCIpLmZpbHRlcihCb29sZWFuKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgICBsZXQgcm91dGVJbmRleCA9IDA7XG4gICAgbGV0IHBhdGhJbmRleCA9IDA7XG4gICAgd2hpbGUgKHJvdXRlSW5kZXggPCByb3V0ZVNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCByb3V0ZVNlZ21lbnQgPSByb3V0ZVNlZ21lbnRzW3JvdXRlSW5kZXhdO1xuICAgICAgICBjb25zdCBwYXRoU2VnbWVudCA9IHBhdGhTZWdtZW50c1twYXRoSW5kZXhdO1xuICAgICAgICAvLyBjYXRjaC1hbGw6ICpzbHVnXG4gICAgICAgIGlmIChyb3V0ZVNlZ21lbnQuc3RhcnRzV2l0aChcIipcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSByb3V0ZVNlZ21lbnQucmVwbGFjZSgvXlxcKi8sIFwiXCIpLnJlcGxhY2UoL1xcPyQvLCBcIlwiKTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbmFsID0gcm91dGVTZWdtZW50LmVuZHNXaXRoKFwiP1wiKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3QgPSBwYXRoU2VnbWVudHMuc2xpY2UocGF0aEluZGV4KTtcbiAgICAgICAgICAgIGlmIChyZXN0Lmxlbmd0aCA9PT0gMCAmJiAhb3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBtYXRjaGVkOiBmYWxzZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyYW1zW25hbWVdID0gcmVzdC5qb2luKFwiL1wiKTtcbiAgICAgICAgICAgIHJldHVybiB7IG1hdGNoZWQ6IHRydWUsIHBhcmFtcyB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtOiA6aWQ/XG4gICAgICAgIGlmIChyb3V0ZVNlZ21lbnQuc3RhcnRzV2l0aChcIjpcIikgJiYgcm91dGVTZWdtZW50LmVuZHNXaXRoKFwiP1wiKSkge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHJvdXRlU2VnbWVudC5zbGljZSgxLCAtMSk7XG4gICAgICAgICAgICBpZiAocGF0aFNlZ21lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBhcmFtc1tuYW1lXSA9IHBhdGhTZWdtZW50O1xuICAgICAgICAgICAgICAgIHBhdGhJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm91dGVJbmRleCsrO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdGhTZWdtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IG1hdGNoZWQ6IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gZHluYW1pYyBwYXJhbTogOmlkXG4gICAgICAgIGlmIChyb3V0ZVNlZ21lbnQuc3RhcnRzV2l0aChcIjpcIikpIHtcbiAgICAgICAgICAgIHBhcmFtc1tyb3V0ZVNlZ21lbnQuc2xpY2UoMSldID0gcGF0aFNlZ21lbnQ7XG4gICAgICAgICAgICByb3V0ZUluZGV4Kys7XG4gICAgICAgICAgICBwYXRoSW5kZXgrKztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0YXRpY1xuICAgICAgICBpZiAocm91dGVTZWdtZW50ICE9PSBwYXRoU2VnbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbWF0Y2hlZDogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICByb3V0ZUluZGV4Kys7XG4gICAgICAgIHBhdGhJbmRleCsrO1xuICAgIH1cbiAgICBpZiAocGF0aEluZGV4IDwgcGF0aFNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4geyBtYXRjaGVkOiBmYWxzZSB9O1xuICAgIH1cbiAgICByZXR1cm4geyBtYXRjaGVkOiB0cnVlLCBwYXJhbXMgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJvdXRpbmcuanMubWFwIiwiZXhwb3J0IGNsYXNzIEFkYXB0aXZlRm9ybURhdGEge1xuICAgICNlbnRyaWVzID0gW107XG4gICAgY29uc3RydWN0b3IoaW5pdGlhbCkge1xuICAgICAgICBpZiAoIWluaXRpYWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBZGFwdGl2ZUZvcm1EYXRhKGluaXRpYWwpKSB7XG4gICAgICAgICAgICB0aGlzLiNlbnRyaWVzID0gWy4uLmluaXRpYWwuZW50cmllcygpXTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpbml0aWFsKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaW5pdGlhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGluaXRpYWwpKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKGtleSwgaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZnJvbShpbnB1dCkge1xuICAgICAgICByZXR1cm4gaXNBZGFwdGl2ZUZvcm1EYXRhKGlucHV0KSA/IGlucHV0IDogbmV3IEFkYXB0aXZlRm9ybURhdGEoaW5wdXQgPz8gdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgc3RhdGljIGZyb21OYXRpdmUoZm9ybURhdGEpIHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gbmV3IEFkYXB0aXZlRm9ybURhdGEoKTtcbiAgICAgICAgaWYgKCFmb3JtRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBmb3JtRGF0YS5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgfHwgdmFsdWUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbiAgICBhcHBlbmQobmFtZSwgdmFsdWUsIGZpbGVOYW1lKSB7XG4gICAgICAgIHRoaXMuI2VudHJpZXMucHVzaChbbmFtZSwgbm9ybWFsaXplRW50cnlWYWx1ZSh2YWx1ZSwgZmlsZU5hbWUpXSk7XG4gICAgfVxuICAgIHNldChuYW1lLCB2YWx1ZSwgZmlsZU5hbWUpIHtcbiAgICAgICAgdGhpcy5kZWxldGUobmFtZSk7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlLCBmaWxlTmFtZSk7XG4gICAgfVxuICAgIGdldChuYW1lKSB7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy4jZW50cmllcy5maW5kKChba2V5XSkgPT4ga2V5ID09PSBuYW1lKTtcbiAgICAgICAgcmV0dXJuIGVudHJ5ID8gZW50cnlbMV0gOiBudWxsO1xuICAgIH1cbiAgICBnZXRBbGwobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZW50cmllcy5maWx0ZXIoKFtrZXldKSA9PiBrZXkgPT09IG5hbWUpLm1hcCgoWywgdmFsdWVdKSA9PiB2YWx1ZSk7XG4gICAgfVxuICAgIGhhcyhuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNlbnRyaWVzLnNvbWUoKFtrZXldKSA9PiBrZXkgPT09IG5hbWUpO1xuICAgIH1cbiAgICBkZWxldGUobmFtZSkge1xuICAgICAgICB0aGlzLiNlbnRyaWVzID0gdGhpcy4jZW50cmllcy5maWx0ZXIoKFtrZXldKSA9PiBrZXkgIT09IG5hbWUpO1xuICAgIH1cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jZW50cmllc1tTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgfVxuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNlbnRyaWVzLm1hcCgoW2tleV0pID0+IGtleSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIH1cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNlbnRyaWVzLm1hcCgoWywgdmFsdWVdKSA9PiB2YWx1ZSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIH1cbiAgICBmb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHRoaXMuI2VudHJpZXMpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9OYXRpdmUoKSB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHRoaXMuI2VudHJpZXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSwgdmFsdWUubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiB0aGlzLiNlbnRyaWVzKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gb3V0cHV0W2tleV07XG4gICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dHB1dFtrZXldID0gQXJyYXkuaXNBcnJheShjdXJyZW50KSA/IFsuLi5jdXJyZW50LCB2YWx1ZV0gOiBbY3VycmVudCwgdmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuICAgIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQWRhcHRpdmVGb3JtRGF0YSh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZS5hcHBlbmQgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICB0eXBlb2YgdmFsdWUuZ2V0ID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgdHlwZW9mIHZhbHVlLmVudHJpZXMgPT09IFwiZnVuY3Rpb25cIjtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUVudHJ5VmFsdWUodmFsdWUsIGZpbGVOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IGhhc0ZpbGUgPSB0eXBlb2YgRmlsZSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICBpZiAoaGFzRmlsZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVOYW1lID8gbmV3IEZpbGUoW3ZhbHVlXSwgZmlsZU5hbWUsIHsgdHlwZTogdmFsdWUudHlwZSwgbGFzdE1vZGlmaWVkOiB2YWx1ZS5sYXN0TW9kaWZpZWQgfSkgOiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBGaWxlKFt2YWx1ZV0sIGZpbGVOYW1lID8/IFwiYmxvYlwiLCB7XG4gICAgICAgIHR5cGU6IHZhbHVlLnR5cGUgfHwgXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWRhcHRpdmUtZm9ybS1kYXRhLmpzLm1hcCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuaW1wb3J0IHsgaXNBZGFwdGl2ZUZvcm1EYXRhIH0gZnJvbSBcIi4vYWRhcHRpdmUtZm9ybS1kYXRhLmpzXCI7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FsbFNlcnZlckFjdGlvbihtb2R1bGVJZCwgYWN0aW9uTmFtZSwgYXJncykge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBjcmVhdGVBY3Rpb25SZXF1ZXN0KG1vZHVsZUlkLCBhY3Rpb25OYW1lLCBhcmdzKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL19hY3Rpb25cIiwgcmVxdWVzdCk7XG4gICAgY29uc3QgcGF5bG9hZCA9IChhd2FpdCByZXNwb25zZS5qc29uKCkpO1xuICAgIGlmICghcmVzcG9uc2Uub2sgfHwgIXBheWxvYWQub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCFwYXlsb2FkLm9rXG4gICAgICAgICAgICA/IHBheWxvYWQubWVzc2FnZSA/PyBwYXlsb2FkLmVycm9yXG4gICAgICAgICAgICA6IGBTZXJ2ZXIgYWN0aW9uICcke2FjdGlvbk5hbWV9JyBmYWlsZWQuYCk7XG4gICAgfVxuICAgIHJldHVybiBwYXlsb2FkLmRhdGE7XG59XG5mdW5jdGlvbiBjcmVhdGVBY3Rpb25SZXF1ZXN0KG1vZHVsZUlkLCBhY3Rpb25OYW1lLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGlzQWRhcHRpdmVGb3JtRGF0YShhcmdzWzBdKSkge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xuICAgICAgICAgICAgXCJYLUFkYXB0aXZlLU1vZHVsZVwiOiBtb2R1bGVJZCxcbiAgICAgICAgICAgIFwiWC1BZGFwdGl2ZS1BY3Rpb25cIjogYWN0aW9uTmFtZSxcbiAgICAgICAgICAgIFwiWC1BZGFwdGl2ZS1BcmdzLU1vZGVcIjogXCJmb3JtZGF0YS1zaW5nbGVcIlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogYXJnc1swXS50b05hdGl2ZSgpXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChjb250YWluc0JpbmFyeShhcmdzKSkge1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBhcHBlbmRGb3JtVmFsdWUoZm9ybURhdGEsIFwiYXJnc1wiLCBhcmdzKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcbiAgICAgICAgICAgIFwiWC1BZGFwdGl2ZS1Nb2R1bGVcIjogbW9kdWxlSWQsXG4gICAgICAgICAgICBcIlgtQWRhcHRpdmUtQWN0aW9uXCI6IGFjdGlvbk5hbWUsXG4gICAgICAgICAgICBcIlgtQWRhcHRpdmUtQXJncy1Nb2RlXCI6IFwic3RydWN0dXJlZFwiXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICBib2R5OiBmb3JtRGF0YVxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJYLUFkYXB0aXZlLU1vZHVsZVwiOiBtb2R1bGVJZCxcbiAgICAgICAgXCJYLUFkYXB0aXZlLUFjdGlvblwiOiBhY3Rpb25OYW1lLFxuICAgICAgICBcIlgtQWRhcHRpdmUtQXJncy1Nb2RlXCI6IFwianNvblwiXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgbW9kdWxlOiBtb2R1bGVJZCxcbiAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uTmFtZSxcbiAgICAgICAgICAgIGFyZ3NcbiAgICAgICAgfSlcbiAgICB9O1xufVxuZnVuY3Rpb24gY29udGFpbnNCaW5hcnkodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0eXBlb2YgRmlsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGlmIChpc0FkYXB0aXZlRm9ybURhdGEodmFsdWUpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHJldHVybiB2YWx1ZS5zb21lKChpdGVtKSA9PiBjb250YWluc0JpbmFyeShpdGVtKSk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXModmFsdWUpLnNvbWUoKGl0ZW0pID0+IGNvbnRhaW5zQmluYXJ5KGl0ZW0pKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBhcHBlbmRGb3JtVmFsdWUoZm9ybURhdGEsIGtleSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBcIlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIHZhbHVlLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc0FkYXB0aXZlRm9ybURhdGEodmFsdWUpKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2VudHJ5S2V5LCBlbnRyeVZhbHVlXSBvZiB2YWx1ZS5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGFwcGVuZEZvcm1WYWx1ZShmb3JtRGF0YSwgYCR7a2V5fVske2VudHJ5S2V5fV1gLCBlbnRyeVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4gYXBwZW5kRm9ybVZhbHVlKGZvcm1EYXRhLCBgJHtrZXl9WyR7aW5kZXh9XWAsIGl0ZW0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGZvciAoY29uc3QgW25lc3RlZEtleSwgbmVzdGVkVmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHZhbHVlKSkge1xuICAgICAgICAgICAgYXBwZW5kRm9ybVZhbHVlKGZvcm1EYXRhLCBgJHtrZXl9WyR7bmVzdGVkS2V5fV1gLCBuZXN0ZWRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBTdHJpbmcodmFsdWUpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhbGwtc2VydmVyLWFjdGlvbi5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogUnVudGltZSBtaW5pbWFsaXN0YSAtIHNlbSBWRE9NLCBwcmVzZXJ2YSB0aHVua3MgcHJhIGhpZHJhdGHDp8OjbyBmaW5hXG4gKi9cbi8vIGZhY3RvcnkgdXNhZG8gcGVsbyBjb21waWxhZG9yIGF1dG9tw6F0aWNvIChyZWFjdC1qc3gpXG4vLyBqc3godHlwZSwgcHJvcHMpICAgICAgLT4gZmlsaG9zIGVtIHByb3BzLmNoaWxkcmVuXG4vLyBqc3godHlwZSwgcHJvcHMsIGtleSkgLT4gM8K6IGFyZ3VtZW50byDDqSBhIEtFWSwgbsOjbyB1bSBmaWxob1xuLy9cbi8vIE8gdHJhbnNmb3JtIGRvIGNpIChveGMsIHJ1bnRpbWUgYXV0b21hdGljKSBlbWl0ZSBhIGtleSBubyAzwrogYXJndW1lbnRvOlxuLy8gICBfanN4cyhcImxpXCIsIHsgY2hpbGRyZW46IFsuLi5dIH0sIGl0ZW0pXG4vLyBUcmF0YXIgbyAzwrogYXJndW1lbnRvIGNvbW8gZmlsaG8gZmF6IGEga2V5IHZpcmFyIGNvbnRlw7pkbyBlIGRlc2NhcnRhIHRvZG9zIG9zXG4vLyBmaWxob3MgZGUgcXVhbHF1ZXIgZWxlbWVudG8gcXVlIHRlbmhhIGtleS5cbmV4cG9ydCBmdW5jdGlvbiBqc3godHlwZSwgcHJvcHMsIGtleSkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW46IHByb3BDaGlsZHJlbiwga2V5OiBwcm9wc0tleSwgLi4ucmVzdCB9ID0gcHJvcHMgPz8ge307XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHByb3BDaGlsZHJlbiA9PSBudWxsID8gW11cbiAgICAgICAgOiBBcnJheS5pc0FycmF5KHByb3BDaGlsZHJlbikgPyBwcm9wQ2hpbGRyZW5cbiAgICAgICAgICAgIDogW3Byb3BDaGlsZHJlbl07XG4gICAgY29uc3QgZmluYWxLZXkgPSBrZXkgIT09IHVuZGVmaW5lZCA/IGtleSA6IHByb3BzS2V5O1xuICAgIC8vIHByb3BzIHNlbSBjaGlsZHJlbiArIGtleSBzZXBhcmFkYSAtIHBhZHLDo28gcmVhY3QtanN4XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGFnOiB0eXBlLFxuICAgICAgICBwcm9wczogcmVzdCxcbiAgICAgICAgY2hpbGRyZW46IG5vcm1hbGl6ZWQsXG4gICAgICAgIC4uLihmaW5hbEtleSAhPSBudWxsID8geyBrZXk6IGZpbmFsS2V5IH0gOiB7fSksXG4gICAgfTtcbn1cbmV4cG9ydCBjb25zdCBqc3hzID0ganN4O1xuZXhwb3J0IGNvbnN0IGpzeERFViA9IGpzeDtcbi8vIEZyYWdtZW50IHNlbSBET00gZXh0cmEgLSBTeW1ib2wgY29tcGFydGlsaGFkbyBzZXJ2ZXIvY2xpZW50XG5leHBvcnQgY29uc3QgRnJhZ21lbnQgPSBTeW1ib2wuZm9yKFwiYWRhcHRpdmUuZnJhZ21lbnRcIik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1qc3gtcnVudGltZS5qcy5tYXAiLCJpbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGFkYXB0aXZlLWpzL2pzeFwiO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSBqc3g7XG4vLyBhbGlhcyBjb211bSBlbSBvdXRyb3MgZnJhbWV3b3Jrc1xuZXhwb3J0IGNvbnN0IGggPSBqc3g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmVhdGUtZWxlbWVudC5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKiBNYXJrZXIgdXRpbHMgLSBidXNjYSBkZSBjb21lbnTDoXJpb3MgPCEtLWFkYXB0aXZlLSotLT5cbiAqL1xuaW1wb3J0IHsgQ0xJRU5UX0JPVU5EQVJZX1NUQVJUX1BSRUZJWCB9IGZyb20gXCJAYWRhcHRpdmUtanMvc2hhcmVkXCI7XG5leHBvcnQgZnVuY3Rpb24gaXNDbGllbnRCb3VuZGFyeVN0YXJ0Q29tbWVudChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFICYmIG5vZGUuZGF0YS5zdGFydHNXaXRoKENMSUVOVF9CT1VOREFSWV9TVEFSVF9QUkVGSVgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQWRhcHRpdmVCb3VuZGFyeUNvbW1lbnQobm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSBOb2RlLkNPTU1FTlRfTk9ERSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGQgPSBub2RlLmRhdGE7XG4gICAgcmV0dXJuIGQuc3RhcnRzV2l0aChcImFkYXB0aXZlLVwiKSB8fCBkLnN0YXJ0c1dpdGgoQ0xJRU5UX0JPVU5EQVJZX1NUQVJUX1BSRUZJWCk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTYWZlVG9SZW1vdmVBZGFwdGl2ZUNvbW1lbnQobm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSBOb2RlLkNPTU1FTlRfTk9ERSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGQgPSBub2RlLmRhdGE7XG4gICAgLy8gTkVWRVIgcmVtb3ZlIHJlYWN0aXZlIGFuY2hvciBjb21tZW50cyAtIHRoZXkgYXJlIG1hbmFnZWQgYnkgdGhlIHJlZ2lzdHJ5XG4gICAgaWYgKGQuc3RhcnRzV2l0aChcImFkYXB0aXZlLXJlYWN0aXZlLWFuY2hvci1cIikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyBtYW50w6ltIGNsaWVudCBib3VuZGFyaWVzIGUgaHlkcmF0ZSBzbG90cyAtIHPDsyByZW1vdmUgcmVhY3RpdmUgbWFya2VycyBzZSByZWNvdmVyXG4gICAgcmV0dXJuIGQuc3RhcnRzV2l0aChcImFkYXB0aXZlLXJlYWN0aXZlLVwiKSB8fCBkLnN0YXJ0c1dpdGgoXCJhZGFwdGl2ZS1zdHJ1Y3QtXCIpIHx8IGQuc3RhcnRzV2l0aChcImFkYXB0aXZlLWxpc3QtXCIpIHx8IGQuc3RhcnRzV2l0aChcImFkYXB0aXZlLWFzeW5jLVwiKSB8fCBkLnN0YXJ0c1dpdGgoXCJhZGFwdGl2ZS1lbXB0eVwiKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTWF0Y2hpbmdNYXJrZXJFbmQocm9vdCwgc3RhcnQsIHN0YXJ0UHJlZml4LCBlbmRUZXh0KSB7XG4gICAgbGV0IGRlcHRoID0gMDtcbiAgICBsZXQgY3VycmVudCA9IHN0YXJ0Lm5leHRTaWJsaW5nO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICAgIGlmIChjdXJyZW50Lm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGN1cnJlbnQuZGF0YTtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXJ0c1dpdGgoc3RhcnRQcmVmaXgpKVxuICAgICAgICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhID09PSBlbmRUZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlcHRoID09PSAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgICAgICAgICAgICBkZXB0aC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIG7Do28gYXRyYXZlc3NhIHBhcmEgZm9yYSBkbyByb290IHNlIHJvb3QgZm9yIGVsZW1lbnRvXG4gICAgICAgIGlmIChjdXJyZW50ID09PSByb290KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgICAgICAvLyBzZSByb290IMOpIFBhcmVudE5vZGUsIGNvbnRpbnVhbW9zIGRlbnRybyBkZWxlIGFwZW5hc1xuICAgICAgICBpZiAocm9vdCBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgY3VycmVudCAmJiAhcm9vdC5jb250YWlucyhjdXJyZW50KSAmJiBjdXJyZW50ICE9PSByb290Lm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICAvLyBzZSBzYWl1IGRvIHJvb3QsIHBhcmFcbiAgICAgICAgICAgIC8vIG1hcyBjb21vIGJ1c2NhbW9zIHPDsyBzaWJsaW5ncyBkbyBzdGFydCBkZW50cm8gZG8gbWVzbW8gcGFyZW50LCBuw6NvIHByZWNpc2Ftb3MgY2hlY2FyIGNvbnRhaW5zIGNvbXBsZXhvXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdFNpYmxpbmdOb2Rlc0JldHdlZW4oc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgbGV0IGN1ciA9IHN0YXJ0Lm5leHRTaWJsaW5nO1xuICAgIHdoaWxlIChjdXIgJiYgY3VyICE9PSBlbmQpIHtcbiAgICAgICAgbm9kZXMucHVzaChjdXIpO1xuICAgICAgICBjdXIgPSBjdXIubmV4dFNpYmxpbmc7XG4gICAgfVxuICAgIHJldHVybiBub2Rlcztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcmtlcnMuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogRGVidWcgZSBtaXNtYXRjaCAtIHBvZGUgc2VyIHRyZWUtc2hha2VuIGVtIHByb2RcbiAqL1xuaW1wb3J0IHsgYXBwbHlIeWRyYXRpb25QYXlsb2FkVG9XaW5kb3cgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3NoYXJlZFwiO1xuLyoqXG4gKiBFdmVudG9zIHF1ZSBvIHBhaW5lbCBkZSBkZXYgZXNjdXRhLiBPIHBhaW5lbCDDqSBpbmpldGFkbyBwZWxvIGNpIGVtXG4gKiBkZXNlbnZvbHZpbWVudG8sIGVudMOjbyBlbSBwcm9kdcOnw6NvIG5pbmd1w6ltIGVzY3V0YSBlIG8gY3VzdG8gw6kgdW0gZGlzcGF0Y2guXG4gKi9cbmV4cG9ydCBjb25zdCBIWURSQVRJT05fTUlTTUFUQ0hfRVZFTlQgPSBcImFkYXB0aXZlOmh5ZHJhdGlvbi1taXNtYXRjaFwiO1xuZXhwb3J0IGNvbnN0IEhZRFJBVElPTl9FUlJPUl9FVkVOVCA9IFwiYWRhcHRpdmU6aHlkcmF0aW9uLWVycm9yXCI7XG5jb25zdCBtaXNtYXRjaExvZyA9IG5ldyBTZXQoKTtcbmNvbnN0IG1pc21hdGNoSGlzdG9yeSA9IFtdO1xuLyoqXG4gKiBSZWxhdGFyIG51bmNhIHBvZGUgZGVycnViYXIgcXVlbSBlc3RhIHJlcG9ydGFuZG8uXG4gKlxuICogd2Fybk1pc21hdGNoIGUgY2hhbWFkbyBkZSBkZW50cm8gZGUgZWZmZWN0cyByZWF0aXZvcy4gU2UgcXVhbHF1ZXIgY29pc2EgYXF1aVxuICogbGFuY2FyIChsZXIgYSByb3RhLCBjYXB0dXJhciBzbmlwcGV0LCBkZXNwYWNoYXIgbyBldmVudG8pLCBhIGV4Y2VjYW8gc29iZSBlIG9cbiAqIGVmZmVjdCBtb3JyZSBubyBtZWlvIC0tIGEgaWxoYSBmaWNhIGNvbSBvIEhUTUwgZG8gc2Vydmlkb3IgZSBuZW5odW0gc2luYWwgZGVcbiAqIHF1ZSBhIGNvcnJlY2FvIGRvIERPTSBuYW8gYWNvbnRlY2V1LlxuICovXG5leHBvcnQgZnVuY3Rpb24gd2Fybk1pc21hdGNoKGRldGFpbHMpIHtcbiAgICBjb25zdCBrZXkgPSBgJHtkZXRhaWxzLnBhdGh9OiR7ZGV0YWlscy5tZXNzYWdlfWA7XG4gICAgaWYgKG1pc21hdGNoTG9nLmhhcyhrZXkpKVxuICAgICAgICByZXR1cm47XG4gICAgbWlzbWF0Y2hMb2cuYWRkKGtleSk7XG4gICAgbGV0IHJvdXRlO1xuICAgIGxldCBodG1sU25pcHBldDtcbiAgICB0cnkge1xuICAgICAgICByb3V0ZSA9IHJlYWRIeWRyYXRpb25Sb3V0ZSgpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIC8vIFJvdGEgZSBjb250ZXh0bywgbmFvIGEgbWVuc2FnZW0uIFBlcmRlciBpc3NvIG5hbyBpbXBlZGUgbyByZXBvcnQuXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGh0bWxTbmlwcGV0ID0gY2FwdHVyZU5vZGVTbmlwcGV0KGRldGFpbHMubm9kZSk7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgLy8gaWRlbVxuICAgIH1cbiAgICBjb25zdCBlbnRyeSA9IHtcbiAgICAgICAgcGF0aDogZGV0YWlscy5wYXRoLFxuICAgICAgICByb3V0ZSxcbiAgICAgICAgbWVzc2FnZTogZGV0YWlscy5tZXNzYWdlLFxuICAgICAgICBleHBlY3RlZDogZGV0YWlscy5leHBlY3RlZCxcbiAgICAgICAgZm91bmQ6IGRldGFpbHMuZm91bmQsXG4gICAgICAgIGh0bWxTbmlwcGV0LFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICB9O1xuICAgIG1pc21hdGNoSGlzdG9yeS5wdXNoKGVudHJ5KTtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB3aW5kb3cuX19BREFQVElWRV9IWURSQVRJT05fTUlTTUFUQ0hFU19fID8/PSBbXTtcbiAgICAgICAgd2luZG93Ll9fQURBUFRJVkVfSFlEUkFUSU9OX01JU01BVENIRVNfXy5wdXNoKGVudHJ5KTtcbiAgICAgICAgZGlzcGF0Y2goSFlEUkFUSU9OX01JU01BVENIX0VWRU5ULCBlbnRyeSk7XG4gICAgfVxuICAgIGlmIChpc0h5ZHJhdGlvbkRlYnVnRW5hYmxlZCgpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIltBZGFwdGl2ZSBoeWRyYXRpb24gbWlzbWF0Y2hdXCIsIGVudHJ5KTtcbiAgICB9XG59XG4vKipcbiAqIEVycm8gbGFuw6dhZG8gZGVudHJvIGRhIGhpZHJhdGHDp8Ojby4gQW50ZXMgaXNzbyBlcmEgY29uc29sZS53YXJuIGUgYSBpbGhhXG4gKiBtb3JyaWEgZW0gc2lsw6puY2lvLCBjb20gbyBIVE1MIGRvIHNlcnZpZG9yIGFpbmRhIG5hIHRlbGEgZSBuZW5odW1hIHBpc3RhIGRlXG4gKiBxdWUgYWxnbyBxdWVicm91LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0SHlkcmF0aW9uRXJyb3IoZXJyb3IsIHNjb3BlKSB7XG4gICAgY29uc3QgaXNFcnJvciA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3I7XG4gICAgY29uc3QgbW9kdWxlSWQgPSBzY29wZT8ubW9kdWxlSWQ7XG4gICAgY29uc3QgZXhwb3J0TmFtZSA9IHNjb3BlPy5leHBvcnROYW1lO1xuICAgIGNvbnN0IGRldGFpbCA9IHtcbiAgICAgICAgcGF0aDogW1wiaHlkcmF0ZVwiLCBtb2R1bGVJZCwgZXhwb3J0TmFtZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIuXCIpLFxuICAgICAgICBtZXNzYWdlOiBpc0Vycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvciksXG4gICAgICAgIHN0YWNrOiBpc0Vycm9yID8gZXJyb3Iuc3RhY2sgOiB1bmRlZmluZWQsXG4gICAgICAgIG1vZHVsZUlkLFxuICAgICAgICBleHBvcnROYW1lLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICB9O1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHdpbmRvdy5fX0FEQVBUSVZFX0hZRFJBVElPTl9FUlJPUlNfXyA/Pz0gW107XG4gICAgICAgIHdpbmRvdy5fX0FEQVBUSVZFX0hZRFJBVElPTl9FUlJPUlNfXy5wdXNoKGRldGFpbCk7XG4gICAgICAgIGRpc3BhdGNoKEhZRFJBVElPTl9FUlJPUl9FVkVOVCwgZGV0YWlsKTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihcIltBZGFwdGl2ZSBoeWRyYXRpb25dXCIsIGRldGFpbC5tZXNzYWdlLCBlcnJvcik7XG59XG5mdW5jdGlvbiBkaXNwYXRjaChuYW1lLCBkZXRhaWwpIHtcbiAgICB0cnkge1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobmFtZSwgeyBkZXRhaWwgfSkpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIC8vIGFtYmllbnRlIHNlbSBDdXN0b21FdmVudDogbyBjb25zb2xlLmVycm9yIGFpbmRhIGNvYnJlIG8gY2Fzb1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB3YXJuSHlkcmF0aW9uSW5zdHJ1Y3Rpb25NaXNzaW5nKHJvb3QsIGtpbmQsIGlkKSB7XG4gICAgd2Fybk1pc21hdGNoKHtcbiAgICAgICAgcGF0aDogYGh5ZHJhdGUuaW5zdHJ1Y3Rpb24uJHtraW5kfS4ke2lkfWAsXG4gICAgICAgIG1lc3NhZ2U6IFwiSHlkcmF0aW9uIGluc3RydWN0aW9uIHRhcmdldCB3YXMgbm90IGZvdW5kIGluIGV4aXN0aW5nIERPTVwiLFxuICAgICAgICBleHBlY3RlZDogYFtkYXRhLWFpZD1cIiR7aWR9XCJdYCxcbiAgICAgICAgZm91bmQ6IFwibm90aGluZ1wiLFxuICAgICAgICBub2RlOiByb290IGluc3RhbmNlb2YgTm9kZSA/IHJvb3QgOiB1bmRlZmluZWRcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRIeWRyYXRpb25NaXNtYXRjaGVzKCkge1xuICAgIHJldHVybiBbLi4ubWlzbWF0Y2hIaXN0b3J5XTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckh5ZHJhdGlvbk1pc21hdGNoZXMoKSB7XG4gICAgbWlzbWF0Y2hMb2cuY2xlYXIoKTtcbiAgICBtaXNtYXRjaEhpc3RvcnkubGVuZ3RoID0gMDtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB3aW5kb3cuX19BREFQVElWRV9IWURSQVRJT05fTUlTTUFUQ0hFU19fID0gW107XG4gICAgfVxufVxuZnVuY3Rpb24gaXNIeWRyYXRpb25EZWJ1Z0VuYWJsZWQoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93Ll9fQURBUFRJVkVfREVCVUdfSFlEUkFUSU9OX18gPT09IHRydWUpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBnbG9iYWxUaGlzPy5wcm9jZXNzPy5lbnY/LkFEQVBUSVZFX1BVQkxJQ19ERUJVR19IWURSQVRJT04gPT09IFwidHJ1ZVwiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnSHlkcmF0aW9uTG9nKC4uLmFyZ3MpIHtcbiAgICBpZiAoIWlzSHlkcmF0aW9uRGVidWdFbmFibGVkKCkpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zb2xlLmxvZyguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIHJlYWRIeWRyYXRpb25Sb3V0ZSgpIHtcbiAgICAvLyB3aW5kb3cgc2VtIGRvY3VtZW50IGFjb250ZWNlIGVtIGFtYmllbnRlIGNvbSBzaGltICh3b3JrZXIsIHRlc3QgcnVubmVyKS5cbiAgICAvLyBVbSBkaWFnbsOzc3RpY28gcXVlIGxhbsOnYSBhbyByZWxhdGFyIGVzY29uZGUgbyBlcnJvIHF1ZSBlbGUgaWEgbW9zdHJhci5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIHJldHVybiBcInNlcnZlclwiO1xuICAgIGFwcGx5SHlkcmF0aW9uUGF5bG9hZFRvV2luZG93KGRvY3VtZW50KTtcbiAgICByZXR1cm4gd2luZG93Ll9fUk9VVEVfXyA/PyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG59XG5mdW5jdGlvbiBjYXB0dXJlTm9kZVNuaXBwZXQobm9kZSkge1xuICAgIGlmICghbm9kZSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpXG4gICAgICAgIHJldHVybiBub2RlLnRleHRDb250ZW50ID8/IFwiXCI7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFKVxuICAgICAgICByZXR1cm4gYDwhLS0ke25vZGUudGV4dENvbnRlbnQgPz8gXCJcIn0tLT5gO1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSlcbiAgICAgICAgcmV0dXJuIG5vZGUub3V0ZXJIVE1MLnNsaWNlKDAsIDIwMCk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1pc21hdGNoLmpzLm1hcCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqXG4gKiBldmVudHMoKSDigJQgbW90b3IgZGUgZWZlaXRvcyByZWF0aXZvcyBkbyBBZGFwdGl2ZSAobcOzZHVsbyBhdXTDtG5vbW8pLlxuICpcbiAqIEFQSTpcbiAqICAgZXZlbnRzKCgpID0+IHsgY29uc29sZS5sb2coY291bnQoKSk7IHJldHVybiAoKSA9PiBjbGVhbnVwIH0pXG4gKiAgIGV2ZW50cygoKSA9PiB7fSwgW2RlcF0pXG4gKiAgIGV2ZW50cygoKSA9PiB7fSwgW10sIHsgcGhhc2U6IFwibGF5b3V0XCIsIGlnbm9yZTogW3NldFhdIH0pXG4gKiAgIGxheW91dEV2ZW50cygoKSA9PiB7fSlcbiAqICAgYmF0Y2goKCkgPT4geyBzZXRBKDEpOyBzZXRCKDIpOyB9KVxuICovXG5pbXBvcnQgeyByZWFkU2VydmVyQ29udGV4dCB9IGZyb20gXCJAYWRhcHRpdmUtanMvc2hhcmVkXCI7XG5leHBvcnQgY29uc3QgaXNTU1IgPSAoKSA9PiB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiO1xuZnVuY3Rpb24gaXNBZGFwdGl2ZUh5ZHJhdGlvbkRlYnVnRW5hYmxlZCgpIHtcbiAgICBpZiAoIWlzU1NSKCkgJiYgd2luZG93Ll9fQURBUFRJVkVfREVCVUdfSFlEUkFUSU9OX18gPT09IHRydWUpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBnbG9iYWxUaGlzPy5wcm9jZXNzPy5lbnY/LkFEQVBUSVZFX1BVQkxJQ19ERUJVR19IWURSQVRJT04gPT09IFwidHJ1ZVwiO1xufVxuZnVuY3Rpb24gZGVidWdTaWduYWxMb2coLi4uYXJncykge1xuICAgIGlmICghaXNBZGFwdGl2ZUh5ZHJhdGlvbkRlYnVnRW5hYmxlZCgpKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc29sZS5sb2coXCJbYWRhcHRpdmU6aHlkcmF0aW9uXVwiLCAuLi5hcmdzKTtcbn1cbmxldCBhY3RpdmVIeWRyYXRpb25Db2xsZWN0aW9uID0gbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBydW5IeWRyYXRpb25Db2xsZWN0aW9uKGZuKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSBhY3RpdmVIeWRyYXRpb25Db2xsZWN0aW9uO1xuICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICB1bnN1cHBvcnRlZEZlYXR1cmVzOiBuZXcgU2V0KCksXG4gICAgICAgIGVmZmVjdEluc3RydWN0aW9uczogW10sXG4gICAgfTtcbiAgICBhY3RpdmVIeWRyYXRpb25Db2xsZWN0aW9uID0gc3RhdGU7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBmbigpLFxuICAgICAgICAgICAgdW5zdXBwb3J0ZWRGZWF0dXJlczogQXJyYXkuZnJvbShzdGF0ZS51bnN1cHBvcnRlZEZlYXR1cmVzKSxcbiAgICAgICAgICAgIGVmZmVjdEluc3RydWN0aW9uczogWy4uLnN0YXRlLmVmZmVjdEluc3RydWN0aW9uc10sXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBhY3RpdmVIeWRyYXRpb25Db2xsZWN0aW9uID0gcHJldmlvdXM7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIG1hcmtVbnN1cHBvcnRlZEZlYXR1cmUobmFtZSkge1xuICAgIGFjdGl2ZUh5ZHJhdGlvbkNvbGxlY3Rpb24/LnVuc3VwcG9ydGVkRmVhdHVyZXMuYWRkKG5hbWUpO1xuICAgIGRlYnVnU2lnbmFsTG9nKFwidW5zdXBwb3J0ZWQgZmVhdHVyZTpcIiwgbmFtZSk7XG59XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEVuZ2luZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5jbGFzcyBFdmVudFN5c3RlbSB7XG4gICAgY3VycmVudEVmZmVjdCA9IG51bGw7XG4gICAgY3VycmVudFNjb3BlID0gbnVsbDtcbiAgICBjbGVhbnVwcyA9IG5ldyBNYXAoKTtcbiAgICBlZmZlY3RTb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgIGlnbm9yZWRTb3VyY2VzID0gbmV3IFdlYWtNYXAoKTtcbiAgICBlZmZlY3RQaGFzZXMgPSBuZXcgV2Vha01hcCgpO1xuICAgIGVmZmVjdFNjb3BlcyA9IG5ldyBNYXAoKTtcbiAgICBkaXNwb3NlZEVmZmVjdHMgPSBuZXcgV2Vha1NldCgpO1xuICAgIHBlbmRpbmcgPSBuZXcgV2Vha1NldCgpO1xuICAgIGxheW91dFF1ZXVlID0gbmV3IFNldCgpO1xuICAgIGVmZmVjdFF1ZXVlID0gbmV3IFNldCgpO1xuICAgIGZsdXNoaW5nID0gZmFsc2U7XG4gICAgYmF0Y2hEZXB0aCA9IDA7XG4gICAgbmV4dFNjb3BlSWQgPSAxO1xuICAgIC8vIGNhY2hlIGZvciBuby1zY29wZSBlZmZlY3RzIHRvIHJlc3BlY3QgZGVwcyB3aGVuIGVmZmVjdCByZWYgaXMgc3RhYmxlXG4gICAgbm9TY29wZUNhY2hlID0gbmV3IE1hcCgpO1xuICAgIGdldEN1cnJlbnRFZmZlY3QoKSB7IHJldHVybiB0aGlzLmN1cnJlbnRFZmZlY3Q7IH1cbiAgICBnZXRDdXJyZW50U2NvcGUoKSB7IHJldHVybiB0aGlzLmN1cnJlbnRTY29wZTsgfVxuICAgIGlzRGlzcG9zZWQoZWZmZWN0KSB7IHJldHVybiB0aGlzLmRpc3Bvc2VkRWZmZWN0cy5oYXMoZWZmZWN0KTsgfVxuICAgIHNldEN1cnJlbnRFZmZlY3QoZWZmZWN0KSB7IHRoaXMuY3VycmVudEVmZmVjdCA9IGVmZmVjdDsgfVxuICAgIGNyZWF0ZVNjb3BlKGxhYmVsKSB7XG4gICAgICAgIHJldHVybiB7IGlkOiB0aGlzLm5leHRTY29wZUlkKyssIGxhYmVsLCBob29rczogW10sIGhvb2tJbmRleDogMCB9O1xuICAgIH1cbiAgICBydW5XaXRoU2NvcGUoc2NvcGUsIGZuKSB7XG4gICAgICAgIGNvbnN0IHByZXYgPSB0aGlzLmN1cnJlbnRTY29wZTtcbiAgICAgICAgY29uc3QgcHJldkluZGV4ID0gc2NvcGUuaG9va0luZGV4O1xuICAgICAgICB0aGlzLmN1cnJlbnRTY29wZSA9IHNjb3BlO1xuICAgICAgICBzY29wZS5ob29rSW5kZXggPSAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzY29wZS5ob29rSW5kZXggPSBwcmV2SW5kZXg7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY29wZSA9IHByZXY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gLS0gQ29udGV4dCAoUHJvdmlkZXIpIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgcnVuV2l0aENvbnRleHQoY3R4SWQsIHZhbHVlLCBmbikge1xuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMuY3VycmVudFNjb3BlO1xuICAgICAgICBpZiAoIXNjb3BlKVxuICAgICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzQ29udGV4dCA9IHNjb3BlLmNvbnRleHQ7XG4gICAgICAgIGNvbnN0IG5leHRDb250ZXh0ID0gbmV3IE1hcChwcmV2aW91c0NvbnRleHQgPz8gW10pO1xuICAgICAgICBuZXh0Q29udGV4dC5zZXQoY3R4SWQsIHZhbHVlKTtcbiAgICAgICAgc2NvcGUuY29udGV4dCA9IG5leHRDb250ZXh0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzY29wZS5jb250ZXh0ID0gcHJldmlvdXNDb250ZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlYWRDb250ZXh0KGN0eElkLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLmN1cnJlbnRTY29wZTtcbiAgICAgICAgaWYgKCFzY29wZT8uY29udGV4dD8uaGFzKGN0eElkKSlcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIHJldHVybiBzY29wZS5jb250ZXh0LmdldChjdHhJZCk7XG4gICAgfVxuICAgIC8vIC0tIFRyYWNraW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB0cmFja1NvdXJjZShlZmZlY3QsIHNvdXJjZSkge1xuICAgICAgICBsZXQgc2V0ID0gdGhpcy5lZmZlY3RTb3VyY2VzLmdldChlZmZlY3QpO1xuICAgICAgICBpZiAoIXNldCkge1xuICAgICAgICAgICAgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgdGhpcy5lZmZlY3RTb3VyY2VzLnNldChlZmZlY3QsIHNldCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0LmFkZChzb3VyY2UpO1xuICAgIH1cbiAgICBjbGVhbnVwU291cmNlcyhlZmZlY3QpIHtcbiAgICAgICAgY29uc3Qgc2V0ID0gdGhpcy5lZmZlY3RTb3VyY2VzLmdldChlZmZlY3QpO1xuICAgICAgICBpZiAoIXNldClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBzb3VyY2Ugb2Ygc2V0KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVTdWJzY3JpYmVyKGVmZmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCB7IH1cbiAgICAgICAgfVxuICAgICAgICBzZXQuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5lZmZlY3RTb3VyY2VzLmRlbGV0ZShlZmZlY3QpO1xuICAgIH1cbiAgICBydW5DbGVhbnVwKGVmZmVjdCkge1xuICAgICAgICBjb25zdCBjbGVhbnVwID0gdGhpcy5jbGVhbnVwcy5nZXQoZWZmZWN0KTtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhbnVwID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkFkYXB0aXZlIGNsZWFudXAgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFudXBzLmRlbGV0ZShlZmZlY3QpO1xuICAgIH1cbiAgICBkaXNwb3NlRWZmZWN0KGVmZmVjdCkge1xuICAgICAgICB0aGlzLmxheW91dFF1ZXVlLmRlbGV0ZShlZmZlY3QpO1xuICAgICAgICB0aGlzLmVmZmVjdFF1ZXVlLmRlbGV0ZShlZmZlY3QpO1xuICAgICAgICB0aGlzLnBlbmRpbmcuZGVsZXRlKGVmZmVjdCk7XG4gICAgICAgIHRoaXMucnVuQ2xlYW51cChlZmZlY3QpO1xuICAgICAgICB0aGlzLmNsZWFudXBTb3VyY2VzKGVmZmVjdCk7XG4gICAgICAgIHRoaXMuaWdub3JlZFNvdXJjZXMuZGVsZXRlKGVmZmVjdCk7XG4gICAgICAgIHRoaXMuZWZmZWN0UGhhc2VzLmRlbGV0ZShlZmZlY3QpO1xuICAgICAgICB0aGlzLmVmZmVjdFNjb3Blcy5kZWxldGUoZWZmZWN0KTtcbiAgICAgICAgdGhpcy5kaXNwb3NlZEVmZmVjdHMuYWRkKGVmZmVjdCk7XG4gICAgICAgIC8vIGFsc28gY2xlYW4gZnJvbSBub1Njb3BlQ2FjaGUgaWYgaXQgd2FzIHRoZSBydW5uZXJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHRoaXMubm9TY29wZUNhY2hlKSB7XG4gICAgICAgICAgICBpZiAodmFsLnJ1bm5lciA9PT0gZWZmZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub1Njb3BlQ2FjaGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVnaXN0ZXJDbGVhbnVwKGVmZmVjdCwgY2xlYW51cCkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFudXAgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cHMuc2V0KGVmZmVjdCwgY2xlYW51cCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cHMuZGVsZXRlKGVmZmVjdCk7XG4gICAgfVxuICAgIHNldElnbm9yZWRTb3VyY2VzKGVmZmVjdCwgc291cmNlcyA9IFtdKSB7XG4gICAgICAgIGlmIChzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pZ25vcmVkU291cmNlcy5kZWxldGUoZWZmZWN0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXh0ID0gbmV3IFdlYWtTZXQoKTtcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKHMgPT4gbmV4dC5hZGQocykpO1xuICAgICAgICB0aGlzLmlnbm9yZWRTb3VyY2VzLnNldChlZmZlY3QsIG5leHQpO1xuICAgIH1cbiAgICBzZXRFZmZlY3RQaGFzZShlZmZlY3QsIHBoYXNlKSB7XG4gICAgICAgIHRoaXMuZWZmZWN0UGhhc2VzLnNldChlZmZlY3QsIHBoYXNlKTtcbiAgICB9XG4gICAgc2hvdWxkSWdub3JlVHJpZ2dlcihlZmZlY3QsIHNvdXJjZSkge1xuICAgICAgICBjb25zdCBpZ25vcmVkID0gdGhpcy5pZ25vcmVkU291cmNlcy5nZXQoZWZmZWN0KTtcbiAgICAgICAgcmV0dXJuIGlnbm9yZWQgPyBpZ25vcmVkLmhhcyhzb3VyY2UpIDogZmFsc2U7XG4gICAgfVxuICAgIC8vIC0tIFNjaGVkdWxpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBzY2hlZHVsZShlZmZlY3QsIHBoYXNlID0gXCJlZmZlY3RcIikge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKGVmZmVjdCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmcuaGFzKGVmZmVjdCkpXG4gICAgICAgICAgICByZXR1cm47IC8vIGRlZHVwXG4gICAgICAgIC8vIGxpZ2EgYW8gbGlmZWN5Y2xlOiBjYXB0dXJhIG8gc2NvcGUgYXR1YWwgbm8gbW9tZW50byBkbyBhZ2VuZGFtZW50b1xuICAgICAgICAvLyBhc3NpbSBjbGVhbnVwU2NvcGUgY29uc2VndWUgZGFyIGRpc3Bvc2UgbWVzbW8gc2UgZmx1c2ggcm9kYXIgZGVwb2lzXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTY29wZSAmJiAhdGhpcy5lZmZlY3RTY29wZXMuaGFzKGVmZmVjdCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0U2NvcGVzLnNldChlZmZlY3QsIHRoaXMuY3VycmVudFNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmcuYWRkKGVmZmVjdCk7XG4gICAgICAgIGlmIChwaGFzZSA9PT0gXCJsYXlvdXRcIilcbiAgICAgICAgICAgIHRoaXMubGF5b3V0UXVldWUuYWRkKGVmZmVjdCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0UXVldWUuYWRkKGVmZmVjdCk7XG4gICAgICAgIGlmICh0aGlzLmJhdGNoRGVwdGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG1pY3JvdGFzayBmbHVzaCB0byBiYXRjaCBzeW5jIHNldHNcbiAgICAgICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHRoaXMuZmx1c2goKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2NoZWR1bGVGcm9tU291cmNlKGVmZmVjdCwgc291cmNlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQoZWZmZWN0KSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkSWdub3JlVHJpZ2dlcihlZmZlY3QsIHNvdXJjZSkpIHtcbiAgICAgICAgICAgIGRlYnVnU2lnbmFsTG9nKFwiaWdub3JlZCB0cmlnZ2VyXCIsIGVmZmVjdCwgc291cmNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwaGFzZSA9IHRoaXMuZWZmZWN0UGhhc2VzLmdldChlZmZlY3QpID8/IFwiZWZmZWN0XCI7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoZWZmZWN0LCBwaGFzZSk7XG4gICAgfVxuICAgIGV4ZWN1dGVFZmZlY3QoZWZmZWN0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQoZWZmZWN0KSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgcHJldiA9IHRoaXMuY3VycmVudEVmZmVjdDtcbiAgICAgICAgdGhpcy5jdXJyZW50RWZmZWN0ID0gZWZmZWN0O1xuICAgICAgICB0aGlzLmNsZWFudXBTb3VyY2VzKGVmZmVjdCk7XG4gICAgICAgIHRoaXMucnVuQ2xlYW51cChlZmZlY3QpO1xuICAgICAgICAvLyByZWdpc3RlciBzY29wZSBpZiBleGlzdHNcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFNjb3BlICYmICF0aGlzLmVmZmVjdFNjb3Blcy5oYXMoZWZmZWN0KSkge1xuICAgICAgICAgICAgdGhpcy5lZmZlY3RTY29wZXMuc2V0KGVmZmVjdCwgdGhpcy5jdXJyZW50U2NvcGUpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBlZmZlY3QoKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDbGVhbnVwKGVmZmVjdCwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkFkYXB0aXZlIGVmZmVjdCBlcnJvcjpcIiwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRFZmZlY3QgPSBwcmV2O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZsdXNoKCkge1xuICAgICAgICBpZiAodGhpcy5mbHVzaGluZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0UXVldWUuc2l6ZSA9PT0gMCAmJiB0aGlzLmVmZmVjdFF1ZXVlLnNpemUgPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuZmx1c2hpbmcgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gbGF5b3V0IGZpcnN0XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5sYXlvdXRRdWV1ZS5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvUnVuID0gQXJyYXkuZnJvbSh0aGlzLmxheW91dFF1ZXVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dFF1ZXVlLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBlZmYgb2YgdG9SdW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nLmRlbGV0ZShlZmYpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWN1dGVFZmZlY3QoZWZmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGVuIGVmZmVjdFxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuZWZmZWN0UXVldWUuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b1J1biA9IEFycmF5LmZyb20odGhpcy5lZmZlY3RRdWV1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZmZlY3RRdWV1ZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZWZmIG9mIHRvUnVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZy5kZWxldGUoZWZmKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGVjdXRlRWZmZWN0KGVmZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5mbHVzaGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJhdGNoKGZuKSB7XG4gICAgICAgIHRoaXMuYmF0Y2hEZXB0aCsrO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmJhdGNoRGVwdGgtLTtcbiAgICAgICAgICAgIGlmICh0aGlzLmJhdGNoRGVwdGggPT09IDApXG4gICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVudHJhY2soZm4pIHtcbiAgICAgICAgY29uc3QgcHJldiA9IHRoaXMuY3VycmVudEVmZmVjdDtcbiAgICAgICAgdGhpcy5jdXJyZW50RWZmZWN0ID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBmbigpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RWZmZWN0ID0gcHJldjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeGVjdXRhIGZuIGUgZGV2b2x2ZSBxdWFpcyBzb3VyY2VzIGVsYSBsZXUsIHNlbSBhZ2VuZGFyIG5hZGEuXG4gICAgICpcbiAgICAgKiBTZXJ2ZSBwYXJhIHF1ZW0gcHJlY2lzYSBkbyB2YWxvciBzw61uY3Jvbm8gRSBkYSBsaXN0YSBkZSBkZXBlbmTDqm5jaWFzLFxuICAgICAqIHNlbSBwYWdhciB1bWEgc2VndW5kYSBleGVjdcOnw6NvIGRhIGZ1bsOnw6NvLiBPIG1lbW8gw6kgbyBjYXNvOiBlbGVcbiAgICAgKiBjYWxjdWxhIG5hIGhvcmEgcGFyYSB0ZXIgbyB2YWxvciBkdXJhbnRlIG8gcmVuZGVyLCBtYXMgc2UgbyBlZmZlY3RcbiAgICAgKiByb2RhciBsb2dvIGVtIHNlZ3VpZGEgcGFyYSBjb21wdXRhciBkZSBub3ZvLCBhIGZ1bsOnw6NvIMOpIGV4ZWN1dGFkYVxuICAgICAqIGR1YXMgdmV6ZXMgbm8gY2xpZW50ZSBlIHVtYSBubyBzZXJ2aWRvci5cbiAgICAgKi9cbiAgICB0cmFja1NvdXJjZXMoZm4pIHtcbiAgICAgICAgY29uc3QgcHJvYmUgPSAoKCkgPT4geyB9KTtcbiAgICAgICAgY29uc3QgcHJldiA9IHRoaXMuY3VycmVudEVmZmVjdDtcbiAgICAgICAgdGhpcy5jdXJyZW50RWZmZWN0ID0gcHJvYmU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGZuKCk7XG4gICAgICAgICAgICBjb25zdCBzZXQgPSB0aGlzLmVmZmVjdFNvdXJjZXMuZ2V0KHByb2JlKTtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlLCBzb3VyY2VzOiBzZXQgPyBbLi4uc2V0XSA6IFtdIH07XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRFZmZlY3QgPSBwcmV2O1xuICAgICAgICAgICAgdGhpcy5lZmZlY3RTb3VyY2VzLmRlbGV0ZShwcm9iZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXNzaW5hIGVmZmVjdCBlbSBzb3VyY2VzIHNlbSBleGVjdXRhciBvIGNvcnBvIGRlbGUuXG4gICAgICpcbiAgICAgKiBBc3NpbmFyIGV4aWdlIGxlciBhIHNvdXJjZSBjb20gbyBlZmZlY3QgYXRpdm8gLS0gw6kgbyByZWFkIHF1ZSByZWdpc3RyYVxuICAgICAqIGEgYXNzaW5hdHVyYS4gTGVyIHVtYSBzb3VyY2UgcHVyYSBuw6NvIHJvZGEgY8OzZGlnbyBkZSB1c3XDoXJpbywgZW50w6NvXG4gICAgICogZMOhIHBhcmEgYXNzaW5hciBzZW0gcmVjb21wdXRhci5cbiAgICAgKi9cbiAgICBsaW5rU291cmNlcyhlZmZlY3QsIHNvdXJjZXMpIHtcbiAgICAgICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBwcmV2ID0gdGhpcy5jdXJyZW50RWZmZWN0O1xuICAgICAgICB0aGlzLmN1cnJlbnRFZmZlY3QgPSBlZmZlY3Q7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBTb3VyY2Ugc2VtIGdldCgpIG5hbyBkYSBwYXJhIGFzc2luYXIgcG9yIGxlaXR1cmE7IG5lc3NlIGNhc28gb1xuICAgICAgICAgICAgLy8gZWZmZWN0IHNvIHZhaSByZWFnaXIgcXVhbmRvIG8gcHJvcHJpbyBjb3JwbyByb2Rhci5cbiAgICAgICAgICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHNvdXJjZXMpXG4gICAgICAgICAgICAgICAgc291cmNlLmdldD8uKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRFZmZlY3QgPSBwcmV2O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIC0tIFNjb3BlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBjbGVhbnVwU2NvcGUoc2NvcGUpIHtcbiAgICAgICAgZm9yIChjb25zdCBbZWZmLCBlZmZTY29wZV0gb2YgdGhpcy5lZmZlY3RTY29wZXMuZW50cmllcygpKSB7XG4gICAgICAgICAgICBpZiAoZWZmU2NvcGUgPT09IHNjb3BlKVxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZUVmZmVjdChlZmYpOyAvLyA8LSByb2RhIGNsZWFudXAgZG8gaW5pdFxuICAgICAgICB9XG4gICAgICAgIC8vIHJlc2V0IGluaXQgaG9va3NcbiAgICAgICAgZm9yIChjb25zdCBob29rIG9mIHNjb3BlLmhvb2tzKSB7XG4gICAgICAgICAgICBpZiAoIWhvb2spXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhvb2sgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoXCJzY2hlZHVsZWRcIiBpbiBob29rKVxuICAgICAgICAgICAgICAgICAgICBob29rLnNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChcInJ1bm5lclwiIGluIGhvb2sgJiYgaG9vay5ydW5uZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlRWZmZWN0KGhvb2sucnVubmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKFwiZGlzcG9zZVwiIGluIGhvb2sgJiYgdHlwZW9mIGhvb2suZGlzcG9zZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBob29rLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCB7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGhvb2suc2lnbmFsICYmIEFycmF5LmlzQXJyYXkoaG9vay5zaWduYWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1lbW8gc2lnbmFsIGNsZWFudXAgaXMgaGFuZGxlZCB2aWEgZGlzcG9zZSBhYm92ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzY29wZS5ob29rcy5sZW5ndGggPSAwO1xuICAgICAgICBzY29wZS5ob29rSW5kZXggPSAwO1xuICAgICAgICBzY29wZS5jb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjbGVhbnVwQWxsKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGVmZiBvZiBBcnJheS5mcm9tKHRoaXMuZWZmZWN0U291cmNlcy5rZXlzKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2VFZmZlY3QoZWZmKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheW91dFF1ZXVlLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZWZmZWN0UXVldWUuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5ub1Njb3BlQ2FjaGUuY2xlYXIoKTtcbiAgICB9XG4gICAgLy8gbm8tc2NvcGUgaGVscGVyc1xuICAgIGdldE5vU2NvcGVFbnRyeShlZmZlY3QpIHsgcmV0dXJuIHRoaXMubm9TY29wZUNhY2hlLmdldChlZmZlY3QpOyB9XG4gICAgc2V0Tm9TY29wZUVudHJ5KGVmZmVjdCwgZGVwcywgcnVubmVyKSB7XG4gICAgICAgIHRoaXMubm9TY29wZUNhY2hlLnNldChlZmZlY3QsIHsgZGVwcywgcnVubmVyIH0pO1xuICAgIH1cbn1cbmNvbnN0IHN5c3RlbSA9IG5ldyBFdmVudFN5c3RlbSgpO1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFdmVudFNvdXJjZSDigJQgc2lnbmFsIGNvcmVcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIEV2ZW50U291cmNlIHtcbiAgICBzdWJzY3JpYmVycyA9IG5ldyBTZXQoKTtcbiAgICB2YWx1ZTtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsKSB7IHRoaXMudmFsdWUgPSBpbml0aWFsOyB9XG4gICAgZ2V0KCkge1xuICAgICAgICBjb25zdCBlZmZlY3QgPSBzeXN0ZW0uZ2V0Q3VycmVudEVmZmVjdCgpO1xuICAgICAgICBpZiAoZWZmZWN0ICYmICFzeXN0ZW0uaXNEaXNwb3NlZChlZmZlY3QpKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJzLmFkZChlZmZlY3QpO1xuICAgICAgICAgICAgc3lzdGVtLnRyYWNrU291cmNlKGVmZmVjdCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHNldChuZXh0KSB7XG4gICAgICAgIGlmIChPYmplY3QuaXModGhpcy52YWx1ZSwgbmV4dCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXh0O1xuICAgICAgICBkZWJ1Z1NpZ25hbExvZyhcInNldFwiLCBuZXh0LCBcInN1YnM6XCIsIHRoaXMuc3Vic2NyaWJlcnMuc2l6ZSk7XG4gICAgICAgIGZvciAoY29uc3Qgc3ViIG9mIFsuLi50aGlzLnN1YnNjcmliZXJzXSlcbiAgICAgICAgICAgIHN5c3RlbS5zY2hlZHVsZUZyb21Tb3VyY2Uoc3ViLCB0aGlzKTtcbiAgICB9XG4gICAgdXBkYXRlKGZuKSB7IHRoaXMuc2V0KGZuKHRoaXMudmFsdWUpKTsgfVxuICAgIHJlbW92ZVN1YnNjcmliZXIoZWZmZWN0KSB7IHRoaXMuc3Vic2NyaWJlcnMuZGVsZXRlKGVmZmVjdCk7IH1cbiAgICAvLyBmb3IgYnJpZGdlXG4gICAgX2dldFN1YnNjcmliZXJzKCkgeyByZXR1cm4gdGhpcy5zdWJzY3JpYmVyczsgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50U2lnbmFsKGluaXRpYWwpIHtcbiAgICBjb25zdCBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoaW5pdGlhbCk7XG4gICAgY29uc3QgZ2V0ID0gKCkgPT4gc291cmNlLmdldCgpO1xuICAgIGNvbnN0IHNldCA9ICgodikgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIHNvdXJjZS51cGRhdGUodik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNvdXJjZS5zZXQodik7XG4gICAgfSk7XG4gICAgc2V0Ll9fYWRhcHRpdmVTb3VyY2UgPSBzb3VyY2U7XG4gICAgcmV0dXJuIFtnZXQsIHNldF07XG59XG4vKiogQnJpZGdlOiBzaWduYWwgbGVnYWRvIGF2aXNhIGVzdGUgbW90b3Igbm8gc2V0KCkuICovXG5leHBvcnQgZnVuY3Rpb24gbm90aWZ5RXh0ZXJuYWxTb3VyY2Uoc291cmNlLCBzdWJzY3JpYmVycykge1xuICAgIGZvciAoY29uc3QgZWZmZWN0IG9mIHN1YnNjcmliZXJzKVxuICAgICAgICBzeXN0ZW0uc2NoZWR1bGVGcm9tU291cmNlKGVmZmVjdCwgc291cmNlKTtcbn1cbi8qKiBCcmlkZ2U6IHNpZ25hbCBsZWdhZG8gYXNzaW5hIG5vIGdldCgpIHNlIGhvdXZlciBlZmZlY3QgYXRpdm8uICovXG5leHBvcnQgZnVuY3Rpb24gdHJhY2tFeHRlcm5hbFNvdXJjZShlZmZlY3QsIHNvdXJjZSkge1xuICAgIHN5c3RlbS50cmFja1NvdXJjZShlZmZlY3QsIHNvdXJjZSk7XG59XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIENvbnRleHQgQVBJXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBydW5XaXRoQ29udGV4dChjdHhJZCwgdmFsdWUsIGZuKSB7XG4gICAgcmV0dXJuIHN5c3RlbS5ydW5XaXRoQ29udGV4dChjdHhJZCwgdmFsdWUsIGZuKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWFkQ29udGV4dChjdHhJZCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgY29uc3QgdmFsdWUgPSBzeXN0ZW0ucmVhZENvbnRleHQoY3R4SWQsIGRlZmF1bHRWYWx1ZSk7XG4gICAgaWYgKHZhbHVlICE9PSBkZWZhdWx0VmFsdWUpXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICByZXR1cm4gcmVhZFNlcnZlckNvbnRleHQoY3R4SWQsIGRlZmF1bHRWYWx1ZSk7XG59XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEhvb2sgc2xvdFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gdXNlSG9va1Nsb3QoZmFjdG9yeSkge1xuICAgIGNvbnN0IHNjb3BlID0gc3lzdGVtLmdldEN1cnJlbnRTY29wZSgpO1xuICAgIGlmICghc2NvcGUpXG4gICAgICAgIHJldHVybiBmYWN0b3J5KCk7XG4gICAgY29uc3QgaW5kZXggPSBzY29wZS5ob29rSW5kZXgrKztcbiAgICBpZiAoIXNjb3BlLmhvb2tzW2luZGV4XSlcbiAgICAgICAgc2NvcGUuaG9va3NbaW5kZXhdID0gZmFjdG9yeSgpO1xuICAgIHJldHVybiBzY29wZS5ob29rc1tpbmRleF07XG59XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEFQSSBww7pibGljYVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mdW5jdGlvbiByZXNvbHZlSWdub3JlZChpZ25vcmUpIHtcbiAgICBpZiAoIWlnbm9yZT8ubGVuZ3RoKVxuICAgICAgICByZXR1cm4gW107XG4gICAgcmV0dXJuIGlnbm9yZS5tYXAoaXRlbSA9PiBpdGVtLl9fYWRhcHRpdmVTb3VyY2UpLmZpbHRlcigocykgPT4gQm9vbGVhbihzKSk7XG59XG5mdW5jdGlvbiBoYXZlRGVwc0NoYW5nZWQocHJldiwgbmV4dCkge1xuICAgIGlmICghcHJldilcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgaWYgKHByZXYubGVuZ3RoICE9PSBuZXh0Lmxlbmd0aClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIG5leHQuc29tZSgoZCwgaSkgPT4gIU9iamVjdC5pcyhkLCBwcmV2W2ldKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZXZlbnRzKGVmZmVjdCwgZGVwcyA9IFtdLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBwaGFzZSA9IG9wdGlvbnMucGhhc2UgPz8gXCJlZmZlY3RcIjtcbiAgICBjb25zdCBpZ25vcmVkID0gcmVzb2x2ZUlnbm9yZWQob3B0aW9ucy5pZ25vcmUpO1xuICAgIGNvbnN0IHN1YnNjcmliZVRvID0gb3B0aW9ucy5zdWJzY3JpYmVUbztcbiAgICBjb25zdCByZXNvbHZlZERlcHMgPSBkZXBzLm1hcChkID0+ICh0eXBlb2YgZCA9PT0gXCJmdW5jdGlvblwiID8gZCgpIDogZCkpO1xuICAgIGlmIChhY3RpdmVIeWRyYXRpb25Db2xsZWN0aW9uKSB7XG4gICAgICAgIGFjdGl2ZUh5ZHJhdGlvbkNvbGxlY3Rpb24uZWZmZWN0SW5zdHJ1Y3Rpb25zLnB1c2goe1xuICAgICAgICAgICAga2luZDogcGhhc2UgPT09IFwibGF5b3V0XCIgPyBcImxheW91dC1lZmZlY3RcIiA6IFwiZWZmZWN0XCIsXG4gICAgICAgICAgICBlZmZlY3QsXG4gICAgICAgICAgICBkZXBzOiByZXNvbHZlZERlcHMsXG4gICAgICAgICAgICBpZ25vcmVkU291cmNlczogaWdub3JlZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGRlYnVnU2lnbmFsTG9nKFwiY29sbGVjdFwiLCBwaGFzZSwgZWZmZWN0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNTU1IoKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHNjb3BlID0gc3lzdGVtLmdldEN1cnJlbnRTY29wZSgpO1xuICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgLy8gbm8tc2NvcGUgcGF0aDogcmVzcGVjdCBkZXBzIGlmIHNhbWUgZWZmZWN0IHJlZmVyZW5jZSByZXVzZWRcbiAgICAgICAgY29uc3QgY2FjaGVkID0gc3lzdGVtLmdldE5vU2NvcGVFbnRyeShlZmZlY3QpO1xuICAgICAgICBpZiAoY2FjaGVkICYmICFoYXZlRGVwc0NoYW5nZWQoY2FjaGVkLmRlcHMsIHJlc29sdmVkRGVwcykpIHtcbiAgICAgICAgICAgIHJldHVybjsgLy8gZGVwcyBlcXVhbCwgc2tpcFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJ1bm5lciA9ICgpID0+IGVmZmVjdCgpO1xuICAgICAgICBzeXN0ZW0uc2V0SWdub3JlZFNvdXJjZXMocnVubmVyLCBpZ25vcmVkKTtcbiAgICAgICAgc3lzdGVtLnNldEVmZmVjdFBoYXNlKHJ1bm5lciwgcGhhc2UpO1xuICAgICAgICBzeXN0ZW0uc2V0Tm9TY29wZUVudHJ5KGVmZmVjdCwgcmVzb2x2ZWREZXBzLCBydW5uZXIpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlVG8pIHtcbiAgICAgICAgICAgIHN5c3RlbS5saW5rU291cmNlcyhydW5uZXIsIHN1YnNjcmliZVRvKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzeXN0ZW0uc2NoZWR1bGUocnVubmVyLCBwaGFzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSBzY29wZS5ob29rSW5kZXgrKztcbiAgICBpZiAoIXNjb3BlLmhvb2tzW2luZGV4XSkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAgIGVmZmVjdCxcbiAgICAgICAgICAgIGRlcHM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgICAgIHJ1bm5lcjogKCkgPT4gc3RhdGUuZWZmZWN0KCksXG4gICAgICAgIH07XG4gICAgICAgIHNjb3BlLmhvb2tzW2luZGV4XSA9IHN0YXRlO1xuICAgIH1cbiAgICBjb25zdCBob29rID0gc2NvcGUuaG9va3NbaW5kZXhdO1xuICAgIGhvb2suZWZmZWN0ID0gZWZmZWN0O1xuICAgIHN5c3RlbS5zZXRJZ25vcmVkU291cmNlcyhob29rLnJ1bm5lciwgaWdub3JlZCk7XG4gICAgc3lzdGVtLnNldEVmZmVjdFBoYXNlKGhvb2sucnVubmVyLCBwaGFzZSk7XG4gICAgaWYgKGhvb2suaW5pdGlhbGl6ZWQgJiYgIWhhdmVEZXBzQ2hhbmdlZChob29rLmRlcHMsIHJlc29sdmVkRGVwcykpXG4gICAgICAgIHJldHVybjtcbiAgICBob29rLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBob29rLmRlcHMgPSByZXNvbHZlZERlcHM7XG4gICAgaWYgKHN1YnNjcmliZVRvKSB7XG4gICAgICAgIHN5c3RlbS5saW5rU291cmNlcyhob29rLnJ1bm5lciwgc3Vic2NyaWJlVG8pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHN5c3RlbS5zY2hlZHVsZShob29rLnJ1bm5lciwgcGhhc2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxheW91dEV2ZW50cyhlZmZlY3QsIGRlcHMgPSBbXSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgZXZlbnRzKGVmZmVjdCwgZGVwcywgeyAuLi5vcHRpb25zLCBwaGFzZTogXCJsYXlvdXRcIiB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYXRjaChmbikgeyByZXR1cm4gc3lzdGVtLmJhdGNoKGZuKTsgfVxuZXhwb3J0IGZ1bmN0aW9uIGZsdXNoRXZlbnRzKCkgeyBzeXN0ZW0uZmx1c2goKTsgfVxuZXhwb3J0IGZ1bmN0aW9uIGZsdXNoRWZmZWN0cygpIHsgc3lzdGVtLmZsdXNoKCk7IH0gLy8gYWxpYXMgY29tcGF0XG5leHBvcnQgZnVuY3Rpb24gdW50cmFjayhmbikgeyByZXR1cm4gc3lzdGVtLnVudHJhY2soZm4pOyB9XG5leHBvcnQgZnVuY3Rpb24gdHJhY2tTb3VyY2VzKGZuKSB7XG4gICAgcmV0dXJuIHN5c3RlbS50cmFja1NvdXJjZXMoZm4pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50c1Njb3BlKGxhYmVsKSB7IHJldHVybiBzeXN0ZW0uY3JlYXRlU2NvcGUobGFiZWwpOyB9XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWZmZWN0U2NvcGUobGFiZWwpIHsgcmV0dXJuIHN5c3RlbS5jcmVhdGVTY29wZShsYWJlbCk7IH0gLy8gY29tcGF0XG5leHBvcnQgZnVuY3Rpb24gcnVuV2l0aEV2ZW50c1Njb3BlKHNjb3BlLCBmbikgeyByZXR1cm4gc3lzdGVtLnJ1bldpdGhTY29wZShzY29wZSwgZm4pOyB9XG5leHBvcnQgZnVuY3Rpb24gcnVuV2l0aEVmZmVjdFNjb3BlKHNjb3BlLCBmbikgeyByZXR1cm4gc3lzdGVtLnJ1bldpdGhTY29wZShzY29wZSwgZm4pOyB9XG5leHBvcnQgZnVuY3Rpb24gY2xlYW51cEV2ZW50c1Njb3BlKHNjb3BlKSB7IHN5c3RlbS5jbGVhbnVwU2NvcGUoc2NvcGUpOyB9XG5leHBvcnQgZnVuY3Rpb24gY2xlYW51cEVmZmVjdFNjb3BlKHNjb3BlKSB7IHN5c3RlbS5jbGVhbnVwU2NvcGUoc2NvcGUpOyB9XG5leHBvcnQgZnVuY3Rpb24gY2xlYW51cEFsbEV2ZW50cygpIHsgc3lzdGVtLmNsZWFudXBBbGwoKTsgfVxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFudXBBbGxFZmZlY3RzKCkgeyBzeXN0ZW0uY2xlYW51cEFsbCgpOyB9XG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRzU3lzdGVtKCkgeyByZXR1cm4gc3lzdGVtOyB9XG5leHBvcnQgeyBkZWJ1Z1NpZ25hbExvZywgaXNBZGFwdGl2ZUh5ZHJhdGlvbkRlYnVnRW5hYmxlZCB9O1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBBbGlhc2VzIGRlIGNvbXBhdGliaWxpZGFkZSBjb20gbyBpbmRleC50cyBhbnRpZ28gKHByYSBwb2RlciBhcGFnYXIgaW5kZXgpXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWFjdGl2ZUVmZmVjdChlZmZlY3QsIHBoYXNlID0gXCJsYXlvdXRcIiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgcnVubmVyID0gKCkgPT4gZWZmZWN0KCk7XG4gICAgc3lzdGVtLnNldElnbm9yZWRTb3VyY2VzKHJ1bm5lciwgcmVzb2x2ZUlnbm9yZWQob3B0aW9ucy5pZ25vcmUpKTtcbiAgICBzeXN0ZW0uc2V0RWZmZWN0UGhhc2UocnVubmVyLCBwaGFzZSk7XG4gICAgc3lzdGVtLnNjaGVkdWxlKHJ1bm5lciwgcGhhc2UpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHN5c3RlbS5kaXNwb3NlRWZmZWN0KHJ1bm5lcik7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50cy5qcy5tYXAiLCIvKlxuICogQVBJIHDDumJsaWNhIGRlIGVzdGFkbyByZWF0aXZvIGRvIEFkYXB0aXZlLlxuICogTm9tZXMgcHLDs3ByaW9zIChzZW0gdXNlKiBkbyBSZWFjdCkuXG4gKlxuICogICBjb25zdCBbY291bnQsIHNldENvdW50XSA9IHNpZ25hbCgwKTtcbiAqICAgY29uc3QgYm94ID0gcmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAqICAgY29uc3QgbGFiZWwgPSBtZW1vKCgpID0+IGBuPSR7Y291bnQoKX1gKTtcbiAqICAgY29uc3QgZm9ybSA9IHN0b3JlKHsgbmFtZTogXCJcIiwgYWdlOiAwIH0pO1xuICovXG5pbXBvcnQgeyBjcmVhdGVFdmVudFNpZ25hbCwgZXZlbnRzLCB0cmFja1NvdXJjZXMsIHVudHJhY2ssIHVzZUhvb2tTbG90LCBpc1NTUiwgfSBmcm9tIFwiLi9ldmVudHMuanNcIjtcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gc2lnbmFsXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBzaWduYWwoaW5pdGlhbFZhbHVlKSB7XG4gICAgcmV0dXJuIHVzZUhvb2tTbG90KCgpID0+IGNyZWF0ZUV2ZW50U2lnbmFsKGluaXRpYWxWYWx1ZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJvb3RTaWduYWwoaW5pdGlhbFZhbHVlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUV2ZW50U2lnbmFsKGluaXRpYWxWYWx1ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2lnbmFsKGluaXRpYWxWYWx1ZSkge1xuICAgIC8vIGFsaWFzIGNvbXBhdCAtIGFudGVzIGZpY2F2YSBubyBpbmRleC50c1xuICAgIHJldHVybiBjcmVhdGVFdmVudFNpZ25hbChpbml0aWFsVmFsdWUpO1xufVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyByZWZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIHJlZihpbml0aWFsVmFsdWUgPSBudWxsKSB7XG4gICAgcmV0dXJuIHVzZUhvb2tTbG90KCgpID0+ICh7IGN1cnJlbnQ6IGluaXRpYWxWYWx1ZSB9KSk7XG59XG5mdW5jdGlvbiBkZXBzQ2hhbmdlZChwcmV2LCBuZXh0KSB7XG4gICAgaWYgKCFwcmV2KVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBpZiAocHJldi5sZW5ndGggIT09IG5leHQubGVuZ3RoKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gbmV4dC5zb21lKChkLCBpKSA9PiAhT2JqZWN0LmlzKGQsIHByZXZbaV0pKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtZW1vKGNvbXB1dGUsIGRlcHMpIHtcbiAgICBjb25zdCBob29rID0gdXNlSG9va1Nsb3QoKCkgPT4gKHtcbiAgICAgICAgc2lnbmFsOiBjcmVhdGVFdmVudFNpZ25hbCh1bmRlZmluZWQpLFxuICAgICAgICBpbml0aWFsaXplZDogZmFsc2UsXG4gICAgfSkpO1xuICAgIGlmICghaG9vay5pbml0aWFsaXplZCkge1xuICAgICAgICBob29rLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgWywgc2V0XSA9IGhvb2suc2lnbmFsO1xuICAgICAgICAvLyBDYWxjdWxhIHVtYSB2ZXosIGFnb3JhLCBwYXJhIG8gdmFsb3IgZXhpc3RpciBkdXJhbnRlIG8gcmVuZGVyLiBBc1xuICAgICAgICAvLyBkZXBlbmTDqm5jaWFzIHNhZW0gZGEgbWVzbWEgZXhlY3XDp8OjbyBkZSBncmHDp2E6IG8gZWZmZWN0IHNlIGFzc2luYVxuICAgICAgICAvLyBuZWxhcyBzZW0gcm9kYXIgY29tcHV0ZSBkZSBub3ZvLlxuICAgICAgICAvL1xuICAgICAgICAvLyBBbnRlcyBpc3NvIGVyYSB1bnRyYWNrKGNvbXB1dGUoKSkgKyBldmVudHMoKCkgPT4gc2V0KGNvbXB1dGUoKSkpLiBOb1xuICAgICAgICAvLyBjbGllbnRlIG8gZXZlbnRzIHJvZGEgbmEgaG9yYSwgZW50w6NvIGNvbXB1dGUgZXhlY3V0YXZhIERVQVMgdmV6ZXMgLS1cbiAgICAgICAgLy8gZSBubyBzZXJ2aWRvciB1bWEsIHBvcnF1ZSBldmVudHMoKSBzYWkgY2VkbyBlbSBTU1IuIEVzc2EgZGlmZXJlbsOnYVxuICAgICAgICAvLyBkZSAxIHBhcmEgMiBmYXppYSBvIGNvbnRhZG9yIGRvIGV4ZW1wbG8gZGl2ZXJnaXIgZG8gSFRNTCBkbyBzZXJ2aWRvci5cbiAgICAgICAgY29uc3QgeyB2YWx1ZSwgc291cmNlcyB9ID0gdHJhY2tTb3VyY2VzKCgpID0+IGNvbXB1dGUoKSk7XG4gICAgICAgIHNldCh2YWx1ZSk7XG4gICAgICAgIC8vIGVmZWl0byByZWF0aXZvIHF1ZSBtYW50w6ltIG1lbW8gYXR1YWxpemFkbyBhdXRvbWF0aWNhbWVudGVcbiAgICAgICAgLy8gZ3VhcmRhbW9zIHJ1bm5lciB2aWEgZXZlbnRzIHBhcmEgY2xlYW51cFxuICAgICAgICBldmVudHMoKCkgPT4ge1xuICAgICAgICAgICAgc2V0KGNvbXB1dGUoKSk7XG4gICAgICAgIH0sIFtdLCB7IHN1YnNjcmliZVRvOiBzb3VyY2VzIH0pO1xuICAgICAgICBpZiAoZGVwcylcbiAgICAgICAgICAgIGhvb2sucHJldkRlcHMgPSBkZXBzLm1hcChkID0+IHR5cGVvZiBkID09PSBcImZ1bmN0aW9uXCIgPyBkKCkgOiBkKTtcbiAgICAgICAgcmV0dXJuIGhvb2suc2lnbmFsWzBdO1xuICAgIH1cbiAgICAvLyBjb21wYXQ6IHNlIGRlcHMgZXhwbGljaXRvIGZvciBwYXNzYWRvLCBzw7MgcmVjb21wdXRhIHF1YW5kbyBtdWRhclxuICAgIGlmIChBcnJheS5pc0FycmF5KGRlcHMpICYmIGRlcHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IGRlcHMubWFwKGQgPT4gdHlwZW9mIGQgPT09IFwiZnVuY3Rpb25cIiA/IGQoKSA6IGQpO1xuICAgICAgICBpZiAoZGVwc0NoYW5nZWQoaG9vay5wcmV2RGVwcywgcmVzb2x2ZWQpKSB7XG4gICAgICAgICAgICBob29rLnByZXZEZXBzID0gcmVzb2x2ZWQ7XG4gICAgICAgICAgICBob29rLnNpZ25hbFsxXSh1bnRyYWNrKCgpID0+IGNvbXB1dGUoKSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBob29rLnNpZ25hbFswXTtcbn1cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gc3RvcmVcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIHN0b3JlKGluaXRpYWxTdGF0ZSkge1xuICAgIHJldHVybiB1c2VIb29rU2xvdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG91dCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhpbml0aWFsU3RhdGUpKSB7XG4gICAgICAgICAgICBvdXRba2V5XSA9IGNyZWF0ZUV2ZW50U2lnbmFsKGluaXRpYWxTdGF0ZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJvb3RTdG9yZShpbml0aWFsU3RhdGUpIHtcbiAgICBjb25zdCBvdXQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhpbml0aWFsU3RhdGUpKSB7XG4gICAgICAgIG91dFtrZXldID0gY3JlYXRlRXZlbnRTaWduYWwoaW5pdGlhbFN0YXRlW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKGluaXRpYWxTdGF0ZSkge1xuICAgIHJldHVybiBzdG9yZShpbml0aWFsU3RhdGUpO1xufVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBBbGlhc2VzIGxlZ2Fkb3MgKGNvbXBhdCBjb20gaW5kZXgudHMgYW50aWdvKVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKiogQGRlcHJlY2F0ZWQgdXNlIHNpZ25hbCgpICovXG5leHBvcnQgY29uc3QgdXNlUmVhY3RpdmUgPSBzaWduYWw7XG4vKiogQGRlcHJlY2F0ZWQgdXNlIHJlZigpICovXG5leHBvcnQgY29uc3QgdXNlUmVmID0gcmVmO1xuLyoqIEBkZXByZWNhdGVkIHVzZSBtZW1vKCkgKi9cbmV4cG9ydCBjb25zdCB1c2VNZW1vID0gbWVtbztcbi8qKiBAZGVwcmVjYXRlZCB1c2UgY3JlYXRlU2lnbmFsKCkgKi9cbmV4cG9ydCBjb25zdCB1c2VSZWFjdGl2ZVN0YXRlID0gc2lnbmFsO1xuZXhwb3J0IHsgZXZlbnRzLCB1bnRyYWNrLCBpc1NTUiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3RpdmUuanMubWFwIiwiLypcbiAqIGluaXQoKSDigJQgY2ljbG8gZGUgdmlkYSBkZSBhcGFyacOnw6NvIGRvIGNvbXBvbmVudGUuXG4gKiArIGNvbXBhdDogdXNlQ2xpZW50RWZmZWN0LCB1c2VET01FZmZlY3RcbiAqL1xuaW1wb3J0IHsgZ2V0RXZlbnRzU3lzdGVtLCBldmVudHMsIHVudHJhY2ssIGlzU1NSLCB9IGZyb20gXCIuL2V2ZW50cy5qc1wiO1xuLyoqXG4gKiBFeGVjdXRhIHF1YW5kbyBvIGNvbXBvbmVudGUgYXBhcmVjZSBuYSB0ZWxhIChwb3IgaW5zdMOibmNpYSAvIHNjb3BlKS5cbiAqIFJldHVybiA9IGNsZWFudXAgbmEgc2HDrWRhIGRhIHRlbGEgKHVubW91bnQpLlxuICpcbiAqIEFnb3JhIDEwMCUgbGlnYWRvIGFvIGNpY2xvIGRlIHZpZGE6XG4gKiAtIG1vdW50OiByb2RhIGVtIGxheW91dCBwaGFzZSwgYXDDs3MgRE9NIGluc2VyaWRvXG4gKiAtIHVubW91bnQ6IGNsZWFudXAgw6kgY2hhbWFkbyBxdWFuZG8gY2xlYW51cEV2ZW50c1Njb3BlKHNjb3BlKSByb2RhXG4gKiAgICAgICAgICAgbm8gYm91bmRhcnktY29tcG9uZW50LnRzIChpc0Nvbm5lY3RlZCA9PT0gZmFsc2UpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0KGVmZmVjdCkge1xuICAgIGlmIChpc1NTUigpKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3Qgc3lzdGVtID0gZ2V0RXZlbnRzU3lzdGVtKCk7XG4gICAgY29uc3Qgc2NvcGUgPSBzeXN0ZW0uZ2V0Q3VycmVudFNjb3BlKCk7XG4gICAgaWYgKCFzY29wZSkge1xuICAgICAgICAvLyBmb3JhIGRlIGNvbXBvbmVudGUgKGV4OiBww6FnaW5hIHNlcnZlciBzZW0gYm91bmRhcnkpXG4gICAgICAgIC8vIHJvZGEgdW1hIHZleiBnbG9iYWwsIHNlbSBsaWZlY3ljbGVcbiAgICAgICAgY29uc3QgcnVubmVyID0gKCkgPT4gZWZmZWN0KCk7XG4gICAgICAgIHN5c3RlbS5zZXRFZmZlY3RQaGFzZShydW5uZXIsIFwibGF5b3V0XCIpO1xuICAgICAgICBzeXN0ZW0uc2NoZWR1bGUocnVubmVyLCBcImxheW91dFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IHNjb3BlLmhvb2tJbmRleCsrO1xuICAgIGlmICghc2NvcGUuaG9va3NbaW5kZXhdKSB7XG4gICAgICAgIHNjb3BlLmhvb2tzW2luZGV4XSA9IHsgc2NoZWR1bGVkOiBmYWxzZSwgcnVubmVyOiBudWxsIH07XG4gICAgfVxuICAgIGNvbnN0IGhvb2sgPSBzY29wZS5ob29rc1tpbmRleF07XG4gICAgaWYgKGhvb2suc2NoZWR1bGVkKVxuICAgICAgICByZXR1cm47IC8vIGrDoSBtb250b3UgZXN0YSBpbnN0w6JuY2lhXG4gICAgaG9vay5zY2hlZHVsZWQgPSB0cnVlO1xuICAgIGNvbnN0IHJ1bm5lciA9ICgpID0+IGVmZmVjdCgpO1xuICAgIGhvb2sucnVubmVyID0gcnVubmVyO1xuICAgIC8vIGxpZ2EgZXhwbGljaXRhbWVudGUgZXN0ZSBydW5uZXIgYW8gc2NvcGUgYXR1YWxcbiAgICAvLyBwYXJhIHF1ZSBjbGVhbnVwU2NvcGUoc2NvcGUpIGNvbnNpZ2EgYWNoYXIgZSBkYXIgZGlzcG9zZVxuICAgIHN5c3RlbS5zZXRFZmZlY3RQaGFzZShydW5uZXIsIFwibGF5b3V0XCIpO1xuICAgIC8vIEB0cy1pZ25vcmUgLSBlZmZlY3RTY29wZXMgw6kgaW50ZXJubyBtYXMgcHJlY2lzYW1vcyByZWdpc3RyYXIgYXF1aVxuICAgIHN5c3RlbS5lZmZlY3RTY29wZXM/LnNldD8uKHJ1bm5lciwgc2NvcGUpO1xuICAgIHN5c3RlbS5zY2hlZHVsZShydW5uZXIsIFwibGF5b3V0XCIpO1xufVxuLyoqXG4gKiBFZmVpdG8gY2xpZW50ZSBnZW7DqXJpY28gKGNvbXBhdCBjb20gdXNlQ2xpZW50RWZmZWN0IGFudGlnbykuXG4gKiBSb2RhIGNvbW8gZWZmZWN0IG5vcm1hbCBubyBjbGllbnQsIHJlc3BlaXRhIGRlcHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VDbGllbnRFZmZlY3QoZWZmZWN0LCBkZXBzID0gW10pIHtcbiAgICBpZiAoaXNTU1IoKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGV2ZW50cyhlZmZlY3QsIGRlcHMsIHsgcGhhc2U6IFwiZWZmZWN0XCIgfSk7XG59XG4vKipcbiAqIERpc3Bhcm8gaW5pY2lhbCBlc3RyZWl0byAoU0VNIFJFQVRJVklEQURFKSDigJQgY29tcGF0IGNvbSB1c2VET01FZmZlY3QgYW50aWdvLlxuICogSXNvbGEgY29tcGxldGFtZW50ZSBwYXJhIHF1ZSBzaW5haXMgbGlkb3MgTsODTyBhc3NpbmVtIG8gZWZlaXRvLlxuICogR2FyYW50ZSBleGVjdcOnw6NvIGFww7NzIERPTSBwcm9udG8uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VET01FZmZlY3QoZWZmZWN0KSB7XG4gICAgaWYgKGlzU1NSKCkpXG4gICAgICAgIHJldHVybjtcbiAgICBldmVudHMoKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKSB7XG4gICAgICAgICAgICBjb25zdCBydW5uZXIgPSAoKSA9PiB1bnRyYWNrKGVmZmVjdCk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBydW5uZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBydW5uZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bnRyYWNrKGVmZmVjdCk7XG4gICAgfSwgW10sIHsgcGhhc2U6IFwibGF5b3V0XCIgfSk7XG59XG4vKiogSGVscGVycyByZWV4cG9ydGFkb3MgcGFyYSBvIHJlbmRlcmVyICovXG5leHBvcnQgeyBjcmVhdGVFdmVudHNTY29wZSBhcyBjcmVhdGVJbml0U2NvcGUsIGNyZWF0ZUVmZmVjdFNjb3BlIGFzIGNyZWF0ZUluaXRTY29wZUNvbXBhdCwgcnVuV2l0aEV2ZW50c1Njb3BlIGFzIHJ1bldpdGhJbml0U2NvcGUsIHJ1bldpdGhFZmZlY3RTY29wZSBhcyBydW5XaXRoSW5pdFNjb3BlQ29tcGF0LCBjbGVhbnVwRXZlbnRzU2NvcGUgYXMgY2xlYW51cEluaXRTY29wZSwgY2xlYW51cEVmZmVjdFNjb3BlIGFzIGNsZWFudXBJbml0U2NvcGVDb21wYXQsIH0gZnJvbSBcIi4vZXZlbnRzLmpzXCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbml0LmpzLm1hcCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuaW1wb3J0IHsgY3JlYXRlRXZlbnRTaWduYWwgfSBmcm9tIFwiLi9ldmVudHMuanNcIjtcbmV4cG9ydCBjbGFzcyBBZGFwdGl2ZU9ic2VydmVyIHtcbiAgICBfZ2V0O1xuICAgIF9zZXQ7XG4gICAgX3NvdXJjZTtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsKSB7XG4gICAgICAgIGNvbnN0IFtnZXQsIHNldF0gPSBjcmVhdGVFdmVudFNpZ25hbChpbml0aWFsKTtcbiAgICAgICAgdGhpcy5fZ2V0ID0gZ2V0O1xuICAgICAgICB0aGlzLl9zZXQgPSBzZXQ7XG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IHNldC5fX2FkYXB0aXZlU291cmNlO1xuICAgIH1cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXQoKTtcbiAgICB9XG4gICAgc2V0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3NldCh2YWx1ZSk7XG4gICAgfVxuICAgIHVwZGF0ZShmbikge1xuICAgICAgICB0aGlzLl9zb3VyY2UudXBkYXRlKGZuKTtcbiAgICB9XG4gICAgcmVtb3ZlU3Vic2NyaWJlcihlZmZlY3QpIHtcbiAgICAgICAgdGhpcy5fc291cmNlLnJlbW92ZVN1YnNjcmliZXIoZWZmZWN0KTtcbiAgICB9XG4gICAgLy8gY29tcGF0OiBhbGd1bnMgbHVnYXJlcyBhbnRpZ29zIGFjZXNzYXZhbSAudmFsdWUgZGlyZXRvXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0KCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWRhcHRpdmUtb2JzZXJ2ZXIuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogQ29uc3RhbnRzIC0gc2VtIGzDs2dpY2FcbiAqL1xuZXhwb3J0IGNvbnN0IEhZRFJBVElPTl9BVFRSID0gXCJkYXRhLWFpZFwiO1xuZXhwb3J0IGNvbnN0IFNWR19OQU1FU1BBQ0UgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG5leHBvcnQgY29uc3QgTUFUSE1MX05BTUVTUEFDRSA9IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTFwiO1xuZXhwb3J0IGNvbnN0IFNWR19BVFRSSUJVVEVfTkFNRV9NQVAgPSB7XG4gICAgY2xhc3NOYW1lOiBcImNsYXNzXCIsXG4gICAgc3Ryb2tlV2lkdGg6IFwic3Ryb2tlLXdpZHRoXCIsXG4gICAgc3Ryb2tlTGluZWNhcDogXCJzdHJva2UtbGluZWNhcFwiLFxuICAgIHN0cm9rZUxpbmVqb2luOiBcInN0cm9rZS1saW5lam9pblwiLFxuICAgIHN0cm9rZURhc2hhcnJheTogXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgc3Ryb2tlRGFzaG9mZnNldDogXCJzdHJva2VEYXNob2Zmc2V0XCIsXG4gICAgc3Ryb2tlTWl0ZXJsaW1pdDogXCJzdHJva2UtbWl0ZXJsaW1pdFwiLFxuICAgIGZpbGxSdWxlOiBcImZpbGwtcnVsZVwiLFxuICAgIGNsaXBSdWxlOiBcImNsaXAtcnVsZVwiLFxuICAgIHZpZXdCb3g6IFwidmlld0JveFwiLFxuICAgIHByZXNlcnZlQXNwZWN0UmF0aW86IFwicHJlc2VydmVBc3BlY3RSYXRpb1wiLFxuICAgIHZlY3RvckVmZmVjdDogXCJ2ZWN0b3ItZWZmZWN0XCIsXG4gICAgeG1sbnNYbGluazogXCJ4bWxuczp4bGlua1wiXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqIERPTSBoZWxwZXJzIC0gc2VtIFZET01cbiAqL1xuaW1wb3J0IHsgTUFUSE1MX05BTUVTUEFDRSwgU1ZHX0FUVFJJQlVURV9OQU1FX01BUCwgU1ZHX05BTUVTUEFDRSB9IGZyb20gXCIuL2NvbnN0YW50cy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVDaGlsZE5hbWVzcGFjZSh0YWcsIHBhcmVudE5hbWVzcGFjZSkge1xuICAgIGlmICh0YWcgPT09IFwic3ZnXCIpXG4gICAgICAgIHJldHVybiBTVkdfTkFNRVNQQUNFO1xuICAgIGlmICh0YWcgPT09IFwibWF0aFwiKVxuICAgICAgICByZXR1cm4gTUFUSE1MX05BTUVTUEFDRTtcbiAgICBpZiAodGFnID09PSBcImZvcmVpZ25PYmplY3RcIilcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHBhcmVudE5hbWVzcGFjZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRBc3NpZ25Bc1Byb3BlcnR5KGVsZW1lbnQsIG5hbWVzcGFjZSwga2V5KSB7XG4gICAgaWYgKG5hbWVzcGFjZSA9PT0gU1ZHX05BTUVTUEFDRSB8fCBuYW1lc3BhY2UgPT09IE1BVEhNTF9OQU1FU1BBQ0UpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4ga2V5IGluIGVsZW1lbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZURvbUF0dHJpYnV0ZU5hbWUoa2V5LCBuYW1lc3BhY2UpIHtcbiAgICBpZiAobmFtZXNwYWNlID09PSBTVkdfTkFNRVNQQUNFIHx8IG5hbWVzcGFjZSA9PT0gTUFUSE1MX05BTUVTUEFDRSkge1xuICAgICAgICByZXR1cm4gU1ZHX0FUVFJJQlVURV9OQU1FX01BUFtrZXldID8/IGtleTtcbiAgICB9XG4gICAgcmV0dXJuIGtleSA9PT0gXCJjbGFzc05hbWVcIiA/IFwiY2xhc3NcIiA6IGtleTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRBc3NpZ25Bc1Byb3BlcnR5V2l0aE1lZGlhQ2hlY2soZWxlbWVudCwga2V5KSB7XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MTWVkaWFFbGVtZW50ICYmIFtcImN1cnJlbnRUaW1lXCIsIFwidm9sdW1lXCIsIFwicGxheWJhY2tSYXRlXCJdLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogU2VlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0Nzc1Byb3BlcnR5TmFtZShzdHlsZUtleSkge1xuICAgIHJldHVybiBzdHlsZUtleS5yZXBsYWNlKC8oW0EtWl0pL2csIFwiLSQxXCIpLnRvTG93ZXJDYXNlKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVN0eWxlRW50cmllcyhzdHlsZSkge1xuICAgIGNvbnN0IHJlc29sdmVkID0gdHlwZW9mIHN0eWxlID09PSBcImZ1bmN0aW9uXCIgPyBzdHlsZSgpIDogc3R5bGU7XG4gICAgaWYgKCFyZXNvbHZlZCB8fCB0eXBlb2YgcmVzb2x2ZWQgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMocmVzb2x2ZWQpLmZsYXRNYXAoKFtzdHlsZUtleSwgc3R5bGVWYWx1ZV0pID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0eXBlb2Ygc3R5bGVWYWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gc3R5bGVWYWx1ZSgpIDogc3R5bGVWYWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtbc3R5bGVLZXksIHZhbHVlXV07XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplU3R5bGVMaWtlKHN0eWxlKSB7XG4gICAgcmV0dXJuIHJlc29sdmVTdHlsZUVudHJpZXMoc3R5bGUpXG4gICAgICAgIC5tYXAoKFtzdHlsZUtleSwgc3R5bGVWYWx1ZV0pID0+IGAke3RvQ3NzUHJvcGVydHlOYW1lKHN0eWxlS2V5KX06JHtzdHlsZVZhbHVlfWApXG4gICAgICAgIC5qb2luKFwiO1wiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0eWxlLXNoYXJlZC5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKiBTdHlsZSBoZWxwZXJzIC0gcmV1dGlsaXphIHN0eWxlLXNoYXJlZCBzZW0gZHVwbGljYXIgbMOzZ2ljYVxuICovXG5pbXBvcnQgeyByZXNvbHZlU3R5bGVFbnRyaWVzIH0gZnJvbSBcIi4uL3N0eWxlLXNoYXJlZC5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5U3R5bGVPYmplY3QoZWwsIHN0eWxlKSB7XG4gICAgaWYgKCFzdHlsZSB8fCB0eXBlb2Ygc3R5bGUgIT09IFwib2JqZWN0XCIpXG4gICAgICAgIHJldHVybjtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiByZXNvbHZlU3R5bGVFbnRyaWVzKHN0eWxlKSkge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KGtleS5yZXBsYWNlKC8oW0EtWl0pL2csIFwiLSQxXCIpLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWwuc3R5bGVba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3R5bGUuanMubWFwIiwiLypcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqXG4gKiBCbG9jbyByZWF0aXZvIGNvbSBlc3RhYmlsaWRhZGUgcG9yIGtleSAob24vb2ZmKS5cbiAqIFZlcnPDo28gY29ycmlnaWRhOiBleHRyYWkga2V5IGRlIHZub2RlLmtleSBPVSBwcm9wcy5rZXlcbiAqL1xuaW1wb3J0IHsgY2xlYW51cEVmZmVjdFNjb3BlLCBjcmVhdGVFZmZlY3RTY29wZSwgcnVuV2l0aEVmZmVjdFNjb3BlLCB9IGZyb20gXCIuLi9yZWFjdGl2ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlUmVhY3RpdmVFZmZlY3QgfSBmcm9tIFwiLi4vcmVhY3RpdmUvZXZlbnRzLmpzXCI7XG4vKipcbiAqIEV4dHJhaSBrZXkgZGUgdW0gdm5vZGUgQWRhcHRpdmUuXG4gKiBFbSBBZGFwdGl2ZS9KU1ggYSBrZXkgcG9kZSBlc3RhciBlbTpcbiAqIC0gdm5vZGUua2V5IChwYWRyw6NvIFJlYWN0LWxpa2UpXG4gKiAtIHZub2RlLnByb3BzLmtleVxuICogLSB2bm9kZS5wcm9wc1tcImRhdGEta2V5XCJdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRWTm9kZUtleSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHZhbHVlLmZsYXQoSW5maW5pdHkpLmZpbHRlcigodikgPT4gdiAhPSBudWxsICYmIHYgIT09IGZhbHNlICYmIHYgIT09IHRydWUpO1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gZ2V0Vk5vZGVLZXkobGlzdFswXSk7XG4gICAgICAgIGNvbnN0IGtleXMgPSBsaXN0Lm1hcChnZXRWTm9kZUtleSk7XG4gICAgICAgIGlmIChrZXlzLmV2ZXJ5KChrKSA9PiBrICE9IG51bGwpKVxuICAgICAgICAgICAgcmV0dXJuIGtleXMuam9pbihcInxcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIC8vIDEuIHZub2RlLmtleSBkaXJldG8gKEpTWCBydW50aW1lIHBhZHLDo28pXG4gICAgICAgIGlmICh2YWx1ZS5rZXkgIT0gbnVsbCAmJiB2YWx1ZS5rZXkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUua2V5O1xuICAgICAgICB9XG4gICAgICAgIC8vIDIuIHByb3BzLmtleVxuICAgICAgICBpZiAodmFsdWUucHJvcHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgayA9IHZhbHVlLnByb3BzLmtleTtcbiAgICAgICAgICAgIGlmIChrICE9IG51bGwgJiYgayAhPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGs7XG4gICAgICAgICAgICAvLyBmYWxsYmFjayBwYXJhIGRhdGEta2V5XG4gICAgICAgICAgICBjb25zdCBkayA9IHZhbHVlLnByb3BzW1wiZGF0YS1rZXlcIl07XG4gICAgICAgICAgICBpZiAoZGsgIT0gbnVsbCAmJiBkayAhPT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG1vdW50S2V5ZWRSZWFjdGl2ZUZ1bmN0aW9uKHRodW5rLCBuYW1lc3BhY2UsIHJlbmRlclRvRE9NKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICBjb25zdCBlbmQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChzdGFydCk7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZW5kKTtcbiAgICBsZXQgY3VycmVudEtleSA9IHVuZGVmaW5lZDtcbiAgICBsZXQgY3VycmVudFNjb3BlID0gbnVsbDtcbiAgICBsZXQgaGFzTW91bnRlZCA9IGZhbHNlO1xuICAgIC8vIENhY2hlIHBvciBrZXk6IG9uIC0+IG9mZiAtPiBvbiByZXN0YXVyYSBzZW0gcmVtb250YXJcbiAgICBjb25zdCBjYWNoZSA9IG5ldyBNYXAoKTtcbiAgICAvLyBGaW5hbCBjbGVhbnVwOiBxdWFuZG8gbyBjb21wb25lbnRlIHBhaSBkZXNtb250YXIsIGxpbXBhIHR1ZG8gcXVlIGZpY291IGVtIGNhY2hlXG4gICAgLy8gRXN0ZSBlZmVpdG8gcm9kYSB1bWEgdmV6IGUgc8OzIMOpIGRpc3Bvc3RvIG5vIHVubW91bnQgZmluYWxcbiAgICBjcmVhdGVSZWFjdGl2ZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGNhY2hlLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cEVmZmVjdFNjb3BlKGVudHJ5LnNjb3BlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhY2hlLmNsZWFyKCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFNjb3BlKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cEVmZmVjdFNjb3BlKGN1cnJlbnRTY29wZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFNjb3BlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LCBcImxheW91dFwiKTtcbiAgICAvLyBFZmVpdG8gcmVhdGl2byBwcmluY2lwYWw6IHRyb2NhIGRlIGtleSBjb20gY2FjaGVcbiAgICBjcmVhdGVSZWFjdGl2ZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IHRodW5rKCk7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHN0YXJ0LnBhcmVudE5vZGU7XG4gICAgICAgIGlmICghcGFyZW50KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBuZXh0S2V5ID0gZ2V0Vk5vZGVLZXkobmV4dFZhbHVlKTsgLy8gXCJvblwiIHwgXCJvZmZcIiB8IG51bGxcbiAgICAgICAgLy8gbWVzbWEga2V5IOKGkiBuw6NvIG1leGUgKGNvdW50IDHihpIy4oaSMylcbiAgICAgICAgaWYgKGhhc01vdW50ZWQgJiZcbiAgICAgICAgICAgIG5leHRLZXkgIT0gbnVsbCAmJlxuICAgICAgICAgICAgY3VycmVudEtleSAhPSBudWxsICYmXG4gICAgICAgICAgICBPYmplY3QuaXMobmV4dEtleSwgY3VycmVudEtleSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBicmFuY2ggbXVkb3UgKG91IHByaW1laXJhIHZleik6IGRlc3Ryw7NpIG8gYXR1YWwgZGUgdmVyZGFkZVxuICAgICAgICBpZiAoY3VycmVudFNjb3BlKSB7XG4gICAgICAgICAgICBjbGVhbnVwRWZmZWN0U2NvcGUoY3VycmVudFNjb3BlKTsgLy8g4oaQIHVubW91bnRpbmcgQmVlckNTU1xuICAgICAgICAgICAgY3VycmVudFNjb3BlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbm9kZSA9IHN0YXJ0Lm5leHRTaWJsaW5nO1xuICAgICAgICB3aGlsZSAobm9kZSAmJiBub2RlICE9PSBlbmQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICAgICAgbm9kZSA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbW9udGEgbyBicmFuY2ggbm92b1xuICAgICAgICBjdXJyZW50U2NvcGUgPSBjcmVhdGVFZmZlY3RTY29wZShgcmVhY3RpdmUta2V5ZWQ6JHtTdHJpbmcobmV4dEtleSA/PyBcIm5va2V5XCIpfWApO1xuICAgICAgICBjb25zdCByZW5kZXJlZCA9IHJ1bldpdGhFZmZlY3RTY29wZShjdXJyZW50U2NvcGUsICgpID0+IHJlbmRlclRvRE9NKG5leHRWYWx1ZSwgbmFtZXNwYWNlKSk7XG4gICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUocmVuZGVyZWQsIGVuZCk7XG4gICAgICAgIGN1cnJlbnRLZXkgPSBuZXh0S2V5O1xuICAgICAgICBoYXNNb3VudGVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gZnJhZ21lbnQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXllZC1yZWFjdGl2ZS1ibG9jay5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKiByZW5kZXJUb0RPTSAtIG1vdW50IGNsaWVudC1tb2RlLCBzZW0gaGlkcmF0YcOnw6NvLCBzZW0gVkRPTVxuICovXG5pbXBvcnQgeyBDT05URVhUX1BST1ZJREVSX1RBRyB9IGZyb20gXCIuLi8uLi9mcm9udC9jb250ZXh0LXJ1bnRpbWUuanNcIjtcbmltcG9ydCB7IHJ1bldpdGhDb250ZXh0LCB1bnRyYWNrIH0gZnJvbSBcIi4uLy4uL3JlYWN0aXZlL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVSZWFjdGl2ZUVmZmVjdCB9IGZyb20gXCIuLi8uLi9yZWFjdGl2ZS9ldmVudHMuanNcIjtcbmltcG9ydCB7IGV2ZW50cyB9IGZyb20gXCIuLi8uLi9yZWFjdGl2ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZUNoaWxkTmFtZXNwYWNlLCByZXNvbHZlRG9tQXR0cmlidXRlTmFtZSwgc2hvdWxkQXNzaWduQXNQcm9wZXJ0eSB9IGZyb20gXCIuL2RvbS5qc1wiO1xuaW1wb3J0IHsgYXBwbHlTdHlsZU9iamVjdCB9IGZyb20gXCIuL3N0eWxlLmpzXCI7XG5pbXBvcnQgeyBtb3VudEtleWVkUmVhY3RpdmVGdW5jdGlvbiB9IGZyb20gXCIuLi9rZXllZC1yZWFjdGl2ZS1ibG9jay5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclRvRE9NKHZub2RlLCBuYW1lc3BhY2UgPSBudWxsKSB7XG4gICAgaWYgKHZub2RlIGluc3RhbmNlb2YgTm9kZSlcbiAgICAgICAgcmV0dXJuIHZub2RlO1xuICAgIGlmICh2bm9kZSA9PSBudWxsIHx8IHZub2RlID09PSBmYWxzZSB8fCB2bm9kZSA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJhZGFwdGl2ZS1lbXB0eVwiKTtcbiAgICBpZiAodHlwZW9mIHZub2RlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2bm9kZSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyh2bm9kZSkpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZub2RlKSkge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiB2bm9kZSkge1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocmVuZGVyVG9ET00oY2hpbGQsIG5hbWVzcGFjZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2bm9kZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBtb3VudEtleWVkUmVhY3RpdmVGdW5jdGlvbih2bm9kZSwgbmFtZXNwYWNlLCByZW5kZXJUb0RPTSk7XG4gICAgfVxuICAgIGlmICh2bm9kZS50YWcgPT09IENPTlRFWFRfUFJPVklERVJfVEFHKSB7XG4gICAgICAgIHJldHVybiBydW5XaXRoQ29udGV4dCh2bm9kZS5wcm9wcy5jb250ZXh0LmlkLCB2bm9kZS5wcm9wcy52YWx1ZSwgKCkgPT4gcmVuZGVyVG9ET00odm5vZGUuY2hpbGRyZW4gPz8gW10sIG5hbWVzcGFjZSkpO1xuICAgIH1cbiAgICBpZiAodm5vZGUudGFnID09PSBcIkZyYWdtZW50XCIgfHwgdHlwZW9mIHZub2RlLnRhZyA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbiA/PyBbXTtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbiA6IFtjaGlsZHJlbl0pKSB7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyZW5kZXJUb0RPTShjaGlsZCwgbmFtZXNwYWNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZub2RlLnRhZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiB1bnRyYWNrKCgpID0+IHJlbmRlclRvRE9NKHZub2RlLnRhZyh7IC4uLih2bm9kZS5wcm9wcyA/PyB7fSksIGNoaWxkcmVuOiB2bm9kZS5jaGlsZHJlbiA/PyBbXSB9KSwgbmFtZXNwYWNlKSk7XG4gICAgfVxuICAgIGNvbnN0IG5leHROYW1lc3BhY2UgPSByZXNvbHZlQ2hpbGROYW1lc3BhY2Uodm5vZGUudGFnLCBuYW1lc3BhY2UpO1xuICAgIGNvbnN0IGVsID0gbmV4dE5hbWVzcGFjZSA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuZXh0TmFtZXNwYWNlLCB2bm9kZS50YWcpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh2bm9kZS50YWcpO1xuICAgIGNvbnN0IHByb3BzID0gdm5vZGUucHJvcHMgPz8ge307XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocHJvcHMpKSB7XG4gICAgICAgIGlmIChrZXkgPT09IFwiY2hpbGRyZW5cIiB8fCBrZXkgPT09IFwiY2xpZW50XCIpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJyZWZcIikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgICAgIHZhbHVlKGVsKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgICAgICB2YWx1ZS5jdXJyZW50ID0gZWw7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ID09PSBcInhtbG5zXCIgJiYgbmV4dE5hbWVzcGFjZSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAoa2V5ID09PSBcImNsYXNzTmFtZVwiKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVSZWFjdGl2ZUVmZmVjdCgoKSA9PiB7IGVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHZhbHVlKCkgPz8gXCJcIik7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKFwib25cIikgJiYgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoa2V5LnNsaWNlKDIpLnRvTG93ZXJDYXNlKCksIHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzKCgpID0+IHsgYXBwbHlTdHlsZU9iamVjdChlbCwgdmFsdWUoKSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gc3Vwb3J0YSBzdHlsZT17eyBjb2xvcjogKCkgPT4gLi4uIH19XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBbc3R5bGVLZXksIHN0eWxlVmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlVmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IHN0eWxlVmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQgPT0gbnVsbCB8fCByZXNvbHZlZCA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KHN0eWxlS2V5LnJlcGxhY2UoLyhbQS1aXSkvZywgXCItJDFcIikudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZVtzdHlsZUtleV0gPSByZXNvbHZlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0eWxlVmFsdWUgIT0gbnVsbCAmJiBzdHlsZVZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGVbc3R5bGVLZXldID0gc3R5bGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNyZWF0ZVJlYWN0aXZlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IHZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc29sdmVkID09PSBmYWxzZSB8fCByZXNvbHZlZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShyZXNvbHZlRG9tQXR0cmlidXRlTmFtZShrZXksIG5leHROYW1lc3BhY2UpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQXNzaWduQXNQcm9wZXJ0eShlbCwgbmV4dE5hbWVzcGFjZSwga2V5KSlcbiAgICAgICAgICAgICAgICAgICAgZWxba2V5XSA9IHJlc29sdmVkO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKHJlc29sdmVEb21BdHRyaWJ1dGVOYW1lKGtleSwgbmV4dE5hbWVzcGFjZSksIFN0cmluZyhyZXNvbHZlZCkpO1xuICAgICAgICAgICAgfSwgXCJsYXlvdXRcIik7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvdWxkQXNzaWduQXNQcm9wZXJ0eShlbCwgbmV4dE5hbWVzcGFjZSwga2V5KSlcbiAgICAgICAgICAgIGVsW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKHJlc29sdmVEb21BdHRyaWJ1dGVOYW1lKGtleSwgbmV4dE5hbWVzcGFjZSksIFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cbiAgICBjb25zdCBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuID8/IFtdO1xuICAgIGNvbnN0IGxpc3QgPSBBcnJheS5pc0FycmF5KGNoaWxkcmVuKSA/IGNoaWxkcmVuIDogW2NoaWxkcmVuXTtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGxpc3QpIHtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQocmVuZGVyVG9ET00oY2hpbGQsIG5leHROYW1lc3BhY2UpKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVuZGVyLXRvLWRvbS5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKiBNb3VudCBjbGllbnQtb25seSAtIHNlbSBWRE9NLCB1c2EgcmVuZGVyVG9ET00gZGlyZXRvXG4gKi9cbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL2NvcmVcIjtcbmltcG9ydCB7IHJlbmRlclRvRE9NIH0gZnJvbSBcIi4uL2h5ZHJhdGUvcmVuZGVyLXRvLWRvbS5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIG1vdW50Q2xpZW50Q29tcG9uZW50KHJvb3QsIENvbXBvbmVudCwgcHJvcHMpIHtcbiAgICByb290LnJlcGxhY2VDaGlsZHJlbihyZW5kZXJUb0RPTShjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpKSk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocm9vdC5jaGlsZE5vZGVzKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtb3VudENsaWVudENvbXBvbmVudEJldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQsIENvbXBvbmVudCwgcHJvcHMpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBzdGFydC5wYXJlbnROb2RlO1xuICAgIGlmICghcGFyZW50KVxuICAgICAgICByZXR1cm4gW107XG4gICAgLy8gcmVtb3ZlIGNvbnRlw7pkbyBTU1IgZW50cmUgbWFya2VycyAoY2xpZW50LW9ubHkgbsOjbyBwcmVzZXJ2YSlcbiAgICBsZXQgY3VyID0gc3RhcnQubmV4dFNpYmxpbmc7XG4gICAgd2hpbGUgKGN1ciAmJiBjdXIgIT09IGVuZCkge1xuICAgICAgICBjb25zdCBuZXh0ID0gY3VyLm5leHRTaWJsaW5nO1xuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoY3VyKTtcbiAgICAgICAgY3VyID0gbmV4dDtcbiAgICB9XG4gICAgY29uc3QgcmVuZGVyZWQgPSByZW5kZXJUb0RPTShjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpKTtcbiAgICBjb25zdCBtb3VudGVkID0gcmVuZGVyZWQubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA/IEFycmF5LmZyb20ocmVuZGVyZWQuY2hpbGROb2RlcykgOiBbcmVuZGVyZWRdO1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUocmVuZGVyZWQsIGVuZCk7XG4gICAgc3RhcnQucmVtb3ZlKCk7XG4gICAgZW5kLnJlbW92ZSgpO1xuICAgIHJldHVybiBtb3VudGVkO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW91bnQuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogQnVzY2EgZGUgZWxlbWVudG9zIHBvciBkYXRhLWFpZCAtIHNlbSBWRE9NLCBzw7MgRE9NIHdhbGtcbiAqL1xuaW1wb3J0IHsgSFlEUkFUSU9OX0FUVFIgfSBmcm9tIFwiLi9jb25zdGFudHMuanNcIjtcbmltcG9ydCB7IGZpbmRNYXRjaGluZ01hcmtlckVuZCwgaXNDbGllbnRCb3VuZGFyeVN0YXJ0Q29tbWVudCB9IGZyb20gXCIuL21hcmtlcnMuanNcIjtcbmltcG9ydCB7IENMSUVOVF9CT1VOREFSWV9FTkQsIENMSUVOVF9CT1VOREFSWV9TVEFSVF9QUkVGSVggfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3NoYXJlZFwiO1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRIeWRyYXRpb25FbGVtZW50KHJvb3QsIGlkKSB7XG4gICAgaWYgKHJvb3QgaW5zdGFuY2VvZiBFbGVtZW50ICYmIHJvb3QuZ2V0QXR0cmlidXRlKEhZRFJBVElPTl9BVFRSKSA9PT0gaWQpXG4gICAgICAgIHJldHVybiByb290O1xuICAgIHJldHVybiBmaW5kSHlkcmF0aW9uRWxlbWVudEluU3VidHJlZShyb290LCBpZCwgcm9vdCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZmluZEh5ZHJhdGlvbkVsZW1lbnRCZXR3ZWVuTWFya2VycyhzdGFydCwgZW5kLCBpZCkge1xuICAgIGxldCBjdXJyZW50ID0gc3RhcnQubmV4dFNpYmxpbmc7XG4gICAgd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gZW5kKSB7XG4gICAgICAgIGlmIChpc0NsaWVudEJvdW5kYXJ5U3RhcnRDb21tZW50KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZGFyeUVuZCA9IGZpbmRNYXRjaGluZ01hcmtlckVuZChzdGFydC5wYXJlbnROb2RlLCBjdXJyZW50LCBDTElFTlRfQk9VTkRBUllfU1RBUlRfUFJFRklYLCBDTElFTlRfQk9VTkRBUllfRU5EKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBib3VuZGFyeUVuZCA/IGJvdW5kYXJ5RW5kLm5leHRTaWJsaW5nIDogZW5kO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKEhZRFJBVElPTl9BVFRSKSA9PT0gaWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoXCJkYXRhLWFkYXB0aXZlLWNsaWVudC1tb2R1bGVcIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXN0ZWQgPSBmaW5kSHlkcmF0aW9uRWxlbWVudEluU3VidHJlZShlbCwgaWQsIGVsKTtcbiAgICAgICAgICAgICAgICBpZiAobmVzdGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmVzdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGZpbmRIeWRyYXRpb25FbGVtZW50SW5TdWJ0cmVlKHJvb3QsIGlkLCBib3VuZGFyeVJvb3QpIHtcbiAgICBsZXQgY3VycmVudCA9IHJvb3QuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoY3VycmVudCkge1xuICAgICAgICBpZiAoaXNDbGllbnRCb3VuZGFyeVN0YXJ0Q29tbWVudChjdXJyZW50KSkge1xuICAgICAgICAgICAgY29uc3QgYm91bmRhcnlFbmQgPSBmaW5kTWF0Y2hpbmdNYXJrZXJFbmQocm9vdCwgY3VycmVudCwgQ0xJRU5UX0JPVU5EQVJZX1NUQVJUX1BSRUZJWCwgQ0xJRU5UX0JPVU5EQVJZX0VORCk7XG4gICAgICAgICAgICBjdXJyZW50ID0gYm91bmRhcnlFbmQgPyBib3VuZGFyeUVuZC5uZXh0U2libGluZyA6IGN1cnJlbnQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gY3VycmVudDtcbiAgICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoSFlEUkFUSU9OX0FUVFIpID09PSBpZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKFwiZGF0YS1hZGFwdGl2ZS1jbGllbnQtbW9kdWxlXCIpICYmIGVsICE9PSBib3VuZGFyeVJvb3QpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5lc3RlZCA9IGZpbmRIeWRyYXRpb25FbGVtZW50SW5TdWJ0cmVlKGVsLCBpZCwgYm91bmRhcnlSb290KTtcbiAgICAgICAgICAgIGlmIChuZXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5lc3RlZDtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0U2libGluZztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbGVtZW50cy5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKiBFdmVudCBkZWxlZ2F0aW9uIC0gc2VtIFZET01cbiAqL1xuaW1wb3J0IHsgZGVidWdIeWRyYXRpb25Mb2cgfSBmcm9tIFwiLi9taXNtYXRjaC5qc1wiO1xuY29uc3QgZXZlbnRIYW5kbGVycyA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnQgZnVuY3Rpb24gYmluZERlbGVnYXRlZEV2ZW50KGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIGxldCBoYW5kbGVycyA9IGV2ZW50SGFuZGxlcnMuZ2V0KGVsZW1lbnQpO1xuICAgIGlmICghaGFuZGxlcnMpIHtcbiAgICAgICAgaGFuZGxlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGV2ZW50SGFuZGxlcnMuc2V0KGVsZW1lbnQsIGhhbmRsZXJzKTtcbiAgICB9XG4gICAgY29uc3QgcHJldiA9IGhhbmRsZXJzLmdldChldmVudE5hbWUpO1xuICAgIGlmIChwcmV2KVxuICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBwcmV2KTtcbiAgICBoYW5kbGVycy5zZXQoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3cmFwSHlkcmF0aW9uRXZlbnRIYW5kbGVyKGlkLCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHlkcmF0ZWRFdmVudEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZGVidWdIeWRyYXRpb25Mb2coXCJbaHlkcmF0ZTpldmVudDpmaXJlZF1cIiwgaWQsIGV2ZW50TmFtZSk7XG4gICAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudHMuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogUHJvcHMgcmVhdGl2YXMgZSByZWZzXG4gKi9cbmltcG9ydCB7IGNyZWF0ZVJlYWN0aXZlRWZmZWN0IH0gZnJvbSBcIi4uLy4uL3JlYWN0aXZlL2V2ZW50cy5qc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZURvbUF0dHJpYnV0ZU5hbWUsIHNob3VsZEFzc2lnbkFzUHJvcGVydHkgfSBmcm9tIFwiLi9kb20uanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kUmVmKHJlZiwgZWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgcmVmID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJlZihlbGVtZW50KTtcbiAgICBlbHNlIGlmIChyZWYgJiYgdHlwZW9mIHJlZiA9PT0gXCJvYmplY3RcIilcbiAgICAgICAgcmVmLmN1cnJlbnQgPSBlbGVtZW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGVEeW5hbWljUHJvcChlbGVtZW50LCBpbnN0cnVjdGlvbikge1xuICAgIGNvbnN0IG5hbWVzcGFjZSA9IGVsZW1lbnQubmFtZXNwYWNlVVJJO1xuICAgIGNyZWF0ZVJlYWN0aXZlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBpbnN0cnVjdGlvbi5nZXR0ZXIoKTtcbiAgICAgICAgaWYgKHJlc29sdmVkID09IG51bGwgfHwgcmVzb2x2ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShyZXNvbHZlRG9tQXR0cmlidXRlTmFtZShpbnN0cnVjdGlvbi5wcm9wLCBuYW1lc3BhY2UpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvdWxkQXNzaWduQXNQcm9wZXJ0eShlbGVtZW50LCBuYW1lc3BhY2UsIGluc3RydWN0aW9uLnByb3ApKSB7XG4gICAgICAgICAgICBlbGVtZW50W2luc3RydWN0aW9uLnByb3BdID0gcmVzb2x2ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShyZXNvbHZlRG9tQXR0cmlidXRlTmFtZShpbnN0cnVjdGlvbi5wcm9wLCBuYW1lc3BhY2UpLCBTdHJpbmcocmVzb2x2ZWQpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UHJvcGVydHlWYWx1ZShlbGVtZW50LCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgY29uc3QgcHJlc2VydmVTZWxlY3Rpb24gPSBvcHRpb25zLmh5ZHJhdGluZyAmJlxuICAgICAgICBrZXkgPT09IFwidmFsdWVcIiAmJlxuICAgICAgICAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHwgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQpICYmXG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnQ7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gcHJlc2VydmVTZWxlY3Rpb24gPyBjYXB0dXJlU2VsZWN0aW9uKGVsZW1lbnQpIDogbnVsbDtcbiAgICBlbGVtZW50W2tleV0gPSB2YWx1ZTtcbiAgICBpZiAoc2VsZWN0aW9uKVxuICAgICAgICByZXN0b3JlU2VsZWN0aW9uKGVsZW1lbnQsIHNlbGVjdGlvbik7XG59XG5mdW5jdGlvbiBjYXB0dXJlU2VsZWN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIHsgc3RhcnQ6IGVsLnNlbGVjdGlvblN0YXJ0LCBlbmQ6IGVsLnNlbGVjdGlvbkVuZCwgZGlyZWN0aW9uOiBlbC5zZWxlY3Rpb25EaXJlY3Rpb24gfTtcbn1cbmZ1bmN0aW9uIHJlc3RvcmVTZWxlY3Rpb24oZWwsIHNlbCkge1xuICAgIGlmIChzZWwuc3RhcnQgPT0gbnVsbCB8fCBzZWwuZW5kID09IG51bGwpXG4gICAgICAgIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShzZWwuc3RhcnQsIHNlbC5lbmQsIHNlbC5kaXJlY3Rpb24gPz8gdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgY2F0Y2ggeyB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9wcy5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKiBCdXNjYSBnZW7DqXJpY2EgZGUgcGFyZXMgZGUgY29tZW50w6FyaW9zIHJlYXRpdm9zXG4gKi9cbmltcG9ydCB7IGZpbmRNYXRjaGluZ01hcmtlckVuZCwgaXNDbGllbnRCb3VuZGFyeVN0YXJ0Q29tbWVudCB9IGZyb20gXCIuL21hcmtlcnMuanNcIjtcbmltcG9ydCB7IENMSUVOVF9CT1VOREFSWV9FTkQsIENMSUVOVF9CT1VOREFSWV9TVEFSVF9QUkVGSVggfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3NoYXJlZFwiO1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRNYXJrZXJQYWlySW5Sb290KHJvb3QsIHN0YXJ0TWFya2VyLCBlbmRNYXJrZXIpIHtcbiAgICBsZXQgcmFuZ2VTdGFydCA9IG51bGw7XG4gICAgbGV0IHJhbmdlRW5kID0gbnVsbDtcbiAgICBmdW5jdGlvbiBzZWFyY2gobm9kZSkge1xuICAgICAgICBsZXQgY3VycmVudCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmIChpc0NsaWVudEJvdW5kYXJ5U3RhcnRDb21tZW50KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm91bmRhcnlFbmQgPSBmaW5kTWF0Y2hpbmdNYXJrZXJFbmQobm9kZSwgY3VycmVudCwgQ0xJRU5UX0JPVU5EQVJZX1NUQVJUX1BSRUZJWCwgQ0xJRU5UX0JPVU5EQVJZX0VORCk7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGJvdW5kYXJ5RW5kID8gYm91bmRhcnlFbmQubmV4dFNpYmxpbmcgOiBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGN1cnJlbnQuZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PT0gc3RhcnRNYXJrZXIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlU3RhcnQgPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEgPT09IGVuZE1hcmtlcikge1xuICAgICAgICAgICAgICAgICAgICByYW5nZUVuZCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZVN0YXJ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoXCJkYXRhLWFkYXB0aXZlLWNsaWVudC1tb2R1bGVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlYXJjaChlbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNlYXJjaChyb290KTtcbiAgICByZXR1cm4geyBzdGFydDogcmFuZ2VTdGFydCwgZW5kOiByYW5nZUVuZCB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRNYXJrZXJQYWlyQmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgc3RhcnRNYXJrZXIsIGVuZE1hcmtlcikge1xuICAgIGNvbnN0IHBhcmVudCA9IHN0YXJ0LnBhcmVudE5vZGU7XG4gICAgaWYgKCFwYXJlbnQpXG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBudWxsLCBlbmQ6IG51bGwgfTtcbiAgICBsZXQgcmFuZ2VTdGFydCA9IG51bGw7XG4gICAgbGV0IHJhbmdlRW5kID0gbnVsbDtcbiAgICBmdW5jdGlvbiBzZWFyY2hJbkVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBsZXQgY3VycmVudCA9IGVsZW1lbnQuZmlyc3RDaGlsZDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmIChpc0NsaWVudEJvdW5kYXJ5U3RhcnRDb21tZW50KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm91bmRhcnlFbmQgPSBmaW5kTWF0Y2hpbmdNYXJrZXJFbmQoZWxlbWVudCwgY3VycmVudCwgQ0xJRU5UX0JPVU5EQVJZX1NUQVJUX1BSRUZJWCwgQ0xJRU5UX0JPVU5EQVJZX0VORCk7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGJvdW5kYXJ5RW5kID8gYm91bmRhcnlFbmQubmV4dFNpYmxpbmcgOiBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBjdXJyZW50O1xuICAgICAgICAgICAgICAgIGlmICghY2hpbGQuaGFzQXR0cmlidXRlKFwiZGF0YS1hZGFwdGl2ZS1jbGllbnQtbW9kdWxlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWFyY2hJbkVsZW1lbnQoY2hpbGQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gY3VycmVudC5kYXRhO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhID09PSBzdGFydE1hcmtlcilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2VTdGFydCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YSA9PT0gZW5kTWFya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlRW5kID0gY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmdlU3RhcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBjdXJyZW50ID0gc3RhcnQubmV4dFNpYmxpbmc7XG4gICAgd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gZW5kKSB7XG4gICAgICAgIGlmIChpc0NsaWVudEJvdW5kYXJ5U3RhcnRDb21tZW50KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZGFyeUVuZCA9IGZpbmRNYXRjaGluZ01hcmtlckVuZChwYXJlbnQsIGN1cnJlbnQsIENMSUVOVF9CT1VOREFSWV9TVEFSVF9QUkVGSVgsIENMSUVOVF9CT1VOREFSWV9FTkQpO1xuICAgICAgICAgICAgY3VycmVudCA9IGJvdW5kYXJ5RW5kID8gYm91bmRhcnlFbmQubmV4dFNpYmxpbmcgOiBlbmQ7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBjdXJyZW50LmRhdGE7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gc3RhcnRNYXJrZXIpXG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhID09PSBlbmRNYXJrZXIpIHtcbiAgICAgICAgICAgICAgICByYW5nZUVuZCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlU3RhcnQpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShcImRhdGEtYWRhcHRpdmUtY2xpZW50LW1vZHVsZVwiKSkge1xuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hJbkVsZW1lbnQoZWwpKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0U2libGluZztcbiAgICB9XG4gICAgcmV0dXJuIHsgc3RhcnQ6IHJhbmdlU3RhcnQsIGVuZDogcmFuZ2VFbmQgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0aXZlLW1hcmtlcnMuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogSW4tcGxhY2UgaHlkcmF0aW9uIC0gRE9NLWZpcnN0LCBzZW0gVkRPTVxuICogVk5vZGUgw6kgZWbDqm1lcm8sIHNlcnZlIHPDsyBwYXJhIGV4dHJhaXIgZXZlbnRvcy9yZWZzIGUgbGlnYXIgYW8gRE9NIGRvIHNlcnZlclxuICovXG5pbXBvcnQgeyBDT05URVhUX1BST1ZJREVSX1RBRyB9IGZyb20gXCIuLi8uLi9mcm9udC9jb250ZXh0LXJ1bnRpbWUuanNcIjtcbmltcG9ydCB7IHJ1bldpdGhDb250ZXh0LCB1bnRyYWNrIH0gZnJvbSBcIi4uLy4uL3JlYWN0aXZlL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVSZWFjdGl2ZUVmZmVjdCB9IGZyb20gXCIuLi8uLi9yZWFjdGl2ZS9ldmVudHMuanNcIjtcbmltcG9ydCB7IHJlc29sdmVEb21BdHRyaWJ1dGVOYW1lLCBzaG91bGRBc3NpZ25Bc1Byb3BlcnR5IH0gZnJvbSBcIi4vZG9tLmpzXCI7XG5pbXBvcnQgeyBiaW5kRGVsZWdhdGVkRXZlbnQgfSBmcm9tIFwiLi9ldmVudHMuanNcIjtcbmltcG9ydCB7IGJpbmRSZWYgfSBmcm9tIFwiLi9wcm9wcy5qc1wiO1xuaW1wb3J0IHsgd2Fybk1pc21hdGNoIH0gZnJvbSBcIi4vbWlzbWF0Y2guanNcIjtcbmltcG9ydCB7IGFwcGx5U3R5bGVPYmplY3QgfSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xuY29uc3QgSFlEUkFURURfSU5fUExBQ0UgPSBuZXcgV2Vha1NldCgpO1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVZOb2RlTGlzdCh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVZOb2RlTGlzdCh1bnRyYWNrKCgpID0+IHZhbHVlKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICByZXR1cm4gdmFsdWUuZmxhdE1hcCgoaXRlbSkgPT4gbm9ybWFsaXplVk5vZGVMaXN0KGl0ZW0pKTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4gW3sgX19hZGFwdGl2ZV90ZXh0OiBTdHJpbmcodmFsdWUpIH1dO1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgXCJ0YWdcIiBpbiB2YWx1ZSlcbiAgICAgICAgcmV0dXJuIFt2YWx1ZV07XG4gICAgcmV0dXJuIFtdO1xufVxuZnVuY3Rpb24gYWR2YW5jZU1lYW5pbmdmdWxTaWJsaW5nKGN1cnNvcikge1xuICAgIGxldCBjdXJyZW50ID0gY3Vyc29yLm5vZGU7XG4gICAgd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gY3Vyc29yLmVuZCkge1xuICAgICAgICBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICBpZiAoKGN1cnJlbnQudGV4dENvbnRlbnQgPz8gXCJcIikudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJzb3Iubm9kZSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIGN1cnNvci5ub2RlID0gY3VycmVudDtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICBjdXJzb3Iubm9kZSA9IGN1cnJlbnQ7XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBhZHZhbmNlTWVhbmluZ2Z1bENoaWxkKGZyb20sIHBhcmVudCkge1xuICAgIGxldCBjdXJyZW50ID0gZnJvbTtcbiAgICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50LnBhcmVudE5vZGUgPT09IHBhcmVudCkge1xuICAgICAgICBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICBpZiAoKGN1cnJlbnQudGV4dENvbnRlbnQgPz8gXCJcIikudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBub2RlOiBjdXJyZW50LCBmb3VuZDogY3VycmVudCB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50Lm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSlcbiAgICAgICAgICAgIHJldHVybiB7IG5vZGU6IGN1cnJlbnQsIGZvdW5kOiBjdXJyZW50IH07XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm4geyBub2RlOiBudWxsLCBmb3VuZDogbnVsbCB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGVWTm9kZUFnYWluc3RET00odm5vZGUsIGN1cnNvcikge1xuICAgIGlmICh2bm9kZSA9PSBudWxsIHx8IHZub2RlID09PSBmYWxzZSB8fCB2bm9kZSA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICh2bm9kZS5fX2FkYXB0aXZlX3RleHQgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBkb20gPSBhZHZhbmNlTWVhbmluZ2Z1bFNpYmxpbmcoY3Vyc29yKTtcbiAgICAgICAgaWYgKGRvbSAmJiBkb20ubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKVxuICAgICAgICAgICAgY3Vyc29yLm5vZGUgPSBkb20ubmV4dFNpYmxpbmc7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2bm9kZS50YWcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBsZXQgcmVzb2x2ZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNvbHZlZCA9IHVudHJhY2soKCkgPT4gdm5vZGUudGFnKHsgLi4uKHZub2RlLnByb3BzID8/IHt9KSwgY2hpbGRyZW46IHZub2RlLmNoaWxkcmVuID8/IFtdIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW2lucGxhY2VdIHJlc29sdmUgZmFpbGVkXCIsIGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub3JtYWxpemVWTm9kZUxpc3QocmVzb2x2ZWQpKVxuICAgICAgICAgICAgaHlkcmF0ZVZOb2RlQWdhaW5zdERPTShjaGlsZCwgY3Vyc29yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodm5vZGUudGFnID09PSBcIkZyYWdtZW50XCIgfHwgdHlwZW9mIHZub2RlLnRhZyA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vcm1hbGl6ZVZOb2RlTGlzdCh2bm9kZS5jaGlsZHJlbiA/PyBbXSkpXG4gICAgICAgICAgICBoeWRyYXRlVk5vZGVBZ2FpbnN0RE9NKGNoaWxkLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh2bm9kZS50YWcgPT09IENPTlRFWFRfUFJPVklERVJfVEFHKSB7XG4gICAgICAgIHJ1bldpdGhDb250ZXh0KHZub2RlLnByb3BzLmNvbnRleHQuaWQsIHZub2RlLnByb3BzLnZhbHVlLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vcm1hbGl6ZVZOb2RlTGlzdCh2bm9kZS5jaGlsZHJlbiA/PyBbXSkpXG4gICAgICAgICAgICAgICAgaHlkcmF0ZVZOb2RlQWdhaW5zdERPTShjaGlsZCwgY3Vyc29yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZG9tID0gYWR2YW5jZU1lYW5pbmdmdWxTaWJsaW5nKGN1cnNvcik7XG4gICAgaWYgKCFkb20gfHwgZG9tLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICB3YXJuTWlzbWF0Y2goeyBwYXRoOiBcImh5ZHJhdGUuaW5wbGFjZS5lbGVtZW50XCIsIG1lc3NhZ2U6IFwiU1NSIERPTSBlbGVtZW50IG5vdCBmb3VuZFwiLCBleHBlY3RlZDogU3RyaW5nKHZub2RlLnRhZyA/PyBcIj9cIiksIGZvdW5kOiBkb20gPyBkb20udGFnTmFtZSA6IFwibnVsbFwiLCBub2RlOiBkb20gPz8gdW5kZWZpbmVkIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVsID0gZG9tO1xuICAgIGN1cnNvci5ub2RlID0gZWwubmV4dFNpYmxpbmc7XG4gICAgaWYgKCFIWURSQVRFRF9JTl9QTEFDRS5oYXMoZWwpKSB7XG4gICAgICAgIEhZRFJBVEVEX0lOX1BMQUNFLmFkZChlbCk7XG4gICAgICAgIGJpbmRIb3N0UHJvcHNJblBsYWNlKGVsLCB2bm9kZS5wcm9wcyA/PyB7fSk7XG4gICAgfVxuICAgIGNvbnN0IGNoaWxkQ3Vyc29yID0geyBub2RlOiBlbC5maXJzdENoaWxkIH07XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub3JtYWxpemVWTm9kZUxpc3Qodm5vZGUuY2hpbGRyZW4gPz8gW10pKVxuICAgICAgICBoeWRyYXRlVk5vZGVBZ2FpbnN0RE9NSW5zaWRlKGNoaWxkLCBlbCwgY2hpbGRDdXJzb3IpO1xufVxuZnVuY3Rpb24gaHlkcmF0ZVZOb2RlQWdhaW5zdERPTUluc2lkZSh2bm9kZSwgcGFyZW50RWwsIGN1cnNvcikge1xuICAgIGlmICh2bm9kZSA9PSBudWxsIHx8IHZub2RlID09PSBmYWxzZSB8fCB2bm9kZSA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICh2bm9kZS5fX2FkYXB0aXZlX3RleHQgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCB7IGZvdW5kIH0gPSBhZHZhbmNlTWVhbmluZ2Z1bENoaWxkKGN1cnNvci5ub2RlLCBwYXJlbnRFbCk7XG4gICAgICAgIGlmIChmb3VuZCAmJiBmb3VuZC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpXG4gICAgICAgICAgICBjdXJzb3Iubm9kZSA9IGZvdW5kLm5leHRTaWJsaW5nO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygdm5vZGUudGFnID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgbGV0IHJlc29sdmVkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzb2x2ZWQgPSB1bnRyYWNrKCgpID0+IHZub2RlLnRhZyh7IC4uLih2bm9kZS5wcm9wcyA/PyB7fSksIGNoaWxkcmVuOiB2bm9kZS5jaGlsZHJlbiA/PyBbXSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9ybWFsaXplVk5vZGVMaXN0KHJlc29sdmVkKSlcbiAgICAgICAgICAgIGh5ZHJhdGVWTm9kZUFnYWluc3RET01JbnNpZGUoY2hpbGQsIHBhcmVudEVsLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh2bm9kZS50YWcgPT09IFwiRnJhZ21lbnRcIiB8fCB0eXBlb2Ygdm5vZGUudGFnID09PSBcInN5bWJvbFwiKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9ybWFsaXplVk5vZGVMaXN0KHZub2RlLmNoaWxkcmVuID8/IFtdKSlcbiAgICAgICAgICAgIGh5ZHJhdGVWTm9kZUFnYWluc3RET01JbnNpZGUoY2hpbGQsIHBhcmVudEVsLCBjdXJzb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh2bm9kZS50YWcgPT09IENPTlRFWFRfUFJPVklERVJfVEFHKSB7XG4gICAgICAgIHJ1bldpdGhDb250ZXh0KHZub2RlLnByb3BzLmNvbnRleHQuaWQsIHZub2RlLnByb3BzLnZhbHVlLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vcm1hbGl6ZVZOb2RlTGlzdCh2bm9kZS5jaGlsZHJlbiA/PyBbXSkpXG4gICAgICAgICAgICAgICAgaHlkcmF0ZVZOb2RlQWdhaW5zdERPTUluc2lkZShjaGlsZCwgcGFyZW50RWwsIGN1cnNvcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgZm91bmQgfSA9IGFkdmFuY2VNZWFuaW5nZnVsQ2hpbGQoY3Vyc29yLm5vZGUsIHBhcmVudEVsKTtcbiAgICBpZiAoIWZvdW5kIHx8IGZvdW5kLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICB3YXJuTWlzbWF0Y2goeyBwYXRoOiBcImh5ZHJhdGUuaW5wbGFjZS5jaGlsZFwiLCBtZXNzYWdlOiBcIlNTUiBjaGlsZCBub3QgZm91bmRcIiwgZXhwZWN0ZWQ6IFN0cmluZyh2bm9kZS50YWcgPz8gXCI/XCIpLCBmb3VuZDogZm91bmQgPyBmb3VuZC50YWdOYW1lIDogXCJudWxsXCIsIG5vZGU6IHBhcmVudEVsIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVsID0gZm91bmQ7XG4gICAgY3Vyc29yLm5vZGUgPSBlbC5uZXh0U2libGluZztcbiAgICBpZiAoIUhZRFJBVEVEX0lOX1BMQUNFLmhhcyhlbCkpIHtcbiAgICAgICAgSFlEUkFURURfSU5fUExBQ0UuYWRkKGVsKTtcbiAgICAgICAgYmluZEhvc3RQcm9wc0luUGxhY2UoZWwsIHZub2RlLnByb3BzID8/IHt9KTtcbiAgICB9XG4gICAgY29uc3QgbmVzdGVkID0geyBub2RlOiBlbC5maXJzdENoaWxkIH07XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub3JtYWxpemVWTm9kZUxpc3Qodm5vZGUuY2hpbGRyZW4gPz8gW10pKVxuICAgICAgICBoeWRyYXRlVk5vZGVBZ2FpbnN0RE9NSW5zaWRlKGNoaWxkLCBlbCwgbmVzdGVkKTtcbn1cbmZ1bmN0aW9uIGJpbmRIb3N0UHJvcHNJblBsYWNlKGVsLCBwcm9wcykge1xuICAgIGNvbnN0IG5hbWVzcGFjZSA9IGVsLm5hbWVzcGFjZVVSSTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhwcm9wcykpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJjaGlsZHJlblwiIHx8IGtleSA9PT0gXCJjbGllbnRcIilcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoXCJvblwiKSAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgYmluZERlbGVnYXRlZEV2ZW50KGVsLCBrZXkuc2xpY2UoMikudG9Mb3dlckNhc2UoKSwgdmFsdWUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSA9PT0gXCJyZWZcIiAmJiB2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBiaW5kUmVmKHZhbHVlLCBlbCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ID09PSBcImNsYXNzTmFtZVwiKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgY3JlYXRlUmVhY3RpdmVFZmZlY3QoKCkgPT4geyBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB2YWx1ZSgpID8/IFwiXCIpOyB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlUmVhY3RpdmVFZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlT2JqZWN0Py4oZWwsIHZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIH0pOyAvLyBUT0RPOiBpbXBvcnRhciBlc3TDoXRpY28gcXVhbmRvIGJ1bmRsZXIgcmVzb2x2ZXIgY2lyY3VsYXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW3N0eWxlS2V5LCBzdHlsZVZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZVZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVJlYWN0aXZlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IHN0eWxlVmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjc3NLZXkgPSBzdHlsZUtleS5yZXBsYWNlKC8oW0EtWl0pL2csIFwiLSQxXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc29sdmVkID09IG51bGwgfHwgcmVzb2x2ZWQgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShjc3NLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGVbc3R5bGVLZXldID0gcmVzb2x2ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcImxheW91dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY3JlYXRlUmVhY3RpdmVFZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkID0gdmFsdWUoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQgPT09IGZhbHNlIHx8IHJlc29sdmVkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKHJlc29sdmVEb21BdHRyaWJ1dGVOYW1lKGtleSwgbmFtZXNwYWNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEFzc2lnbkFzUHJvcGVydHkoZWwsIG5hbWVzcGFjZSwga2V5KSlcbiAgICAgICAgICAgICAgICAgICAgZWxba2V5XSA9IHJlc29sdmVkO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKHJlc29sdmVEb21BdHRyaWJ1dGVOYW1lKGtleSwgbmFtZXNwYWNlKSwgU3RyaW5nKHJlc29sdmVkKSk7XG4gICAgICAgICAgICB9LCBcImxheW91dFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlucGxhY2UuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogSGlkcmF0YcOnw6NvIGZpbmEgLSBzZW0gVkRPTSwgc8OzIGFuY2hvcnMgZSBlZmVpdG9zXG4gKiBGSVg6IERldGVjdGEgbXVkYW7Dp2FzIGRlIHRpcG8gZGUgY29tcG9uZW50ZSBlbSAubWFwKCkgY29tIGNvbXBvbmVudGVzIHZhcmlhZG9zXG4gKiBCYXNlYWRvIG5hIGltcGxlbWVudGHDp8OjbyBtb25vbMOtdGljYSBxdWUgZnVuY2lvbmEgcGVyZmVpdGFtZW50ZVxuICovXG5pbXBvcnQgeyBSRUFDVElWRV9BU1lOQ19FTkQsIFJFQUNUSVZFX0FTWU5DX1NUQVJULCBSRUFDVElWRV9DSElMRF9FTkQsIFJFQUNUSVZFX0NISUxEX1NUQVJULCBSRUFDVElWRV9MSVNUX0VORCwgUkVBQ1RJVkVfTElTVF9TVEFSVCwgUkVBQ1RJVkVfU1RSVUNUX0VORCwgUkVBQ1RJVkVfU1RSVUNUX1NUQVJULCB9IGZyb20gXCJAYWRhcHRpdmUtanMvc2hhcmVkXCI7XG5pbXBvcnQgeyBjbGVhbnVwRWZmZWN0U2NvcGUsIGNyZWF0ZUVmZmVjdFNjb3BlLCBydW5XaXRoRWZmZWN0U2NvcGUgfSBmcm9tIFwiLi4vLi4vcmVhY3RpdmUvaW5kZXguanNcIjtcbmltcG9ydCB7IHJlbmRlclRvRE9NIH0gZnJvbSBcIi4vcmVuZGVyLXRvLWRvbS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlUmVhY3RpdmVFZmZlY3QgfSBmcm9tIFwiLi4vLi4vcmVhY3RpdmUvZXZlbnRzLmpzXCI7XG5pbXBvcnQgeyBmaW5kTWFya2VyUGFpckJldHdlZW5NYXJrZXJzLCBmaW5kTWFya2VyUGFpckluUm9vdCB9IGZyb20gXCIuL3JlYWN0aXZlLW1hcmtlcnMuanNcIjtcbmltcG9ydCB7IGRlYnVnSHlkcmF0aW9uTG9nLCB3YXJuTWlzbWF0Y2ggfSBmcm9tIFwiLi9taXNtYXRjaC5qc1wiO1xuaW1wb3J0IHsgY29sbGVjdFNpYmxpbmdOb2Rlc0JldHdlZW4gfSBmcm9tIFwiLi9tYXJrZXJzLmpzXCI7XG5pbXBvcnQgeyBoeWRyYXRlVk5vZGVBZ2FpbnN0RE9NLCBub3JtYWxpemVWTm9kZUxpc3QgfSBmcm9tIFwiLi9pbnBsYWNlLmpzXCI7XG5pbXBvcnQgeyBnZXRWTm9kZUtleSB9IGZyb20gXCIuLi9rZXllZC1yZWFjdGl2ZS1ibG9jay5qc1wiO1xuZnVuY3Rpb24gaXNQcm9taXNlTGlrZSh2KSB7IHJldHVybiB2ICE9IG51bGwgJiYgdHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHYudGhlbiA9PT0gXCJmdW5jdGlvblwiOyB9XG4vKipcbiAqIEV4dHJhaSBhc3NpbmF0dXJhIGRlIHRpcG8gcGFyYSB2bm9kZXMsIGRldGVjdGFuZG8gcXVhbmRvIC5tYXAoKSByZW5kZXJpemEgdGlwb3MgZGlmZXJlbnRlcyBkZSBjb21wb25lbnRlcy5cbiAqIFBhcmEgZGV0ZWN0YXIgbXVkYW7Dp2FzIGVtIGxpc3RhcyBmaWx0cmFkYXMsIHRhbWLDqW0gY29uc2lkZXJhIG8gdGFtYW5obyBkbyBhcnJheS5cbiAqL1xuZnVuY3Rpb24gZ2V0Vk5vZGVUeXBlU2lnbmF0dXJlKHZhbHVlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gXCJlbXB0eVwiO1xuICAgICAgICAvLyBQYXJhIGFycmF5cywgaW5jbHVpciBvIHRhbWFuaG8gw6kgY3J1Y2lhbCBwYXJhIGRldGVjdGFyIGZpbHRyb3NcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlcyA9IHZhbHVlLm1hcCgodikgPT4gZ2V0Vk5vZGVUeXBlU2lnbmF0dXJlKHYpKTtcbiAgICAgICAgY29uc3QgdW5pcXVlID0gbmV3IFNldChzaWduYXR1cmVzKTtcbiAgICAgICAgY29uc3QgdHlwZVN0ciA9IHVuaXF1ZS5zaXplID09PSAxID8gc2lnbmF0dXJlc1swXSA6IEFycmF5LmZyb20odW5pcXVlKS5qb2luKFwifFwiKTtcbiAgICAgICAgLy8gQWRpY2lvbmEgdGFtYW5obyBkbyBhcnJheSDDoCBhc3NpbmF0dXJhIHBhcmEgZGV0ZWN0YXIgbXVkYW7Dp2FzIGRlIGZpbHRyb1xuICAgICAgICByZXR1cm4gYFske3ZhbHVlLmxlbmd0aH1dOiR7dHlwZVN0cn1gO1xuICAgIH1cbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIFwidGFnXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgY29uc3QgdGFnID0gdmFsdWUudGFnO1xuICAgICAgICAvLyBQYXJhIGRpdnMgZSBvdXRyb3MgZWxlbWVudG9zIGhvc3QsIHRhbWLDqW0gaW5jbHVpciBhIGtleSBzZSBleGlzdGlyXG4gICAgICAgIGNvbnN0IGtleSA9IHZhbHVlLmtleSB8fCB2YWx1ZS5wcm9wcz8ua2V5O1xuICAgICAgICBjb25zdCBiYXNlVHlwZSA9IHR5cGVvZiB0YWcgPT09IFwiZnVuY3Rpb25cIiA/ICh0YWcubmFtZSB8fCBcIkFub25cIikgOiAodHlwZW9mIHRhZyA9PT0gXCJzdHJpbmdcIiA/IHRhZyA6IFwiU3ltXCIpO1xuICAgICAgICAvLyBTZSB0ZW0ga2V5LCBpbmNsdWkgbmEgYXNzaW5hdHVyYSAoaW1wb3J0YW50ZSBwYXJhIGRldGVjdGFyIGRpZmVyZW50ZXMgaXRlbnMpXG4gICAgICAgIGlmIChrZXkpXG4gICAgICAgICAgICByZXR1cm4gYCR7YmFzZVR5cGV9IyR7a2V5fWA7XG4gICAgICAgIC8vIFNlIG7Do28gdGVtIGtleSwgb2xoYSByZWN1cnNpdmFtZW50ZSBub3MgY2hpbGRyZW4gcGFyYSBkZXRlY3RhciBjb21wb25lbnRlcyBhbmluaGFkb3NcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB2YWx1ZS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFNpZyA9IGdldFZOb2RlVHlwZVNpZ25hdHVyZShjaGlsZHJlbik7XG4gICAgICAgICAgICBpZiAoY2hpbGRTaWcgJiYgY2hpbGRTaWcgIT09IFwiZW1wdHlcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7YmFzZVR5cGV9KCR7Y2hpbGRTaWd9KWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhc2VUeXBlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBgRm5bJHt2YWx1ZS5uYW1lIHx8IFwiP1wifV1gO1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gZmluZFJlYWN0aXZlTWFya2Vycyhyb290LCBpZCkge1xuICAgIHJldHVybiBmaW5kTWFya2VyUGFpckluUm9vdChyb290LCBgJHtSRUFDVElWRV9DSElMRF9TVEFSVH06JHtpZH1gLCBgJHtSRUFDVElWRV9DSElMRF9FTkR9OiR7aWR9YCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZmluZFJlYWN0aXZlTWFya2Vyc0JldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQsIGlkKSB7XG4gICAgcmV0dXJuIGZpbmRNYXJrZXJQYWlyQmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgYCR7UkVBQ1RJVkVfQ0hJTERfU1RBUlR9OiR7aWR9YCwgYCR7UkVBQ1RJVkVfQ0hJTERfRU5EfToke2lkfWApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRSZWFjdGl2ZVN0cnVjdE1hcmtlcnMocm9vdCwgaWQpIHtcbiAgICByZXR1cm4gZmluZE1hcmtlclBhaXJJblJvb3Qocm9vdCwgYCR7UkVBQ1RJVkVfU1RSVUNUX1NUQVJUfToke2lkfWAsIGAke1JFQUNUSVZFX1NUUlVDVF9FTkR9OiR7aWR9YCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZmluZFJlYWN0aXZlU3RydWN0TWFya2Vyc0JldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQsIGlkKSB7XG4gICAgcmV0dXJuIGZpbmRNYXJrZXJQYWlyQmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgYCR7UkVBQ1RJVkVfU1RSVUNUX1NUQVJUfToke2lkfWAsIGAke1JFQUNUSVZFX1NUUlVDVF9FTkR9OiR7aWR9YCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZmluZFJlYWN0aXZlTGlzdE1hcmtlcnMocm9vdCwgaWQpIHtcbiAgICByZXR1cm4gZmluZE1hcmtlclBhaXJJblJvb3Qocm9vdCwgYCR7UkVBQ1RJVkVfTElTVF9TVEFSVH06JHtpZH1gLCBgJHtSRUFDVElWRV9MSVNUX0VORH06JHtpZH1gKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUmVhY3RpdmVMaXN0TWFya2Vyc0JldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQsIGlkKSB7XG4gICAgcmV0dXJuIGZpbmRNYXJrZXJQYWlyQmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgYCR7UkVBQ1RJVkVfTElTVF9TVEFSVH06JHtpZH1gLCBgJHtSRUFDVElWRV9MSVNUX0VORH06JHtpZH1gKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUmVhY3RpdmVBc3luY01hcmtlcnMocm9vdCwgaWQpIHtcbiAgICByZXR1cm4gZmluZE1hcmtlclBhaXJJblJvb3Qocm9vdCwgYCR7UkVBQ1RJVkVfQVNZTkNfU1RBUlR9OiR7aWR9YCwgYCR7UkVBQ1RJVkVfQVNZTkNfRU5EfToke2lkfWApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRSZWFjdGl2ZUFzeW5jTWFya2Vyc0JldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQsIGlkKSB7XG4gICAgcmV0dXJuIGZpbmRNYXJrZXJQYWlyQmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgYCR7UkVBQ1RJVkVfQVNZTkNfU1RBUlR9OiR7aWR9YCwgYCR7UkVBQ1RJVkVfQVNZTkNfRU5EfToke2lkfWApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGVSZWFjdGl2ZVJhbmdlV2l0aE1hcmtlcnMoc3RhcnQsIGVuZCwgaW5zdHJ1Y3Rpb24pIHtcbiAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHtcbiAgICAgICAgd2Fybk1pc21hdGNoKHsgcGF0aDogYGh5ZHJhdGUuaW5zdHJ1Y3Rpb24ucmVhY3RpdmUtcmFuZ2UuJHtpbnN0cnVjdGlvbi5pZH1gLCBtZXNzYWdlOiBcIlJlYWN0aXZlIHJhbmdlIG1hcmtlcnMgbm90IGZvdW5kXCIsIGV4cGVjdGVkOiBgPCEtLSR7UkVBQ1RJVkVfQ0hJTERfU1RBUlR9OiR7aW5zdHJ1Y3Rpb24uaWR9LS0+YCwgZm91bmQ6IFwibm90aGluZ1wiIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRleHROb2RlID0gZW5zdXJlUmVhY3RpdmVUZXh0Tm9kZUJldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQpO1xuICAgIGlmICghdGV4dE5vZGUpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBwYXJlbnQgPSBzdGFydC5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHN0YXJ0KTtcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGVuZCk7XG4gICAgfVxuICAgIGNyZWF0ZUh5ZHJhdGVkUmVhY3RpdmVUZXh0QmluZGluZyh0ZXh0Tm9kZSwgaW5zdHJ1Y3Rpb24pO1xufVxuZnVuY3Rpb24gZW5zdXJlUmVhY3RpdmVUZXh0Tm9kZUJldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQpIHtcbiAgICBjb25zdCBub2RlcyA9IGNvbGxlY3RTaWJsaW5nTm9kZXNCZXR3ZWVuKHN0YXJ0LCBlbmQpO1xuICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDEgJiYgbm9kZXNbMF0ubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKVxuICAgICAgICByZXR1cm4gbm9kZXNbMF07XG4gICAgY29uc3QgcGFyZW50ID0gc3RhcnQucGFyZW50Tm9kZTtcbiAgICBpZiAoIXBhcmVudClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2Rlcy5tYXAoKG4pID0+IG4udGV4dENvbnRlbnQgPz8gXCJcIikuam9pbihcIlwiKSk7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZSh0ZXh0Tm9kZSwgZW5kKTtcbiAgICBub2Rlcy5mb3JFYWNoKChuKSA9PiBwYXJlbnQucmVtb3ZlQ2hpbGQobikpO1xuICAgIHJldHVybiB0ZXh0Tm9kZTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUh5ZHJhdGVkUmVhY3RpdmVUZXh0QmluZGluZyh0ZXh0Tm9kZSwgaW5zdHJ1Y3Rpb24pIHtcbiAgICBkZWJ1Z0h5ZHJhdGlvbkxvZyhcIltoeWRyYXRlOnJhbmdlOmJpbmRdXCIsIGluc3RydWN0aW9uLmlkLCB0ZXh0Tm9kZS5kYXRhKTtcbiAgICBsZXQgZmlyc3RSdW4gPSB0cnVlO1xuICAgIGNyZWF0ZVJlYWN0aXZlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dFRleHQgPSBub3JtYWxpemVSZWFjdGl2ZVRleHRWYWx1ZShpbnN0cnVjdGlvbi5nZXR0ZXIoKSk7XG4gICAgICAgIGRlYnVnSHlkcmF0aW9uTG9nKFwiW2h5ZHJhdGU6cmFuZ2U6cnVuXVwiLCBpbnN0cnVjdGlvbi5pZCwgbmV4dFRleHQpO1xuICAgICAgICBpZiAoZmlyc3RSdW4gJiYgdGV4dE5vZGUuZGF0YSAhPT0gbmV4dFRleHQpIHtcbiAgICAgICAgICAgIHdhcm5NaXNtYXRjaCh7IHBhdGg6IGBoeWRyYXRlLmluc3RydWN0aW9uLnJlYWN0aXZlLXJhbmdlLiR7aW5zdHJ1Y3Rpb24uaWR9YCwgbWVzc2FnZTogXCJTU1IgdGV4dCBtaXNtYXRjaFwiLCBleHBlY3RlZDogbmV4dFRleHQsIGZvdW5kOiB0ZXh0Tm9kZS5kYXRhLCBub2RlOiB0ZXh0Tm9kZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBmaXJzdFJ1biA9IGZhbHNlO1xuICAgICAgICB0ZXh0Tm9kZS5kYXRhID0gbmV4dFRleHQ7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVSZWFjdGl2ZVRleHRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgICByZXR1cm4gdmFsdWUubWFwKChpKSA9PiBub3JtYWxpemVSZWFjdGl2ZVRleHRWYWx1ZShpKSkuam9pbihcIlwiKTtcbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRlUmVhY3RpdmVTdHJ1Y3RXaXRoTWFya2VycyhzdGFydCwgZW5kLCBpbnN0cnVjdGlvbikge1xuICAgIGh5ZHJhdGVSZWFjdGl2ZUNvbnRlbnRXaXRoTWFya2VycyhzdGFydCwgZW5kLCB7IGlkOiBpbnN0cnVjdGlvbi5pZCwga2luZDogXCJyZWFjdGl2ZS1zdHJ1Y3RcIiwgZ2V0dGVyOiBpbnN0cnVjdGlvbi5yZW5kZXIgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0ZVJlYWN0aXZlTGlzdFdpdGhNYXJrZXJzKHN0YXJ0LCBlbmQsIGluc3RydWN0aW9uKSB7XG4gICAgaHlkcmF0ZVJlYWN0aXZlQ29udGVudFdpdGhNYXJrZXJzKHN0YXJ0LCBlbmQsIHsgaWQ6IGluc3RydWN0aW9uLmlkLCBraW5kOiBcInJlYWN0aXZlLWxpc3RcIiwgZ2V0dGVyOiBpbnN0cnVjdGlvbi5nZXR0ZXIgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0ZVJlYWN0aXZlQXN5bmNXaXRoTWFya2VycyhzdGFydCwgZW5kLCBpbnN0cnVjdGlvbikge1xuICAgIGh5ZHJhdGVSZWFjdGl2ZUNvbnRlbnRXaXRoTWFya2VycyhzdGFydCwgZW5kLCB7IGlkOiBpbnN0cnVjdGlvbi5pZCwga2luZDogXCJyZWFjdGl2ZS1hc3luY1wiLCBnZXR0ZXI6IGluc3RydWN0aW9uLmdldHRlciB9KTtcbn1cbmZ1bmN0aW9uIGh5ZHJhdGVSZWFjdGl2ZUNvbnRlbnRXaXRoTWFya2VycyhzdGFydCwgZW5kLCBjb25maWcpIHtcbiAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHtcbiAgICAgICAgd2Fybk1pc21hdGNoKHsgcGF0aDogYGh5ZHJhdGUuaW5zdHJ1Y3Rpb24uJHtjb25maWcua2luZH0uJHtjb25maWcuaWR9YCwgbWVzc2FnZTogXCJSZWFjdGl2ZSBtYXJrZXJzIG5vdCBmb3VuZFwiLCBleHBlY3RlZDogYG1hcmtlcnMgZm9yICR7Y29uZmlnLmtpbmR9OiR7Y29uZmlnLmlkfWAsIGZvdW5kOiBcIm5vdGhpbmdcIiB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnQgPSBzdGFydC5wYXJlbnROb2RlO1xuICAgIGlmICghcGFyZW50KVxuICAgICAgICByZXR1cm47XG4gICAgLy8gVXNhIFRleHQgbm9kZXMgdmF6aW9zIGNvbW8gYW5jaG9ycyBpbnZpc8OtdmVpcyBhbyBpbnbDqXMgZGUgY29tZW50w6FyaW9zXG4gICAgY29uc3Qgc3RhcnRBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICBjb25zdCBlbmRBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHN0YXJ0QW5jaG9yLCBzdGFydCk7XG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZChlbmRBbmNob3IsIGVuZCk7XG4gICAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgbGV0IHBlbmRpbmdUb2tlbiA9IDA7XG4gICAgbGV0IGN1cnJlbnRTY29wZSA9IG51bGw7XG4gICAgbGV0IGN1cnJlbnRLZXkgPSB1bmRlZmluZWQ7XG4gICAgbGV0IGN1cnJlbnRUeXBlU2lnID0gdW5kZWZpbmVkO1xuICAgIGNyZWF0ZVJlYWN0aXZlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gY29uZmlnLmdldHRlcigpO1xuICAgICAgICBjb25zdCBjdXJyZW50VG9rZW4gPSArK3BlbmRpbmdUb2tlbjtcbiAgICAgICAgY29uc3QgbmV4dEtleSA9IGdldFZOb2RlS2V5KG5leHRWYWx1ZSk7XG4gICAgICAgIGNvbnN0IG5leHRUeXBlU2lnID0gY29uZmlnLmtpbmQgPT09IFwicmVhY3RpdmUtbGlzdFwiID8gZ2V0Vk5vZGVUeXBlU2lnbmF0dXJlKG5leHRWYWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGN1cnJlbnRLZXkgPSBuZXh0S2V5O1xuICAgICAgICAgICAgY3VycmVudFR5cGVTaWcgPSBuZXh0VHlwZVNpZztcbiAgICAgICAgICAgIGlmIChpc1Byb21pc2VMaWtlKG5leHRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2b2lkIG5leHRWYWx1ZS50aGVuKChyZXNvbHZlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRva2VuICE9PSBwZW5kaW5nVG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXBFZmZlY3RTY29wZShjdXJyZW50U2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNjb3BlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2NvcGUgPSBjcmVhdGVFZmZlY3RTY29wZShcImh5ZHJhdGUtcmFuZ2VcIik7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRLZXkgPSBnZXRWTm9kZUtleShyZXNvbHZlZCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUeXBlU2lnID0gZ2V0Vk5vZGVUeXBlU2lnbmF0dXJlKHJlc29sdmVkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVJlYWN0aXZlUmFuZ2VDb250ZW50KHN0YXJ0QW5jaG9yLCBlbmRBbmNob3IsIHJlc29sdmVkLCBjdXJyZW50U2NvcGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRTY29wZSA9IGNyZWF0ZUVmZmVjdFNjb3BlKFwiaHlkcmF0ZS1yYW5nZVwiKTtcbiAgICAgICAgICAgIGlmIChjb25maWcua2luZCA9PT0gXCJyZWFjdGl2ZS1saXN0XCIpIHtcbiAgICAgICAgICAgICAgICByZXBsYWNlUmVhY3RpdmVSYW5nZUNvbnRlbnQoc3RhcnRBbmNob3IsIGVuZEFuY2hvciwgbmV4dFZhbHVlLCBjdXJyZW50U2NvcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcnVuV2l0aEVmZmVjdFNjb3BlKGN1cnJlbnRTY29wZSwgKCkgPT4geyBoeWRyYXRlRXhpc3RpbmdSZWFjdGl2ZUNvbnRlbnQoc3RhcnRBbmNob3IsIGVuZEFuY2hvciwgbmV4dFZhbHVlKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5VW5jaGFuZ2VkID0gbmV4dEtleSAhPSBudWxsICYmIGN1cnJlbnRLZXkgIT0gbnVsbCAmJiBPYmplY3QuaXMobmV4dEtleSwgY3VycmVudEtleSk7XG4gICAgICAgIGNvbnN0IHR5cGVVbmNoYW5nZWQgPSBjb25maWcua2luZCA9PT0gXCJyZWFjdGl2ZS1saXN0XCIgPyBuZXh0VHlwZVNpZyA9PT0gY3VycmVudFR5cGVTaWcgOiB0cnVlO1xuICAgICAgICBpZiAoa2V5VW5jaGFuZ2VkICYmIHR5cGVVbmNoYW5nZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChpc1Byb21pc2VMaWtlKG5leHRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHZvaWQgbmV4dFZhbHVlLnRoZW4oKHJlc29sdmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUb2tlbiAhPT0gcGVuZGluZ1Rva2VuKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRLZXkgPSBnZXRWTm9kZUtleShyZXNvbHZlZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRUeXBlU2lnID0gZ2V0Vk5vZGVUeXBlU2lnbmF0dXJlKHJlc29sdmVkKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWRLZXkgIT0gbnVsbCAmJiBjdXJyZW50S2V5ICE9IG51bGwgJiYgT2JqZWN0LmlzKHJlc29sdmVkS2V5LCBjdXJyZW50S2V5KSAmJiByZXNvbHZlZFR5cGVTaWcgPT09IGN1cnJlbnRUeXBlU2lnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwRWZmZWN0U2NvcGUoY3VycmVudFNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNjb3BlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VycmVudFNjb3BlID0gY3JlYXRlRWZmZWN0U2NvcGUoXCJoeWRyYXRlLXJhbmdlXCIpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRLZXkgPSByZXNvbHZlZEtleTtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHlwZVNpZyA9IHJlc29sdmVkVHlwZVNpZztcbiAgICAgICAgICAgICAgICByZXBsYWNlUmVhY3RpdmVSYW5nZUNvbnRlbnQoc3RhcnRBbmNob3IsIGVuZEFuY2hvciwgcmVzb2x2ZWQsIGN1cnJlbnRTY29wZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFNjb3BlKSB7XG4gICAgICAgICAgICBjbGVhbnVwRWZmZWN0U2NvcGUoY3VycmVudFNjb3BlKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY29wZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFNjb3BlID0gY3JlYXRlRWZmZWN0U2NvcGUoXCJoeWRyYXRlLXJhbmdlXCIpO1xuICAgICAgICBjdXJyZW50S2V5ID0gbmV4dEtleTtcbiAgICAgICAgY3VycmVudFR5cGVTaWcgPSBuZXh0VHlwZVNpZztcbiAgICAgICAgcmVwbGFjZVJlYWN0aXZlUmFuZ2VDb250ZW50KHN0YXJ0QW5jaG9yLCBlbmRBbmNob3IsIG5leHRWYWx1ZSwgY3VycmVudFNjb3BlKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJlcGxhY2VSZWFjdGl2ZVJhbmdlQ29udGVudChzdGFydCwgZW5kLCB2YWx1ZSwgc2NvcGUpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBzdGFydC5wYXJlbnROb2RlO1xuICAgIGlmICghcGFyZW50KVxuICAgICAgICByZXR1cm47XG4gICAgbGV0IGN1cnJlbnQgPSBzdGFydC5uZXh0U2libGluZztcbiAgICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBlbmQpIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IGN1cnJlbnQubmV4dFNpYmxpbmc7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChjdXJyZW50KTtcbiAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgfVxuICAgIGNvbnN0IGluc2VydCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dE5vZGVzID0gbm9ybWFsaXplVG9Ob2Rlcyh2YWx1ZSk7XG4gICAgICAgIG5leHROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIGVuZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgaWYgKHNjb3BlKVxuICAgICAgICBydW5XaXRoRWZmZWN0U2NvcGUoc2NvcGUsIGluc2VydCk7XG4gICAgZWxzZVxuICAgICAgICBpbnNlcnQoKTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZVRvTm9kZXModmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gZmFsc2UpXG4gICAgICAgIHJldHVybiBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICAgIHJldHVybiB2YWx1ZS5mbGF0TWFwKChpdGVtKSA9PiBub3JtYWxpemVUb05vZGVzKGl0ZW0pKTtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBOb2RlKVxuICAgICAgICByZXR1cm4gW3ZhbHVlXTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBub3JtYWxpemVUb05vZGVzKHZhbHVlKCkpO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgXCJ0YWdcIiBpbiB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZnJhZyA9IHJlbmRlclRvRE9NKHZhbHVlLCBudWxsKTtcbiAgICAgICAgICAgIGlmIChmcmFnIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudClcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShmcmFnLmNoaWxkTm9kZXMpO1xuICAgICAgICAgICAgcmV0dXJuIFtmcmFnXTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcodmFsdWUpKV07XG59XG5mdW5jdGlvbiBoeWRyYXRlRXhpc3RpbmdSZWFjdGl2ZUNvbnRlbnQoc3RhcnQsIGVuZCwgdmFsdWUpIHtcbiAgICAvLyBEZWxlZ2HDp8OjbyBwYXJhIGluLXBsYWNlIGh5ZHJhdGlvbiAtIERPTS1maXJzdCwgc2VtIFZET01cbiAgICBjb25zdCBjdXJzb3IgPSB7IG5vZGU6IHN0YXJ0Lm5leHRTaWJsaW5nLCBlbmQsIHBhcmVudDogc3RhcnQucGFyZW50Tm9kZSB9O1xuICAgIGZvciAoY29uc3Qgdm5vZGUgb2Ygbm9ybWFsaXplVk5vZGVMaXN0KHZhbHVlKSkge1xuICAgICAgICBoeWRyYXRlVk5vZGVBZ2FpbnN0RE9NKHZub2RlLCBjdXJzb3IpO1xuICAgIH1cbn1cbi8vIHN0dWJzIHBhcmEgY29tcGF0IGNvbSBrZXllZC1yZWFjdGl2ZS1ibG9jayBxdWUgZXNwZXJhIGdldFZOb2RlS2V5XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdGl2ZS5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKiBBZ3J1cGEgZSBhcGxpY2EgaW5zdHJ1w6fDtWVzIC0gc2VtIFZET01cbiAqL1xuaW1wb3J0IHsgZmluZEh5ZHJhdGlvbkVsZW1lbnQsIGZpbmRIeWRyYXRpb25FbGVtZW50QmV0d2Vlbk1hcmtlcnMgfSBmcm9tIFwiLi9lbGVtZW50cy5qc1wiO1xuaW1wb3J0IHsgYmluZERlbGVnYXRlZEV2ZW50LCB3cmFwSHlkcmF0aW9uRXZlbnRIYW5kbGVyIH0gZnJvbSBcIi4vZXZlbnRzLmpzXCI7XG5pbXBvcnQgeyBiaW5kUmVmLCBoeWRyYXRlRHluYW1pY1Byb3AgfSBmcm9tIFwiLi9wcm9wcy5qc1wiO1xuaW1wb3J0IHsgZGVidWdIeWRyYXRpb25Mb2csIHdhcm5IeWRyYXRpb25JbnN0cnVjdGlvbk1pc3NpbmcgfSBmcm9tIFwiLi9taXNtYXRjaC5qc1wiO1xuaW1wb3J0IHsgZmluZFJlYWN0aXZlQXN5bmNNYXJrZXJzLCBmaW5kUmVhY3RpdmVBc3luY01hcmtlcnNCZXR3ZWVuTWFya2VycywgZmluZFJlYWN0aXZlTGlzdE1hcmtlcnMsIGZpbmRSZWFjdGl2ZUxpc3RNYXJrZXJzQmV0d2Vlbk1hcmtlcnMsIGZpbmRSZWFjdGl2ZU1hcmtlcnMsIGZpbmRSZWFjdGl2ZU1hcmtlcnNCZXR3ZWVuTWFya2VycywgZmluZFJlYWN0aXZlU3RydWN0TWFya2VycywgZmluZFJlYWN0aXZlU3RydWN0TWFya2Vyc0JldHdlZW5NYXJrZXJzLCBoeWRyYXRlUmVhY3RpdmVBc3luY1dpdGhNYXJrZXJzLCBoeWRyYXRlUmVhY3RpdmVMaXN0V2l0aE1hcmtlcnMsIGh5ZHJhdGVSZWFjdGl2ZVJhbmdlV2l0aE1hcmtlcnMsIGh5ZHJhdGVSZWFjdGl2ZVN0cnVjdFdpdGhNYXJrZXJzIH0gZnJvbSBcIi4vcmVhY3RpdmUuanNcIjtcbmltcG9ydCB7IGNyZWF0ZVJlYWN0aXZlRWZmZWN0IH0gZnJvbSBcIi4uLy4uL3JlYWN0aXZlL2luZGV4LmpzXCI7XG5mdW5jdGlvbiBncm91cEh5ZHJhdGlvbkluc3RydWN0aW9ucyhpbnN0cnVjdGlvbnMpIHtcbiAgICBjb25zdCBncm91cGVkID0ge1xuICAgICAgICBldmVudHM6IFtdLFxuICAgICAgICByZWZzOiBbXSxcbiAgICAgICAgcmVhY3RpdmVSYW5nZXM6IFtdLFxuICAgICAgICByZWFjdGl2ZVN0cnVjdHM6IFtdLFxuICAgICAgICByZWFjdGl2ZUxpc3RzOiBbXSxcbiAgICAgICAgcmVhY3RpdmVBc3luY3M6IFtdLFxuICAgICAgICBkeW5hbWljUHJvcHM6IFtdLFxuICAgICAgICBsYXlvdXRFZmZlY3RzOiBbXSxcbiAgICAgICAgZWZmZWN0czogW11cbiAgICB9O1xuICAgIGZvciAoY29uc3QgaW5zdHJ1Y3Rpb24gb2YgaW5zdHJ1Y3Rpb25zKSB7XG4gICAgICAgIHN3aXRjaCAoaW5zdHJ1Y3Rpb24ua2luZCkge1xuICAgICAgICAgICAgY2FzZSBcImV2ZW50XCI6XG4gICAgICAgICAgICAgICAgZ3JvdXBlZC5ldmVudHMucHVzaChpbnN0cnVjdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmVmXCI6XG4gICAgICAgICAgICAgICAgZ3JvdXBlZC5yZWZzLnB1c2goaW5zdHJ1Y3Rpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJlYWN0aXZlLXJhbmdlXCI6XG4gICAgICAgICAgICAgICAgZ3JvdXBlZC5yZWFjdGl2ZVJhbmdlcy5wdXNoKGluc3RydWN0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyZWFjdGl2ZS1zdHJ1Y3RcIjpcbiAgICAgICAgICAgICAgICBncm91cGVkLnJlYWN0aXZlU3RydWN0cy5wdXNoKGluc3RydWN0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyZWFjdGl2ZS1saXN0XCI6XG4gICAgICAgICAgICAgICAgZ3JvdXBlZC5yZWFjdGl2ZUxpc3RzLnB1c2goaW5zdHJ1Y3Rpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJlYWN0aXZlLWFzeW5jXCI6XG4gICAgICAgICAgICAgICAgZ3JvdXBlZC5yZWFjdGl2ZUFzeW5jcy5wdXNoKGluc3RydWN0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkeW5hbWljLXByb3BcIjpcbiAgICAgICAgICAgICAgICBncm91cGVkLmR5bmFtaWNQcm9wcy5wdXNoKGluc3RydWN0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsYXlvdXQtZWZmZWN0XCI6XG4gICAgICAgICAgICAgICAgZ3JvdXBlZC5sYXlvdXRFZmZlY3RzLnB1c2goaW5zdHJ1Y3Rpb24pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImVmZmVjdFwiOlxuICAgICAgICAgICAgICAgIGdyb3VwZWQuZWZmZWN0cy5wdXNoKGluc3RydWN0aW9uKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBlZDtcbn1cbmZ1bmN0aW9uIHJ1bkNvbGxlY3RlZEVmZmVjdChpbnN0cnVjdGlvbiwgdHlwZSkge1xuICAgIC8vIGRlbGVnYSBwYXJhIHJlYWN0aXZlIC0gc2VtIFZET01cbiAgICBjcmVhdGVSZWFjdGl2ZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsZWFudXAgPSBpbnN0cnVjdGlvbi5lZmZlY3QoKTtcbiAgICAgICAgcmV0dXJuIGNsZWFudXA7XG4gICAgfSwgdHlwZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXBwbHlIeWRyYXRpb25JbnN0cnVjdGlvbnMocm9vdCwgaW5zdHJ1Y3Rpb25zKSB7XG4gICAgY29uc3Qgb3JkZXJlZCA9IGdyb3VwSHlkcmF0aW9uSW5zdHJ1Y3Rpb25zKGluc3RydWN0aW9ucyk7XG4gICAgb3JkZXJlZC5ldmVudHMuZm9yRWFjaCgoaW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGZpbmRIeWRyYXRpb25FbGVtZW50KHJvb3QsIGluc3RydWN0aW9uLmlkKTtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICB3YXJuSHlkcmF0aW9uSW5zdHJ1Y3Rpb25NaXNzaW5nKHJvb3QsIGluc3RydWN0aW9uLmtpbmQsIGluc3RydWN0aW9uLmlkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkZWJ1Z0h5ZHJhdGlvbkxvZyhcIltoeWRyYXRlOmV2ZW50OmJpbmRdXCIsIGluc3RydWN0aW9uLmlkLCBpbnN0cnVjdGlvbi5ldmVudCwgZWxlbWVudC50YWdOYW1lKTtcbiAgICAgICAgYmluZERlbGVnYXRlZEV2ZW50KGVsZW1lbnQsIGluc3RydWN0aW9uLmV2ZW50LCB3cmFwSHlkcmF0aW9uRXZlbnRIYW5kbGVyKGluc3RydWN0aW9uLmlkLCBpbnN0cnVjdGlvbi5ldmVudCwgaW5zdHJ1Y3Rpb24uaGFuZGxlcikpO1xuICAgIH0pO1xuICAgIG9yZGVyZWQucmVmcy5mb3JFYWNoKChpbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZmluZEh5ZHJhdGlvbkVsZW1lbnQocm9vdCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHdhcm5IeWRyYXRpb25JbnN0cnVjdGlvbk1pc3Npbmcocm9vdCwgaW5zdHJ1Y3Rpb24ua2luZCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJpbmRSZWYoaW5zdHJ1Y3Rpb24ucmVmLCBlbGVtZW50KTtcbiAgICB9KTtcbiAgICBvcmRlcmVkLnJlYWN0aXZlUmFuZ2VzLmZvckVhY2goKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcmtlcnMgPSBmaW5kUmVhY3RpdmVNYXJrZXJzKHJvb3QsIGluc3RydWN0aW9uLmlkKTtcbiAgICAgICAgaHlkcmF0ZVJlYWN0aXZlUmFuZ2VXaXRoTWFya2VycyhtYXJrZXJzLnN0YXJ0LCBtYXJrZXJzLmVuZCwgaW5zdHJ1Y3Rpb24pO1xuICAgIH0pO1xuICAgIG9yZGVyZWQucmVhY3RpdmVTdHJ1Y3RzLmZvckVhY2goKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcmtlcnMgPSBmaW5kUmVhY3RpdmVTdHJ1Y3RNYXJrZXJzKHJvb3QsIGluc3RydWN0aW9uLmlkKTtcbiAgICAgICAgaHlkcmF0ZVJlYWN0aXZlU3RydWN0V2l0aE1hcmtlcnMobWFya2Vycy5zdGFydCwgbWFya2Vycy5lbmQsIGluc3RydWN0aW9uKTtcbiAgICB9KTtcbiAgICBvcmRlcmVkLnJlYWN0aXZlTGlzdHMuZm9yRWFjaCgoaW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgbWFya2VycyA9IGZpbmRSZWFjdGl2ZUxpc3RNYXJrZXJzKHJvb3QsIGluc3RydWN0aW9uLmlkKTtcbiAgICAgICAgaHlkcmF0ZVJlYWN0aXZlTGlzdFdpdGhNYXJrZXJzKG1hcmtlcnMuc3RhcnQsIG1hcmtlcnMuZW5kLCBpbnN0cnVjdGlvbik7XG4gICAgfSk7XG4gICAgb3JkZXJlZC5yZWFjdGl2ZUFzeW5jcy5mb3JFYWNoKChpbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBtYXJrZXJzID0gZmluZFJlYWN0aXZlQXN5bmNNYXJrZXJzKHJvb3QsIGluc3RydWN0aW9uLmlkKTtcbiAgICAgICAgaHlkcmF0ZVJlYWN0aXZlQXN5bmNXaXRoTWFya2VycyhtYXJrZXJzLnN0YXJ0LCBtYXJrZXJzLmVuZCwgaW5zdHJ1Y3Rpb24pO1xuICAgIH0pO1xuICAgIG9yZGVyZWQuZHluYW1pY1Byb3BzLmZvckVhY2goKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBmaW5kSHlkcmF0aW9uRWxlbWVudChyb290LCBpbnN0cnVjdGlvbi5pZCk7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgd2Fybkh5ZHJhdGlvbkluc3RydWN0aW9uTWlzc2luZyhyb290LCBpbnN0cnVjdGlvbi5raW5kLCBpbnN0cnVjdGlvbi5pZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaHlkcmF0ZUR5bmFtaWNQcm9wKGVsZW1lbnQsIGluc3RydWN0aW9uKTtcbiAgICB9KTtcbiAgICBvcmRlcmVkLmxheW91dEVmZmVjdHMuZm9yRWFjaCgoaW5zdHJ1Y3Rpb24pID0+IHsgcnVuQ29sbGVjdGVkRWZmZWN0KGluc3RydWN0aW9uLCBcImxheW91dFwiKTsgfSk7XG4gICAgb3JkZXJlZC5lZmZlY3RzLmZvckVhY2goKGluc3RydWN0aW9uKSA9PiB7IHJ1bkNvbGxlY3RlZEVmZmVjdChpbnN0cnVjdGlvbiwgXCJlZmZlY3RcIik7IH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5SHlkcmF0aW9uSW5zdHJ1Y3Rpb25zQmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgaW5zdHJ1Y3Rpb25zKSB7XG4gICAgY29uc3Qgb3JkZXJlZCA9IGdyb3VwSHlkcmF0aW9uSW5zdHJ1Y3Rpb25zKGluc3RydWN0aW9ucyk7XG4gICAgb3JkZXJlZC5ldmVudHMuZm9yRWFjaCgoaW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGZpbmRIeWRyYXRpb25FbGVtZW50QmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHdhcm5IeWRyYXRpb25JbnN0cnVjdGlvbk1pc3Npbmcoc3RhcnQucGFyZW50Tm9kZSwgaW5zdHJ1Y3Rpb24ua2luZCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJpbmREZWxlZ2F0ZWRFdmVudChlbGVtZW50LCBpbnN0cnVjdGlvbi5ldmVudCwgd3JhcEh5ZHJhdGlvbkV2ZW50SGFuZGxlcihpbnN0cnVjdGlvbi5pZCwgaW5zdHJ1Y3Rpb24uZXZlbnQsIGluc3RydWN0aW9uLmhhbmRsZXIpKTtcbiAgICB9KTtcbiAgICBvcmRlcmVkLnJlZnMuZm9yRWFjaCgoaW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGZpbmRIeWRyYXRpb25FbGVtZW50QmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHdhcm5IeWRyYXRpb25JbnN0cnVjdGlvbk1pc3Npbmcoc3RhcnQucGFyZW50Tm9kZSwgaW5zdHJ1Y3Rpb24ua2luZCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJpbmRSZWYoaW5zdHJ1Y3Rpb24ucmVmLCBlbGVtZW50KTtcbiAgICB9KTtcbiAgICBvcmRlcmVkLnJlYWN0aXZlUmFuZ2VzLmZvckVhY2goKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcmtlcnMgPSBmaW5kUmVhY3RpdmVNYXJrZXJzQmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICBoeWRyYXRlUmVhY3RpdmVSYW5nZVdpdGhNYXJrZXJzKG1hcmtlcnMuc3RhcnQsIG1hcmtlcnMuZW5kLCBpbnN0cnVjdGlvbik7XG4gICAgfSk7XG4gICAgb3JkZXJlZC5yZWFjdGl2ZVN0cnVjdHMuZm9yRWFjaCgoaW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgbWFya2VycyA9IGZpbmRSZWFjdGl2ZVN0cnVjdE1hcmtlcnNCZXR3ZWVuTWFya2VycyhzdGFydCwgZW5kLCBpbnN0cnVjdGlvbi5pZCk7XG4gICAgICAgIGh5ZHJhdGVSZWFjdGl2ZVN0cnVjdFdpdGhNYXJrZXJzKG1hcmtlcnMuc3RhcnQsIG1hcmtlcnMuZW5kLCBpbnN0cnVjdGlvbik7XG4gICAgfSk7XG4gICAgb3JkZXJlZC5yZWFjdGl2ZUxpc3RzLmZvckVhY2goKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IG1hcmtlcnMgPSBmaW5kUmVhY3RpdmVMaXN0TWFya2Vyc0JldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQsIGluc3RydWN0aW9uLmlkKTtcbiAgICAgICAgaHlkcmF0ZVJlYWN0aXZlTGlzdFdpdGhNYXJrZXJzKG1hcmtlcnMuc3RhcnQsIG1hcmtlcnMuZW5kLCBpbnN0cnVjdGlvbik7XG4gICAgfSk7XG4gICAgb3JkZXJlZC5yZWFjdGl2ZUFzeW5jcy5mb3JFYWNoKChpbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBtYXJrZXJzID0gZmluZFJlYWN0aXZlQXN5bmNNYXJrZXJzQmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICBoeWRyYXRlUmVhY3RpdmVBc3luY1dpdGhNYXJrZXJzKG1hcmtlcnMuc3RhcnQsIG1hcmtlcnMuZW5kLCBpbnN0cnVjdGlvbik7XG4gICAgfSk7XG4gICAgb3JkZXJlZC5keW5hbWljUHJvcHMuZm9yRWFjaCgoaW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGZpbmRIeWRyYXRpb25FbGVtZW50QmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHdhcm5IeWRyYXRpb25JbnN0cnVjdGlvbk1pc3Npbmcoc3RhcnQucGFyZW50Tm9kZSwgaW5zdHJ1Y3Rpb24ua2luZCwgaW5zdHJ1Y3Rpb24uaWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGh5ZHJhdGVEeW5hbWljUHJvcChlbGVtZW50LCBpbnN0cnVjdGlvbik7XG4gICAgfSk7XG4gICAgb3JkZXJlZC5sYXlvdXRFZmZlY3RzLmZvckVhY2goKGluc3RydWN0aW9uKSA9PiB7IHJ1bkNvbGxlY3RlZEVmZmVjdChpbnN0cnVjdGlvbiwgXCJsYXlvdXRcIik7IH0pO1xuICAgIG9yZGVyZWQuZWZmZWN0cy5mb3JFYWNoKChpbnN0cnVjdGlvbikgPT4geyBydW5Db2xsZWN0ZWRFZmZlY3QoaW5zdHJ1Y3Rpb24sIFwiZWZmZWN0XCIpOyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluc3RydWN0aW9ucy5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKi9cbmltcG9ydCB7IGNvbGxlY3RTaWJsaW5nTm9kZXNCZXR3ZWVuLCBmaW5kTWF0Y2hpbmdNYXJrZXJFbmQsIGlzQWRhcHRpdmVCb3VuZGFyeUNvbW1lbnQsIGlzQ2xpZW50Qm91bmRhcnlTdGFydENvbW1lbnQsIGlzU2FmZVRvUmVtb3ZlQWRhcHRpdmVDb21tZW50IH0gZnJvbSBcIi4vbWFya2Vycy5qc1wiO1xuaW1wb3J0IHsgQ0xJRU5UX0JPVU5EQVJZX0VORCwgQ0xJRU5UX0JPVU5EQVJZX1NUQVJUX1BSRUZJWCB9IGZyb20gXCJAYWRhcHRpdmUtanMvc2hhcmVkXCI7XG5leHBvcnQgZnVuY3Rpb24gY2xlYW51cEFkYXB0aXZlTWFya2Vyc0FmdGVyU3VjY2Vzcyhyb290KSB7XG4gICAgY2xlYW51cEFkYXB0aXZlTWFya2Vyc0luTm9kZShyb290LCB7IGJvdW5kYXJ5Um9vdDogcm9vdCB9KTtcbn1cbmZ1bmN0aW9uIGNsZWFudXBBZGFwdGl2ZU1hcmtlcnNJbk5vZGUocm9vdCwgb3B0cykge1xuICAgIGxldCBjdXJyZW50ID0gcm9vdC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgICAgICBpZiAoaXNDbGllbnRCb3VuZGFyeVN0YXJ0Q29tbWVudChjdXJyZW50KSkge1xuICAgICAgICAgICAgY29uc3QgZW5kID0gZmluZE1hdGNoaW5nTWFya2VyRW5kKHJvb3QsIGN1cnJlbnQsIENMSUVOVF9CT1VOREFSWV9TVEFSVF9QUkVGSVgsIENMSUVOVF9CT1VOREFSWV9FTkQpO1xuICAgICAgICAgICAgY3VycmVudCA9IGVuZCA/IGVuZC5uZXh0U2libGluZyA6IG5leHQ7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUgJiYgaXNTYWZlVG9SZW1vdmVBZGFwdGl2ZUNvbW1lbnQoY3VycmVudCkpIHtcbiAgICAgICAgICAgIGN1cnJlbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgfHwgY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICBjbGVhbnVwQWRhcHRpdmVNYXJrZXJzSW5Ob2RlKGN1cnJlbnQsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbnVwQWRhcHRpdmVNYXJrZXJzQWZ0ZXJTdWNjZXNzQmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IHJldGFpbmVkID0gY29sbGVjdFNpYmxpbmdOb2Rlc0JldHdlZW4oc3RhcnQsIGVuZCkuZmlsdGVyKChuKSA9PiBuLm5vZGVUeXBlICE9PSBOb2RlLkNPTU1FTlRfTk9ERSk7XG4gICAgcmV0YWluZWQuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICBjbGVhbnVwQWRhcHRpdmVNYXJrZXJzSW5Ob2RlKG5vZGUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbGV0IGN1cnJlbnQgPSBzdGFydC5uZXh0U2libGluZztcbiAgICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBlbmQpIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IGN1cnJlbnQubmV4dFNpYmxpbmc7XG4gICAgICAgIGlmIChpc0NsaWVudEJvdW5kYXJ5U3RhcnRDb21tZW50KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZGFyeUVuZCA9IGZpbmRNYXRjaGluZ01hcmtlckVuZChzdGFydC5wYXJlbnROb2RlLCBjdXJyZW50LCBDTElFTlRfQk9VTkRBUllfU1RBUlRfUFJFRklYLCBDTElFTlRfQk9VTkRBUllfRU5EKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBib3VuZGFyeUVuZCA/IGJvdW5kYXJ5RW5kLm5leHRTaWJsaW5nIDogbmV4dDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1NhZmVUb1JlbW92ZUFkYXB0aXZlQ29tbWVudChjdXJyZW50KSlcbiAgICAgICAgICAgIGN1cnJlbnQucmVtb3ZlKCk7XG4gICAgICAgIGN1cnJlbnQgPSBuZXh0O1xuICAgIH1cbiAgICBpZiAoaXNBZGFwdGl2ZUJvdW5kYXJ5Q29tbWVudChzdGFydCkpXG4gICAgICAgIHN0YXJ0LnJlbW92ZSgpO1xuICAgIGlmIChpc0FkYXB0aXZlQm91bmRhcnlDb21tZW50KGVuZCkpXG4gICAgICAgIGVuZC5yZW1vdmUoKTtcbiAgICByZXR1cm4gcmV0YWluZWQuZmlsdGVyKChuKSA9PiBuLmlzQ29ubmVjdGVkKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1Z0h5ZHJhdGlvbk1hcmtlcnMocm9vdCkge1xuICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIocm9vdCwgTm9kZUZpbHRlci5TSE9XX0NPTU1FTlQpO1xuICAgIGxldCBub2RlO1xuICAgIHdoaWxlICgobm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpKSkge1xuICAgICAgICBjb25zdCBkYXRhID0gbm9kZS5kYXRhLnRyaW0oKTtcbiAgICAgICAgaWYgKGRhdGEuc3RhcnRzV2l0aChcImFkYXB0aXZlLVwiKSB8fCBkYXRhLnN0YXJ0c1dpdGgoXCJhZGFwdGl2ZTpcIikpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltIWURSQVRJT04gTUFSS0VSXVwiLCBkYXRhKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGVhbnVwLmpzLm1hcCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqIERlc2NvYmVydGEgZGUgYm91bmRhcmllcyBubyBET00gLSBUcmVlV2Fsa2VyIHNlbSBWRE9NXG4gKi9cbmltcG9ydCB7IGZpbmRNYXRjaGluZ01hcmtlckVuZCB9IGZyb20gXCIuLi9oeWRyYXRlL21hcmtlcnMuanNcIjtcbmltcG9ydCB7IENMSUVOVF9CT1VOREFSWV9FTkQsIENMSUVOVF9CT1VOREFSWV9TVEFSVF9QUkVGSVgsIEhZRFJBVElPTl9CT1VOREFSWV9JRF9BVFRSLCBIWURSQVRJT05fTUFOSUZFU1RfQVRUUiB9IGZyb20gXCJAYWRhcHRpdmUtanMvc2hhcmVkXCI7XG5leHBvcnQgZnVuY3Rpb24gZmluZENvbW1lbnRCb3VuZGFyaWVzKG1vZHVsZUlkKSB7XG4gICAgY29uc3QgYm91bmRhcmllcyA9IFtdO1xuICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZG9jdW1lbnQsIE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UKTtcbiAgICBjb25zdCBzdGFjayA9IFtdO1xuICAgIGxldCBjdXJyZW50ID0gd2Fsa2VyLm5leHROb2RlKCk7XG4gICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudCA9IGN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb21tZW50LmRhdGEgPz8gXCJcIjtcbiAgICAgICAgaWYgKGNvbnRlbnQuc3RhcnRzV2l0aChDTElFTlRfQk9VTkRBUllfU1RBUlRfUFJFRklYKSkge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGRlY29kZUNvbW1lbnRQYXlsb2FkKGNvbnRlbnQuc2xpY2UoQ0xJRU5UX0JPVU5EQVJZX1NUQVJUX1BSRUZJWC5sZW5ndGgpKTtcbiAgICAgICAgICAgIGlmIChwYXlsb2FkKVxuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goeyBzdGFydDogY29tbWVudCwgbW9kZTogcGF5bG9hZC5tb2RlLCBtb2R1bGVJZDogcGF5bG9hZC5tb2R1bGVJZCwgZXhwb3J0TmFtZTogcGF5bG9hZC5leHBvcnROYW1lLCByYXdQcm9wczogcGF5bG9hZC5yYXdQcm9wcywgaGFzQ2hpbGRyZW46IHBheWxvYWQuaGFzQ2hpbGRyZW4sIGJvdW5kYXJ5SWQ6IHBheWxvYWQuYm91bmRhcnlJZCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb250ZW50ID09PSBDTElFTlRfQk9VTkRBUllfRU5EKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZGFyeSA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGJvdW5kYXJ5ICYmIGJvdW5kYXJ5Lm1vZHVsZUlkID09PSBtb2R1bGVJZClcbiAgICAgICAgICAgICAgICBib3VuZGFyaWVzLnB1c2goeyAuLi5ib3VuZGFyeSwgZW5kOiBjb21tZW50IH0pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSB3YWxrZXIubmV4dE5vZGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIGJvdW5kYXJpZXM7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlQ29tbWVudFBheWxvYWQocmF3KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KHJhdykpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZWFkSHlkcmF0aW9uTWFuaWZlc3RGcm9tUm9vdChyb290LCBib3VuZGFyeUlkID0gXCJcIikge1xuICAgIGxldCBjdXJyZW50ID0gcm9vdC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICAgIGlmIChjdXJyZW50Lm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERSAmJiBjdXJyZW50LmRhdGEuc3RhcnRzV2l0aChDTElFTlRfQk9VTkRBUllfU1RBUlRfUFJFRklYKSkge1xuICAgICAgICAgICAgY3VycmVudCA9IHNraXBOZXN0ZWRCb3VuZGFyeShjdXJyZW50LCByb290LCByb290KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50Lm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBjdXJyZW50LnRhZ05hbWUgPT09IFwiU0NSSVBUXCIgJiYgY3VycmVudC5oYXNBdHRyaWJ1dGUoSFlEUkFUSU9OX01BTklGRVNUX0FUVFIpKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBjdXJyZW50O1xuICAgICAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gc2NyaXB0LmdldEF0dHJpYnV0ZShIWURSQVRJT05fQk9VTkRBUllfSURfQVRUUikgPz8gXCJcIjtcbiAgICAgICAgICAgIGlmICghYm91bmRhcnlJZCB8fCBjYW5kaWRhdGUgPT09IGJvdW5kYXJ5SWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYW5pZmVzdCA9IHBhcnNlSHlkcmF0aW9uTWFuaWZlc3Qoc2NyaXB0LnRleHRDb250ZW50ID8/IFwiXCIpO1xuICAgICAgICAgICAgICAgIGlmIChtYW5pZmVzdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc2NyaXB0LCBtYW5pZmVzdCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWFkSHlkcmF0aW9uTWFuaWZlc3RCZXR3ZWVuTWFya2VycyhzdGFydCwgZW5kLCBib3VuZGFyeUlkID0gXCJcIikge1xuICAgIGxldCBjdXJyZW50ID0gc3RhcnQubmV4dFNpYmxpbmc7XG4gICAgY29uc3QgcGFyZW50ID0gc3RhcnQucGFyZW50Tm9kZTtcbiAgICB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBlbmQpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFICYmIGN1cnJlbnQuZGF0YS5zdGFydHNXaXRoKENMSUVOVF9CT1VOREFSWV9TVEFSVF9QUkVGSVgpKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gc2tpcE5lc3RlZEJvdW5kYXJ5KGN1cnJlbnQsIHBhcmVudCwgZW5kKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50Lm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBjdXJyZW50LnRhZ05hbWUgPT09IFwiU0NSSVBUXCIgJiYgY3VycmVudC5oYXNBdHRyaWJ1dGUoSFlEUkFUSU9OX01BTklGRVNUX0FUVFIpKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBjdXJyZW50O1xuICAgICAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gc2NyaXB0LmdldEF0dHJpYnV0ZShIWURSQVRJT05fQk9VTkRBUllfSURfQVRUUikgPz8gXCJcIjtcbiAgICAgICAgICAgIGlmICghYm91bmRhcnlJZCB8fCBjYW5kaWRhdGUgPT09IGJvdW5kYXJ5SWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYW5pZmVzdCA9IHBhcnNlSHlkcmF0aW9uTWFuaWZlc3Qoc2NyaXB0LnRleHRDb250ZW50ID8/IFwiXCIpO1xuICAgICAgICAgICAgICAgIGlmIChtYW5pZmVzdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc2NyaXB0LCBtYW5pZmVzdCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUh5ZHJhdGlvbk1hbmlmZXN0KHJhdykge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJhdyk7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHNraXBOZXN0ZWRCb3VuZGFyeShjdXJyZW50LCBwYXJlbnQsIGVuZCkge1xuICAgIGNvbnN0IGJvdW5kYXJ5RW5kID0gZmluZE1hdGNoaW5nTWFya2VyRW5kKHBhcmVudCwgY3VycmVudCwgQ0xJRU5UX0JPVU5EQVJZX1NUQVJUX1BSRUZJWCwgQ0xJRU5UX0JPVU5EQVJZX0VORCk7XG4gICAgcmV0dXJuIGJvdW5kYXJ5RW5kID8gYm91bmRhcnlFbmQubmV4dFNpYmxpbmcgOiBlbmQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXNjb3ZlcnkuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogQ29sZXRhIGRlIGJpbmRpbmdzIHJlYXRpdm9zIC0gc2VtIFZET00sIHZhcnJlIFZOb2RlIGVmw6ptZXJvXG4gKi9cbmltcG9ydCB7IENPTlRFWFRfUFJPVklERVJfVEFHLCBnZXRDbGllbnRDb21wb25lbnRNZXRhZGF0YSwgaXNDbGllbnRCb3VuZGFyeVRhZywgaXNIeWRyYXRlU2xvdFRhZywgaXNTdXBwb3J0ZWREeW5hbWljSHlkcmF0aW9uUHJvcE5hbWUgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3NoYXJlZFwiO1xuaW1wb3J0IHsgcnVuSHlkcmF0aW9uQ29sbGVjdGlvbiwgcnVuV2l0aENvbnRleHQsIHVudHJhY2sgfSBmcm9tIFwiLi4vLi4vcmVhY3RpdmUvaW5kZXguanNcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL2NvcmVcIjtcbmZ1bmN0aW9uIGRlc2NyaWJlQ29tcG9uZW50KHN0YXRlLCB0YWcpIHtcbiAgICBjb25zdCBuYW1lID0gdHlwZW9mIHRhZyA9PT0gXCJmdW5jdGlvblwiID8gKHRhZy5uYW1lIHx8IFwiYW5vblwiKSA6IFN0cmluZyh0YWcpO1xuICAgIHJldHVybiBzdGF0ZS5jdXJyZW50TW9kdWxlSWQgPyBgJHtzdGF0ZS5jdXJyZW50TW9kdWxlSWR9OiR7bmFtZX1gIDogbmFtZTtcbn1cbmZ1bmN0aW9uIGRlc2NyaWJlQmluZGluZ09yaWdpbihzdGF0ZSwgcHJvcEtleSkge1xuICAgIGNvbnN0IGNoYWluID0gc3RhdGUuY29tcG9uZW50UGF0aC5sZW5ndGggPiAwID8gc3RhdGUuY29tcG9uZW50UGF0aC5qb2luKFwiID4gXCIpIDogXCIocmFpeiBkbyBib3VuZGFyeSlcIjtcbiAgICByZXR1cm4gcHJvcEtleSA/IGAke2NoYWlufSA6OiAke3Byb3BLZXl9YCA6IGNoYWluO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUNvbXBvbmVudFByb3BzKG5vZGUpIHtcbiAgICBjb25zdCBwcm9wcyA9IHsgLi4uKG5vZGUucHJvcHMgPz8ge30pIH07XG4gICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuID8/IG5vZGUucHJvcHM/LmNoaWxkcmVuO1xuICAgIGlmIChjaGlsZHJlbiAhPSBudWxsKVxuICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHJldHVybiBwcm9wcztcbn1cbmZ1bmN0aW9uIHJlc29sdmVJbnN0cnVjdGlvbktleShraW5kLCBpbmRleCkge1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICBjYXNlIFwiZXZlbnRcIjogcmV0dXJuIGBlJHtpbmRleH1gO1xuICAgICAgICBjYXNlIFwicmVmXCI6IHJldHVybiBgZiR7aW5kZXh9YDtcbiAgICAgICAgY2FzZSBcInJlYWN0aXZlXCI6IHJldHVybiBgcngke2luZGV4fWA7XG4gICAgICAgIGNhc2UgXCJkeW5hbWljUHJvcFwiOiByZXR1cm4gYHAke2luZGV4fWA7XG4gICAgfVxufVxuZnVuY3Rpb24gbmV4dEluc3RydWN0aW9uS2V5KHN0YXRlLCBraW5kKSB7XG4gICAgY29uc3QgdiA9IHN0YXRlLmNvdW50ZXJzW2tpbmRdO1xuICAgIHN0YXRlLmNvdW50ZXJzW2tpbmRdICs9IDE7XG4gICAgcmV0dXJuIHJlc29sdmVJbnN0cnVjdGlvbktleShraW5kLCB2KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0SHlkcmF0aW9uQmluZGluZ3MoQ29tcG9uZW50LCBwcm9wcywgbW9kdWxlSWQpIHtcbiAgICBpZiAodHlwZW9mIENvbXBvbmVudCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiB7IGV2ZW50czogbmV3IE1hcCgpLCByZWZzOiBuZXcgTWFwKCksIHJlYWN0aXZlOiBuZXcgTWFwKCksIGR5bmFtaWNQcm9wczogbmV3IE1hcCgpLCBsYXlvdXRFZmZlY3RzOiBbXSwgZWZmZWN0czogW10sIHVuc3VwcG9ydGVkRmVhdHVyZXM6IFtdLCBwYXRoczogbmV3IE1hcCgpIH07XG4gICAgfVxuICAgIGNvbnN0IGNvbGxlY3RlZCA9IHJ1bkh5ZHJhdGlvbkNvbGxlY3Rpb24oKCkgPT4ge1xuICAgICAgICBjb25zdCBiaW5kaW5ncyA9IHtcbiAgICAgICAgICAgIGV2ZW50czogbmV3IE1hcCgpLFxuICAgICAgICAgICAgcmVmczogbmV3IE1hcCgpLFxuICAgICAgICAgICAgcmVhY3RpdmU6IG5ldyBNYXAoKSxcbiAgICAgICAgICAgIGR5bmFtaWNQcm9wczogbmV3IE1hcCgpLFxuICAgICAgICAgICAgY291bnRlcnM6IHsgZXZlbnQ6IDAsIHJlZjogMCwgcmVhY3RpdmU6IDAsIGR5bmFtaWNQcm9wOiAwIH0sXG4gICAgICAgICAgICB1bnN1cHBvcnRlZEZlYXR1cmVzOiBuZXcgU2V0KCksXG4gICAgICAgICAgICBwYXRoczogbmV3IE1hcCgpLFxuICAgICAgICAgICAgY29tcG9uZW50UGF0aDogW10sXG4gICAgICAgICAgICBjdXJyZW50TW9kdWxlSWQ6IG1vZHVsZUlkLFxuICAgICAgICB9O1xuICAgICAgICBjb2xsZWN0RnJvbU5vZGUoY3JlYXRlRWxlbWVudChDb21wb25lbnQsIHByb3BzID8/IHt9KSwgYmluZGluZ3MpO1xuICAgICAgICByZXR1cm4geyAuLi5iaW5kaW5ncywgdW5zdXBwb3J0ZWRGZWF0dXJlczogQXJyYXkuZnJvbShiaW5kaW5ncy51bnN1cHBvcnRlZEZlYXR1cmVzKSB9O1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGV2ZW50czogY29sbGVjdGVkLnZhbHVlLmV2ZW50cyxcbiAgICAgICAgcmVmczogY29sbGVjdGVkLnZhbHVlLnJlZnMsXG4gICAgICAgIHJlYWN0aXZlOiBjb2xsZWN0ZWQudmFsdWUucmVhY3RpdmUsXG4gICAgICAgIGR5bmFtaWNQcm9wczogY29sbGVjdGVkLnZhbHVlLmR5bmFtaWNQcm9wcyxcbiAgICAgICAgbGF5b3V0RWZmZWN0czogY29sbGVjdGVkLmVmZmVjdEluc3RydWN0aW9ucy5maWx0ZXIoKGkpID0+IGkua2luZCA9PT0gXCJsYXlvdXQtZWZmZWN0XCIpLm1hcCgoaSkgPT4gKHsgZWZmZWN0OiBpLmVmZmVjdCwgZGVwczogaS5kZXBzLCBpZ25vcmVkU291cmNlczogaS5pZ25vcmVkU291cmNlcyB9KSksXG4gICAgICAgIGVmZmVjdHM6IGNvbGxlY3RlZC5lZmZlY3RJbnN0cnVjdGlvbnMuZmlsdGVyKChpKSA9PiBpLmtpbmQgPT09IFwiZWZmZWN0XCIpLm1hcCgoaSkgPT4gKHsgZWZmZWN0OiBpLmVmZmVjdCwgZGVwczogaS5kZXBzLCBpZ25vcmVkU291cmNlczogaS5pZ25vcmVkU291cmNlcyB9KSksXG4gICAgICAgIHVuc3VwcG9ydGVkRmVhdHVyZXM6IEFycmF5LmZyb20obmV3IFNldChbLi4uY29sbGVjdGVkLnVuc3VwcG9ydGVkRmVhdHVyZXMsIC4uLmNvbGxlY3RlZC52YWx1ZS51bnN1cHBvcnRlZEZlYXR1cmVzXSkpLFxuICAgICAgICBwYXRoczogY29sbGVjdGVkLnZhbHVlLnBhdGhzXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNvbGxlY3RGcm9tTm9kZShub2RlLCBzdGF0ZSkge1xuICAgIGlmIChub2RlID09IG51bGwgfHwgbm9kZSA9PT0gZmFsc2UgfHwgdHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIG5vZGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIG5vZGUgPT09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHR5cGVvZiBub2RlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gbmV4dEluc3RydWN0aW9uS2V5KHN0YXRlLCBcInJlYWN0aXZlXCIpO1xuICAgICAgICBzdGF0ZS5yZWFjdGl2ZS5zZXQoa2V5LCBub2RlKTtcbiAgICAgICAgc3RhdGUucGF0aHMuc2V0KGtleSwgZGVzY3JpYmVCaW5kaW5nT3JpZ2luKHN0YXRlKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIG5vZGUpXG4gICAgICAgICAgICBjb2xsZWN0RnJvbU5vZGUoYywgc3RhdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChub2RlLnRhZyA9PT0gQ09OVEVYVF9QUk9WSURFUl9UQUcpIHtcbiAgICAgICAgcnVuV2l0aENvbnRleHQobm9kZS5wcm9wcy5jb250ZXh0LmlkLCBub2RlLnByb3BzLnZhbHVlLCAoKSA9PiB7IGNvbGxlY3RGcm9tTm9kZShub2RlLmNoaWxkcmVuID8/IFtdLCBzdGF0ZSk7IH0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9kZS50YWcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb25zdCBtZXRhID0gZ2V0Q2xpZW50Q29tcG9uZW50TWV0YWRhdGEobm9kZS50YWcpO1xuICAgICAgICAvLyBEaXJldGl2YSBhbmluaGFkYSAoaHlkcmF0ZSBvdSBjbGllbnQpID0gYm91bmRhcnkvZXNjb3BvIHByw7NwcmlvOiBvIHNlcnZlciBlbWl0ZSB1bVxuICAgICAgICAvLyBtYW5pZmVzdCBzZXBhcmFkbyBlIG8gZmlsaG8gaGlkcmF0YSBzb3ppbmhvLiBBIHJhaXogdGFtYsOpbSB0ZW0gbWV0YSwgbWFzIG7Do28gcG9kZSBzZXIgcHVsYWRhLlxuICAgICAgICBpZiAobWV0YSAmJiBzdGF0ZS5jb21wb25lbnRQYXRoLmxlbmd0aCA+IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHN0YXRlLmNvbXBvbmVudFBhdGgucHVzaChkZXNjcmliZUNvbXBvbmVudChzdGF0ZSwgbm9kZS50YWcpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbGxlY3RGcm9tTm9kZSh1bnRyYWNrKCgpID0+IG5vZGUudGFnKHJlc29sdmVDb21wb25lbnRQcm9wcyhub2RlKSkpLCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzdGF0ZS5jb21wb25lbnRQYXRoLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUudGFnID09PSBcIkZyYWdtZW50XCIgfHwgdHlwZW9mIG5vZGUudGFnID09PSBcInN5bWJvbFwiKSB7XG4gICAgICAgIGNvbGxlY3RGcm9tTm9kZShub2RlLmNoaWxkcmVuID8/IFtdLCBzdGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzSHlkcmF0ZVNsb3RUYWcobm9kZS50YWcpIHx8IGlzQ2xpZW50Qm91bmRhcnlUYWcobm9kZS50YWcpKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgcHJvcHMgPSBub2RlLnByb3BzID8/IHt9O1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHByb3BzKSkge1xuICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoXCJvblwiKSAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc3QgayA9IG5leHRJbnN0cnVjdGlvbktleShzdGF0ZSwgXCJldmVudFwiKTtcbiAgICAgICAgICAgIHN0YXRlLmV2ZW50cy5zZXQoaywgeyBldmVudDoga2V5LnNsaWNlKDIpLnRvTG93ZXJDYXNlKCksIGhhbmRsZXI6IHZhbHVlIH0pO1xuICAgICAgICAgICAgc3RhdGUucGF0aHMuc2V0KGssIGRlc2NyaWJlQmluZGluZ09yaWdpbihzdGF0ZSwga2V5KSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ID09PSBcInJlZlwiICYmIHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGsgPSBuZXh0SW5zdHJ1Y3Rpb25LZXkoc3RhdGUsIFwicmVmXCIpO1xuICAgICAgICAgICAgc3RhdGUucmVmcy5zZXQoaywgdmFsdWUpO1xuICAgICAgICAgICAgc3RhdGUucGF0aHMuc2V0KGssIGRlc2NyaWJlQmluZGluZ09yaWdpbihzdGF0ZSkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSAhPT0gXCJjaGlsZHJlblwiICYmIGtleSAhPT0gXCJyZWZcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiAmJiBpc1N1cHBvcnRlZER5bmFtaWNIeWRyYXRpb25Qcm9wTmFtZShrZXkpKSB7XG4gICAgICAgICAgICBjb25zdCBrID0gbmV4dEluc3RydWN0aW9uS2V5KHN0YXRlLCBcImR5bmFtaWNQcm9wXCIpO1xuICAgICAgICAgICAgc3RhdGUuZHluYW1pY1Byb3BzLnNldChrLCB7IHByb3A6IGtleSwgZ2V0dGVyOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHN0YXRlLnBhdGhzLnNldChrLCBkZXNjcmliZUJpbmRpbmdPcmlnaW4oc3RhdGUsIGtleSkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFrZXkuc3RhcnRzV2l0aChcIm9uXCIpICYmIGtleSAhPT0gXCJjaGlsZHJlblwiICYmIGtleSAhPT0gXCJyZWZcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiAmJiAhaXNTdXBwb3J0ZWREeW5hbWljSHlkcmF0aW9uUHJvcE5hbWUoa2V5KSkge1xuICAgICAgICAgICAgc3RhdGUudW5zdXBwb3J0ZWRGZWF0dXJlcy5hZGQoYGR5bmFtaWMtcHJvcDoke2tleX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb2xsZWN0RnJvbU5vZGUobm9kZS5jaGlsZHJlbiA/PyBbXSwgc3RhdGUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlc2NyaWJlQ29sbGVjdGVkT3JpZ2luKGNvbGxlY3RlZCwga2V5KSB7XG4gICAgY29uc3QgcGF0aHMgPSBjb2xsZWN0ZWQ/LnBhdGhzO1xuICAgIHJldHVybiBwYXRocyBpbnN0YW5jZW9mIE1hcCA/IHBhdGhzLmdldChrZXkpIDogdW5kZWZpbmVkO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29sbGVjdC5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKiBMaWdhIG1hbmlmZXN0IFNTUiBjb20gYmluZGluZ3MgY29sZXRhZG9zIG5vIGNsaWVudFxuICovXG5pbXBvcnQgeyBkZXNjcmliZUNvbGxlY3RlZE9yaWdpbiB9IGZyb20gXCIuL2NvbGxlY3QuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kSHlkcmF0aW9uTWFuaWZlc3QobWFuaWZlc3QsIGNvbGxlY3RlZCkge1xuICAgIGNvbnN0IG9yaWdpbiA9IChrZXkpID0+IGRlc2NyaWJlQ29sbGVjdGVkT3JpZ2luKGNvbGxlY3RlZCwga2V5KTtcbiAgICBjb25zdCB3aXRoT3JpZ2luID0gKGZlYXR1cmUsIGtleXMpID0+IGtleXMubGVuZ3RoID4gMCA/IGAke2ZlYXR1cmV9IFske2tleXMubWFwKChrKSA9PiBgJHtrfUAke29yaWdpbihrKSA/PyBcIj9cIn1gKS5qb2luKFwiLCBcIil9XWAgOiBmZWF0dXJlO1xuICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IFtdO1xuICAgIGNvbnN0IHVuc3VwcG9ydGVkID0gbmV3IFNldChjb2xsZWN0ZWQudW5zdXBwb3J0ZWRGZWF0dXJlcyk7XG4gICAgLy8gU2VtIG8gcGFyYW1ldHJvIGV4cGxpY2l0bywgYG5ldyBNYXAoYW55KWAgaW5mZXJlIE1hcDx1bmtub3duLCB1bmtub3duPiBlIG9cbiAgICAvLyAuZ2V0KCkgdm9sdGEgdW5rbm93biwgcXVlYnJhbmRvIHRvZG8gbyBzd2l0Y2ggYWJhaXhvLlxuICAgIGNvbnN0IGV2ZW50cyA9IG5ldyBNYXAoY29sbGVjdGVkLmV2ZW50cyk7XG4gICAgY29uc3QgcmVmcyA9IG5ldyBNYXAoY29sbGVjdGVkLnJlZnMpO1xuICAgIGNvbnN0IHJlYWN0aXZlID0gbmV3IE1hcChjb2xsZWN0ZWQucmVhY3RpdmUpO1xuICAgIGNvbnN0IGR5bmFtaWNQcm9wcyA9IG5ldyBNYXAoY29sbGVjdGVkLmR5bmFtaWNQcm9wcyk7XG4gICAgZm9yIChjb25zdCBpbnMgb2YgbWFuaWZlc3QuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgICAgIHN3aXRjaCAoaW5zLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJldmVudFwiOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dCA9IGV2ZW50cy5nZXQoaW5zLmtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc3VwcG9ydGVkLmFkZChgbWFuaWZlc3Q6ZXZlbnQ6JHtpbnMua2V5fToke2lucy5pZH1gKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50cy5kZWxldGUoaW5zLmtleSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQuZXZlbnQgIT09IGlucy5ldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB1bnN1cHBvcnRlZC5hZGQoYG1hbmlmZXN0OmV2ZW50LWV2ZW50OiR7aW5zLmtleX06JHtpbnMuaWR9OiR7aW5zLmV2ZW50fSE9JHtuZXh0LmV2ZW50fWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goeyBraW5kOiBcImV2ZW50XCIsIGlkOiBpbnMuaWQsIGV2ZW50OiBpbnMuZXZlbnQsIGhhbmRsZXI6IG5leHQuaGFuZGxlciB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJyZWZcIjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSByZWZzLmdldChpbnMua2V5KTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc3VwcG9ydGVkLmFkZChgbWFuaWZlc3Q6cmVmOiR7aW5zLmtleX06JHtpbnMuaWR9YCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZWZzLmRlbGV0ZShpbnMua2V5KTtcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnMucHVzaCh7IGtpbmQ6IFwicmVmXCIsIGlkOiBpbnMuaWQsIHJlZjogbmV4dCB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJyZWFjdGl2ZS1yYW5nZVwiOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dCA9IHJlYWN0aXZlLmdldChpbnMua2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWQuYWRkKGBtYW5pZmVzdDpyZWFjdGl2ZS1yYW5nZToke2lucy5rZXl9OiR7aW5zLmlkfWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVhY3RpdmUuZGVsZXRlKGlucy5rZXkpO1xuICAgICAgICAgICAgICAgIGluc3RydWN0aW9ucy5wdXNoKHsga2luZDogXCJyZWFjdGl2ZS1yYW5nZVwiLCBpZDogaW5zLmlkLCBnZXR0ZXI6IG5leHQgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwicmVhY3RpdmUtc3RydWN0XCI6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0gcmVhY3RpdmUuZ2V0KGlucy5rZXkpO1xuICAgICAgICAgICAgICAgIGlmICghbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICB1bnN1cHBvcnRlZC5hZGQoYG1hbmlmZXN0OnJlYWN0aXZlLXN0cnVjdDoke2lucy5rZXl9OiR7aW5zLmlkfWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVhY3RpdmUuZGVsZXRlKGlucy5rZXkpO1xuICAgICAgICAgICAgICAgIGluc3RydWN0aW9ucy5wdXNoKHsga2luZDogXCJyZWFjdGl2ZS1zdHJ1Y3RcIiwgaWQ6IGlucy5pZCwgcmVuZGVyOiBuZXh0IH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcInJlYWN0aXZlLWxpc3RcIjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSByZWFjdGl2ZS5nZXQoaW5zLmtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc3VwcG9ydGVkLmFkZChgbWFuaWZlc3Q6cmVhY3RpdmUtbGlzdDoke2lucy5rZXl9OiR7aW5zLmlkfWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVhY3RpdmUuZGVsZXRlKGlucy5rZXkpO1xuICAgICAgICAgICAgICAgIGluc3RydWN0aW9ucy5wdXNoKHsga2luZDogXCJyZWFjdGl2ZS1saXN0XCIsIGlkOiBpbnMuaWQsIGdldHRlcjogbmV4dCB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJyZWFjdGl2ZS1hc3luY1wiOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dCA9IHJlYWN0aXZlLmdldChpbnMua2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWQuYWRkKGBtYW5pZmVzdDpyZWFjdGl2ZS1hc3luYzoke2lucy5rZXl9OiR7aW5zLmlkfWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVhY3RpdmUuZGVsZXRlKGlucy5rZXkpO1xuICAgICAgICAgICAgICAgIGluc3RydWN0aW9ucy5wdXNoKHsga2luZDogXCJyZWFjdGl2ZS1hc3luY1wiLCBpZDogaW5zLmlkLCBnZXR0ZXI6IG5leHQgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiZHluYW1pYy1wcm9wXCI6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0gZHluYW1pY1Byb3BzLmdldChpbnMua2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWQuYWRkKGBtYW5pZmVzdDpkeW5hbWljLXByb3A6JHtpbnMua2V5fToke2lucy5pZH06JHtpbnMucHJvcH1gKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGR5bmFtaWNQcm9wcy5kZWxldGUoaW5zLmtleSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQucHJvcCAhPT0gaW5zLnByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zdXBwb3J0ZWQuYWRkKGBtYW5pZmVzdDpkeW5hbWljLXByb3AtcHJvcDoke2lucy5rZXl9OiR7aW5zLmlkfToke2lucy5wcm9wfSE9JHtuZXh0LnByb3B9YCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnMucHVzaCh7IGtpbmQ6IFwiZHluYW1pYy1wcm9wXCIsIGlkOiBpbnMuaWQsIHByb3A6IGlucy5wcm9wLCBnZXR0ZXI6IG5leHQuZ2V0dGVyIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChldmVudHMuc2l6ZSA+IDApXG4gICAgICAgIHVuc3VwcG9ydGVkLmFkZCh3aXRoT3JpZ2luKGBtYW5pZmVzdDpldmVudDpleHRyYToke0FycmF5LmZyb20oZXZlbnRzLmtleXMoKSkuam9pbihcIixcIil9YCwgQXJyYXkuZnJvbShldmVudHMua2V5cygpKSkpO1xuICAgIGlmIChyZWZzLnNpemUgPiAwKVxuICAgICAgICB1bnN1cHBvcnRlZC5hZGQod2l0aE9yaWdpbihgbWFuaWZlc3Q6cmVmOmV4dHJhOiR7QXJyYXkuZnJvbShyZWZzLmtleXMoKSkuam9pbihcIixcIil9YCwgQXJyYXkuZnJvbShyZWZzLmtleXMoKSkpKTtcbiAgICBpZiAocmVhY3RpdmUuc2l6ZSA+IDApXG4gICAgICAgIHVuc3VwcG9ydGVkLmFkZCh3aXRoT3JpZ2luKGBtYW5pZmVzdDpyZWFjdGl2ZTpleHRyYToke0FycmF5LmZyb20ocmVhY3RpdmUua2V5cygpKS5qb2luKFwiLFwiKX1gLCBBcnJheS5mcm9tKHJlYWN0aXZlLmtleXMoKSkpKTtcbiAgICBpZiAoZHluYW1pY1Byb3BzLnNpemUgPiAwKVxuICAgICAgICB1bnN1cHBvcnRlZC5hZGQod2l0aE9yaWdpbihgbWFuaWZlc3Q6ZHluYW1pYy1wcm9wOmV4dHJhOiR7QXJyYXkuZnJvbShkeW5hbWljUHJvcHMua2V5cygpKS5qb2luKFwiLFwiKX1gLCBBcnJheS5mcm9tKGR5bmFtaWNQcm9wcy5rZXlzKCkpKSk7XG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goLi4uY29sbGVjdGVkLmxheW91dEVmZmVjdHMubWFwKChpKSA9PiAoeyBraW5kOiBcImxheW91dC1lZmZlY3RcIiwgZWZmZWN0OiBpLmVmZmVjdCwgZGVwczogaS5kZXBzLCBpZ25vcmVkU291cmNlczogaS5pZ25vcmVkU291cmNlcyB9KSksIC4uLmNvbGxlY3RlZC5lZmZlY3RzLm1hcCgoaSkgPT4gKHsga2luZDogXCJlZmZlY3RcIiwgZWZmZWN0OiBpLmVmZmVjdCwgZGVwczogaS5kZXBzLCBpZ25vcmVkU291cmNlczogaS5pZ25vcmVkU291cmNlcyB9KSkpO1xuICAgIHJldHVybiB7IGluc3RydWN0aW9ucywgdW5zdXBwb3J0ZWRGZWF0dXJlczogQXJyYXkuZnJvbSh1bnN1cHBvcnRlZCkgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpbmQuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogRGVidWcgaGVscGVycyAtIHBvZGUgc2VyIHRyZWUtc2hha2VuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRIeWRyYXRpb25NaXNtYXRjaFJlcG9ydChjb25maWcpIHtcbiAgICByZXR1cm4gYFttaXNtYXRjaF0gJHtjb25maWcuZGVidWdOYW1lfSAke2NvbmZpZy5ib3VuZGFyeUlkID8/IFwiXCJ9ICR7Y29uZmlnLnVuc3VwcG9ydGVkRmVhdHVyZXM/LmpvaW4oXCIsIFwiKSA/PyBcIlwifWA7XG59XG5leHBvcnQgZnVuY3Rpb24gZHVtcEJvdW5kYXJ5SHRtbEZvckRlYnVnKF8pIHtcbiAgICBpZiAoZ2xvYmFsVGhpcz8ucHJvY2Vzcz8uZW52Py5BREFQVElWRV9QVUJMSUNfREVCVUdfSFlEUkFUSU9OID09PSBcInRydWVcIilcbiAgICAgICAgY29uc29sZS53YXJuKFwiW2R1bXBdXCIsIF8uZGVidWdOYW1lKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXB0dXJlQm91bmRhcnlIdG1sU25pcHBldChyb290LCBsZW4gPSA0MDApIHtcbiAgICByZXR1cm4gcm9vdCA/IHJvb3Qub3V0ZXJIVE1MLnNsaWNlKDAsIGxlbikgOiBcIlwiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmVNaXNtYXRjaFNuaXBwZXQoXykgeyByZXR1cm4gbnVsbDsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVidWcuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogUmVnaXN0cm8gZ2xvYmFsIC0gc2VtIFZET01cbiAqL1xuZXhwb3J0IGNvbnN0IGNsaWVudEJvdW5kYXJ5U2NvcGVzID0gbmV3IE1hcCgpO1xuZXhwb3J0IGxldCBtb3VudGVkQ2xpZW50Qm91bmRhcmllcyA9IG5ldyBXZWFrU2V0KCk7XG5leHBvcnQgZnVuY3Rpb24gcmVzZXRNb3VudGVkQm91bmRhcmllcygpIHtcbiAgICBtb3VudGVkQ2xpZW50Qm91bmRhcmllcyA9IG5ldyBXZWFrU2V0KCk7XG59XG5leHBvcnQgY29uc3QgcmVnaXN0ZXJlZEh5ZHJhdGlvbk1vZHVsZXMgPSBuZXcgTWFwKCk7XG5leHBvcnQgY29uc3QgYm91bmRhcnlIeWRyYXRpb25Ob3RpY2VzID0gbmV3IFNldCgpO1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFudXBEaXNjb25uZWN0ZWRDbGllbnRDb21wb25lbnRTY29wZXMoKSB7XG4gICAgZm9yIChjb25zdCBbbm9kZSwgcmVjb3JkXSBvZiBjbGllbnRCb3VuZGFyeVNjb3Blcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgaWYgKCFyZWNvcmQuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgY2xpZW50Qm91bmRhcnlTY29wZXMuZGVsZXRlKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVnaXN0cnkuanMubWFwIiwiLypcbiAqXG4gKiAgKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqICAqXG4gKiAgKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiAgKiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqXG4gKi9cbmltcG9ydCB7IGdldENsaWVudENvbXBvbmVudE1ldGFkYXRhIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy9zaGFyZWRcIjtcbmltcG9ydCB7IGRlc2NyaWJlQ29sbGVjdGVkT3JpZ2luIH0gZnJvbSBcIi4vY29sbGVjdC5qc1wiO1xuLyoqIFVtYSBsaW5oYSBwb3IgYmluZGluZyBjb2xldGFkbyBubyBjbGllbnQsIG5hIG9yZGVtIGVtIHF1ZSBhIGNvbGV0YSBhbmRvdS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdW1tYXJpemVDb2xsZWN0ZWQoY29sbGVjdGVkKSB7XG4gICAgY29uc3Qgb3JpZ2luID0gKGtleSkgPT4gZGVzY3JpYmVDb2xsZWN0ZWRPcmlnaW4oY29sbGVjdGVkLCBrZXkpID8/IFwiKHNlbSBvcmlnZW0pXCI7XG4gICAgY29uc3Qgcm93cyA9IFtdO1xuICAgIGZvciAoY29uc3QgW2tleSwgdl0gb2YgY29sbGVjdGVkLmV2ZW50cyA/PyBbXSlcbiAgICAgICAgcm93cy5wdXNoKHsga2V5LCBraW5kOiBcImV2ZW50XCIsIGRldGFpbDogdi5ldmVudCwgb3JpZ2luOiBvcmlnaW4oa2V5KSB9KTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZdIG9mIGNvbGxlY3RlZC5keW5hbWljUHJvcHMgPz8gW10pXG4gICAgICAgIHJvd3MucHVzaCh7IGtleSwga2luZDogXCJkeW5hbWljLXByb3BcIiwgZGV0YWlsOiB2LnByb3AsIG9yaWdpbjogb3JpZ2luKGtleSkgfSk7XG4gICAgZm9yIChjb25zdCBba2V5XSBvZiBjb2xsZWN0ZWQucmVhY3RpdmUgPz8gW10pXG4gICAgICAgIHJvd3MucHVzaCh7IGtleSwga2luZDogXCJyZWFjdGl2ZVwiLCBkZXRhaWw6IFwiXCIsIG9yaWdpbjogb3JpZ2luKGtleSkgfSk7XG4gICAgZm9yIChjb25zdCBba2V5XSBvZiBjb2xsZWN0ZWQucmVmcyA/PyBbXSlcbiAgICAgICAgcm93cy5wdXNoKHsga2V5LCBraW5kOiBcInJlZlwiLCBkZXRhaWw6IFwiXCIsIG9yaWdpbjogb3JpZ2luKGtleSkgfSk7XG4gICAgcmV0dXJuIHJvd3M7XG59XG5leHBvcnQgZnVuY3Rpb24gdHJhY2VIeWRyYXRpb25NaXNtYXRjaChpbnB1dCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3Qgcm93cyA9IHN1bW1hcml6ZUNvbGxlY3RlZChpbnB1dC5jb2xsZWN0ZWQpO1xuICAgIGNvbnN0IGVudHJ5ID0ge1xuICAgICAgICBhdDogTWF0aC5yb3VuZChwZXJmb3JtYW5jZS5ub3coKSksXG4gICAgICAgIHJlYWR5U3RhdGU6IGRvY3VtZW50LnJlYWR5U3RhdGUsXG4gICAgICAgIGRlYnVnTmFtZTogaW5wdXQuZGVidWdOYW1lLFxuICAgICAgICBib3VuZGFyeUlkOiBpbnB1dC5ib3VuZGFyeUlkLFxuICAgICAgICB2YXJpYW50OiBpbnB1dC52YXJpYW50LFxuICAgICAgICByb290TW9kZTogdHlwZW9mIGlucHV0LmNvbXBvbmVudCA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICA/IChnZXRDbGllbnRDb21wb25lbnRNZXRhZGF0YShpbnB1dC5jb21wb25lbnQpPy5tb2RlID8/IG51bGwpXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgIG1hbmlmZXN0Rm91bmQ6IGlucHV0Lm1hbmlmZXN0ICE9IG51bGwsXG4gICAgICAgIGNvbGxlY3RlZENvdW50OiByb3dzLmxlbmd0aCxcbiAgICAgICAgdW5zdXBwb3J0ZWRGZWF0dXJlczogWy4uLmlucHV0LnVuc3VwcG9ydGVkRmVhdHVyZXNdLFxuICAgICAgICBtYW5pZmVzdDogaW5wdXQubWFuaWZlc3QsXG4gICAgICAgIGNvbGxlY3RlZDogcm93cyxcbiAgICAgICAgc3RhY2s6IG5ldyBFcnJvcihcImh5ZHJhdGlvbiBtaXNtYXRjaFwiKS5zdGFjayxcbiAgICB9O1xuICAgIGNvbnN0IGxvZyA9ICh3aW5kb3cuX19BREFQVElWRV9IWURSQVRJT05fVFJBQ0VfXyA/Pz0gW10pO1xuICAgIGxvZy5wdXNoKGVudHJ5KTtcbiAgICBpZiAobG9nLmxlbmd0aCA+IDUwKVxuICAgICAgICBsb2cuc2hpZnQoKTtcbiAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKGBbQWRhcHRpdmUgSHlkcmF0aW9uXSAke2VudHJ5LmRlYnVnTmFtZX0gKCR7ZW50cnkuYm91bmRhcnlJZCA/PyBcIj9cIn0pIOKAlCBgICtcbiAgICAgICAgYCR7ZW50cnkudW5zdXBwb3J0ZWRGZWF0dXJlcy5sZW5ndGh9IGRpdmVyZ8OqbmNpYXMsICR7ZW50cnkuY29sbGVjdGVkQ291bnR9IGJpbmRpbmdzIGNvbGV0YWRvcyBubyBjbGllbnRgKTtcbiAgICBjb25zb2xlLmxvZyhcInJvb3RNb2RlOlwiLCBlbnRyeS5yb290TW9kZSwgXCJ8IG1hbmlmZXN0IGVuY29udHJhZG86XCIsIGVudHJ5Lm1hbmlmZXN0Rm91bmQsIFwifCByZWFkeVN0YXRlOlwiLCBlbnRyeS5yZWFkeVN0YXRlLCBcInwgdCA9XCIsIGVudHJ5LmF0LCBcIm1zXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiZGl2ZXJnw6puY2lhcyAoY29tcGxldGFzKTpcIiwgZW50cnkudW5zdXBwb3J0ZWRGZWF0dXJlcyk7XG4gICAgY29uc29sZS5sb2coXCJjb2xldGFkbyBubyBjbGllbnQ6XCIpO1xuICAgIGNvbnNvbGUudGFibGUocm93cyk7XG4gICAgY29uc29sZS5sb2coXCJtYW5pZmVzdCB2aW5kbyBkbyBzZXJ2ZXI6XCIsIGlucHV0Lm1hbmlmZXN0KTtcbiAgICBjb25zb2xlLmxvZyhlbnRyeS5zdGFjayk7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIHJldHVybiBlbnRyeTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh5ZHJhdGlvbi10cmFjZS5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKiBIaWRyYXRhw6fDo28gZGUgYm91bmRhcnkgZXhpc3RlbnRlIC0gRE9NLWZpcnN0LCBzZW0gVkRPTVxuICovXG5pbXBvcnQgeyBhcHBseUh5ZHJhdGlvbkluc3RydWN0aW9ucywgYXBwbHlIeWRyYXRpb25JbnN0cnVjdGlvbnNCZXR3ZWVuTWFya2VycyB9IGZyb20gXCIuLi9oeWRyYXRlL2luc3RydWN0aW9ucy5qc1wiO1xuaW1wb3J0IHsgY2xlYW51cEFkYXB0aXZlTWFya2Vyc0FmdGVyU3VjY2VzcywgY2xlYW51cEFkYXB0aXZlTWFya2Vyc0FmdGVyU3VjY2Vzc0JldHdlZW5NYXJrZXJzIH0gZnJvbSBcIi4uL2h5ZHJhdGUvY2xlYW51cC5qc1wiO1xuaW1wb3J0IHsgcmVhZEh5ZHJhdGlvbk1hbmlmZXN0QmV0d2Vlbk1hcmtlcnMsIHJlYWRIeWRyYXRpb25NYW5pZmVzdEZyb21Sb290IH0gZnJvbSBcIi4vZGlzY292ZXJ5LmpzXCI7XG5pbXBvcnQgeyBjb2xsZWN0SHlkcmF0aW9uQmluZGluZ3MgfSBmcm9tIFwiLi9jb2xsZWN0LmpzXCI7XG5pbXBvcnQgeyBiaW5kSHlkcmF0aW9uTWFuaWZlc3QgfSBmcm9tIFwiLi9iaW5kLmpzXCI7XG5pbXBvcnQgeyBjb2xsZWN0U2libGluZ05vZGVzQmV0d2VlbiB9IGZyb20gXCIuLi9oeWRyYXRlL21hcmtlcnMuanNcIjtcbmltcG9ydCB7IGZvcm1hdEh5ZHJhdGlvbk1pc21hdGNoUmVwb3J0LCBkdW1wQm91bmRhcnlIdG1sRm9yRGVidWcsIGNhcHR1cmVCb3VuZGFyeUh0bWxTbmlwcGV0LCBjYXB0dXJlTWlzbWF0Y2hTbmlwcGV0IH0gZnJvbSBcIi4vZGVidWcuanNcIjtcbmltcG9ydCB7IGJvdW5kYXJ5SHlkcmF0aW9uTm90aWNlcyB9IGZyb20gXCIuL3JlZ2lzdHJ5LmpzXCI7XG5pbXBvcnQgeyBmbHVzaEV2ZW50cyB9IGZyb20gXCIuLi8uLi9yZWFjdGl2ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHsgdHJhY2VIeWRyYXRpb25NaXNtYXRjaCB9IGZyb20gXCIuL2h5ZHJhdGlvbi10cmFjZS5qc1wiO1xuZnVuY3Rpb24gZ2V0Qm91bmRhcnlEZWJ1Z05hbWUoQ29tcG9uZW50KSB7IHJldHVybiBDb21wb25lbnQ/Lm5hbWUgfHwgXCJhbm9ueW1vdXNcIjsgfVxuZnVuY3Rpb24gb25seVVubG9jYXRhYmxlRmVhdHVyZXMoZmVhdHVyZXMpIHtcbiAgICByZXR1cm4gZmVhdHVyZXMubGVuZ3RoID4gMCAmJiBmZWF0dXJlcy5ldmVyeSgoZikgPT4gZi5pbmNsdWRlcyhcIjpleHRyYTpcIikpO1xufVxuZnVuY3Rpb24gcmVjb3JkQm91bmRhcnlIeWRyYXRpb25Ob3RpY2UoZGVidWdOYW1lLCByZXBvcnQsIHNuaXBwZXQpIHtcbiAgICBjb25zdCBrZXkgPSBgJHtkZWJ1Z05hbWV9OiR7c25pcHBldC5zbGljZSgwLCA4MCl9YDtcbiAgICBpZiAoYm91bmRhcnlIeWRyYXRpb25Ob3RpY2VzLmhhcyhrZXkpKVxuICAgICAgICByZXR1cm47XG4gICAgYm91bmRhcnlIeWRyYXRpb25Ob3RpY2VzLmFkZChrZXkpO1xuICAgIGNvbnNvbGUud2FybihgW0FkYXB0aXZlIEh5ZHJhdGlvbl0gbWlzbWF0Y2ggaW4gJHtkZWJ1Z05hbWV9XFxuJHtyZXBvcnR9XFxuJHtzbmlwcGV0fWApO1xufVxuZnVuY3Rpb24gYWRvcHRFeGlzdGluZ0JvdW5kYXJ5KGNvbmZpZykge1xuICAgIGNvbnN0IG5vZGVzID0gY29uZmlnLnNuYXBzaG90KCk7XG4gICAgaWYgKGNvbmZpZy51bnN1cHBvcnRlZEZlYXR1cmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgcmVwb3J0ID0gZm9ybWF0SHlkcmF0aW9uTWlzbWF0Y2hSZXBvcnQoeyBkZWJ1Z05hbWU6IGNvbmZpZy5kZWJ1Z05hbWUsIGJvdW5kYXJ5SWQ6IGNvbmZpZy5ib3VuZGFyeUlkLCB1bnN1cHBvcnRlZEZlYXR1cmVzOiBjb25maWcudW5zdXBwb3J0ZWRGZWF0dXJlcyB9KTtcbiAgICAgICAgY29uc3QgbWlzbWF0Y2ggPSBjYXB0dXJlTWlzbWF0Y2hTbmlwcGV0KHsgbm9kZXMsIHVuc3VwcG9ydGVkRmVhdHVyZXM6IGNvbmZpZy51bnN1cHBvcnRlZEZlYXR1cmVzIH0pO1xuICAgICAgICBjb25zdCByb290RWxlbWVudCA9IG5vZGVzLmZpbmQoKG4pID0+IG4ubm9kZVR5cGUgPT09IDEpO1xuICAgICAgICBjb25zdCBzbmlwcGV0ID0gbWlzbWF0Y2ggPyBgW2RhdGEtYWlkPVwiJHttaXNtYXRjaC50YXJnZXRJZH1cIl0gJHttaXNtYXRjaC5kb21QYXRofVxcbiR7bWlzbWF0Y2guaHRtbH1gIDogb25seVVubG9jYXRhYmxlRmVhdHVyZXMoY29uZmlnLnVuc3VwcG9ydGVkRmVhdHVyZXMpID8gYFtzZW0gZGF0YS1haWRdYCA6IGBbcmFpeiAke2NvbmZpZy5ib3VuZGFyeUlkID8/IFwiP1wifV1cXG4ke2NhcHR1cmVCb3VuZGFyeUh0bWxTbmlwcGV0KHJvb3RFbGVtZW50LCA0MDApfWA7XG4gICAgICAgIHJlY29yZEJvdW5kYXJ5SHlkcmF0aW9uTm90aWNlKGNvbmZpZy5kZWJ1Z05hbWUsIHJlcG9ydCwgc25pcHBldCk7XG4gICAgICAgIGR1bXBCb3VuZGFyeUh0bWxGb3JEZWJ1Zyh7IGRlYnVnTmFtZTogY29uZmlnLmRlYnVnTmFtZSwgYm91bmRhcnlJZDogY29uZmlnLmJvdW5kYXJ5SWQsIHJlcG9ydCwgbm9kZXMgfSk7XG4gICAgfVxuICAgIHJldHVybiBub2Rlcztcbn1cbmZ1bmN0aW9uIGlzRW1wdHlDb2xsZWN0KGMpIHtcbiAgICByZXR1cm4gYy5ldmVudHMuc2l6ZSA9PT0gMCAmJiBjLnJlZnMuc2l6ZSA9PT0gMCAmJiBjLnJlYWN0aXZlLnNpemUgPT09IDAgJiZcbiAgICAgICAgYy5keW5hbWljUHJvcHMuc2l6ZSA9PT0gMCAmJiBjLmVmZmVjdHMubGVuZ3RoID09PSAwICYmIGMubGF5b3V0RWZmZWN0cy5sZW5ndGggPT09IDA7XG59XG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0ZUV4aXN0aW5nQm91bmRhcnkocm9vdCwgY29uZmlnKSB7XG4gICAgY29uc3QgbWFuaWZlc3RSZWNvcmQgPSByZWFkSHlkcmF0aW9uTWFuaWZlc3RGcm9tUm9vdChyb290LCBjb25maWcuYm91bmRhcnlJZCk7XG4gICAgY29uc3QgY29sbGVjdGVkID0gY29sbGVjdEh5ZHJhdGlvbkJpbmRpbmdzKGNvbmZpZy5jb21wb25lbnQsIGNvbmZpZy5wcm9wcywgY29uZmlnLmJvdW5kYXJ5SWQpO1xuICAgIGNvbnN0IGJvdW5kID0gbWFuaWZlc3RSZWNvcmRcbiAgICAgICAgPyBiaW5kSHlkcmF0aW9uTWFuaWZlc3QobWFuaWZlc3RSZWNvcmQubWFuaWZlc3QsIGNvbGxlY3RlZClcbiAgICAgICAgOiBpc0VtcHR5Q29sbGVjdChjb2xsZWN0ZWQpXG4gICAgICAgICAgICA/IHsgaW5zdHJ1Y3Rpb25zOiBbXSwgdW5zdXBwb3J0ZWRGZWF0dXJlczogW10gfSAvLyA8LSBlc3TDoXRpY28sIG9rXG4gICAgICAgICAgICA6IHsgaW5zdHJ1Y3Rpb25zOiBbXSwgdW5zdXBwb3J0ZWRGZWF0dXJlczogW1wibWFuaWZlc3Q6bWlzc2luZ1wiXSB9O1xuICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGNvbmZpZy5pbnN0cnVjdGlvbnMgPz8gYm91bmQuaW5zdHJ1Y3Rpb25zO1xuICAgIGlmIChib3VuZC51bnN1cHBvcnRlZEZlYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBhcHBseUh5ZHJhdGlvbkluc3RydWN0aW9ucyhyb290LCBpbnN0cnVjdGlvbnMpO1xuICAgICAgICBmbHVzaEV2ZW50cygpO1xuICAgICAgICBtYW5pZmVzdFJlY29yZD8uc2NyaXB0LnJlbW92ZSgpO1xuICAgICAgICBjbGVhbnVwQWRhcHRpdmVNYXJrZXJzQWZ0ZXJTdWNjZXNzKHJvb3QpO1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShyb290LmNoaWxkTm9kZXMpO1xuICAgIH1cbiAgICB0cmFjZUh5ZHJhdGlvbk1pc21hdGNoKHtcbiAgICAgICAgZGVidWdOYW1lOiBjb25maWcuZGVidWdOYW1lLCBib3VuZGFyeUlkOiBjb25maWcuYm91bmRhcnlJZCxcbiAgICAgICAgY29tcG9uZW50OiBjb25maWcuY29tcG9uZW50LCBtYW5pZmVzdDogbWFuaWZlc3RSZWNvcmQ/Lm1hbmlmZXN0ID8/IG51bGwsXG4gICAgICAgIGNvbGxlY3RlZCwgdW5zdXBwb3J0ZWRGZWF0dXJlczogYm91bmQudW5zdXBwb3J0ZWRGZWF0dXJlcyxcbiAgICAgICAgdmFyaWFudDogXCJyb290XCIsIC8vIFwibWFya2Vyc1wiIG5vIEJldHdlZW5NYXJrZXJzXG4gICAgfSk7XG4gICAgY29uc3QgcmVzID0gYWRvcHRFeGlzdGluZ0JvdW5kYXJ5KHsgZGVidWdOYW1lOiBjb25maWcuZGVidWdOYW1lLCBpbnN0cnVjdGlvbnMsIHVuc3VwcG9ydGVkRmVhdHVyZXM6IGJvdW5kLnVuc3VwcG9ydGVkRmVhdHVyZXMsIHNuYXBzaG90OiAoKSA9PiBBcnJheS5mcm9tKHJvb3QuY2hpbGROb2RlcykgfSk7XG4gICAgcXVldWVNaWNyb3Rhc2soKCkgPT4geyBjbGVhbnVwQWRhcHRpdmVNYXJrZXJzQWZ0ZXJTdWNjZXNzKHJvb3QpOyB9KTtcbiAgICByZXR1cm4gcmVzO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGVFeGlzdGluZ0JvdW5kYXJ5QmV0d2Vlbk1hcmtlcnMoc3RhcnQsIGVuZCwgY29uZmlnKSB7XG4gICAgY29uc3QgbWFuaWZlc3RSZWNvcmQgPSByZWFkSHlkcmF0aW9uTWFuaWZlc3RCZXR3ZWVuTWFya2VycyhzdGFydCwgZW5kLCBjb25maWcuYm91bmRhcnlJZCk7XG4gICAgY29uc3QgY29sbGVjdGVkID0gY29sbGVjdEh5ZHJhdGlvbkJpbmRpbmdzKGNvbmZpZy5jb21wb25lbnQsIGNvbmZpZy5wcm9wcywgY29uZmlnLmJvdW5kYXJ5SWQpO1xuICAgIGNvbnN0IGJvdW5kID0gbWFuaWZlc3RSZWNvcmRcbiAgICAgICAgPyBiaW5kSHlkcmF0aW9uTWFuaWZlc3QobWFuaWZlc3RSZWNvcmQubWFuaWZlc3QsIGNvbGxlY3RlZClcbiAgICAgICAgOiBpc0VtcHR5Q29sbGVjdChjb2xsZWN0ZWQpXG4gICAgICAgICAgICA/IHsgaW5zdHJ1Y3Rpb25zOiBbXSwgdW5zdXBwb3J0ZWRGZWF0dXJlczogW10gfVxuICAgICAgICAgICAgOiB7IGluc3RydWN0aW9uczogW10sIHVuc3VwcG9ydGVkRmVhdHVyZXM6IFtcIm1hbmlmZXN0Om1pc3NpbmdcIl0gfTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBjb25maWcuaW5zdHJ1Y3Rpb25zID8/IGJvdW5kLmluc3RydWN0aW9ucztcbiAgICBpZiAoYm91bmQudW5zdXBwb3J0ZWRGZWF0dXJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYXBwbHlIeWRyYXRpb25JbnN0cnVjdGlvbnNCZXR3ZWVuTWFya2VycyhzdGFydCwgZW5kLCBpbnN0cnVjdGlvbnMpO1xuICAgICAgICBmbHVzaEV2ZW50cygpO1xuICAgICAgICBtYW5pZmVzdFJlY29yZD8uc2NyaXB0LnJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gY2xlYW51cEFkYXB0aXZlTWFya2Vyc0FmdGVyU3VjY2Vzc0JldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQpO1xuICAgIH1cbiAgICB0cmFjZUh5ZHJhdGlvbk1pc21hdGNoKHtcbiAgICAgICAgZGVidWdOYW1lOiBjb25maWcuZGVidWdOYW1lLCBib3VuZGFyeUlkOiBjb25maWcuYm91bmRhcnlJZCxcbiAgICAgICAgY29tcG9uZW50OiBjb25maWcuY29tcG9uZW50LCBtYW5pZmVzdDogbWFuaWZlc3RSZWNvcmQ/Lm1hbmlmZXN0ID8/IG51bGwsXG4gICAgICAgIGNvbGxlY3RlZCwgdW5zdXBwb3J0ZWRGZWF0dXJlczogYm91bmQudW5zdXBwb3J0ZWRGZWF0dXJlcyxcbiAgICAgICAgdmFyaWFudDogXCJyb290XCIsIC8vIFwibWFya2Vyc1wiIG5vIEJldHdlZW5NYXJrZXJzXG4gICAgfSk7XG4gICAgY29uc3QgcmVzID0gYWRvcHRFeGlzdGluZ0JvdW5kYXJ5KHsgZGVidWdOYW1lOiBjb25maWcuZGVidWdOYW1lLCBpbnN0cnVjdGlvbnMsIHVuc3VwcG9ydGVkRmVhdHVyZXM6IGJvdW5kLnVuc3VwcG9ydGVkRmVhdHVyZXMsIHNuYXBzaG90OiAoKSA9PiBjb2xsZWN0U2libGluZ05vZGVzQmV0d2VlbihzdGFydCwgZW5kKSB9KTtcbiAgICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7IGNsZWFudXBBZGFwdGl2ZU1hcmtlcnNBZnRlclN1Y2Nlc3NCZXR3ZWVuTWFya2VycyhzdGFydCwgZW5kKTsgfSk7XG4gICAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRlRXhpc3RpbmdDb21wb25lbnQocm9vdCwgQ29tcG9uZW50LCBwcm9wcywgYm91bmRhcnlJZCA9IFwiXCIpIHtcbiAgICByZXR1cm4gaHlkcmF0ZUV4aXN0aW5nQm91bmRhcnkocm9vdCwgeyBkZWJ1Z05hbWU6IGdldEJvdW5kYXJ5RGVidWdOYW1lKENvbXBvbmVudCksIGNvbXBvbmVudDogQ29tcG9uZW50LCBwcm9wcywgYm91bmRhcnlJZCB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRlRXhpc3RpbmdDb21wb25lbnRCZXR3ZWVuTWFya2VycyhzdGFydCwgZW5kLCBDb21wb25lbnQsIHByb3BzLCBib3VuZGFyeUlkID0gXCJcIikge1xuICAgIHJldHVybiBoeWRyYXRlRXhpc3RpbmdCb3VuZGFyeUJldHdlZW5NYXJrZXJzKHN0YXJ0LCBlbmQsIHsgZGVidWdOYW1lOiBnZXRCb3VuZGFyeURlYnVnTmFtZShDb21wb25lbnQpLCBjb21wb25lbnQ6IENvbXBvbmVudCwgcHJvcHMsIGJvdW5kYXJ5SWQgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oeWRyYXRlLmpzLm1hcCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqIFNlcmlhbGl6YcOnw6NvIGRlIHByb3BzIGNsaWVudCAtPiBjb21lbnTDoXJpb1xuICovXG5mdW5jdGlvbiBzZXJpYWxpemVWYWx1ZSh2YWx1ZSwgc2Vlbikge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYmlnaW50XCIpXG4gICAgICAgIHJldHVybiB7IF9fYWRhcHRpdmVfdHlwZTogXCJiaWdpbnRcIiwgdmFsdWU6IHZhbHVlLnRvU3RyaW5nKCkgfTtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKVxuICAgICAgICByZXR1cm4geyBfX2FkYXB0aXZlX3R5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogdmFsdWUudG9JU09TdHJpbmcoKSB9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlLm1hcCgoaSkgPT4gc2VyaWFsaXplVmFsdWUoaSwgc2VlbikpO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwic3ltYm9sXCIpXG4gICAgICAgIHJldHVybiB7IF9fYWRhcHRpdmVfdHlwZTogXCJ1bnN1cHBvcnRlZFwiLCB2YWx1ZTogdHlwZW9mIHZhbHVlIH07XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBpZiAoc2Vlbi5oYXModmFsdWUpKVxuICAgICAgICAgICAgcmV0dXJuIHsgX19hZGFwdGl2ZV90eXBlOiBcImNpcmN1bGFyXCIgfTtcbiAgICAgICAgc2Vlbi5hZGQodmFsdWUpO1xuICAgICAgICBjb25zdCBvdXQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXModmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoayA9PT0gXCJyZWZcIilcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IHNhbml0aXplZCA9IHNlcmlhbGl6ZVZhbHVlKHYsIHNlZW4pO1xuICAgICAgICAgICAgaWYgKHNhbml0aXplZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIG91dFtrXSA9IHNhbml0aXplZDtcbiAgICAgICAgfVxuICAgICAgICBzZWVuLmRlbGV0ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiByZXZpdmVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlLm1hcCgoaSkgPT4gcmV2aXZlVmFsdWUoaSkpO1xuICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgaWYgKHZhbHVlLl9fYWRhcHRpdmVfdHlwZSA9PT0gXCJkYXRlXCIpXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZS52YWx1ZSk7XG4gICAgaWYgKHZhbHVlLl9fYWRhcHRpdmVfdHlwZSA9PT0gXCJiaWdpbnRcIilcbiAgICAgICAgcmV0dXJuIEJpZ0ludCh2YWx1ZS52YWx1ZSk7XG4gICAgaWYgKHZhbHVlLl9fYWRhcHRpdmVfdHlwZSA9PT0gXCJ1bnN1cHBvcnRlZFwiIHx8IHZhbHVlLl9fYWRhcHRpdmVfdHlwZSA9PT0gXCJjaXJjdWxhclwiKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IG91dCA9IHt9O1xuICAgIGZvciAoY29uc3QgW2ssIHZdIG9mIE9iamVjdC5lbnRyaWVzKHZhbHVlKSkge1xuICAgICAgICBjb25zdCByZXZpdmVkID0gcmV2aXZlVmFsdWUodik7XG4gICAgICAgIGlmIChyZXZpdmVkICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBvdXRba10gPSByZXZpdmVkO1xuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUNsaWVudFByb3BzKHByb3BzKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHNlcmlhbGl6ZVZhbHVlKHByb3BzLCBuZXcgV2Vha1NldCgpKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaXBDaGlsZHJlbkZyb21Qcm9wcyhwcm9wcykge1xuICAgIGlmICghKFwiY2hpbGRyZW5cIiBpbiBwcm9wcykpXG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICBjb25zdCBuZXh0ID0geyAuLi5wcm9wcyB9O1xuICAgIGRlbGV0ZSBuZXh0LmNoaWxkcmVuO1xuICAgIHJldHVybiBuZXh0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ2xpZW50UHJvcHMocmF3KSB7XG4gICAgLy8gXCJudWxsXCIgZmF6IEpTT04ucGFyc2UgZGV2b2x2ZXIgbnVsbCwgZSBvIGNoYW1hZG9yIGZheiBwcm9wcy5jaGlsZHJlbiA9IC4uLlxuICAgIC8vIGVtIHNlZ3VpZGE6IGRldm9sdmVyIHt9IG1hbnRlbSBvIGNvbnRyYXRvIGRlIG9iamV0by5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7XG4gICAgICAgIHJldHVybiBwYXJzZWQgJiYgdHlwZW9mIHBhcnNlZCA9PT0gXCJvYmplY3RcIiA/IHJldml2ZVZhbHVlKHBhcnNlZCkgOiB7fTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcHMtc2VyaWFsaXphdGlvbi5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbnVwQ2xpZW50Qm91bmRhcnlBdHRyaWJ1dGVzKG5vZGUpIHtcbiAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYWRhcHRpdmUtY2xpZW50LW1vZGVcIik7XG4gICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWFkYXB0aXZlLWNsaWVudC1tb2R1bGVcIik7XG4gICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWFkYXB0aXZlLWNsaWVudC1leHBvcnRcIik7XG4gICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWFkYXB0aXZlLWNsaWVudC1wcm9wc1wiKTtcbiAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYWRhcHRpdmUtY2xpZW50LWhhcy1jaGlsZHJlblwiKTtcbiAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYWRhcHRpdmUtY2xpZW50LW1vdW50ZWRcIik7XG59XG5leHBvcnQgZnVuY3Rpb24gY3NzRXNjYXBlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBDU1MgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIENTUy5lc2NhcGUgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIENTUy5lc2NhcGUodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXCJcXFxcXS9nLCBcIlxcXFwkJlwiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsZWFudXAuanMubWFwIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIFNlZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG4vLyBoYW5kbGVyLXNjb3BlLnRzXG5sZXQgaXNEaXNwYXRjaGluZ0hhbmRsZXIgPSBmYWxzZTtcbmNvbnN0IG1pc3NpbmdTY29wZVdhcm5pbmdzID0gbmV3IFNldCgpO1xubGV0IGN1cnJlbnRIYW5kbGVyU2NvcGUgPSBudWxsO1xubGV0IG5leHRIYW5kbGVyU2NvcGVJZCA9IDE7XG4vLyByZWdpc3RyeSBnbG9iYWw6XG4vLyBpZCBkbyBoYW5kbGVyIC0+IHNjb3BlIC0+IGNhbGxiYWNrXG5jb25zdCBoYW5kbGVycyA9IG5ldyBNYXAoKTtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIYW5kbGVyU2NvcGUobGFiZWwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogbmV4dEhhbmRsZXJTY29wZUlkKyssXG4gICAgICAgIGxhYmVsLFxuICAgICAgICBoYW5kbGVyczogbmV3IE1hcCgpXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBydW5XaXRoSGFuZGxlclNjb3BlKHNjb3BlLCBmbikge1xuICAgIGNvbnN0IHByZXZpb3VzID0gY3VycmVudEhhbmRsZXJTY29wZTtcbiAgICBjdXJyZW50SGFuZGxlclNjb3BlID0gc2NvcGU7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBjdXJyZW50SGFuZGxlclNjb3BlID0gcHJldmlvdXM7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFudXBIYW5kbGVyU2NvcGUoc2NvcGUpIHtcbiAgICBmb3IgKGNvbnN0IGlkIG9mIHNjb3BlLmhhbmRsZXJzLmtleXMoKSkge1xuICAgICAgICBjb25zdCBncm91cCA9IGhhbmRsZXJzLmdldChpZCk7XG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgZ3JvdXAuZGVsZXRlKHNjb3BlLmlkKTtcbiAgICAgICAgICAgIGlmIChncm91cC5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuZGVsZXRlKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzY29wZS5oYW5kbGVycy5jbGVhcigpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhhbmRsZXIoaWQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGlzRGlzcGF0Y2hpbmdIYW5kbGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgW0FkYXB0aXZlIEhhbmRsZXJdIGNyZWF0ZUhhbmRsZXIoXCIke2lkfVwiKSBuw6NvIHBvZGUgc2VyIGNoYW1hZG8gZGVudHJvIGRlIG91dHJvIGhhbmRsZXIuYCk7XG4gICAgfVxuICAgIGlmICghY3VycmVudEhhbmRsZXJTY29wZSkge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhbWlzc2luZ1Njb3BlV2FybmluZ3MuaGFzKGlkKSkge1xuICAgICAgICAgICAgbWlzc2luZ1Njb3BlV2FybmluZ3MuYWRkKGlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgW0FkYXB0aXZlIEhhbmRsZXJdIGNyZWF0ZUhhbmRsZXIoXCIke2lkfVwiKSBmb2kgaWdub3JhZG8gcG9ycXVlIG7Do28gZXhpc3RlIHVtIEhhbmRsZXJTY29wZSBhdGl2by4gYCArXG4gICAgICAgICAgICAgICAgXCJVc2UtbyBkdXJhbnRlIGEgbW9udGFnZW0gb3UgaGlkcmF0YcOnw6NvIGRlIHVtIGNvbXBvbmVudGUgaW50ZXJhdGl2by5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzY29wZSA9IGN1cnJlbnRIYW5kbGVyU2NvcGU7XG4gICAgY29uc3QgY2IgPSBjYWxsYmFjaztcbiAgICAvLyBzZSBqw6EgZXhpc3RlIGhhbmRsZXIgY29tIGVzc2UgaWQgbmVzc2UgY29tcG9uZW50ZSxcbiAgICAvLyBzdWJzdGl0dWkgcGVsbyDDumx0aW1vXG4gICAgc2NvcGUuaGFuZGxlcnMuc2V0KGlkLCBjYik7XG4gICAgbGV0IGdyb3VwID0gaGFuZGxlcnMuZ2V0KGlkKTtcbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICAgIGdyb3VwID0gbmV3IE1hcCgpO1xuICAgICAgICBoYW5kbGVycy5zZXQoaWQsIGdyb3VwKTtcbiAgICB9XG4gICAgZ3JvdXAuc2V0KHNjb3BlLmlkLCBjYik7XG59XG5leHBvcnQgZnVuY3Rpb24gdXNlSGFuZGxlcihpZCkge1xuICAgIHJldHVybiAocGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBncm91cCA9IGhhbmRsZXJzLmdldChpZCk7XG4gICAgICAgIGlmICghZ3JvdXAgfHwgZ3JvdXAuc2l6ZSA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaXNEaXNwYXRjaGluZ0hhbmRsZXIgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsYmFjayBvZiBbLi4uZ3JvdXAudmFsdWVzKCldKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socGF5bG9hZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBpc0Rpc3BhdGNoaW5nSGFuZGxlciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoYXNIYW5kbGVyKGlkKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4oaGFuZGxlcnMuZ2V0KGlkKT8uc2l6ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY2xlYXJIYW5kbGVycyhpZCkge1xuICAgIGlmIChpZCkge1xuICAgICAgICBjb25zdCBncm91cCA9IGhhbmRsZXJzLmdldChpZCk7XG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzY29wZUlkIG9mIGdyb3VwLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIC8vIG7Do28gdGVtb3MgYWNlc3NvIGRpcmV0byBhbyBzY29wZSBhcXVpLFxuICAgICAgICAgICAgICAgIC8vIGVudMOjbyBzw7MgbGltcGEgbyByZWdpc3RyeSBnbG9iYWxcbiAgICAgICAgICAgICAgICBncm91cC5kZWxldGUoc2NvcGVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlcnMuZGVsZXRlKGlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoYW5kbGVycy5jbGVhcigpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGFuZGxlci1zY29wZS5qcy5tYXAiLCIvKlxuICpcbiAqICAqIENvcHlyaWdodCAoYykgMjAyNiBBbnRvbmlvIEpvaG5hdGhhblxuICogICpcbiAqICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqICAqIFNlZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgZnVsbCBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICpcbiAqL1xuaW1wb3J0IHsgYXBwbHlIeWRyYXRpb25QYXlsb2FkVG9XaW5kb3csIHBhcnNlSHlkcmF0aW9uUGF5bG9hZCwgbWF0Y2hSb3V0ZVNlcnZlciB9IGZyb20gXCJAYWRhcHRpdmUtanMvc2hhcmVkXCI7XG5pbXBvcnQgeyB1c2VDbGllbnRFZmZlY3QgfSBmcm9tIFwiLi4vcmVhY3RpdmUvaW5pdC5qc1wiO1xuaW1wb3J0IHsgQWRhcHRpdmVPYnNlcnZlciwgaXNTU1IgfSBmcm9tIFwiLi4vcmVhY3RpdmUvaW5kZXguanNcIjtcbi8qKlxuICogQ3JpYSB1bWEgcmVzcG9zdGEgZGUgcmVkaXJlY3QgKFNTUi1zYWZlIGUgYWduw7NzdGljbyBkZSBhZGFwdGVyKVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVkaXJlY3QobG9jYXRpb24sIHN0YXR1cyA9IDMwMikge1xuICAgIHJldHVybiB7XG4gICAgICAgIF9fdHlwZTogXCJyZWRpcmVjdFwiLFxuICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgc3RhdHVzLFxuICAgIH07XG59XG5jbGFzcyBSb3V0ZXJTdGF0ZSB7XG4gICAgcGF0aG5hbWVPYnNlcnZlciA9IG5ldyBBZGFwdGl2ZU9ic2VydmVyKHRoaXMuZ2V0SW5pdGlhbFBhdGhuYW1lKCkpO1xuICAgIHF1ZXJ5T2JzZXJ2ZXIgPSBuZXcgQWRhcHRpdmVPYnNlcnZlcih0aGlzLmdldEluaXRpYWxRdWVyeSgpKTtcbiAgICBwYXJhbXNPYnNlcnZlciA9IG5ldyBBZGFwdGl2ZU9ic2VydmVyKHRoaXMuZ2V0SW5pdGlhbFBhcmFtcygpKTtcbiAgICBoYXNoT2JzZXJ2ZXIgPSBuZXcgQWRhcHRpdmVPYnNlcnZlcih0aGlzLmdldEluaXRpYWxIYXNoKCkpO1xuICAgIHVybE9ic2VydmVyID0gbmV3IEFkYXB0aXZlT2JzZXJ2ZXIodGhpcy5nZXRJbml0aWFsVXJsKCkpO1xuICAgIGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgcm91dGVzID0gW107IC8vIPCfkYggYWRpY2lvbmFyXG4gICAgbG9hZGVkU2NyaXB0cyA9IG5ldyBTZXQoKTtcbiAgICBlbnN1cmVIeWRyYXRpb25HbG9iYWxzKCkge1xuICAgICAgICBpZiAoaXNTU1IoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYXBwbHlIeWRyYXRpb25QYXlsb2FkVG9XaW5kb3coZG9jdW1lbnQpO1xuICAgIH1cbiAgICBnZXRJbml0aWFsUGF0aG5hbWUoKSB7XG4gICAgICAgIGlmIChpc1NTUigpKVxuICAgICAgICAgICAgcmV0dXJuIFwiL1wiO1xuICAgICAgICB0aGlzLmVuc3VyZUh5ZHJhdGlvbkdsb2JhbHMoKTtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5fX1JPVVRFX18gPz8gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIH1cbiAgICBnZXRJbml0aWFsUXVlcnkoKSB7XG4gICAgICAgIGlmIChpc1NTUigpKVxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB0aGlzLmVuc3VyZUh5ZHJhdGlvbkdsb2JhbHMoKTtcbiAgICAgICAgaWYgKHdpbmRvdy5fX1FVRVJZU19fKVxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5fX1FVRVJZU19fO1xuICAgICAgICBjb25zdCBxdWVyeSA9IHt9O1xuICAgICAgICBjb25zdCBzcCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBzcC5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIHF1ZXJ5W2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH1cbiAgICBnZXRJbml0aWFsUGFyYW1zKCkge1xuICAgICAgICBpZiAoaXNTU1IoKSlcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgdGhpcy5lbnN1cmVIeWRyYXRpb25HbG9iYWxzKCk7XG4gICAgICAgIHJldHVybiB3aW5kb3cuX19QQVJBTVNfXyA/PyB7fTtcbiAgICB9XG4gICAgZ2V0SW5pdGlhbEhhc2goKSB7XG4gICAgICAgIGlmIChpc1NTUigpKVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICB9XG4gICAgZ2V0SW5pdGlhbFVybCgpIHtcbiAgICAgICAgaWYgKGlzU1NSKCkpXG4gICAgICAgICAgICByZXR1cm4gXCIvXCI7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgfVxuICAgIHNldFJvdXRlcyhyb3V0ZXMpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XG4gICAgICAgIHRoaXMuc3luYygpO1xuICAgIH1cbiAgICBnZXRSb3V0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdXRlcztcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKGlzU1NSKCkgfHwgdGhpcy5pbml0aWFsaXplZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIC8vIFJlZ2lzdHJhIG9zIHNjcmlwdHMgZGUgbcOzZHVsbyBqw6EgcHJlc2VudGVzIG5hIHDDoWdpbmEgaW5pY2lhbCxcbiAgICAgICAgLy8gcGFyYSBuw6NvIHJlaW1wb3J0w6EtbG9zIGR1cmFudGUgbmF2ZWdhw6fDtWVzIFNQQS5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInNjcmlwdFt0eXBlPW1vZHVsZV1bc3JjXVwiKS5mb3JFYWNoKChzY3JpcHQpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRTY3JpcHRzLmFkZChuZXcgVVJMKHNjcmlwdC5zcmMsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgICAgICAvLyBpZ25vcmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFNpbmNyb25pemEgbyBlc3RhZG8gaW5pY2lhbFxuICAgICAgICB0aGlzLnN5bmMoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBTaW5jcm9uaXphIGltZWRpYXRhbWVudGUgbyBlc3RhZG8gcmVhdGl2byAocGF0aG5hbWUvcXVlcnkvcGFyYW1zL3VybCksXG4gICAgICAgICAgICAvLyBwYXJhIHF1ZSBjb21wb25lbnRlcyBxdWUgY29uc29tZW0gdXNlUm91dGVyKCkgasOhIHJlYWphbSDDoCBub3ZhIFVSTFxuICAgICAgICAgICAgLy8gbWVzbW8gYW50ZXMgZG8gY29udGXDumRvIHNlciB0cm9jYWRvLlxuICAgICAgICAgICAgdGhpcy5zeW5jKCk7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgICAgICB2b2lkIHRoaXMubG9hZEFuZFJlbmRlclJvdXRlKHRhcmdldCkudGhlbigoYXBwbGllZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghYXBwbGllZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBGYWxsYmFjazogcmVjYXJyZWdhIGEgcMOhZ2luYSBhdHVhbCAoc2VtIGFsdGVyYXIgbyBoaXN0w7NyaWNvLCBqw6EgcXVlIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gVVJMIGrDoSBlc3TDoSBjb3JyZXRhKSBwYXJhIGdhcmFudGlyIHF1ZSBvIGNvbnRlw7pkbyBhY29tcGFuaGUgYSBVUkwuXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnN5bmMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3luYygpO1xuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSB0YXJnZXQuY2xvc2VzdChcImFcIik7XG4gICAgICAgICAgICBpZiAobGluayAmJlxuICAgICAgICAgICAgICAgIGxpbmsuaHJlZiAmJlxuICAgICAgICAgICAgICAgICghbGluay50YXJnZXQgfHwgbGluay50YXJnZXQgPT09IFwiX3NlbGZcIikgJiZcbiAgICAgICAgICAgICAgICAhZS5kZWZhdWx0UHJldmVudGVkICYmXG4gICAgICAgICAgICAgICAgIWUubWV0YUtleSAmJlxuICAgICAgICAgICAgICAgICFlLmN0cmxLZXkgJiZcbiAgICAgICAgICAgICAgICAhZS5zaGlmdEtleSAmJlxuICAgICAgICAgICAgICAgICFlLmFsdEtleSAmJlxuICAgICAgICAgICAgICAgIGxpbmsub3JpZ2luID09PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICYmXG4gICAgICAgICAgICAgICAgIWxpbmsuaGFzQXR0cmlidXRlKFwiZG93bmxvYWRcIikgJiZcbiAgICAgICAgICAgICAgICBsaW5rLmdldEF0dHJpYnV0ZShcInJlbFwiKSAhPT0gXCJleHRlcm5hbFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoaHJlZiAmJiAhaHJlZi5zdGFydHNXaXRoKFwiI1wiKSAmJiAhaHJlZi5zdGFydHNXaXRoKFwibWFpbHRvOlwiKSAmJiAhaHJlZi5zdGFydHNXaXRoKFwidGVsOlwiKSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaChocmVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzeW5jKCkge1xuICAgICAgICBpZiAoaXNTU1IoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgcGF0aG5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgIGNvbnN0IGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgICAgLy8gQXR1YWxpemEgbyBfX1JPVVRFX18gcGFyYSBjb21wYXRpYmlsaWRhZGUgY29tIG8gc2lzdGVtYSBkZSBoaWRyYXRhw6fDo29cbiAgICAgICAgd2luZG93Ll9fUk9VVEVfXyA9IHBhdGhuYW1lO1xuICAgICAgICBjb25zdCBxdWVyeSA9IHt9O1xuICAgICAgICBjb25zdCBzcCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoc2VhcmNoKTtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWxdIG9mIHNwLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgcXVlcnlba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLm1hdGNoUGFyYW1zKHBhdGhuYW1lKTsgLy8g8J+RiCByZWNhbGN1bGFcbiAgICAgICAgdGhpcy5wYXRobmFtZU9ic2VydmVyLnNldChwYXRobmFtZSk7XG4gICAgICAgIHRoaXMucXVlcnlPYnNlcnZlci5zZXQocXVlcnkpO1xuICAgICAgICBpZiAocGFyYW1zKVxuICAgICAgICAgICAgdGhpcy5wYXJhbXNPYnNlcnZlci5zZXQocGFyYW1zKTtcbiAgICAgICAgdGhpcy5oYXNoT2JzZXJ2ZXIuc2V0KGhhc2gpO1xuICAgICAgICB0aGlzLnVybE9ic2VydmVyLnNldChwYXRobmFtZSArIHNlYXJjaCArIGhhc2gpO1xuICAgICAgICAvLyBEaXNwYXJhIGV2ZW50byBjdXN0b21pemFkbyBwYXJhIG5vdGlmaWNhciBtdWRhbsOnYSBkZSByb3RhIGdsb2JhbG1lbnRlXG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcImFkYXB0aXZlOnJvdXRlY2hhbmdlXCIsIHtcbiAgICAgICAgICAgIGRldGFpbDogeyBwYXRobmFtZSwgc2VhcmNoLCBoYXNoLCB1cmw6IHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaCB9XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQnVzY2EgbyBIVE1MIHJlbmRlcml6YWRvIG5vIHNlcnZpZG9yIHBhcmEgYSByb3RhIGluZm9ybWFkYSBlIHN1YnN0aXR1aVxuICAgICAqIG8gY29udGXDumRvIGRlICNyb290LCBwZXJtaXRpbmRvIG5hdmVnYcOnw6NvIFNQQSByZWFsIChzZW0gZnVsbCByZWxvYWQpLlxuICAgICAqIFJldG9ybmEgYHRydWVgIHNlIGEgdHJvY2EgZGUgY29udGXDumRvIGZvaSBhcGxpY2FkYSBjb20gc3VjZXNzby5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkQW5kUmVuZGVyUm91dGUoaHJlZikge1xuICAgICAgICBpZiAoaXNTU1IoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldFVybCA9IG5ldyBVUkwoaHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgaWYgKHRhcmdldFVybC5vcmlnaW4gIT09IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0YXJnZXRVcmwudG9TdHJpbmcoKSwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJYLUFkYXB0aXZlLU5hdmlnYXRpb25cIjogXCIxXCIgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIikgPz8gXCJcIjtcbiAgICAgICAgICAgIGlmICghY29udGVudFR5cGUuaW5jbHVkZXMoXCJ0ZXh0L2h0bWxcIikpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgICAgICBjb25zdCBuZXdSb290ID0gZG9jLmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xuICAgICAgICAgICAgaWYgKCFuZXdSb290IHx8ICFjdXJyZW50Um9vdClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjdXJyZW50Um9vdC5pbm5lckhUTUwgPSBuZXdSb290LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlmIChkb2MudGl0bGUpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IGRvYy50aXRsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5leHRQYXlsb2FkID0gcGFyc2VIeWRyYXRpb25QYXlsb2FkKGRvYyk7XG4gICAgICAgICAgICBpZiAobmV4dFBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBhcHBseUh5ZHJhdGlvblBheWxvYWRUb1dpbmRvdyhkb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2NyaXB0U3JjcyA9IEFycmF5LmZyb20oZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzY3JpcHRbdHlwZT1tb2R1bGVdW3NyY11cIikpLm1hcCgoc2NyaXB0KSA9PiBuZXcgVVJMKHNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJzcmNcIiksIHRhcmdldFVybCkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNyYyBvZiBzY3JpcHRTcmNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubG9hZGVkU2NyaXB0cy5oYXMoc3JjKSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRTY3JpcHRzLmFkZChzcmMpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHNyYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW0FkYXB0aXZlIFJvdXRlcl0gRmFsaGEgYW8gaW1wb3J0YXIgbcOzZHVsbyBkYSByb3RhOlwiLCBzcmMsIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW0FkYXB0aXZlIFJvdXRlcl0gRmFsaGEgbmEgbmF2ZWdhw6fDo28gU1BBLCB1c2FuZG8gZmFsbGJhY2s6XCIsIGVycik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWF0Y2hQYXJhbXMocGF0aG5hbWUpIHtcbiAgICAgICAgZm9yIChjb25zdCByb3V0ZSBvZiB0aGlzLnJvdXRlcykge1xuICAgICAgICAgICAgY29uc3QgeyBtYXRjaGVkLCBwYXJhbXMgfSA9IG1hdGNoUm91dGVTZXJ2ZXIocm91dGUucGF0aCwgcGF0aG5hbWUpOyAvLyBtYXRjaGVyIGNsaWVudC1zaWRlXG4gICAgICAgICAgICBpZiAobWF0Y2hlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcGF0aG5hbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGhuYW1lT2JzZXJ2ZXIuZ2V0KCk7XG4gICAgfTtcbiAgICBxdWVyeSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlPYnNlcnZlci5nZXQoKTtcbiAgICB9O1xuICAgIHBhcmFtcyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1zT2JzZXJ2ZXIuZ2V0KCk7XG4gICAgfTtcbiAgICBoYXNoID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNoT2JzZXJ2ZXIuZ2V0KCk7XG4gICAgfTtcbiAgICB1cmwgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVybE9ic2VydmVyLmdldCgpO1xuICAgIH07XG4gICAgc2VhcmNoUGFyYW1zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnVybE9ic2VydmVyLmdldCgpO1xuICAgICAgICBpZiAoaXNTU1IoKSlcbiAgICAgICAgICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIH07XG4gICAgcHVzaCA9IChocmVmLCBvcHRpb25zID0ge30pID0+IHtcbiAgICAgICAgaWYgKGlzU1NSKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHJlcGxhY2UgPSBvcHRpb25zLnJlcGxhY2UgPz8gZmFsc2U7XG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IG9wdGlvbnMuc2Nyb2xsID8/IHRydWU7XG4gICAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgXCJcIiwgaHJlZik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgXCJcIiwgaHJlZik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeW5jKCk7XG4gICAgICAgIGlmIChzY3JvbGwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICB2b2lkIHRoaXMubG9hZEFuZFJlbmRlclJvdXRlKGhyZWYpLnRoZW4oKGFwcGxpZWQpID0+IHtcbiAgICAgICAgICAgIGlmICghYXBwbGllZCkge1xuICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrOiBuYXZlZ2HDp8OjbyByZWFsIGNhc28gbsOjbyBzZWphIHBvc3PDrXZlbCB0cm9jYXIgbyBjb250ZcO6ZG8gdmlhIGZldGNoLlxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN5bmMoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXBsYWNlID0gKGhyZWYsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICB0aGlzLnB1c2goaHJlZiwgeyAuLi5vcHRpb25zLCByZXBsYWNlOiB0cnVlIH0pO1xuICAgIH07XG4gICAgYmFjayA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlzU1NSKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgICB9O1xuICAgIGZvcndhcmQgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1NTUigpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5mb3J3YXJkKCk7XG4gICAgfTtcbiAgICByZWZyZXNoID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNTU1IoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH07XG4gICAgcHJlZmV0Y2ggPSAoX2hyZWYpID0+IHtcbiAgICAgICAgLy8gUHJlZmV0Y2ggaG9va1xuICAgIH07XG59XG5sZXQgZ2xvYmFsUm91dGVyID0gbnVsbDtcbmZ1bmN0aW9uIGdldEdsb2JhbFJvdXRlcigpIHtcbiAgICBpZiAoIWdsb2JhbFJvdXRlcikge1xuICAgICAgICBnbG9iYWxSb3V0ZXIgPSBuZXcgUm91dGVyU3RhdGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIGdsb2JhbFJvdXRlcjtcbn1cbi8qKlxuICogRGVmaW5lIGFzIHJvdGFzIGRpc3BvbsOtdmVpcyBubyByb3RlYWRvciBkbyBjbGllbnRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q2xpZW50Um91dGVzKHJvdXRlcykge1xuICAgIGdldEdsb2JhbFJvdXRlcigpLnNldFJvdXRlcyhyb3V0ZXMpO1xufVxuLyoqXG4gKiBSZXRvcm5hIGFzIHJvdGFzIGRlZmluaWRhcyBubyBjbGllbnRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xpZW50Um91dGVzKCkge1xuICAgIHJldHVybiBnZXRHbG9iYWxSb3V0ZXIoKS5nZXRSb3V0ZXMoKTtcbn1cbi8qKlxuICogSG9vayBkZSBuYXZlZ2HDp8OjbyByZWF0aXZhIGRvIEFkYXB0aXZlSlMuXG4gKlxuICogRm9ybmVjZSBnZXR0ZXJzIHJlYXRpdm9zIChwYXRobmFtZSwgcXVlcnksIHBhcmFtcywgc2VhcmNoUGFyYW1zLCBoYXNoLCB1cmwpXG4gKiBlIG3DqXRvZG9zIGRlIG5hdmVnYcOnw6NvIChwdXNoLCByZXBsYWNlLCBiYWNrLCBmb3J3YXJkLCByZWZyZXNoKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVJvdXRlcigpIHtcbiAgICBjb25zdCByb3V0ZXIgPSBnZXRHbG9iYWxSb3V0ZXIoKTtcbiAgICB1c2VDbGllbnRFZmZlY3QoKCkgPT4ge1xuICAgICAgICByb3V0ZXIuaW5pdCgpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gcm91dGVyO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGVyLmpzLm1hcCIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjYgQW50b25pbyBKb2huYXRoYW5cbiAqIEVudHJ5IGRlIGJvdW5kYXJpZXMgLSBzZW0gVkRPTVxuICovXG5pbXBvcnQgeyBjb2xsZWN0U2libGluZ05vZGVzQmV0d2VlbiB9IGZyb20gXCIuLi9oeWRyYXRlL21hcmtlcnMuanNcIjtcbmltcG9ydCB7IHJlcG9ydEh5ZHJhdGlvbkVycm9yIH0gZnJvbSBcIi4uL2h5ZHJhdGUvbWlzbWF0Y2guanNcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL2NvcmVcIjtcbmltcG9ydCB7IG1vdW50Q2xpZW50Q29tcG9uZW50LCBtb3VudENsaWVudENvbXBvbmVudEJldHdlZW5NYXJrZXJzIH0gZnJvbSBcIi4vbW91bnQuanNcIjtcbmltcG9ydCB7IGh5ZHJhdGVFeGlzdGluZ0NvbXBvbmVudCwgaHlkcmF0ZUV4aXN0aW5nQ29tcG9uZW50QmV0d2Vlbk1hcmtlcnMgfSBmcm9tIFwiLi9oeWRyYXRlLmpzXCI7XG5pbXBvcnQgeyBmaW5kQ29tbWVudEJvdW5kYXJpZXMgfSBmcm9tIFwiLi9kaXNjb3ZlcnkuanNcIjtcbmltcG9ydCB7IHBhcnNlQ2xpZW50UHJvcHMgfSBmcm9tIFwiLi9wcm9wcy1zZXJpYWxpemF0aW9uLmpzXCI7XG5pbXBvcnQgeyBjbGllbnRCb3VuZGFyeVNjb3BlcywgbW91bnRlZENsaWVudEJvdW5kYXJpZXMsIHJlZ2lzdGVyZWRIeWRyYXRpb25Nb2R1bGVzLCByZXNldE1vdW50ZWRCb3VuZGFyaWVzLCBjbGVhbnVwRGlzY29ubmVjdGVkQ2xpZW50Q29tcG9uZW50U2NvcGVzIH0gZnJvbSBcIi4vcmVnaXN0cnkuanNcIjtcbmltcG9ydCB7IGNsZWFudXBDbGllbnRCb3VuZGFyeUF0dHJpYnV0ZXMsIGNzc0VzY2FwZSB9IGZyb20gXCIuL2NsZWFudXAuanNcIjtcbmltcG9ydCB7IENMSUVOVF9CT1VOREFSWV9NT0RFX0NMSUVOVCwgQ0xJRU5UX0JPVU5EQVJZX01PREVfSFlEUkFURSwgSFlEUkFURV9TTE9UX1RBRywgSFlEUkFUSU9OX0JPVU5EQVJZX0lEX0FUVFIgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3NoYXJlZFwiO1xuaW1wb3J0IHsgY2xlYW51cEV2ZW50c1Njb3BlLCBpc1NTUiwgcnVuV2l0aEVmZmVjdFNjb3BlIH0gZnJvbSBcIi4uLy4uL3JlYWN0aXZlL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBjbGVhbnVwSGFuZGxlclNjb3BlLCBjcmVhdGVIYW5kbGVyU2NvcGUsIHJ1bldpdGhIYW5kbGVyU2NvcGUgfSBmcm9tIFwiLi4vLi4vZnJvbnQvaGFuZGxlci1zY29wZS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlRXZlbnRzU2NvcGUgfSBmcm9tIFwiLi4vLi4vcmVhY3RpdmUvZXZlbnRzLmpzXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwiLi4vLi4vZnJvbnQvcm91dGVyLmpzXCI7XG5leHBvcnQgeyBjcmVhdGVCb3VuZGFyeUNvbXBvbmVudCwgaXNDbGllbnRDb21wb25lbnQgfSBmcm9tIFwiLi9mYWN0b3J5LmpzXCI7XG5leHBvcnQgeyBkZXNjcmliZUNvbGxlY3RlZE9yaWdpbiB9IGZyb20gXCIuL2NvbGxlY3QuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRlQ2xpZW50Q29tcG9uZW50cyhtb2R1bGVJZCwgZXhwb3J0c01hcCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIHJldHVybjtcbiAgICByZWdpc3RlcmVkSHlkcmF0aW9uTW9kdWxlcy5zZXQobW9kdWxlSWQsIGV4cG9ydHNNYXApO1xuICAgIGlmICghaXNTU1IoKSlcbiAgICAgICAgdXNlUm91dGVyKCkuaW5pdCgpO1xuICAgIHJ1bldoZW5Eb21SZWFkeSgoKSA9PiBoeWRyYXRlU2FmZWx5KG1vZHVsZUlkLCBleHBvcnRzTWFwKSk7XG59XG5mdW5jdGlvbiBoeWRyYXRlU2FmZWx5KG1vZHVsZUlkLCBleHBvcnRzTWFwKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaHlkcmF0ZUNsaWVudENvbXBvbmVudHNOb3cobW9kdWxlSWQsIGV4cG9ydHNNYXApO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIFVtYSBpbGhhIHF1ZSBsYW7Dp2EgZGVpeGEgbyBIVE1MIGRvIHNlcnZpZG9yIG5hIHRlbGEgZSBuYWRhIG1haXM6IHNlbSBpc3RvXG4gICAgICAgIC8vIGEgZmFsaGEgc29tZSBubyBjb25zb2xlIGUgYSBww6FnaW5hIHBhcmVjZSBlc3RhciBmdW5jaW9uYW5kby5cbiAgICAgICAgcmVwb3J0SHlkcmF0aW9uRXJyb3IoZXJyLCB7IG1vZHVsZUlkIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB3cmFwSHlkcmF0ZVByb3BzRm9yU2VydmVyKHByb3BzKSB7XG4gICAgaWYgKCEoXCJjaGlsZHJlblwiIGluIHByb3BzKSkge1xuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfVxuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuaXNBcnJheShwcm9wcy5jaGlsZHJlbilcbiAgICAgICAgPyBwcm9wcy5jaGlsZHJlblxuICAgICAgICA6IHByb3BzLmNoaWxkcmVuID09IG51bGxcbiAgICAgICAgICAgID8gW11cbiAgICAgICAgICAgIDogW3Byb3BzLmNoaWxkcmVuXTtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgY2hpbGRyZW46IGNyZWF0ZUVsZW1lbnQoSFlEUkFURV9TTE9UX1RBRywgeyBjaGlsZHJlbiB9KVxuICAgIH07XG59XG5pZiAoIWlzU1NSKCkpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFkYXB0aXZlOnJvdXRlY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgcmVzZXRNb3VudGVkQm91bmRhcmllcygpO1xuICAgICAgICBydW5XaGVuRG9tUmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBbbW9kdWxlSWQsIGV4cG9ydHNNYXBdIG9mIHJlZ2lzdGVyZWRIeWRyYXRpb25Nb2R1bGVzLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGh5ZHJhdGVDbGllbnRDb21wb25lbnRzTm93KG1vZHVsZUlkLCBleHBvcnRzTWFwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXBvcnRIeWRyYXRpb25FcnJvcihlcnIsIHsgbW9kdWxlSWQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHJ1bldoZW5Eb21SZWFkeShjYikge1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIilcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY2IsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBlbHNlXG4gICAgICAgIGNiKCk7XG59XG5mdW5jdGlvbiBoeWRyYXRlQ2xpZW50Q29tcG9uZW50c05vdyhtb2R1bGVJZCwgZXhwb3J0c01hcCkge1xuICAgIGNsZWFudXBEaXNjb25uZWN0ZWRDbGllbnRDb21wb25lbnRTY29wZXMoKTtcbiAgICBjb25zdCBjb21tZW50Qm91bmRhcmllcyA9IGZpbmRDb21tZW50Qm91bmRhcmllcyhtb2R1bGVJZCk7XG4gICAgY29tbWVudEJvdW5kYXJpZXMuZm9yRWFjaCgoYm91bmRhcnkpID0+IHtcbiAgICAgICAgaWYgKG1vdW50ZWRDbGllbnRCb3VuZGFyaWVzLmhhcyhib3VuZGFyeS5zdGFydCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IENvbXBvbmVudCA9IGV4cG9ydHNNYXBbYm91bmRhcnkuZXhwb3J0TmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgQ29tcG9uZW50ICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHByb3BzID0gYm91bmRhcnkucmF3UHJvcHMgPyBwYXJzZUNsaWVudFByb3BzKGJvdW5kYXJ5LnJhd1Byb3BzKSA6IHt9O1xuICAgICAgICBpZiAoYm91bmRhcnkuaGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gYm91bmRhcnkubW9kZSA9PT0gXCJoeWRyYXRlXCIgPyBjcmVhdGVFbGVtZW50KEhZRFJBVEVfU0xPVF9UQUcsIHsgaHlkcmF0ZTogdHJ1ZSB9KSA6IGNvbGxlY3RTaWJsaW5nTm9kZXNCZXR3ZWVuKGJvdW5kYXJ5LnN0YXJ0LCBib3VuZGFyeS5lbmQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZXYgPSBjbGllbnRCb3VuZGFyeVNjb3Blcy5nZXQoYm91bmRhcnkuc3RhcnQpO1xuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgY2xlYW51cEV2ZW50c1Njb3BlKHByZXYuc2NvcGUpO1xuICAgICAgICAgICAgY2xlYW51cEhhbmRsZXJTY29wZShwcmV2LmhhbmRsZXJTY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dFNjb3BlID0gY3JlYXRlRXZlbnRzU2NvcGUoYGNsaWVudDoke21vZHVsZUlkfToke2JvdW5kYXJ5LmV4cG9ydE5hbWV9YCk7XG4gICAgICAgIGNvbnN0IG5leHRIYW5kbGVyU2NvcGUgPSBjcmVhdGVIYW5kbGVyU2NvcGUoYGhhbmRsZXI6JHttb2R1bGVJZH06JHtib3VuZGFyeS5leHBvcnROYW1lfWApO1xuICAgICAgICBtb3VudGVkQ2xpZW50Qm91bmRhcmllcy5hZGQoYm91bmRhcnkuc3RhcnQpO1xuICAgICAgICBsZXQgbW91bnRlZE5vZGVzID0gW107XG4gICAgICAgIG1vdW50ZWROb2RlcyA9IHJ1bldpdGhFZmZlY3RTY29wZShuZXh0U2NvcGUsICgpID0+IHJ1bldpdGhIYW5kbGVyU2NvcGUobmV4dEhhbmRsZXJTY29wZSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGJvdW5kYXJ5Lm1vZGUgPT09IENMSUVOVF9CT1VOREFSWV9NT0RFX0NMSUVOVClcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91bnRDbGllbnRDb21wb25lbnRCZXR3ZWVuTWFya2Vycyhib3VuZGFyeS5zdGFydCwgYm91bmRhcnkuZW5kLCBDb21wb25lbnQsIHByb3BzKTtcbiAgICAgICAgICAgIGlmIChib3VuZGFyeS5tb2RlID09PSBDTElFTlRfQk9VTkRBUllfTU9ERV9IWURSQVRFKVxuICAgICAgICAgICAgICAgIHJldHVybiBoeWRyYXRlRXhpc3RpbmdDb21wb25lbnRCZXR3ZWVuTWFya2Vycyhib3VuZGFyeS5zdGFydCwgYm91bmRhcnkuZW5kLCBDb21wb25lbnQsIHByb3BzLCBib3VuZGFyeS5ib3VuZGFyeUlkKTtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSkpO1xuICAgICAgICBjbGllbnRCb3VuZGFyeVNjb3Blcy5zZXQoYm91bmRhcnkuc3RhcnQsIHtcbiAgICAgICAgICAgIHNjb3BlOiBuZXh0U2NvcGUsIGhhbmRsZXJTY29wZTogbmV4dEhhbmRsZXJTY29wZSxcbiAgICAgICAgICAgIGlzQ29ubmVjdGVkOiAoKSA9PiBtb3VudGVkTm9kZXMubGVuZ3RoID4gMCA/IG1vdW50ZWROb2Rlcy5zb21lKChuKSA9PiBuLmlzQ29ubmVjdGVkKSA6IEJvb2xlYW4oZG9jdW1lbnQuYm9keT8uaXNDb25uZWN0ZWQpLFxuICAgICAgICAgICAgaXNXaXRoaW46IChjb250YWluZXIpID0+IG1vdW50ZWROb2Rlcy5sZW5ndGggPiAwID8gbW91bnRlZE5vZGVzLnNvbWUoKG4pID0+IGNvbnRhaW5lci5jb250YWlucyhuKSkgOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtYWRhcHRpdmUtY2xpZW50LW1vZHVsZT1cIiR7Y3NzRXNjYXBlKG1vZHVsZUlkKX1cIl1gKTtcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmIChtb3VudGVkQ2xpZW50Qm91bmRhcmllcy5oYXMobm9kZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGV4cG9ydE5hbWUgPSBub2RlLmRhdGFzZXQuYWRhcHRpdmVDbGllbnRFeHBvcnQgfHwgXCJkZWZhdWx0XCI7XG4gICAgICAgIGNvbnN0IG1vZGUgPSBub2RlLmRhdGFzZXQuYWRhcHRpdmVDbGllbnRNb2RlIHx8IFwiY2xpZW50XCI7XG4gICAgICAgIGNvbnN0IGJvdW5kYXJ5SWQgPSBub2RlLmdldEF0dHJpYnV0ZShIWURSQVRJT05fQk9VTkRBUllfSURfQVRUUikgPz8gXCJcIjtcbiAgICAgICAgY29uc3QgQ29tcG9uZW50ID0gZXhwb3J0c01hcFtleHBvcnROYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiBDb21wb25lbnQgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgcmF3UHJvcHMgPSBub2RlLmRhdGFzZXQuYWRhcHRpdmVDbGllbnRQcm9wcztcbiAgICAgICAgY29uc3QgcHJvcHMgPSByYXdQcm9wcyA/IHBhcnNlQ2xpZW50UHJvcHMocmF3UHJvcHMpIDoge307XG4gICAgICAgIGlmIChub2RlLmRhdGFzZXQuYWRhcHRpdmVDbGllbnRIYXNDaGlsZHJlbiA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gbW9kZSA9PT0gXCJoeWRyYXRlXCIgPyBjcmVhdGVFbGVtZW50KEhZRFJBVEVfU0xPVF9UQUcsIHsgaHlkcmF0ZTogdHJ1ZSB9KSA6IEFycmF5LmZyb20obm9kZS5jaGlsZE5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmV2ID0gY2xpZW50Qm91bmRhcnlTY29wZXMuZ2V0KG5vZGUpO1xuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgY2xlYW51cEV2ZW50c1Njb3BlKHByZXYuc2NvcGUpO1xuICAgICAgICAgICAgY2xlYW51cEhhbmRsZXJTY29wZShwcmV2LmhhbmRsZXJTY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgbW91bnRlZENsaWVudEJvdW5kYXJpZXMuYWRkKG5vZGUpO1xuICAgICAgICBjb25zdCBuZXh0SGFuZGxlclNjb3BlID0gY3JlYXRlSGFuZGxlclNjb3BlKGBoYW5kbGVyOiR7bW9kdWxlSWR9OiR7ZXhwb3J0TmFtZX1gKTtcbiAgICAgICAgY29uc3QgbmV4dFNjb3BlID0gY3JlYXRlRXZlbnRzU2NvcGUoYGNsaWVudDoke21vZHVsZUlkfToke2V4cG9ydE5hbWV9YCk7XG4gICAgICAgIGNvbnN0IG1vdW50ZWROb2RlcyA9IHJ1bldpdGhFZmZlY3RTY29wZShuZXh0U2NvcGUsICgpID0+IHJ1bldpdGhIYW5kbGVyU2NvcGUobmV4dEhhbmRsZXJTY29wZSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1vZGUgPT09IENMSUVOVF9CT1VOREFSWV9NT0RFX0NMSUVOVClcbiAgICAgICAgICAgICAgICByZXR1cm4gbW91bnRDbGllbnRDb21wb25lbnQobm9kZSwgQ29tcG9uZW50LCBwcm9wcyk7XG4gICAgICAgICAgICBpZiAobW9kZSA9PT0gQ0xJRU5UX0JPVU5EQVJZX01PREVfSFlEUkFURSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaHlkcmF0ZUV4aXN0aW5nQ29tcG9uZW50KG5vZGUsIENvbXBvbmVudCwgcHJvcHMsIGJvdW5kYXJ5SWQpO1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9KSk7XG4gICAgICAgIGNsaWVudEJvdW5kYXJ5U2NvcGVzLnNldChub2RlLCB7XG4gICAgICAgICAgICBzY29wZTogbmV4dFNjb3BlLCBoYW5kbGVyU2NvcGU6IG5leHRIYW5kbGVyU2NvcGUsXG4gICAgICAgICAgICBpc0Nvbm5lY3RlZDogKCkgPT4gbW91bnRlZE5vZGVzLmxlbmd0aCA+IDAgPyBtb3VudGVkTm9kZXMuc29tZSgoYykgPT4gYy5pc0Nvbm5lY3RlZCkgOiBub2RlLmlzQ29ubmVjdGVkLFxuICAgICAgICAgICAgaXNXaXRoaW46IChjb250YWluZXIpID0+IG1vdW50ZWROb2Rlcy5sZW5ndGggPiAwID8gbW91bnRlZE5vZGVzLnNvbWUoKGMpID0+IGNvbnRhaW5lci5jb250YWlucyhjKSkgOiBjb250YWluZXIuY29udGFpbnMobm9kZSlcbiAgICAgICAgfSk7XG4gICAgICAgIGNsZWFudXBDbGllbnRCb3VuZGFyeUF0dHJpYnV0ZXMobm9kZSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvKlxuICogQ29weXJpZ2h0IChjKSAyMDI2IEFudG9uaW8gSm9obmF0aGFuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICpcbiAqIFBvbnRvIGRlIGVudHJhZGEgZG8gcnVudGltZSB3ZWIuIEFzIGZ1bsOnw7VlcyBleHBvcnRhZGFzIGFxdWkgc8OjbyBvIGNvbnRyYXRvXG4gKiBjb20gbyBjaTogbyBidWlsZCBpbmpldGEgY2hhbWFkYXMgYSBlbGFzIG5vIGJ1bmRsZSBnZXJhZG8gKG1hcmtDbGllbnRFeHBvcnQsXG4gKiBoeWRyYXRlQ2xpZW50Q29tcG9uZW50cywgY2FsbFNlcnZlckFjdGlvbiksIGVudMOjbyBvIG5vbWUgZSBhIGFzc2luYXR1cmEgc8Ojb1xuICogcGFydGUgZG8gY29udHJhdG8gZSBuw6NvIHBvZGVtIG11ZGFyIHNlbSBxdWVicmFyIG8gYnVpbGQgZ2VyYWRvLlxuICovXG5pbXBvcnQgeyBDTElFTlRfQk9VTkRBUllfTU9ERV9DTElFTlQsIENMSUVOVF9CT1VOREFSWV9NT0RFX0hZRFJBVEUsIENMSUVOVF9DT01QT05FTlRfU1lNQk9MLCB9IGZyb20gXCJAYWRhcHRpdmUtanMvc2hhcmVkXCI7XG5pbXBvcnQgeyBjcmVhdGVCb3VuZGFyeUNvbXBvbmVudCB9IGZyb20gXCIuL2h5L2JvdW5kYXJ5L2ZhY3RvcnkuanNcIjtcbmltcG9ydCB7IHdyYXBIeWRyYXRlUHJvcHNGb3JTZXJ2ZXIgfSBmcm9tIFwiLi9oeS9ib3VuZGFyeS9pbmRleC5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vanN4LXJ1bnRpbWUuanNcIjtcbmV4cG9ydCB7IEZyYWdtZW50IH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy9qc3hcIjtcbmV4cG9ydCB7IGdldENsaWVudENvbXBvbmVudE1ldGFkYXRhIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy9zaGFyZWRcIjtcbi8qKlxuICogTWFyY2EgdW0gZXhwb3J0IGNvbW8gY29tcG9uZW50ZSBjbGllbnQvaHlkcmF0ZS5cbiAqIE8gY2kgaW5qZXRhIGVzdGEgY2hhbWFkYSBubyByb2RhcMOpIGRlIGNhZGEgbcOzZHVsbyBjb20gZGlyZXRpdmEsXG4gKiBkZXBvaXMgcXVlIGEgZGlyZXRpdmEgw6kgcmVtb3ZpZGEgZG8gY8OzZGlnby5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcmtDbGllbnRFeHBvcnQodmFsdWUsIG1vZHVsZUlkLCBleHBvcnROYW1lLCBtb2RlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm47XG4gICAgdmFsdWVbQ0xJRU5UX0NPTVBPTkVOVF9TWU1CT0xdID0ge1xuICAgICAgICBtb2R1bGVJZCxcbiAgICAgICAgZXhwb3J0TmFtZSxcbiAgICAgICAgbW9kZSxcbiAgICB9O1xufVxuLyoqXG4gKiBFeGVjdXRhZG8gbm8gYnVuZGxlIGRvIGNsaWVudCBwYXJhIGxvY2FsaXphciBvcyBjb21wb25lbnRlcyBtYXJjYWRvcy5cbiAqIEEgaW1wbGVtZW50YcOnw6NvIHJlYWwgdml2ZSBlbSBoeS9ib3VuZGFyeTogZWxhIHZhcnJlIG9zIGNvbWVudMOhcmlvc1xuICogPCEtLWFkYXB0aXZlLWNsaWVudC0qLT4gcXVlIG8gU1NSIGRlaXhvdSBubyBIVE1MLCBtb250YSBhcyBpc2xhbmRzIFwiY2xpZW50XCIgZVxuICogaGlkcmF0YSBhcyBcImh5ZHJhdGVcIiByZXVzaW5nIG9zIG7Ds3MgcXVlIG8gc2Vydmlkb3IgasOhIHJlbmRlcml6b3UuXG4gKlxuICogQ29udGludWEgc2VuZG8gZXhlY3V0YWRvIHPDsyBubyBidW5kbGUgZG8gYnJvd3NlciAtIG5vIFNTUiBwdXJvIG5hZGEgY2hhbWFcbiAqIGlzdG8sIGUgaHkvYm91bmRhcnkgbsOjbyB0b2NhIGVtIHdpbmRvdy9kb2N1bWVudCBubyB0b3BvIGRvIG3Ds2R1bG8uXG4gKi9cbmV4cG9ydCB7IGh5ZHJhdGVDbGllbnRDb21wb25lbnRzIH0gZnJvbSBcIi4vaHkvYm91bmRhcnkvaW5kZXguanNcIjtcbmV4cG9ydCB7IEhZRFJBVElPTl9FUlJPUl9FVkVOVCwgSFlEUkFUSU9OX01JU01BVENIX0VWRU5ULCBjbGVhckh5ZHJhdGlvbk1pc21hdGNoZXMsIGdldEh5ZHJhdGlvbk1pc21hdGNoZXMsIHJlcG9ydEh5ZHJhdGlvbkVycm9yLCB3YXJuTWlzbWF0Y2gsIH0gZnJvbSBcIi4vaHkvaHlkcmF0ZS9taXNtYXRjaC5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vZnJvbnQvaGFuZGxlci1zY29wZS5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vZnJvbnQvY29udGV4dC1ydW50aW1lLmpzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9mcm9udC9yb3V0ZXIuanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3JlYWN0aXZlL2luZGV4LmpzXCI7XG5leHBvcnQgeyBjYWxsU2VydmVyQWN0aW9uIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy9zaGFyZWRcIjtcbmV4cG9ydCB7IGlzQ2xpZW50RW5hYmxlZCwgRU5BQkxFRF9DTElFTlRfRkxBRyB9IGZyb20gXCIuL2h5L2JvdW5kYXJ5L2Rldi1sb2dzLmpzXCI7XG4vKipcbiAqIE1hcmNhIHVtIGV4cG9ydCBjb21vIGNvbXBvbmVudGUgXCJjbGllbnRcIiBlIGRldm9sdmUgbyB2bm9kZSBxdWUgbyBTU1JcbiAqIHRyYW5zZm9ybWEgbm8gbWFyY2Fkb3IgZGEgaWxoYS5cbiAqXG4gKiBPIGNvZGVnZW4gc2VtcHJlIHBhc3NhIGEgaW1wbGVtZW50YWNhbyBjb21vIHNlcnZlclJlbmRlciBub3MgZG9pcyBtb2RvcywgZVxuICogcXVlbSBkZWNpZGUgc2UgZWxhIHJvZGEgbm8gc2Vydmlkb3IgZSBhIGZsYWcgQURBUFRJVkVfRU5BQkxFRF9DTElFTlQ6XG4gKiBcImNsaWVudFwiIHNvIHNlcnZlci1yZW5kZXJpemEgY29tIGEgZmxhZyBsaWdhZGEsIGRlc2xpZ2FkYSBjYWkgbnVtXG4gKiBwbGFjZWhvbGRlci4gVmVyIGZhY3RvcnkudHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDbGllbnRDb21wb25lbnQobW9kdWxlSWQsIGV4cG9ydE5hbWUgPSBcImRlZmF1bHRcIiwgc2VydmVyUmVuZGVyKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJvdW5kYXJ5Q29tcG9uZW50KHtcbiAgICAgICAgbW9kZTogQ0xJRU5UX0JPVU5EQVJZX01PREVfQ0xJRU5ULFxuICAgICAgICBtb2R1bGVJZCxcbiAgICAgICAgZXhwb3J0TmFtZSxcbiAgICAgICAgc2VydmVyUmVuZGVyXG4gICAgfSk7XG59XG4vKipcbiAqIE1hcmNhIHVtIGV4cG9ydCBjb21vIGNvbXBvbmVudGUgXCJoeWRyYXRlXCI6IG8gc2VydmVyIHJlbmRlcml6YSBlIG8gY2xpZW50XG4gKiBhc3N1bWUgZGVwb2lzIHNvYnJlIG8gRE9NIGV4aXN0ZW50ZS4gc2VydmVyUmVuZGVyIGFxdWkgZSBvIFNTUiBkYSBpbGhhLCBlXG4gKiByb2RhIG1lc21vIGNvbSBBREFQVElWRV9FTkFCTEVEX0NMSUVOVCBkZXNsaWdhZGEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIeWRyYXRlQ29tcG9uZW50KG1vZHVsZUlkLCBleHBvcnROYW1lID0gXCJkZWZhdWx0XCIsIHNlcnZlclJlbmRlcikge1xuICAgIHJldHVybiBjcmVhdGVCb3VuZGFyeUNvbXBvbmVudCh7XG4gICAgICAgIG1vZGU6IENMSUVOVF9CT1VOREFSWV9NT0RFX0hZRFJBVEUsXG4gICAgICAgIG1vZHVsZUlkLFxuICAgICAgICBleHBvcnROYW1lLFxuICAgICAgICBzZXJ2ZXJSZW5kZXIsXG4gICAgICAgIHdyYXBTZXJ2ZXJQcm9wczogd3JhcEh5ZHJhdGVQcm9wc0ZvclNlcnZlclxuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxNQUFhLDBCQUEwQjtBQUV2QyxNQUFhLDZCQUE2Qjs7OztBQ0YxQyxNQUFhLDBCQUEwQixPQUFPLElBQUksMkJBQTJCO0FBQzdFLE1BQWEsc0JBQXNCO0FBQ25DLE1BQWEsOEJBQThCO0FBQzNDLE1BQWEsK0JBQStCO0FBQzVDLE1BQWEsK0JBQStCO0FBQzVDLE1BQWEsc0JBQXNCO0FBQ25DLE1BQWEsdUJBQXVCO0FBQ3BDLE1BQWEscUJBQXFCO0FBQ2xDLE1BQWEsd0JBQXdCO0FBQ3JDLE1BQWEsc0JBQXNCO0FBQ25DLE1BQWEsc0JBQXNCO0FBQ25DLE1BQWEsb0JBQW9CO0FBQ2pDLE1BQWEsdUJBQXVCO0FBQ3BDLE1BQWEscUJBQXFCO0FBQ2xDLE1BQWEsbUJBQW1CO0FBR2hDLFNBQWdCLG9CQUFvQixLQUFLO0NBQ3JDLE9BQU8sUUFBUTtBQUNuQjtBQUNBLFNBQWdCLGlCQUFpQixLQUFLO0NBQ2xDLE9BQU8sUUFBUTtBQUNuQjs7OztBQ3RCQSxNQUFNLHNEQUFzQyxJQUFJLElBQUk7Q0FDaEQ7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtBQUNKLENBQUM7QUFDRCxTQUFnQixvQ0FBb0MsS0FBSztDQUNyRCxPQUFPLENBQUMsb0NBQW9DLElBQUksR0FBRztB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