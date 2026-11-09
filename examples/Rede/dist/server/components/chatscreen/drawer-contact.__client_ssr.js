import { Reveal } from "@adaptive-js/components";
import { signal } from "@adaptive-js/web";
import { clientPanelOpen, closeClientPanel } from "../../shared/omni-hub/client-panel-store.js";
import { getActive } from "../../features/chat/reactives-helpes.js";
import { showToast } from "../../shared/omni-hub/toast-store.js";
import { avatarUrl, iniciais } from "../../shared/avatar.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
const TONE_LABELS = {
	friendly: "Amigável",
	formal: "Formal",
	promo: "Promo"
};
const TONE_TOASTS = {
	friendly: "Amigável",
	formal: "Formal",
	promo: "Promocional"
};
export const DrawerContact = () => {
	const [internalNoteText, setInternalNoteText] = signal("");
	const [isAddingNote, setIsAddingNote] = signal(false);
	const [inputText, setInputText] = signal("");
	const [aiTone, setAiTone] = signal("friendly");
	const handleQuickAiReply = (suggestion) => {
		setInputText(suggestion);
		showToast("IA Copilot", "Sugestão inserida no campo de texto. Você pode editar ou enviar diretamente.");
	};
	const handleSaveInternalNote = () => {
		if (!internalNoteText().trim() || !getActive()) return;
		setIsAddingNote(false);
		setInternalNoteText("");
		showToast("Nota Interna Salva", "A anotação foi registrada com sucesso no perfil do cliente.", "info");
	};
	return /* @__PURE__ */ _jsx(_Fragment, { children: /* @__PURE__ */ _jsxs(Reveal, {
		when: () => clientPanelOpen(),
		children: [/* @__PURE__ */ _jsxs(Reveal.If, { children: [/* @__PURE__ */ _jsx("div", {
			className: "fixed inset-0 z-[60] bg-black/25 backdrop-blur-[1px]",
			onClick: closeClientPanel
		}), /* @__PURE__ */ _jsxs("aside", {
			className: "fixed top-16 right-0 bottom-0 z-[61] w-80 xl:w-96 bg-surface-container-lowest border-l border-outline-variant/20 shadow-2xl overflow-y-auto scrollbar-thin animate-in fade-in",
			children: [/* @__PURE__ */ _jsxs("div", {
				className: "sticky top-0 z-10 px-4 py-3 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/20 flex items-center justify-between",
				children: [/* @__PURE__ */ _jsxs("span", {
					className: "font-headline-sm text-on-surface font-bold flex items-center gap-2",
					children: [/* @__PURE__ */ _jsx("span", {
						className: "material-symbols-outlined text-[20px] text-primary",
						children: "contact_page"
					}), "Perfil 360° do Cliente"]
				}), /* @__PURE__ */ _jsx("button", {
					type: "button",
					onClick: closeClientPanel,
					className: "p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors",
					title: "Fechar Painel 360°",
					children: /* @__PURE__ */ _jsx("span", {
						className: "material-symbols-outlined text-[20px]",
						children: "close"
					})
				})]
			}), /* @__PURE__ */ _jsxs("div", {
				className: "p-4 space-y-4",
				children: [
					() => {
						const active = getActive();
						if (!active) return null;
						return /* @__PURE__ */ _jsxs("div", {
							className: "bg-surface-container-low rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-3",
							children: [
								/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-3",
									children: [() => {
										const src = avatarUrl(active.avatar);
										return src ? /* @__PURE__ */ _jsx("img", {
											className: "w-14 h-14 rounded-full object-cover ring-2 ring-primary/20",
											alt: active.clientName,
											src
										}) : /* @__PURE__ */ _jsx("span", {
											className: "w-14 h-14 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-headline-lg",
											children: iniciais(active.clientName)
										});
									}, /* @__PURE__ */ _jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ _jsx("h3", {
											className: "font-headline-sm text-on-surface font-bold truncate",
											children: active.clientName
										}), /* @__PURE__ */ _jsxs("div", {
											className: "flex items-center gap-1.5 mt-0.5",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "px-2 py-0.2 rounded bg-amber-100 text-amber-800 font-label-sm font-bold",
												children: active.vipStatus || "Cliente Frequente"
											}), /* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-[11px] text-on-surface-variant font-mono",
												children: active.phone
											})]
										})]
									})]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant/20 text-center",
									children: [
										/* @__PURE__ */ _jsxs("div", {
											className: "bg-surface-container-lowest p-2 rounded-lg",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "Gasto Mês"
											}), /* @__PURE__ */ _jsx("span", {
												className: "font-title-md text-primary font-bold",
												children: active.totalSpentMonth
											})]
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "bg-surface-container-lowest p-2 rounded-lg",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "Pedidos"
											}), /* @__PURE__ */ _jsxs("span", {
												className: "font-title-md text-on-surface font-bold",
												children: [active.completedOrdersCount, " concl."]
											})]
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "bg-surface-container-lowest p-2 rounded-lg",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "Ticket Médio"
											}), /* @__PURE__ */ _jsx("span", {
												className: "font-title-md text-tertiary font-bold",
												children: active.avgTicket
											})]
										})
									]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "font-body-sm text-on-surface-variant flex items-center gap-1",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[16px] text-primary",
										children: "location_on"
									}), /* @__PURE__ */ _jsx("span", {
										className: "truncate",
										children: active.address
									})]
								})
							]
						});
					},
					() => {
						const active = getActive();
						if (!active) return null;
						return /* @__PURE__ */ _jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-3 shadow-sm",
							children: [
								/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ _jsx("div", {
											className: "w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center",
											children: /* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "psychology"
											})
										}), /* @__PURE__ */ _jsx("span", {
											className: "font-title-md text-on-surface font-bold",
											children: "Rede Assist Copilot"
										})]
									}), /* @__PURE__ */ _jsxs("span", {
										className: "font-label-sm px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold",
										children: [active.sentimentPercent, "% Positivo"]
									})]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ _jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
											children: "Respostas Prontas (1-Click)"
										}),
										/* @__PURE__ */ _jsxs("button", {
											type: "button",
											onClick: () => handleQuickAiReply("Carlos, seu pedido #8942 já está em preparo na filial Jardins! Previsão de entrega entre 35 e 45 minutos no seu endereço."),
											className: "w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-on-surface flex items-start gap-2 group",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[16px] text-primary group-hover:scale-110 transition-transform",
												children: "send"
											}), /* @__PURE__ */ _jsx("span", { children: "Previsão de Entrega Totvs" })]
										}),
										/* @__PURE__ */ _jsxs("button", {
											type: "button",
											onClick: () => handleQuickAiReply("Como você é nosso cliente VIP Ouro, caso queira a sobremesa Petit Gâteau hoje, envio com 20% de cortesia!"),
											className: "w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-on-surface flex items-start gap-2 group",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[16px] text-tertiary group-hover:scale-110 transition-transform",
												children: "redeem"
											}), /* @__PURE__ */ _jsx("span", { children: "Oferecer Cortesia Sobremesa" })]
										}),
										/* @__PURE__ */ _jsxs("button", {
											type: "button",
											onClick: () => handleQuickAiReply("Segue a chave Pix direta da loja com confirmação instantânea no seu pedido: 11.234.567/0001-89"),
											className: "w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-on-surface flex items-start gap-2 group",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[16px] text-secondary group-hover:scale-110 transition-transform",
												children: "qr_code_2"
											}), /* @__PURE__ */ _jsx("span", { children: "Enviar Link Pix Direto" })]
										})
									]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "pt-2 border-t border-outline-variant/20 flex items-center justify-between",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "font-label-sm text-on-surface-variant",
										children: "Tom da IA:"
									}), /* @__PURE__ */ _jsx("div", {
										className: "flex items-center gap-1 bg-surface-container-low p-1 rounded-lg",
										children: [
											"friendly",
											"formal",
											"promo"
										].map((tone) => /* @__PURE__ */ _jsx("button", {
											type: "button",
											onClick: () => {
												setAiTone(tone);
												showToast("Tom da IA", `Tom ajustado para ${TONE_TOASTS[tone]}.`);
											},
											className: () => aiTone() === tone ? "px-2 py-0.5 rounded text-[11px] font-semibold capitalize bg-surface-container-lowest text-primary shadow-sm" : "px-2 py-0.5 rounded text-[11px] font-semibold capitalize text-on-surface-variant hover:text-on-surface",
											children: TONE_LABELS[tone]
										}, tone))
									})]
								})
							]
						});
					},
					/* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-2.5 shadow-sm",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "font-title-md text-on-surface font-bold",
								children: "Pratos Mais Pedidos (ERP)"
							}), /* @__PURE__ */ _jsx("span", {
								className: "font-code-sm text-[11px] text-tertiary font-bold",
								children: "Histórico"
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between p-2 rounded-lg bg-surface-container-low font-body-sm",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "text-xl",
										children: "🍕"
									}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
										className: "font-semibold text-on-surface block",
										children: "Pizza Margherita Especial"
									}), /* @__PURE__ */ _jsx("span", {
										className: "text-[11px] text-on-surface-variant",
										children: "Pediu 4x este mês"
									})] })]
								}), /* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("Que tal repetir a sua favorita Pizza Margherita Especial hoje?"),
									className: "p-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary transition-colors",
									title: "Ofertar Prato",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[16px]",
										children: "send"
									})
								})]
							}), /* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between p-2 rounded-lg bg-surface-container-low font-body-sm",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "text-xl",
										children: "🍫"
									}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
										className: "font-semibold text-on-surface block",
										children: "Petit Gâteau Belga"
									}), /* @__PURE__ */ _jsx("span", {
										className: "text-[11px] text-on-surface-variant",
										children: "Pediu 2x este mês"
									})] })]
								}), /* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("Separamos um Petit Gâteau Belga quentinho para acompanhar seu almoço!"),
									className: "p-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary transition-colors",
									title: "Ofertar Prato",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[16px]",
										children: "send"
									})
								})]
							})]
						})]
					}),
					() => {
						const active = getActive();
						if (!active) return null;
						return /* @__PURE__ */ _jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-2 shadow-sm",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "font-title-md text-on-surface font-bold",
									children: "Notas Internas da Equipe"
								}), /* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => setIsAddingNote(!isAddingNote()),
									className: "text-primary hover:underline font-label-sm font-bold",
									children: () => isAddingNote() ? "Cancelar" : "+ Nova Nota"
								})]
							}), /* @__PURE__ */ _jsxs(Reveal, {
								when: () => isAddingNote(),
								children: [/* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsxs("div", {
									className: "flex flex-col gap-2 pt-1",
									children: [/* @__PURE__ */ _jsx("textarea", {
										value: () => internalNoteText(),
										onInput: (event) => setInternalNoteText(event.currentTarget.value),
										placeholder: "Escreva uma instrução para a equipe de atendimento e cozinha...",
										rows: 3,
										className: "w-full p-2 bg-surface-container-low border border-outline-variant/30 rounded-lg font-body-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
									}), /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: handleSaveInternalNote,
										className: "w-full py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md font-bold transition-colors",
										children: "Salvar Anotação"
									})]
								}) }), /* @__PURE__ */ _jsx(Reveal.Else, { children: /* @__PURE__ */ _jsx("div", {
									className: "p-2.5 rounded-lg bg-amber-50 text-amber-900 border-l-2 border-amber-500 font-body-sm",
									children: active.notes
								}) })]
							})]
						});
					}
				]
			})]
		})] }), /* @__PURE__ */ _jsx(Reveal.Else, { children: /* @__PURE__ */ _jsx(_Fragment, { children: " " }) })]
	}) });
};

//# sourceMappingURL=drawer-contact.__client_ssr.js.map
