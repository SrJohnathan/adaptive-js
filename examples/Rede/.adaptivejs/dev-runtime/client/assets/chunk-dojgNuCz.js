//#region src/shared/avatar.ts
const PROTOCOLOS_PERMITIDOS = /* @__PURE__ */ new Set(["http:", "https:"]);
/**
* Só devolve o avatar se for uma URL http(s) de verdade.
*
* `avatar` é texto livre no dominio: pode chegar emoji ("🎂"), nome de
* arquivo ou lixo. Renderizar isso em `<img src>` faz o browser resolver
* a string contra a origem atual e pedir `https://host/<valor>` — um 404
* a cada re-render. Aqui devolvemos `null` e o chamador usa a inicial.
*/
function avatarUrl(valor) {
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
function iniciais(nome) {
	const primeiro = nome?.trim().charAt(0);
	return primeiro ? primeiro.toUpperCase() : "?";
}

//#endregion
export { iniciais as n, avatarUrl as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstZG9qZ051Q3ouanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9hdmF0YXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUFJPVE9DT0xPU19QRVJNSVRJRE9TID0gbmV3IFNldChbXCJodHRwOlwiLCBcImh0dHBzOlwiXSk7XG5cbi8qKlxuICogU8OzIGRldm9sdmUgbyBhdmF0YXIgc2UgZm9yIHVtYSBVUkwgaHR0cChzKSBkZSB2ZXJkYWRlLlxuICpcbiAqIGBhdmF0YXJgIMOpIHRleHRvIGxpdnJlIG5vIGRvbWluaW86IHBvZGUgY2hlZ2FyIGVtb2ppIChcIvCfjoJcIiksIG5vbWUgZGVcbiAqIGFycXVpdm8gb3UgbGl4by4gUmVuZGVyaXphciBpc3NvIGVtIGA8aW1nIHNyYz5gIGZheiBvIGJyb3dzZXIgcmVzb2x2ZXJcbiAqIGEgc3RyaW5nIGNvbnRyYSBhIG9yaWdlbSBhdHVhbCBlIHBlZGlyIGBodHRwczovL2hvc3QvPHZhbG9yPmAg4oCUIHVtIDQwNFxuICogYSBjYWRhIHJlLXJlbmRlci4gQXF1aSBkZXZvbHZlbW9zIGBudWxsYCBlIG8gY2hhbWFkb3IgdXNhIGEgaW5pY2lhbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF2YXRhclVybCh2YWxvcjogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGJydXRvID0gdmFsb3I/LnRyaW0oKTtcbiAgICBpZiAoIWJydXRvKSByZXR1cm4gbnVsbDtcblxuICAgIGxldCB1cmw6IFVSTDtcbiAgICB0cnkge1xuICAgICAgICB1cmwgPSBuZXcgVVJMKGJydXRvKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFQUk9UT0NPTE9TX1BFUk1JVElET1MuaGFzKHVybC5wcm90b2NvbCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcbn1cblxuLyoqIEluaWNpYWwgcGFyYSBvIGZhbGxiYWNrIGRvIGF2YXRhci4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmljaWFpcyhub21lOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICBjb25zdCBwcmltZWlybyA9IG5vbWU/LnRyaW0oKS5jaGFyQXQoMCk7XG4gICAgcmV0dXJuIHByaW1laXJvID8gcHJpbWVpcm8udG9VcHBlckNhc2UoKSA6IFwiP1wiO1xufVxuIl0sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSx3Q0FBd0IsSUFBSSxJQUFJLENBQUMsU0FBUyxRQUFRLENBQUM7Ozs7Ozs7OztBQVV6RCxTQUFnQixVQUFVLE9BQWlEO0NBQ3ZFLE1BQU0sUUFBUSxPQUFPLEtBQUs7Q0FDMUIsSUFBSSxDQUFDLE9BQU8sT0FBTztDQUVuQixJQUFJO0NBQ0osSUFBSTtFQUNBLE1BQU0sSUFBSSxJQUFJLEtBQUs7Q0FDdkIsUUFBUTtFQUNKLE9BQU87Q0FDWDtDQUVBLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLFFBQVEsR0FBRyxPQUFPO0NBQ3JELE9BQU8sSUFBSSxTQUFTO0FBQ3hCOztBQUdBLFNBQWdCLFNBQVMsTUFBeUM7Q0FDOUQsTUFBTSxXQUFXLE1BQU0sS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO0NBQ3RDLE9BQU8sV0FBVyxTQUFTLFlBQVksSUFBSTtBQUMvQyJ9