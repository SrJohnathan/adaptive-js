import { showToast } from "../../shared/omni-hub/toast-store.js";
import { RecyclerView } from "@adaptive-js/components";
import { getActive, pushMessage } from "../../features/chat/reactives-helpes.js";
import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
/**
* Cartão de pedido iFood como descritor — estrutura estável,
* thunks só onde o dado pode mudar.
*/
function orderCardNode(info) {
	const rows = info.items.map((item) => ({
		type: "div",
		class: "flex justify-between",
		children: [{
			type: "span",
			value: item.name
		}, {
			type: "span",
			class: "font-code-sm font-semibold",
			value: item.price
		}]
	}));
	if (info.notes) {
		rows.push({
			type: "div",
			class: "text-tertiary font-medium bg-tertiary-fixed/30 px-2 py-1 rounded mt-1 text-[12px]",
			value: info.notes
		});
	}
	return {
		type: "div",
		class: "py-2",
		children: [{
			type: "div",
			class: "max-w-md mx-auto bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/30",
			children: [
				{
					type: "div",
					class: "flex items-center justify-between border-b border-outline-variant/20 pb-2 mb-2",
					children: [{
						type: "div",
						class: "flex items-center gap-2",
						children: [{
							type: "span",
							class: "material-symbols-outlined text-primary text-[20px]",
							value: "receipt_long"
						}, {
							type: "span",
							class: "font-title-md text-on-surface font-bold",
							value: info.orderNumber
						}]
					}, {
						type: "span",
						class: "px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-semibold",
						value: info.status
					}]
				},
				{
					type: "div",
					class: "space-y-1.5 py-1 font-body-sm text-on-surface",
					children: rows
				},
				{
					type: "div",
					class: "border-t border-outline-variant/20 pt-2 mt-2 flex items-center justify-between font-title-md",
					children: [{
						type: "span",
						class: "text-on-surface-variant",
						value: "Total Faturado"
					}, {
						type: "span",
						class: "text-primary font-bold",
						value: info.total
					}]
				},
				{
					type: "div",
					class: "mt-2 text-right",
					children: [{
						type: "span",
						class: "text-[11px] text-on-surface-variant font-code-sm",
						value: info.eta
					}]
				},
				{
					type: "button",
					class: "w-full mt-2 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-title-md font-semibold text-center transition-colors",
					props: { type: "button" },
					onClick: () => showToast("Totvs ERP", "Abrindo detalhes do pedido fiscal na filial Jardins.", "info"),
					value: "Ver Pedido Completo no Totvs"
				}
			]
		}]
	};
}
/** Cartão de sugestão de sobremesa, com ação de adicionar ao pedido. */
function dessertCardNode(info, onAdd) {
	return {
		type: "div",
		class: "py-2",
		children: [{
			type: "div",
			class: "flex justify-end",
			children: [{
				type: "div",
				class: "max-w-md bg-surface-container-lowest rounded-2xl rounded-tr-sm p-4 shadow-sm border border-outline-variant/20",
				children: [{
					type: "div",
					class: "flex items-center gap-3",
					children: [{
						type: "img",
						class: "w-16 h-16 rounded-xl object-cover ring-1 ring-outline-variant/20 shrink-0",
						props: {
							src: info.image,
							alt: info.title
						}
					}, {
						type: "div",
						children: [
							{
								type: "span",
								class: "font-label-sm uppercase tracking-wider text-tertiary font-bold",
								value: "Sugestão do Chef para Carlos"
							},
							{
								type: "h4",
								class: "font-title-md text-on-surface font-bold",
								value: info.title
							},
							{
								type: "p",
								class: "font-body-sm text-on-surface-variant",
								value: info.desc
							},
							{
								type: "span",
								class: "font-headline-sm text-primary font-bold block mt-1",
								value: info.price
							}
						]
					}]
				}, {
					type: "button",
					class: "w-full mt-3 py-1.5 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm text-center flex items-center justify-center gap-1 font-bold",
					props: { type: "button" },
					onClick: onAdd,
					children: [{
						type: "span",
						class: "material-symbols-outlined text-[18px]",
						value: "add_shopping_cart"
					}, {
						type: "span",
						value: "Adicionar ao Pedido iFood #8942"
					}]
				}]
			}]
		}]
	};
}
/** Balão de texto — agente à direita, cliente à esquerda. */
function textMessageNode(msg) {
	const isAgent = msg.sender === "agent";
	const bubble = [];
	if (isAgent) {
		bubble.push({
			type: "span",
			class: "text-[11px] text-white/80 font-bold block mb-0.5",
			value: msg.senderName ?? ""
		});
	}
	bubble.push({
		type: "p",
		class: "leading-relaxed whitespace-pre-wrap",
		value: msg.text
	});
	const meta = [{
		type: "span",
		value: msg.time
	}];
	if (isAgent) {
		meta.push({
			type: "span",
			class: "material-symbols-outlined text-[14px] text-primary",
			// status pode evoluir (enviado -> entregue -> lido)
			value: () => msg.status || "done_all"
		});
	}
	return {
		type: "div",
		class: "py-2",
		children: [{
			type: "div",
			class: `flex flex-col ${isAgent ? "items-end" : "items-start"}`,
			children: [{
				type: "div",
				class: `max-w-lg rounded-2xl p-3.5 shadow-sm text-body-md ${isAgent ? "bg-primary text-on-primary rounded-tr-none" : "bg-surface-container-lowest text-on-surface rounded-tl-none border border-outline-variant/20"}`,
				children: bubble
			}, {
				type: "div",
				class: "flex items-center gap-1 text-[11px] text-on-surface-variant mt-1 font-code-sm px-1",
				children: meta
			}]
		}]
	};
}
export const ListMessage = () => {
	const timeNow = () => new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
	const handleAddDessertToOrder = () => {
		showToast("Item Adicionado ao Pedido iFood", "Petit Gâteau Belga c/ Gelato (R$ 28,00) adicionado ao pedido #8942 e faturado no Totvs ERP.", "success");
		const active = getActive();
		if (!active) return;
		pushMessage(active.id, {
			id: "msg-" + Date.now(),
			sender: "agent",
			senderName: "Mariana Silva",
			text: "Perfeito, Carlos! Já incluí o Petit Gâteau Belga no seu pedido #8942 com sucesso. O motoboy levará quentinho com o gelato bem gelado!",
			time: timeNow(),
			status: "done_all"
		});
	};
	return /* @__PURE__ */ _jsx(RecyclerView, {
		itemHeight: 64,
		overscan: 5,
		height: "100%",
		items: () => getActive()?.messages ?? [],
		getItemKey: (msg) => msg.id,
		emptyState: /* @__PURE__ */ _jsx("div", {
			className: "p-4 text-center font-body-sm text-on-surface-variant",
			children: "Nenhuma mensagem nesta conversa. Envie a primeira!"
		}),
		item: (msg) => {
			if (msg.isOrderCard && msg.orderInfo) {
				return orderCardNode(msg.orderInfo);
			}
			if (msg.isDessertCard && msg.dessertInfo) {
				return dessertCardNode(msg.dessertInfo, handleAddDessertToOrder);
			}
			return textMessageNode(msg);
		}
	});
};

//# sourceMappingURL=list-message.__client_ssr.js.map
