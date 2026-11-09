import { init, signal, useHandler } from "@adaptive-js/web";
import { channelFilter, conversations, selectConversation, selectedConversationId } from "../../features/chat/reactives-helpes.js?t=1791414636356";
import { Reveal, RecyclerView } from "@adaptive-js/components";
import { avatarUrl } from "../../shared/avatar.js?t=1791414636356";
import { deleteConversation, readConversation } from "../../features/chat/ContextSocket.js?t=1791414636356";
import { showToast } from "../../shared/omni-hub/toast-store.js?t=1791414636356";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
/**
* Tamanho do menu, para o ponteiro na borda não empurrar o menu para fora da
* tela. Medido à mão de propósito: o menu tem um item só, e medir o nó
* depois de inserido custaria um ref e um efeito para nada.
*/
const LARGURA_DO_MENU = 208;
const ALTURA_DO_MENU = 44;
const MARGEM_DA_BORDA = 8;
function channelBadgeClass(channel) {
	if (channel === "whatsapp") return "bg-emerald-600 text-white";
	if (channel === "instagram") return "bg-pink-600 text-white";
	return "bg-sky-600 text-white";
}
function channelIcon(channel) {
	if (channel === "whatsapp") return "chat";
	if (channel === "instagram") return "photo_camera";
	return "send";
}
/**
* Item da lista como descritor — estrutura estável, getters só nas pontas.
* Sem {() => <div>...</div>} à volta do bloco.
*/
function conversationItemNode(conv, ctx) {
	const src = avatarUrl(conv.avatar);
	const avatar = src ? {
		type: "img",
		class: "w-11 h-11 rounded-full object-cover ring-1 ring-outline-variant/30",
		props: {
			alt: conv.clientName,
			src: src ?? ""
		}
	} : {
		type: "div",
		class: "w-11 h-11 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-headline-md",
		value: conv.clientName.charAt(0)
	};
	const children = [{
		type: "div",
		class: "relative shrink-0",
		children: [avatar, {
			type: "span",
			class: `absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[11px] shadow-sm border border-surface-container-lowest ${channelBadgeClass(conv.channel)}`,
			children: [{
				type: "span",
				class: "material-symbols-outlined text-[13px]",
				value: channelIcon(conv.channel)
			}]
		}]
	}, {
		type: "div",
		class: "flex-1 min-w-0",
		children: [
			{
				type: "div",
				class: "flex items-center justify-between mb-0.5",
				children: [{
					type: "span",
					class: "font-title-md text-on-surface font-semibold truncate",
					value: () => conv.clientName
				}, {
					type: "span",
					class: "font-code-sm text-[11px] text-on-surface-variant font-mono",
					value: () => conv.time
				}]
			},
			...conv.orderRef ? [{
				type: "div",
				class: "flex items-center gap-1 text-[11px] text-primary font-code-sm font-semibold mb-0.5",
				children: [
					{
						type: "span",
						class: "material-symbols-outlined text-[12px]",
						value: "receipt"
					},
					{
						type: "span",
						value: `Pedido iFood ${conv.orderRef}`
					},
					...conv.vipStatus ? [{
						type: "span",
						class: "bg-amber-100 text-amber-800 px-1 py-0.2 rounded text-[9px] font-bold ml-1",
						value: conv.vipStatus
					}] : []
				]
			}] : [],
			{
				type: "div",
				class: "flex items-center justify-between ",
				children: [{
					type: "p",
					class: "font-body-sm text-on-surface-variant truncate",
					value: () => conv.lastMessage
				}, {
					type: "",
					class: "font-body-sm text-on-surface-variant truncate",
					value: () => conv.lastMessage
				}]
			}
		]
	}];
	if (conv.unreadCount && conv.unreadCount > 0) {
		children.push({
			type: "span",
			class: "w-5 h-5 rounded-full bg-primary-container text-on-primary font-bold text-[11px] flex items-center justify-center shrink-0",
			value: () => String(conv.unreadCount ?? 0)
		});
	}
	return {
		type: "div",
		class: () => {
			const isSelected = conv.id === selectedConversationId();
			return ["p-3.5 flex items-start gap-3 cursor-pointer transition-all border-b border-outline-variant/15", isSelected ? "bg-surface-container-high/60 border-l-4 border-primary" : "hover:bg-surface-container-low"].join(" ");
		},
		onClick: () => ctx.onSelect(conv),
		// requer onContextMenu no applyItemNode do RecyclerView
		onContextMenu: (event) => ctx.onContextMenu(event, conv),
		children
	};
}
export function ListContects() {
	const call = useHandler("chat-stream:selected");
	const [menu, setMenu] = signal(null);
	const [aApagar, setAApagar] = signal(null);
	const fecharMenu = () => setMenu(null);
	init(() => {
		const fechar = () => setMenu(null);
		const onKeyDown = (event) => {
			if (event.key === "Escape") fechar();
		};
		const onPointerDown = (event) => {
			const alvo = event.target;
			if (alvo?.closest?.("[data-menu-conversa]")) return;
			fechar();
		};
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("pointerdown", onPointerDown);
		window.addEventListener("scroll", fechar, true);
		window.addEventListener("resize", fechar);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("pointerdown", onPointerDown);
			window.removeEventListener("scroll", fechar, true);
			window.removeEventListener("resize", fechar);
		};
	});
	const abrirMenu = (event, conv) => {
		event.preventDefault();
		setMenu({
			x: Math.max(MARGEM_DA_BORDA, Math.min(event.clientX, window.innerWidth - LARGURA_DO_MENU - MARGEM_DA_BORDA)),
			y: Math.max(MARGEM_DA_BORDA, Math.min(event.clientY, window.innerHeight - ALTURA_DO_MENU - MARGEM_DA_BORDA)),
			conv
		});
	};
	const onSelect = (conv) => {
		call(conv.id);
		readConversation(conv.id);
		selectConversation(conv.id);
	};
	const confirmar = () => {
		const conv = aApagar();
		if (!conv) return;
		setAApagar(null);
		deleteConversation(conv.id);
		showToast("Conversa apagada", conv.messages.length === 1 ? `A mensagem de ${conv.clientName} foi apagada.` : `As ${conv.messages.length} mensagens de ${conv.clientName} foram apagadas.`);
	};
	return /* @__PURE__ */ _jsxs("div", {
		className: "relative flex-1 min-h-0",
		children: [
			/* @__PURE__ */ _jsx(RecyclerView, {
				itemHeight: 76,
				overscan: 4,
				height: "100%",
				items: () => conversations().filter((conv) => channelFilter() === "all" || conv.channel === channelFilter()),
				getItemKey: (conv) => conv.id,
				emptyState: /* @__PURE__ */ _jsx("div", {
					className: "p-4 text-center font-body-sm text-on-surface-variant",
					children: "Nenhuma conversa encontrada."
				}),
				item: (conv) => {
					return conversationItemNode(conv, {
						onSelect,
						onContextMenu: abrirMenu
					});
				}
			}),
			/* @__PURE__ */ _jsxs(Reveal, {
				when: () => menu() !== null,
				children: [/* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsx("div", {
					"data-menu-conversa": true,
					className: "fixed z-50 w-52 rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-1 shadow-2xl",
					style: {
						left: () => `${menu()?.x ?? 0}px`,
						top: () => `${menu()?.y ?? 0}px`
					},
					children: /* @__PURE__ */ _jsxs("button", {
						type: "button",
						onClick: () => {
							setAApagar(menu()?.conv ?? null);
							fecharMenu();
						},
						className: "w-full flex items-center gap-3 px-3.5 py-2.5 text-left font-body-sm text-error transition-colors hover:bg-error/10",
						children: [/* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "delete"
						}), /* @__PURE__ */ _jsx("span", { children: "Apagar" })]
					})
				}) }), /* @__PURE__ */ _jsx(Reveal.Else, { children: /* @__PURE__ */ _jsx(_Fragment, {}) })]
			}),
			/* @__PURE__ */ _jsxs(Reveal, {
				when: () => aApagar() !== null,
				children: [/* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsx("div", {
					className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
					children: /* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-5",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center gap-2 text-error",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[26px]",
									children: "delete_forever"
								}), /* @__PURE__ */ _jsx("h3", {
									className: "font-headline-md font-bold text-on-surface",
									children: "Apagar conversa"
								})]
							}),
							/* @__PURE__ */ _jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: () => {
									const conv = aApagar();
									if (!conv) return "";
									return conv.messages.length === 0 ? `A conversa com ${conv.clientName} será removida da lista.` : conv.messages.length === 1 ? `A conversa com ${conv.clientName} e a mensagem dela serão apagadas.` : `A conversa com ${conv.clientName} e as ${conv.messages.length} mensagens serão apagadas.`;
								}
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "flex justify-end gap-2",
								children: [/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => setAApagar(null),
									className: "px-4 py-2 rounded-xl font-title-md text-on-surface hover:bg-surface-container transition-colors",
									children: "Cancelar"
								}), /* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: confirmar,
									className: "px-4 py-2 rounded-xl font-title-md font-bold bg-error text-on-primary hover:opacity-90 transition-opacity",
									children: "Apagar"
								})]
							})
						]
					})
				}) }), /* @__PURE__ */ _jsx(Reveal.Else, { children: /* @__PURE__ */ _jsx(_Fragment, {}) })]
			})
		]
	});
}
;

//# sourceMappingURL=list-contects.__client_ssr.js.map
