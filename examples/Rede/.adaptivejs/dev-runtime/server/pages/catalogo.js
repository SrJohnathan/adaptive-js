import { auth } from "../auth.js?t=1791414636356";
import { AppShell } from "../components/omni-hub/app-shell.js?t=1791414636356";
import { CatalogScreen } from "../components/omni-hub/catalog-screen.js?t=1791414636356";
import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
export default auth.protectPage(async () => {
	return /* @__PURE__ */ _jsx(AppShell, {
		active: "catalogo-erp",
		children: /* @__PURE__ */ _jsx(CatalogScreen, {})
	});
});

//# sourceMappingURL=catalogo.js.map
