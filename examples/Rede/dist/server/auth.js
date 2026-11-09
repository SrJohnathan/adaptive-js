"server";
import { createAuth } from "@adaptive-js/extension-auth/server";
import { createExternalAuthAdapter } from "@adaptive-js/extension-auth/external-adapter";
import "./security.js";
// Tudo entra pelo gateway de dev (server/gateway-dev, porta 4000): ele
// repassa /api/v1/auth para o serviço de auth. Apontar direto para a porta do
// serviço só faz sentido fora do dev.
const AUTH_SERVICE_URL = process.env?.AUTH_SERVICE_URL ?? "http://localhost:4000";
function mapServiceUser(payload) {
	const data = payload?.user;
	return {
		id: String(data?.id ?? ""),
		email: String(data?.email ?? ""),
		name: String(data?.name ?? data?.email ?? "Usuário"),
		roles: Array.isArray(data?.roles) ? data.roles.map(String) : []
	};
}
function mapServiceToken(payload) {
	const token = payload?.token;
	return typeof token === "string" && token.length > 0 ? token : undefined;
}
/**
* Adapter externo: conecta diretamente com o microserviço de auth (Rust/Axum)
* para login, registro e tokens, e gerencia as sessões locais no AdaptiveJS.
*
* Você pode usar baseUrl diretamente (o adapter faz o fetch automático de /login e /register)
* OU fornecer uma função `request: async (creds) => ...` customizada se preferir.
*/
export const adapter = createExternalAuthAdapter({
	baseUrl: AUTH_SERVICE_URL,
	loginPath: "/api/v1/auth/login",
	registerPath: "/api/v1/auth/register",
	// Custom request: dá controle total sobre a chamada HTTP para o login.
	// (Sem `request`, o adapter usa baseUrl + loginPath automaticamente.)
	request: async ({ email, password }) => {
		const res = await fetch(`${AUTH_SERVICE_URL}/api/v1/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				password
			})
		});
		if (!res.ok) {
			const text = await res.text().catch(() => String(res.status));
			throw new Error(`[ExternalAuthAdapter] HTTP ${res.status} from ${AUTH_SERVICE_URL}/api/v1/auth/login — ${text}`);
		}
		const data = await res.json();
		return {
			user: mapServiceUser(data),
			token: mapServiceToken(data)
		};
	},
	mapUser: mapServiceUser,
	mapToken: mapServiceToken
});
/**
* Auth server-side do app.
*
* Utiliza diretamente o adapter externo configurado acima.
*/
export const auth = createAuth({
	adapter,
	cookie: {
		name: "adaptive.session.dev",
		secure: false,
		httpOnly: false
	},
	csrf: { allowedOrigins: ["http://localhost:3000", "http://localhost:4000"] },
	onAuditEvent(event) {
		console.info(`[auth] ${event.type}`, {
			sessionId: event.sessionId,
			userId: event.userId,
			reason: event.reason
		});
	}
});

//# sourceMappingURL=auth.js.map
