import { _ as jsx, a as init, b as __exportAll, c as signal, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { t as SCREEN_ROUTES } from "./chunk-BAJW75ro.js";
import { n as openPalette } from "./chunk-EnkDTPL5.js";

//#region src/components/omni-hub/quick-nav-fab.tsx
var quick_nav_fab_exports = /* @__PURE__ */ __exportAll({ QuickNavFab: () => QuickNavFab });
const QUICK_NAV = [
	{
		id: "chat-omnichannel",
		label: "Chat Omnichannel",
		icon: "forum"
	},
	{
		id: "catalogo-erp",
		label: "Catálogo & ERP",
		icon: "sync_alt"
	},
	{
		id: "estudio-banners",
		label: "Estúdio de IA",
		icon: "photo_library"
	},
	{
		id: "armazenamento-midias",
		label: "Armazenamento",
		icon: "cloud_sync"
	},
	{
		id: "configuracoes-conta",
		label: "Conta & Sede",
		icon: "manage_accounts"
	},
	{
		id: "autenticacao",
		label: "Tela de Login",
		icon: "lock"
	}
];
const QUICK_NAV_HIDE_DELAY_MS = 1e4;
function QuickNavFab({ active }) {
	const router = useRouter();
	const [quickNavOpen, setQuickNavOpen] = signal(false);
	const [quickNavPing, setQuickNavPing] = signal(0);
	const resetQuickNavTimer = () => setQuickNavPing((ping) => ping + 1);
	init(() => {
		quickNavOpen();
		quickNavPing();
		if (!quickNavOpen()) return;
		const timer = setTimeout(() => setQuickNavOpen(false), QUICK_NAV_HIDE_DELAY_MS);
		return () => clearTimeout(timer);
	});
	const openQuickNav = () => {
		setQuickNavOpen(true);
		setQuickNavPing((ping) => ping + 1);
	};
	return /* @__PURE__ */ jsx("div", { children: () => quickNavOpen() ? /* @__PURE__ */ jsxs("div", {
		className: "fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end gap-2.5",
		children: [/* @__PURE__ */ jsxs("nav", {
			"aria-label": "Alternar Telas do Aplicativo",
			onClick: resetQuickNavTimer,
			className: "bg-surface-container-lowest/95 backdrop-blur-md px-3 py-2.5 rounded-2xl shadow-xl border border-outline-variant/30 flex flex-col gap-2 items-end max-w-[90vw]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1 sm:gap-2 flex-wrap justify-end",
				children: [/* @__PURE__ */ jsx("span", {
					className: "hidden xl:inline text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/80 pl-1 pr-2",
					children: "Navegação Rápida:"
				}), QUICK_NAV.map((screen) => {
					const isActive = active === screen.id;
					return /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => router.push(SCREEN_ROUTES[screen.id]),
						className: `px-3 py-1.5 rounded-xl font-label-md flex items-center gap-1.5 transition-all text-nowrap shrink-0 ${isActive ? "bg-primary text-on-primary font-bold shadow-sm" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"}`,
						children: [/* @__PURE__ */ jsx("span", {
							className: `material-symbols-outlined text-[16px] ${isActive ? "text-on-primary" : "text-primary"}`,
							children: screen.icon
						}), /* @__PURE__ */ jsx("span", { children: screen.label })]
					}, screen.id);
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-end gap-2 w-full",
				children: [/* @__PURE__ */ jsx("div", { className: "w-px h-5 bg-outline-variant/30 hidden sm:block" }), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: openPalette,
					className: "p-1.5 rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors",
					title: "Abrir Busca Rápida (Ctrl+K)",
					children: /* @__PURE__ */ jsx("span", {
						className: "material-symbols-outlined text-[20px]",
						children: "search"
					})
				})]
			})]
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => setQuickNavOpen(false),
			className: "h-11 w-11 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl rotate-90 hover:rotate-0 transition-all flex items-center justify-center",
			title: "Fechar Navegação Rápida",
			"aria-label": "Fechar Navegação Rápida",
			children: /* @__PURE__ */ jsx("span", {
				className: "material-symbols-outlined text-[22px]",
				children: "close"
			})
		})]
	}) : /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick: openQuickNav,
		className: "fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 h-11 flex items-center gap-2 px-4 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl transition-all animate-in fade-in",
		title: "Abrir Navegação Rápida",
		"aria-label": "Abrir Navegação Rápida",
		children: [/* @__PURE__ */ jsx("span", {
			className: "material-symbols-outlined text-[22px]",
			children: "apps"
		}), /* @__PURE__ */ jsx("span", {
			className: "font-label-md font-bold",
			children: "Nav Rápida"
		})]
	}) });
}
typeof QuickNavFab === "function" && markClientExport(QuickNavFab, "components/omni-hub/quick-nav-fab", "QuickNavFab", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__quick-nav-fab.tsx
hydrateClientComponents("components/omni-hub/quick-nav-fab", quick_nav_fab_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktRC1iUFVmSmwuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9xdWljay1uYXYtZmFiLnRzeCIsIi4uLy4uL3RlbXAvY2xpZW50LWNvbXBvbmVudHMvY29tcG9uZW50c19fb21uaS1odWJfX3F1aWNrLW5hdi1mYWIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwiaHlkcmF0ZVwiO1xuXG5pbXBvcnQgeyBpbml0LCBzaWduYWwsIHVzZVJvdXRlciB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5pbXBvcnQgeyBvcGVuUGFsZXR0ZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvb21uaS1odWIvcGFsZXR0ZS1zdG9yZVwiO1xuaW1wb3J0IHsgU0NSRUVOX1JPVVRFUywgdHlwZSBTY3JlZW5UeXBlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi90eXBlc1wiO1xuXG5pbnRlcmZhY2UgUXVpY2tOYXZGYWJQcm9wcyB7XG4gIGFjdGl2ZTogU2NyZWVuVHlwZTtcbn1cblxuY29uc3QgUVVJQ0tfTkFWOiB7IGlkOiBTY3JlZW5UeXBlOyBsYWJlbDogc3RyaW5nOyBpY29uOiBzdHJpbmcgfVtdID0gW1xuICB7IGlkOiBcImNoYXQtb21uaWNoYW5uZWxcIiwgbGFiZWw6IFwiQ2hhdCBPbW5pY2hhbm5lbFwiLCBpY29uOiBcImZvcnVtXCIgfSxcbiAgeyBpZDogXCJjYXRhbG9nby1lcnBcIiwgbGFiZWw6IFwiQ2F0w6Fsb2dvICYgRVJQXCIsIGljb246IFwic3luY19hbHRcIiB9LFxuICB7IGlkOiBcImVzdHVkaW8tYmFubmVyc1wiLCBsYWJlbDogXCJFc3TDumRpbyBkZSBJQVwiLCBpY29uOiBcInBob3RvX2xpYnJhcnlcIiB9LFxuICB7IGlkOiBcImFybWF6ZW5hbWVudG8tbWlkaWFzXCIsIGxhYmVsOiBcIkFybWF6ZW5hbWVudG9cIiwgaWNvbjogXCJjbG91ZF9zeW5jXCIgfSxcbiAgeyBpZDogXCJjb25maWd1cmFjb2VzLWNvbnRhXCIsIGxhYmVsOiBcIkNvbnRhICYgU2VkZVwiLCBpY29uOiBcIm1hbmFnZV9hY2NvdW50c1wiIH0sXG4gIHsgaWQ6IFwiYXV0ZW50aWNhY2FvXCIsIGxhYmVsOiBcIlRlbGEgZGUgTG9naW5cIiwgaWNvbjogXCJsb2NrXCIgfSxcbl07XG5cbmNvbnN0IFFVSUNLX05BVl9ISURFX0RFTEFZX01TID0gMTBfMDAwO1xuXG5leHBvcnQgZnVuY3Rpb24gUXVpY2tOYXZGYWIoeyBhY3RpdmUgfTogUXVpY2tOYXZGYWJQcm9wcykge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgW3F1aWNrTmF2T3Blbiwgc2V0UXVpY2tOYXZPcGVuXSA9IHNpZ25hbChmYWxzZSk7XG4gIGNvbnN0IFtxdWlja05hdlBpbmcsIHNldFF1aWNrTmF2UGluZ10gPSBzaWduYWwoMCk7XG5cbiAgY29uc3QgcmVzZXRRdWlja05hdlRpbWVyID0gKCkgPT4gc2V0UXVpY2tOYXZQaW5nKChwaW5nKSA9PiBwaW5nICsgMSk7XG5cbiAgaW5pdCgoKSA9PiB7XG4gICAgcXVpY2tOYXZPcGVuKCk7XG4gICAgcXVpY2tOYXZQaW5nKCk7XG4gICAgaWYgKCFxdWlja05hdk9wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBzZXRRdWlja05hdk9wZW4oZmFsc2UpLCBRVUlDS19OQVZfSElERV9ERUxBWV9NUyk7XG4gICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0aW1lcik7XG4gIH0pO1xuXG4gIGNvbnN0IG9wZW5RdWlja05hdiA9ICgpID0+IHtcbiAgICBzZXRRdWlja05hdk9wZW4odHJ1ZSk7XG4gICAgc2V0UXVpY2tOYXZQaW5nKChwaW5nKSA9PiBwaW5nICsgMSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgeygpID0+XG4gICAgICAgIHF1aWNrTmF2T3BlbigpID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTQgcmlnaHQtNCBzbTpib3R0b20tNSBzbTpyaWdodC01IHotNTAgZmxleCBmbGV4LWNvbCBpdGVtcy1lbmQgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgPG5hdlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiQWx0ZXJuYXIgVGVsYXMgZG8gQXBsaWNhdGl2b1wiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3Jlc2V0UXVpY2tOYXZUaW1lcn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0Lzk1IGJhY2tkcm9wLWJsdXItbWQgcHgtMyBweS0yLjUgcm91bmRlZC0yeGwgc2hhZG93LXhsIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzMwIGZsZXggZmxleC1jb2wgZ2FwLTIgaXRlbXMtZW5kIG1heC13LVs5MHZ3XVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgc206Z2FwLTIgZmxleC13cmFwIGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIHhsOmlubGluZSB0ZXh0LVsxMXB4XSBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtb24tc3VyZmFjZS12YXJpYW50LzgwIHBsLTEgcHItMlwiPlxuICAgICAgICAgICAgICAgICAgTmF2ZWdhw6fDo28gUsOhcGlkYTpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICB7UVVJQ0tfTkFWLm1hcCgoc2NyZWVuKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZSA9PT0gc2NyZWVuLmlkO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17c2NyZWVuLmlkfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFNDUkVFTl9ST1VURVNbc2NyZWVuLmlkXSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC14bCBmb250LWxhYmVsLW1kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgdGV4dC1ub3dyYXAgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1wcmltYXJ5IHRleHQtb24tcHJpbWFyeSBmb250LWJvbGQgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInRleHQtb24tc3VyZmFjZS12YXJpYW50IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIGhvdmVyOnRleHQtb24tc3VyZmFjZVwiXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE2cHhdICR7aXNBY3RpdmUgPyBcInRleHQtb24tcHJpbWFyeVwiIDogXCJ0ZXh0LXByaW1hcnlcIn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzY3JlZW4uaWNvbn1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3NjcmVlbi5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBnYXAtMiB3LWZ1bGxcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctcHggaC01IGJnLW91dGxpbmUtdmFyaWFudC8zMCBoaWRkZW4gc206YmxvY2tcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29wZW5QYWxldHRlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC14bCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIkFicmlyIEJ1c2NhIFLDoXBpZGEgKEN0cmwrSylcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF1cIj5zZWFyY2g8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1aWNrTmF2T3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtMTEgdy0xMSByb3VuZGVkLWZ1bGwgYmctcHJpbWFyeSB0ZXh0LW9uLXByaW1hcnkgc2hhZG93LWxnIGhvdmVyOnNoYWRvdy14bCByb3RhdGUtOTAgaG92ZXI6cm90YXRlLTAgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkZlY2hhciBOYXZlZ2HDp8OjbyBSw6FwaWRhXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkZlY2hhciBOYXZlZ2HDp8OjbyBSw6FwaWRhXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMnB4XVwiPmNsb3NlPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtvcGVuUXVpY2tOYXZ9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tNCByaWdodC00IHNtOmJvdHRvbS01IHNtOnJpZ2h0LTUgei01MCBoLTExIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcm91bmRlZC1mdWxsIGJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IHNoYWRvdy1sZyBob3ZlcjpzaGFkb3cteGwgdHJhbnNpdGlvbi1hbGwgYW5pbWF0ZS1pbiBmYWRlLWluXCJcbiAgICAgICAgICAgIHRpdGxlPVwiQWJyaXIgTmF2ZWdhw6fDo28gUsOhcGlkYVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiQWJyaXIgTmF2ZWdhw6fDo28gUsOhcGlkYVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMnB4XVwiPmFwcHM8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLW1kIGZvbnQtYm9sZFwiPk5hdiBSw6FwaWRhPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApXG4gICAgICB9XG4gICAgPC9kaXY+XG4gICk7XG59IiwiXG5pbXBvcnQgKiBhcyBjbGllbnRNb2R1bGUgZnJvbSBcIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL29tbmktaHViL3F1aWNrLW5hdi1mYWIudHN4XCI7XG5pbXBvcnQgeyBoeWRyYXRlQ2xpZW50Q29tcG9uZW50cyB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5cbmh5ZHJhdGVDbGllbnRDb21wb25lbnRzKFwiY29tcG9uZW50cy9vbW5pLWh1Yi9xdWljay1uYXYtZmFiXCIsIGNsaWVudE1vZHVsZSk7XG5leHBvcnQge307XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFBLE1BQU0sWUFBK0Q7Q0FDbkU7RUFBRSxJQUFJO0VBQW9CLE9BQU87RUFBb0IsTUFBTTtDQUFRO0NBQ25FO0VBQUUsSUFBSTtFQUFnQixPQUFPO0VBQWtCLE1BQU07Q0FBVztDQUNoRTtFQUFFLElBQUk7RUFBbUIsT0FBTztFQUFpQixNQUFNO0NBQWdCO0NBQ3ZFO0VBQUUsSUFBSTtFQUF3QixPQUFPO0VBQWlCLE1BQU07Q0FBYTtDQUN6RTtFQUFFLElBQUk7RUFBdUIsT0FBTztFQUFnQixNQUFNO0NBQWtCO0NBQzVFO0VBQUUsSUFBSTtFQUFnQixPQUFPO0VBQWlCLE1BQU07Q0FBTztBQUM3RDtBQUVBLE1BQU0sMEJBQTBCO0FBRWhDLFNBQWdCLFlBQVksRUFBRSxVQUE0QjtDQUN4RCxNQUFNLFNBQVMsVUFBVTtDQUN6QixNQUFNLENBQUMsY0FBYyxtQkFBbUIsT0FBTyxLQUFLO0NBQ3BELE1BQU0sQ0FBQyxjQUFjLG1CQUFtQixPQUFPLENBQUM7Q0FFaEQsTUFBTSwyQkFBMkIsaUJBQWlCLFNBQVMsT0FBTyxDQUFDO0NBRW5FLFdBQVc7RUFDVCxhQUFhO0VBQ2IsYUFBYTtFQUNiLElBQUksQ0FBQyxhQUFhLEdBQUc7RUFDckIsTUFBTSxRQUFRLGlCQUFpQixnQkFBZ0IsS0FBSyxHQUFHLHVCQUF1QjtFQUM5RSxhQUFhLGFBQWEsS0FBSztDQUNqQyxDQUFDO0NBRUQsTUFBTSxxQkFBcUI7RUFDekIsZ0JBQWdCLElBQUk7RUFDcEIsaUJBQWlCLFNBQVMsT0FBTyxDQUFDO0NBQ3BDO0NBRUEsT0FDRSxvQkFBQyxPQUFELGtCQUVJLGFBQWEsSUFDWCxxQkFBQyxPQUFEO0VBQUssV0FBVTtZQUFmLENBQ0UscUJBQUMsT0FBRDtHQUNFLGNBQVc7R0FDWCxTQUFTO0dBQ1QsV0FBVTthQUhaLENBS0UscUJBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLG9CQUFDLFFBQUQ7S0FBTSxXQUFVO2VBQXVHO0lBRWpILElBRUwsVUFBVSxLQUFLLFdBQVc7S0FDekIsTUFBTSxXQUFXLFdBQVcsT0FBTztLQUNuQyxPQUNFLHFCQUFDLFVBQUQ7TUFFRSxNQUFLO01BQ0wsZUFBZSxPQUFPLEtBQUssY0FBYyxPQUFPLEdBQUc7TUFDbkQsV0FBVyxzR0FDVCxXQUNJLG1EQUNBO2dCQVBSLENBVUUsb0JBQUMsUUFBRDtPQUFNLFdBQVcseUNBQXlDLFdBQVcsb0JBQW9CO2lCQUN0RixPQUFPO01BQ0osSUFDTixvQkFBQyxRQUFELFlBQU8sT0FBTyxNQUFZLEVBQ3BCO1FBYkQsT0FBTyxFQWFOO0lBRVosQ0FBQyxDQUNFO09BRUwscUJBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLG9CQUFDLE9BQUQsRUFBSyxXQUFVLGlEQUFzRCxJQUNyRSxvQkFBQyxVQUFEO0tBQ0UsTUFBSztLQUNMLFNBQVM7S0FDVCxXQUFVO0tBQ1YsT0FBTTtlQUVOLG9CQUFDLFFBQUQ7TUFBTSxXQUFVO2dCQUF3QztLQUFZO0lBQzlELEVBQ0w7S0FDRjtNQUVMLG9CQUFDLFVBQUQ7R0FDRSxNQUFLO0dBQ0wsZUFBZSxnQkFBZ0IsS0FBSztHQUNwQyxXQUFVO0dBQ1YsT0FBTTtHQUNOLGNBQVc7YUFFWCxvQkFBQyxRQUFEO0lBQU0sV0FBVTtjQUF3QztHQUFXO0VBQzdELEVBQ0w7TUFFTCxxQkFBQyxVQUFEO0VBQ0UsTUFBSztFQUNMLFNBQVM7RUFDVCxXQUFVO0VBQ1YsT0FBTTtFQUNOLGNBQVc7WUFMYixDQU9FLG9CQUFDLFFBQUQ7R0FBTSxXQUFVO2FBQXdDO0VBQVUsSUFDbEUsb0JBQUMsUUFBRDtHQUFNLFdBQVU7YUFBMEI7RUFBZ0IsRUFDcEQ7SUFHVDtBQUVUO0FBR0EsT0FBTyxnQkFBZ0IsY0FBYyxpQkFBaUIsYUFBYSxxQ0FBcUMsZUFBZSxTQUFTOzs7O0FDakhoSSx3QkFBd0IscUNBQXFDQSxxQkFBWSJ9