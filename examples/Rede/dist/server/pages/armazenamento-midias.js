import { auth } from "../auth.js";
import { AppShell } from "../components/omni-hub/app-shell.js";
import { StorageScreen } from "../components/omni-hub/storage-screen.js";
import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
export default auth.protectPage(async () => {
	return /* @__PURE__ */ _jsx(AppShell, {
		active: "armazenamento-midias",
		children: /* @__PURE__ */ _jsx(StorageScreen, {})
	});
});

//# sourceMappingURL=armazenamento-midias.js.map
