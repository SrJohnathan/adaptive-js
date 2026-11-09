import { AppShell } from "../components/omni-hub/app-shell.js?t=1791414636356";
import { ChatScreen } from "../components/omni-hub/chat-screen.js?t=1791414636356";
import { ContextSocket } from "../features/chat/ContextSocket.js?t=1791414636356";
import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
// `auth.protectPage` desativado por enquanto: o hydration do RecyclerView
// precisa ser inspecionado sem passar pela sessão.
export default async function IndexPage() {
	return /* @__PURE__ */ _jsx(AppShell, {
		active: "chat-omnichannel",
		children: /* @__PURE__ */ _jsx(ContextSocket, { children: /* @__PURE__ */ _jsx(ChatScreen, {}) })
	});
}

//# sourceMappingURL=index.js.map
