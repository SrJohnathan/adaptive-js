import { SkeletonLoader } from "@adaptive-js/components";
import { somar } from "../actions/index.js?t=1791415595788";
import { events, signal } from "@adaptive-js/web";
import { ClientComponet } from "./client.js?t=1791415595788";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
export const HydrateComponet = () => {
	const [test, setTest] = signal(0);
	events(() => {
		console.log(test());
	});
	return /* @__PURE__ */ _jsx("div", {
		onClick: () => {
			somar(5, 10).then((value) => setTest(value));
		},
		children: "Hydrate Render"
	});
};
export const HydrateComponetChildClient = () => {
	return /* @__PURE__ */ _jsxs("div", { children: [
		/* @__PURE__ */ _jsx("div", { children: "Hydrate Render Filho" }),
		/* @__PURE__ */ _jsx(SkeletonLoader, {
			theme: "light",
			animated: true,
			variant: "rectangular"
		}),
		/* @__PURE__ */ _jsx(ClientComponet, {})
	] });
};
export const HydrateComponetErrorDigito = () => {
	return /* @__PURE__ */ _jsx(_Fragment, { children: /* @__PURE__ */ _jsx("div", { children: "Hydrate Render" }) });
};

//# sourceMappingURL=hydrate.__client_ssr.js.map
