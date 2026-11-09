import { auth } from "../auth.js?t=1791414636356";
import { AppShell } from "../components/omni-hub/app-shell.js?t=1791414636356";
import { StorageScreen } from "../components/omni-hub/storage-screen.js?t=1791414636356";
import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
export default auth.protectPage(async () => {
	return /* @__PURE__ */ _jsx(AppShell, {
		active: "armazenamento-midias",
		children: /* @__PURE__ */ _jsx(StorageScreen, {})
	});
});

//# sourceMappingURL=armazenamento-midias.js.map
