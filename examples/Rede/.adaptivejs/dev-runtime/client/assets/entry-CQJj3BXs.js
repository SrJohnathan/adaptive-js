import { _ as jsx, a as init, b as __exportAll, c as signal, g as Fragment, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { o as conversations } from "./chunk-DSTwi42U.js";
import { n as iniciais, t as avatarUrl } from "./chunk-dojgNuCz.js";
import { t as SCREEN_ROUTES } from "./chunk-BAJW75ro.js";
import { t as products } from "./chunk-nb0xSHZp.js";
import { n as openPalette, r as paletteOpen, t as closePalette } from "./chunk-EnkDTPL5.js";

//#region src/components/omni-hub/command-palette.tsx
var command_palette_exports = /* @__PURE__ */ __exportAll({ CommandPalette: () => CommandPalette });
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
function CommandPalette() {
	const router = useRouter();
	const [query, setQuery] = signal("");
	init(() => {
		if (keyboardBound) return;
		keyboardBound = true;
		const onKeyDown = (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				if (paletteOpen()) closePalette();
				else {
					setQuery("");
					openPalette();
				}
			}
			if (event.key === "Escape") closePalette();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	});
	const closeAndGo = (path) => {
		closePalette();
		router.push(path);
	};
	return /* @__PURE__ */ jsx(Fragment, { children: () => {
		const search = query().toLowerCase();
		const screens = SCREEN_ACTIONS.filter((s) => s.title.toLowerCase().includes(search) || s.desc.toLowerCase().includes(search));
		const matchedClients = conversations().filter((c) => c.clientName.toLowerCase().includes(search) || c.phone.includes(query()));
		const matchedProducts = products().filter((p) => p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search));
		return paletteOpen() ? /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in",
			onClick: closePalette,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col",
				onClick: (event) => event.stopPropagation(),
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center px-4 py-3.5 border-b border-outline-variant/20 bg-surface-container-low",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-on-surface-variant text-[22px] mr-3",
								children: "search"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								autoFocus: true,
								value: () => query(),
								onInput: (event) => setQuery(event.currentTarget.value),
								placeholder: "Digite para buscar telas, clientes, pratos do cardápio ou ações...",
								className: "w-full bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-on-surface-variant/70"
							}),
							/* @__PURE__ */ jsx("kbd", {
								className: "px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-code-sm text-[11px]",
								children: "ESC"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "max-h-96 overflow-y-auto p-3 space-y-4 scrollbar-thin",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5",
								children: "Módulos e Telas"
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-1",
								children: screens.map((item) => /* @__PURE__ */ jsxs("div", {
									onClick: () => closeAndGo(SCREEN_ROUTES[item.id]),
									className: "flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors group",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform",
											children: /* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: item.icon
											})
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-title-md text-on-surface font-semibold block",
											children: item.title
										}), /* @__PURE__ */ jsx("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: item.desc
										})] })]
									}), /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-on-surface-variant text-[16px]",
										children: "arrow_forward"
									})]
								}, item.id))
							})] }),
							matchedClients.length > 0 && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5",
								children: "Clientes & Conversas"
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-1",
								children: matchedClients.map((client) => /* @__PURE__ */ jsxs("div", {
									onClick: () => closeAndGo(SCREEN_ROUTES["chat-omnichannel"]),
									className: "flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [() => {
											const src = avatarUrl(client.avatar);
											return src ? /* @__PURE__ */ jsx("img", {
												src,
												alt: client.clientName,
												className: "w-8 h-8 rounded-full object-cover"
											}) : /* @__PURE__ */ jsx("span", {
												className: "w-8 h-8 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-title-sm",
												children: iniciais(client.clientName)
											});
										}, /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-title-md text-on-surface font-semibold block",
											children: client.clientName
										}), /* @__PURE__ */ jsxs("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: [
												client.phone,
												" • ",
												client.channelBadgeText
											]
										})] })]
									}), /* @__PURE__ */ jsx("span", {
										className: "font-code-sm text-[11px] text-primary font-bold",
										children: "Abrir Chat"
									})]
								}, client.id))
							})] }),
							matchedProducts.length > 0 && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5",
								children: "Cardápio & Estoque ERP"
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-1",
								children: matchedProducts.map((prod) => /* @__PURE__ */ jsxs("div", {
									onClick: () => closeAndGo(SCREEN_ROUTES["catalogo-erp"]),
									className: "flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("img", {
											src: prod.image,
											alt: prod.name,
											className: "w-8 h-8 rounded-lg object-cover"
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-title-md text-on-surface font-semibold block",
											children: prod.name
										}), /* @__PURE__ */ jsxs("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: [
												"SKU ",
												prod.sku,
												" • ",
												prod.category
											]
										})] })]
									}), /* @__PURE__ */ jsx("span", {
										className: "font-title-md font-bold text-primary",
										children: prod.ifoodPrice
									})]
								}, prod.id))
							})] })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant",
						children: [/* @__PURE__ */ jsxs("span", { children: [
							"Use ",
							/* @__PURE__ */ jsx("strong", { children: "Tab" }),
							" ou as ",
							/* @__PURE__ */ jsx("strong", { children: "Setas" }),
							" para navegar"
						] }), /* @__PURE__ */ jsxs("span", { children: [
							"Pressione ",
							/* @__PURE__ */ jsx("strong", { children: "ESC" }),
							" para fechar"
						] })]
					})
				]
			})
		}) : /* @__PURE__ */ jsx(Fragment, { children: " " });
	} });
}
typeof CommandPalette === "function" && markClientExport(CommandPalette, "components/omni-hub/command-palette", "CommandPalette", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__command-palette.tsx
hydrateClientComponents("components/omni-hub/command-palette", command_palette_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktQ1FKajNCWHMuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9jb21tYW5kLXBhbGV0dGUudHN4IiwiLi4vLi4vdGVtcC9jbGllbnQtY29tcG9uZW50cy9jb21wb25lbnRzX19vbW5pLWh1Yl9fY29tbWFuZC1wYWxldHRlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcImh5ZHJhdGVcIjtcblxuaW1wb3J0IHsgaW5pdCwgc2lnbmFsLCB1c2VSb3V0ZXIgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuaW1wb3J0IHsgY2xvc2VQYWxldHRlLCBwYWxldHRlT3Blbiwgb3BlblBhbGV0dGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3BhbGV0dGUtc3RvcmVcIjtcbmltcG9ydCB7IHByb2R1Y3RzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi9jYXRhbG9nLXN0b3JlXCI7XG5pbXBvcnQgeyBjb252ZXJzYXRpb25zIH0gZnJvbSBcIi4uLy4uL2ZlYXR1cmVzL2NoYXQvcmVhY3RpdmVzLWhlbHBlc1wiO1xuaW1wb3J0IHsgU0NSRUVOX1JPVVRFUywgdHlwZSBTY3JlZW5UeXBlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi90eXBlc1wiO1xuaW1wb3J0IHsgYXZhdGFyVXJsLCBpbmljaWFpcyB9IGZyb20gXCIuLi8uLi9zaGFyZWQvYXZhdGFyXCI7XG5cbmNvbnN0IFNDUkVFTl9BQ1RJT05TOiB7IGlkOiBTY3JlZW5UeXBlOyB0aXRsZTogc3RyaW5nOyBkZXNjOiBzdHJpbmc7IGljb246IHN0cmluZyB9W10gPSBbXG4gIHsgaWQ6IFwiY2hhdC1vbW5pY2hhbm5lbFwiLCB0aXRsZTogXCJDaGF0IE9tbmljaGFubmVsXCIsIGRlc2M6IFwiQXRlbmRpbWVudG8gV2hhdHNBcHAsIEluc3RhZ3JhbSBlIFRlbGVncmFtXCIsIGljb246IFwiZm9ydW1cIiB9LFxuICB7IGlkOiBcImNhdGFsb2dvLWVycFwiLCB0aXRsZTogXCJDYXTDoWxvZ28gZGUgUHJvZHV0b3MgJiBFUlBcIiwgZGVzYzogXCJTaW5jcm9uaXphZG9yIGlGb29kIGUgVG90dnMgUHJvdGhldXNcIiwgaWNvbjogXCJzeW5jX2FsdFwiIH0sXG4gIHsgaWQ6IFwiZXN0dWRpby1iYW5uZXJzXCIsIHRpdGxlOiBcIkVzdMO6ZGlvIGRlIENyaWHDp8OjbyBjb20gSUFcIiwgZGVzYzogXCJDcmlhZG9yIGRlIGJhbm5lcnMgZ2FzdHJvbsO0bWljb3MgNEtcIiwgaWNvbjogXCJwaG90b19saWJyYXJ5XCIgfSxcbiAgeyBpZDogXCJhcm1hemVuYW1lbnRvLW1pZGlhc1wiLCB0aXRsZTogXCJBcm1hemVuYW1lbnRvICYgTcOtZGlhc1wiLCBkZXNjOiBcIkdlcmVuY2lhciBtw61kaWFzIGUgaG9zcGVkYWdlbSBkZSBhcnF1aXZvc1wiLCBpY29uOiBcImNsb3VkX3N5bmNcIiB9LFxuICB7IGlkOiBcImNvbmZpZ3VyYWNvZXMtY29udGFcIiwgdGl0bGU6IFwiQ29uZmlndXJhw6fDtWVzIGRlIENvbnRhXCIsIGRlc2M6IFwiRW5kZXJlw6dvIGZpc2NhbCwgcGxhbm8gZSBmYXR1cmFtZW50b1wiLCBpY29uOiBcIm1hbmFnZV9hY2NvdW50c1wiIH0sXG4gIHsgaWQ6IFwiYXV0ZW50aWNhY2FvXCIsIHRpdGxlOiBcIkxvZ2luIENvcnBvcmF0aXZvXCIsIGRlc2M6IFwiVHJvY2FyIG9wZXJhZG9yIG91IGFjZXNzYXIgY29tbyBhZG1pbmlzdHJhZG9yXCIsIGljb246IFwibG9ja1wiIH0sXG5dO1xuXG5sZXQga2V5Ym9hcmRCb3VuZCA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29tbWFuZFBhbGV0dGUoKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHNpZ25hbChcIlwiKTtcblxuICBpbml0KCgpID0+IHtcbiAgICBpZiAoa2V5Ym9hcmRCb3VuZCkgcmV0dXJuO1xuICAgIGtleWJvYXJkQm91bmQgPSB0cnVlO1xuXG4gICAgY29uc3Qgb25LZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBpZiAoKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkgJiYgZXZlbnQua2V5LnRvTG93ZXJDYXNlKCkgPT09IFwia1wiKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChwYWxldHRlT3BlbigpKSB7XG4gICAgICAgICAgY2xvc2VQYWxldHRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0UXVlcnkoXCJcIik7XG4gICAgICAgICAgb3BlblBhbGV0dGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICBjbG9zZVBhbGV0dGUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICB9KTtcblxuICBjb25zdCBjbG9zZUFuZEdvID0gKHBhdGg6IHN0cmluZykgPT4ge1xuICAgIGNsb3NlUGFsZXR0ZSgpO1xuICAgIHJvdXRlci5wdXNoKHBhdGgpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHsoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IHF1ZXJ5KCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3Qgc2NyZWVucyA9IFNDUkVFTl9BQ1RJT05TLmZpbHRlcihcbiAgICAgICAgICAocykgPT4gcy50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaCkgfHwgcy5kZXNjLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoKSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbWF0Y2hlZENsaWVudHMgPSBjb252ZXJzYXRpb25zKCkuZmlsdGVyKFxuICAgICAgICAgIChjKSA9PiBjLmNsaWVudE5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gpIHx8IGMucGhvbmUuaW5jbHVkZXMocXVlcnkoKSksXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRQcm9kdWN0cyA9IHByb2R1Y3RzKCkuZmlsdGVyKFxuICAgICAgICAgIChwKSA9PiBwLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gpIHx8IHAuY2F0ZWdvcnkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2gpLFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBwYWxldHRlT3BlbigpID8gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei1bNzBdIGJnLWJsYWNrLzYwIGJhY2tkcm9wLWJsdXItc20gZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWNlbnRlciBwdC0yMCBwLTQgYW5pbWF0ZS1pbiBmYWRlLWluXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2Nsb3NlUGFsZXR0ZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCB3LWZ1bGwgbWF4LXctMnhsIHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMzAgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2xcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7LyogSW5wdXQgQmFyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHB4LTQgcHktMy41IGJvcmRlci1iIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgYmctc3VyZmFjZS1jb250YWluZXItbG93XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCB0ZXh0LVsyMnB4XSBtci0zXCI+c2VhcmNoPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gcXVlcnkoKX1cbiAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9eyhldmVudCkgPT4gc2V0UXVlcnkoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRpZ2l0ZSBwYXJhIGJ1c2NhciB0ZWxhcywgY2xpZW50ZXMsIHByYXRvcyBkbyBjYXJkw6FwaW8gb3UgYcOnw7Vlcy4uLlwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctdHJhbnNwYXJlbnQgYm9yZGVyLW5vbmUgb3V0bGluZS1ub25lIGZvbnQtYm9keS1tZCB0ZXh0LW9uLXN1cmZhY2UgcGxhY2Vob2xkZXI6dGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQvNzBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGtiZCBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2hlc3QgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1jb2RlLXNtIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICBFU0NcbiAgICAgICAgICAgICAgICA8L2tiZD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFJlc3VsdHMgTGlzdCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtaC05NiBvdmVyZmxvdy15LWF1dG8gcC0zIHNwYWNlLXktNCBzY3JvbGxiYXItdGhpblwiPlxuICAgICAgICAgICAgICAgIHsvKiBNw7NkdWxvcyBkbyBTaXN0ZW1hICovfVxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2sgbWItMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIE3Ds2R1bG9zIGUgVGVsYXNcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzY3JlZW5zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGNsb3NlQW5kR28oU0NSRUVOX1JPVVRFU1tpdGVtLmlkXSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0yLjUgcm91bmRlZC14bCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9ycyBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1sZyBiZy1wcmltYXJ5LWNvbnRhaW5lci8yMCB0ZXh0LXByaW1hcnkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tdHJhbnNmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPntpdGVtLmljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXRpdGxlLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkIGJsb2NrXCI+e2l0ZW0udGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPntpdGVtLmRlc2N9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCB0ZXh0LVsxNnB4XVwiPmFycm93X2ZvcndhcmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogQ2xpZW50ZXMgRW5jb250cmFkb3MgKi99XG4gICAgICAgICAgICAgICAge21hdGNoZWRDbGllbnRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiB0ZXh0LVsxMXB4XSBmb250LWJvbGQgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGJsb2NrIG1iLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIENsaWVudGVzICYgQ29udmVyc2FzXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bWF0Y2hlZENsaWVudHMubWFwKChjbGllbnQpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtjbGllbnQuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGNsb3NlQW5kR28oU0NSRUVOX1JPVVRFU1tcImNoYXQtb21uaWNoYW5uZWxcIl0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0yLjUgcm91bmRlZC14bCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gYXZhdGFyVXJsKGNsaWVudC5hdmF0YXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNyYyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3NyY30gYWx0PXtjbGllbnQuY2xpZW50TmFtZX0gY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWZ1bGwgb2JqZWN0LWNvdmVyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1mdWxsIGJnLXByaW1hcnktY29udGFpbmVyLzIwIHRleHQtcHJpbWFyeSBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC10aXRsZS1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpbmljaWFpcyhjbGllbnQuY2xpZW50TmFtZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZCBibG9ja1wiPntjbGllbnQuY2xpZW50TmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1bMTFweF0gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NsaWVudC5waG9uZX0g4oCiIHtjbGllbnQuY2hhbm5lbEJhZGdlVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbSB0ZXh0LVsxMXB4XSB0ZXh0LXByaW1hcnkgZm9udC1ib2xkXCI+QWJyaXIgQ2hhdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogUHJhdG9zIGRvIENhcmTDoXBpbyBFUlAgKi99XG4gICAgICAgICAgICAgICAge21hdGNoZWRQcm9kdWN0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgdGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtb24tc3VyZmFjZS12YXJpYW50IHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9jayBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICBDYXJkw6FwaW8gJiBFc3RvcXVlIEVSUFxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAge21hdGNoZWRQcm9kdWN0cy5tYXAoKHByb2QpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtwcm9kLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBjbG9zZUFuZEdvKFNDUkVFTl9ST1VURVNbXCJjYXRhbG9nby1lcnBcIl0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0yLjUgcm91bmRlZC14bCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17cHJvZC5pbWFnZX0gYWx0PXtwcm9kLm5hbWV9IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1sZyBvYmplY3QtY292ZXJcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXRpdGxlLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkIGJsb2NrXCI+e3Byb2QubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1bMTFweF0gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU0tVIHtwcm9kLnNrdX0g4oCiIHtwcm9kLmNhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCBmb250LWJvbGQgdGV4dC1wcmltYXJ5XCI+e3Byb2QuaWZvb2RQcmljZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRm9vdGVyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyLXQgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTFweF0gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIFVzZSA8c3Ryb25nPlRhYjwvc3Ryb25nPiBvdSBhcyA8c3Ryb25nPlNldGFzPC9zdHJvbmc+IHBhcmEgbmF2ZWdhclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIFByZXNzaW9uZSA8c3Ryb25nPkVTQzwvc3Ryb25nPiBwYXJhIGZlY2hhclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6ICg8PiA8Lz4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgPC8+XG4gICk7XG59IiwiXG5pbXBvcnQgKiBhcyBjbGllbnRNb2R1bGUgZnJvbSBcIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL29tbmktaHViL2NvbW1hbmQtcGFsZXR0ZS50c3hcIjtcbmltcG9ydCB7IGh5ZHJhdGVDbGllbnRDb21wb25lbnRzIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcblxuaHlkcmF0ZUNsaWVudENvbXBvbmVudHMoXCJjb21wb25lbnRzL29tbmktaHViL2NvbW1hbmQtcGFsZXR0ZVwiLCBjbGllbnRNb2R1bGUpO1xuZXhwb3J0IHt9O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFPQSxNQUFNLGlCQUFrRjtDQUN0RjtFQUFFLElBQUk7RUFBb0IsT0FBTztFQUFvQixNQUFNO0VBQThDLE1BQU07Q0FBUTtDQUN2SDtFQUFFLElBQUk7RUFBZ0IsT0FBTztFQUE4QixNQUFNO0VBQXdDLE1BQU07Q0FBVztDQUMxSDtFQUFFLElBQUk7RUFBbUIsT0FBTztFQUE2QixNQUFNO0VBQXVDLE1BQU07Q0FBZ0I7Q0FDaEk7RUFBRSxJQUFJO0VBQXdCLE9BQU87RUFBMEIsTUFBTTtFQUE2QyxNQUFNO0NBQWE7Q0FDckk7RUFBRSxJQUFJO0VBQXVCLE9BQU87RUFBMEIsTUFBTTtFQUF3QyxNQUFNO0NBQWtCO0NBQ3BJO0VBQUUsSUFBSTtFQUFnQixPQUFPO0VBQXFCLE1BQU07RUFBaUQsTUFBTTtDQUFPO0FBQ3hIO0FBRUEsSUFBSSxnQkFBZ0I7QUFFcEIsU0FBZ0IsaUJBQWlCO0NBQy9CLE1BQU0sU0FBUyxVQUFVO0NBQ3pCLE1BQU0sQ0FBQyxPQUFPLFlBQVksT0FBTyxFQUFFO0NBRW5DLFdBQVc7RUFDVCxJQUFJLGVBQWU7RUFDbkIsZ0JBQWdCO0VBRWhCLE1BQU0sYUFBYSxVQUF5QjtHQUMxQyxLQUFLLE1BQU0sV0FBVyxNQUFNLFlBQVksTUFBTSxJQUFJLFlBQVksTUFBTSxLQUFLO0lBQ3ZFLE1BQU0sZUFBZTtJQUNyQixJQUFJLFlBQVksR0FDZCxhQUFhO1NBQ1I7S0FDTCxTQUFTLEVBQUU7S0FDWCxZQUFZO0lBQ2Q7R0FDRjtHQUNBLElBQUksTUFBTSxRQUFRLFVBQ2hCLGFBQWE7RUFFakI7RUFFQSxPQUFPLGlCQUFpQixXQUFXLFNBQVM7RUFDNUMsYUFBYSxPQUFPLG9CQUFvQixXQUFXLFNBQVM7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