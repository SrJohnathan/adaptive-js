import { init, signal, useRouter } from "@adaptive-js/web";
import { closePalette, paletteOpen, openPalette } from "../../shared/omni-hub/palette-store.js";
import { products } from "../../shared/omni-hub/catalog-store.js";
import { conversations } from "../../features/chat/reactives-helpes.js";
import { SCREEN_ROUTES } from "../../shared/omni-hub/types.js";
import { avatarUrl, iniciais } from "../../shared/avatar.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
const SCREEN_ACTIONS = [
	{
		id: "chat-omnichannel",
		title: "Chat Omnichannel",
		desc: "Atendimento WhatsApp, Instagram e Telegram",
		icon: "forum"
	},
	{
		id: "catalogo-erp",
		title: "Catálogo de Produtos & ERP",
		desc: "Sincronizador iFood e Totvs Protheus",
		icon: "sync_alt"
	},
	{
		id: "estudio-banners",
		title: "Estúdio de Criação com IA",
		desc: "Criador de banners gastronômicos 4K",
		icon: "photo_library"
	},
	{
		id: "armazenamento-midias",
		title: "Armazenamento & Mídias",
		desc: "Gerenciar mídias e hospedagem de arquivos",
		icon: "cloud_sync"
	},
	{
		id: "configuracoes-conta",
		title: "Configurações de Conta",
		desc: "Endereço fiscal, plano e faturamento",
		icon: "manage_accounts"
	},
	{
		id: "autenticacao",
		title: "Login Corporativo",
		desc: "Trocar operador ou acessar como administrador",
		icon: "lock"
	}
];
let keyboardBound = false;
export function CommandPalette() {
	const router = useRouter();
	const [query, setQuery] = signal("");
	init(() => {
		if (keyboardBound) return;
		keyboardBound = true;
		const onKeyDown = (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				if (paletteOpen()) {
					closePalette();
				} else {
					setQuery("");
					openPalette();
				}
			}
			if (event.key === "Escape") {
				closePalette();
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	});
	const closeAndGo = (path) => {
		closePalette();
		router.push(path);
	};
	return /* @__PURE__ */ _jsx(_Fragment, { children: () => {
		const search = query().toLowerCase();
		const screens = SCREEN_ACTIONS.filter((s) => s.title.toLowerCase().includes(search) || s.desc.toLowerCase().includes(search));
		const matchedClients = conversations().filter((c) => c.clientName.toLowerCase().includes(search) || c.phone.includes(query()));
		const matchedProducts = products().filter((p) => p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search));
		return paletteOpen() ? /* @__PURE__ */ _jsx("div", {
			className: "fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in",
			onClick: closePalette,
			children: /* @__PURE__ */ _jsxs("div", {
				className: "bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col",
				onClick: (event) => event.stopPropagation(),
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "flex items-center px-4 py-3.5 border-b border-outline-variant/20 bg-surface-container-low",
						children: [
							/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-on-surface-variant text-[22px] mr-3",
								children: "search"
							}),
							/* @__PURE__ */ _jsx("input", {
								type: "text",
								autoFocus: true,
								value: () => query(),
								onInput: (event) => setQuery(event.currentTarget.value),
								placeholder: "Digite para buscar telas, clientes, pratos do cardápio ou ações...",
								className: "w-full bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-on-surface-variant/70"
							}),
							/* @__PURE__ */ _jsx("kbd", {
								className: "px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-code-sm text-[11px]",
								children: "ESC"
							})
						]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "max-h-96 overflow-y-auto p-3 space-y-4 scrollbar-thin",
						children: [
							/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
								className: "px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5",
								children: "Módulos e Telas"
							}), /* @__PURE__ */ _jsx("div", {
								className: "space-y-1",
								children: screens.map((item) => /* @__PURE__ */ _jsxs("div", {
									onClick: () => closeAndGo(SCREEN_ROUTES[item.id]),
									className: "flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors group",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ _jsx("div", {
											className: "w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform",
											children: /* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: item.icon
											})
										}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
											className: "font-title-md text-on-surface font-semibold block",
											children: item.title
										}), /* @__PURE__ */ _jsx("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: item.desc
										})] })]
									}), /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-on-surface-variant text-[16px]",
										children: "arrow_forward"
									})]
								}, item.id))
							})] }),
							matchedClients.length > 0 && /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
								className: "px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5",
								children: "Clientes & Conversas"
							}), /* @__PURE__ */ _jsx("div", {
								className: "space-y-1",
								children: matchedClients.map((client) => /* @__PURE__ */ _jsxs("div", {
									onClick: () => closeAndGo(SCREEN_ROUTES["chat-omnichannel"]),
									className: "flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-3",
										children: [() => {
											const src = avatarUrl(client.avatar);
											return src ? /* @__PURE__ */ _jsx("img", {
												src,
												alt: client.clientName,
												className: "w-8 h-8 rounded-full object-cover"
											}) : /* @__PURE__ */ _jsx("span", {
												className: "w-8 h-8 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-title-sm",
												children: iniciais(client.clientName)
											});
										}, /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
											className: "font-title-md text-on-surface font-semibold block",
											children: client.clientName
										}), /* @__PURE__ */ _jsxs("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: [
												client.phone,
												" • ",
												client.channelBadgeText
											]
										})] })]
									}), /* @__PURE__ */ _jsx("span", {
										className: "font-code-sm text-[11px] text-primary font-bold",
										children: "Abrir Chat"
									})]
								}, client.id))
							})] }),
							matchedProducts.length > 0 && /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
								className: "px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5",
								children: "Cardápio & Estoque ERP"
							}), /* @__PURE__ */ _jsx("div", {
								className: "space-y-1",
								children: matchedProducts.map((prod) => /* @__PURE__ */ _jsxs("div", {
									onClick: () => closeAndGo(SCREEN_ROUTES["catalogo-erp"]),
									className: "flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ _jsx("img", {
											src: prod.image,
											alt: prod.name,
											className: "w-8 h-8 rounded-lg object-cover"
										}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
											className: "font-title-md text-on-surface font-semibold block",
											children: prod.name
										}), /* @__PURE__ */ _jsxs("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: [
												"SKU ",
												prod.sku,
												" • ",
												prod.category
											]
										})] })]
									}), /* @__PURE__ */ _jsx("span", {
										className: "font-title-md font-bold text-primary",
										children: prod.ifoodPrice
									})]
								}, prod.id))
							})] })
						]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant",
						children: [/* @__PURE__ */ _jsxs("span", { children: [
							"Use ",
							/* @__PURE__ */ _jsx("strong", { children: "Tab" }),
							" ou as ",
							/* @__PURE__ */ _jsx("strong", { children: "Setas" }),
							" para navegar"
						] }), /* @__PURE__ */ _jsxs("span", { children: [
							"Pressione ",
							/* @__PURE__ */ _jsx("strong", { children: "ESC" }),
							" para fechar"
						] })]
					})
				]
			})
		}) : /* @__PURE__ */ _jsx(_Fragment, { children: " " });
	} });
}

//# sourceMappingURL=command-palette.__client_ssr.js.map
