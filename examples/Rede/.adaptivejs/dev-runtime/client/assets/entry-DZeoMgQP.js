import { _ as jsx, b as __exportAll, g as Fragment, n as hydrateClientComponents, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { n as toasts } from "./chunk-BfKm4NCt.js";

//#region src/components/omni-hub/toast-container.tsx
var toast_container_exports = /* @__PURE__ */ __exportAll({ ToastContainer: () => ToastContainer });
const TOAST_ICONS = {
	success: "check_circle",
	info: "info",
	warning: "warning",
	error: "error"
};
const TOAST_ICON_CLASSES = {
	success: "bg-primary-container/20 text-primary",
	info: "bg-primary-container/20 text-primary",
	warning: "bg-amber-100 text-amber-700",
	error: "bg-red-100 text-red-600"
};
function ToastContainer() {
	return /* @__PURE__ */ jsx("div", {
		className: "fixed bottom-6 right-6 z-[60] flex flex-col gap-2 pointer-events-none",
		children: () => toasts().length > 0 ? /* @__PURE__ */ jsx("div", {
			className: "flex flex-col gap-2",
			children: toasts().map((toast) => /* @__PURE__ */ jsxs("div", {
				className: "pointer-events-auto bg-surface-container-lowest text-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-outline-variant/30 animate-in fade-in slide-in-from-bottom-5",
				children: [/* @__PURE__ */ jsx("div", {
					className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${TOAST_ICON_CLASSES[toast.type]}`,
					children: /* @__PURE__ */ jsx("span", {
						className: "material-symbols-outlined text-[20px]",
						children: TOAST_ICONS[toast.type]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col text-left",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-title-md font-bold text-on-surface",
						children: toast.title
					}), /* @__PURE__ */ jsx("span", {
						className: "font-body-sm text-on-surface-variant",
						children: toast.message
					})]
				})]
			}, toast.id))
		}) : /* @__PURE__ */ jsx(Fragment, { children: " " })
	});
}
typeof ToastContainer === "function" && markClientExport(ToastContainer, "components/omni-hub/toast-container", "ToastContainer", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__toast-container.tsx
hydrateClientComponents("components/omni-hub/toast-container", toast_container_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktRFplb01nUVAuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi90b2FzdC1jb250YWluZXIudHN4IiwiLi4vLi4vdGVtcC9jbGllbnQtY29tcG9uZW50cy9jb21wb25lbnRzX19vbW5pLWh1Yl9fdG9hc3QtY29udGFpbmVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcImh5ZHJhdGVcIjtcblxuaW1wb3J0IHsgdG9hc3RzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi90b2FzdC1zdG9yZVwiO1xuaW1wb3J0IHR5cGUgeyBUb2FzdFR5cGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3R5cGVzXCI7XG5cbmNvbnN0IFRPQVNUX0lDT05TOiBSZWNvcmQ8VG9hc3RUeXBlLCBzdHJpbmc+ID0ge1xuICBzdWNjZXNzOiBcImNoZWNrX2NpcmNsZVwiLFxuICBpbmZvOiBcImluZm9cIixcbiAgd2FybmluZzogXCJ3YXJuaW5nXCIsXG4gIGVycm9yOiBcImVycm9yXCIsXG59O1xuXG5jb25zdCBUT0FTVF9JQ09OX0NMQVNTRVM6IFJlY29yZDxUb2FzdFR5cGUsIHN0cmluZz4gPSB7XG4gIHN1Y2Nlc3M6IFwiYmctcHJpbWFyeS1jb250YWluZXIvMjAgdGV4dC1wcmltYXJ5XCIsXG4gIGluZm86IFwiYmctcHJpbWFyeS1jb250YWluZXIvMjAgdGV4dC1wcmltYXJ5XCIsXG4gIHdhcm5pbmc6IFwiYmctYW1iZXItMTAwIHRleHQtYW1iZXItNzAwXCIsXG4gIGVycm9yOiBcImJnLXJlZC0xMDAgdGV4dC1yZWQtNjAwXCIsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gVG9hc3RDb250YWluZXIoKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tNiByaWdodC02IHotWzYwXSBmbGV4IGZsZXgtY29sIGdhcC0yIHBvaW50ZXItZXZlbnRzLW5vbmVcIj5cbiAgICAgIHsoKSA9PlxuICAgICAgICB0b2FzdHMoKS5sZW5ndGggPiAwID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMlwiPlxuICAgICAgICAgICAge3RvYXN0cygpLm1hcCgodG9hc3QpID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17dG9hc3QuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtYXV0byBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3QgdGV4dC1vbi1zdXJmYWNlIHB4LTQgcHktMyByb3VuZGVkLXhsIHNoYWRvdy14bCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8zMCBhbmltYXRlLWluIGZhZGUtaW4gc2xpZGUtaW4tZnJvbS1ib3R0b20tNVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTggaC04IHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaHJpbmstMCAke1xuICAgICAgICAgICAgICAgICAgICBUT0FTVF9JQ09OX0NMQVNTRVNbdG9hc3QudHlwZV1cbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAge1RPQVNUX0lDT05TW3RvYXN0LnR5cGVdfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgZm9udC1ib2xkIHRleHQtb24tc3VyZmFjZVwiPlxuICAgICAgICAgICAgICAgICAgICB7dG9hc3QudGl0bGV9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAge3RvYXN0Lm1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoPD4gPC8+KVxuICAgICAgfVxuICAgIDwvZGl2PlxuICApO1xufSIsIlxuaW1wb3J0ICogYXMgY2xpZW50TW9kdWxlIGZyb20gXCIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi90b2FzdC1jb250YWluZXIudHN4XCI7XG5pbXBvcnQgeyBoeWRyYXRlQ2xpZW50Q29tcG9uZW50cyB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5cbmh5ZHJhdGVDbGllbnRDb21wb25lbnRzKFwiY29tcG9uZW50cy9vbW5pLWh1Yi90b2FzdC1jb250YWluZXJcIiwgY2xpZW50TW9kdWxlKTtcbmV4cG9ydCB7fTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxNQUFNLGNBQXlDO0NBQzdDLFNBQVM7Q0FDVCxNQUFNO0NBQ04sU0FBUztDQUNULE9BQU87QUFDVDtBQUVBLE1BQU0scUJBQWdEO0NBQ3BELFNBQVM7Q0FDVCxNQUFNO0NBQ04sU0FBUztDQUNULE9BQU87QUFDVDtBQUVBLFNBQWdCLGlCQUFpQjtDQUMvQixPQUNFLG9CQUFDLE9BQUQ7RUFBSyxXQUFVO2tCQUVYLE9BQU8sQ0FBQyxDQUFDLFNBQVMsSUFDaEIsb0JBQUMsT0FBRDtHQUFLLFdBQVU7YUFDWixPQUFPLENBQUMsQ0FBQyxLQUFLLFVBQ2IscUJBQUMsT0FBRDtJQUVFLFdBQVU7Y0FGWixDQUlFLG9CQUFDLE9BQUQ7S0FDRSxXQUFXLGtFQUNULG1CQUFtQixNQUFNO2VBRzNCLG9CQUFDLFFBQUQ7TUFBTSxXQUFVO2dCQUNiLFlBQVksTUFBTTtLQUNmO0lBQ0gsSUFDTCxxQkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmLENBQ0Usb0JBQUMsUUFBRDtNQUFNLFdBQVU7Z0JBQ2IsTUFBTTtLQUNILElBQ04sb0JBQUMsUUFBRDtNQUFNLFdBQVU7Z0JBQ2IsTUFBTTtLQUNILEVBQ0g7TUFDRjtNQXBCRSxNQUFNLEVBb0JSLENBQ047RUFDRSxLQUNGLDBDQUFFLElBQUc7Q0FFVDtBQUVUO0FBR0EsT0FBTyxtQkFBbUIsY0FBYyxpQkFBaUIsZ0JBQWdCLHVDQUF1QyxrQkFBa0IsU0FBUzs7OztBQ25EM0ksd0JBQXdCLHVDQUF1Q0EsdUJBQVkifQ==