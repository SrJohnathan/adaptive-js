"server";
const BASE_URL = (process.env?.AUTH_SERVICE_URL ?? "http://localhost:4000").replace(/\/+$/, "");
/**
* Revoga o token do microserviço de auth no logout.
*
* A validação de credenciais (login/register) usa o provider nativo
* `createExternalProvider` — este módulo só cobre o que o provider não
* expõe: invalidar o token no servidor de origem.
*/
export async function revokeAuthToken(token) {
	await fetch(`${BASE_URL}/api/v1/auth/logout`, {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
		signal: AbortSignal.timeout(5e3)
	});
}

//# sourceMappingURL=auth-service.js.map
