import { Header } from "./header.js";
import { Sidebar } from "./sidebar.js";
import { QuickNavFab } from "./quick-nav-fab.js";
import { CommandPalette } from "./command-palette.js";
import { ToastContainer } from "./toast-container.js";
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
export function AppShell({ active, children }) {
	return /* @__PURE__ */ _jsxs("div", {
		className: "min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans",
		children: [
			/* @__PURE__ */ _jsx(Header, {}),
			/* @__PURE__ */ _jsxs("div", {
				className: "flex flex-1 pt-16",
				children: [/* @__PURE__ */ _jsx(Sidebar, { active }), /* @__PURE__ */ _jsx("div", {
					className: "flex-1 md:ml-64 flex flex-col min-h-[calc(100vh-64px)] pb-16 md:pb-6 overflow-x-hidden",
					children
				})]
			}),
			/* @__PURE__ */ _jsx(QuickNavFab, { active }),
			/* @__PURE__ */ _jsx(CommandPalette, {}),
			/* @__PURE__ */ _jsx(ToastContainer, {})
		]
	});
}

//# sourceMappingURL=app-shell.js.map
