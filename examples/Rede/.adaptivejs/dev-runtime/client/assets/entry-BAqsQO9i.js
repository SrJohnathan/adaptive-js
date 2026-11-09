import { _ as jsx, b as __exportAll, c as signal, g as Fragment, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";
import { i as MAIN_BURGER_STUDIO_IMG, o as STUDIO_VARIATIONS, t as INITIAL_BANNERS } from "./chunk-i84mfdyU.js";
import { t as SCREEN_ROUTES } from "./chunk-BAJW75ro.js";

//#region src/components/omni-hub/studio-screen.tsx
var studio_screen_exports = /* @__PURE__ */ __exportAll({ StudioScreen: () => StudioScreen });
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
function StudioScreen() {
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
	return /* @__PURE__ */ jsxs("div", {
		className: "p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1680px] mx-auto",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "max-w-3xl",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 mb-1 flex-wrap",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "font-headline-lg text-on-surface tracking-tight font-bold",
							children: "Estúdio de Criação de Imagens com IA"
						}), /* @__PURE__ */ jsx("span", {
							className: "inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-bold",
							children: "Imagen 3.0 Pro & Stable Food v2"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-on-surface-variant font-body-md leading-relaxed",
						children: "Gere criativos promocionais gastronômicos com iluminação profissional, formatos automáticos para Stories, Feed e WhatsApp, e selos integrados aos preços oficiais do Totvs ERP e iFood."
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => router.push(SCREEN_ROUTES["catalogo-erp"]),
						className: "flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all",
						children: [/* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "restaurant_menu"
						}), /* @__PURE__ */ jsx("span", { children: "Ver Catálogo ERP" })]
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => router.push(SCREEN_ROUTES["chat-omnichannel"]),
						className: "flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm font-bold",
						children: [/* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "campaign"
						}), /* @__PURE__ */ jsx("span", { children: "Disparar no WhatsApp" })]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 xl:grid-cols-12 gap-6 items-start",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "xl:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-primary text-[22px]",
									children: "auto_awesome"
								}), /* @__PURE__ */ jsx("h2", {
									className: "font-headline-md text-on-surface font-bold",
									children: "Prompt Criativo"
								})]
							}), /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => {
									setPromptText((prev) => prev + " Iluminação volumétrica quente, gotas de condensação fresca, foco macro nítido e apetitoso.");
									showToast("Prompt Enriquecido com IA", "Adicionados modificadores visuais gastronômicos.");
								},
								className: "px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md font-semibold flex items-center gap-1 transition-colors",
								children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[16px]",
									children: "magic_button"
								}), "Aprimorar com IA"]
							})]
						}),
						/* @__PURE__ */ jsx("textarea", {
							value: () => promptText(),
							onInput: (event) => setPromptText(event.currentTarget.value),
							rows: 4,
							className: "w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/25 font-body-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed",
							placeholder: "Descreva o prato, iluminação, ambiente e estilo da foto..."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
								children: "Sugestões Prontas de Alta Conversão:"
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-1.5",
								children: PROMPT_SUGGESTIONS.map((item) => /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => handleApplyPresetPrompt(item.text, item.label.split(" ")[0] + " FESTIVAL", "30% OFF"),
									className: "px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md border border-outline-variant/20 transition-colors",
									children: item.label
								}, item.label))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2 pt-2 border-t border-outline-variant/15",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
								children: "Formato & Canal Alvo:"
							}), /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
								children: FORMAT_OPTIONS.map((fmt) => {
									const isSelected = selectedFormat() === fmt.id;
									return /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => {
											setSelectedFormat(fmt.id);
											showToast("Formato Alterado", `Canvas ajustado para ${fmt.label}.`);
										},
										className: () => isSelected ? "p-2 rounded-xl text-center transition-all border bg-primary text-on-primary border-primary shadow-sm font-bold" : "p-2 rounded-xl text-center transition-all border bg-surface-container-low border-outline-variant/20 text-on-surface hover:bg-surface-container",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-title-md block",
											children: fmt.label
										}), /* @__PURE__ */ jsx("span", {
											className: () => `text-[10px] block ${isSelected ? "text-white/80" : "text-on-surface-variant"}`,
											children: fmt.sub
										})]
									}, fmt.id);
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
								children: "Estilo Visual & Iluminação:"
							}), /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-2 gap-2",
								children: STYLE_OPTIONS.map((style) => {
									const isSelected = selectedStyle() === style;
									return /* @__PURE__ */ jsx("button", {
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
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2 pt-2 border-t border-outline-variant/15",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-bold",
								children: "Selos & Overlays no Banner:"
							}), /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-2 font-body-sm",
								children: [
									/* @__PURE__ */ jsxs("label", {
										className: "flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: () => showDiscountTag(),
											onChange: (event) => setShowDiscountTag(event.currentTarget.checked),
											className: "rounded text-primary"
										}), /* @__PURE__ */ jsxs("span", { children: [
											"Selo Desconto (",
											() => currentBadge(),
											")"
										] })]
									}),
									/* @__PURE__ */ jsxs("label", {
										className: "flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: () => showStoreLogo(),
											onChange: (event) => setShowStoreLogo(event.currentTarget.checked),
											className: "rounded text-primary"
										}), /* @__PURE__ */ jsx("span", { children: "Logotipo da Loja" })]
									}),
									/* @__PURE__ */ jsxs("label", {
										className: "flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: () => showTimeBadge(),
											onChange: (event) => setShowTimeBadge(event.currentTarget.checked),
											className: "rounded text-primary"
										}), /* @__PURE__ */ jsx("span", { children: "Badge Tempo Limitado" })]
									}),
									/* @__PURE__ */ jsxs("label", {
										className: "flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: () => showErpPrice(),
											onChange: (event) => setShowErpPrice(event.currentTarget.checked),
											className: "rounded text-primary"
										}), /* @__PURE__ */ jsx("span", { children: "Preço Oficial ERP" })]
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "pt-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between text-[11px] text-on-surface-variant mb-2",
								children: [/* @__PURE__ */ jsxs("span", { children: [
									"Créditos de IA: ",
									/* @__PURE__ */ jsx("strong", { children: "142 / 200 restantes" }),
									" este mês"
								] }), /* @__PURE__ */ jsx("span", {
									className: "text-tertiary font-semibold",
									children: "Consumo: 1 crédito"
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: () => isGenerating(),
								onClick: handleGenerate,
								className: "w-full py-3 px-4 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-headline-sm font-bold shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50",
								children: () => isGenerating() ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[24px] animate-spin",
									children: "progress_activity"
								}), /* @__PURE__ */ jsx("span", { children: "Renderizando Imagem com IA..." })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[24px]",
									children: "auto_awesome"
								}), /* @__PURE__ */ jsx("span", { children: "Gerar Imagem com IA (1 Crédito)" })] })
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "xl:col-span-7 flex flex-col gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between flex-wrap gap-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-headline-md text-on-surface font-bold",
										children: "Visualização do Canvas"
									}), /* @__PURE__ */ jsxs("span", {
										className: "px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-bold",
										children: [
											"Formato ",
											() => selectedFormat(),
											" • 2048 x 2048px"
										]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => showToast("Download 4K Iniciado", "Arquivo PNG de alta resolução gerado para download.", "success"),
										className: "px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md flex items-center gap-1.5 transition-colors border border-outline-variant/20",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "download"
										}), /* @__PURE__ */ jsx("span", { children: "Baixar 4K" })]
									}), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => {
											showToast("Disparo Programado", "Arte direcionada para fila de envio de 1.420 contatos no WhatsApp.", "success");
											router.push(SCREEN_ROUTES["chat-omnichannel"]);
										},
										className: "px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md flex items-center gap-1.5 transition-all shadow-sm font-bold",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "send"
										}), /* @__PURE__ */ jsx("span", { children: "Disparo WhatsApp" })]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative w-full aspect-square max-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 bg-slate-900 flex items-center justify-center group",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: () => currentCanvasImage(),
										alt: "Criativo Gerado por IA",
										className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									}),
									/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" }),
									() => showStoreLogo() || showDiscountTag() ? /* @__PURE__ */ jsxs("div", {
										className: "absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10",
										children: [showStoreLogo() && /* @__PURE__ */ jsxs("div", {
											className: "glass-badge px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg",
											children: [/* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-primary animate-pulse" }), /* @__PURE__ */ jsx("span", {
												className: "font-headline-md text-white font-bold tracking-wider",
												children: "REDE OMNI"
											})]
										}), showDiscountTag() && /* @__PURE__ */ jsx("div", {
											className: "bg-red-600 text-white font-headline-md font-extrabold px-4 py-1.5 rounded-xl shadow-xl transform rotate-2 animate-bounce",
											children: () => currentBadge()
										})]
									}) : /* @__PURE__ */ jsx(Fragment, { children: " " }),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-2",
										children: [() => showTimeBadge() ? /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-label-sm font-extrabold uppercase tracking-wide",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[14px]",
												children: "timer"
											}), "Válido Somente Hoje Até 23h59"]
										}) : /* @__PURE__ */ jsx(Fragment, { children: " " }), /* @__PURE__ */ jsxs("div", {
											className: "flex items-end justify-between",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
												className: "font-headline-xl text-white font-extrabold tracking-tight drop-shadow-md",
												children: () => currentTitle()
											}), /* @__PURE__ */ jsx("p", {
												className: "text-white/90 font-body-md drop-shadow",
												children: "Smash duplo no brioche selado com cheddar e fritas crocantes"
											})] }), () => showErpPrice() ? /* @__PURE__ */ jsxs("div", {
												className: "text-right shrink-0",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-white/75 text-xs line-through block",
													children: "De R$ 49,90"
												}), /* @__PURE__ */ jsx("span", {
													className: "font-headline-xl text-amber-400 font-extrabold",
													children: "R$ 34,90"
												})]
											}) : /* @__PURE__ */ jsx(Fragment, { children: " " })]
										})]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between flex-wrap gap-2 pt-1 font-title-md",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => showToast("Recortar Fundo", "Remoção de fundo com IA concluída. PNG com canal alfa disponível.", "info"),
										className: "px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-1.5 transition-colors border border-outline-variant/20",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "auto_fix_high"
										}), /* @__PURE__ */ jsx("span", { children: "Recortar Fundo (PNG)" })]
									}), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => showToast("Vínculo Criado", "Imagem associada ao produto Combo Smash Burger no iFood e Totvs!", "success"),
										className: "px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-1.5 transition-colors border border-outline-variant/20",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "link"
										}), /* @__PURE__ */ jsx("span", { children: "Vincular ao Totvs & iFood" })]
									})]
								}), /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: handleGenerate,
									className: "px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold flex items-center gap-1.5 transition-colors",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[18px]",
										children: "refresh"
									}), /* @__PURE__ */ jsx("span", { children: "Gerar Outra Variação" })]
								})]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-title-md text-on-surface font-bold",
								children: "Variações Alternativas Geradas"
							}), /* @__PURE__ */ jsx("span", {
								className: "font-label-sm text-on-surface-variant",
								children: "Clique para visualizar no Canvas"
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
							children: STUDIO_VARIATIONS.map((varItem) => /* @__PURE__ */ jsxs("div", {
								onClick: () => handleSelectVariation(varItem),
								className: "group relative rounded-xl overflow-hidden border border-outline-variant/30 cursor-pointer hover:shadow-md transition-all aspect-video sm:aspect-square",
								children: [/* @__PURE__ */ jsx("img", {
									src: varItem.image,
									alt: varItem.title,
									className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								}), /* @__PURE__ */ jsxs("div", {
									className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-2.5 flex flex-col justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "px-2 py-0.5 rounded bg-black/60 text-white font-code-sm text-[10px] w-fit",
										children: varItem.formatTag
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "font-title-md text-white font-bold block leading-tight",
										children: varItem.title
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[11px] text-white/80",
										children: varItem.subtitle
									})] })]
								})]
							}, varItem.id))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "font-headline-md text-on-surface font-bold",
						children: "Banners Ativos em Campanhas & Performance"
					}), /* @__PURE__ */ jsx("p", {
						className: "font-body-sm text-on-surface-variant",
						children: "Acompanhe cliques, disparos no WhatsApp e conversão em tempo real vinculados aos pedidos do Totvs e iFood."
					})] }), /* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-1.5 overflow-x-auto scrollbar-none",
						children: BANNER_TABS.map((tab) => {
							const isSelected = activeTabBanner() === tab.id;
							return /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setActiveTabBanner(tab.id),
								className: () => isSelected ? "px-3 py-1 rounded-lg font-label-md transition-colors bg-primary text-on-primary font-bold" : "px-3 py-1 rounded-lg font-label-md transition-colors bg-surface-container-low text-on-surface hover:bg-surface-container",
								children: tab.label
							}, tab.id);
						})
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
					children: () => INITIAL_BANNERS.filter((banner) => {
						if (activeTabBanner() === "all") return true;
						return banner.channel === activeTabBanner();
					}).map((banner) => /* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative aspect-video w-full overflow-hidden",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: banner.image,
									alt: banner.title,
									className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-code-sm text-[10px]",
									children: banner.code
								}),
								/* @__PURE__ */ jsx("span", {
									className: "absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-600 text-white font-label-sm text-[10px] font-bold",
									children: banner.statusBadge
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-3.5 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
									className: "font-title-lg text-on-surface font-bold leading-snug",
									children: banner.title
								}), /* @__PURE__ */ jsx("span", {
									className: "font-body-sm text-[12px] text-on-surface-variant block",
									children: banner.campaignType
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20 font-body-sm",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "text-[11px] text-on-surface-variant block",
										children: banner.metric1Label
									}), /* @__PURE__ */ jsx("strong", {
										className: "text-on-surface font-bold",
										children: banner.metric1Value
									})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "text-[11px] text-on-surface-variant block",
										children: banner.metric2Label
									}), /* @__PURE__ */ jsx("strong", {
										className: "text-primary font-bold",
										children: banner.metric2Value
									})] })]
								}),
								/* @__PURE__ */ jsx("button", {
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
typeof StudioScreen === "function" && markClientExport(StudioScreen, "components/omni-hub/studio-screen", "StudioScreen", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__studio-screen.tsx
hydrateClientComponents("components/omni-hub/studio-screen", studio_screen_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktQkFxc1FPOWkuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9zdHVkaW8tc2NyZWVuLnRzeCIsIi4uLy4uL3RlbXAvY2xpZW50LWNvbXBvbmVudHMvY29tcG9uZW50c19fb21uaS1odWJfX3N0dWRpby1zY3JlZW4udHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwiaHlkcmF0ZVwiO1xuXG5pbXBvcnQgeyBzaWduYWwsIHVzZVJvdXRlciB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5pbXBvcnQgeyBJTklUSUFMX0JBTk5FUlMsIFNUVURJT19WQVJJQVRJT05TLCBNQUlOX0JVUkdFUl9TVFVESU9fSU1HIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi9tb2NrLWRhdGFcIjtcbmltcG9ydCB7IHNob3dUb2FzdCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvb21uaS1odWIvdG9hc3Qtc3RvcmVcIjtcbmltcG9ydCB7IFNDUkVFTl9ST1VURVMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3R5cGVzXCI7XG5cbmNvbnN0IEZPUk1BVF9PUFRJT05TOiB7IGlkOiBcIjk6MTZcIiB8IFwiMToxXCIgfCBcIjE2OjlcIiB8IFwiMTY6MTBcIjsgbGFiZWw6IHN0cmluZzsgc3ViOiBzdHJpbmcgfVtdID0gW1xuICB7IGlkOiBcIjk6MTZcIiwgbGFiZWw6IFwiOToxNiBTdG9yaWVzXCIsIHN1YjogXCJJbnN0YWdyYW0gLyBXaGF0c1wiIH0sXG4gIHsgaWQ6IFwiMToxXCIsIGxhYmVsOiBcIjE6MSBGZWVkXCIsIHN1YjogXCJGZWVkIEluc3RhZ3JhbVwiIH0sXG4gIHsgaWQ6IFwiMTY6OVwiLCBsYWJlbDogXCIxNjo5IEJhbm5lclwiLCBzdWI6IFwiQ2FtcGFuaGFzIFdlYlwiIH0sXG4gIHsgaWQ6IFwiMTY6MTBcIiwgbGFiZWw6IFwiMTY6MTAgVml0cmluZVwiLCBzdWI6IFwiaUZvb2QgJiBUb3R2c1wiIH0sXG5dO1xuXG5jb25zdCBTVFlMRV9PUFRJT05TID0gW1xuICBcIkZvdG9ncmFmaWEgQ29tZXJjaWFsIDRLXCIsXG4gIFwiSWx1bWluYcOnw6NvIFF1ZW50ZSBkZSBSZXN0YXVyYW50ZVwiLFxuICBcIkVzdGlsbyBEYXJrICYgTmVvblwiLFxuICBcIkZ1bmRvIE5ldXRybyBNaW5pbWFsaXN0YVwiLFxuXTtcblxuY29uc3QgUFJPTVBUX1NVR0dFU1RJT05TID0gW1xuICB7XG4gICAgbGFiZWw6IFwiQnVyZ2VyIFF1YXJ0YSAzMCUgT0ZGXCIsXG4gICAgdGV4dDogXCJTbWFzaCBidXJnZXIgYXJ0ZXNhbmFsIGR1cGxvIGNvbSBjaGVkZGFyIGRlcnJldGlkbyBlIGJhdGF0YXMgcsO6c3RpY2FzIGRvdXJhZGFzLCBpbHVtaW5hw6fDo28gcXVlbnRlIGRlIHJlc3RhdXJhbnRlIGdvdXJtZXQuXCIsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJDb21ibyBTdXNoaSBGYW3DrWxpYVwiLFxuICAgIHRleHQ6IFwiQmFyY2EgZGUgc3VzaGkgY29udGVtcG9yw6JuZW8gY29tIHNhbG3Do28gbWHDp2FyaWNhZG8sIHJhc3BhcyBkZSBsaW3Do28gc2ljaWxpYW5vIGUgdGFyw6ogYXJ0ZXNhbmFsLCBmdW5kbyBlc2N1cm8gZWxlZ2FudGUuXCIsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJCbGFjayBGcmlkYXkgRnJldGUgR3LDoXRpc1wiLFxuICAgIHRleHQ6IFwiUGl6emEgYXJ0ZXNhbmFsIHNhaW5kbyBkbyBmb3JubyBhIGxlbmhhIGNvbSBxdWVpam8gcHV4YW5kbywgYmFubmVyIHByb21vY2lvbmFsIGRlIEJsYWNrIEZyaWRheSBkZSBhbHRhIGVuZXJnaWEuXCIsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogXCJBbG1vw6dvIEV4ZWN1dGl2byArIEJlYmlkYVwiLFxuICAgIHRleHQ6IFwiUHJhdG8gZXhlY3V0aXZvIHN1Y3VsZW50byBjb20gcGljYW5oYSBncmVsaGFkYSwgYXJyb3ogc29sdGluaG8sIGZlaWrDo28gdHJvcGVpcm8gZSBzYWxhZGEgZnJlc2NhIGNvbSBzdWNvIGRlIGxhcmFuamEuXCIsXG4gIH0sXG5dO1xuXG5jb25zdCBCQU5ORVJfVEFCUzogeyBpZDogXCJhbGxcIiB8IFwid2hhdHNhcHBcIiB8IFwiaW5zdGFncmFtXCIgfCBcImlmb29kXCIgfCBcIndlYlwiOyBsYWJlbDogc3RyaW5nIH1bXSA9IFtcbiAgeyBpZDogXCJhbGxcIiwgbGFiZWw6IFwiVG9kb3NcIiB9LFxuICB7IGlkOiBcIndoYXRzYXBwXCIsIGxhYmVsOiBcIldoYXRzQXBwXCIgfSxcbiAgeyBpZDogXCJpbnN0YWdyYW1cIiwgbGFiZWw6IFwiSW5zdGFncmFtXCIgfSxcbiAgeyBpZDogXCJpZm9vZFwiLCBsYWJlbDogXCJpRm9vZFwiIH0sXG4gIHsgaWQ6IFwid2ViXCIsIGxhYmVsOiBcIldlYlwiIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gU3R1ZGlvU2NyZWVuKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgW3Byb21wdFRleHQsIHNldFByb21wdFRleHRdID0gc2lnbmFsKFxuICAgIFwiU21hc2ggYnVyZ2VyIGR1cGxvIHN1Y3VsZW50byBjb20gcXVlaWpvIGNoZWRkYXIgaW5nbMOqcyBkZXJyZXRpZG8gZXNjb3JyZW5kbywgZmF0aWFzIGRlIGJhY29uIGNyb2NhbnRlIGFydGVzYW5hbCwgaWx1bWluYcOnw6NvIGNpbmVtYXRvZ3LDoWZpY2EgZGUgZXN0w7pkaW8sIHZhcG9yIHNhaW5kbyBkbyBww6NvIGJyaW9jaGUgc2VsYWRvLCBlc3RpbG8gZ291cm1ldCBmb29kIHBob3RvZ3JhcGh5IDhrLlwiLFxuICApO1xuICBjb25zdCBbc2VsZWN0ZWRGb3JtYXQsIHNldFNlbGVjdGVkRm9ybWF0XSA9IHNpZ25hbDxcIjk6MTZcIiB8IFwiMToxXCIgfCBcIjE2OjlcIiB8IFwiMTY6MTBcIj4oXCIxOjFcIik7XG4gIGNvbnN0IFtzZWxlY3RlZFN0eWxlLCBzZXRTZWxlY3RlZFN0eWxlXSA9IHNpZ25hbChcIkZvdG9ncmFmaWEgQ29tZXJjaWFsIDRLXCIpO1xuICBjb25zdCBbaXNHZW5lcmF0aW5nLCBzZXRJc0dlbmVyYXRpbmddID0gc2lnbmFsKGZhbHNlKTtcbiAgY29uc3QgW2N1cnJlbnRDYW52YXNJbWFnZSwgc2V0Q3VycmVudENhbnZhc0ltYWdlXSA9IHNpZ25hbChNQUlOX0JVUkdFUl9TVFVESU9fSU1HKTtcbiAgY29uc3QgW2N1cnJlbnRUaXRsZSwgc2V0Q3VycmVudFRpdGxlXSA9IHNpZ25hbChcIlFVQVJUQSBETyBTTUFTSFwiKTtcbiAgY29uc3QgW2N1cnJlbnRCYWRnZSwgc2V0Q3VycmVudEJhZGdlXSA9IHNpZ25hbChcIjMwJSBPRkZcIik7XG4gIGNvbnN0IFthY3RpdmVUYWJCYW5uZXIsIHNldEFjdGl2ZVRhYkJhbm5lcl0gPSBzaWduYWw8XCJhbGxcIiB8IFwid2hhdHNhcHBcIiB8IFwiaW5zdGFncmFtXCIgfCBcImlmb29kXCIgfCBcIndlYlwiPihcImFsbFwiKTtcbiAgY29uc3QgW3Nob3dEaXNjb3VudFRhZywgc2V0U2hvd0Rpc2NvdW50VGFnXSA9IHNpZ25hbCh0cnVlKTtcbiAgY29uc3QgW3Nob3dTdG9yZUxvZ28sIHNldFNob3dTdG9yZUxvZ29dID0gc2lnbmFsKHRydWUpO1xuICBjb25zdCBbc2hvd1RpbWVCYWRnZSwgc2V0U2hvd1RpbWVCYWRnZV0gPSBzaWduYWwodHJ1ZSk7XG4gIGNvbnN0IFtzaG93RXJwUHJpY2UsIHNldFNob3dFcnBQcmljZV0gPSBzaWduYWwodHJ1ZSk7XG5cbiAgY29uc3QgaGFuZGxlR2VuZXJhdGUgPSAoKSA9PiB7XG4gICAgc2V0SXNHZW5lcmF0aW5nKHRydWUpO1xuICAgIHNob3dUb2FzdChcIkdlcmFuZG8gSW1hZ2VtIGNvbSBJQVwiLCBcIlJlbmRlcml6YW5kbyBjb21wb3Npw6fDo28gY2luZW1hdG9ncsOhZmljYSB2aWEgSW1hZ2VuIDMuMCBQcm8uLi5cIiwgXCJpbmZvXCIpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0SXNHZW5lcmF0aW5nKGZhbHNlKTtcbiAgICAgIHNob3dUb2FzdChcIkFydGUgQ3JpYWRhIGNvbSBTdWNlc3NvIVwiLCBcIlN1YSBpbWFnZW0gY29tIGlsdW1pbmHDp8OjbyBkZSBlc3TDumRpbyBlc3TDoSBwcm9udGEgcGFyYSB1c28gZSBkaXNwYXJvLlwiLCBcInN1Y2Nlc3NcIik7XG4gICAgfSwgMTgwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXBwbHlQcmVzZXRQcm9tcHQgPSAodGV4dDogc3RyaW5nLCB0aXRsZTogc3RyaW5nLCBiYWRnZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0UHJvbXB0VGV4dCh0ZXh0KTtcbiAgICBzZXRDdXJyZW50VGl0bGUodGl0bGUudG9VcHBlckNhc2UoKSk7XG4gICAgc2V0Q3VycmVudEJhZGdlKGJhZGdlKTtcbiAgICBzaG93VG9hc3QoXCJQcm9tcHQgQXBsaWNhZG9cIiwgXCJDb25maWd1cmHDp8O1ZXMgZGUgY2VuYSBlIHNlbG8gYXR1YWxpemFkYXMuXCIpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdFZhcmlhdGlvbiA9ICh2YXJJdGVtOiAodHlwZW9mIFNUVURJT19WQVJJQVRJT05TKVtudW1iZXJdKSA9PiB7XG4gICAgc2V0Q3VycmVudENhbnZhc0ltYWdlKHZhckl0ZW0uaW1hZ2UpO1xuICAgIHNldEN1cnJlbnRUaXRsZSh2YXJJdGVtLnRpdGxlLnRvVXBwZXJDYXNlKCkpO1xuICAgIHNldEN1cnJlbnRCYWRnZSh2YXJJdGVtLmJhZGdlVGV4dCk7XG4gICAgc2hvd1RvYXN0KFwiVmFyaWHDp8OjbyBBdGl2YVwiLCBgQ2FudmFzIGF0dWFsaXphZG8gcGFyYSAke3Zhckl0ZW0udGl0bGV9ICgke3Zhckl0ZW0uZm9ybWF0VGFnfSkuYCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBzbTpwLTYgbGc6cC04IGZsZXggZmxleC1jb2wgZ2FwLTYgdy1mdWxsIG1heC13LVsxNjgwcHhdIG14LWF1dG9cIj5cbiAgICAgIHsvKiBUb3AgSGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTUgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTN4bFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWItMSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLWxnIHRleHQtb24tc3VyZmFjZSB0cmFja2luZy10aWdodCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgRXN0w7pkaW8gZGUgQ3JpYcOnw6NvIGRlIEltYWdlbnMgY29tIElBXG4gICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1zZWNvbmRhcnktZml4ZWQgdGV4dC1vbi1zZWNvbmRhcnktZml4ZWQgZm9udC1sYWJlbC1zbSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgSW1hZ2VuIDMuMCBQcm8gJiBTdGFibGUgRm9vZCB2MlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtYm9keS1tZCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgIEdlcmUgY3JpYXRpdm9zIHByb21vY2lvbmFpcyBnYXN0cm9uw7RtaWNvcyBjb20gaWx1bWluYcOnw6NvIHByb2Zpc3Npb25hbCwgZm9ybWF0b3MgYXV0b23DoXRpY29zIHBhcmEgU3RvcmllcyxcbiAgICAgICAgICAgIEZlZWQgZSBXaGF0c0FwcCwgZSBzZWxvcyBpbnRlZ3JhZG9zIGFvcyBwcmXDp29zIG9maWNpYWlzIGRvIFRvdHZzIEVSUCBlIGlGb29kLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcm91dGVyLnB1c2goU0NSRUVOX1JPVVRFU1tcImNhdGFsb2dvLWVycFwiXSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoZXN0IHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+cmVzdGF1cmFudF9tZW51PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+VmVyIENhdMOhbG9nbyBFUlA8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChTQ1JFRU5fUk9VVEVTW1wiY2hhdC1vbW5pY2hhbm5lbFwiXSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctcHJpbWFyeS1jb250YWluZXIgaG92ZXI6YmctcHJpbWFyeSB0ZXh0LW9uLXByaW1hcnkgZm9udC10aXRsZS1tZCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctc20gZm9udC1ib2xkXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+Y2FtcGFpZ248L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5EaXNwYXJhciBubyBXaGF0c0FwcDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEdyaWQgUHJpbmNpcGFsOiBGb3JtdWzDoXJpbyBDcmlhdGl2byAmIENhbnZhcyBMaXZlICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHhsOmdyaWQtY29scy0xMiBnYXAtNiBpdGVtcy1zdGFydFwiPlxuICAgICAgICB7LyogUGFpbmVsIEVzcXVlcmRvOiBDb25maWd1cmHDp8OjbyBkbyBQcm9tcHQgJiBFc3RpbG9zICg1IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInhsOmNvbC1zcGFuLTUgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHJvdW5kZWQteGwgcC01IHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGZsZXgtY29sIGdhcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LXByaW1hcnkgdGV4dC1bMjJweF1cIj5hdXRvX2F3ZXNvbWU8L3NwYW4+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLW1kIHRleHQtb24tc3VyZmFjZSBmb250LWJvbGRcIj5Qcm9tcHQgQ3JpYXRpdm88L2gyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0UHJvbXB0VGV4dCgocHJldikgPT4gcHJldiArIFwiIElsdW1pbmHDp8OjbyB2b2x1bcOpdHJpY2EgcXVlbnRlLCBnb3RhcyBkZSBjb25kZW5zYcOnw6NvIGZyZXNjYSwgZm9jbyBtYWNybyBuw610aWRvIGUgYXBldGl0b3NvLlwiKTtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoXCJQcm9tcHQgRW5yaXF1ZWNpZG8gY29tIElBXCIsIFwiQWRpY2lvbmFkb3MgbW9kaWZpY2Fkb3JlcyB2aXN1YWlzIGdhc3Ryb27DtG1pY29zLlwiKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdGV4dC1wcmltYXJ5IGZvbnQtbGFiZWwtbWQgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF1cIj5tYWdpY19idXR0b248L3NwYW4+XG4gICAgICAgICAgICAgIEFwcmltb3JhciBjb20gSUFcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICB2YWx1ZT17KCkgPT4gcHJvbXB0VGV4dCgpfVxuICAgICAgICAgICAgb25JbnB1dD17KGV2ZW50KSA9PiBzZXRQcm9tcHRUZXh0KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgcm93cz17NH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTMgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjUgZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZSBvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS8yMCB0cmFuc2l0aW9uLWFsbCByZXNpemUtbm9uZSBsZWFkaW5nLXJlbGF4ZWRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJEZXNjcmV2YSBvIHByYXRvLCBpbHVtaW5hw6fDo28sIGFtYmllbnRlIGUgZXN0aWxvIGRhIGZvdG8uLi5cIlxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICBTdWdlc3TDtWVzIFByb250YXMgZGUgQWx0YSBDb252ZXJzw6NvOlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIHtQUk9NUFRfU1VHR0VTVElPTlMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVBcHBseVByZXNldFByb21wdChpdGVtLnRleHQsIGl0ZW0ubGFiZWwuc3BsaXQoXCIgXCIpWzBdICsgXCIgRkVTVElWQUxcIiwgXCIzMCUgT0ZGXCIpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlIGZvbnQtbGFiZWwtbWQgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8xNVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgIEZvcm1hdG8gJiBDYW5hbCBBbHZvOlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0yXCI+XG4gICAgICAgICAgICAgIHtGT1JNQVRfT1BUSU9OUy5tYXAoKGZtdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZEZvcm1hdCgpID09PSBmbXQuaWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtmbXQuaWR9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRGb3JtYXQoZm10LmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICBzaG93VG9hc3QoXCJGb3JtYXRvIEFsdGVyYWRvXCIsIGBDYW52YXMgYWp1c3RhZG8gcGFyYSAke2ZtdC5sYWJlbH0uYCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwicC0yIHJvdW5kZWQteGwgdGV4dC1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IGJvcmRlci1wcmltYXJ5IHNoYWRvdy1zbSBmb250LWJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcInAtMiByb3VuZGVkLXhsIHRleHQtY2VudGVyIHRyYW5zaXRpb24tYWxsIGJvcmRlciBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCB0ZXh0LW9uLXN1cmZhY2UgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgYmxvY2tcIj57Zm10LmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXsoKSA9PiBgdGV4dC1bMTBweF0gYmxvY2sgJHtpc1NlbGVjdGVkID8gXCJ0ZXh0LXdoaXRlLzgwXCIgOiBcInRleHQtb24tc3VyZmFjZS12YXJpYW50XCJ9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge2ZtdC5zdWJ9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICBFc3RpbG8gVmlzdWFsICYgSWx1bWluYcOnw6NvOlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yXCI+XG4gICAgICAgICAgICAgIHtTVFlMRV9PUFRJT05TLm1hcCgoc3R5bGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRTdHlsZSgpID09PSBzdHlsZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e3N0eWxlfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkU3R5bGUoc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICAgIHNob3dUb2FzdChcIkVzdGlsbyBTZWxlY2lvbmFkb1wiLCBzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwicHgtMyBweS0yIHJvdW5kZWQteGwgdGV4dC1sZWZ0IGZvbnQtYm9keS1zbSB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBib3JkZXItcHJpbWFyeSB0ZXh0LXByaW1hcnkgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJweC0zIHB5LTIgcm91bmRlZC14bCB0ZXh0LWxlZnQgZm9udC1ib2R5LXNtIHRyYW5zaXRpb24tYWxsIGJvcmRlciBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCB0ZXh0LW9uLXN1cmZhY2UgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtzdHlsZX1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTIgcHQtMiBib3JkZXItdCBib3JkZXItb3V0bGluZS12YXJpYW50LzE1XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgU2Vsb3MgJiBPdmVybGF5cyBubyBCYW5uZXI6XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgZm9udC1ib2R5LXNtXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBjdXJzb3ItcG9pbnRlciBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgcC0yIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMTVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXsoKSA9PiBzaG93RGlzY291bnRUYWcoKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNob3dEaXNjb3VudFRhZyhldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZCB0ZXh0LXByaW1hcnlcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+U2VsbyBEZXNjb250byAoeygpID0+IGN1cnJlbnRCYWRnZSgpfSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBwLTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8xNVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9eygpID0+IHNob3dTdG9yZUxvZ28oKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNob3dTdG9yZUxvZ28oZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgdGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkxvZ290aXBvIGRhIExvamE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBwLTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8xNVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9eygpID0+IHNob3dUaW1lQmFkZ2UoKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNob3dUaW1lQmFkZ2UoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgdGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkJhZGdlIFRlbXBvIExpbWl0YWRvPC9zcGFuPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBjdXJzb3ItcG9pbnRlciBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgcC0yIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMTVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXsoKSA9PiBzaG93RXJwUHJpY2UoKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNob3dFcnBQcmljZShldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZCB0ZXh0LXByaW1hcnlcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UHJlw6dvIE9maWNpYWwgRVJQPC9zcGFuPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzExcHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50IG1iLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgQ3LDqWRpdG9zIGRlIElBOiA8c3Ryb25nPjE0MiAvIDIwMCByZXN0YW50ZXM8L3N0cm9uZz4gZXN0ZSBtw6pzXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC10ZXJ0aWFyeSBmb250LXNlbWlib2xkXCI+Q29uc3VtbzogMSBjcsOpZGl0bzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eygpID0+IGlzR2VuZXJhdGluZygpfVxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTMgcHgtNCByb3VuZGVkLXhsIGJnLXByaW1hcnktY29udGFpbmVyIGhvdmVyOmJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IGZvbnQtaGVhZGxpbmUtc20gZm9udC1ib2xkIHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBhY3RpdmU6c2NhbGUtWzAuOThdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIGRpc2FibGVkOm9wYWNpdHktNTBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7KCkgPT5cbiAgICAgICAgICAgICAgICBpc0dlbmVyYXRpbmcoKSA/IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjRweF0gYW5pbWF0ZS1zcGluXCI+cHJvZ3Jlc3NfYWN0aXZpdHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlJlbmRlcml6YW5kbyBJbWFnZW0gY29tIElBLi4uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjRweF1cIj5hdXRvX2F3ZXNvbWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlcmFyIEltYWdlbSBjb20gSUEgKDEgQ3LDqWRpdG8pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFBhaW5lbCBEaXJlaXRvOiBDYW52YXMgTGl2ZSBWaWV3ZXIgJiBBw6fDtWVzICg3IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInhsOmNvbC1zcGFuLTcgZmxleCBmbGV4LWNvbCBnYXAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHJvdW5kZWQteGwgcC01IHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGZsZXgtY29sIGdhcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPlZpc3VhbGl6YcOnw6NvIGRvIENhbnZhczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCB0ZXh0LXByaW1hcnkgZm9udC1jb2RlLXNtIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgRm9ybWF0byB7KCkgPT4gc2VsZWN0ZWRGb3JtYXQoKX0g4oCiIDIwNDggeCAyMDQ4cHhcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNob3dUb2FzdChcIkRvd25sb2FkIDRLIEluaWNpYWRvXCIsIFwiQXJxdWl2byBQTkcgZGUgYWx0YSByZXNvbHXDp8OjbyBnZXJhZG8gcGFyYSBkb3dubG9hZC5cIiwgXCJzdWNjZXNzXCIpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlIGZvbnQtdGl0bGUtbWQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWNvbG9ycyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPmRvd25sb2FkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+QmFpeGFyIDRLPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93VG9hc3QoXCJEaXNwYXJvIFByb2dyYW1hZG9cIiwgXCJBcnRlIGRpcmVjaW9uYWRhIHBhcmEgZmlsYSBkZSBlbnZpbyBkZSAxLjQyMCBjb250YXRvcyBubyBXaGF0c0FwcC5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXIucHVzaChTQ1JFRU5fUk9VVEVTW1wiY2hhdC1vbW5pY2hhbm5lbFwiXSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1wcmltYXJ5LWNvbnRhaW5lciBob3ZlcjpiZy1wcmltYXJ5IHRleHQtb24tcHJpbWFyeSBmb250LXRpdGxlLW1kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtIGZvbnQtYm9sZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPnNlbmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5EaXNwYXJvIFdoYXRzQXBwPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU3RhZ2UgZG8gQmFubmVyIEdhc3Ryb27DtG1pY28gY29tIFNlbG9zIERpbsOibWljb3MgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBhc3BlY3Qtc3F1YXJlIG1heC1oLVs1MDBweF0gcm91bmRlZC0yeGwgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy1sZyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8zMCBiZy1zbGF0ZS05MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHNyYz17KCkgPT4gY3VycmVudENhbnZhc0ltYWdlKCl9XG4gICAgICAgICAgICAgICAgYWx0PVwiQ3JpYXRpdm8gR2VyYWRvIHBvciBJQVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXIgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tNTAwIGdyb3VwLWhvdmVyOnNjYWxlLTEwNVwiXG4gICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1ibGFjay84NSB2aWEtYmxhY2svMjAgdG8tYmxhY2svNjAgcG9pbnRlci1ldmVudHMtbm9uZVwiPjwvZGl2PlxuXG4gICAgICAgICAgICAgIHsoKSA9PlxuICAgICAgICAgICAgICAgIHNob3dTdG9yZUxvZ28oKSB8fCBzaG93RGlzY291bnRUYWcoKSA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgbGVmdC00IHJpZ2h0LTQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBvaW50ZXItZXZlbnRzLW5vbmUgei0xMFwiPlxuICAgICAgICAgICAgICAgICAgICB7c2hvd1N0b3JlTG9nbygpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLWJhZGdlIHB4LTMgcHktMS41IHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5IGFuaW1hdGUtcHVsc2VcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLW1kIHRleHQtd2hpdGUgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyXCI+UkVERSBPTU5JPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICB7c2hvd0Rpc2NvdW50VGFnKCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcmVkLTYwMCB0ZXh0LXdoaXRlIGZvbnQtaGVhZGxpbmUtbWQgZm9udC1leHRyYWJvbGQgcHgtNCBweS0xLjUgcm91bmRlZC14bCBzaGFkb3cteGwgdHJhbnNmb3JtIHJvdGF0ZS0yIGFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7KCkgPT4gY3VycmVudEJhZGdlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKDw+IDwvPilcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgbGVmdC00IHJpZ2h0LTQgei0xMCBmbGV4IGZsZXgtY29sIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgeygpID0+XG4gICAgICAgICAgICAgICAgICBzaG93VGltZUJhZGdlKCkgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB3LWZpdCBweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1hbWJlci00MDAgdGV4dC1ibGFjayBmb250LWxhYmVsLXNtIGZvbnQtZXh0cmFib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNHB4XVwiPnRpbWVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIFbDoWxpZG8gU29tZW50ZSBIb2plIEF0w6kgMjNoNTlcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKSA6ICg8PiA8Lz4pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWVuZCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLXhsIHRleHQtd2hpdGUgZm9udC1leHRyYWJvbGQgdHJhY2tpbmctdGlnaHQgZHJvcC1zaGFkb3ctbWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7KCkgPT4gY3VycmVudFRpdGxlKCl9XG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtd2hpdGUvOTAgZm9udC1ib2R5LW1kIGRyb3Atc2hhZG93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgU21hc2ggZHVwbG8gbm8gYnJpb2NoZSBzZWxhZG8gY29tIGNoZWRkYXIgZSBmcml0YXMgY3JvY2FudGVzXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgc2hvd0VycFByaWNlKCkgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0IHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlLzc1IHRleHQteHMgbGluZS10aHJvdWdoIGJsb2NrXCI+RGUgUiQgNDksOTA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLXhsIHRleHQtYW1iZXItNDAwIGZvbnQtZXh0cmFib2xkXCI+UiQgMzQsOTA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoPD4gPC8+KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQmFycmEgZGUgQcOnw7VlcyBSw6FwaWRhcyBkbyBDcmlhdGl2byAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZsZXgtd3JhcCBnYXAtMiBwdC0xIGZvbnQtdGl0bGUtbWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd1RvYXN0KFwiUmVjb3J0YXIgRnVuZG9cIiwgXCJSZW1vw6fDo28gZGUgZnVuZG8gY29tIElBIGNvbmNsdcOtZGEuIFBORyBjb20gY2FuYWwgYWxmYSBkaXNwb27DrXZlbC5cIiwgXCJpbmZvXCIpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnMgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF1cIj5hdXRvX2ZpeF9oaWdoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UmVjb3J0YXIgRnVuZG8gKFBORyk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93VG9hc3QoXCJWw61uY3VsbyBDcmlhZG9cIiwgXCJJbWFnZW0gYXNzb2NpYWRhIGFvIHByb2R1dG8gQ29tYm8gU21hc2ggQnVyZ2VyIG5vIGlGb29kIGUgVG90dnMhXCIsIFwic3VjY2Vzc1wiKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tY29sb3JzIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+bGluazwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlZpbmN1bGFyIGFvIFRvdHZzICYgaUZvb2Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaGVzdCB0ZXh0LXByaW1hcnkgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPnJlZnJlc2g8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+R2VyYXIgT3V0cmEgVmFyaWHDp8Ojbzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBWYXJpYcOnw7VlcyBHZXJhZGFzIEFudGVyaW9yZXMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTQgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPlZhcmlhw6fDtWVzIEFsdGVybmF0aXZhcyBHZXJhZGFzPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+Q2xpcXVlIHBhcmEgdmlzdWFsaXphciBubyBDYW52YXM8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0zIGdhcC0zXCI+XG4gICAgICAgICAgICAgIHtTVFVESU9fVkFSSUFUSU9OUy5tYXAoKHZhckl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e3Zhckl0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZWxlY3RWYXJpYXRpb24odmFySXRlbSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJncm91cCByZWxhdGl2ZSByb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8zMCBjdXJzb3ItcG9pbnRlciBob3ZlcjpzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgYXNwZWN0LXZpZGVvIHNtOmFzcGVjdC1zcXVhcmVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgc3JjPXt2YXJJdGVtLmltYWdlfVxuICAgICAgICAgICAgICAgICAgICBhbHQ9e3Zhckl0ZW0udGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIGdyb3VwLWhvdmVyOnNjYWxlLTEwNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDBcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tYmxhY2svODAgdmlhLXRyYW5zcGFyZW50IHRvLWJsYWNrLzMwIHAtMi41IGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctYmxhY2svNjAgdGV4dC13aGl0ZSBmb250LWNvZGUtc20gdGV4dC1bMTBweF0gdy1maXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7dmFySXRlbS5mb3JtYXRUYWd9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXRpdGxlLW1kIHRleHQtd2hpdGUgZm9udC1ib2xkIGJsb2NrIGxlYWRpbmctdGlnaHRcIj57dmFySXRlbS50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC13aGl0ZS84MFwiPnt2YXJJdGVtLnN1YnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEdhbGVyaWEgZGUgQmFubmVycyBQcm9tb2Npb25haXMgQXRpdm9zICYgRGVzZW1wZW5obyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHJvdW5kZWQteGwgcC01IHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGZsZXgtY29sIGdhcC00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLW1kIHRleHQtb24tc3VyZmFjZSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgQmFubmVycyBBdGl2b3MgZW0gQ2FtcGFuaGFzICYgUGVyZm9ybWFuY2VcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgQWNvbXBhbmhlIGNsaXF1ZXMsIGRpc3Bhcm9zIG5vIFdoYXRzQXBwIGUgY29udmVyc8OjbyBlbSB0ZW1wbyByZWFsIHZpbmN1bGFkb3MgYW9zIHBlZGlkb3MgZG8gVG90dnMgZSBpRm9vZC5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBvdmVyZmxvdy14LWF1dG8gc2Nyb2xsYmFyLW5vbmVcIj5cbiAgICAgICAgICAgIHtCQU5ORVJfVEFCUy5tYXAoKHRhYikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gYWN0aXZlVGFiQmFubmVyKCkgPT09IHRhYi5pZDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3RhYi5pZH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiQmFubmVyKHRhYi5pZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eygpID0+XG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICA/IFwicHgtMyBweS0xIHJvdW5kZWQtbGcgZm9udC1sYWJlbC1tZCB0cmFuc2l0aW9uLWNvbG9ycyBiZy1wcmltYXJ5IHRleHQtb24tcHJpbWFyeSBmb250LWJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJweC0zIHB5LTEgcm91bmRlZC1sZyBmb250LWxhYmVsLW1kIHRyYW5zaXRpb24tY29sb3JzIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyB0ZXh0LW9uLXN1cmZhY2UgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHt0YWIubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC00XCI+XG4gICAgICAgICAgeygpID0+XG4gICAgICAgICAgICBJTklUSUFMX0JBTk5FUlMuZmlsdGVyKChiYW5uZXIpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjdGl2ZVRhYkJhbm5lcigpID09PSBcImFsbFwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgcmV0dXJuIGJhbm5lci5jaGFubmVsID09PSBhY3RpdmVUYWJCYW5uZXIoKTtcbiAgICAgICAgICAgIH0pLm1hcCgoYmFubmVyKSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2Jhbm5lci5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgc2hhZG93LXNtIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGdyb3VwIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGFzcGVjdC12aWRlbyB3LWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgIHNyYz17YmFubmVyLmltYWdlfVxuICAgICAgICAgICAgICAgICAgICBhbHQ9e2Jhbm5lci50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXIgZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgbGVmdC0yIHB4LTIgcHktMC41IHJvdW5kZWQgYmctYmxhY2svNzAgdGV4dC13aGl0ZSBmb250LWNvZGUtc20gdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAge2Jhbm5lci5jb2RlfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgcmlnaHQtMiBweC0yIHB5LTAuNSByb3VuZGVkIGJnLWVtZXJhbGQtNjAwIHRleHQtd2hpdGUgZm9udC1sYWJlbC1zbSB0ZXh0LVsxMHB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAge2Jhbm5lci5zdGF0dXNCYWRnZX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgZmxleCBmbGV4LWNvbCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbGcgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZCBsZWFkaW5nLXNudWdcIj57YmFubmVyLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LVsxMnB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBibG9ja1wiPntiYW5uZXIuY2FtcGFpZ25UeXBlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgcHQtMiBib3JkZXItdCBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZvbnQtYm9keS1zbVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGJsb2NrXCI+e2Jhbm5lci5tZXRyaWMxTGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPntiYW5uZXIubWV0cmljMVZhbHVlfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBibG9ja1wiPntiYW5uZXIubWV0cmljMkxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmb250LWJvbGRcIj57YmFubmVyLm1ldHJpYzJWYWx1ZX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNob3dUb2FzdChcIkNhbXBhbmhhIFNlbGVjaW9uYWRhXCIsIGBSZWVudmlhbmRvIGFydGUgZGUgJHtiYW5uZXIudGl0bGV9IG5vIFdoYXRzQXBwIWAsIFwiaW5mb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICByb3V0ZXIucHVzaChTQ1JFRU5fUk9VVEVTW1wiY2hhdC1vbW5pY2hhbm5lbFwiXSk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBtdC0xIHB5LTEuNSByb3VuZGVkLWxnIGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2hlc3QgaG92ZXI6YmctcHJpbWFyeSBob3Zlcjp0ZXh0LW9uLXByaW1hcnkgdGV4dC1wcmltYXJ5IGZvbnQtdGl0bGUtbWQgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFVzYXIgbmVzdGEgQ29udmVyc2FcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufSIsIlxuaW1wb3J0ICogYXMgY2xpZW50TW9kdWxlIGZyb20gXCIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9zdHVkaW8tc2NyZWVuLnRzeFwiO1xuaW1wb3J0IHsgaHlkcmF0ZUNsaWVudENvbXBvbmVudHMgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuXG5oeWRyYXRlQ2xpZW50Q29tcG9uZW50cyhcImNvbXBvbmVudHMvb21uaS1odWIvc3R1ZGlvLXNjcmVlblwiLCBjbGllbnRNb2R1bGUpO1xuZXhwb3J0IHt9O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0EsTUFBTSxpQkFBMEY7Q0FDOUY7RUFBRSxJQUFJO0VBQVEsT0FBTztFQUFnQixLQUFLO0NBQW9CO0NBQzlEO0VBQUUsSUFBSTtFQUFPLE9BQU87RUFBWSxLQUFLO0NBQWlCO0NBQ3REO0VBQUUsSUFBSTtFQUFRLE9BQU87RUFBZSxLQUFLO0NBQWdCO0NBQ3pEO0VBQUUsSUFBSTtFQUFTLE9BQU87RUFBaUIsS0FBSztDQUFnQjtBQUM5RDtBQUVBLE1BQU0sZ0JBQWdCO0NBQ3BCO0NBQ0E7Q0FDQTtDQUNBO0FBQ0Y7QUFFQSxNQUFNLHFCQUFxQjtDQUN6QjtF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