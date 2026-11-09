import { _ as jsx, a as init, b as __exportAll, c as signal, g as Fragment, i as useHandler, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { f as selectConversation, i as channelFilter, o as conversations, p as selectedConversationId } from "./chunk-DSTwi42U.js";
import { n as RecyclerView, t as Reveal } from "./chunk-DCCs5luT.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";
import { t as avatarUrl } from "./chunk-dojgNuCz.js";
import { a as readConversation, n as deleteConversation } from "./chunk-DNVYKgy8.js";

//#region src/components/chatscreen/list-contects.tsx
var list_contects_exports = /* @__PURE__ */ __exportAll({ ListContects: () => ListContects });
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
	const children = [{
		type: "div",
		class: "relative shrink-0",
		children: [src ? {
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
		}, {
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
	if (conv.unreadCount && conv.unreadCount > 0) children.push({
		type: "span",
		class: "w-5 h-5 rounded-full bg-primary-container text-on-primary font-bold text-[11px] flex items-center justify-center shrink-0",
		value: () => String(conv.unreadCount ?? 0)
	});
	return {
		type: "div",
		class: () => {
			return ["p-3.5 flex items-start gap-3 cursor-pointer transition-all border-b border-outline-variant/15", conv.id === selectedConversationId() ? "bg-surface-container-high/60 border-l-4 border-primary" : "hover:bg-surface-container-low"].join(" ");
		},
		onClick: () => ctx.onSelect(conv),
		onContextMenu: (event) => ctx.onContextMenu(event, conv),
		children
	};
}
function ListContects() {
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
			if (event.target?.closest?.("[data-menu-conversa]")) return;
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
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex-1 min-h-0",
		children: [
			/* @__PURE__ */ jsx(RecyclerView, {
				itemHeight: 76,
				overscan: 4,
				height: "100%",
				items: () => conversations().filter((conv) => channelFilter() === "all" || conv.channel === channelFilter()),
				getItemKey: (conv) => conv.id,
				emptyState: /* @__PURE__ */ jsx("div", {
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
			/* @__PURE__ */ jsxs(Reveal, {
				when: () => menu() !== null,
				children: [/* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsx("div", {
					"data-menu-conversa": true,
					className: "fixed z-50 w-52 rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-1 shadow-2xl",
					style: {
						left: () => `${menu()?.x ?? 0}px`,
						top: () => `${menu()?.y ?? 0}px`
					},
					children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => {
							setAApagar(menu()?.conv ?? null);
							fecharMenu();
						},
						className: "w-full flex items-center gap-3 px-3.5 py-2.5 text-left font-body-sm text-error transition-colors hover:bg-error/10",
						children: [/* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "delete"
						}), /* @__PURE__ */ jsx("span", { children: "Apagar" })]
					})
				}) }), /* @__PURE__ */ jsx(Reveal.Else, { children: /* @__PURE__ */ jsx(Fragment, {}) })]
			}),
			/* @__PURE__ */ jsxs(Reveal, {
				when: () => aApagar() !== null,
				children: [/* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsx("div", {
					className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-error",
								children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[26px]",
									children: "delete_forever"
								}), /* @__PURE__ */ jsx("h3", {
									className: "font-headline-md font-bold text-on-surface",
									children: "Apagar conversa"
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: () => {
									const conv = aApagar();
									if (!conv) return "";
									return conv.messages.length === 0 ? `A conversa com ${conv.clientName} será removida da lista.` : conv.messages.length === 1 ? `A conversa com ${conv.clientName} e a mensagem dela serão apagadas.` : `A conversa com ${conv.clientName} e as ${conv.messages.length} mensagens serão apagadas.`;
								}
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-end gap-2",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setAApagar(null),
									className: "px-4 py-2 rounded-xl font-title-md text-on-surface hover:bg-surface-container transition-colors",
									children: "Cancelar"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: confirmar,
									className: "px-4 py-2 rounded-xl font-title-md font-bold bg-error text-on-primary hover:opacity-90 transition-opacity",
									children: "Apagar"
								})]
							})
						]
					})
				}) }), /* @__PURE__ */ jsx(Reveal.Else, { children: /* @__PURE__ */ jsx(Fragment, {}) })]
			})
		]
	});
}
typeof ListContects === "function" && markClientExport(ListContects, "components/chatscreen/list-contects", "ListContects", "client");

//#endregion
export { list_contects_exports as n, ListContects as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstRFRpdWxyc2UuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY2hhdHNjcmVlbi9saXN0LWNvbnRlY3RzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyInY2xpZW50J1xuaW1wb3J0IHtpbml0LCBzaWduYWwsIHVzZUhhbmRsZXJ9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5cbmltcG9ydCB7XG4gICAgY2hhbm5lbEZpbHRlciwgY29udmVyc2F0aW9ucyxcbiAgICBzZWxlY3RDb252ZXJzYXRpb24sXG4gICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZCxcbn0gZnJvbSBcIi4uLy4uL2ZlYXR1cmVzL2NoYXQvcmVhY3RpdmVzLWhlbHBlcy50c1wiO1xuaW1wb3J0IHtSZXZlYWwsIEl0ZW1Ob2RlLCBSZWN5Y2xlclZpZXd9IGZyb20gXCJAYWRhcHRpdmUtanMvY29tcG9uZW50c1wiO1xuXG5pbXBvcnQge2F2YXRhclVybH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9hdmF0YXIudHNcIjtcbmltcG9ydCB7XG4gICAgZGVsZXRlQ29udmVyc2F0aW9uLFxuICAgIHJlYWRDb252ZXJzYXRpb24sXG59IGZyb20gXCIuLi8uLi9mZWF0dXJlcy9jaGF0L0NvbnRleHRTb2NrZXQudHN4XCI7XG5pbXBvcnQge3Nob3dUb2FzdH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi90b2FzdC1zdG9yZVwiO1xuaW1wb3J0IHR5cGUge0NvbnZlcnNhdGlvbkl0ZW19IGZyb20gXCIuLi8uLi9zaGFyZWQvb21uaS1odWIvdHlwZXNcIjtcblxuLyoqXG4gKiBUYW1hbmhvIGRvIG1lbnUsIHBhcmEgbyBwb250ZWlybyBuYSBib3JkYSBuw6NvIGVtcHVycmFyIG8gbWVudSBwYXJhIGZvcmEgZGFcbiAqIHRlbGEuIE1lZGlkbyDDoCBtw6NvIGRlIHByb3DDs3NpdG86IG8gbWVudSB0ZW0gdW0gaXRlbSBzw7MsIGUgbWVkaXIgbyBuw7NcbiAqIGRlcG9pcyBkZSBpbnNlcmlkbyBjdXN0YXJpYSB1bSByZWYgZSB1bSBlZmVpdG8gcGFyYSBuYWRhLlxuICovXG5jb25zdCBMQVJHVVJBX0RPX01FTlUgPSAyMDg7XG5jb25zdCBBTFRVUkFfRE9fTUVOVSA9IDQ0O1xuY29uc3QgTUFSR0VNX0RBX0JPUkRBID0gODtcblxuLyoqIENvbnZlcnNhIHNvYiBvIHBvbnRlaXJvLCBjb20gYSBwb3Npw6fDo28gZG8gbWVudSBqw6EgcHJlc2EgbmEgYm9yZGEuICovXG5pbnRlcmZhY2UgTWVudUFiZXJ0byB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICBjb252OiBDb252ZXJzYXRpb25JdGVtO1xufVxuXG5mdW5jdGlvbiBjaGFubmVsQmFkZ2VDbGFzcyhjaGFubmVsOiBDb252ZXJzYXRpb25JdGVtW1wiY2hhbm5lbFwiXSkge1xuICAgIGlmIChjaGFubmVsID09PSBcIndoYXRzYXBwXCIpIHJldHVybiBcImJnLWVtZXJhbGQtNjAwIHRleHQtd2hpdGVcIjtcbiAgICBpZiAoY2hhbm5lbCA9PT0gXCJpbnN0YWdyYW1cIikgcmV0dXJuIFwiYmctcGluay02MDAgdGV4dC13aGl0ZVwiO1xuICAgIHJldHVybiBcImJnLXNreS02MDAgdGV4dC13aGl0ZVwiO1xufVxuXG5mdW5jdGlvbiBjaGFubmVsSWNvbihjaGFubmVsOiBDb252ZXJzYXRpb25JdGVtW1wiY2hhbm5lbFwiXSkge1xuICAgIGlmIChjaGFubmVsID09PSBcIndoYXRzYXBwXCIpIHJldHVybiBcImNoYXRcIjtcbiAgICBpZiAoY2hhbm5lbCA9PT0gXCJpbnN0YWdyYW1cIikgcmV0dXJuIFwicGhvdG9fY2FtZXJhXCI7XG4gICAgcmV0dXJuIFwic2VuZFwiO1xufVxuXG4vKipcbiAqIEl0ZW0gZGEgbGlzdGEgY29tbyBkZXNjcml0b3Ig4oCUIGVzdHJ1dHVyYSBlc3TDoXZlbCwgZ2V0dGVycyBzw7MgbmFzIHBvbnRhcy5cbiAqIFNlbSB7KCkgPT4gPGRpdj4uLi48L2Rpdj59IMOgIHZvbHRhIGRvIGJsb2NvLlxuICovXG5mdW5jdGlvbiBjb252ZXJzYXRpb25JdGVtTm9kZShcbiAgICBjb252OiBDb252ZXJzYXRpb25JdGVtLFxuICAgIGN0eDoge1xuICAgICAgICBvblNlbGVjdDogKGNvbnY6IENvbnZlcnNhdGlvbkl0ZW0pID0+IHZvaWQ7XG4gICAgICAgIG9uQ29udGV4dE1lbnU6IChldmVudDogTW91c2VFdmVudCwgY29udjogQ29udmVyc2F0aW9uSXRlbSkgPT4gdm9pZDtcbiAgICB9LFxuKTogSXRlbU5vZGUge1xuICAgIGNvbnN0IHNyYyA9IGF2YXRhclVybChjb252LmF2YXRhcik7XG5cbiAgICBjb25zdCBhdmF0YXI6IEl0ZW1Ob2RlID0gc3JjXG4gICAgICAgID8ge1xuICAgICAgICAgICAgdHlwZTogXCJpbWdcIixcbiAgICAgICAgICAgIGNsYXNzOlxuICAgICAgICAgICAgICAgIFwidy0xMSBoLTExIHJvdW5kZWQtZnVsbCBvYmplY3QtY292ZXIgcmluZy0xIHJpbmctb3V0bGluZS12YXJpYW50LzMwXCIsXG4gICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIGFsdDogY29udi5jbGllbnROYW1lLFxuICAgICAgICAgICAgICAgIHNyYzogc3JjID8/IFwiXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogXCJkaXZcIixcbiAgICAgICAgICAgIGNsYXNzOlxuICAgICAgICAgICAgICAgIFwidy0xMSBoLTExIHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5LWNvbnRhaW5lci8yMCB0ZXh0LXByaW1hcnkgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtaGVhZGxpbmUtbWRcIixcbiAgICAgICAgICAgIHZhbHVlOiBjb252LmNsaWVudE5hbWUuY2hhckF0KDApLFxuICAgICAgICB9O1xuXG4gICAgY29uc3QgY2hpbGRyZW46IEl0ZW1Ob2RlW10gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzczogXCJyZWxhdGl2ZSBzaHJpbmstMFwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICBhdmF0YXIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IGBhYnNvbHV0ZSAtYm90dG9tLTEgLXJpZ2h0LTEgdy01IGgtNSByb3VuZGVkLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bMTFweF0gc2hhZG93LXNtIGJvcmRlciBib3JkZXItc3VyZmFjZS1jb250YWluZXItbG93ZXN0ICR7Y2hhbm5lbEJhZGdlQ2xhc3MoY29udi5jaGFubmVsKX1gLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTNweF1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY2hhbm5lbEljb24oY29udi5jaGFubmVsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFwiZGl2XCIsXG4gICAgICAgICAgICBjbGFzczogXCJmbGV4LTEgbWluLXctMFwiLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0wLjVcIixcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmb250LXRpdGxlLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkIHRydW5jYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICgpID0+IGNvbnYuY2xpZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9udC1jb2RlLXNtIHRleHQtWzExcHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtbW9ub1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAoKSA9PiBjb252LnRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAuLi4oY29udi5vcmRlclJlZlxuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzExcHhdIHRleHQtcHJpbWFyeSBmb250LWNvZGUtc20gZm9udC1zZW1pYm9sZCBtYi0wLjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNwYW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBcIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTJweF1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInJlY2VpcHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzcGFuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYFBlZGlkbyBpRm9vZCAke2NvbnYub3JkZXJSZWZ9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGNvbnYudmlwU3RhdHVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmctYW1iZXItMTAwIHRleHQtYW1iZXItODAwIHB4LTEgcHktMC4yIHJvdW5kZWQgdGV4dC1bOXB4XSBmb250LWJvbGQgbWwtMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY29udi52aXBTdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBzYXRpc2ZpZXMgSXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBzYXRpc2ZpZXMgSXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgOiBbXSksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICBjbGFzcyA6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIFwiLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogXCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgdHJ1bmNhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogKCkgPT4gY29udi5sYXN0TWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogXCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgdHJ1bmNhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogKCkgPT4gY29udi5sYXN0TWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAsXG5cbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgXTtcblxuICAgIGlmIChjb252LnVucmVhZENvdW50ICYmIGNvbnYudW5yZWFkQ291bnQgPiAwKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJzcGFuXCIsXG4gICAgICAgICAgICBjbGFzczpcbiAgICAgICAgICAgICAgICBcInctNSBoLTUgcm91bmRlZC1mdWxsIGJnLXByaW1hcnktY29udGFpbmVyIHRleHQtb24tcHJpbWFyeSBmb250LWJvbGQgdGV4dC1bMTFweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hyaW5rLTBcIixcbiAgICAgICAgICAgIHZhbHVlOiAoKSA9PiBTdHJpbmcoY29udi51bnJlYWRDb3VudCA/PyAwKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJkaXZcIixcbiAgICAgICAgY2xhc3M6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBjb252LmlkID09PSBzZWxlY3RlZENvbnZlcnNhdGlvbklkKCk7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIFwicC0zLjUgZmxleCBpdGVtcy1zdGFydCBnYXAtMyBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBib3JkZXItYiBib3JkZXItb3V0bGluZS12YXJpYW50LzE1XCIsXG4gICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICA/IFwiYmctc3VyZmFjZS1jb250YWluZXItaGlnaC82MCBib3JkZXItbC00IGJvcmRlci1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgOiBcImhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWxvd1wiLFxuICAgICAgICAgICAgXS5qb2luKFwiIFwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbGljazogKCkgPT4gY3R4Lm9uU2VsZWN0KGNvbnYpLFxuICAgICAgICAvLyByZXF1ZXIgb25Db250ZXh0TWVudSBubyBhcHBseUl0ZW1Ob2RlIGRvIFJlY3ljbGVyVmlld1xuICAgICAgICBvbkNvbnRleHRNZW51OiAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGN0eC5vbkNvbnRleHRNZW51KGV2ZW50LCBjb252KSxcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpc3RDb250ZWN0cyAoKSAge1xuICAgIGNvbnN0IGNhbGwgPSB1c2VIYW5kbGVyPHN0cmluZz4oXCJjaGF0LXN0cmVhbTpzZWxlY3RlZFwiKTtcblxuICAgIGNvbnN0IFttZW51LCBzZXRNZW51XSA9IHNpZ25hbDxNZW51QWJlcnRvIHwgbnVsbD4obnVsbCk7XG4gICAgY29uc3QgW2FBcGFnYXIsIHNldEFBcGFnYXJdID0gc2lnbmFsPENvbnZlcnNhdGlvbkl0ZW0gfCBudWxsPihudWxsKTtcblxuICAgIGNvbnN0IGZlY2hhck1lbnUgPSAoKSA9PiBzZXRNZW51KG51bGwpO1xuXG4gICAgaW5pdCgoKSA9PiB7XG5cblxuICAgICAgICBjb25zdCBmZWNoYXIgPSAoKSA9PiBzZXRNZW51KG51bGwpO1xuXG4gICAgICAgIGNvbnN0IG9uS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikgZmVjaGFyKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25Qb2ludGVyRG93biA9IChldmVudDogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhbHZvID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgICAgIGlmIChhbHZvPy5jbG9zZXN0Py4oXCJbZGF0YS1tZW51LWNvbnZlcnNhXVwiKSkgcmV0dXJuO1xuICAgICAgICAgICAgZmVjaGFyKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93bik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZlY2hhciwgdHJ1ZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZlY2hhcik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93bik7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmZWNoYXIsIHRydWUpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZmVjaGFyKTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGFicmlyTWVudSA9IChldmVudDogTW91c2VFdmVudCwgY29udjogQ29udmVyc2F0aW9uSXRlbSkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZXRNZW51KHtcbiAgICAgICAgICAgIHg6IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgIE1BUkdFTV9EQV9CT1JEQSxcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmlubmVyV2lkdGggLSBMQVJHVVJBX0RPX01FTlUgLSBNQVJHRU1fREFfQk9SREEsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB5OiBNYXRoLm1heChcbiAgICAgICAgICAgICAgICBNQVJHRU1fREFfQk9SREEsXG4gICAgICAgICAgICAgICAgTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmNsaWVudFksXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCAtIEFMVFVSQV9ET19NRU5VIC0gTUFSR0VNX0RBX0JPUkRBLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY29udixcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uU2VsZWN0ID0gKGNvbnY6IENvbnZlcnNhdGlvbkl0ZW0pID0+IHtcbiAgICAgICAgY2FsbChjb252LmlkKTtcbiAgICAgICAgcmVhZENvbnZlcnNhdGlvbihjb252LmlkKTtcbiAgICAgICAgc2VsZWN0Q29udmVyc2F0aW9uKGNvbnYuaWQpO1xuICAgIH07XG5cbiAgICBjb25zdCBjb25maXJtYXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnYgPSBhQXBhZ2FyKCk7XG4gICAgICAgIGlmICghY29udikgcmV0dXJuO1xuICAgICAgICBzZXRBQXBhZ2FyKG51bGwpO1xuICAgICAgICBkZWxldGVDb252ZXJzYXRpb24oY29udi5pZCk7XG4gICAgICAgIHNob3dUb2FzdChcbiAgICAgICAgICAgIFwiQ29udmVyc2EgYXBhZ2FkYVwiLFxuICAgICAgICAgICAgY29udi5tZXNzYWdlcy5sZW5ndGggPT09IDFcbiAgICAgICAgICAgICAgICA/IGBBIG1lbnNhZ2VtIGRlICR7Y29udi5jbGllbnROYW1lfSBmb2kgYXBhZ2FkYS5gXG4gICAgICAgICAgICAgICAgOiBgQXMgJHtjb252Lm1lc3NhZ2VzLmxlbmd0aH0gbWVuc2FnZW5zIGRlICR7Y29udi5jbGllbnROYW1lfSBmb3JhbSBhcGFnYWRhcy5gLFxuICAgICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXgtMSBtaW4taC0wXCI+XG4gICAgICAgICAgIDxSZWN5Y2xlclZpZXdcbiAgICAgICAgICAgICAgICBpdGVtSGVpZ2h0PXs3Nn1cbiAgICAgICAgICAgICAgICBvdmVyc2Nhbj17NH1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgICAgICAgICAgICBpdGVtcz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgY29udmVyc2F0aW9ucygpLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIChjb252KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxGaWx0ZXIoKSA9PT0gXCJhbGxcIiB8fCBjb252LmNoYW5uZWwgPT09IGNoYW5uZWxGaWx0ZXIoKSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnZXRJdGVtS2V5PXsoY29udikgPT4gY29udi5pZH1cbiAgICAgICAgICAgICAgICBlbXB0eVN0YXRlPXtcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgdGV4dC1jZW50ZXIgZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBOZW5odW1hIGNvbnZlcnNhIGVuY29udHJhZGEuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtPXsoY29udikgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb252ZXJzYXRpb25JdGVtTm9kZShjb252LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29udGV4dE1lbnU6IGFicmlyTWVudSxcblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICA8UmV2ZWFsIHdoZW49eygpID0+IG1lbnUoKSAhPT0gbnVsbH0+XG4gICAgICAgICAgICAgICAgPFJldmVhbC5JZj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1tZW51LWNvbnZlcnNhXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCB6LTUwIHctNTIgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8zMCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3QgcHktMSBzaGFkb3ctMnhsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICgpID0+IGAke21lbnUoKT8ueCA/PyAwfXB4YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICgpID0+IGAke21lbnUoKT8ueSA/PyAwfXB4YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFBcGFnYXIobWVudSgpPy5jb252ID8/IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWNoYXJNZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcHgtMy41IHB5LTIuNSB0ZXh0LWxlZnQgZm9udC1ib2R5LXNtIHRleHQtZXJyb3IgdHJhbnNpdGlvbi1jb2xvcnMgaG92ZXI6YmctZXJyb3IvMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF1cIj5kZWxldGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+QXBhZ2FyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvUmV2ZWFsLklmPlxuICAgICAgICAgICAgICAgIDxSZXZlYWwuRWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPD48Lz5cbiAgICAgICAgICAgICAgICA8L1JldmVhbC5FbHNlPlxuICAgICAgICAgICAgPC9SZXZlYWw+XG5cbiAgICAgICAgICAgIDxSZXZlYWwgd2hlbj17KCkgPT4gYUFwYWdhcigpICE9PSBudWxsfT5cbiAgICAgICAgICAgICAgICA8UmV2ZWFsLklmPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgYmctYmxhY2svNjAgYmFja2Ryb3AtYmx1ci1zbSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgdy1mdWxsIG1heC13LXNtIHJvdW5kZWQtMnhsIHAtNiBzaGFkb3ctMnhsIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzMwIGZsZXggZmxleC1jb2wgZ2FwLTVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtZXJyb3JcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzI2cHhdXCI+XG4gICAgICAgICAgICAgICAgICBkZWxldGVfZm9yZXZlclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtbWQgZm9udC1ib2xkIHRleHQtb24tc3VyZmFjZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBhZ2FyIGNvbnZlcnNhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnYgPSBhQXBhZ2FyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnYpIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnYubWVzc2FnZXMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgQSBjb252ZXJzYSBjb20gJHtjb252LmNsaWVudE5hbWV9IHNlcsOhIHJlbW92aWRhIGRhIGxpc3RhLmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNvbnYubWVzc2FnZXMubGVuZ3RoID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYEEgY29udmVyc2EgY29tICR7Y29udi5jbGllbnROYW1lfSBlIGEgbWVuc2FnZW0gZGVsYSBzZXLDo28gYXBhZ2FkYXMuYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGBBIGNvbnZlcnNhIGNvbSAke2NvbnYuY2xpZW50TmFtZX0gZSBhcyAke2NvbnYubWVzc2FnZXMubGVuZ3RofSBtZW5zYWdlbnMgc2Vyw6NvIGFwYWdhZGFzLmA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QUFwYWdhcihudWxsKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtdGl0bGUtbWQgdGV4dC1vbi1zdXJmYWNlIGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17Y29uZmlybWFyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgZm9udC10aXRsZS1tZCBmb250LWJvbGQgYmctZXJyb3IgdGV4dC1vbi1wcmltYXJ5IGhvdmVyOm9wYWNpdHktOTAgdHJhbnNpdGlvbi1vcGFjaXR5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBhZ2FyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvUmV2ZWFsLklmPlxuICAgICAgICAgICAgICAgIDxSZXZlYWwuRWxzZT5cbiAgICAgICAgICAgICAgICAgICAgPD48Lz5cbiAgICAgICAgICAgICAgICA8L1JldmVhbC5FbHNlPlxuICAgICAgICAgICAgPC9SZXZlYWw+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