import { _ as jsx, a as signal, b as __exportAll, n as hydrateClientComponents, t as markClientExport, v as jsxs } from "./chunk-i_LCywE4.js";
import { t as RecyclerView } from "./chunk-BA1xHxXS.js";

//#region src/components/recycler-hydrate.tsx
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
var recycler_hydrate_exports = /* @__PURE__ */ __exportAll({ ListaRecycler: () => ListaRecycler });
const TOTAL = 1e3;
const ITEM_HEIGHT = 32;
function makeRows(count) {
	return Array.from({ length: count }, (_, i) => ({
		id: i,
		label: `linha ${i}`,
		done: i % 7 === 0
	}));
}
const ListaRecycler = () => {
	const [rows, setRows] = signal(makeRows(TOTAL));
	const [cliques, bumpCliques] = signal(0);
	const [ultimo, setUltimo] = signal("nenhum");
	const [vazio, setVazio] = signal(false);
	const getRows = () => vazio() ? [] : rows();
	return /* @__PURE__ */ jsxs("div", {
		class: "page",
		children: [
			/* @__PURE__ */ jsx("h1", { children: "RecyclerView" }),
			/* @__PURE__ */ jsxs("div", {
				class: "controles",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setVazio((v) => !v),
					children: "alternar vazio"
				}), /* @__PURE__ */ jsx("button", {
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
			/* @__PURE__ */ jsxs("p", {
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
			/* @__PURE__ */ jsx(RecyclerView, {
				items: getRows,
				itemHeight: ITEM_HEIGHT,
				height: 320,
				width: "100%",
				overscan: 3,
				getItemKey: (row) => row.id,
				emptyState: /* @__PURE__ */ jsx("p", {
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
typeof ListaRecycler === "function" && markClientExport(ListaRecycler, "components/recycler-hydrate", "ListaRecycler", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791415595625-cveadg/temp/client-components/components__recycler-hydrate.tsx
hydrateClientComponents("components/recycler-hydrate", recycler_hydrate_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktdWwwSU1hQUguanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9yZWN5Y2xlci1oeWRyYXRlLnRzeCIsIi4uLy4uL3RlbXAvY2xpZW50LWNvbXBvbmVudHMvY29tcG9uZW50c19fcmVjeWNsZXItaHlkcmF0ZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ2h5ZHJhdGUnXG5pbXBvcnQge1JlY3ljbGVyVmlld30gZnJvbSBcIkBhZGFwdGl2ZS1qcy9jb21wb25lbnRzXCI7XG4vKipcbiAqIEEgbGlzdGEgw6kgZmVpdGEgcGFyYSBoeWRyYXRlOiBvIHNlcnZpZG9yIG1vbnRhIGEgZXN0cnV0dXJhICh2aWV3cG9ydCwgc3BhY2VyXG4gKiBlIG8gcG9vbCBkZSBzbG90cykgZSBvIGNsaWVudCBhc3N1bWUgb3MgbWVzbW9zIG7Ds3MgcGFyYSBwcmVlbmNoZXIgbyBjb250ZcO6ZG8uXG4gKlxuICogT3Mgc2xvdHMgc2FlbSB2YXppb3MgZG8gc2Vydmlkb3IgcG9ycXVlIHJlZiBuw6NvIGRpc3BhcmEgbm8gU1NSIOKAlCBvXG4gKiBiaW5kU2xvdCBkZXBlbmRlIGRvIGhvc3QuIE8gcHJpbWVpcm8gc2NoZWR1bGVGbHVzaCBubyBjbGllbnQgw6kgcXVlbSBlbmNoZSxcbiAqIHJlYXByb3ZlaXRhbmRvIG9zIGhvc3RzIHF1ZSBvIHNlcnZpZG9yIGrDoSBkZWl4b3Ugbm8gbHVnYXIuXG4gKlxuICogT3MgY29udHJvbGVzIGUgbyBjb250YWRvciB0YW1iw6ltIGZpY2FtIGFxdWkgZGVudHJvIHBvcnF1ZSBlbGVzIGRlcGVuZGVtIGRvXG4gKiBtZXNtbyBlc3RhZG8gZGEgbGlzdGE6IHNlcGFyYWRvcywgbyBzZXJ2aWRvciBvcyByZW5kZXJpemFyaWEgY29tIG91dHJvXG4gKiBzbmFwc2hvdCBlIG8gY2xpZW50IHRlcmlhIHF1ZSBzdWJzdGl0dWlyIG1hcmt1cCBqw6EgaGlkcmF0YWRvLlxuICovXG5cbmltcG9ydCB7IHNpZ25hbCB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5cblxuXG50eXBlIFJvdyA9IHsgaWQ6IG51bWJlcjsgbGFiZWw6IHN0cmluZzsgZG9uZTogYm9vbGVhbiB9O1xuXG5jb25zdCBUT1RBTCA9IDEwMDA7XG5jb25zdCBJVEVNX0hFSUdIVCA9IDMyO1xuXG5mdW5jdGlvbiBtYWtlUm93cyhjb3VudDogbnVtYmVyKTogUm93W10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBjb3VudCB9LCAoXywgaSkgPT4gKHtcbiAgICAgICAgaWQ6IGksXG4gICAgICAgIGxhYmVsOiBgbGluaGEgJHtpfWAsXG4gICAgICAgIGRvbmU6IGkgJSA3ID09PSAwLFxuICAgIH0pKTtcbn1cblxuZXhwb3J0IGNvbnN0IExpc3RhUmVjeWNsZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgW3Jvd3MsIHNldFJvd3NdID0gc2lnbmFsPFJvd1tdPihtYWtlUm93cyhUT1RBTCkpO1xuICAgIGNvbnN0IFtjbGlxdWVzLCBidW1wQ2xpcXVlc10gPSBzaWduYWwoMCk7XG4gICAgY29uc3QgW3VsdGltbywgc2V0VWx0aW1vXSA9IHNpZ25hbDxzdHJpbmc+KFwibmVuaHVtXCIpO1xuICAgIGNvbnN0IFt2YXppbywgc2V0VmF6aW9dID0gc2lnbmFsKGZhbHNlKTtcblxuICAgIGNvbnN0IGdldFJvd3MgPSAoKSA9PiAodmF6aW8oKSA/IFtdIDogcm93cygpKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlXCI+XG4gICAgICAgICAgICA8aDE+UmVjeWNsZXJWaWV3PC9oMT5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xlc1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFZhemlvKCh2KSA9PiAhdil9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBhbHRlcm5hciB2YXppb1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJvd3Mocm93cygpLm1hcChyb3cgPT4gKHsgLi4ucm93LCBkb25lOiB0cnVlIH0pKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBidW1wQ2xpcXVlcygodikgPT4gdiArIDEpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgbWFyY2FyIHRvZG9zXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHAgaWQ9XCJlc3RhZG9cIj5cbiAgICAgICAgICAgICAgICBpdGVuczogeygpID0+IGdldFJvd3MoKS5sZW5ndGh9IHwgY2xpcXVlczogeygpID0+IGNsaXF1ZXMoKX0gfFxuICAgICAgICAgICAgICAgIHVsdGltbzogeygpID0+IHVsdGltbygpfVxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8UmVjeWNsZXJWaWV3PFJvdz5cbiAgICAgICAgICAgICAgICBpdGVtcz17Z2V0Um93c31cbiAgICAgICAgICAgICAgICBpdGVtSGVpZ2h0PXtJVEVNX0hFSUdIVH1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezMyMH1cbiAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICAgIG92ZXJzY2FuPXszfVxuICAgICAgICAgICAgICAgIGdldEl0ZW1LZXk9eyhyb3cpID0+IHJvdy5pZH1cbiAgICAgICAgICAgICAgICBlbXB0eVN0YXRlPXs8cCBpZD1cInZhemlvXCI+bmFkYSBhcXVpPC9wPn1cbiAgICAgICAgICAgICAgICBvbkl0ZW1DbGljaz17KHJvdykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRVbHRpbW8oYCR7cm93LmxhYmVsfSAoaWQgJHtyb3cuaWR9KWApO1xuICAgICAgICAgICAgICAgICAgICBidW1wQ2xpcXVlcygodikgPT4gdiArIDEpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgaXRlbT17KHJvdywgaW5kZXgpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgYGxpbmhhICR7cm93LmRvbmUgPyBcInJpc2NhZGFcIiA6IFwiXCJ9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPT09IDAgPyBcInByaW1laXJhXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1pZFwiOiAoKSA9PiBTdHJpbmcocm93LmlkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1pbmRpY2VcIjogKCkgPT4gU3RyaW5nKGluZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS1wcm9udGFcIjogKCkgPT4gKHJvdy5kb25lID8gXCJzaW1cIiA6IFwibmFvXCIpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcImlkeFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAoKSA9PiBgIyR7aW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFwicm90dWxvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICgpID0+IHJvdy5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcbiIsIlxuaW1wb3J0ICogYXMgY2xpZW50TW9kdWxlIGZyb20gXCIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9yZWN5Y2xlci1oeWRyYXRlLnRzeFwiO1xuaW1wb3J0IHsgaHlkcmF0ZUNsaWVudENvbXBvbmVudHMgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuXG5oeWRyYXRlQ2xpZW50Q29tcG9uZW50cyhcImNvbXBvbmVudHMvcmVjeWNsZXItaHlkcmF0ZVwiLCBjbGllbnRNb2R1bGUpO1xuZXhwb3J0IHt9O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNLFFBQVE7QUFDZCxNQUFNLGNBQWM7QUFFcEIsU0FBUyxTQUFTLE9BQXNCO0NBQ3BDLE9BQU8sTUFBTSxLQUFLLEVBQUUsUUFBUSxNQUFNLElBQUksR0FBRyxPQUFPO0VBQzVDLElBQUk7RUFDSixPQUFPLFNBQVM7RUFDaEIsTUFBTSxJQUFJLE1BQU07Q0FDcEIsRUFBRTtBQUNOO0FBRUEsTUFBYSxzQkFBc0I7Q0FDL0IsTUFBTSxDQUFDLE1BQU0sV0FBVyxPQUFjLFNBQVMsS0FBSyxDQUFDO0NBQ3JELE1BQU0sQ0FBQyxTQUFTLGVBQWUsT0FBTyxDQUFDO0NBQ3ZDLE1BQU0sQ0FBQyxRQUFRLGFBQWEsT0FBZSxRQUFRO0NBQ25ELE1BQU0sQ0FBQyxPQUFPLFlBQVksT0FBTyxLQUFLO0NBRXRDLE1BQU0sZ0JBQWlCLE1BQU0sSUFBSSxDQUFDLElBQUksS0FBSztDQUUzQyxPQUNJLHFCQUFDLE9BQUQ7RUFBSyxPQUFNO1lBQVg7R0FDSSxvQkFBQyxNQUFELFlBQUksZUFBZ0I7R0FFcEIscUJBQUMsT0FBRDtJQUFLLE9BQU07Y0FBWCxDQUNJLG9CQUFDLFVBQUQ7S0FDSSxNQUFLO0tBQ0wsZUFBZSxVQUFVLE1BQU0sQ0FBQyxDQUFDO2VBQ3BDO0lBRU8sSUFDUixvQkFBQyxVQUFEO0tBQ0ksTUFBSztLQUNMLGVBQWU7TUFDWCxRQUFRLEtBQUssQ0FBQyxDQUFDLEtBQUksU0FBUTtPQUFFLEdBQUc7T0FBSyxNQUFNO01BQUssRUFBRSxDQUFDO01BQ25ELGFBQWEsTUFBTSxJQUFJLENBQUM7S0FDNUI7ZUFDSDtJQUVPLEVBQ1A7O0dBRUwscUJBQUMsS0FBRDtJQUFHLElBQUc7Y0FBTjtLQUFlO1dBQ0csUUFBUSxDQUFDLENBQUM7S0FBTztXQUFtQixRQUFRO0tBQUU7V0FDN0MsT0FBTztJQUN2Qjs7R0FFSCxvQkFBQyxjQUFEO0lBQ0ksT0FBTztJQUNQLFlBQVk7SUFDWixRQUFRO0lBQ1IsT0FBTTtJQUNOLFVBQVU7SUFDVixhQUFhLFFBQVEsSUFBSTtJQUN6QixZQUFZLG9CQUFDLEtBQUQ7S0FBRyxJQUFHO2VBQVE7SUFBWTtJQUN0QyxjQUFjLFFBQVE7S0FDbEIsVUFBVSxHQUFHLElBQUksTUFBTSxPQUFPLElBQUksR0FBRyxFQUFFO0tBQ3ZDLGFBQWEsTUFBTSxJQUFJLENBQUM7SUFDNUI7SUFDQSxPQUFPLEtBQUssV0FBVztLQUNuQixNQUFNO0tBQ04sYUFDSSxTQUFTLElBQUksT0FBTyxZQUFZLEdBQUcsR0FDL0IsVUFBVSxJQUFJLGFBQWE7S0FFbkMsT0FBTztNQUNILGlCQUFpQixPQUFPLElBQUksRUFBRTtNQUM5QixxQkFBcUIsT0FBTyxLQUFLO01BQ2pDLHFCQUFzQixJQUFJLE9BQU8sUUFBUTtLQUM3QztLQUNBLFVBQVUsQ0FDTjtNQUNJLE1BQU07TUFDTixPQUFPO01BQ1AsYUFBYSxJQUFJO0tBQ3JCLEdBQ0E7TUFDSSxNQUFNO01BQ04sT0FBTztNQUNQLGFBQWEsSUFBSTtLQUNyQixDQUNKO0lBQ0o7R0FDSDtFQUNBOztBQUViO0FBSUEsT0FBTyxrQkFBa0IsY0FBYyxpQkFBaUIsZUFBZSwrQkFBK0IsaUJBQWlCLFNBQVM7Ozs7QUN6R2hJLHdCQUF3QiwrQkFBK0JBLHdCQUFZIn0=