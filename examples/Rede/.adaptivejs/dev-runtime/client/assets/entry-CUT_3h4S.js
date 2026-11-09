import { _ as jsx, a as init, b as __exportAll, c as signal, f as events, g as Fragment, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { a as connection, c as isTyping, i as channelFilter, m as setChannelFilter, p as selectedConversationId, s as getActive, u as pushMessage, v as setTyping } from "./chunk-DSTwi42U.js";
import { t as AiChatPanel } from "./chunk-DYsYmnSl.js";
import { t as Reveal } from "./chunk-DCCs5luT.js";
import { r as toggleClientPanel, t as clientPanelOpen } from "./chunk-Bb4RYKsU.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";
import { n as iniciais, t as avatarUrl } from "./chunk-dojgNuCz.js";
import { t as DrawerContact } from "./chunk-BAH2FR47.js";
import { i as notifyTyping, o as sendAgentMessage, r as joinConversation } from "./chunk-DNVYKgy8.js";
import { t as ListContects } from "./chunk-DTiulrse.js";
import { t as ListMessage } from "./chunk-BIn3WaTY.js";
import { t as SCREEN_ROUTES } from "./chunk-BAJW75ro.js";

//#region src/components/omni-hub/chat-screen.tsx
var chat_screen_exports = /* @__PURE__ */ __exportAll({ ChatScreen: () => ChatScreen });
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
function ChatScreen() {
	const router = useRouter();
	const [activeTab, setActiveTab] = signal("mine");
	const [inputText, setInputText] = signal("");
	init(() => {});
	const timeNow = () => (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
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
	return /* @__PURE__ */ jsxs("div", {
		className: "flex-1 flex overflow-hidden h-[calc(100vh-64px)] w-full bg-surface",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "w-80 lg:w-96 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col shrink-0 h-full",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "p-4 border-b border-outline-variant/20 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("h1", {
									className: "font-headline-md text-on-surface font-bold",
									children: "Conversas"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", {
										className: "px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-semibold",
										children: "38 ativas"
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => showToast("Atualizando Inbox", "Verificando novas mensagens no WhatsApp Cloud API e Instagram...", "info"),
										className: "p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors",
										title: "Filtrar Mensagens",
										children: /* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[20px]",
											children: "filter_list"
										})
									})]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-nowrap",
								children: CHANNEL_PILLS.map((chan) => {
									const selected = channelFilter() === chan.id;
									return /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setChannelFilter(chan.id),
										className: () => selected ? "px-2.5 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-primary text-on-primary font-bold shadow-sm" : "px-2.5 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-surface-container-low text-on-surface-variant hover:bg-surface-container",
										children: [
											chan.icon && /* @__PURE__ */ jsx("span", {
												className: `material-symbols-outlined text-[15px] ${chan.color}`,
												children: chan.icon
											}),
											/* @__PURE__ */ jsx("span", { children: chan.label }),
											chan.count && /* @__PURE__ */ jsx("span", {
												className: "text-[11px] ml-0.5 text-on-surface-variant/70",
												children: chan.count
											})
										]
									}, chan.id);
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex border-b border-outline-variant/15 text-label-md font-label-md",
								children: [
									"mine",
									"queue",
									"resolved"
								].map((tab) => {
									const label = tab === "mine" ? "Minhas (12)" : tab === "queue" ? "Fila (8)" : "Resolvidas";
									const isActive = activeTab() === tab;
									return /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setActiveTab(tab),
										className: () => isActive ? "flex-1 py-1.5 text-center font-bold border-b-2 border-primary text-primary" : "flex-1 py-1.5 text-center border-b-2 border-transparent text-on-surface-variant hover:text-on-surface",
										children: label
									}, tab);
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center bg-surface-container-low rounded-xl px-3 py-1.5 border border-outline-variant/20 focus-within:ring-1 focus-within:ring-primary",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-on-surface-variant mr-2 text-[18px]",
										children: "search"
									}),
									/* @__PURE__ */ jsx("input", {
										type: "text",
										placeholder: "Buscar por cliente, pedido # ou telefone...",
										className: "w-full bg-transparent border-none outline-none font-body-sm text-on-surface placeholder:text-on-surface-variant/70"
									}),
									/* @__PURE__ */ jsx("kbd", {
										className: "font-code-sm text-on-surface-variant text-[10px] px-1 bg-surface-container-highest rounded",
										children: "Ctrl K"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsx(ListContects, {}),
					/* @__PURE__ */ jsxs("div", {
						className: "p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }), "Meta WhatsApp Cloud API Ativa"]
						}), /* @__PURE__ */ jsx("span", {
							className: "font-code-sm",
							children: "SLA Médio: 1.8 min"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "flex-1 flex flex-col bg-surface-container-low/40 h-full overflow-hidden",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "h-16 px-6 bg-surface-container-lowest border-b border-outline-variant/20 flex items-center justify-between shrink-0 shadow-sm",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "relative",
								children: () => {
									const active = getActive();
									const src = active ? avatarUrl(active.avatar) : null;
									if (!active) return /* @__PURE__ */ jsx("span", { className: "w-10 h-10 rounded-full bg-surface-container-high animate-pulse" });
									return src ? /* @__PURE__ */ jsx("img", {
										className: "w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant/30",
										alt: active.clientName,
										src
									}) : /* @__PURE__ */ jsx("span", {
										className: "w-10 h-10 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-headline-md",
										children: iniciais(active.clientName)
									});
								}
							}), /* @__PURE__ */ jsx("div", { children: () => {
								const active = getActive();
								if (!active) return /* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ jsx("h2", {
										className: "font-headline-sm text-on-surface-variant font-bold",
										children: "Carregando conversas do realtime…"
									})
								});
								return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("h2", {
										className: "font-headline-sm text-on-surface font-bold",
										children: active.clientName
									}), active.vipStatus && /* @__PURE__ */ jsx("span", {
										className: "px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-label-sm font-bold",
										children: active.vipStatus
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-on-surface-variant font-body-sm",
									children: [
										/* @__PURE__ */ jsx("span", { children: active.phone }),
										/* @__PURE__ */ jsx("span", { children: "•" }),
										/* @__PURE__ */ jsxs("span", {
											className: "text-primary font-medium flex items-center gap-1",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[14px]",
												children: "verified"
											}), active.channelBadgeText]
										})
									]
								})] });
							} })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface font-code-sm border border-outline-variant/20",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[16px] text-tertiary",
										children: "timer"
									}), /* @__PURE__ */ jsxs("span", { children: ["SLAJ: ", /* @__PURE__ */ jsx("strong", {
										className: "text-primary",
										children: () => inputText()
									})] })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm border border-outline-variant/20",
									title: "Microserviço realtime (Socket.IO)",
									children: [/* @__PURE__ */ jsx("span", { className: `w-2 h-2 rounded-full ${() => connection() === "online" ? "bg-emerald-500" : connection() === "connecting" ? "bg-amber-400 animate-pulse" : "bg-red-500"}` }), /* @__PURE__ */ jsx("span", { children: () => connection() === "online" ? "Realtime" : connection() === "connecting" ? "Conectando" : "Offline" })]
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => showToast("Transferir Atendimento", "Escolha o operador ou departamento de destino (Cozinha/Logística).", "info"),
									className: "hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md transition-colors border border-outline-variant/20",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[18px]",
										children: "swap_horiz"
									}), /* @__PURE__ */ jsx("span", { children: "Transferir" })]
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: toggleClientPanel,
									className: "p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors relative",
									title: "Perfil 360° do Cliente",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "contact_page"
									}), /* @__PURE__ */ jsxs(Reveal, {
										when: () => clientPanelOpen(),
										children: [/* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsx("span", { className: "absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest" }) }), /* @__PURE__ */ jsx(Reveal.Else, { children: /* @__PURE__ */ jsx(Fragment, { children: " " }) })]
									})]
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => router.push(SCREEN_ROUTES["catalogo-erp"]),
									className: "flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-colors",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[18px] text-primary",
										children: "restaurant_menu"
									}), /* @__PURE__ */ jsx("span", { children: "Cardápio ERP" })]
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => showToast("Atendimento Concluído", `Conversa com ${getActive()?.clientName ?? "cliente"} finalizada com protocolo registrado no Totvs.`, "success"),
									className: "flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm active:scale-95 font-bold",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[18px]",
										children: "check_circle"
									}), /* @__PURE__ */ jsx("span", { children: "Concluir" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex flex-col min-h-0 p-4 sm:p-6",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-center my-2 shrink-0",
								children: /* @__PURE__ */ jsxs("span", {
									className: "px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm flex items-center gap-1.5 shadow-sm border border-outline-variant/15",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[14px]",
										children: "lock"
									}), "Conversa criptografada de ponta a ponta • Protocolo Totvs #99281-2024"]
								})
							}),
							/* @__PURE__ */ jsx(ListMessage, {}),
							() => isTyping(getActive()?.id ?? "") ? /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 px-1 pt-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[16px] text-primary animate-pulse",
									children: "more_horiz"
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-label-sm text-on-surface-variant",
									children: [getActive()?.clientName, " está digitando..."]
								})]
							}) : null
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "px-4 sm:px-6 py-2 bg-surface-container border-t border-outline-variant/20 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-primary text-[18px] shrink-0",
								children: "auto_awesome"
							}), /* @__PURE__ */ jsxs("span", {
								className: "font-body-sm text-on-surface truncate",
								children: [/* @__PURE__ */ jsx("strong", { children: "Sugestão Rede Assist:" }), " \"Carlos, seu pedido #8942 já está sendo embalado pela cozinha. O motoboy parceiro do iFood sai em 8 minutos!\""]
							})]
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => handleQuickAiReply("Carlos, seu pedido #8942 já está sendo embalado pela cozinha. O motoboy parceiro do iFood sai em 8 minutos!"),
							className: "px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-surface-container-lowest text-primary font-label-md font-semibold transition-colors shrink-0 shadow-sm",
							children: "Inserir (Tab)"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "p-4 bg-surface-container-lowest border-t border-outline-variant/20 flex flex-col gap-2 shrink-0",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => showToast("Anexar Arquivo", "Selecione imagem, PDF fiscal ou comprovante.", "info"),
									className: "p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors",
									title: "Anexar Arquivo ou Foto",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "attach_file"
									})
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("🍕 Segue o link com nosso cardápio completo atualizado e promoções do dia: https://cardapio.redehub.com.br"),
									className: "p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors",
									title: "Cardápio Digital Rápido",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "restaurant"
									})
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("A chave Pix para pagamento direto com 5% de desconto é: financeiro@redehub.com.br"),
									className: "p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors",
									title: "Chave Pix",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "pix"
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex-1 flex items-center bg-surface-container-low rounded-xl px-4 py-2 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20",
									children: [/* @__PURE__ */ jsx("input", {
										type: "text",
										value: () => inputText(),
										onInput: (event) => handleInputChange(event.currentTarget.value),
										onKeyDown: (event) => {
											if (event.key === "Enter") handleSendMessage();
										},
										placeholder: "Digite sua mensagem para Carlos... (Enter para enviar)",
										className: "w-full bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-on-surface-variant/70"
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => handleQuickAiReply("Temos sim! Nossos doces e sobremesas finas estão saindo com desconto especial hoje."),
										className: "text-on-surface-variant hover:text-primary transition-colors p-1",
										title: "Melhorar com IA",
										children: /* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "sentiment_satisfied"
										})
									})]
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => showToast("Gravação de Áudio", "Microfone ativado para mensagem de voz de alta fidelidade.", "info"),
									className: "p-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors",
									title: "Gravar Áudio",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[22px]",
										children: "mic"
									})
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => handleSendMessage(),
									className: "p-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm active:scale-95 flex items-center justify-center",
									title: "Enviar Mensagem",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "send"
									})
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 overflow-x-auto text-nowrap scrollbar-none pt-1",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-label-sm text-on-surface-variant font-bold",
									children: "Atalhos:"
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("Carlos, a previsão estimada do iFood é de 35 a 45 minutos no endereço da Av. Paulista!"),
									className: "px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors",
									children: "/previsao (Previsão de Entrega)"
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("Você gostaria de adicionar refrigerante ou suco artesanal de maracujá 500ml ao seu pedido?"),
									className: "px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors",
									children: "/bebidas (Ofertar Bebidas)"
								}),
								/* @__PURE__ */ jsx("button", {
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
			/* @__PURE__ */ jsx(AiChatPanel, {}),
			/* @__PURE__ */ jsx(DrawerContact, {})
		]
	});
}
typeof ChatScreen === "function" && markClientExport(ChatScreen, "components/omni-hub/chat-screen", "ChatScreen", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__chat-screen.tsx
hydrateClientComponents("components/omni-hub/chat-screen", chat_screen_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktQ1VUXzNoNFMuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9jaGF0LXNjcmVlbi50c3giLCIuLi8uLi90ZW1wL2NsaWVudC1jb21wb25lbnRzL2NvbXBvbmVudHNfX29tbmktaHViX19jaGF0LXNjcmVlbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ2h5ZHJhdGUnXG5pbXBvcnQge0xpc3RNZXNzYWdlfSBmcm9tIFwiLi4vY2hhdHNjcmVlbi9saXN0LW1lc3NhZ2UudHN4XCI7XG5pbXBvcnQge0RyYXdlckNvbnRhY3R9IGZyb20gXCIuLi9jaGF0c2NyZWVuL2RyYXdlci1jb250YWN0LnRzeFwiO1xuaW1wb3J0IHtBaUNoYXRQYW5lbH0gZnJvbSBcIi4uL2NoYXRzY3JlZW4vYWktY2hhdC1wYW5lbC50c3hcIjtcbmltcG9ydCB7TGlzdENvbnRlY3RzfSBmcm9tIFwiLi4vY2hhdHNjcmVlbi9saXN0LWNvbnRlY3RzLnRzeFwiO1xuaW1wb3J0IHtcblxuICAgIGV2ZW50cyxcbiAgICBzaWduYWwsXG4gICAgdXNlUm91dGVyLFxuICAgIGluaXQsXG5cbn0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcbmltcG9ydCB7UmV2ZWFsfSBmcm9tIFwiQGFkYXB0aXZlLWpzL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7XG4gICAgY2hhbm5lbEZpbHRlcixcbiAgICBjb25uZWN0aW9uLCBnZXRBY3RpdmUsIGlzVHlwaW5nLFxuICAgIHB1c2hNZXNzYWdlLCBzZWxlY3RlZENvbnZlcnNhdGlvbklkLCBzZXRDaGFubmVsRmlsdGVyLCBzZXRUeXBpbmcsXG59IGZyb20gXCIuLi8uLi9mZWF0dXJlcy9jaGF0L3JlYWN0aXZlcy1oZWxwZXNcIjtcbmltcG9ydCB7c2hvd1RvYXN0fSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3RvYXN0LXN0b3JlXCI7XG5pbXBvcnQgeyBhdmF0YXJVcmwsIGluaWNpYWlzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9hdmF0YXJcIjtcbmltcG9ydCB7am9pbkNvbnZlcnNhdGlvbiwgbm90aWZ5VHlwaW5nLCBzZW5kQWdlbnRNZXNzYWdlfSBmcm9tIFwiLi4vLi4vZmVhdHVyZXMvY2hhdC9Db250ZXh0U29ja2V0XCI7XG5pbXBvcnQge1xuICAgIGNsaWVudFBhbmVsT3BlbiwgdG9nZ2xlQ2xpZW50UGFuZWxcbn0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi9jbGllbnQtcGFuZWwtc3RvcmVcIjtcblxuXG5cbmltcG9ydCB7U0NSRUVOX1JPVVRFUywgdHlwZSBDaGF0TWVzc2FnZX0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi90eXBlc1wiO1xuXG5jb25zdCBDSEFOTkVMX1BJTExTOiB7IGlkOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IGljb24/OiBzdHJpbmc7IGNvdW50Pzogc3RyaW5nOyBjb2xvcj86IHN0cmluZyB9W10gPSBbXG4gICAge2lkOiBcImFsbFwiLCBsYWJlbDogXCJUb2Rvc1wiLCBjb3VudDogXCIzOFwifSxcbiAgICB7aWQ6IFwid2hhdHNhcHBcIiwgbGFiZWw6IFwiV2hhdHNBcHBcIiwgaWNvbjogXCJjaGF0XCIsIGNvdW50OiBcIjIxXCIsIGNvbG9yOiBcInRleHQtZW1lcmFsZC03MDBcIn0sXG4gICAge2lkOiBcImluc3RhZ3JhbVwiLCBsYWJlbDogXCJJbnN0YWdyYW1cIiwgaWNvbjogXCJwaG90b19jYW1lcmFcIiwgY291bnQ6IFwiOVwiLCBjb2xvcjogXCJ0ZXh0LXBpbmstNjAwXCJ9LFxuICAgIHtpZDogXCJ0ZWxlZ3JhbVwiLCBsYWJlbDogXCJUZWxlZ3JhbVwiLCBpY29uOiBcInNlbmRcIiwgY291bnQ6IFwiNVwiLCBjb2xvcjogXCJ0ZXh0LXNreS02MDBcIn0sXG5dO1xuXG50eXBlIFNlcnZpY2VUYWIgPSBcIm1pbmVcIiB8IFwicXVldWVcIiB8IFwicmVzb2x2ZWRcIjtcbnR5cGUgQWlUb25lID0gXCJmcmllbmRseVwiIHwgXCJmb3JtYWxcIiB8IFwicHJvbW9cIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gQ2hhdFNjcmVlbigpIHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICAgIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSBzaWduYWw8U2VydmljZVRhYj4oXCJtaW5lXCIpO1xuICAgIGNvbnN0IFtpbnB1dFRleHQsIHNldElucHV0VGV4dF0gPSBzaWduYWwoXCJcIik7XG5cblxuICAgIGluaXQoKCkgPT4ge1xuXG5cblxuICAgIH0pXG5cbiAgICBjb25zdCB0aW1lTm93ID0gKCkgPT5cbiAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHtob3VyOiBcIjItZGlnaXRcIiwgbWludXRlOiBcIjItZGlnaXRcIn0pO1xuXG4gICAgLy8gRW50cmEgbmEgc2FsYSByZWFsdGltZSBkYSBjb252ZXJzYSBhdGl2YSBzZW1wcmUgcXVlIGEgc2VsZcOnw6NvIG11ZGEuXG4gICAgZXZlbnRzKCgpID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBzZWxlY3RlZENvbnZlcnNhdGlvbklkKCk7XG4gICAgICAgIGlmIChpZCkgam9pbkNvbnZlcnNhdGlvbihpZCk7XG4gICAgfSwgW3NlbGVjdGVkQ29udmVyc2F0aW9uSWRdKTtcblxuICAgIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgc2V0SW5wdXRUZXh0KHZhbHVlKTtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gZ2V0QWN0aXZlKCk7XG4gICAgICAgIGlmIChhY3RpdmUpIG5vdGlmeVR5cGluZyhhY3RpdmUuaWQsIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlU2VuZE1lc3NhZ2UgPSAodGV4dFRvU2VuZD86IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0ID0gdGV4dFRvU2VuZCA/PyBpbnB1dFRleHQoKTtcbiAgICAgICAgaWYgKCF0ZXh0LnRyaW0oKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IGdldEFjdGl2ZSgpO1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgc2hvd1RvYXN0KFwiTmVuaHVtYSBjb252ZXJzYSBhYmVydGFcIiwgXCJBZ3VhcmRlIG8gcmVhbHRpbWUgY2FycmVnYXIgYSBjYWl4YSBkZSBlbnRyYWRhLlwiLCBcIndhcm5pbmdcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWxpdmVyZWQgPSBzZW5kQWdlbnRNZXNzYWdlKGFjdGl2ZS5pZCwgdGV4dCwgXCJNYXJpYW5hIFNpbHZhXCIpO1xuICAgICAgICBpZiAoIWRlbGl2ZXJlZCkge1xuICAgICAgICAgICAgLy8gU2VtIHJlYWx0aW1lOiBtYW50w6ltIG8gY29tcG9ydGFtZW50byBsb2NhbCBwYXJhIGEgVUkgbsOjbyBtb3JyZXIuXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlOiBDaGF0TWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICBpZDogXCJtc2ctXCIgKyBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIHNlbmRlcjogXCJhZ2VudFwiLFxuICAgICAgICAgICAgICAgIHNlbmRlck5hbWU6IFwiTWFyaWFuYSBTaWx2YVwiLFxuICAgICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICAgICAgdGltZTogdGltZU5vdygpLFxuICAgICAgICAgICAgICAgIHN0YXR1czogXCJkb25lX2FsbFwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHB1c2hNZXNzYWdlKGFjdGl2ZS5pZCwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0SW5wdXRUZXh0KFwiXCIpO1xuICAgICAgICBub3RpZnlUeXBpbmcoYWN0aXZlLmlkLCBmYWxzZSk7XG4gICAgICAgIHNldFR5cGluZyhhY3RpdmUuaWQsIGZhbHNlKTtcbiAgICAgICAgc2hvd1RvYXN0KFxuICAgICAgICAgICAgZGVsaXZlcmVkID8gXCJNZW5zYWdlbSBFbnZpYWRhXCIgOiBcIk1lbnNhZ2VtIEVudmlhZGEgKG9mZmxpbmUpXCIsXG4gICAgICAgICAgICBkZWxpdmVyZWRcbiAgICAgICAgICAgICAgICA/IGBFbnZpYWRhIGVtIHRlbXBvIHJlYWwgcGFyYSAke2FjdGl2ZS5jbGllbnROYW1lfS5gXG4gICAgICAgICAgICAgICAgOiBgU2FsdmEgbG9jYWxtZW50ZSBwYXJhICR7YWN0aXZlLmNsaWVudE5hbWV9IChyZWFsdGltZSBvZmZsaW5lKS5gLFxuICAgICAgICAgICAgZGVsaXZlcmVkID8gXCJzdWNjZXNzXCIgOiBcIndhcm5pbmdcIixcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlUXVpY2tBaVJlcGx5ID0gKHN1Z2dlc3Rpb246IHN0cmluZykgPT4ge1xuICAgICAgICBzZXRJbnB1dFRleHQoc3VnZ2VzdGlvbik7XG4gICAgICAgIHNob3dUb2FzdChcIklBIENvcGlsb3RcIiwgXCJTdWdlc3TDo28gaW5zZXJpZGEgbm8gY2FtcG8gZGUgdGV4dG8uIFZvY8OqIHBvZGUgZWRpdGFyIG91IGVudmlhciBkaXJldGFtZW50ZS5cIik7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBvdmVyZmxvdy1oaWRkZW4gaC1bY2FsYygxMDB2aC02NHB4KV0gdy1mdWxsIGJnLXN1cmZhY2VcIj5cbiAgICAgICAgICAgIHsvKiA9PT09PT09PT09PT0gQ09MVU5BIDE6IENBSVhBIERFIEVOVFJBREEgT01OSUNIQU5ORUwgPT09PT09PT09PT09ICovfVxuICAgICAgICAgICAgPHNlY3Rpb25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTgwIGxnOnctOTYgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IGJvcmRlci1yIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBmbGV4LWNvbCBzaHJpbmstMCBoLWZ1bGxcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBib3JkZXItYiBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLW1kIHRleHQtb24tc3VyZmFjZSBmb250LWJvbGRcIj5Db252ZXJzYXM8L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdGV4dC1wcmltYXJ5IGZvbnQtY29kZS1zbSBmb250LXNlbWlib2xkXCI+MzggYXRpdmFzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VG9hc3QoXCJBdHVhbGl6YW5kbyBJbmJveFwiLCBcIlZlcmlmaWNhbmRvIG5vdmFzIG1lbnNhZ2VucyBubyBXaGF0c0FwcCBDbG91ZCBBUEkgZSBJbnN0YWdyYW0uLi5cIiwgXCJpbmZvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRmlsdHJhciBNZW5zYWdlbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMHB4XVwiPmZpbHRlcl9saXN0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogRmlsdHJvIGRlIENhbmFpcyBlbSBQaWxscyAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG92ZXJmbG93LXgtYXV0byBwYi0xIHNjcm9sbGJhci1ub25lIHRleHQtbm93cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Q0hBTk5FTF9QSUxMUy5tYXAoKGNoYW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGNoYW5uZWxGaWx0ZXIoKSA9PT0gY2hhbi5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NoYW4uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldENoYW5uZWxGaWx0ZXIoY2hhbi5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcInB4LTIuNSBweS0xIHJvdW5kZWQtZnVsbCBmb250LWxhYmVsLW1kIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHNocmluay0wIGJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IGZvbnQtYm9sZCBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwicHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIGZvbnQtbGFiZWwtbWQgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgc2hyaW5rLTAgYmctc3VyZmFjZS1jb250YWluZXItbG93IHRleHQtb24tc3VyZmFjZS12YXJpYW50IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NoYW4uaWNvbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNXB4XSAke2NoYW4uY29sb3J9YH0+e2NoYW4uaWNvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2NoYW4ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NoYW4uY291bnQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIG1sLTAuNSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudC83MFwiPntjaGFuLmNvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIEFiYXMgZGUgQXRlbmRpbWVudG8gKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItb3V0bGluZS12YXJpYW50LzE1IHRleHQtbGFiZWwtbWQgZm9udC1sYWJlbC1tZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhbXCJtaW5lXCIsIFwicXVldWVcIiwgXCJyZXNvbHZlZFwiXSBhcyBjb25zdCkubWFwKCh0YWIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRhYiA9PT0gXCJtaW5lXCIgPyBcIk1pbmhhcyAoMTIpXCIgOiB0YWIgPT09IFwicXVldWVcIiA/IFwiRmlsYSAoOClcIiA6IFwiUmVzb2x2aWRhc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiKCkgPT09IHRhYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RhYn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKHRhYil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImZsZXgtMSBweS0xLjUgdGV4dC1jZW50ZXIgZm9udC1ib2xkIGJvcmRlci1iLTIgYm9yZGVyLXByaW1hcnkgdGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImZsZXgtMSBweS0xLjUgdGV4dC1jZW50ZXIgYm9yZGVyLWItMiBib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6dGV4dC1vbi1zdXJmYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBDYW1wbyBkZSBCdXNjYSBSw6FwaWRhIG5hIEluYm94ICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgcm91bmRlZC14bCBweC0zIHB5LTEuNSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmb2N1cy13aXRoaW46cmluZy0xIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBtci0yIHRleHQtWzE4cHhdXCI+c2VhcmNoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQnVzY2FyIHBvciBjbGllbnRlLCBwZWRpZG8gIyBvdSB0ZWxlZm9uZS4uLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXRyYW5zcGFyZW50IGJvcmRlci1ub25lIG91dGxpbmUtbm9uZSBmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlIHBsYWNlaG9sZGVyOnRleHQtb24tc3VyZmFjZS12YXJpYW50LzcwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8a2JkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IHRleHQtWzEwcHhdIHB4LTEgYmctc3VyZmFjZS1jb250YWluZXItaGlnaGVzdCByb3VuZGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3RybCBLXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2tiZD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogTGlzdGEgZGUgQ29udmVyc2FzICovfVxuXG4gICAgICAgICAgICAgICA8TGlzdENvbnRlY3RzLz5cblxuICAgICAgICAgICAgICAgIHsvKiBSb2RhcMOpIGRhIEluYm94ICovfVxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBib3JkZXItdCBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LWxhYmVsLXNtIGZvbnQtbGFiZWwtc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5IGFuaW1hdGUtcHVsc2VcIj48L3NwYW4+XG4gICAgICAgICAgICBNZXRhIFdoYXRzQXBwIENsb3VkIEFQSSBBdGl2YVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtXCI+U0xBIE3DqWRpbzogMS44IG1pbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICAgICAgey8qID09PT09PT09PT09PSBDT0xVTkEgMjogTUVOU0FHRU5TIEUgQVRFTkRJTUVOVE8gPT09PT09PT09PT09ICovfVxuICAgICAgICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wgYmctc3VyZmFjZS1jb250YWluZXItbG93LzQwIGgtZnVsbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICB7LyogSGVhZGVyIGRhIENvbnZlcnNhIEF0aXZhKi99XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTE2IHB4LTYgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IGJvcmRlci1iIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNocmluay0wIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gZ2V0QWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IGFjdGl2ZSA/IGF2YXRhclVybChhY3RpdmUuYXZhdGFyKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIGFuaW1hdGUtcHVsc2VcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNyYyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC1mdWxsIG9iamVjdC1jb3ZlciByaW5nLTEgcmluZy1vdXRsaW5lLXZhcmlhbnQvMzBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17YWN0aXZlLmNsaWVudE5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtzcmN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5LWNvbnRhaW5lci8yMCB0ZXh0LXByaW1hcnkgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtaGVhZGxpbmUtbWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aW5pY2lhaXMoYWN0aXZlLmNsaWVudE5hbWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gZ2V0QWN0aXZlKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FycmVnYW5kbyBjb252ZXJzYXMgZG8gcmVhbHRpbWXigKZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLXNtIHRleHQtb24tc3VyZmFjZSBmb250LWJvbGRcIj57YWN0aXZlLmNsaWVudE5hbWV9PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZS52aXBTdGF0dXMgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctYW1iZXItMTAwIHRleHQtYW1iZXItODAwIGZvbnQtbGFiZWwtc20gZm9udC1ib2xkXCI+e2FjdGl2ZS52aXBTdGF0dXN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1ib2R5LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnthY3RpdmUucGhvbmV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPjxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE0cHhdXCI+dmVyaWZpZWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlLmNoYW5uZWxCYWRnZVRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogU0xBIGUgQcOnw7VlcyBSw6FwaWRhcyovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuIGxnOmZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgdGV4dC1vbi1zdXJmYWNlIGZvbnQtY29kZS1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF0gdGV4dC10ZXJ0aWFyeVwiPnRpbWVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNMQUo6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5XCI+eygpID0+IGlucHV0VGV4dCgpfTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogU3RhdHVzIGRvIHJlYWx0aW1lICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1sYWJlbC1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJNaWNyb3NlcnZpw6dvIHJlYWx0aW1lIChTb2NrZXQuSU8pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTIgaC0yIHJvdW5kZWQtZnVsbCAkeygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uKCkgPT09IFwib25saW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiYmctZW1lcmFsZC01MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY29ubmVjdGlvbigpID09PSBcImNvbm5lY3RpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImJnLWFtYmVyLTQwMCBhbmltYXRlLXB1bHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJiZy1yZWQtNTAwXCJ9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uKCkgPT09IFwib25saW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJSZWFsdGltZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNvbm5lY3Rpb24oKSA9PT0gXCJjb25uZWN0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIkNvbmVjdGFuZG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiT2ZmbGluZVwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd1RvYXN0KFwiVHJhbnNmZXJpciBBdGVuZGltZW50b1wiLCBcIkVzY29saGEgbyBvcGVyYWRvciBvdSBkZXBhcnRhbWVudG8gZGUgZGVzdGlubyAoQ296aW5oYS9Mb2fDrXN0aWNhKS5cIiwgXCJpbmZvXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlbiBzbTpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW9uLXN1cmZhY2UgZm9udC10aXRsZS1tZCB0cmFuc2l0aW9uLWNvbG9ycyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPnN3YXBfaG9yaXo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VHJhbnNmZXJpcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlQ2xpZW50UGFuZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlIHRyYW5zaXRpb24tY29sb3JzIHJlbGF0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlBlcmZpbCAzNjDCsCBkbyBDbGllbnRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzIwcHhdXCI+Y29udGFjdF9wYWdlPC9zcGFuPlxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmV2ZWFsIHdoZW49eygpID0+IGNsaWVudFBhbmVsT3BlbigpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJldmVhbC5JZj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0wLjUgLXJpZ2h0LTAuNSB3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctcHJpbWFyeSByaW5nLTIgcmluZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3RcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUmV2ZWFsLklmPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmV2ZWFsLkVsc2U+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PiA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9SZXZlYWwuRWxzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1JldmVhbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcm91dGVyLnB1c2goU0NSRUVOX1JPVVRFU1tcImNhdGFsb2dvLWVycFwiXSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2hlc3QgdGV4dC1vbi1zdXJmYWNlIGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF0gdGV4dC1wcmltYXJ5XCI+cmVzdGF1cmFudF9tZW51PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNhcmTDoXBpbyBFUlA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb2FzdChcIkF0ZW5kaW1lbnRvIENvbmNsdcOtZG9cIiwgYENvbnZlcnNhIGNvbSAke2dldEFjdGl2ZSgpPy5jbGllbnROYW1lID8/IFwiY2xpZW50ZVwifSBmaW5hbGl6YWRhIGNvbSBwcm90b2NvbG8gcmVnaXN0cmFkbyBubyBUb3R2cy5gLCBcInN1Y2Nlc3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1wcmltYXJ5LWNvbnRhaW5lciBob3ZlcjpiZy1wcmltYXJ5IHRleHQtb24tcHJpbWFyeSBmb250LXRpdGxlLW1kIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1zbSBhY3RpdmU6c2NhbGUtOTUgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+Y2hlY2tfY2lyY2xlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNvbmNsdWlyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogICAgIEZsdXhvIGRlIE1lbnNhZ2VucyovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wgbWluLWgtMCBwLTQgc206cC02XCI+XG4gICAgICAgICAgICAgICAgICB7LyogICBUYWcgZGUgSW7DrWNpbyBkZSBTZXNzw6NvKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBteS0yIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1sYWJlbC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8xNVwiPjxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNHB4XVwiPmxvY2s8L3NwYW4+Q29udmVyc2EgY3JpcHRvZ3JhZmFkYSBkZSBwb250YSBhIHBvbnRhIOKAoiBQcm90b2NvbG8gVG90dnMgIzk5MjgxLTIwMjQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgICAgICAgICAgPExpc3RNZXNzYWdlLz5cblxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBJbmRpY2Fkb3IgZGUgZGlnaXRhw6fDo28gdmluZG8gZG8gcmVhbHRpbWUgKi99XG4gICAgICAgICAgICAgICAgICAgIHsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUeXBpbmcoZ2V0QWN0aXZlKCk/LmlkID8/IFwiXCIpID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMSBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF0gdGV4dC1wcmltYXJ5IGFuaW1hdGUtcHVsc2VcIj5tb3JlX2hvcml6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0QWN0aXZlKCk/LmNsaWVudE5hbWV9IGVzdMOhIGRpZ2l0YW5kby4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICB7LyogICAgQmFycmEgZGUgU3VnZXN0w6NvIEF0aXZhIGRhIElBKi99XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHNtOnB4LTYgcHktMiBiZy1zdXJmYWNlLWNvbnRhaW5lciBib3JkZXItdCBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LXByaW1hcnkgdGV4dC1bMThweF0gc2hyaW5rLTBcIj5hdXRvX2F3ZXNvbWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgIDxzdHJvbmc+U3VnZXN0w6NvIFJlZGUgQXNzaXN0Ojwvc3Ryb25nPiBcIkNhcmxvcywgc2V1IHBlZGlkbyAjODk0MiBqw6EgZXN0w6Egc2VuZG8gZW1iYWxhZG8gcGVsYSBjb3ppbmhhLiBPIG1vdG9ib3kgcGFyY2Vpcm8gZG8gaUZvb2Qgc2FpIGVtIDggbWludXRvcyFcIlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVF1aWNrQWlSZXBseShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDYXJsb3MsIHNldSBwZWRpZG8gIzg5NDIgasOhIGVzdMOhIHNlbmRvIGVtYmFsYWRvIHBlbGEgY296aW5oYS4gTyBtb3RvYm95IHBhcmNlaXJvIGRvIGlGb29kIHNhaSBlbSA4IG1pbnV0b3MhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoZXN0IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCB0ZXh0LXByaW1hcnkgZm9udC1sYWJlbC1tZCBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tY29sb3JzIHNocmluay0wIHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEluc2VyaXIgKFRhYilcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgey8qw4FyZWEgZGUgQ29tcG9zacOnw6NvIGUgRW52aW8qL31cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtNCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3QgYm9yZGVyLXQgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGZsZXgtY29sIGdhcC0yIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93VG9hc3QoXCJBbmV4YXIgQXJxdWl2b1wiLCBcIlNlbGVjaW9uZSBpbWFnZW0sIFBERiBmaXNjYWwgb3UgY29tcHJvdmFudGUuXCIsIFwiaW5mb1wiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkFuZXhhciBBcnF1aXZvIG91IEZvdG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF1cIj5hdHRhY2hfZmlsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrQWlSZXBseShcIvCfjZUgU2VndWUgbyBsaW5rIGNvbSBub3NzbyBjYXJkw6FwaW8gY29tcGxldG8gYXR1YWxpemFkbyBlIHByb21vw6fDtWVzIGRvIGRpYTogaHR0cHM6Ly9jYXJkYXBpby5yZWRlaHViLmNvbS5iclwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkNhcmTDoXBpbyBEaWdpdGFsIFLDoXBpZG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF1cIj5yZXN0YXVyYW50PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUXVpY2tBaVJlcGx5KFwiQSBjaGF2ZSBQaXggcGFyYSBwYWdhbWVudG8gZGlyZXRvIGNvbSA1JSBkZSBkZXNjb250byDDqTogZmluYW5jZWlyb0ByZWRlaHViLmNvbS5iclwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkNoYXZlIFBpeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMHB4XVwiPnBpeDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogSW5wdXQgUHJpbmNpcGFsKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyByb3VuZGVkLXhsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkvMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gaW5wdXRUZXh0KCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9eyhldmVudCkgPT4gaGFuZGxlSW5wdXRDaGFuZ2UoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIGhhbmRsZVNlbmRNZXNzYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRGlnaXRlIHN1YSBtZW5zYWdlbSBwYXJhIENhcmxvcy4uLiAoRW50ZXIgcGFyYSBlbnZpYXIpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXRyYW5zcGFyZW50IGJvcmRlci1ub25lIG91dGxpbmUtbm9uZSBmb250LWJvZHktbWQgdGV4dC1vbi1zdXJmYWNlIHBsYWNlaG9sZGVyOnRleHQtb24tc3VyZmFjZS12YXJpYW50LzcwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrQWlSZXBseShcIlRlbW9zIHNpbSEgTm9zc29zIGRvY2VzIGUgc29icmVtZXNhcyBmaW5hcyBlc3TDo28gc2FpbmRvIGNvbSBkZXNjb250byBlc3BlY2lhbCBob2plLlwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb24tY29sb3JzIHAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiTWVsaG9yYXIgY29tIElBXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF1cIj5zZW50aW1lbnRfc2F0aXNmaWVkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93VG9hc3QoXCJHcmF2YcOnw6NvIGRlIMOBdWRpb1wiLCBcIk1pY3JvZm9uZSBhdGl2YWRvIHBhcmEgbWVuc2FnZW0gZGUgdm96IGRlIGFsdGEgZmlkZWxpZGFkZS5cIiwgXCJpbmZvXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJHcmF2YXIgw4F1ZGlvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzIycHhdXCI+bWljPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VuZE1lc3NhZ2UoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXByaW1hcnktY29udGFpbmVyIGhvdmVyOmJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IHRyYW5zaXRpb24tYWxsIHNoYWRvdy1zbSBhY3RpdmU6c2NhbGUtOTUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRW52aWFyIE1lbnNhZ2VtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzIwcHhdXCI+c2VuZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qICAgQXRhbGhvcyBSw6FwaWRvcyovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG92ZXJmbG93LXgtYXV0byB0ZXh0LW5vd3JhcCBzY3JvbGxiYXItbm9uZSBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtYm9sZFwiPkF0YWxob3M6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrQWlSZXBseShcIkNhcmxvcywgYSBwcmV2aXPDo28gZXN0aW1hZGEgZG8gaUZvb2Qgw6kgZGUgMzUgYSA0NSBtaW51dG9zIG5vIGVuZGVyZcOnbyBkYSBBdi4gUGF1bGlzdGEhXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW9uLXN1cmZhY2UgZm9udC1sYWJlbC1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8xNSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL3ByZXZpc2FvIChQcmV2aXPDo28gZGUgRW50cmVnYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrQWlSZXBseShcIlZvY8OqIGdvc3RhcmlhIGRlIGFkaWNpb25hciByZWZyaWdlcmFudGUgb3Ugc3VjbyBhcnRlc2FuYWwgZGUgbWFyYWN1asOhIDUwMG1sIGFvIHNldSBwZWRpZG8/XCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW9uLXN1cmZhY2UgZm9udC1sYWJlbC1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8xNSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL2JlYmlkYXMgKE9mZXJ0YXIgQmViaWRhcylcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrQWlSZXBseShcIk9icmlnYWRvIHBlbGEgcHJlZmVyw6puY2lhISBDYXNvIHByZWNpc2UgZGUgYWxnbyBhIG1haXMsIMOpIHPDsyBjaGFtYXIgcG9yIGFxdWkuXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW9uLXN1cmZhY2UgZm9udC1sYWJlbC1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8xNSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL2FncmFkZWNlciAoRmluYWxpemFyIENvcnRlc2lhKVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tYWluPlxuXG4gICAgICAgICAgICB7LyogPT09PT09PT09PT09IENPTFVOQSAzOiBDSEFUIENPTSBBIElBIChSRURFIEFTU0lTVCkgPT09PT09PT09PT09ICovfVxuICAgICAgICAgICAgPEFpQ2hhdFBhbmVsLz5cblxuICAgICAgICAgICAgey8qID09PT09PT09PT09PSBEUkFXRVIgRkxVVFVBTlRFOiBQRVJGSUwgMzYwwrAgRE8gQ0xJRU5URSA9PT09PT09PT09PT0gKi99XG5cbiAgICAgICAgIDxEcmF3ZXJDb250YWN0Lz5cblxuXG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iLCJcbmltcG9ydCAqIGFzIGNsaWVudE1vZHVsZSBmcm9tIFwiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvb21uaS1odWIvY2hhdC1zY3JlZW4udHN4XCI7XG5pbXBvcnQgeyBoeWRyYXRlQ2xpZW50Q29tcG9uZW50cyB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5cbmh5ZHJhdGVDbGllbnRDb21wb25lbnRzKFwiY29tcG9uZW50cy9vbW5pLWh1Yi9jaGF0LXNjcmVlblwiLCBjbGllbnRNb2R1bGUpO1xuZXhwb3J0IHt9O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsTUFBTSxnQkFBZ0c7Q0FDbEc7RUFBQyxJQUFJO0VBQU8sT0FBTztFQUFTLE9BQU87Q0FBSTtDQUN2QztFQUFDLElBQUk7RUFBWSxPQUFPO0VBQVksTUFBTTtFQUFRLE9BQU87RUFBTSxPQUFPO0NBQWtCO0NBQ3hGO0VBQUMsSUFBSTtFQUFhLE9BQU87RUFBYSxNQUFNO0VBQWdCLE9BQU87RUFBSyxPQUFPO0NBQWU7Q0FDOUY7RUFBQyxJQUFJO0VBQVksT0FBTztFQUFZLE1BQU07RUFBUSxPQUFPO0VBQUssT0FBTztDQUFjO0FBQ3ZGO0FBTUEsU0FBZ0IsYUFBYTtDQUN6QixNQUFNLFNBQVMsVUFBVTtDQUV6QixNQUFNLENBQUMsV0FBVyxnQkFBZ0IsT0FBbUIsTUFBTTtDQUMzRCxNQUFNLENBQUMsV0FBVyxnQkFBZ0IsT0FBTyxFQUFFO0NBRzNDLFdBQVcsQ0FJWCxDQUFDO0NBRUQsTUFBTSxpQ0FDRixJQUFJLEtBQUssRUFBQyxDQUFDLG1CQUFtQixDQUFDLEdBQUc7RUFBQyxNQUFNO0VBQVcsUUFBUTtDQUFTLENBQUM7Q0FHMUUsYUFBYTtFQUNULE1BQU0sS0FBSyx1QkFBdUI7RUFDbEMsSUFBSSxJQUFJLGlCQUFpQixFQUFFO0NBQy9CLEdBQUcsQ0FBQyxzQkFBc0IsQ0FB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