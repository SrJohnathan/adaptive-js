import { _ as jsx, b as __exportAll, c as signal, g as Fragment, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { s as getActive } from "./chunk-DSTwi42U.js";
import { t as Reveal } from "./chunk-DCCs5luT.js";
import { n as closeClientPanel, t as clientPanelOpen } from "./chunk-Bb4RYKsU.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";
import { n as iniciais, t as avatarUrl } from "./chunk-dojgNuCz.js";

//#region src/components/chatscreen/drawer-contact.tsx
var drawer_contact_exports = /* @__PURE__ */ __exportAll({ DrawerContact: () => DrawerContact });
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
const DrawerContact = () => {
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
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Reveal, {
		when: () => clientPanelOpen(),
		children: [/* @__PURE__ */ jsxs(Reveal.If, { children: [/* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-[60] bg-black/25 backdrop-blur-[1px]",
			onClick: closeClientPanel
		}), /* @__PURE__ */ jsxs("aside", {
			className: "fixed top-16 right-0 bottom-0 z-[61] w-80 xl:w-96 bg-surface-container-lowest border-l border-outline-variant/20 shadow-2xl overflow-y-auto scrollbar-thin animate-in fade-in",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "sticky top-0 z-10 px-4 py-3 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/20 flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "font-headline-sm text-on-surface font-bold flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "material-symbols-outlined text-[20px] text-primary",
						children: "contact_page"
					}), "Perfil 360° do Cliente"]
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: closeClientPanel,
					className: "p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors",
					title: "Fechar Painel 360°",
					children: /* @__PURE__ */ jsx("span", {
						className: "material-symbols-outlined text-[20px]",
						children: "close"
					})
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-4 space-y-4",
				children: [
					() => {
						const active = getActive();
						if (!active) return null;
						return /* @__PURE__ */ jsxs("div", {
							className: "bg-surface-container-low rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [() => {
										const src = avatarUrl(active.avatar);
										return src ? /* @__PURE__ */ jsx("img", {
											className: "w-14 h-14 rounded-full object-cover ring-2 ring-primary/20",
											alt: active.clientName,
											src
										}) : /* @__PURE__ */ jsx("span", {
											className: "w-14 h-14 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-headline-lg",
											children: iniciais(active.clientName)
										});
									}, /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "font-headline-sm text-on-surface font-bold truncate",
											children: active.clientName
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5 mt-0.5",
											children: [/* @__PURE__ */ jsx("span", {
												className: "px-2 py-0.2 rounded bg-amber-100 text-amber-800 font-label-sm font-bold",
												children: active.vipStatus || "Cliente Frequente"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-[11px] text-on-surface-variant font-mono",
												children: active.phone
											})]
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant/20 text-center",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "bg-surface-container-lowest p-2 rounded-lg",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "Gasto Mês"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-title-md text-primary font-bold",
												children: active.totalSpentMonth
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "bg-surface-container-lowest p-2 rounded-lg",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "Pedidos"
											}), /* @__PURE__ */ jsxs("span", {
												className: "font-title-md text-on-surface font-bold",
												children: [active.completedOrdersCount, " concl."]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "bg-surface-container-lowest p-2 rounded-lg",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "Ticket Médio"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-title-md text-tertiary font-bold",
												children: active.avgTicket
											})]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "font-body-sm text-on-surface-variant flex items-center gap-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[16px] text-primary",
										children: "location_on"
									}), /* @__PURE__ */ jsx("span", {
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
						return /* @__PURE__ */ jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-3 shadow-sm",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center",
											children: /* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "psychology"
											})
										}), /* @__PURE__ */ jsx("span", {
											className: "font-title-md text-on-surface font-bold",
											children: "Rede Assist Copilot"
										})]
									}), /* @__PURE__ */ jsxs("span", {
										className: "font-label-sm px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold",
										children: [active.sentimentPercent, "% Positivo"]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
											children: "Respostas Prontas (1-Click)"
										}),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => handleQuickAiReply("Carlos, seu pedido #8942 já está em preparo na filial Jardins! Previsão de entrega entre 35 e 45 minutos no seu endereço."),
											className: "w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-on-surface flex items-start gap-2 group",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[16px] text-primary group-hover:scale-110 transition-transform",
												children: "send"
											}), /* @__PURE__ */ jsx("span", { children: "Previsão de Entrega Totvs" })]
										}),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => handleQuickAiReply("Como você é nosso cliente VIP Ouro, caso queira a sobremesa Petit Gâteau hoje, envio com 20% de cortesia!"),
											className: "w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-on-surface flex items-start gap-2 group",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[16px] text-tertiary group-hover:scale-110 transition-transform",
												children: "redeem"
											}), /* @__PURE__ */ jsx("span", { children: "Oferecer Cortesia Sobremesa" })]
										}),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => handleQuickAiReply("Segue a chave Pix direta da loja com confirmação instantânea no seu pedido: 11.234.567/0001-89"),
											className: "w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-on-surface flex items-start gap-2 group",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[16px] text-secondary group-hover:scale-110 transition-transform",
												children: "qr_code_2"
											}), /* @__PURE__ */ jsx("span", { children: "Enviar Link Pix Direto" })]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "pt-2 border-t border-outline-variant/20 flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-label-sm text-on-surface-variant",
										children: "Tom da IA:"
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-center gap-1 bg-surface-container-low p-1 rounded-lg",
										children: [
											"friendly",
											"formal",
											"promo"
										].map((tone) => /* @__PURE__ */ jsx("button", {
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
					/* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-2.5 shadow-sm",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-title-md text-on-surface font-bold",
								children: "Pratos Mais Pedidos (ERP)"
							}), /* @__PURE__ */ jsx("span", {
								className: "font-code-sm text-[11px] text-tertiary font-bold",
								children: "Histórico"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between p-2 rounded-lg bg-surface-container-low font-body-sm",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-xl",
										children: "🍕"
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-on-surface block",
										children: "Pizza Margherita Especial"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[11px] text-on-surface-variant",
										children: "Pediu 4x este mês"
									})] })]
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("Que tal repetir a sua favorita Pizza Margherita Especial hoje?"),
									className: "p-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary transition-colors",
									title: "Ofertar Prato",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[16px]",
										children: "send"
									})
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between p-2 rounded-lg bg-surface-container-low font-body-sm",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-xl",
										children: "🍫"
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-on-surface block",
										children: "Petit Gâteau Belga"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[11px] text-on-surface-variant",
										children: "Pediu 2x este mês"
									})] })]
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => handleQuickAiReply("Separamos um Petit Gâteau Belga quentinho para acompanhar seu almoço!"),
									className: "p-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary transition-colors",
									title: "Ofertar Prato",
									children: /* @__PURE__ */ jsx("span", {
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
						return /* @__PURE__ */ jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-2 shadow-sm",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-title-md text-on-surface font-bold",
									children: "Notas Internas da Equipe"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setIsAddingNote(!isAddingNote()),
									className: "text-primary hover:underline font-label-sm font-bold",
									children: () => isAddingNote() ? "Cancelar" : "+ Nova Nota"
								})]
							}), /* @__PURE__ */ jsxs(Reveal, {
								when: () => isAddingNote(),
								children: [/* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-2 pt-1",
									children: [/* @__PURE__ */ jsx("textarea", {
										value: () => internalNoteText(),
										onInput: (event) => setInternalNoteText(event.currentTarget.value),
										placeholder: "Escreva uma instrução para a equipe de atendimento e cozinha...",
										rows: 3,
										className: "w-full p-2 bg-surface-container-low border border-outline-variant/30 rounded-lg font-body-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: handleSaveInternalNote,
										className: "w-full py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md font-bold transition-colors",
										children: "Salvar Anotação"
									})]
								}) }), /* @__PURE__ */ jsx(Reveal.Else, { children: /* @__PURE__ */ jsx("div", {
									className: "p-2.5 rounded-lg bg-amber-50 text-amber-900 border-l-2 border-amber-500 font-body-sm",
									children: active.notes
								}) })]
							})]
						});
					}
				]
			})]
		})] }), /* @__PURE__ */ jsx(Reveal.Else, { children: /* @__PURE__ */ jsx(Fragment, { children: " " }) })]
	}) });
};
typeof DrawerContact === "function" && markClientExport(DrawerContact, "components/chatscreen/drawer-contact", "DrawerContact", "hydrate");

//#endregion
export { drawer_contact_exports as n, DrawerContact as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstQkFIMkZSNDcuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvY2hhdHNjcmVlbi9kcmF3ZXItY29udGFjdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ2h5ZHJhdGUnXG5pbXBvcnQge1JldmVhbH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy9jb21wb25lbnRzXCI7XG5pbXBvcnQge2V2ZW50cywgc2lnbmFsfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuaW1wb3J0IHtjbGllbnRQYW5lbE9wZW4sIGNsb3NlQ2xpZW50UGFuZWx9IGZyb20gXCIuLi8uLi9zaGFyZWQvb21uaS1odWIvY2xpZW50LXBhbmVsLXN0b3JlXCI7XG5pbXBvcnQge2dldEFjdGl2ZX0gZnJvbSBcIi4uLy4uL2ZlYXR1cmVzL2NoYXQvcmVhY3RpdmVzLWhlbHBlcy50c1wiO1xuaW1wb3J0IHtzaG93VG9hc3R9IGZyb20gXCIuLi8uLi9zaGFyZWQvb21uaS1odWIvdG9hc3Qtc3RvcmUudHNcIjtcbmltcG9ydCB7IGF2YXRhclVybCwgaW5pY2lhaXMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2F2YXRhci50c1wiO1xuXG50eXBlIEFpVG9uZSA9IFwiZnJpZW5kbHlcIiB8IFwiZm9ybWFsXCIgfCBcInByb21vXCI7XG5cbmNvbnN0IFRPTkVfTEFCRUxTOiBSZWNvcmQ8QWlUb25lLCBzdHJpbmc+ID0ge1xuICAgIGZyaWVuZGx5OiBcIkFtaWfDoXZlbFwiLFxuICAgIGZvcm1hbDogXCJGb3JtYWxcIixcbiAgICBwcm9tbzogXCJQcm9tb1wiLFxufTtcblxuY29uc3QgVE9ORV9UT0FTVFM6IFJlY29yZDxBaVRvbmUsIHN0cmluZz4gPSB7XG4gICAgZnJpZW5kbHk6IFwiQW1pZ8OhdmVsXCIsXG4gICAgZm9ybWFsOiBcIkZvcm1hbFwiLFxuICAgIHByb21vOiBcIlByb21vY2lvbmFsXCIsXG59O1xuXG5leHBvcnQgY29uc3QgRHJhd2VyQ29udGFjdCA9ICgpID0+IHtcblxuXG4gICAgY29uc3QgW2ludGVybmFsTm90ZVRleHQsIHNldEludGVybmFsTm90ZVRleHRdID0gc2lnbmFsKFwiXCIpO1xuICAgIGNvbnN0IFtpc0FkZGluZ05vdGUsIHNldElzQWRkaW5nTm90ZV0gPSBzaWduYWwoZmFsc2UpO1xuICAgIGNvbnN0IFtpbnB1dFRleHQsIHNldElucHV0VGV4dF0gPSBzaWduYWwoXCJcIik7XG4gICAgY29uc3QgW2FpVG9uZSwgc2V0QWlUb25lXSA9IHNpZ25hbDxBaVRvbmU+KFwiZnJpZW5kbHlcIik7XG5cbiAgICBjb25zdCBoYW5kbGVRdWlja0FpUmVwbHkgPSAoc3VnZ2VzdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgICAgIHNldElucHV0VGV4dChzdWdnZXN0aW9uKTtcbiAgICAgICAgc2hvd1RvYXN0KFwiSUEgQ29waWxvdFwiLCBcIlN1Z2VzdMOjbyBpbnNlcmlkYSBubyBjYW1wbyBkZSB0ZXh0by4gVm9jw6ogcG9kZSBlZGl0YXIgb3UgZW52aWFyIGRpcmV0YW1lbnRlLlwiKTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCBoYW5kbGVTYXZlSW50ZXJuYWxOb3RlID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWludGVybmFsTm90ZVRleHQoKS50cmltKCkgfHwgIWdldEFjdGl2ZSgpKSByZXR1cm47XG4gICAgICAgIHNldElzQWRkaW5nTm90ZShmYWxzZSk7XG4gICAgICAgIHNldEludGVybmFsTm90ZVRleHQoXCJcIik7XG4gICAgICAgIHNob3dUb2FzdChcIk5vdGEgSW50ZXJuYSBTYWx2YVwiLCBcIkEgYW5vdGHDp8OjbyBmb2kgcmVnaXN0cmFkYSBjb20gc3VjZXNzbyBubyBwZXJmaWwgZG8gY2xpZW50ZS5cIiwgXCJpbmZvXCIpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKDw+XG4gICAgICAgIDxSZXZlYWwgd2hlbj17KCkgPT4gY2xpZW50UGFuZWxPcGVuKCl9PlxuICAgICAgICAgICAgPFJldmVhbC5JZj5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei1bNjBdIGJnLWJsYWNrLzI1IGJhY2tkcm9wLWJsdXItWzFweF1cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZUNsaWVudFBhbmVsfVxuICAgICAgICAgICAgICAgID48L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxhc2lkZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCB0b3AtMTYgcmlnaHQtMCBib3R0b20tMCB6LVs2MV0gdy04MCB4bDp3LTk2IGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCBib3JkZXItbCBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHNoYWRvdy0yeGwgb3ZlcmZsb3cteS1hdXRvIHNjcm9sbGJhci10aGluIGFuaW1hdGUtaW4gZmFkZS1pblwiPlxuICAgICAgICAgICAgICAgICAgICB7LyogQ2FiZcOnYWxobyBkbyBEcmF3ZXIgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AtMCB6LTEwIHB4LTQgcHktMyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3QvOTUgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXItYiBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtc20gdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzIwcHhdIHRleHQtcHJpbWFyeVwiPmNvbnRhY3RfcGFnZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGVyZmlsIDM2MMKwIGRvIENsaWVudGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VDbGllbnRQYW5lbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZS12YXJpYW50IHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkZlY2hhciBQYWluZWwgMzYwwrBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF1cIj5jbG9zZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDYXJ0w6NvIGRlIFBlcmZpbCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gZ2V0QWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGZsZXgtY29sIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gYXZhdGFyVXJsKGFjdGl2ZS5hdmF0YXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3JjID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTQgaC0xNCByb3VuZGVkLWZ1bGwgb2JqZWN0LWNvdmVyIHJpbmctMiByaW5nLXByaW1hcnkvMjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17YWN0aXZlLmNsaWVudE5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtzcmN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xNCBoLTE0IHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5LWNvbnRhaW5lci8yMCB0ZXh0LXByaW1hcnkgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtaGVhZGxpbmUtbGdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aW5pY2lhaXMoYWN0aXZlLmNsaWVudE5hbWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLXNtIHRleHQtb24tc3VyZmFjZSBmb250LWJvbGQgdHJ1bmNhdGVcIj57YWN0aXZlLmNsaWVudE5hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjIgcm91bmRlZCBiZy1hbWJlci0xMDAgdGV4dC1hbWJlci04MDAgZm9udC1sYWJlbC1zbSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZS52aXBTdGF0dXMgfHwgXCJDbGllbnRlIEZyZXF1ZW50ZVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb250LWNvZGUtc20gdGV4dC1bMTFweF0gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1tb25vXCI+e2FjdGl2ZS5waG9uZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0zIGdhcC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHAtMiByb3VuZGVkLWxnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGJsb2NrXCI+R2FzdG8gTcOqczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC1wcmltYXJ5IGZvbnQtYm9sZFwiPnthY3RpdmUudG90YWxTcGVudE1vbnRofTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCBwLTIgcm91bmRlZC1sZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBibG9ja1wiPlBlZGlkb3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb250LXRpdGxlLW1kIHRleHQtb24tc3VyZmFjZSBmb250LWJvbGRcIj57YWN0aXZlLmNvbXBsZXRlZE9yZGVyc0NvdW50fSBjb25jbC48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3QgcC0yIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGJsb2NrXCI+VGlja2V0IE3DqWRpbzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC10ZXJ0aWFyeSBmb250LWJvbGRcIj57YWN0aXZlLmF2Z1RpY2tldH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE2cHhdIHRleHQtcHJpbWFyeVwiPmxvY2F0aW9uX29uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2FjdGl2ZS5hZGRyZXNzfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFJlZGUgQXNzaXN0IENvcGlsb3QgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICB7KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGdldEFjdGl2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTQgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBmbGV4LWNvbCBnYXAtMyBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHJvdW5kZWQtbGcgYmctcHJpbWFyeS1jb250YWluZXIgdGV4dC1vbi1wcmltYXJ5IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF1cIj5wc3ljaG9sb2d5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+UmVkZSBBc3Npc3QgQ29waWxvdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTEwMCB0ZXh0LWVtZXJhbGQtODAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmUuc2VudGltZW50UGVyY2VudH0lIFBvc2l0aXZvXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICBSZXNwb3N0YXMgUHJvbnRhcyAoMS1DbGljaylcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVF1aWNrQWlSZXBseShcIkNhcmxvcywgc2V1IHBlZGlkbyAjODk0MiBqw6EgZXN0w6EgZW0gcHJlcGFybyBuYSBmaWxpYWwgSmFyZGlucyEgUHJldmlzw6NvIGRlIGVudHJlZ2EgZW50cmUgMzUgZSA0NSBtaW51dG9zIG5vIHNldSBlbmRlcmXDp28uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCBwLTIgcm91bmRlZC1sZyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaCB0cmFuc2l0aW9uLWNvbG9ycyBmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlIGZsZXggaXRlbXMtc3RhcnQgZ2FwLTIgZ3JvdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNnB4XSB0ZXh0LXByaW1hcnkgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtXCI+c2VuZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHJldmlzw6NvIGRlIEVudHJlZ2EgVG90dnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVRdWlja0FpUmVwbHkoXCJDb21vIHZvY8OqIMOpIG5vc3NvIGNsaWVudGUgVklQIE91cm8sIGNhc28gcXVlaXJhIGEgc29icmVtZXNhIFBldGl0IEfDonRlYXUgaG9qZSwgZW52aW8gY29tIDIwJSBkZSBjb3J0ZXNpYSFcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgcC0yIHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdHJhbnNpdGlvbi1jb2xvcnMgZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZSBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yIGdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF0gdGV4dC10ZXJ0aWFyeSBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIj5yZWRlZW08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk9mZXJlY2VyIENvcnRlc2lhIFNvYnJlbWVzYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrQWlSZXBseShcIlNlZ3VlIGEgY2hhdmUgUGl4IGRpcmV0YSBkYSBsb2phIGNvbSBjb25maXJtYcOnw6NvIGluc3RhbnTDom5lYSBubyBzZXUgcGVkaWRvOiAxMS4yMzQuNTY3LzAwMDEtODlcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgcC0yIHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdHJhbnNpdGlvbi1jb2xvcnMgZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZSBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yIGdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF0gdGV4dC1zZWNvbmRhcnkgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtXCI+cXJfY29kZV8yPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5FbnZpYXIgTGluayBQaXggRGlyZXRvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBNb2R1bGFkb3IgZGUgVG9tICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+VG9tIGRhIElBOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBwLTEgcm91bmRlZC1sZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KFtcImZyaWVuZGx5XCIsIFwiZm9ybWFsXCIsIFwicHJvbW9cIl0gYXMgY29uc3QpLm1hcCgodG9uZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dG9uZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFpVG9uZSh0b25lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1RvYXN0KFwiVG9tIGRhIElBXCIsIGBUb20gYWp1c3RhZG8gcGFyYSAke1RPTkVfVE9BU1RTW3RvbmVdfS5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWlUb25lKCkgPT09IHRvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgY2FwaXRhbGl6ZSBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3QgdGV4dC1wcmltYXJ5IHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwicHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIGNhcGl0YWxpemUgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6dGV4dC1vbi1zdXJmYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1RPTkVfTEFCRUxTW3RvbmVdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogUHJhdG9zIEZhdm9yaXRvcyBkbyBDbGllbnRlICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCByb3VuZGVkLXhsIHAtNCBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGZsZXgtY29sIGdhcC0yLjUgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPlByYXRvcyBNYWlzIFBlZGlkb3MgKEVSUCk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbSB0ZXh0LVsxMXB4XSB0ZXh0LXRlcnRpYXJ5IGZvbnQtYm9sZFwiPkhpc3TDs3JpY288L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0yIHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItbG93IGZvbnQtYm9keS1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGxcIj7wn42VPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1vbi1zdXJmYWNlIGJsb2NrXCI+UGl6emEgTWFyZ2hlcml0YSBFc3BlY2lhbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+UGVkaXUgNHggZXN0ZSBtw6pzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUXVpY2tBaVJlcGx5KFwiUXVlIHRhbCByZXBldGlyIGEgc3VhIGZhdm9yaXRhIFBpenphIE1hcmdoZXJpdGEgRXNwZWNpYWwgaG9qZT9cIil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoZXN0IGhvdmVyOmJnLXByaW1hcnkgaG92ZXI6dGV4dC1vbi1wcmltYXJ5IHRleHQtcHJpbWFyeSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJPZmVydGFyIFByYXRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE2cHhdXCI+c2VuZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0yIHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItbG93IGZvbnQtYm9keS1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGxcIj7wn42rPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtb24tc3VyZmFjZSBibG9ja1wiPlBldGl0IEfDonRlYXUgQmVsZ2E8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlBlZGl1IDJ4IGVzdGUgbcOqczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrQWlSZXBseShcIlNlcGFyYW1vcyB1bSBQZXRpdCBHw6J0ZWF1IEJlbGdhIHF1ZW50aW5obyBwYXJhIGFjb21wYW5oYXIgc2V1IGFsbW/Dp28hXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItaGlnaGVzdCBob3ZlcjpiZy1wcmltYXJ5IGhvdmVyOnRleHQtb24tcHJpbWFyeSB0ZXh0LXByaW1hcnkgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiT2ZlcnRhciBQcmF0b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNnB4XVwiPnNlbmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIE5vdGFzIEludGVybmFzICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgeygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBnZXRBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHJvdW5kZWQteGwgcC00IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTIgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+Tm90YXMgSW50ZXJuYXMgZGEgRXF1aXBlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQWRkaW5nTm90ZSghaXNBZGRpbmdOb3RlKCkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgaG92ZXI6dW5kZXJsaW5lIGZvbnQtbGFiZWwtc20gZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoKSA9PiAoaXNBZGRpbmdOb3RlKCkgPyBcIkNhbmNlbGFyXCIgOiBcIisgTm92YSBOb3RhXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZXZlYWwgd2hlbj17KCkgPT4gaXNBZGRpbmdOb3RlKCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZXZlYWwuSWY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMiBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gaW50ZXJuYWxOb3RlVGV4dCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9eyhldmVudCkgPT4gc2V0SW50ZXJuYWxOb3RlVGV4dChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVzY3JldmEgdW1hIGluc3RydcOnw6NvIHBhcmEgYSBlcXVpcGUgZGUgYXRlbmRpbWVudG8gZSBjb3ppbmhhLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTIgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzMwIHJvdW5kZWQtbGcgZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZSBvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0xIGZvY3VzOnJpbmctcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNhdmVJbnRlcm5hbE5vdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTEuNSByb3VuZGVkLWxnIGJnLXByaW1hcnktY29udGFpbmVyIGhvdmVyOmJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IGZvbnQtdGl0bGUtbWQgZm9udC1ib2xkIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTYWx2YXIgQW5vdGHDp8Ojb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvUmV2ZWFsLklmPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSZXZlYWwuRWxzZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC1sZyBiZy1hbWJlci01MCB0ZXh0LWFtYmVyLTkwMCBib3JkZXItbC0yIGJvcmRlci1hbWJlci01MDAgZm9udC1ib2R5LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlLm5vdGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L1JldmVhbC5FbHNlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9SZXZlYWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2FzaWRlPlxuICAgICAgICAgICAgPC9SZXZlYWwuSWY+XG4gICAgICAgICAgICA8UmV2ZWFsLkVsc2U+XG4gICAgICAgICAgICAgICAgPD4gPC8+XG4gICAgICAgICAgICA8L1JldmVhbC5FbHNlPlxuICAgICAgICA8L1JldmVhbD5cbiAgPC8+ICApXG5cbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVNBLE1BQU0sY0FBc0M7Q0FDeEMsVUFBVTtDQUNWLFFBQVE7Q0FDUixPQUFPO0FBQ1g7QUFFQSxNQUFNLGNBQXNDO0NBQ3hDLFVBQVU7Q0FDVixRQUFRO0NBQ1IsT0FBTztBQUNYO0FBRUEsTUFBYSxzQkFBc0I7Q0FHL0IsTUFBTSxDQUFDLGtCQUFrQix1QkFBdUIsT0FBTyxFQUFFO0NBQ3pELE1BQU0sQ0FBQyxjQUFjLG1CQUFtQixPQUFPLEtBQUs7Q0FDcEQs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