import { toasts } from "../../shared/omni-hub/toast-store.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
const TOAST_ICONS = {
	success: "check_circle",
	info: "info",
	warning: "warning",
	error: "error"
};
const TOAST_ICON_CLASSES = {
	success: "bg-primary-container/20 text-primary",
	info: "bg-primary-container/20 text-primary",
	warning: "bg-amber-100 text-amber-700",
	error: "bg-red-100 text-red-600"
};
export function ToastContainer() {
	return /* @__PURE__ */ _jsx("div", {
		className: "fixed bottom-6 right-6 z-[60] flex flex-col gap-2 pointer-events-none",
		children: () => toasts().length > 0 ? /* @__PURE__ */ _jsx("div", {
			className: "flex flex-col gap-2",
			children: toasts().map((toast) => /* @__PURE__ */ _jsxs("div", {
				className: "pointer-events-auto bg-surface-container-lowest text-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-outline-variant/30 animate-in fade-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ _jsx("div", {
					className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${TOAST_ICON_CLASSES[toast.type]}`,
					children: /* @__PURE__ */ _jsx("span", {
						className: "material-symbols-outlined text-[20px]",
						children: TOAST_ICONS[toast.type]
					})
				}), /* @__PURE__ */ _jsxs("div", {
					className: "flex flex-col text-left",
					children: [/* @__PURE__ */ _jsx("span", {
						className: "font-title-md font-bold text-on-surface",
						children: toast.title
					}), /* @__PURE__ */ _jsx("span", {
						className: "font-body-sm text-on-surface-variant",
						children: toast.message
					})]
				})]
			}, toast.id))
		}) : /* @__PURE__ */ _jsx(_Fragment, { children: " " })
	});
}

//# sourceMappingURL=toast-container.__client_ssr.js.map
