import { _ as jsx, a as signal, b as __exportAll, d as events, t as markClientExport } from "./chunk-i_LCywE4.js";

//#region src/components/client.tsx
var client_exports = /* @__PURE__ */ __exportAll({ ClientComponet: () => ClientComponet });
const ClientComponet = () => {
	const [test, setTest] = signal(0);
	events(() => {
		console.log(test());
	});
	return /* @__PURE__ */ jsx("div", {
		onClick: () => {
			setTest(test() + 1);
		},
		children: "Cliente Render"
	});
};
typeof ClientComponet === "function" && markClientExport(ClientComponet, "components/client", "ClientComponet", "client");

//#endregion
export { client_exports as n, ClientComponet as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstRE4tV1lBelEuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY2xpZW50LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyInY2xpZW50J1xuXG5pbXBvcnQge2V2ZW50cywgc2lnbmFsfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuXG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb21wb25ldCA9ICgpID0+IHtcblxuICAgIGNvbnN0IFt0ZXN0LHNldFRlc3RdID0gc2lnbmFsKDApXG5cbiAgICBldmVudHMoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyh0ZXN0KCkpXG4gICAgfSlcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgc2V0VGVzdCh0ZXN0KCkgICsgMSlcbiAgICAgICAgfX0gPkNsaWVudGUgUmVuZGVyPC9kaXY+XG4gICAgKVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7O0FBR0EsTUFBYSx1QkFBdUI7Q0FFaEMsTUFBTSxDQUFDLE1BQUssV0FBVyxPQUFPLENBQUM7Q0FFL0IsYUFBYTtFQUNULFFBQVEsSUFBSSxLQUFLLENBQUM7Q0FDdEIsQ0FBQztDQUVELE9BQ0ksb0JBQUMsT0FBRDtFQUFLLGVBQWU7R0FDaEIsUUFBUSxLQUFLLElBQUssQ0FBQztFQUN2QjtZQUFJO0NBQW1CO0FBRS9CO0FBSUEsT0FBTyxtQkFBbUIsY0FBYyxpQkFBaUIsZ0JBQWdCLHFCQUFxQixrQkFBa0IsUUFBUSJ9