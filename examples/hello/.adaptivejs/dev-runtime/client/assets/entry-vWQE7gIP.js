import { _ as jsx, a as signal, b as __exportAll, n as hydrateClientComponents, t as markClientExport, v as jsxs } from "./chunk-i_LCywE4.js";

//#region src/components/hydrate-lista-map.tsx
var hydrate_lista_map_exports = /* @__PURE__ */ __exportAll({ default: () => HydrateListaMap });
const TestItem = (props) => /* @__PURE__ */ jsxs("div", {
	style: {
		border: "1px solid #ccc",
		padding: "8px",
		margin: "4px"
	},
	children: [
		/* @__PURE__ */ jsx("strong", { children: props.label }),
		": ",
		() => props.count()
	]
});
const TestItemAlt = (props) => /* @__PURE__ */ jsxs("div", {
	style: {
		border: "2px solid #f00",
		padding: "8px",
		margin: "4px",
		background: "#ffe0e0"
	},
	children: [
		/* @__PURE__ */ jsx("em", { children: props.label }),
		" = ",
		() => props.count() * 2
	]
});
function HydrateListaMap() {
	const [counter, setCounter] = signal(0);
	const items = () => [
		{
			id: 1,
			label: "Item A",
			component: TestItem
		},
		{
			id: 2,
			label: "Item B",
			component: TestItemAlt
		},
		{
			id: 3,
			label: "Item C",
			component: TestItem
		},
		{
			id: 4,
			label: "Item D",
			component: TestItemAlt
		},
		{
			id: 5,
			label: "Item E",
			component: TestItem
		}
	];
	return /* @__PURE__ */ jsxs("div", {
		style: {
			padding: "20px",
			fontFamily: "monospace"
		},
		children: [
			/* @__PURE__ */ jsx("h2", { children: "HydrateListaMap Test" }),
			/* @__PURE__ */ jsxs("div", {
				style: { marginBottom: "20px" },
				children: [/* @__PURE__ */ jsxs("p", { children: [
					/* @__PURE__ */ jsx("strong", { children: "Counter:" }),
					" ",
					() => counter()
				] }), /* @__PURE__ */ jsx("button", {
					onClick: () => setCounter(counter() + 1),
					style: {
						padding: "8px 16px",
						fontSize: "14px",
						cursor: "pointer",
						background: "#007bff",
						color: "white",
						border: "none",
						borderRadius: "4px"
					},
					children: "Increment Counter"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					background: "#f5f5f5",
					padding: "12px",
					borderRadius: "4px",
					marginBottom: "16px"
				},
				children: [/* @__PURE__ */ jsx("strong", { children: "Test Instructions:" }), /* @__PURE__ */ jsxs("ol", { children: [
					/* @__PURE__ */ jsx("li", { children: "Wait for page to fully hydrate" }),
					/* @__PURE__ */ jsx("li", { children: "Click \"Increment Counter\" button" }),
					/* @__PURE__ */ jsx("li", { children: "Expected: All items below should update to show new counter value" }),
					/* @__PURE__ */ jsx("li", { children: "Actual (bug): Items stay the same, counter doesn't propagate to components" })
				] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					border: "2px solid #333",
					padding: "16px",
					background: "#fff"
				},
				children: [/* @__PURE__ */ jsx("h3", { children: "Items (should update when counter changes):" }), () => items().map((item) => {
					const Component = item.component;
					return /* @__PURE__ */ jsx(Component, {
						label: item.label,
						count: () => counter() + item.id
					}, item.id);
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					marginTop: "20px",
					padding: "12px",
					background: "#e8f4f8",
					borderRadius: "4px",
					fontSize: "12px"
				},
				children: [/* @__PURE__ */ jsx("strong", { children: "Diagnosis Notes:" }), /* @__PURE__ */ jsxs("ul", { children: [
					/* @__PURE__ */ jsx("li", { children: "✓ Client mode: Should update correctly" }),
					/* @__PURE__ */ jsx("li", { children: "✓ Single component type: Should update correctly" }),
					/* @__PURE__ */ jsx("li", { children: "✗ Hydrate + varied components in .map(): Props don't trigger re-renders" }),
					/* @__PURE__ */ jsxs("li", { children: ["Issue likely in: ", /* @__PURE__ */ jsx("code", { children: "packages/web/src/hy/hydrate/reactive.ts" })] })
				] })]
			})
		]
	});
}
typeof HydrateListaMap === "function" && markClientExport(HydrateListaMap, "components/hydrate-lista-map", "HydrateListaMap", "hydrate");
typeof HydrateListaMap === "function" && markClientExport(HydrateListaMap, "components/hydrate-lista-map", "default", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791415595625-cveadg/temp/client-components/components__hydrate-lista-map.tsx
hydrateClientComponents("components/hydrate-lista-map", hydrate_lista_map_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktdldRRTdnSVAuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9oeWRyYXRlLWxpc3RhLW1hcC50c3giLCIuLi8uLi90ZW1wL2NsaWVudC1jb21wb25lbnRzL2NvbXBvbmVudHNfX2h5ZHJhdGUtbGlzdGEtbWFwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyInaHlkcmF0ZSdcblxuaW1wb3J0IHsgc2lnbmFsIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcblxuLyoqXG4gKiBNaW5pbWFsIHRlc3QgY29tcG9uZW50IHRvIGlzb2xhdGUgaHlkcmF0ZSBtb2RlIHJlYWN0aXZpdHkgaXNzdWUgd2l0aCAubWFwKClcbiAqXG4gKiBQcm9ibGVtOiBXaGVuIHJlbmRlcmluZyBtdWx0aXBsZSBkaWZmZXJlbnQgY29tcG9uZW50cyB2aWEgLm1hcCgpIGluIGh5ZHJhdGUgbW9kZSxcbiAqIHByb3AgY2hhbmdlcyBkb24ndCB0cmlnZ2VyIHJlLXJlbmRlcnMuIFRoZSBTU1IgSFRNTCBpcyBjYWNoZWQgYW5kIG5vdCByZWFjdGl2ZWx5IHVwZGF0ZWQuXG4gKlxuICogVGhpcyBjb21wb25lbnQgdGVzdHMgaWYgc2lnbmFscyB0aGF0IGRyaXZlIC5tYXAoKSBwcm9wcyBjYXVzZSByZS1yZW5kZXJzLlxuICovXG5cbmludGVyZmFjZSBJdGVtUHJvcHMge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgY291bnQ6ICgpID0+IG51bWJlcjtcbn1cblxuLy8gU2ltcGxlIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGRpZmZlcmVudCBjb250ZW50IGJhc2VkIG9uIHByb3BzXG5jb25zdCBUZXN0SXRlbSA9IChwcm9wczogSXRlbVByb3BzKSA9PiAoXG4gICAgPGRpdiBzdHlsZT17eyBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIiwgcGFkZGluZzogXCI4cHhcIiwgbWFyZ2luOiBcIjRweFwiIH19PlxuICAgICAgICA8c3Ryb25nPntwcm9wcy5sYWJlbH08L3N0cm9uZz46IHsoKSA9PiBwcm9wcy5jb3VudCgpfVxuICAgIDwvZGl2PlxuKTtcblxuLy8gQW5vdGhlciBzaW1wbGUgY29tcG9uZW50IHdpdGggZGlmZmVyZW50IHN0eWxpbmdcbmNvbnN0IFRlc3RJdGVtQWx0ID0gKHByb3BzOiBJdGVtUHJvcHMpID0+IChcbiAgICA8ZGl2IHN0eWxlPXt7IGJvcmRlcjogXCIycHggc29saWQgI2YwMFwiLCBwYWRkaW5nOiBcIjhweFwiLCBtYXJnaW46IFwiNHB4XCIsIGJhY2tncm91bmQ6IFwiI2ZmZTBlMFwiIH19PlxuICAgICAgICA8ZW0+e3Byb3BzLmxhYmVsfTwvZW0+ID0geygpID0+IHByb3BzLmNvdW50KCkgKiAyfVxuICAgIDwvZGl2PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSHlkcmF0ZUxpc3RhTWFwKCkge1xuICAgIC8vIFNpZ25hbCB0aGF0IGRyaXZlcyB0aGUgbGlzdCByZW5kZXJcbiAgICBjb25zdCBbY291bnRlciwgc2V0Q291bnRlcl0gPSBzaWduYWwoMCk7XG5cbiAgICAvLyBJdGVtcyB0byByZW5kZXIgLSBhbHRlcm5hdGluZyBiZXR3ZWVuIHR3byBjb21wb25lbnQgdHlwZXNcbiAgICBjb25zdCBpdGVtcyA9ICgpID0+IFtcbiAgICAgICAgeyBpZDogMSwgbGFiZWw6IFwiSXRlbSBBXCIsIGNvbXBvbmVudDogVGVzdEl0ZW0gfSxcbiAgICAgICAgeyBpZDogMiwgbGFiZWw6IFwiSXRlbSBCXCIsIGNvbXBvbmVudDogVGVzdEl0ZW1BbHQgfSxcbiAgICAgICAgeyBpZDogMywgbGFiZWw6IFwiSXRlbSBDXCIsIGNvbXBvbmVudDogVGVzdEl0ZW0gfSxcbiAgICAgICAgeyBpZDogNCwgbGFiZWw6IFwiSXRlbSBEXCIsIGNvbXBvbmVudDogVGVzdEl0ZW1BbHQgfSxcbiAgICAgICAgeyBpZDogNSwgbGFiZWw6IFwiSXRlbSBFXCIsIGNvbXBvbmVudDogVGVzdEl0ZW0gfSxcbiAgICBdO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiBcIjIwcHhcIiwgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIiB9fT5cbiAgICAgICAgICAgIDxoMj5IeWRyYXRlTGlzdGFNYXAgVGVzdDwvaDI+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBcIjIwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5Db3VudGVyOjwvc3Ryb25nPiB7KCkgPT4gY291bnRlcigpfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldENvdW50ZXIoY291bnRlcigpICsgMSl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCIjMDA3YmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI0cHhcIlxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgSW5jcmVtZW50IENvdW50ZXJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGJhY2tncm91bmQ6IFwiI2Y1ZjVmNVwiLCBwYWRkaW5nOiBcIjEycHhcIiwgYm9yZGVyUmFkaXVzOiBcIjRweFwiLCBtYXJnaW5Cb3R0b206IFwiMTZweFwiIH19PlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+VGVzdCBJbnN0cnVjdGlvbnM6PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPG9sPlxuICAgICAgICAgICAgICAgICAgICA8bGk+V2FpdCBmb3IgcGFnZSB0byBmdWxseSBoeWRyYXRlPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPkNsaWNrIFwiSW5jcmVtZW50IENvdW50ZXJcIiBidXR0b248L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+RXhwZWN0ZWQ6IEFsbCBpdGVtcyBiZWxvdyBzaG91bGQgdXBkYXRlIHRvIHNob3cgbmV3IGNvdW50ZXIgdmFsdWU8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+QWN0dWFsIChidWcpOiBJdGVtcyBzdGF5IHRoZSBzYW1lLCBjb3VudGVyIGRvZXNuJ3QgcHJvcGFnYXRlIHRvIGNvbXBvbmVudHM8L2xpPlxuICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBib3JkZXI6IFwiMnB4IHNvbGlkICMzMzNcIiwgcGFkZGluZzogXCIxNnB4XCIsIGJhY2tncm91bmQ6IFwiI2ZmZlwiIH19PlxuICAgICAgICAgICAgICAgIDxoMz5JdGVtcyAoc2hvdWxkIHVwZGF0ZSB3aGVuIGNvdW50ZXIgY2hhbmdlcyk6PC9oMz5cbiAgICAgICAgICAgICAgICB7KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgaXRlbXMoKS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IENvbXBvbmVudCA9IGl0ZW0uY29tcG9uZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50PXsoKSA9PiBjb3VudGVyKCkgKyBpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogXCIyMHB4XCIsIHBhZGRpbmc6IFwiMTJweFwiLCBiYWNrZ3JvdW5kOiBcIiNlOGY0ZjhcIiwgYm9yZGVyUmFkaXVzOiBcIjRweFwiLCBmb250U2l6ZTogXCIxMnB4XCIgfX0+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5EaWFnbm9zaXMgTm90ZXM6PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICA8bGk+4pyTIENsaWVudCBtb2RlOiBTaG91bGQgdXBkYXRlIGNvcnJlY3RseTwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT7inJMgU2luZ2xlIGNvbXBvbmVudCB0eXBlOiBTaG91bGQgdXBkYXRlIGNvcnJlY3RseTwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT7inJcgSHlkcmF0ZSArIHZhcmllZCBjb21wb25lbnRzIGluIC5tYXAoKTogUHJvcHMgZG9uJ3QgdHJpZ2dlciByZS1yZW5kZXJzPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPklzc3VlIGxpa2VseSBpbjogPGNvZGU+cGFja2FnZXMvd2ViL3NyYy9oeS9oeWRyYXRlL3JlYWN0aXZlLnRzPC9jb2RlPjwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufSIsIlxuaW1wb3J0ICogYXMgY2xpZW50TW9kdWxlIGZyb20gXCIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9oeWRyYXRlLWxpc3RhLW1hcC50c3hcIjtcbmltcG9ydCB7IGh5ZHJhdGVDbGllbnRDb21wb25lbnRzIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcblxuaHlkcmF0ZUNsaWVudENvbXBvbmVudHMoXCJjb21wb25lbnRzL2h5ZHJhdGUtbGlzdGEtbWFwXCIsIGNsaWVudE1vZHVsZSk7XG5leHBvcnQge307XG4iXSwibWFwcGluZ3MiOiI7Ozs7QUFpQkEsTUFBTSxZQUFZLFVBQ2QscUJBQUMsT0FBRDtDQUFLLE9BQU87RUFBRSxRQUFRO0VBQWtCLFNBQVM7RUFBTyxRQUFRO0NBQU07V0FBdEU7RUFDSSxvQkFBQyxVQUFELFlBQVMsTUFBTSxNQUFjO0VBQUM7UUFBUyxNQUFNLE1BQU07Q0FDbEQ7O0FBSVQsTUFBTSxlQUFlLFVBQ2pCLHFCQUFDLE9BQUQ7Q0FBSyxPQUFPO0VBQUUsUUFBUTtFQUFrQixTQUFTO0VBQU8sUUFBUTtFQUFPLFlBQVk7Q0FBVTtXQUE3RjtFQUNJLG9CQUFDLE1BQUQsWUFBSyxNQUFNLE1BQVU7RUFBQztRQUFVLE1BQU0sTUFBTSxJQUFJO0NBQy9DOztBQUdULFNBQXdCLGtCQUFrQjtDQUV0QyxNQUFNLENBQUMsU0FBUyxjQUFjLE9BQU8sQ0FBQztDQUd0QyxNQUFNLGNBQWM7RUFDaEI7R0FBRSxJQUFJO0dBQUcsT0FBTztHQUFVLFdBQVc7RUFBUztFQUM5QztHQUFFLElBQUk7R0FBRyxPQUFPO0dBQVUsV0FBVztFQUFZO0VBQ2pEO0dBQUUsSUFBSTtHQUFHLE9BQU87R0FBVSxXQUFXO0VBQVM7RUFDOUM7R0FBRSxJQUFJO0dBQUcsT0FBTztHQUFVLFdBQVc7RUFBWTtFQUNqRDtHQUFFLElBQUk7R0FBRyxPQUFPO0dBQVUsV0FBVztFQUFTO0NBQ2xEO0NBRUEsT0FDSSxxQkFBQyxPQUFEO0VBQUssT0FBTztHQUFFLFNBQVM7R0FBUSxZQUFZO0VBQVk7WUFBdkQ7R0FDSSxvQkFBQyxNQUFELFlBQUksdUJBQXdCO0dBRTVCLHFCQUFDLE9BQUQ7SUFBSyxPQUFPLEVBQUUsY0FBYyxPQUFPO2NBQW5DLENBQ0kscUJBQUMsS0FBRDtLQUNJLG9CQUFDLFVBQUQsWUFBUSxXQUFnQjtLQUFDO1dBQVEsUUFBUTtJQUMxQyxNQUNILG9CQUFDLFVBQUQ7S0FDSSxlQUFlLFdBQVcsUUFBUSxJQUFJLENBQUM7S0FDdkMsT0FBTztNQUNILFNBQVM7TUFDVCxVQUFVO01BQ1YsUUFBUTtNQUNSLFlBQVk7TUFDWixPQUFPO01BQ1AsUUFBUTtNQUNSLGNBQWM7S0FDbEI7ZUFDSDtJQUVPLEVBQ1A7O0dBRUwscUJBQUMsT0FBRDtJQUFLLE9BQU87S0FBRSxZQUFZO0tBQVcsU0FBUztLQUFRLGNBQWM7S0FBTyxjQUFjO0lBQU87Y0FBaEcsQ0FDSSxvQkFBQyxVQUFELFlBQVEscUJBQTBCLElBQ2xDLHFCQUFDLE1BQUQ7S0FDSSxvQkFBQyxNQUFELFlBQUksaUNBQWtDO0tBQ3RDLG9CQUFDLE1BQUQsWUFBSSxxQ0FBb0M7S0FDeEMsb0JBQUMsTUFBRCxZQUFJLG9FQUFxRTtLQUN6RSxvQkFBQyxNQUFELFlBQUksNkVBQThFO0lBQ2xGLElBQ0g7O0dBRUwscUJBQUMsT0FBRDtJQUFLLE9BQU87S0FBRSxRQUFRO0tBQWtCLFNBQVM7S0FBUSxZQUFZO0lBQU87Y0FBNUUsQ0FDSSxvQkFBQyxNQUFELFlBQUksOENBQStDLFVBRS9DLE1BQU0sQ0FBQyxDQUFDLEtBQUssU0FBUztLQUNsQixNQUFNLFlBQVksS0FBSztLQUN2QixPQUNJLG9CQUFDLFdBQUQ7TUFFSSxPQUFPLEtBQUs7TUFDWixhQUFhLFFBQVEsSUFBSSxLQUFLO0tBQ2pDLEdBSFEsS0FBSyxFQUdiO0lBRVQsQ0FBQyxDQUVKOztHQUVMLHFCQUFDLE9BQUQ7SUFBSyxPQUFPO0tBQUUsV0FBVztLQUFRLFNBQVM7S0FBUSxZQUFZO0tBQVcsY0FBYztLQUFPLFVBQVU7SUFBTztjQUEvRyxDQUNJLG9CQUFDLFVBQUQsWUFBUSxtQkFBd0IsSUFDaEMscUJBQUMsTUFBRDtLQUNJLG9CQUFDLE1BQUQsWUFBSSx5Q0FBMEM7S0FDOUMsb0JBQUMsTUFBRCxZQUFJLG1EQUFvRDtLQUN4RCxvQkFBQyxNQUFELFlBQUksMEVBQTJFO0tBQy9FLHFCQUFDLE1BQUQsYUFBSSxxQkFBaUIsb0JBQUMsUUFBRCxZQUFNLDBDQUE2QyxFQUFLO0lBQzdFLElBQ0g7O0VBQ0o7O0FBRWI7QUFHQSxPQUFPLG9CQUFvQixjQUFjLGlCQUFpQixpQkFBaUIsZ0NBQWdDLG1CQUFtQixTQUFTO0FBQ3ZJLE9BQU8sb0JBQW9CLGNBQWMsaUJBQWlCLGlCQUFpQixnQ0FBZ0MsV0FBVyxTQUFTOzs7O0FDeEcvSCx3QkFBd0IsZ0NBQWdDQSx5QkFBWSJ9