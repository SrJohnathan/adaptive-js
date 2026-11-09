import { auth } from "../auth.js";
import { AppShell } from "../components/omni-hub/app-shell.js";
import { StudioScreen } from "../components/omni-hub/studio-screen.js";
import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
export default auth.protectPage(async () => {
	return /* @__PURE__ */ _jsx(AppShell, {
		active: "estudio-banners",
		children: /* @__PURE__ */ _jsx(StudioScreen, {})
	});
});

//# sourceMappingURL=estudio.js.map
