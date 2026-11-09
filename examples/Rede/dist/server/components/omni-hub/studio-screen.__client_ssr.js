import { signal, useRouter } from "@adaptive-js/web";
import { INITIAL_BANNERS, STUDIO_VARIATIONS, MAIN_BURGER_STUDIO_IMG } from "../../shared/omni-hub/mock-data.js";
import { showToast } from "../../shared/omni-hub/toast-store.js";
import { SCREEN_ROUTES } from "../../shared/omni-hub/types.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
const FORMAT_OPTIONS = [
	{
		id: "9:16",
		label: "9:16 Stories",
		sub: "Instagram / Whats"
	},
	{
		id: "1:1",
		label: "1:1 Feed",
		sub: "Feed Instagram"
	},
	{
		id: "16:9",
		label: "16:9 Banner",
		sub: "Campanhas Web"
	},
	{
		id: "16:10",
		label: "16:10 Vitrine",
		sub: "iFood & Totvs"
	}
];
const STYLE_OPTIONS = [
	"Fotografia Comercial 4K",
	"Iluminação Quente de Restaurante",
	"Estilo Dark & Neon",
	"Fundo Neutro Minimalista"
];
const PROMPT_SUGGESTIONS = [
	{
		label: "Burger Quarta 30% OFF",
		text: "Smash burger artesanal duplo com cheddar derretido e batatas rústicas douradas, iluminação quente de restaurante gourmet."
	},
	{
		label: "Combo Sushi Família",
		text: "Barca de sushi contemporâneo com salmão maçaricado, raspas de limão siciliano e tarê artesanal, fundo escuro elegante."
	},
	{
		label: "Black Friday Frete Grátis",
		text: "Pizza artesanal saindo do forno a lenha com queijo puxando, banner promocional de Black Friday de alta energia."
	},
	{
		label: "Almoço Executivo + Bebida",
		text: "Prato executivo suculento com picanha grelhada, arroz soltinho, feijão tropeiro e salada fresca com suco de laranja."
	}
];
const BANNER_TABS = [
	{
		id: "all",
		label: "Todos"
	},
	{
		id: "whatsapp",
		label: "WhatsApp"
	},
	{
		id: "instagram",
		label: "Instagram"
	},
	{
		id: "ifood",
		label: "iFood"
	},
	{
		id: "web",
		label: "Web"
	}
];
export function StudioScreen() {
	const router = useRouter();
	const [promptText, setPromptText] = signal("Smash burger duplo suculento com queijo cheddar inglês derretido escorrendo, fatias de bacon crocante artesanal, iluminação cinematográfica de estúdio, vapor saindo do pão brioche selado, estilo gourmet food photography 8k.");
	const [selectedFormat, setSelectedFormat] = signal("1:1");
	const [selectedStyle, setSelectedStyle] = signal("Fotografia Comercial 4K");
	const [isGenerating, setIsGenerating] = signal(false);
	const [currentCanvasImage, setCurrentCanvasImage] = signal(MAIN_BURGER_STUDIO_IMG);
	const [currentTitle, setCurrentTitle] = signal("QUARTA DO SMASH");
	const [currentBadge, setCurrentBadge] = signal("30% OFF");
	const [activeTabBanner, setActiveTabBanner] = signal("all");
	const [showDiscountTag, setShowDiscountTag] = signal(true);
	const [showStoreLogo, setShowStoreLogo] = signal(true);
	const [showTimeBadge, setShowTimeBadge] = signal(true);
	const [showErpPrice, setShowErpPrice] = signal(true);
	const handleGenerate = () => {
		setIsGenerating(true);
		showToast("Gerando Imagem com IA", "Renderizando composição cinematográfica via Imagen 3.0 Pro...", "info");
		setTimeout(() => {
			setIsGenerating(false);
			showToast("Arte Criada com Sucesso!", "Sua imagem com iluminação de estúdio está pronta para uso e disparo.", "success");
		}, 1800);
	};
	const handleApplyPresetPrompt = (text, title, badge) => {
		setPromptText(text);
		setCurrentTitle(title.toUpperCase());
		setCurrentBadge(badge);
		showToast("Prompt Aplicado", "Configurações de cena e selo atualizadas.");
	};
	const handleSelectVariation = (varItem) => {
		setCurrentCanvasImage(varItem.image);
		setCurrentTitle(varItem.title.toUpperCase());
		setCurrentBadge(varItem.badgeText);
		showToast("Variação Ativa", `Canvas atualizado para ${varItem.title} (${varItem.formatTag}).`);
	};
	return /* @__PURE__ */ _jsxs("div", {
		className: "p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1680px] mx-auto",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "max-w-3xl",
					children: [/* @__PURE__ */ _jsxs("div", {
						className: "flex items-center gap-2 mb-1 flex-wrap",
						children: [/* @__PURE__ */ _jsx("h1", {
							className: "font-headline-lg text-on-surface tracking-tight font-bold",
							children: "Estúdio de Criação de Imagens com IA"
						}), /* @__PURE__ */ _jsx("span", {
							className: "inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-bold",
							children: "Imagen 3.0 Pro & Stable Food v2"
						})]
					}), /* @__PURE__ */ _jsx("p", {
						className: "text-on-surface-variant font-body-md leading-relaxed",
						children: "Gere criativos promocionais gastronômicos com iluminação profissional, formatos automáticos para Stories, Feed e WhatsApp, e selos integrados aos preços oficiais do Totvs ERP e iFood."
					})]
				}), /* @__PURE__ */ _jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ _jsxs("button", {
						type: "button",
						onClick: () => router.push(SCREEN_ROUTES["catalogo-erp"]),
						className: "flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all",
						children: [/* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "restaurant_menu"
						}), /* @__PURE__ */ _jsx("span", { children: "Ver Catálogo ERP" })]
					}), /* @__PURE__ */ _jsxs("button", {
						type: "button",
						onClick: () => router.push(SCREEN_ROUTES["chat-omnichannel"]),
						className: "flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm font-bold",
						children: [/* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "campaign"
						}), /* @__PURE__ */ _jsx("span", { children: "Disparar no WhatsApp" })]
					})]
				})]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "grid grid-cols-1 xl:grid-cols-12 gap-6 items-start",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "xl:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-primary text-[22px]",
									children: "auto_awesome"
								}), /* @__PURE__ */ _jsx("h2", {
									className: "font-headline-md text-on-surface font-bold",
									children: "Prompt Criativo"
								})]
							}), /* @__PURE__ */ _jsxs("button", {
								type: "button",
								onClick: () => {
									setPromptText((prev) => prev + " Iluminação volumétrica quente, gotas de condensação fresca, foco macro nítido e apetitoso.");
									showToast("Prompt Enriquecido com IA", "Adicionados modificadores visuais gastronômicos.");
								},
								className: "px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md font-semibold flex items-center gap-1 transition-colors",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[16px]",
									children: "magic_button"
								}), "Aprimorar com IA"]
							})]
						}),
						/* @__PURE__ */ _jsx("textarea", {
							value: () => promptText(),
							onInput: (event) => setPromptText(event.currentTarget.value),
							rows: 4,
							className: "w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/25 font-body-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed",
							placeholder: "Descreva o prato, iluminação, ambiente e estilo da foto..."
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
								children: "Sugestões Prontas de Alta Conversão:"
							}), /* @__PURE__ */ _jsx("div", {
								className: "flex flex-wrap gap-1.5",
								children: PROMPT_SUGGESTIONS.map((item) => /* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => handleApplyPresetPrompt(item.text, item.label.split(" ")[0] + " FESTIVAL", "30% OFF"),
									className: "px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md border border-outline-variant/20 transition-colors",
									children: item.label
								}, item.label))
							})]
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "flex flex-col gap-2 pt-2 border-t border-outline-variant/15",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
								children: "Formato & Canal Alvo:"
							}), /* @__PURE__ */ _jsx("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
								children: FORMAT_OPTIONS.map((fmt) => {
									const isSelected = selectedFormat() === fmt.id;
									return /* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => {
											setSelectedFormat(fmt.id);
											showToast("Formato Alterado", `Canvas ajustado para ${fmt.label}.`);
										},
										className: () => isSelected ? "p-2 rounded-xl text-center transition-all border bg-primary text-on-primary border-primary shadow-sm font-bold" : "p-2 rounded-xl text-center transition-all border bg-surface-container-low border-outline-variant/20 text-on-surface hover:bg-surface-container",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "font-title-md block",
											children: fmt.label
										}), /* @__PURE__ */ _jsx("span", {
											className: () => `text-[10px] block ${isSelected ? "text-white/80" : "text-on-surface-variant"}`,
											children: fmt.sub
										})]
									}, fmt.id);
								})
							})]
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
								children: "Estilo Visual & Iluminação:"
							}), /* @__PURE__ */ _jsx("div", {
								className: "grid grid-cols-2 gap-2",
								children: STYLE_OPTIONS.map((style) => {
									const isSelected = selectedStyle() === style;
									return /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => {
											setSelectedStyle(style);
											showToast("Estilo Selecionado", style);
										},
										className: () => isSelected ? "px-3 py-2 rounded-xl text-left font-body-sm transition-all border bg-surface-container-high border-primary text-primary font-bold" : "px-3 py-2 rounded-xl text-left font-body-sm transition-all border bg-surface-container-low border-outline-variant/20 text-on-surface hover:bg-surface-container",
										children: style
									}, style);
								})
							})]
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "flex flex-col gap-2 pt-2 border-t border-outline-variant/15",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
								children: "Selos & Overlays no Banner:"
							}), /* @__PURE__ */ _jsxs("div", {
								className: "grid grid-cols-2 gap-2 font-body-sm",
								children: [
									/* @__PURE__ */ _jsxs("label", {
										className: "flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15",
										children: [/* @__PURE__ */ _jsx("input", {
											type: "checkbox",
											checked: () => showDiscountTag(),
											onChange: (event) => setShowDiscountTag(event.currentTarget.checked),
											className: "rounded text-primary"
										}), /* @__PURE__ */ _jsxs("span", { children: [
											"Selo Desconto (",
											() => currentBadge(),
											")"
										] })]
									}),
									/* @__PURE__ */ _jsxs("label", {
										className: "flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15",
										children: [/* @__PURE__ */ _jsx("input", {
											type: "checkbox",
											checked: () => showStoreLogo(),
											onChange: (event) => setShowStoreLogo(event.currentTarget.checked),
											className: "rounded text-primary"
										}), /* @__PURE__ */ _jsx("span", { children: "Logotipo da Loja" })]
									}),
									/* @__PURE__ */ _jsxs("label", {
										className: "flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15",
										children: [/* @__PURE__ */ _jsx("input", {
											type: "checkbox",
											checked: () => showTimeBadge(),
											onChange: (event) => setShowTimeBadge(event.currentTarget.checked),
											className: "rounded text-primary"
										}), /* @__PURE__ */ _jsx("span", { children: "Badge Tempo Limitado" })]
									}),
									/* @__PURE__ */ _jsxs("label", {
										className: "flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15",
										children: [/* @__PURE__ */ _jsx("input", {
											type: "checkbox",
											checked: () => showErpPrice(),
											onChange: (event) => setShowErpPrice(event.currentTarget.checked),
											className: "rounded text-primary"
										}), /* @__PURE__ */ _jsx("span", { children: "Preço Oficial ERP" })]
									})
								]
							})]
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "pt-2",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between text-[11px] text-on-surface-variant mb-2",
								children: [/* @__PURE__ */ _jsxs("span", { children: [
									"Créditos de IA: ",
									/* @__PURE__ */ _jsx("strong", { children: "142 / 200 restantes" }),
									" este mês"
								] }), /* @__PURE__ */ _jsx("span", {
									className: "text-tertiary font-semibold",
									children: "Consumo: 1 crédito"
								})]
							}), /* @__PURE__ */ _jsx("button", {
								type: "button",
								disabled: () => isGenerating(),
								onClick: handleGenerate,
								className: "w-full py-3 px-4 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-headline-sm font-bold shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50",
								children: () => isGenerating() ? /* @__PURE__ */ _jsxs(_Fragment, { children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[24px] animate-spin",
									children: "progress_activity"
								}), /* @__PURE__ */ _jsx("span", { children: "Renderizando Imagem com IA..." })] }) : /* @__PURE__ */ _jsxs(_Fragment, { children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[24px]",
									children: "auto_awesome"
								}), /* @__PURE__ */ _jsx("span", { children: "Gerar Imagem com IA (1 Crédito)" })] })
							})]
						})
					]
				}), /* @__PURE__ */ _jsxs("div", {
					className: "xl:col-span-7 flex flex-col gap-4",
					children: [/* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between flex-wrap gap-2",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "font-headline-md text-on-surface font-bold",
										children: "Visualização do Canvas"
									}), /* @__PURE__ */ _jsxs("span", {
										className: "px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-bold",
										children: [
											"Formato ",
											() => selectedFormat(),
											" • 2048 x 2048px"
										]
									})]
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => showToast("Download 4K Iniciado", "Arquivo PNG de alta resolução gerado para download.", "success"),
										className: "px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md flex items-center gap-1.5 transition-colors border border-outline-variant/20",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "download"
										}), /* @__PURE__ */ _jsx("span", { children: "Baixar 4K" })]
									}), /* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => {
											showToast("Disparo Programado", "Arte direcionada para fila de envio de 1.420 contatos no WhatsApp.", "success");
											router.push(SCREEN_ROUTES["chat-omnichannel"]);
										},
										className: "px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md flex items-center gap-1.5 transition-all shadow-sm font-bold",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "send"
										}), /* @__PURE__ */ _jsx("span", { children: "Disparo WhatsApp" })]
									})]
								})]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "relative w-full aspect-square max-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 bg-slate-900 flex items-center justify-center group",
								children: [
									/* @__PURE__ */ _jsx("img", {
										src: () => currentCanvasImage(),
										alt: "Criativo Gerado por IA",
										className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									}),
									/* @__PURE__ */ _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" }),
									() => showStoreLogo() || showDiscountTag() ? /* @__PURE__ */ _jsxs("div", {
										className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10",
										children: [showStoreLogo() && /* @__PURE__ */ _jsxs("div", {
											className: "glass-badge px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg",
											children: [/* @__PURE__ */ _jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-primary animate-pulse" }), /* @__PURE__ */ _jsx("span", {
												className: "font-headline-md text-white font-bold tracking-wider",
												children: "REDE OMNI"
											})]
										}), showDiscountTag() && /* @__PURE__ */ _jsx("div", {
											className: "bg-red-600 text-white font-headline-md font-extrabold px-4 py-1.5 rounded-xl shadow-xl transform rotate-2 animate-bounce",
											children: () => currentBadge()
										})]
									}) : /* @__PURE__ */ _jsx(_Fragment, { children: " " }),
									/* @__PURE__ */ _jsxs("div", {
										className: "absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-2",
										children: [() => showTimeBadge() ? /* @__PURE__ */ _jsxs("span", {
											className: "inline-flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-label-sm font-extrabold uppercase tracking-wide",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[14px]",
												children: "timer"
											}), "Válido Somente Hoje Até 23h59"]
										}) : /* @__PURE__ */ _jsx(_Fragment, { children: " " }), /* @__PURE__ */ _jsxs("div", {
											className: "flex items-end justify-between",
											children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h3", {
												className: "font-headline-xl text-white font-extrabold tracking-tight drop-shadow-md",
												children: () => currentTitle()
											}), /* @__PURE__ */ _jsx("p", {
												className: "text-white/90 font-body-md drop-shadow",
												children: "Smash duplo no brioche selado com cheddar e fritas crocantes"
											})] }), () => showErpPrice() ? /* @__PURE__ */ _jsxs("div", {
												className: "text-right shrink-0",
												children: [/* @__PURE__ */ _jsx("span", {
													className: "text-white/75 text-xs line-through block",
													children: "De R$ 49,90"
												}), /* @__PURE__ */ _jsx("span", {
													className: "font-headline-xl text-amber-400 font-extrabold",
													children: "R$ 34,90"
												})]
											}) : /* @__PURE__ */ _jsx(_Fragment, { children: " " })]
										})]
									})
								]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between flex-wrap gap-2 pt-1 font-title-md",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => showToast("Recortar Fundo", "Remoção de fundo com IA concluída. PNG com canal alfa disponível.", "info"),
										className: "px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-1.5 transition-colors border border-outline-variant/20",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "auto_fix_high"
										}), /* @__PURE__ */ _jsx("span", { children: "Recortar Fundo (PNG)" })]
									}), /* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => showToast("Vínculo Criado", "Imagem associada ao produto Combo Smash Burger no iFood e Totvs!", "success"),
										className: "px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-1.5 transition-colors border border-outline-variant/20",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "link"
										}), /* @__PURE__ */ _jsx("span", { children: "Vincular ao Totvs & iFood" })]
									})]
								}), /* @__PURE__ */ _jsxs("button", {
									type: "button",
									onClick: handleGenerate,
									className: "px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold flex items-center gap-1.5 transition-colors",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[18px]",
										children: "refresh"
									}), /* @__PURE__ */ _jsx("span", { children: "Gerar Outra Variação" })]
								})]
							})
						]
					}), /* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "font-title-md text-on-surface font-bold",
								children: "Variações Alternativas Geradas"
							}), /* @__PURE__ */ _jsx("span", {
								className: "font-label-sm text-on-surface-variant",
								children: "Clique para visualizar no Canvas"
							})]
						}), /* @__PURE__ */ _jsx("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
							children: STUDIO_VARIATIONS.map((varItem) => /* @__PURE__ */ _jsxs("div", {
								onClick: () => handleSelectVariation(varItem),
								className: "group relative rounded-xl overflow-hidden border border-outline-variant/30 cursor-pointer hover:shadow-md transition-all aspect-video sm:aspect-square",
								children: [/* @__PURE__ */ _jsx("img", {
									src: varItem.image,
									alt: varItem.title,
									className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								}), /* @__PURE__ */ _jsxs("div", {
									className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-2.5 flex flex-col justify-between",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "px-2 py-0.5 rounded bg-black/60 text-white font-code-sm text-[10px] w-fit",
										children: varItem.formatTag
									}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
										className: "font-title-md text-white font-bold block leading-tight",
										children: varItem.title
									}), /* @__PURE__ */ _jsx("span", {
										className: "text-[11px] text-white/80",
										children: varItem.subtitle
									})] })]
								})]
							}, varItem.id))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h3", {
						className: "font-headline-md text-on-surface font-bold",
						children: "Banners Ativos em Campanhas & Performance"
					}), /* @__PURE__ */ _jsx("p", {
						className: "font-body-sm text-on-surface-variant",
						children: "Acompanhe cliques, disparos no WhatsApp e conversão em tempo real vinculados aos pedidos do Totvs e iFood."
					})] }), /* @__PURE__ */ _jsx("div", {
						className: "flex items-center gap-1.5 overflow-x-auto scrollbar-none",
						children: BANNER_TABS.map((tab) => {
							const isSelected = activeTabBanner() === tab.id;
							return /* @__PURE__ */ _jsx("button", {
								type: "button",
								onClick: () => setActiveTabBanner(tab.id),
								className: () => isSelected ? "px-3 py-1 rounded-lg font-label-md transition-colors bg-primary text-on-primary font-bold" : "px-3 py-1 rounded-lg font-label-md transition-colors bg-surface-container-low text-on-surface hover:bg-surface-container",
								children: tab.label
							}, tab.id);
						})
					})]
				}), /* @__PURE__ */ _jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
					children: () => INITIAL_BANNERS.filter((banner) => {
						if (activeTabBanner() === "all") return true;
						return banner.channel === activeTabBanner();
					}).map((banner) => /* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "relative aspect-video w-full overflow-hidden",
							children: [
								/* @__PURE__ */ _jsx("img", {
									src: banner.image,
									alt: banner.title,
									className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								}),
								/* @__PURE__ */ _jsx("span", {
									className: "absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-code-sm text-[10px]",
									children: banner.code
								}),
								/* @__PURE__ */ _jsx("span", {
									className: "absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-600 text-white font-label-sm text-[10px] font-bold",
									children: banner.statusBadge
								})
							]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "p-3.5 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h4", {
									className: "font-title-lg text-on-surface font-bold leading-snug",
									children: banner.title
								}), /* @__PURE__ */ _jsx("span", {
									className: "font-body-sm text-[12px] text-on-surface-variant block",
									children: banner.campaignType
								})] }),
								/* @__PURE__ */ _jsxs("div", {
									className: "grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20 font-body-sm",
									children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
										className: "text-[11px] text-on-surface-variant block",
										children: banner.metric1Label
									}), /* @__PURE__ */ _jsx("strong", {
										className: "text-on-surface font-bold",
										children: banner.metric1Value
									})] }), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
										className: "text-[11px] text-on-surface-variant block",
										children: banner.metric2Label
									}), /* @__PURE__ */ _jsx("strong", {
										className: "text-primary font-bold",
										children: banner.metric2Value
									})] })]
								}),
								/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => {
										showToast("Campanha Selecionada", `Reenviando arte de ${banner.title} no WhatsApp!`, "info");
										router.push(SCREEN_ROUTES["chat-omnichannel"]);
									},
									className: "w-full mt-1 py-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary font-title-md font-semibold transition-all text-center",
									children: "Usar nesta Conversa"
								})
							]
						})]
					}, banner.id))
				})]
			})
		]
	});
}

//# sourceMappingURL=studio-screen.__client_ssr.js.map
