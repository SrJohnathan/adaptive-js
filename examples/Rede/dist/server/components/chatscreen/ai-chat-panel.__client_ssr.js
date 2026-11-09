import { conversations, selectedConversationId } from "../../features/chat/reactives-helpes.js";
import { signal } from "@adaptive-js/web";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
const AI_SUGGESTIONS = [
	{
		label: "Previsão do pedido",
		icon: "delivery_dining",
		text: "Qual a previsão do pedido atual?"
	},
	{
		label: "Histórico de pratos",
		icon: "restaurant_menu",
		text: "Quais os pratos favoritos deste cliente?"
	},
	{
		label: "Sugerir cortesia",
		icon: "redeem",
		text: "Sugira uma cortesia VIP para fidelizar"
	},
	{
		label: "Resumo do cliente",
		icon: "person_search",
		text: "Me resuma o perfil e o histórico do cliente"
	}
];
function getActiveClient() {
	const list = conversations();
	const id = selectedConversationId();
	return list.find((c) => c.id === id) || list[0];
}
function timeNow() {
	return new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function buildAiReply(raw, client) {
	const text = raw.toLowerCase();
	if (text.includes("previs") || text.includes("entrega") || text.includes("pedido")) {
		return `Consultei o Totvs: o pedido #8942 de ${client.clientName} está em preparo na filial Jardins com previsão de entrega entre 35 e 45 minutos (rota ativa no iFood).`;
	}
	if (text.includes("prato") || text.includes("favorito") || text.includes("histórico") || text.includes("cardápio") || text.includes("cardapio")) {
		return `O histórico do ${client.clientName} este mês mostra preferência por Pizza Margherita Especial (4x) e Petit Gâteau Belga (2x). Posso ofertar uma cortesia com 20% VIP Ouro quando quiser.`;
	}
	if (text.includes("cortesia") || text.includes("vip") || text.includes("fideliz")) {
		return `Sugestão: envie ao ${client.clientName} → "Como você é nosso cliente VIP Ouro, deixo o Petit Gâteau Belga de cortesia com 20% off hoje!" Peça em 1-clique se aprovar.`;
	}
	if (text.includes("resumo") || text.includes("perfil")) {
		return `${client.clientName} • ${client.channelBadgeText} ${client.vipStatus || "Cliente Frequente"} — ${client.completedOrdersCount} pedidos concluídos e gasto de ${client.totalSpentMonth} no mês. Ticket médio ${client.avgTicket}. Sentimento ${client.sentimentPercent}% positivo. Notas internas: ${client.notes}.`;
	}
	if (text.includes("pix") || text.includes("pagamento")) {
		return `A chave Pix direta da loja é financeiro@redehub.com.br (5% de desconto até 19h). Quer que eu envie ao ${client.clientName}?`;
	}
	if (text.includes("sla") || text.includes("fila")) {
		return `Fila atual: 8 atendimentos com SLA médio de 1.8 min. O ${client.clientName} está no fluxo "Minhas (12)" e aguarda desde ${client.slaTime}.`;
	}
	return `Entendido! Posso consultar o pedido no Totvs, o histórico de pratos, enviar Pix com desconto ou preparar uma resposta pronta para o ${client.clientName}. É só me pedir.`;
}
export function AiChatPanel() {
	const [aiMessages, setAiMessages] = signal([{
		id: "ai-welcome",
		sender: "ai",
		text: "Olá, Mariana! Sou o Rede Assist Copilot. Consulto pedidos no Totvs, histórico de pratos e desenho respostas prontas por cliente.",
		time: timeNow()
	}]);
	const [aiInput, setAiInput] = signal("");
	const [aiTyping, setAiTyping] = signal(false);
	const clearAiChat = () => {
		setAiMessages([{
			id: "ai-welcome",
			sender: "ai",
			text: "Conversa reiniciada. Posso consultar pedidos no Totvs, histórico de pratos e desenhar respostas prontas por cliente.",
			time: timeNow()
		}]);
	};
	const handleSendAi = (textOverride) => {
		const text = (textOverride ?? aiInput()).trim();
		if (!text || aiTyping()) return;
		setAiMessages((prev) => [...prev, {
			id: "ai-user-" + Date.now(),
			sender: "user",
			text,
			time: timeNow()
		}]);
		setAiInput("");
		setAiTyping(true);
		const client = getActiveClient();
		const reply = buildAiReply(text, client);
		setTimeout(() => {
			setAiMessages((prev) => [...prev, {
				id: "ai-reply-" + Date.now(),
				sender: "ai",
				text: reply,
				time: timeNow()
			}]);
			setAiTyping(false);
		}, 1e3);
	};
	return /* @__PURE__ */ _jsxs("aside", {
		className: "w-80 xl:w-[360px] hidden lg:flex flex-col border-l border-outline-variant/20 bg-surface-container-lowest min-h-0 shrink-0",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "h-16 px-4 border-b border-outline-variant/20 flex items-center gap-3 shrink-0 bg-surface-container-lowest shadow-sm",
				children: [
					/* @__PURE__ */ _jsx("div", {
						className: "w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[20px]",
							children: "auto_awesome"
						})
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ _jsx("span", {
							className: "font-title-md text-on-surface font-bold block truncate",
							children: "Rede Assist IA"
						}), /* @__PURE__ */ _jsxs("span", {
							className: "text-[11px] text-emerald-700 font-semibold flex items-center gap-1",
							children: [/* @__PURE__ */ _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }), "Online • contexto do Totvs & ERP"]
						})]
					}),
					/* @__PURE__ */ _jsx("button", {
						type: "button",
						onClick: clearAiChat,
						className: "p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors",
						title: "Limpar Conversa da IA",
						children: /* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "delete_sweep"
						})
					})
				]
			}),
			/* @__PURE__ */ _jsx("div", {
				className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3 scrollbar-thin bg-surface-container-low/30",
				children: () => /* @__PURE__ */ _jsxs(_Fragment, { children: [aiMessages().map((msg) => msg.sender === "ai" ? /* @__PURE__ */ _jsxs("div", {
					className: "flex items-start gap-2.5",
					children: [/* @__PURE__ */ _jsx("div", {
						className: "w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5",
						children: /* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[15px]",
							children: "psychology"
						})
					}), /* @__PURE__ */ _jsxs("div", {
						className: "max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 shadow-sm",
						children: [/* @__PURE__ */ _jsx("p", {
							className: "font-body-sm text-on-surface whitespace-pre-wrap",
							children: msg.text
						}), /* @__PURE__ */ _jsx("span", {
							className: "text-[10px] text-on-surface-variant/70 font-code-sm block mt-1",
							children: msg.time
						})]
					})]
				}, msg.id) : /* @__PURE__ */ _jsx("div", {
					className: "flex items-end gap-2 justify-end",
					children: /* @__PURE__ */ _jsxs("div", {
						className: "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-on-primary px-3 py-2 shadow-sm",
						children: [/* @__PURE__ */ _jsx("p", {
							className: "font-body-sm whitespace-pre-wrap",
							children: msg.text
						}), /* @__PURE__ */ _jsx("span", {
							className: "text-[10px] text-on-primary/70 font-code-sm block mt-1",
							children: msg.time
						})]
					})
				}, msg.id)), aiTyping() ? /* @__PURE__ */ _jsxs("div", {
					className: "flex items-start gap-2.5",
					children: [/* @__PURE__ */ _jsx("div", {
						className: "w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5",
						children: /* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[15px]",
							children: "psychology"
						})
					}), /* @__PURE__ */ _jsx("div", {
						className: "max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-container-lowest border border-outline-variant/20 px-3 py-2.5 shadow-sm",
						children: /* @__PURE__ */ _jsxs("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.2s]" }),
								/* @__PURE__ */ _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.1s]" }),
								/* @__PURE__ */ _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce" })
							]
						})
					})]
				}) : /* @__PURE__ */ _jsx(_Fragment, {})] })
			}),
			/* @__PURE__ */ _jsx("div", {
				className: "px-3 py-2 border-t border-outline-variant/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-nowrap bg-surface-container-lowest",
				children: AI_SUGGESTIONS.map((sug) => /* @__PURE__ */ _jsxs("button", {
					type: "button",
					onClick: () => {
						setAiInput(sug.text);
						handleSendAi(sug.text);
					},
					className: "flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors shrink-0",
					children: [/* @__PURE__ */ _jsx("span", {
						className: "material-symbols-outlined text-[14px] text-primary",
						children: sug.icon
					}), sug.label]
				}, sug.label))
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "p-3 border-t border-outline-variant/20 bg-surface-container-lowest flex items-center gap-2",
				children: [/* @__PURE__ */ _jsx("input", {
					type: "text",
					value: () => aiInput(),
					onInput: (event) => setAiInput(event.currentTarget.value),
					onKeyDown: (event) => {
						if (event.key === "Enter") handleSendAi();
					},
					placeholder: "Pergunte ao copilot sobre pedidos, pratos, PIX...",
					className: "flex-1 min-w-0 bg-surface-container-low rounded-xl px-3 py-2 border border-outline-variant/20 font-body-sm text-on-surface placeholder:text-on-surface-variant/70 outline-none focus:ring-2 focus:ring-primary/20"
				}), /* @__PURE__ */ _jsx("button", {
					type: "button",
					onClick: () => handleSendAi(),
					className: "p-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm active:scale-95 flex items-center justify-center shrink-0",
					title: "Perguntar à IA",
					children: /* @__PURE__ */ _jsx("span", {
						className: "material-symbols-outlined text-[20px]",
						children: "send"
					})
				})]
			})
		]
	});
}

//# sourceMappingURL=ai-chat-panel.__client_ssr.js.map
