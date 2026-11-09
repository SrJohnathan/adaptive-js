import { _ as jsx, b as __exportAll, g as Fragment, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { r as toggleClientPanel } from "./chunk-Bb4RYKsU.js";
import { t as SCREEN_ROUTES } from "./chunk-BAJW75ro.js";

//#region src/components/omni-hub/sidebar.tsx
var sidebar_exports = /* @__PURE__ */ __exportAll({ Sidebar: () => Sidebar });
const NAV_ITEMS = [
	{
		id: "chat-omnichannel",
		label: "Chat Omnichannel",
		icon: "forum",
		badge: "38"
	},
	{
		id: "catalogo-erp",
		label: "Catálogo & ERP",
		icon: "sync_alt"
	},
	{
		id: "estudio-banners",
		label: "Estúdio de Banners & IA",
		icon: "photo_library"
	},
	{
		id: "armazenamento-midias",
		label: "Armazenamento & Mídias",
		icon: "cloud_sync"
	},
	{
		id: "configuracoes-conta",
		label: "Configurações de Conta",
		icon: "manage_accounts"
	},
	{
		id: "autenticacao",
		label: "Login Corporativo",
		icon: "lock"
	}
];
function Sidebar({ active }) {
	const router = useRouter();
	const goTo = (screen) => router.push(SCREEN_ROUTES[screen]);
	return /* @__PURE__ */ jsxs("aside", {
		className: "fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest shadow-[1px_0_8px_rgba(0,0,0,0.02)] border-r border-outline-variant/20 z-40 flex flex-col justify-between py-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-1 px-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "px-3 py-1 mb-1 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
					children: "Canais & Módulos"
				}), /* @__PURE__ */ jsx("span", {
					className: "px-1.5 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm text-[10px] font-bold",
					children: "v4.8"
				})]
			}), /* @__PURE__ */ jsxs("nav", {
				className: "flex flex-col gap-1",
				children: [NAV_ITEMS.map((item) => {
					const isActive = active === item.id;
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => goTo(item.id),
						className: `flex items-center justify-between px-3 py-2.5 rounded-xl font-title-md transition-all text-left group ${isActive ? "bg-primary-container text-on-primary font-bold shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"}`,
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ jsx("span", {
								className: `material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${isActive ? "text-on-primary" : "text-primary"}`,
								children: item.icon
							}), /* @__PURE__ */ jsx("span", { children: item.label })]
						}), item.badge && /* @__PURE__ */ jsx("span", {
							className: `px-1.5 py-0.2 rounded-full text-[11px] font-bold ${isActive ? "bg-white/25 text-white" : "bg-primary/10 text-primary"}`,
							children: item.badge
						})]
					}, item.id);
				}), /* @__PURE__ */ jsxs("div", {
					className: "pt-3 mt-2 border-t border-outline-variant/20",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "px-3 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-1 block",
							children: "Acesso Rápido"
						}),
						active === "chat-omnichannel" ? /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: toggleClientPanel,
							className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-sm font-medium transition-colors",
							title: "Abrir Painel 360° do Cliente",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[18px] text-primary",
								children: "contact_page"
							}), /* @__PURE__ */ jsx("span", { children: "Perfil 360° do Cliente" })]
						}) : /* @__PURE__ */ jsx(Fragment, {}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => goTo("catalogo-erp"),
							className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-sm font-medium transition-colors",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[18px] text-tertiary",
								children: "storefront"
							}), /* @__PURE__ */ jsx("span", { children: "Vitrines iFood" })]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => goTo("estudio-banners"),
							className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-sm font-medium transition-colors",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[18px] text-secondary",
								children: "campaign"
							}), /* @__PURE__ */ jsx("span", { children: "Disparos & Campanhas" })]
						})
					]
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "px-3",
			children: /* @__PURE__ */ jsxs("div", {
				className: "p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "material-symbols-outlined text-tertiary text-[20px]",
						children: "hub"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-label-sm text-on-surface font-semibold",
							children: "iFood & ERP Sync"
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-[10px] text-emerald-700 font-semibold flex items-center gap-1",
							children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }), "Conectado (18ms)"]
						})]
					})]
				}), /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-secondary-container" })]
			})
		})]
	});
}
typeof Sidebar === "function" && markClientExport(Sidebar, "components/omni-hub/sidebar", "Sidebar", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__sidebar.tsx
hydrateClientComponents("components/omni-hub/sidebar", sidebar_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktQ3pscXVRcm8uanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9zaWRlYmFyLnRzeCIsIi4uLy4uL3RlbXAvY2xpZW50LWNvbXBvbmVudHMvY29tcG9uZW50c19fb21uaS1odWJfX3NpZGViYXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwiaHlkcmF0ZVwiO1xuXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuaW1wb3J0IHsgU0NSRUVOX1JPVVRFUywgdHlwZSBTY3JlZW5UeXBlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi90eXBlc1wiO1xuaW1wb3J0IHsgdG9nZ2xlQ2xpZW50UGFuZWwgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL2NsaWVudC1wYW5lbC1zdG9yZVwiO1xuXG5pbnRlcmZhY2UgU2lkZWJhclByb3BzIHtcbiAgYWN0aXZlOiBTY3JlZW5UeXBlO1xufVxuXG5jb25zdCBOQVZfSVRFTVM6IHsgaWQ6IFNjcmVlblR5cGU7IGxhYmVsOiBzdHJpbmc7IGljb246IHN0cmluZzsgYmFkZ2U/OiBzdHJpbmcgfVtdID0gW1xuICB7IGlkOiBcImNoYXQtb21uaWNoYW5uZWxcIiwgbGFiZWw6IFwiQ2hhdCBPbW5pY2hhbm5lbFwiLCBpY29uOiBcImZvcnVtXCIsIGJhZGdlOiBcIjM4XCIgfSxcbiAgeyBpZDogXCJjYXRhbG9nby1lcnBcIiwgbGFiZWw6IFwiQ2F0w6Fsb2dvICYgRVJQXCIsIGljb246IFwic3luY19hbHRcIiB9LFxuICB7IGlkOiBcImVzdHVkaW8tYmFubmVyc1wiLCBsYWJlbDogXCJFc3TDumRpbyBkZSBCYW5uZXJzICYgSUFcIiwgaWNvbjogXCJwaG90b19saWJyYXJ5XCIgfSxcbiAgeyBpZDogXCJhcm1hemVuYW1lbnRvLW1pZGlhc1wiLCBsYWJlbDogXCJBcm1hemVuYW1lbnRvICYgTcOtZGlhc1wiLCBpY29uOiBcImNsb3VkX3N5bmNcIiB9LFxuICB7IGlkOiBcImNvbmZpZ3VyYWNvZXMtY29udGFcIiwgbGFiZWw6IFwiQ29uZmlndXJhw6fDtWVzIGRlIENvbnRhXCIsIGljb246IFwibWFuYWdlX2FjY291bnRzXCIgfSxcbiAgeyBpZDogXCJhdXRlbnRpY2FjYW9cIiwgbGFiZWw6IFwiTG9naW4gQ29ycG9yYXRpdm9cIiwgaWNvbjogXCJsb2NrXCIgfSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBTaWRlYmFyKHsgYWN0aXZlIH06IFNpZGViYXJQcm9wcykge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICBjb25zdCBnb1RvID0gKHNjcmVlbjogU2NyZWVuVHlwZSkgPT4gcm91dGVyLnB1c2goU0NSRUVOX1JPVVRFU1tzY3JlZW5dKTtcblxuICByZXR1cm4gKFxuICAgIDxhc2lkZSBjbGFzc05hbWU9XCJmaXhlZCBsZWZ0LTAgdG9wLTE2IGJvdHRvbS0wIHctNjQgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHNoYWRvdy1bMXB4XzBfOHB4X3JnYmEoMCwwLDAsMC4wMildIGJvcmRlci1yIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgei00MCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBweS00XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEgcHgtM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTMgcHktMSBtYi0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgQ2FuYWlzICYgTcOzZHVsb3NcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCB0ZXh0LXByaW1hcnkgZm9udC1jb2RlLXNtIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgdjQuOFxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xXCI+XG4gICAgICAgICAge05BVl9JVEVNUy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBnb1RvKGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0zIHB5LTIuNSByb3VuZGVkLXhsIGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1hbGwgdGV4dC1sZWZ0IGdyb3VwICR7XG4gICAgICAgICAgICAgICAgICBpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICA/IFwiYmctcHJpbWFyeS1jb250YWluZXIgdGV4dC1vbi1wcmltYXJ5IGZvbnQtYm9sZCBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICA6IFwidGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaCBob3Zlcjp0ZXh0LW9uLXN1cmZhY2VcIlxuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzIwcHhdIHRyYW5zaXRpb24tdHJhbnNmb3JtIGdyb3VwLWhvdmVyOnNjYWxlLTExMCAke1xuICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LW9uLXByaW1hcnlcIiA6IFwidGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLmljb259XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7aXRlbS5iYWRnZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0xLjUgcHktMC4yIHJvdW5kZWQtZnVsbCB0ZXh0LVsxMXB4XSBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctd2hpdGUvMjUgdGV4dC13aGl0ZVwiIDogXCJiZy1wcmltYXJ5LzEwIHRleHQtcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7aXRlbS5iYWRnZX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG5cbiAgICAgICAgICB7LyogQWNlc3NvIFLDoXBpZG8gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIG10LTIgYm9yZGVyLXQgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMyB0ZXh0LVsxMXB4XSBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtb24tc3VyZmFjZS12YXJpYW50LzcwIG1iLTEgYmxvY2tcIj5cbiAgICAgICAgICAgICAgQWNlc3NvIFLDoXBpZG9cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIHthY3RpdmUgPT09IFwiY2hhdC1vbW5pY2hhbm5lbFwiID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlQ2xpZW50UGFuZWx9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgcHgtMyBweS0yIHJvdW5kZWQteGwgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaCBob3Zlcjp0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2R5LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIkFicmlyIFBhaW5lbCAzNjDCsCBkbyBDbGllbnRlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF0gdGV4dC1wcmltYXJ5XCI+Y29udGFjdF9wYWdlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBlcmZpbCAzNjDCsCBkbyBDbGllbnRlPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+PC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZ29UbyhcImNhdGFsb2dvLWVycFwiKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgcHgtMyBweS0yIHJvdW5kZWQteGwgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaCBob3Zlcjp0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2R5LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XSB0ZXh0LXRlcnRpYXJ5XCI+c3RvcmVmcm9udDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+Vml0cmluZXMgaUZvb2Q8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGdvVG8oXCJlc3R1ZGlvLWJhbm5lcnNcIil9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IHB4LTMgcHktMiByb3VuZGVkLXhsIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggaG92ZXI6dGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9keS1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF0gdGV4dC1zZWNvbmRhcnlcIj5jYW1wYWlnbjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+RGlzcGFyb3MgJiBDYW1wYW5oYXM8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uYXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEZvb3RlciBTeW5jIFN0YXR1cyBXaWRnZXQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LXRlcnRpYXJ5IHRleHQtWzIwcHhdXCI+aHViPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5pRm9vZCAmIEVSUCBTeW5jPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtNzAwIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC01MDAgYW5pbWF0ZS1wdWxzZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICBDb25lY3RhZG8gKDE4bXMpXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1zZWNvbmRhcnktY29udGFpbmVyXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYXNpZGU+XG4gICk7XG59IiwiXG5pbXBvcnQgKiBhcyBjbGllbnRNb2R1bGUgZnJvbSBcIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL29tbmktaHViL3NpZGViYXIudHN4XCI7XG5pbXBvcnQgeyBoeWRyYXRlQ2xpZW50Q29tcG9uZW50cyB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5cbmh5ZHJhdGVDbGllbnRDb21wb25lbnRzKFwiY29tcG9uZW50cy9vbW5pLWh1Yi9zaWRlYmFyXCIsIGNsaWVudE1vZHVsZSk7XG5leHBvcnQge307XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFBLE1BQU0sWUFBK0U7Q0FDbkY7RUFBRSxJQUFJO0VBQW9CLE9BQU87RUFBb0IsTUFBTTtFQUFTLE9BQU87Q0FBSztDQUNoRjtFQUFFLElBQUk7RUFBZ0IsT0FBTztFQUFrQixNQUFNO0NBQVc7Q0FDaEU7RUFBRSxJQUFJO0VBQW1CLE9BQU87RUFBMkIsTUFBTTtDQUFnQjtDQUNqRjtFQUFFLElBQUk7RUFBd0IsT0FBTztFQUEwQixNQUFNO0NBQWE7Q0FDbEY7RUFBRSxJQUFJO0VBQXVCLE9BQU87RUFBMEIsTUFBTTtDQUFrQjtDQUN0RjtFQUFFLElBQUk7RUFBZ0IsT0FBTztFQUFxQixNQUFNO0NBQU87QUFDakU7QUFFQSxTQUFnQixRQUFRLEVBQUUsVUFBd0I7Q0FDaEQsTUFBTSxTQUFTLFVBQVU7Q0FFekIsTUFBTSxRQUFRLFdBQXVCLE9BQU8sS0FBSyxjQUFjLE9BQU87Q0FFdEUsT0FDRSxxQkFBQyxTQUFEO0VBQU8sV0FBVTtZQUFqQixDQUNFLHFCQUFDLE9BQUQ7R0FBSyxXQUFVO2FBQWYsQ0FDRSxxQkFBQyxPQUFEO0lBQUssV0FBVTtjQUFmLENBQ0Usb0JBQUMsUUFBRDtLQUFNLFdBQVU7ZUFBMkU7SUFFckYsSUFDTixvQkFBQyxRQUFEO0tBQU0sV0FBVTtlQUF1RztJQUVqSCxFQUNIO09BRUwscUJBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNHLFVBQVUsS0FBSyxTQUFTO0tBQ3ZCLE1BQU0sV0FBVyxXQUFXLEtBQUs7S0FDakMsT0FDRSxxQkFBQyxVQUFEO01BRUUsTUFBSztNQUNMLGVBQWUsS0FBSyxLQUFLLEVBQUU7TUFDM0IsV0FBVyx5R0FDVCxXQUNJLDZEQUNBO2dCQVBSLENBVUUscUJBQUMsT0FBRDtPQUFLLFdBQVU7aUJBQWYsQ0FDRSxvQkFBQyxRQUFEO1FBQ0UsV0FBVyxvRkFDVCxXQUFXLG9CQUFvQjtrQkFHaEMsS0FBSztPQUNGLElBQ04sb0JBQUMsUUFBRCxZQUFPLEtBQUssTUFBWSxFQUNyQjtVQUVKLEtBQUssU0FDSixvQkFBQyxRQUFEO09BQ0UsV0FBVyxvREFDVCxXQUFXLDJCQUEyQjtpQkFHdkMsS0FBSztNQUNGLEVBRUY7UUE3QkQsS0FBSyxFQTZCSjtJQUVaLENBQUMsR0FHRCxxQkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmO01BQ0Usb0JBQUMsUUFBRDtPQUFNLFdBQVU7aUJBQTRGO01BRXRHO01BQ0wsV0FBVyxxQkFDVixxQkFBQyxVQUFEO09BQ0UsTUFBSztPQUNMLFNBQVM7T0FDVCxXQUFVO09BQ1YsT0FBTTtpQkFKUixDQU1FLG9CQUFDLFFBQUQ7UUFBTSxXQUFVO2tCQUFxRDtPQUFrQixJQUN2RixvQkFBQyxRQUFELFlBQU0seUJBQTRCLEVBQzVCO1dBRVIsK0JBQUk7TUFFTixxQkFBQyxVQUFEO09BQ0UsTUFBSztPQUNMLGVBQWUsS0FBSyxjQUFjO09BQ2xDLFdBQVU7aUJBSFosQ0FLRSxvQkFBQyxRQUFEO1FBQU0sV0FBVTtrQkFBc0Q7T0FBZ0IsSUFDdEYsb0JBQUMsUUFBRCxZQUFNLGlCQUFvQixFQUNwQjs7TUFDUixxQkFBQyxVQUFEO09BQ0UsTUFBSztPQUNMLGVBQWUsS0FBSyxpQkFBaUI7T0FDckMsV0FBVTtpQkFIWixDQUtFLG9CQUFDLFFBQUQ7UUFBTSxXQUFVO2tCQUF1RDtPQUFjLElBQ3JGLG9CQUFDLFFBQUQsWUFBTSx1QkFBMEIsRUFDMUI7O0tBQ0w7TUFDRjtLQUNGO01BR0wsb0JBQUMsT0FBRDtHQUFLLFdBQVU7YUFDYixxQkFBQyxPQUFEO0lBQUssV0FBVTtjQUFmLENBQ0UscUJBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZixDQUNFLG9CQUFDLFFBQUQ7TUFBTSxXQUFVO2dCQUFzRDtLQUFTLElBQy9FLHFCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUFmLENBQ0Usb0JBQUMsUUFBRDtPQUFNLFdBQVU7aUJBQThDO01BQXNCLElBQ3BGLHFCQUFDLFFBQUQ7T0FBTSxXQUFVO2lCQUFoQixDQUNFLG9CQUFDLFFBQUQsRUFBTSxXQUFVLHdEQUE4RCxJQUFDLGtCQUUzRTtRQUNIO09BQ0Y7UUFDTCxvQkFBQyxRQUFELEVBQU0sV0FBVSxrREFBd0QsRUFDckU7O0VBQ0YsRUFDQTs7QUFFWDtBQUdBLE9BQU8sWUFBWSxjQUFjLGlCQUFpQixTQUFTLCtCQUErQixXQUFXLFNBQVM7Ozs7QUMvSDlHLHdCQUF3QiwrQkFBK0JBLGVBQVkifQ==