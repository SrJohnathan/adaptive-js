import { _ as jsx, b as __exportAll, c as signal, g as Fragment, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { o as conversations, p as selectedConversationId } from "./chunk-DSTwi42U.js";

//#region src/components/chatscreen/ai-chat-panel.tsx
var ai_chat_panel_exports = /* @__PURE__ */ __exportAll({ AiChatPanel: () => AiChatPanel });
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
	return (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function buildAiReply(raw, client) {
	const text = raw.toLowerCase();
	if (text.includes("previs") || text.includes("entrega") || text.includes("pedido")) return `Consultei o Totvs: o pedido #8942 de ${client.clientName} está em preparo na filial Jardins com previsão de entrega entre 35 e 45 minutos (rota ativa no iFood).`;
	if (text.includes("prato") || text.includes("favorito") || text.includes("histórico") || text.includes("cardápio") || text.includes("cardapio")) return `O histórico do ${client.clientName} este mês mostra preferência por Pizza Margherita Especial (4x) e Petit Gâteau Belga (2x). Posso ofertar uma cortesia com 20% VIP Ouro quando quiser.`;
	if (text.includes("cortesia") || text.includes("vip") || text.includes("fideliz")) return `Sugestão: envie ao ${client.clientName} → "Como você é nosso cliente VIP Ouro, deixo o Petit Gâteau Belga de cortesia com 20% off hoje!" Peça em 1-clique se aprovar.`;
	if (text.includes("resumo") || text.includes("perfil")) return `${client.clientName} • ${client.channelBadgeText} ${client.vipStatus || "Cliente Frequente"} — ${client.completedOrdersCount} pedidos concluídos e gasto de ${client.totalSpentMonth} no mês. Ticket médio ${client.avgTicket}. Sentimento ${client.sentimentPercent}% positivo. Notas internas: ${client.notes}.`;
	if (text.includes("pix") || text.includes("pagamento")) return `A chave Pix direta da loja é financeiro@redehub.com.br (5% de desconto até 19h). Quer que eu envie ao ${client.clientName}?`;
	if (text.includes("sla") || text.includes("fila")) return `Fila atual: 8 atendimentos com SLA médio de 1.8 min. O ${client.clientName} está no fluxo "Minhas (12)" e aguarda desde ${client.slaTime}.`;
	return `Entendido! Posso consultar o pedido no Totvs, o histórico de pratos, enviar Pix com desconto ou preparar uma resposta pronta para o ${client.clientName}. É só me pedir.`;
}
function AiChatPanel() {
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
		const reply = buildAiReply(text, getActiveClient());
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
	return /* @__PURE__ */ jsxs("aside", {
		className: "w-80 xl:w-[360px] hidden lg:flex flex-col border-l border-outline-variant/20 bg-surface-container-lowest min-h-0 shrink-0",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "h-16 px-4 border-b border-outline-variant/20 flex items-center gap-3 shrink-0 bg-surface-container-lowest shadow-sm",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0",
						children: /* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[20px]",
							children: "auto_awesome"
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-title-md text-on-surface font-bold block truncate",
							children: "Rede Assist IA"
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-[11px] text-emerald-700 font-semibold flex items-center gap-1",
							children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }), "Online • contexto do Totvs & ERP"]
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: clearAiChat,
						className: "p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors",
						title: "Limpar Conversa da IA",
						children: /* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "delete_sweep"
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3 scrollbar-thin bg-surface-container-low/30",
				children: () => /* @__PURE__ */ jsxs(Fragment, { children: [aiMessages().map((msg) => msg.sender === "ai" ? /* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-2.5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5",
						children: /* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[15px]",
							children: "psychology"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-container-lowest border border-outline-variant/20 px-3 py-2 shadow-sm",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-body-sm text-on-surface whitespace-pre-wrap",
							children: msg.text
						}), /* @__PURE__ */ jsx("span", {
							className: "text-[10px] text-on-surface-variant/70 font-code-sm block mt-1",
							children: msg.time
						})]
					})]
				}, msg.id) : /* @__PURE__ */ jsx("div", {
					className: "flex items-end gap-2 justify-end",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-on-primary px-3 py-2 shadow-sm",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-body-sm whitespace-pre-wrap",
							children: msg.text
						}), /* @__PURE__ */ jsx("span", {
							className: "text-[10px] text-on-primary/70 font-code-sm block mt-1",
							children: msg.time
						})]
					})
				}, msg.id)), aiTyping() ? /* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-2.5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5",
						children: /* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[15px]",
							children: "psychology"
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-container-lowest border border-outline-variant/20 px-3 py-2.5 shadow-sm",
						children: /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.2s]" }),
								/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.1s]" }),
								/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-bounce" })
							]
						})
					})]
				}) : /* @__PURE__ */ jsx(Fragment, {})] })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "px-3 py-2 border-t border-outline-variant/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-nowrap bg-surface-container-lowest",
				children: AI_SUGGESTIONS.map((sug) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => {
						setAiInput(sug.text);
						handleSendAi(sug.text);
					},
					className: "flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors shrink-0",
					children: [/* @__PURE__ */ jsx("span", {
						className: "material-symbols-outlined text-[14px] text-primary",
						children: sug.icon
					}), sug.label]
				}, sug.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "p-3 border-t border-outline-variant/20 bg-surface-container-lowest flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("input", {
					type: "text",
					value: () => aiInput(),
					onInput: (event) => setAiInput(event.currentTarget.value),
					onKeyDown: (event) => {
						if (event.key === "Enter") handleSendAi();
					},
					placeholder: "Pergunte ao copilot sobre pedidos, pratos, PIX...",
					className: "flex-1 min-w-0 bg-surface-container-low rounded-xl px-3 py-2 border border-outline-variant/20 font-body-sm text-on-surface placeholder:text-on-surface-variant/70 outline-none focus:ring-2 focus:ring-primary/20"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => handleSendAi(),
					className: "p-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm active:scale-95 flex items-center justify-center shrink-0",
					title: "Perguntar à IA",
					children: /* @__PURE__ */ jsx("span", {
						className: "material-symbols-outlined text-[20px]",
						children: "send"
					})
				})]
			})
		]
	});
}
typeof AiChatPanel === "function" && markClientExport(AiChatPanel, "components/chatscreen/ai-chat-panel", "AiChatPanel", "hydrate");

//#endregion
export { ai_chat_panel_exports as n, AiChatPanel as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstRFlzWW1uU2wuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY2hhdHNjcmVlbi9haS1jaGF0LXBhbmVsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyInaHlkcmF0ZSdcbmltcG9ydCB7IGNvbnZlcnNhdGlvbnMsIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQgfSBmcm9tIFwiLi4vLi4vZmVhdHVyZXMvY2hhdC9yZWFjdGl2ZXMtaGVscGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbkl0ZW0gfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3R5cGVzLnRzXCI7XG5pbXBvcnQge3NpZ25hbH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcblxuaW50ZXJmYWNlIEFpQ2hhdE1lc3NhZ2Uge1xuICBpZDogc3RyaW5nO1xuICBzZW5kZXI6IFwidXNlclwiIHwgXCJhaVwiO1xuICB0ZXh0OiBzdHJpbmc7XG4gIHRpbWU6IHN0cmluZztcbn1cblxuY29uc3QgQUlfU1VHR0VTVElPTlM6IHsgbGFiZWw6IHN0cmluZzsgaWNvbjogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfVtdID0gW1xuICB7IGxhYmVsOiBcIlByZXZpc8OjbyBkbyBwZWRpZG9cIiwgaWNvbjogXCJkZWxpdmVyeV9kaW5pbmdcIiwgdGV4dDogXCJRdWFsIGEgcHJldmlzw6NvIGRvIHBlZGlkbyBhdHVhbD9cIiB9LFxuICB7IGxhYmVsOiBcIkhpc3TDs3JpY28gZGUgcHJhdG9zXCIsIGljb246IFwicmVzdGF1cmFudF9tZW51XCIsIHRleHQ6IFwiUXVhaXMgb3MgcHJhdG9zIGZhdm9yaXRvcyBkZXN0ZSBjbGllbnRlP1wiIH0sXG4gIHsgbGFiZWw6IFwiU3VnZXJpciBjb3J0ZXNpYVwiLCBpY29uOiBcInJlZGVlbVwiLCB0ZXh0OiBcIlN1Z2lyYSB1bWEgY29ydGVzaWEgVklQIHBhcmEgZmlkZWxpemFyXCIgfSxcbiAgeyBsYWJlbDogXCJSZXN1bW8gZG8gY2xpZW50ZVwiLCBpY29uOiBcInBlcnNvbl9zZWFyY2hcIiwgdGV4dDogXCJNZSByZXN1bWEgbyBwZXJmaWwgZSBvIGhpc3TDs3JpY28gZG8gY2xpZW50ZVwiIH0sXG5dO1xuXG5mdW5jdGlvbiBnZXRBY3RpdmVDbGllbnQoKTogQ29udmVyc2F0aW9uSXRlbSB7XG4gIGNvbnN0IGxpc3QgPSBjb252ZXJzYXRpb25zKCk7XG4gIGNvbnN0IGlkID0gc2VsZWN0ZWRDb252ZXJzYXRpb25JZCgpO1xuICByZXR1cm4gbGlzdC5maW5kKChjKSA9PiBjLmlkID09PSBpZCkgfHwgbGlzdFswXTtcbn1cblxuZnVuY3Rpb24gdGltZU5vdygpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHsgaG91cjogXCIyLWRpZ2l0XCIsIG1pbnV0ZTogXCIyLWRpZ2l0XCIgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWlSZXBseShyYXc6IHN0cmluZywgY2xpZW50OiBDb252ZXJzYXRpb25JdGVtKTogc3RyaW5nIHtcbiAgY29uc3QgdGV4dCA9IHJhdy50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmICh0ZXh0LmluY2x1ZGVzKFwicHJldmlzXCIpIHx8IHRleHQuaW5jbHVkZXMoXCJlbnRyZWdhXCIpIHx8IHRleHQuaW5jbHVkZXMoXCJwZWRpZG9cIikpIHtcbiAgICByZXR1cm4gYENvbnN1bHRlaSBvIFRvdHZzOiBvIHBlZGlkbyAjODk0MiBkZSAke2NsaWVudC5jbGllbnROYW1lfSBlc3TDoSBlbSBwcmVwYXJvIG5hIGZpbGlhbCBKYXJkaW5zIGNvbSBwcmV2aXPDo28gZGUgZW50cmVnYSBlbnRyZSAzNSBlIDQ1IG1pbnV0b3MgKHJvdGEgYXRpdmEgbm8gaUZvb2QpLmA7XG4gIH1cblxuICBpZiAoXG4gICAgdGV4dC5pbmNsdWRlcyhcInByYXRvXCIpIHx8XG4gICAgdGV4dC5pbmNsdWRlcyhcImZhdm9yaXRvXCIpIHx8XG4gICAgdGV4dC5pbmNsdWRlcyhcImhpc3TDs3JpY29cIikgfHxcbiAgICB0ZXh0LmluY2x1ZGVzKFwiY2FyZMOhcGlvXCIpIHx8XG4gICAgdGV4dC5pbmNsdWRlcyhcImNhcmRhcGlvXCIpXG4gICkge1xuICAgIHJldHVybiBgTyBoaXN0w7NyaWNvIGRvICR7Y2xpZW50LmNsaWVudE5hbWV9IGVzdGUgbcOqcyBtb3N0cmEgcHJlZmVyw6puY2lhIHBvciBQaXp6YSBNYXJnaGVyaXRhIEVzcGVjaWFsICg0eCkgZSBQZXRpdCBHw6J0ZWF1IEJlbGdhICgyeCkuIFBvc3NvIG9mZXJ0YXIgdW1hIGNvcnRlc2lhIGNvbSAyMCUgVklQIE91cm8gcXVhbmRvIHF1aXNlci5gO1xuICB9XG5cbiAgaWYgKHRleHQuaW5jbHVkZXMoXCJjb3J0ZXNpYVwiKSB8fCB0ZXh0LmluY2x1ZGVzKFwidmlwXCIpIHx8IHRleHQuaW5jbHVkZXMoXCJmaWRlbGl6XCIpKSB7XG4gICAgcmV0dXJuIGBTdWdlc3TDo286IGVudmllIGFvICR7Y2xpZW50LmNsaWVudE5hbWV9IOKGkiBcIkNvbW8gdm9jw6ogw6kgbm9zc28gY2xpZW50ZSBWSVAgT3VybywgZGVpeG8gbyBQZXRpdCBHw6J0ZWF1IEJlbGdhIGRlIGNvcnRlc2lhIGNvbSAyMCUgb2ZmIGhvamUhXCIgUGXDp2EgZW0gMS1jbGlxdWUgc2UgYXByb3Zhci5gO1xuICB9XG5cbiAgaWYgKHRleHQuaW5jbHVkZXMoXCJyZXN1bW9cIikgfHwgdGV4dC5pbmNsdWRlcyhcInBlcmZpbFwiKSkge1xuICAgIHJldHVybiBgJHtjbGllbnQuY2xpZW50TmFtZX0g4oCiICR7Y2xpZW50LmNoYW5uZWxCYWRnZVRleHR9ICR7Y2xpZW50LnZpcFN0YXR1cyB8fCBcIkNsaWVudGUgRnJlcXVlbnRlXCJ9IOKAlCAke2NsaWVudC5jb21wbGV0ZWRPcmRlcnNDb3VudH0gcGVkaWRvcyBjb25jbHXDrWRvcyBlIGdhc3RvIGRlICR7Y2xpZW50LnRvdGFsU3BlbnRNb250aH0gbm8gbcOqcy4gVGlja2V0IG3DqWRpbyAke2NsaWVudC5hdmdUaWNrZXR9LiBTZW50aW1lbnRvICR7Y2xpZW50LnNlbnRpbWVudFBlcmNlbnR9JSBwb3NpdGl2by4gTm90YXMgaW50ZXJuYXM6ICR7Y2xpZW50Lm5vdGVzfS5gO1xuICB9XG5cbiAgaWYgKHRleHQuaW5jbHVkZXMoXCJwaXhcIikgfHwgdGV4dC5pbmNsdWRlcyhcInBhZ2FtZW50b1wiKSkge1xuICAgIHJldHVybiBgQSBjaGF2ZSBQaXggZGlyZXRhIGRhIGxvamEgw6kgZmluYW5jZWlyb0ByZWRlaHViLmNvbS5iciAoNSUgZGUgZGVzY29udG8gYXTDqSAxOWgpLiBRdWVyIHF1ZSBldSBlbnZpZSBhbyAke2NsaWVudC5jbGllbnROYW1lfT9gO1xuICB9XG5cbiAgaWYgKHRleHQuaW5jbHVkZXMoXCJzbGFcIikgfHwgdGV4dC5pbmNsdWRlcyhcImZpbGFcIikpIHtcbiAgICByZXR1cm4gYEZpbGEgYXR1YWw6IDggYXRlbmRpbWVudG9zIGNvbSBTTEEgbcOpZGlvIGRlIDEuOCBtaW4uIE8gJHtjbGllbnQuY2xpZW50TmFtZX0gZXN0w6Egbm8gZmx1eG8gXCJNaW5oYXMgKDEyKVwiIGUgYWd1YXJkYSBkZXNkZSAke2NsaWVudC5zbGFUaW1lfS5gO1xuICB9XG5cbiAgcmV0dXJuIGBFbnRlbmRpZG8hIFBvc3NvIGNvbnN1bHRhciBvIHBlZGlkbyBubyBUb3R2cywgbyBoaXN0w7NyaWNvIGRlIHByYXRvcywgZW52aWFyIFBpeCBjb20gZGVzY29udG8gb3UgcHJlcGFyYXIgdW1hIHJlc3Bvc3RhIHByb250YSBwYXJhIG8gJHtjbGllbnQuY2xpZW50TmFtZX0uIMOJIHPDsyBtZSBwZWRpci5gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQWlDaGF0UGFuZWwoKSB7XG4gIGNvbnN0IFthaU1lc3NhZ2VzLCBzZXRBaU1lc3NhZ2VzXSA9IHNpZ25hbDxBaUNoYXRNZXNzYWdlW10+KFtcbiAgICB7XG4gICAgICBpZDogXCJhaS13ZWxjb21lXCIsXG4gICAgICBzZW5kZXI6IFwiYWlcIixcbiAgICAgIHRleHQ6IFwiT2zDoSwgTWFyaWFuYSEgU291IG8gUmVkZSBBc3Npc3QgQ29waWxvdC4gQ29uc3VsdG8gcGVkaWRvcyBubyBUb3R2cywgaGlzdMOzcmljbyBkZSBwcmF0b3MgZSBkZXNlbmhvIHJlc3Bvc3RhcyBwcm9udGFzIHBvciBjbGllbnRlLlwiLFxuICAgICAgdGltZTogdGltZU5vdygpLFxuICAgIH0sXG4gIF0pO1xuICBjb25zdCBbYWlJbnB1dCwgc2V0QWlJbnB1dF0gPSBzaWduYWwoXCJcIik7XG4gIGNvbnN0IFthaVR5cGluZywgc2V0QWlUeXBpbmddID0gc2lnbmFsKGZhbHNlKTtcblxuICBjb25zdCBjbGVhckFpQ2hhdCA9ICgpID0+IHtcbiAgICBzZXRBaU1lc3NhZ2VzKFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IFwiYWktd2VsY29tZVwiLFxuICAgICAgICBzZW5kZXI6IFwiYWlcIixcbiAgICAgICAgdGV4dDogXCJDb252ZXJzYSByZWluaWNpYWRhLiBQb3NzbyBjb25zdWx0YXIgcGVkaWRvcyBubyBUb3R2cywgaGlzdMOzcmljbyBkZSBwcmF0b3MgZSBkZXNlbmhhciByZXNwb3N0YXMgcHJvbnRhcyBwb3IgY2xpZW50ZS5cIixcbiAgICAgICAgdGltZTogdGltZU5vdygpLFxuICAgICAgfSxcbiAgICBdKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTZW5kQWkgPSAodGV4dE92ZXJyaWRlPzogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgdGV4dCA9ICh0ZXh0T3ZlcnJpZGUgPz8gYWlJbnB1dCgpKS50cmltKCk7XG4gICAgaWYgKCF0ZXh0IHx8IGFpVHlwaW5nKCkpIHJldHVybjtcblxuICAgIHNldEFpTWVzc2FnZXMoKHByZXYpID0+IFtcbiAgICAgIC4uLnByZXYsXG4gICAgICB7IGlkOiBcImFpLXVzZXItXCIgKyBEYXRlLm5vdygpLCBzZW5kZXI6IFwidXNlclwiLCB0ZXh0LCB0aW1lOiB0aW1lTm93KCkgfSxcbiAgICBdKTtcbiAgICBzZXRBaUlucHV0KFwiXCIpO1xuICAgIHNldEFpVHlwaW5nKHRydWUpO1xuXG4gICAgY29uc3QgY2xpZW50ID0gZ2V0QWN0aXZlQ2xpZW50KCk7XG4gICAgY29uc3QgcmVwbHkgPSBidWlsZEFpUmVwbHkodGV4dCwgY2xpZW50KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldEFpTWVzc2FnZXMoKHByZXYpID0+IFtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgeyBpZDogXCJhaS1yZXBseS1cIiArIERhdGUubm93KCksIHNlbmRlcjogXCJhaVwiLCB0ZXh0OiByZXBseSwgdGltZTogdGltZU5vdygpIH0sXG4gICAgICBdKTtcbiAgICAgIHNldEFpVHlwaW5nKGZhbHNlKTtcbiAgICB9LCAxMDAwKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxhc2lkZSBjbGFzc05hbWU9XCJ3LTgwIHhsOnctWzM2MHB4XSBoaWRkZW4gbGc6ZmxleCBmbGV4LWNvbCBib3JkZXItbCBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCBtaW4taC0wIHNocmluay0wXCI+XG4gICAgICB7LyogSGVhZGVyIGRvIENvcGlsb3QgKi99XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImgtMTYgcHgtNCBib3JkZXItYiBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHNocmluay0wIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCBzaGFkb3ctc21cIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInctOSBoLTkgcm91bmRlZC14bCBiZy1wcmltYXJ5LWNvbnRhaW5lciB0ZXh0LW9uLXByaW1hcnkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hyaW5rLTBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzIwcHhdXCI+YXV0b19hd2Vzb21lPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZCBibG9jayB0cnVuY2F0ZVwiPlJlZGUgQXNzaXN0IElBPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtZW1lcmFsZC03MDAgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNTAwIGFuaW1hdGUtcHVsc2VcIj48L3NwYW4+XG4gICAgICAgICAgICBPbmxpbmUg4oCiIGNvbnRleHRvIGRvIFRvdHZzICYgRVJQXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e2NsZWFyQWlDaGF0fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtbGcgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgIHRpdGxlPVwiTGltcGFyIENvbnZlcnNhIGRhIElBXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF1cIj5kZWxldGVfc3dlZXA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNZW5zYWdlbnMgZGEgSUEgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtaW4taC0wIG92ZXJmbG93LXktYXV0byBwLTQgc3BhY2UteS0zIHNjcm9sbGJhci10aGluIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdy8zMFwiPlxuICAgICAgICB7KCkgPT4gKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7YWlNZXNzYWdlcygpLm1hcCgobXNnKSA9PlxuICAgICAgICAgICAgICBtc2cuc2VuZGVyID09PSBcImFpXCIgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e21zZy5pZH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcm91bmRlZC1sZyBiZy1wcmltYXJ5LWNvbnRhaW5lciB0ZXh0LW9uLXByaW1hcnkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hyaW5rLTAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTVweF1cIj5wc3ljaG9sb2d5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1heC13LVs4NSVdIHJvdW5kZWQtMnhsIHJvdW5kZWQtdGwtc20gYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHB4LTMgcHktMiBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZSB3aGl0ZXNwYWNlLXByZS13cmFwXCI+e21zZy50ZXh0fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQvNzAgZm9udC1jb2RlLXNtIGJsb2NrIG10LTFcIj57bXNnLnRpbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e21zZy5pZH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1lbmQgZ2FwLTIganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWF4LXctWzg1JV0gcm91bmRlZC0yeGwgcm91bmRlZC10ci1zbSBiZy1wcmltYXJ5IHRleHQtb24tcHJpbWFyeSBweC0zIHB5LTIgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB3aGl0ZXNwYWNlLXByZS13cmFwXCI+e21zZy50ZXh0fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1vbi1wcmltYXJ5LzcwIGZvbnQtY29kZS1zbSBibG9jayBtdC0xXCI+e21zZy50aW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAge2FpVHlwaW5nKCkgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyByb3VuZGVkLWxnIGJnLXByaW1hcnktY29udGFpbmVyIHRleHQtb24tcHJpbWFyeSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaHJpbmstMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTVweF1cIj5wc3ljaG9sb2d5PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1heC13LVs4NSVdIHJvdW5kZWQtMnhsIHJvdW5kZWQtdGwtc20gYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHB4LTMgcHktMi41IHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctcHJpbWFyeSBhbmltYXRlLWJvdW5jZSBbYW5pbWF0aW9uLWRlbGF5Oi0wLjJzXVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctcHJpbWFyeSBhbmltYXRlLWJvdW5jZSBbYW5pbWF0aW9uLWRlbGF5Oi0wLjFzXVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLXByaW1hcnkgYW5pbWF0ZS1ib3VuY2VcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD48Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFN1Z2VzdMO1ZXMgcsOhcGlkYXMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTMgcHktMiBib3JkZXItdCBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgb3ZlcmZsb3cteC1hdXRvIHNjcm9sbGJhci1ub25lIHRleHQtbm93cmFwIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdFwiPlxuICAgICAgICB7QUlfU1VHR0VTVElPTlMubWFwKChzdWcpID0+IChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBrZXk9e3N1Zy5sYWJlbH1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRBaUlucHV0KHN1Zy50ZXh0KTtcbiAgICAgICAgICAgICAgaGFuZGxlU2VuZEFpKHN1Zy50ZXh0KTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZSBmb250LWxhYmVsLXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzE1IHRyYW5zaXRpb24tY29sb3JzIHNocmluay0wXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE0cHhdIHRleHQtcHJpbWFyeVwiPntzdWcuaWNvbn08L3NwYW4+XG4gICAgICAgICAgICB7c3VnLmxhYmVsfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSW5wdXQgZGEgSUEgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBib3JkZXItdCBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgdmFsdWU9eygpID0+IGFpSW5wdXQoKX1cbiAgICAgICAgICBvbklucHV0PXsoZXZlbnQpID0+IHNldEFpSW5wdXQoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikgaGFuZGxlU2VuZEFpKCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBlcmd1bnRlIGFvIGNvcGlsb3Qgc29icmUgcGVkaWRvcywgcHJhdG9zLCBQSVguLi5cIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyByb3VuZGVkLXhsIHB4LTMgcHktMiBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlIHBsYWNlaG9sZGVyOnRleHQtb24tc3VyZmFjZS12YXJpYW50LzcwIG91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LzIwXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbmRBaSgpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctcHJpbWFyeS1jb250YWluZXIgaG92ZXI6YmctcHJpbWFyeSB0ZXh0LW9uLXByaW1hcnkgdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtIGFjdGl2ZTpzY2FsZS05NSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaHJpbmstMFwiXG4gICAgICAgICAgdGl0bGU9XCJQZXJndW50YXIgw6AgSUFcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMHB4XVwiPnNlbmQ8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9hc2lkZT5cbiAgKTtcbn0iXSwibWFwcGluZ3MiOiI7Ozs7O0FBV0EsTUFBTSxpQkFBa0U7Q0FDdEU7RUFBRSxPQUFPO0VBQXNCLE1BQU07RUFBbUIsTUFBTTtDQUFtQztDQUNqRztFQUFFLE9BQU87RUFBdUIsTUFBTTtFQUFtQixNQUFNO0NBQTJDO0NBQzFHO0VBQUUsT0FBTztFQUFvQixNQUFNO0VBQVUsTUFBTTtDQUF5QztDQUM1RjtFQUFFLE9BQU87RUFBcUIsTUFBTTtFQUFpQixNQUFNO0NBQThDO0FBQzNHO0FBRUEsU0FBUyxrQkFBb0M7Q0FDM0MsTUFBTSxPQUFPLGNBQWM7Q0FDM0IsTUFBTSxLQUFLLHVCQUF1QjtDQUNsQyxPQUFPLEtBQUssTUFBTSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssS0FBSztBQUMvQztBQUVBLFNBQVMsVUFBa0I7Q0FDekIsd0JBQU8sSUFBSSxLQUFLLEVBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHO0VBQUUsTUFBTTtFQUFXLFFBQVE7Q0FBVSxDQUFDO0FBQ2pGO0FBRUEsU0FBUyxhQUFhLEtBQWEsUUFBa0M7Q0FDbkUsTUFBTSxPQUFPLElBQUksWUFBWTtDQUU3QixJQUFJLEtBQUssU0FBUyxRQUFRLEtBQUssS0FBSyxTQUFTLFNBQVMsS0FBSyxLQUFLLFNBQVMsUUFBUSxHQUMvRSxPQUFPLHdDQUF3QyxPQUFPLFdBQVc7Q0FHbkUsSUFDRSxLQUFLLFNBQVMsT0FBTyxLQUNyQixLQUFLLFNBQVMsVUFBVSxLQUN4QixLQUFLLFNBQVMsV0FBVyxLQUN6QixLQUFLLFNBQVMsVUFBVSxLQUN4QixLQUFL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