"server";
/**
* Ações de servidor para a diretriz "server".
*
* Este arquivo NUNCA deve aparecer no bundle do client. O build troca cada
* módulo assim por um proxy que faz RPC em /_action. Se o segredo abaixo
* aparecer no bundle, a diretiva não está segurando.
*/
const SEGREDO_DO_SERVIDOR = "tk_server_only_9f3a2b";
export const somar = async (a, b) => a + b;
export const eco = (msg) => ({
	recebido: msg,
	em: "servidor"
});
/** Serve para provar que o código não vaza para o client. */
export const lerSegredo = () => SEGREDO_DO_SERVIDOR;
/** O handler anexa o contexto como último argumento. */
export const verContexto = (_msg, ctx) => ({
	temContexto: Boolean(ctx),
	metodo: ctx?.request?.method ?? null,
	origem: ctx?.request?.headers?.origin ?? null
});
/** Ação que estoura: o handler deve devolver erro sem vazar stack em produção. */
export const falhar = () => {
	throw new Error("falha proposital dentro da server action");
};
/**
* Devolve a forma exata dos argumentos recebidos.
*
* Serve para provar que o FormData volta montado do outro lado: arquivo tem
* que chegar como File com nome e tamanho, e não como "[object File]".
*/
export const inspecionar = async (...args) => Promise.all(args.map((arg) => describe(arg)));
async function describe(value) {
	if (value === undefined) return { tipo: "undefined" };
	if (value === null) return { tipo: "null" };
	if (typeof File !== "undefined" && value instanceof File) {
		return {
			tipo: "File",
			nome: value.name,
			bytes: value.size,
			mime: value.type,
			texto: value.size <= 64 ? await value.text() : null
		};
	}
	if (typeof Blob !== "undefined" && value instanceof Blob) {
		return {
			tipo: "Blob",
			bytes: value.size,
			mime: value.type
		};
	}
	if (typeof FormData !== "undefined" && value instanceof FormData) {
		return {
			tipo: "FormData",
			entradas: [...value.entries()].map(([k, v]) => [k, typeof v === "string" ? v : `[arquivo ${v.name}]`])
		};
	}
	if (Array.isArray(value)) {
		return {
			tipo: "array",
			itens: await Promise.all(value.map(describe))
		};
	}
	if (typeof value === "object") {
		return {
			tipo: "objeto",
			chaves: Object.keys(value)
		};
	}
	return {
		tipo: typeof value,
		valor: value
	};
}

//# sourceMappingURL=index.js.map
