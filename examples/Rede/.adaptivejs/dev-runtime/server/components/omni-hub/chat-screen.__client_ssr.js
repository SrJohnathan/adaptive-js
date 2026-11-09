import { ListMessage } from "../chatscreen/list-message.js?t=1791414636356";
import { DrawerContact } from "../chatscreen/drawer-contact.js?t=1791414636356";
import { AiChatPanel } from "../chatscreen/ai-chat-panel.js?t=1791414636356";
import { ListContects } from "../chatscreen/list-contects.js?t=1791414636356";
import { events, signal, useRouter, init } from "@adaptive-js/web";
import { Reveal } from "@adaptive-js/components";
import { channelFilter, connection, getActive, isTyping, pushMessage, selectedConversationId, setChannelFilter, setTyping } from "../../features/chat/reactives-helpes.js?t=1791414636356";
import { showToast } from "../../shared/omni-hub/toast-store.js?t=1791414636356";
import { avatarUrl, iniciais } from "../../shared/avatar.js?t=1791414636356";
import { joinConversation, notifyTyping, sendAgentMessage } from "../../features/chat/ContextSocket.js?t=1791414636356";
import { clientPanelOpen, toggleClientPanel } from "../../shared/omni-hub/client-panel-store.js?t=1791414636356";
import { SCREEN_ROUTES } from "../../shared/omni-hub/types.js?t=1791414636356";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
const CHANNEL_PILLS = [
	{
		id: "all",
		label: "Todos",
		count: "38"
	},
	{
		id: "whatsapp",
		label: "WhatsApp",
		icon: "chat",
		count: "21",
		color: "text-emerald-700"
	},
	{
		id: "instagram",
		label: "Instagram",
		icon: "photo_camera",
		count: "9",
		color: "text-pink-600"
	},
	{
		id: "telegram",
		label: "Telegram",
		icon: "send",
		count: "5",
		color: "text-sky-600"
	}
];
export function ChatScreen() {
	const router = useRouter();
	const [activeTab, setActiveTab] = signal("mine");
	const [inputText, setInputText] = signal("");
	init(() => {});
	const timeNow = () => new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
	// Entra na sala realtime da conversa ativa sempre que a seleção muda.
	events(() => {
		const id = selectedConversationId();
		if (id) joinConversation(id);
	}, [selectedConversationId]);
	const handleInputChange = (value) => {
		setInputText(value);
		const active = getActive();
		if (active) notifyTyping(active.id, value.trim().length > 0);
	};
	const handleSendMessage = (textToSend) => {
		const text = textToSend ?? inputText();
		if (!text.trim()) return;
		const active = getActive();
		if (!active) {
			showToast("Nenhuma conversa aberta", "Aguarde o realtime carregar a caixa de entrada.", "warning");
			return;
		}
		const delivered = sendAgentMessage(active.id, text, "Mariana Silva");
		if (!delivered) {
			// Sem realtime: mantém o comportamento local para a UI não morrer.
			const message = {
				id: "msg-" + Date.now(),
				sender: "agent",
				senderName: "Mariana Silva",
				text,
				time: timeNow(),
				status: "done_all"
			};
			pushMessage(active.id, message);
		}
		setInputText("");
		notifyTyping(active.id, false);
		setTyping(active.id, false);
		showToast(delivered ? "Mensagem Enviada" : "Mensagem Enviada (offline)", delivered ? `Enviada em tempo real para ${active.clientName}.` : `Salva localmente para ${active.clientName} (realtime offline).`, delivered ? "success" : "warning");
	};
	const handleQuickAiReply = (suggestion) => {
		setInputText(suggestion);
		showToast("IA Copilot", "Sugestão inserida no campo de texto. Você pode editar ou enviar diretamente.");
	};
	return /* @__PURE__ */ _jsxs("div", {
		className: "flex-1 flex overflow-hidden h-[calc(100vh-64px)] w-full bg-surface",
		children: [
			/* @__PURE__ */ _jsxs("section", {
				className: "w-80 lg:w-96 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col shrink-0 h-full",
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "p-4 border-b border-outline-variant/20 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsx("h1", {
									className: "font-headline-md text-on-surface font-bold",
									children: "Conversas"
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-semibold",
										children: "38 ativas"
									}), /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => showToast("Atualizando Inbox", "Verificando novas mensagens no WhatsApp Cloud API e Instagram...", "info"),
										className: "p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors",
										title: "Filtrar Mensagens",
										children: /* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[20px]",
											children: "filter_list"
										})
									})]
								})]
							}),
							/* @__PURE__ */ _jsx("div", {
								className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-nowrap",
								children: CHANNEL_PILLS.map((chan) => {
									const selected = channelFilter() === chan.id;
									return /* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => setChannelFilter(chan.id),
										className: () => selected ? "px-2.5 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-primary text-on-primary font-bold shadow-sm" : "px-2.5 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-surface-container-low text-on-surface-variant hover:bg-surface-container",
										children: [
											chan.icon && /* @__PURE__ */ _jsx("span", {
												className: `material-symbols-outlined text-[15px] ${chan.color}`,
												children: chan.icon
											}),
											/* @__PURE__ */ _jsx("span", { children: chan.label }),
											chan.count && /* @__PURE__ */ _jsx("span", {
												className: "text-[11px] ml-0.5 text-on-surface-variant/70",
												children: chan.count
											})
										]
									}, chan.id);
								})
							}),
							/* @__PURE__ */ _jsx("div", {
								className: "flex border-b border-outline-variant/15 text-label-md font-label-md",
								children: [
									"mine",
									"queue",
									"resolved"
								].map((tab) => {
									const label = tab === "mine" ? "Minhas (12)" : tab === "queue" ? "Fila (8)" : "Resolvidas";
									const isActive = activeTab() === tab;
									return /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => setActiveTab(tab),
										className: () => isActive ? "flex-1 py-1.5 text-center font-bold border-b-2 border-primary text-primary" : "flex-1 py-1.5 text-center border-b-2 border-transparent text-on-surface-variant hover:text-on-surface",
										children: label
									}, tab);
								})
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center bg-surface-container-low rounded-xl px-3 py-1.5 border border-outline-variant/20 focus-within:ring-1 focus-within:ring-primary",
								children: [
									/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-on-surface-variant mr-2 text-[18px]",
										children: "search"
									}),
									/* @__PURE__ */ _jsx("input", {
										type: "text",
										placeholder: "Buscar por cliente, pedido # ou telefone...",
										className: "w-full bg-transparent border-none outline-none font-body-sm text-on-surface placeholder:text-on-surface-variant/70"
									}),
									/* @__PURE__ */ _jsx("kbd", {
										className: "font-code-sm text-on-surface-variant text-[10px] px-1 bg-surface-container-highest rounded",
										children: "Ctrl K"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ _jsx(ListContects, {}),
					/* @__PURE__ */ _jsxs("div", {
						className: "p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant",
						children: [/* @__PURE__ */ _jsxs("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ _jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }), "Meta WhatsApp Cloud API Ativa"]
						}), /* @__PURE__ */ _jsx("span", {
							className: "font-code-sm",
							children: "SLA Médio: 1.8 min"
						})]
					})
				]
			}),
			/* @__PURE__ */ _jsxs("main", {
				className: "flex-1 flex flex-col bg-surface-container-low/40 h-full overflow-hidden",
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "h-16 px-6 bg-surface-container-lowest border-b border-outline-variant/20 flex items-center justify-between shrink-0 shadow-sm",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ _jsx("div", {
								className: "relative",
								children: () => {
									const active = getActive();
									const src = active ? avatarUrl(active.avatar) : null;
									if (!active) {
										return /* @__PURE__ */ _jsx("span", { className: "w-10 h-10 rounded-full bg-surface-container-high animate-pulse" });
									}
									return src ? /* @__PURE__ */ _jsx("img", {
										className: "w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant/30",
										alt: active.clientName,
										src
									}) : /* @__PURE__ */ _jsx("span", {
										className: "w-10 h-10 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-headline-md",
										children: iniciais(active.clientName)
									});
								}
							}), /* @__PURE__ */ _jsx("div", { children: () => {
								const active = getActive();
								if (!active) {
									return /* @__PURE__ */ _jsx("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ _jsx("h2", {
											className: "font-headline-sm text-on-surface-variant font-bold",
											children: "Carregando conversas do realtime…"
										})
									});
								}
								return /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsx("h2", {
										className: "font-headline-sm text-on-surface font-bold",
										children: active.clientName
									}), active.vipStatus && /* @__PURE__ */ _jsx("span", {
										className: "px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-label-sm font-bold",
										children: active.vipStatus
									})]
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2 text-on-surface-variant font-body-sm",
									children: [
										/* @__PURE__ */ _jsx("span", { children: active.phone }),
										/* @__PURE__ */ _jsx("span", { children: "•" }),
										/* @__PURE__ */ _jsxs("span", {
											className: "text-primary font-medium flex items-center gap-1",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[14px]",
												children: "verified"
											}), active.channelBadgeText]
										})
									]
								})] });
							} })]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ _jsxs("div", {
									className: "hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface font-code-sm border border-outline-variant/20",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[16px] text-tertiary",
										children: "timer"
									}), /* @__PURE__ */ _jsxs("span", { children: ["SLAJ: ", /* @__PURE__ */ _jsx("strong", {
										className: "text-primary",
										children: () => inputText()
									})] })]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm border border-outline-variant/20",
									title: "Microserviço realtime (Socket.IO)",
									children: [/* @__PURE__ */ _jsx("span", { className: `w-2 h-2 rounded-full ${() => connection() === "online" ? "bg-emerald-500" : connection() === "connecting" ? "bg-amber-400 animate-pulse" : "bg-red-500"}` }), /* @__PURE__ */ _jsx("span", { children: () => connection() === "online" ? "Realtime" : connection() === "connecting" ? "Conectando" : "Offline" })]
								}),
								/* @__PURE__ */ _jsxs("button", {
									type: "button",
									onClick: () => showToast("Transferir Atendimento", "Escolha o operador ou departamento de destino (Cozinha/Logística).", "info"),
									className: "hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md transition-colors border border-outline-variant/20",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[18px]",
										children: "swap_horiz"
									}), /* @__PURE__ */ _jsx("span", { children: "Transferir" })]
								}),
								/* @__PURE__ */ _jsxs("button", {
									type: "button",
									onClick: toggleClientPanel,
									className: "p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors relative",
									title: "Perfil 360° do Cliente",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "contact_page"
									}), /* @__PURE__ */ _jsxs(Reveal, {
										when: () => clientPanelOpen(),
										children: [/* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsx("span", { className: "absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest" }) }), /* @__PURE__ */ _jsx(Reveal.Else, { children: /* @__PURE__ */ _jsx(_Fragment, { children: " " }) })]
									})]
								}),
								/* @__PURE__ */ _jsxs("button", {
									type: "button",
									onClick: () => router.push(SCREEN_ROUTES["catalogo-erp"]),
									className: "flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-colors",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[18px] text-primary",
										children: "restaurant_menu"
									}), /* @__PURE__ */ _jsx("span", { children: "Cardápio ERP" })]
								}),
								/* @__PURE__ */ _jsxs("button", {
									type: "button",
									onClick: () => showToast("Atendimento Concluído", `Conversa com ${getActive()?.clientName ?? "cliente"} finalizada com protocolo registrado no Totvs.`, "success"),
									className: "flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm active:scale-95 font-bold",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[18px]",
										children: "check_circle"
									}), /* @__PURE__ */ _jsx("span", { children: "Concluir" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "flex-1 flex flex-col min-h-0 p-4 sm:p-6",
						children: [
							/* @__PURE__ */ _jsx("div", {
								className: "flex justify-center my-2 shrink-0",
								children: /* @__PURE__ */ _jsxs("span", {
									className: "px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm flex items-center gap-1.5 shadow-sm border border-outline-variant/15",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[14px]",
										children: "lock"
									}), "Conversa criptografada de ponta a ponta • Protocolo Totvs #99281-2024"]
								})
							}),
							/* @__PURE__ */ _jsx(ListMessage, {}),
							() => isTyping(getActive()?.id ?? "") ? /* @__PURE__ */ _jsxs("div", {
								className: "flex items-center gap-2 px-1 pt-1",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[16px] text-primary animate-pulse",
									children: "more_horiz"
								}), /* @__PURE__ */ _jsxs("span", {
									className: "text-label-sm text-on-surface-variant",
									children: [getActive()?.clientName, " está digitando..."]
								})]
							}) : null
						]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "px-4 sm:px-6 py-2 bg-surface-container border-t border-outline-variant/20 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-primary text-[18px] shrink-0",
								children: "auto_awesome"
							}), /* @__PURE__ */ _jsxs("span", {
								className: "font-body-sm text-on-surface truncate",
								children: [/* @__PURE__ */ _jsx("strong", { children: "Sugestão Rede Assist:" }), " \"Carlos, seu pedido #8942 já está sendo embalado pela cozinha. O motoboy parceiro do iFood sai em 8 minutos!\""]
							})]
						}), /* @__PURE__ */ _jsx("button", {
							type: "button",
							onClick: () => handleQuickAiReply("Carlos, seu pedido #8942 já está sendo embalado pela cozinha. O motoboy parceiro do iFood sai em 8 minutos!"),
							className: "px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-surface-container-lowest text-primary font-label-md font-semibold transition-colors shrink-0 shadow-sm",
							children: "Inserir (Tab)"
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "p-4 bg-surface-container-lowest border-t border-outline-variant/20 flex flex-col gap-2 shrink-0",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => showToast("Anexar Arquivo", "Selecione imagem, PDF fiscal ou comprovante.", "info"),
									className: "p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors",
									title: "Anexar Arquivo ou Foto",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "attach_file"
									})
								}),
								/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("🍕 Segue o link com nosso cardápio completo atualizado e promoções do dia: https://cardapio.redehub.com.br"),
									className: "p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors",
									title: "Cardápio Digital Rápido",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "restaurant"
									})
								}),
								/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("A chave Pix para pagamento direto com 5% de desconto é: financeiro@redehub.com.br"),
									className: "p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors",
									title: "Chave Pix",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "pix"
									})
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "flex-1 flex items-center bg-surface-container-low rounded-xl px-4 py-2 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20",
									children: [/* @__PURE__ */ _jsx("input", {
										type: "text",
										value: () => inputText(),
										onInput: (event) => handleInputChange(event.currentTarget.value),
										onKeyDown: (event) => {
											if (event.key === "Enter") handleSendMessage();
										},
										placeholder: "Digite sua mensagem para Carlos... (Enter para enviar)",
										className: "w-full bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-on-surface-variant/70"
									}), /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => handleQuickAiReply("Temos sim! Nossos doces e sobremesas finas estão saindo com desconto especial hoje."),
										className: "text-on-surface-variant hover:text-primary transition-colors p-1",
										title: "Melhorar com IA",
										children: /* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "sentiment_satisfied"
										})
									})]
								}),
								/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => showToast("Gravação de Áudio", "Microfone ativado para mensagem de voz de alta fidelidade.", "info"),
									className: "p-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors",
									title: "Gravar Áudio",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[22px]",
										children: "mic"
									})
								}),
								/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => handleSendMessage(),
									className: "p-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm active:scale-95 flex items-center justify-center",
									title: "Enviar Mensagem",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "send"
									})
								})
							]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-2 overflow-x-auto text-nowrap scrollbar-none pt-1",
							children: [
								/* @__PURE__ */ _jsx("span", {
									className: "font-label-sm text-on-surface-variant font-bold",
									children: "Atalhos:"
								}),
								/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("Carlos, a previsão estimada do iFood é de 35 a 45 minutos no endereço da Av. Paulista!"),
									className: "px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors",
									children: "/previsao (Previsão de Entrega)"
								}),
								/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("Você gostaria de adicionar refrigerante ou suco artesanal de maracujá 500ml ao seu pedido?"),
									className: "px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors",
									children: "/bebidas (Ofertar Bebidas)"
								}),
								/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("Obrigado pela preferência! Caso precise de algo a mais, é só chamar por aqui."),
									className: "px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors",
									children: "/agradecer (Finalizar Cortesia)"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ _jsx(AiChatPanel, {}),
			/* @__PURE__ */ _jsx(DrawerContact, {})
		]
	});
}

//# sourceMappingURL=chat-screen.__client_ssr.js.map
