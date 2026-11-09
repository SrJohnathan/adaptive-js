import { useRouter } from "@adaptive-js/web";
import { SCREEN_ROUTES } from "../../shared/omni-hub/types.js?t=1791414636356";
import { toggleClientPanel } from "../../shared/omni-hub/client-panel-store.js?t=1791414636356";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
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
export function Sidebar({ active }) {
	const router = useRouter();
	const goTo = (screen) => router.push(SCREEN_ROUTES[screen]);
	return /* @__PURE__ */ _jsxs("aside", {
		className: "fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest shadow-[1px_0_8px_rgba(0,0,0,0.02)] border-r border-outline-variant/20 z-40 flex flex-col justify-between py-4",
		children: [/* @__PURE__ */ _jsxs("div", {
			className: "flex flex-col gap-1 px-3",
			children: [/* @__PURE__ */ _jsxs("div", {
				className: "px-3 py-1 mb-1 flex items-center justify-between",
				children: [/* @__PURE__ */ _jsx("span", {
					className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
					children: "Canais & Módulos"
				}), /* @__PURE__ */ _jsx("span", {
					className: "px-1.5 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm text-[10px] font-bold",
					children: "v4.8"
				})]
			}), /* @__PURE__ */ _jsxs("nav", {
				className: "flex flex-col gap-1",
				children: [NAV_ITEMS.map((item) => {
					const isActive = active === item.id;
					return /* @__PURE__ */ _jsxs("button", {
						type: "button",
						onClick: () => goTo(item.id),
						className: `flex items-center justify-between px-3 py-2.5 rounded-xl font-title-md transition-all text-left group ${isActive ? "bg-primary-container text-on-primary font-bold shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"}`,
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ _jsx("span", {
								className: `material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${isActive ? "text-on-primary" : "text-primary"}`,
								children: item.icon
							}), /* @__PURE__ */ _jsx("span", { children: item.label })]
						}), item.badge && /* @__PURE__ */ _jsx("span", {
							className: `px-1.5 py-0.2 rounded-full text-[11px] font-bold ${isActive ? "bg-white/25 text-white" : "bg-primary/10 text-primary"}`,
							children: item.badge
						})]
					}, item.id);
				}), /* @__PURE__ */ _jsxs("div", {
					className: "pt-3 mt-2 border-t border-outline-variant/20",
					children: [
						/* @__PURE__ */ _jsx("span", {
							className: "px-3 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-1 block",
							children: "Acesso Rápido"
						}),
						active === "chat-omnichannel" ? /* @__PURE__ */ _jsxs("button", {
							type: "button",
							onClick: toggleClientPanel,
							className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-sm font-medium transition-colors",
							title: "Abrir Painel 360° do Cliente",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[18px] text-primary",
								children: "contact_page"
							}), /* @__PURE__ */ _jsx("span", { children: "Perfil 360° do Cliente" })]
						}) : /* @__PURE__ */ _jsx(_Fragment, {}),
						/* @__PURE__ */ _jsxs("button", {
							type: "button",
							onClick: () => goTo("catalogo-erp"),
							className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-sm font-medium transition-colors",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[18px] text-tertiary",
								children: "storefront"
							}), /* @__PURE__ */ _jsx("span", { children: "Vitrines iFood" })]
						}),
						/* @__PURE__ */ _jsxs("button", {
							type: "button",
							onClick: () => goTo("estudio-banners"),
							className: "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-sm font-medium transition-colors",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[18px] text-secondary",
								children: "campaign"
							}), /* @__PURE__ */ _jsx("span", { children: "Disparos & Campanhas" })]
						})
					]
				})]
			})]
		}), /* @__PURE__ */ _jsx("div", {
			className: "px-3",
			children: /* @__PURE__ */ _jsxs("div", {
				className: "p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsx("span", {
						className: "material-symbols-outlined text-tertiary text-[20px]",
						children: "hub"
					}), /* @__PURE__ */ _jsxs("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ _jsx("span", {
							className: "font-label-sm text-on-surface font-semibold",
							children: "iFood & ERP Sync"
						}), /* @__PURE__ */ _jsxs("span", {
							className: "text-[10px] text-emerald-700 font-semibold flex items-center gap-1",
							children: [/* @__PURE__ */ _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }), "Conectado (18ms)"]
						})]
					})]
				}), /* @__PURE__ */ _jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-secondary-container" })]
			})
		})]
	});
}

//# sourceMappingURL=sidebar.__client_ssr.js.map
