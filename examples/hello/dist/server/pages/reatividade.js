import { ClientComponet } from "../components/client.js";
import { ClienteAninhado, ClienteBatch, ClienteClasse, ClienteCondicional, ClienteListaMap, ClienteListaReorder, ClienteMemo, ClienteStore, ClienteTernario, ClienteTexto } from "../components/reactive-client.js";
import { HydrateBatch, HydrateCondicional, HydrateEfeito, HydrateListaMap, HydrateListaObjetos, HydrateListaReorder, HydrateMemo, HydrateQuebra, HydrateRecebeProps, HydrateStore, HydrateTernario } from "../components/reactive-hydrate.js";
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
/**
* Página de teste de reatividade.
*
* Divido client e hydrate em seções porque o ponto de partida é diferente:
* o hydrate chega com HTML do servidor, o client chega vazio.
*
* Como ler os resultados:
* - Hydrate: todo valor inicial TEM de estar na tela antes de clicar.
* - Client: as ilhas só existem depois que o bundle roda.
*
* Cada caso tem data-teste no elemento raiz. Abre o devtools, filtra por
* `[data-teste]` e vai clicando.
*/
export default function ReatividadePage() {
	return /* @__PURE__ */ _jsxs("div", { children: [
		/* @__PURE__ */ _jsx("h1", { children: "Reatividade" }),
		/* @__PURE__ */ _jsxs("p", { children: [
			"Valor dinâmico dentro de thunk: ",
			/* @__PURE__ */ _jsx("code", { children: "{() => x()}" }),
			" para filho, ",
			/* @__PURE__ */ _jsx("code", { children: "attr={() => x()}" }),
			" para atributo. Sem o thunk a leitura é estática."
		] }),
		/* @__PURE__ */ _jsxs("section", { children: [
			/* @__PURE__ */ _jsx("h2", { children: "Hydrate" }),
			/* @__PURE__ */ _jsx("p", { children: "Chegam renderizados pelo servidor. O valor inicial tem de estar na tela." }),
			/* @__PURE__ */ _jsx(HydrateTernario, {}),
			/* @__PURE__ */ _jsx(HydrateListaMap, {}),
			/* @__PURE__ */ _jsx(HydrateListaReorder, {}),
			/* @__PURE__ */ _jsx(HydrateListaObjetos, {}),
			/* @__PURE__ */ _jsx(HydrateMemo, {}),
			/* @__PURE__ */ _jsx(HydrateStore, {}),
			/* @__PURE__ */ _jsx(HydrateBatch, {}),
			/* @__PURE__ */ _jsx(HydrateCondicional, {}),
			/* @__PURE__ */ _jsx(HydrateRecebeProps, {
				titulo: "título do servidor",
				valor: 7
			}),
			/* @__PURE__ */ _jsx(HydrateEfeito, {}),
			/* @__PURE__ */ _jsx(HydrateQuebra, {})
		] }),
		/* @__PURE__ */ _jsxs("section", { children: [
			/* @__PURE__ */ _jsx("h2", { children: "Client" }),
			/* @__PURE__ */ _jsx("p", { children: "Chegam vazios e são montados pelo bundle no browser." }),
			/* @__PURE__ */ _jsx(ClienteTernario, {}),
			/* @__PURE__ */ _jsx(ClienteListaMap, {}),
			/* @__PURE__ */ _jsx(ClienteListaReorder, {}),
			/* @__PURE__ */ _jsx(ClienteMemo, {}),
			/* @__PURE__ */ _jsx(ClienteStore, {}),
			/* @__PURE__ */ _jsx(ClienteBatch, {}),
			/* @__PURE__ */ _jsx(ClienteCondicional, {}),
			/* @__PURE__ */ _jsx(ClienteClasse, {}),
			/* @__PURE__ */ _jsx(ClienteAninhado, {}),
			/* @__PURE__ */ _jsx(ClienteTexto, {})
		] }),
		/* @__PURE__ */ _jsxs("section", { children: [
			/* @__PURE__ */ _jsx("h2", { children: "Client dentro de hydrate" }),
			/* @__PURE__ */ _jsx("p", { children: "Se as ilhas se sobrescrevem, aparece conteúdo duplicado." }),
			/* @__PURE__ */ _jsx(HydrateTernario, {}),
			/* @__PURE__ */ _jsx(ClientComponet, {})
		] })
	] });
}

//# sourceMappingURL=reatividade.js.map
