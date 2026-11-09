const PROTOCOLOS_PERMITIDOS = new Set(["http:", "https:"]);
/**
* Só devolve o avatar se for uma URL http(s) de verdade.
*
* `avatar` é texto livre no dominio: pode chegar emoji ("🎂"), nome de
* arquivo ou lixo. Renderizar isso em `<img src>` faz o browser resolver
* a string contra a origem atual e pedir `https://host/<valor>` — um 404
* a cada re-render. Aqui devolvemos `null` e o chamador usa a inicial.
*/
export function avatarUrl(valor) {
	const bruto = valor?.trim();
	if (!bruto) return null;
	let url;
	try {
		url = new URL(bruto);
	} catch {
		return null;
	}
	if (!PROTOCOLOS_PERMITIDOS.has(url.protocol)) return null;
	return url.toString();
}
/** Inicial para o fallback do avatar. */
export function iniciais(nome) {
	const primeiro = nome?.trim().charAt(0);
	return primeiro ? primeiro.toUpperCase() : "?";
}

//# sourceMappingURL=avatar.js.map
