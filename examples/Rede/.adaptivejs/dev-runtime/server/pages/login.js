import { redirect } from "@adaptive-js/web";
import { auth } from "../auth.js?t=1791414636356";
import { AuthScreen } from "../components/omni-hub/auth-screen.js?t=1791414636356";
import { ToastContainer } from "../components/omni-hub/toast-container.js?t=1791414636356";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
export default async function LoginPage(context) {
	// Se o usuário já tiver uma sessão ativa, redireciona diretamente para a home
	const { session } = await auth.readSession(context?.request ?? { headers: {} });
	if (session) {
		return redirect("/");
	}
	return /* @__PURE__ */ _jsxs(_Fragment, { children: [/* @__PURE__ */ _jsx(AuthScreen, {}), /* @__PURE__ */ _jsx(ToastContainer, {})] });
}

//# sourceMappingURL=login.js.map
