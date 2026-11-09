"server";
import { auth } from "../../auth.js?t=1791414636356";
/**
* Server action que expõe, apenas para o cliente autenticado, o token do
* microserviço de auth e os dados do agente logado.
*
* O token nunca é lido do cookie no browser: ele é resolvido no servidor a
* partir da sessão AdaptiveJS e devolvido por RPC, mantendo a checagem de
* sessão no server (o realtime valida o mesmo token em `GET /api/v1/auth/me`).
*/
export async function realtimeCredentialsAction(context) {
	const read = await auth.readSession(context?.request ?? { headers: {} });
	const session = read.session;
	if (!session) {
		return {
			token: "",
			user: "",
			email: ""
		};
	}
	return {
		token: session.data?.authToken ?? "",
		user: session.user?.name ?? "",
		email: session.user?.email ?? ""
	};
}

//# sourceMappingURL=realtime.js.map
