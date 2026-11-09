import { RecyclerView } from "@adaptive-js/components";
/**
* A lista é feita para hydrate: o servidor monta a estrutura (viewport, spacer
* e o pool de slots) e o client assume os mesmos nós para preencher o conteúdo.
*
* Os slots saem vazios do servidor porque ref não dispara no SSR — o
* bindSlot depende do host. O primeiro scheduleFlush no client é quem enche,
* reaproveitando os hosts que o servidor já deixou no lugar.
*
* Os controles e o contador também ficam aqui dentro porque eles dependem do
* mesmo estado da lista: separados, o servidor os renderizaria com outro
* snapshot e o client teria que substituir markup já hidratado.
*/
import { signal } from "@adaptive-js/web";
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
const TOTAL = 1e3;
const ITEM_HEIGHT = 32;
function makeRows(count) {
	return Array.from({ length: count }, (_, i) => ({
		id: i,
		label: `linha ${i}`,
		done: i % 7 === 0
	}));
}
export const ListaRecycler = () => {
	const [rows, setRows] = signal(makeRows(TOTAL));
	const [cliques, bumpCliques] = signal(0);
	const [ultimo, setUltimo] = signal("nenhum");
	const [vazio, setVazio] = signal(false);
	const getRows = () => vazio() ? [] : rows();
	return /* @__PURE__ */ _jsxs("div", {
		class: "page",
		children: [
			/* @__PURE__ */ _jsx("h1", { children: "RecyclerView" }),
			/* @__PURE__ */ _jsxs("div", {
				class: "controles",
				children: [/* @__PURE__ */ _jsx("button", {
					type: "button",
					onClick: () => setVazio((v) => !v),
					children: "alternar vazio"
				}), /* @__PURE__ */ _jsx("button", {
					type: "button",
					onClick: () => {
						setRows(rows().map((row) => ({
							...row,
							done: true
						})));
						bumpCliques((v) => v + 1);
					},
					children: "marcar todos"
				})]
			}),
			/* @__PURE__ */ _jsxs("p", {
				id: "estado",
				children: [
					"itens: ",
					() => getRows().length,
					" | cliques: ",
					() => cliques(),
					" | ultimo: ",
					() => ultimo()
				]
			}),
			/* @__PURE__ */ _jsx(RecyclerView, {
				items: getRows,
				itemHeight: ITEM_HEIGHT,
				height: 320,
				width: "100%",
				overscan: 3,
				getItemKey: (row) => row.id,
				emptyState: /* @__PURE__ */ _jsx("p", {
					id: "vazio",
					children: "nada aqui"
				}),
				onItemClick: (row) => {
					setUltimo(`${row.label} (id ${row.id})`);
					bumpCliques((v) => v + 1);
				},
				item: (row, index) => ({
					type: "div",
					class: () => `linha ${row.done ? "riscada" : ""} ${index === 0 ? "primeira" : ""}`,
					props: {
						"data-id": () => String(row.id),
						"data-indice": () => String(index),
						"data-pronta": () => row.done ? "sim" : "nao"
					},
					children: [{
						type: "span",
						class: "idx",
						value: () => `#${index}`
					}, {
						type: "span",
						class: "rotulo",
						value: () => row.label
					}]
				})
			})
		]
	});
};

//# sourceMappingURL=recycler-hydrate.__client_ssr.js.map
