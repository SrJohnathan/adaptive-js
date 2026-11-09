import { _ as jsx, b as __exportAll, c as signal, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";
import { t as SCREEN_ROUTES } from "./chunk-BAJW75ro.js";
import { n as setProducts, t as products } from "./chunk-nb0xSHZp.js";

//#region src/components/omni-hub/catalog-screen.tsx
var catalog_screen_exports = /* @__PURE__ */ __exportAll({ CatalogScreen: () => CatalogScreen });
const COPY_VARIATIONS = [
	"\"Massa de fermentação natural 48h, molho artesanal de tomates San Marzano e fior di latte fresco maçaricado na hora.\"",
	"\"Smash suculento com crosta crocante caramelizada, queijo cheddar inglês derretido e fatias de bacon artesanal defumado em lenha nobre.\"",
	"\"Salmão fresco selecionado cortado em cubos grelhados, acompanhado de edamame crocante, lâminas de abacate hass e gergelim tostado.\""
];
const CATALOG_TAGS = [
	{
		id: "Todos",
		label: `Todos os Itens (6)`
	},
	{
		id: "Mais Vendidos",
		label: "Mais Vendidos no iFood",
		icon: "local_fire_department",
		isFire: true
	},
	{
		id: "Pratos Principais",
		label: "Pratos Principais"
	},
	{
		id: "Bebidas & Drinks",
		label: "Bebidas & Drinks"
	},
	{
		id: "Sobremesas",
		label: "Sobremesas"
	},
	{
		id: "Baixo Estoque",
		label: "Baixo Estoque",
		icon: "warning",
		isWarning: true
	}
];
function CatalogScreen() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = signal("");
	const [selectedTag, setSelectedTag] = signal("Todos");
	const [priceChannel, setPriceChannel] = signal("ifood");
	const [isSyncing, setIsSyncing] = signal(false);
	const [copyIndex, setCopyIndex] = signal(0);
	const handleSync = () => {
		setIsSyncing(true);
		showToast("Sincronização em Andamento", "Conectando ao iFood Marketplace e Totvs Protheus...", "info");
		setTimeout(() => {
			setIsSyncing(false);
			showToast("Cardápio & Estoque Sincronizados", "148 itens validados e atualizados com sucesso.", "success");
		}, 1400);
	};
	const handleToggleProduct = (id) => {
		setProducts((prev) => prev.map((p) => {
			if (p.id !== id) return p;
			const newState = !p.activeInIfood;
			showToast(newState ? "Produto Ativado no iFood" : "Produto Pausado no iFood", `${p.name} agora está ${newState ? "disponível para pedidos" : "pausado na cozinha"}.`, newState ? "success" : "warning");
			return {
				...p,
				activeInIfood: newState
			};
		}));
	};
	const handleSendToChat = (product) => {
		showToast("Prato Anexado ao Chat", `${product.name} (${product.ifoodPrice}) pronto para envio no Chat Omnichannel.`);
		router.push(SCREEN_ROUTES["chat-omnichannel"]);
	};
	const handleNextCopy = () => {
		const next = (copyIndex() + 1) % COPY_VARIATIONS.length;
		setCopyIndex(next);
		showToast("IA Copilot Vendas", "Nova variação gerada com foco em conversão de cardápio!");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1680px] mx-auto",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 text-on-surface-variant font-label-md",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1 hover:text-primary transition-colors cursor-pointer",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[18px]",
								children: "restaurant_menu"
							}), "Catálogo Unificado"]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[14px]",
							children: "chevron_right"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-primary font-semibold",
							children: "Sincronizador ERP & iFood API"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-code-sm font-semibold",
							children: "Node: BR-SP-JARDINS-01"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm border border-outline-variant/20",
							children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-ping" }), /* @__PURE__ */ jsx("span", { children: "Sync há 45s • Uptime 99.8%" })]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: handleSync,
							disabled: () => isSyncing(),
							className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md transition-all shadow-sm active:scale-95 border border-outline-variant/20",
							children: [/* @__PURE__ */ jsx("span", {
								className: `material-symbols-outlined text-primary text-[18px] ${isSyncing() ? "animate-spin" : ""}`,
								children: "sync"
							}), /* @__PURE__ */ jsx("span", { children: () => isSyncing() ? "Sincronizando..." : "Sincronizar Agora" })]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => showToast("Configurações ERP", "Totvs Protheus v12.1 conectado ao Depósito Central 01.", "info"),
							className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[18px]",
								children: "settings_input_composite"
							}), /* @__PURE__ */ jsx("span", { children: "Configurar ERP" })]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => showToast("Novo Prato", "Abra o formulário de cadastro de SKU para sincronizar com iFood e Totvs.", "info"),
							className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm active:scale-95",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[18px]",
								children: "add_circle"
							}), /* @__PURE__ */ jsx("span", { children: "Novo Produto" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "max-w-3xl",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 mb-1 flex-wrap",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "font-headline-lg text-on-surface tracking-tight font-bold",
							children: "Catálogo de Produtos & Integrações ERP"
						}), /* @__PURE__ */ jsx("span", {
							className: "inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-semibold",
							children: "V 4.8 Live"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-on-surface-variant font-body-md leading-relaxed",
						children: "Sincronização bidirecional em tempo real com iFood Marketplace, Totvs Protheus, Bling, Tiny e WhatsApp Commerce. Ajuste disponibilidades de cozinha, crie promoções e anexe itens diretamente na conversa do cliente."
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 sm:gap-4 p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col px-2 text-left",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-on-surface-variant font-label-sm",
								children: "Itens no iFood"
							}), /* @__PURE__ */ jsxs("span", {
								className: "font-headline-md text-on-surface font-bold",
								children: ["148 ", /* @__PURE__ */ jsx("span", {
									className: "font-label-sm text-tertiary",
									children: "ativos"
								})]
							})]
						}),
						/* @__PURE__ */ jsx("div", { className: "w-px h-8 bg-surface-container-highest" }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col px-2 text-left",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-on-surface-variant font-label-sm",
								children: "Taxa de Conversão"
							}), /* @__PURE__ */ jsx("span", {
								className: "font-headline-md text-primary font-bold",
								children: "24.6%"
							})]
						}),
						/* @__PURE__ */ jsx("div", { className: "w-px h-8 bg-surface-container-highest" }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col px-2 text-left",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-on-surface-variant font-label-sm",
								children: "Ruptura Estoque"
							}), /* @__PURE__ */ jsx("span", {
								className: "font-headline-md font-bold text-red-600",
								children: "0.8%"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 rounded-xl bg-error-container/60 flex items-center justify-center text-error text-[#EA1D2C]",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "delivery_dining"
									})
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-title-md text-on-surface font-semibold",
										children: "iFood Jardins"
									}), /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" })]
								}), /* @__PURE__ */ jsx("span", {
									className: "font-code-sm text-on-surface-variant font-mono",
									children: "ID #8942-SP"
								})] })]
							}), /* @__PURE__ */ jsx("span", {
								className: "px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm font-semibold",
								children: "Webhook 100%"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant",
							children: [/* @__PURE__ */ jsx("span", { children: "148 itens sincronizados" }), /* @__PURE__ */ jsx("span", {
								className: "text-tertiary font-medium",
								children: "Cardápio Oficial • Online"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-bold",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "database"
									})
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-1",
									children: /* @__PURE__ */ jsx("span", {
										className: "font-title-md text-on-surface font-semibold",
										children: "Totvs Protheus ERP"
									})
								}), /* @__PURE__ */ jsx("span", {
									className: "font-code-sm text-on-surface-variant font-mono",
									children: "REST API v12.1"
								})] })]
							}), /* @__PURE__ */ jsx("span", {
								className: "px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm font-semibold",
								children: "Saldo Real"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant",
							children: [/* @__PURE__ */ jsx("span", { children: "Depósito Central #01" }), /* @__PURE__ */ jsx("span", {
								className: "text-primary font-medium",
								children: "Auto-baixa de estoque"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary font-bold",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "receipt_long"
									})
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-1",
									children: /* @__PURE__ */ jsx("span", {
										className: "font-title-md text-on-surface font-semibold",
										children: "Bling! Fiscal Hub"
									})
								}), /* @__PURE__ */ jsx("span", {
									className: "font-code-sm text-on-surface-variant font-mono",
									children: "NFC-e Automática"
								})] })]
							}), /* @__PURE__ */ jsx("span", {
								className: "px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm font-semibold",
								children: "SEFAZ OK"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant",
							children: [/* @__PURE__ */ jsx("span", { children: "Série 003 emitida" }), /* @__PURE__ */ jsx("span", {
								className: "text-on-surface font-medium",
								children: "Tempo médio 1.2s"
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "chat_bubble"
									})
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-1",
									children: /* @__PURE__ */ jsx("span", {
										className: "font-title-md text-on-surface font-semibold",
										children: "WhatsApp Catalog"
									})
								}), /* @__PURE__ */ jsx("span", {
									className: "font-code-sm text-on-surface-variant font-mono",
									children: "Cloud API Meta"
								})] })]
							}), /* @__PURE__ */ jsx("span", {
								className: "px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm font-semibold",
								children: "100% Pareado"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant",
							children: [/* @__PURE__ */ jsx("span", { children: "Checkout via Bot" }), /* @__PURE__ */ jsx("span", {
								className: "text-primary font-medium",
								children: "Pix nativo ativo"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 xl:grid-cols-12 gap-6 items-start",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "xl:col-span-8 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col sm:flex-row gap-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex-1 flex items-center bg-surface-container-low rounded-xl px-3.5 py-2 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20 transition-all",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-on-surface-variant mr-2 text-[20px]",
											children: "search"
										}),
										/* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => searchQuery(),
											onInput: (event) => setSearchQuery(event.currentTarget.value),
											placeholder: "Buscar produto por nome, código SKU, ingrediente ou categoria ERP...",
											className: "w-full bg-transparent border-none outline-none font-body-sm text-on-surface placeholder:text-on-surface-variant/70"
										}),
										/* @__PURE__ */ jsx("kbd", {
											className: "hidden sm:inline-block font-code-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant",
											children: "Ctrl /"
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "flex items-center bg-surface-container-low rounded-xl p-1 shrink-0 border border-outline-variant/20",
									children: ["ifood", "balcao"].map((channel) => {
										const isSelected = priceChannel() === channel;
										return /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setPriceChannel(channel),
											className: () => isSelected ? "px-3 py-1.5 rounded-lg font-title-md transition-all bg-surface-container-lowest shadow-sm text-primary font-bold" : "px-3 py-1.5 rounded-lg font-title-md transition-all text-on-surface-variant hover:text-on-surface",
											children: channel === "ifood" ? "Cardápio iFood" : "WhatsApp / Balcão"
										}, channel);
									})
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex items-center gap-2 overflow-x-auto pb-1 text-nowrap scrollbar-none",
								children: CATALOG_TAGS.map((tag) => {
									const isSelected = selectedTag() === tag.id;
									return /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => setSelectedTag(tag.id),
										className: () => isSelected ? "px-3 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-primary text-on-primary shadow-sm font-bold" : tag.isWarning ? "px-3 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-error-container/40 hover:bg-error-container text-on-error-container" : "px-3 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/20",
										children: [tag.icon && /* @__PURE__ */ jsx("span", {
											className: `material-symbols-outlined text-[16px] ${tag.isFire ? "text-amber-600" : "text-error"}`,
											children: tag.icon
										}), /* @__PURE__ */ jsx("span", { children: tag.label })]
									}, tag.id);
								})
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex flex-col gap-2.5",
							children: () => products().filter((p) => {
								if (!(p.name.toLowerCase().includes(searchQuery().toLowerCase()) || p.sku.toLowerCase().includes(searchQuery().toLowerCase()) || p.category.toLowerCase().includes(searchQuery().toLowerCase()))) return false;
								if (selectedTag() === "Mais Vendidos") return p.ratingBadge?.includes("Mais Pedido") || p.ratingBadge?.includes("Top 1");
								if (selectedTag() === "Pratos Principais") return p.category.includes("Pizzas") || p.category.includes("Tradicionais") || p.category.includes("Bowls");
								if (selectedTag() === "Bebidas & Drinks") return p.category.includes("Bebidas");
								if (selectedTag() === "Sobremesas") return p.category.includes("Sobremesas");
								if (selectedTag() === "Baixo Estoque") return Boolean(p.lowStock);
								return true;
							}).map((product) => /* @__PURE__ */ jsxs("div", {
								className: `bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group ${() => !product.activeInIfood ? "opacity-80 bg-surface-container-low/40" : ""}`,
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3.5 min-w-0",
									children: [/* @__PURE__ */ jsx("img", {
										className: "w-16 h-16 rounded-xl object-cover shadow-inner shrink-0 ring-1 ring-outline-variant/20",
										alt: product.name,
										src: product.image
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col min-w-0",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "font-title-lg text-on-surface font-bold truncate",
													children: product.name
												}),
												product.ratingBadge && /* @__PURE__ */ jsx("span", {
													className: "px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm font-semibold",
													children: product.ratingBadge
												}),
												product.tag && /* @__PURE__ */ jsx("span", {
													className: "px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm",
													children: product.tag
												})
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3 mt-1 text-on-surface-variant font-body-sm flex-wrap",
											children: [
												/* @__PURE__ */ jsxs("span", {
													className: "font-code-sm bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface border border-outline-variant/20",
													children: ["SKU: ", product.sku]
												}),
												/* @__PURE__ */ jsxs("span", { children: ["Cat: ", product.category] }),
												/* @__PURE__ */ jsxs("span", {
													className: `font-semibold flex items-center gap-1 ${product.lowStock ? "text-red-600" : "text-tertiary"}`,
													children: [/* @__PURE__ */ jsx("span", {
														className: "material-symbols-outlined text-[14px]",
														children: product.lowStock ? "warning" : "inventory_2"
													}), product.stockText]
												})
											]
										})]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between md:justify-end gap-5 w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-outline-variant/20",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col text-right",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-baseline gap-1 justify-end",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-title-lg text-on-surface font-bold",
													children: priceChannel() === "ifood" ? product.ifoodPrice : product.balcaoPrice
												}), /* @__PURE__ */ jsxs("span", {
													className: "font-label-sm text-tertiary font-semibold",
													children: [
														"(",
														priceChannel() === "ifood" ? "iFood" : "Balcão",
														")"
													]
												})]
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-1 text-on-surface-variant font-code-sm justify-end",
												children: [/* @__PURE__ */ jsxs("span", { children: ["Balcão: ", product.balcaoPrice] }), /* @__PURE__ */ jsx("span", {
													className: "text-primary font-semibold",
													children: product.marginText
												})]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col items-center",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-label-sm text-on-surface-variant mb-0.5",
												children: "iFood Loja"
											}), /* @__PURE__ */ jsx("input", {
												type: "checkbox",
												checked: () => product.activeInIfood,
												onChange: () => handleToggleProduct(product.id),
												className: () => product.activeInIfood ? "w-9 h-5 bg-primary rounded-full appearance-none cursor-pointer relative shadow-inner" : "w-9 h-5 bg-surface-container-highest rounded-full appearance-none cursor-pointer relative"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => handleSendToChat(product),
												title: "Enviar no Chat para Cliente Atual",
												className: "p-2 rounded-xl bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface transition-all active:scale-90 border border-outline-variant/20",
												children: /* @__PURE__ */ jsx("span", {
													className: "material-symbols-outlined text-[20px]",
													children: "send_and_archive"
												})
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => {
													showToast("Criar Campanha", `Iniciando disparo segmentado para ${product.name}`, "info");
													router.push(SCREEN_ROUTES["estudio-banners"]);
												},
												title: "Criar Campanha de Disparo",
												className: "p-2 rounded-xl bg-surface-container-low hover:bg-surface-container-highest text-on-surface transition-all border border-outline-variant/20",
												children: /* @__PURE__ */ jsx("span", {
													className: "material-symbols-outlined text-[20px]",
													children: "campaign"
												})
											})]
										})
									]
								})]
							}))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 font-label-md text-on-surface-variant",
							children: [/* @__PURE__ */ jsxs("span", { children: [
								"Exibindo ",
								() => products().length,
								" de 148 pratos integrados via Totvs/iFood"
							] }), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ jsx("button", {
										type: "button",
										disabled: true,
										className: "p-1.5 rounded-lg bg-surface-container-low text-on-surface disabled:opacity-40",
										children: /* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "chevron_left"
										})
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										className: "px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-bold",
										children: "1"
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										className: "px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface",
										children: "2"
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										className: "px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface",
										children: "3"
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										className: "p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface",
										children: /* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "chevron_right"
										})
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "xl:col-span-4 flex flex-col gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 relative overflow-hidden flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary-container/10 blur-2xl pointer-events-none" }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between relative z-10",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary shadow-sm",
										children: /* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "auto_awesome"
										})
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
										className: "font-headline-md text-on-surface font-bold",
										children: "IA Copilot Vendas"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-label-sm text-tertiary font-semibold",
										children: "Otimizador de Cardápio Ativo"
									})] })]
								}), /* @__PURE__ */ jsx("span", {
									className: "px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-bold",
									children: "GPT-4o Omni"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 relative z-10",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 font-label-sm uppercase tracking-wider text-primary font-bold",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "trending_up"
											}), "Alerta de Demanda iFood"]
										}), /* @__PURE__ */ jsx("span", {
											className: "text-tertiary font-label-sm font-semibold",
											children: "+38% Procura"
										})]
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "font-body-sm text-on-surface leading-relaxed",
										children: [
											"O prato ",
											/* @__PURE__ */ jsx("strong", {
												className: "text-on-surface font-semibold",
												children: "Pizza Margherita Especial"
											}),
											" atinge pico histórico às sextas entre 19h e 22h. Sugestão: programar disparo relâmpago de 12% off no WhatsApp para clientes com ticket médio > R$ 70."
										]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "pt-1 flex items-center gap-2",
										children: /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => showToast("Disparo Agendado", "Campanha de 12% OFF programada para sexta-feira às 18:30 via WhatsApp.", "success"),
											className: "w-full py-1.5 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm active:scale-95 text-center font-bold",
											children: "Agendar Disparo Segmentado"
										})
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 relative z-10",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 font-label-sm uppercase tracking-wider text-tertiary font-bold",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "point_of_sale"
											}), "Sugestão de Combo Inteligente"]
										}), /* @__PURE__ */ jsx("span", {
											className: "text-primary font-code-sm font-bold",
											children: "Margem 62%"
										})]
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "font-body-sm text-on-surface leading-relaxed",
										children: [
											"Agrupar ",
											/* @__PURE__ */ jsx("strong", {
												className: "text-on-surface font-semibold",
												children: "Smash Burger Duplo + Suco de Maracujá 500ml"
											}),
											" ",
											"por ",
											/* @__PURE__ */ jsx("strong", { children: "R$ 58,90" }),
											" no iFood. Isso gera +R$ 14 de margem líquida por pedido sem aumentar carga da chapa."
										]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => showToast("Combo Criado", "Combo Smash Burger + Suco criado no iFood e provisionado no Totvs ERP!", "success"),
										className: "w-full py-1.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all text-center flex items-center justify-center gap-1",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[16px]",
											children: "add_shopping_cart"
										}), "Criar Combo no iFood & Totvs"]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 relative z-10",
								children: [
									/* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-1 font-label-sm uppercase tracking-wider text-on-surface-variant font-bold",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[16px]",
											children: "edit_note"
										}), "Redator Apetitoso de Cardápio"]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "font-body-sm text-on-surface-variant",
										children: "Reescreva ingredientes para elevar taxas de clique no cardápio digital do WhatsApp e Instagram:"
									}),
									/* @__PURE__ */ jsx("div", {
										className: "bg-surface-container-lowest p-2.5 rounded-lg text-on-surface font-body-sm italic border-l-2 border-primary-container",
										children: () => COPY_VARIATIONS[copyIndex()]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 pt-1",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: handleNextCopy,
											className: "flex-1 py-1.5 px-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all text-center",
											children: "Gerar Variação"
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => showToast("Texto Salvo", "Descrição aplicada no item selecionado no iFood!", "success"),
											className: "py-1.5 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all font-bold",
											title: "Aplicar no Produto",
											children: "Salvar"
										})]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "bg-gradient-to-br from-primary to-tertiary p-4 rounded-xl text-on-primary flex flex-col gap-2 relative z-10 shadow-sm",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "font-title-md font-bold flex items-center gap-1",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: "bolt"
											}), "Disparo Relâmpago 1-Click"]
										}), /* @__PURE__ */ jsx("span", {
											className: "bg-on-primary/20 px-2 py-0.5 rounded-full font-label-sm",
											children: "Omni Send"
										})]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "font-body-sm text-on-primary/90",
										children: "Dispara card interativo com botão 'Pedir Agora via iFood/Whats' para os últimos 250 clientes que pediram nas últimas 4 semanas."
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => showToast("Oferta Lançada", "Disparo enviado para a fila de transmissão de 250 clientes.", "success"),
										className: "w-full py-2 px-3 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface font-title-md font-bold shadow-sm transition-all text-center",
										children: "Lançar Oferta Relâmpago"
									})
								]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 flex flex-col gap-1.5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-title-md text-on-surface font-semibold",
								children: "Integridade de Rede & APIs"
							}), /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-2 mt-1 font-body-sm",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between text-on-surface-variant",
									children: [/* @__PURE__ */ jsx("span", { children: "iFood Polling & Heartbeat" }), /* @__PURE__ */ jsx("span", {
										className: "text-tertiary font-semibold font-code-sm",
										children: "18ms / OK"
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
									children: /* @__PURE__ */ jsx("div", { className: "bg-primary-container h-full w-[99%]" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between text-on-surface-variant pt-1",
									children: [/* @__PURE__ */ jsx("span", { children: "Totvs Protheus Socket" }), /* @__PURE__ */ jsx("span", {
										className: "text-tertiary font-semibold font-code-sm",
										children: "42ms / Estável"
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
									children: /* @__PURE__ */ jsx("div", { className: "bg-secondary-container h-full w-[98%]" })
								})
							]
						})]
					})]
				})]
			})
		]
	});
}
typeof CatalogScreen === "function" && markClientExport(CatalogScreen, "components/omni-hub/catalog-screen", "CatalogScreen", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__catalog-screen.tsx
hydrateClientComponents("components/omni-hub/catalog-screen", catalog_screen_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktSWdVUElUbjMuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9jYXRhbG9nLXNjcmVlbi50c3giLCIuLi8uLi90ZW1wL2NsaWVudC1jb21wb25lbnRzL2NvbXBvbmVudHNfX29tbmktaHViX19jYXRhbG9nLXNjcmVlbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJoeWRyYXRlXCI7XG5cbmltcG9ydCB7ICBzaWduYWwsIHVzZVJvdXRlciB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5pbXBvcnQgeyBwcm9kdWN0cywgc2V0UHJvZHVjdHMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL2NhdGFsb2ctc3RvcmVcIjtcbmltcG9ydCB7IHNob3dUb2FzdCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvb21uaS1odWIvdG9hc3Qtc3RvcmVcIjtcbmltcG9ydCB7IFNDUkVFTl9ST1VURVMsIHR5cGUgUHJvZHVjdEl0ZW0gfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3R5cGVzXCI7XG5cbmNvbnN0IENPUFlfVkFSSUFUSU9OUyA9IFtcbiAgJ1wiTWFzc2EgZGUgZmVybWVudGHDp8OjbyBuYXR1cmFsIDQ4aCwgbW9saG8gYXJ0ZXNhbmFsIGRlIHRvbWF0ZXMgU2FuIE1hcnphbm8gZSBmaW9yIGRpIGxhdHRlIGZyZXNjbyBtYcOnYXJpY2FkbyBuYSBob3JhLlwiJyxcbiAgJ1wiU21hc2ggc3VjdWxlbnRvIGNvbSBjcm9zdGEgY3JvY2FudGUgY2FyYW1lbGl6YWRhLCBxdWVpam8gY2hlZGRhciBpbmdsw6pzIGRlcnJldGlkbyBlIGZhdGlhcyBkZSBiYWNvbiBhcnRlc2FuYWwgZGVmdW1hZG8gZW0gbGVuaGEgbm9icmUuXCInLFxuICAnXCJTYWxtw6NvIGZyZXNjbyBzZWxlY2lvbmFkbyBjb3J0YWRvIGVtIGN1Ym9zIGdyZWxoYWRvcywgYWNvbXBhbmhhZG8gZGUgZWRhbWFtZSBjcm9jYW50ZSwgbMOibWluYXMgZGUgYWJhY2F0ZSBoYXNzIGUgZ2VyZ2VsaW0gdG9zdGFkby5cIicsXG5dO1xuXG5jb25zdCBDQVRBTE9HX1RBR1M6IHsgaWQ6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgaWNvbj86IHN0cmluZzsgaXNGaXJlPzogYm9vbGVhbjsgaXNXYXJuaW5nPzogYm9vbGVhbiB9W10gPSBbXG4gIHsgaWQ6IFwiVG9kb3NcIiwgbGFiZWw6IGBUb2RvcyBvcyBJdGVucyAoJHtcIjZcIn0pYCB9LFxuICB7IGlkOiBcIk1haXMgVmVuZGlkb3NcIiwgbGFiZWw6IFwiTWFpcyBWZW5kaWRvcyBubyBpRm9vZFwiLCBpY29uOiBcImxvY2FsX2ZpcmVfZGVwYXJ0bWVudFwiLCBpc0ZpcmU6IHRydWUgfSxcbiAgeyBpZDogXCJQcmF0b3MgUHJpbmNpcGFpc1wiLCBsYWJlbDogXCJQcmF0b3MgUHJpbmNpcGFpc1wiIH0sXG4gIHsgaWQ6IFwiQmViaWRhcyAmIERyaW5rc1wiLCBsYWJlbDogXCJCZWJpZGFzICYgRHJpbmtzXCIgfSxcbiAgeyBpZDogXCJTb2JyZW1lc2FzXCIsIGxhYmVsOiBcIlNvYnJlbWVzYXNcIiB9LFxuICB7IGlkOiBcIkJhaXhvIEVzdG9xdWVcIiwgbGFiZWw6IFwiQmFpeG8gRXN0b3F1ZVwiLCBpY29uOiBcIndhcm5pbmdcIiwgaXNXYXJuaW5nOiB0cnVlIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gQ2F0YWxvZ1NjcmVlbigpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gc2lnbmFsKFwiXCIpO1xuICBjb25zdCBbc2VsZWN0ZWRUYWcsIHNldFNlbGVjdGVkVGFnXSA9IHNpZ25hbChcIlRvZG9zXCIpO1xuICBjb25zdCBbcHJpY2VDaGFubmVsLCBzZXRQcmljZUNoYW5uZWxdID0gc2lnbmFsPFwiaWZvb2RcIiB8IFwiYmFsY2FvXCI+KFwiaWZvb2RcIik7XG4gIGNvbnN0IFtpc1N5bmNpbmcsIHNldElzU3luY2luZ10gPSBzaWduYWwoZmFsc2UpO1xuICBjb25zdCBbY29weUluZGV4LCBzZXRDb3B5SW5kZXhdID0gc2lnbmFsKDApO1xuXG4gIGNvbnN0IGhhbmRsZVN5bmMgPSAoKSA9PiB7XG4gICAgc2V0SXNTeW5jaW5nKHRydWUpO1xuICAgIHNob3dUb2FzdChcIlNpbmNyb25pemHDp8OjbyBlbSBBbmRhbWVudG9cIiwgXCJDb25lY3RhbmRvIGFvIGlGb29kIE1hcmtldHBsYWNlIGUgVG90dnMgUHJvdGhldXMuLi5cIiwgXCJpbmZvXCIpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0SXNTeW5jaW5nKGZhbHNlKTtcbiAgICAgIHNob3dUb2FzdChcIkNhcmTDoXBpbyAmIEVzdG9xdWUgU2luY3Jvbml6YWRvc1wiLCBcIjE0OCBpdGVucyB2YWxpZGFkb3MgZSBhdHVhbGl6YWRvcyBjb20gc3VjZXNzby5cIiwgXCJzdWNjZXNzXCIpO1xuICAgIH0sIDE0MDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZVByb2R1Y3QgPSAoaWQ6IHN0cmluZykgPT4ge1xuICAgIHNldFByb2R1Y3RzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+IHtcbiAgICAgICAgaWYgKHAuaWQgIT09IGlkKSByZXR1cm4gcDtcbiAgICAgICAgY29uc3QgbmV3U3RhdGUgPSAhcC5hY3RpdmVJbklmb29kO1xuICAgICAgICBzaG93VG9hc3QoXG4gICAgICAgICAgbmV3U3RhdGUgPyBcIlByb2R1dG8gQXRpdmFkbyBubyBpRm9vZFwiIDogXCJQcm9kdXRvIFBhdXNhZG8gbm8gaUZvb2RcIixcbiAgICAgICAgICBgJHtwLm5hbWV9IGFnb3JhIGVzdMOhICR7bmV3U3RhdGUgPyBcImRpc3BvbsOtdmVsIHBhcmEgcGVkaWRvc1wiIDogXCJwYXVzYWRvIG5hIGNvemluaGFcIn0uYCxcbiAgICAgICAgICBuZXdTdGF0ZSA/IFwic3VjY2Vzc1wiIDogXCJ3YXJuaW5nXCIsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7IC4uLnAsIGFjdGl2ZUluSWZvb2Q6IG5ld1N0YXRlIH07XG4gICAgICB9KSxcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbmRUb0NoYXQgPSAocHJvZHVjdDogUHJvZHVjdEl0ZW0pID0+IHtcbiAgICBzaG93VG9hc3QoXCJQcmF0byBBbmV4YWRvIGFvIENoYXRcIiwgYCR7cHJvZHVjdC5uYW1lfSAoJHtwcm9kdWN0Lmlmb29kUHJpY2V9KSBwcm9udG8gcGFyYSBlbnZpbyBubyBDaGF0IE9tbmljaGFubmVsLmApO1xuICAgIHJvdXRlci5wdXNoKFNDUkVFTl9ST1VURVNbXCJjaGF0LW9tbmljaGFubmVsXCJdKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVOZXh0Q29weSA9ICgpID0+IHtcbiAgICBjb25zdCBuZXh0ID0gKGNvcHlJbmRleCgpICsgMSkgJSBDT1BZX1ZBUklBVElPTlMubGVuZ3RoO1xuICAgIHNldENvcHlJbmRleChuZXh0KTtcbiAgICBzaG93VG9hc3QoXCJJQSBDb3BpbG90IFZlbmRhc1wiLCBcIk5vdmEgdmFyaWHDp8OjbyBnZXJhZGEgY29tIGZvY28gZW0gY29udmVyc8OjbyBkZSBjYXJkw6FwaW8hXCIpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgc206cC02IGxnOnAtOCBmbGV4IGZsZXgtY29sIGdhcC02IHctZnVsbCBtYXgtdy1bMTY4MHB4XSBteC1hdXRvXCI+XG4gICAgICB7LyogVG9wIEJyZWFkY3J1bWJzICYgT3BlcmF0aW9uYWwgQmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1sYWJlbC1tZFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPnJlc3RhdXJhbnRfbWVudTwvc3Bhbj5cbiAgICAgICAgICAgIENhdMOhbG9nbyBVbmlmaWNhZG9cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNHB4XVwiPmNoZXZyb25fcmlnaHQ8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZvbnQtc2VtaWJvbGRcIj5TaW5jcm9uaXphZG9yIEVSUCAmIGlGb29kIEFQSTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIHRleHQtb24tc3VyZmFjZSBmb250LWNvZGUtc20gZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgTm9kZTogQlItU1AtSkFSRElOUy0wMVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBtZDpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtbGFiZWwtc20gYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLXByaW1hcnkgYW5pbWF0ZS1waW5nXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+U3luYyBow6EgNDVzIOKAoiBVcHRpbWUgOTkuOCU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVN5bmN9XG4gICAgICAgICAgICBkaXNhYmxlZD17KCkgPT4gaXNTeW5jaW5nKCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1zbSBhY3RpdmU6c2NhbGUtOTUgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1wcmltYXJ5IHRleHQtWzE4cHhdICR7aXNTeW5jaW5nKCkgPyBcImFuaW1hdGUtc3BpblwiIDogXCJcIn1gfT5cbiAgICAgICAgICAgICAgc3luY1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+eygpID0+IChpc1N5bmNpbmcoKSA/IFwiU2luY3Jvbml6YW5kby4uLlwiIDogXCJTaW5jcm9uaXphciBBZ29yYVwiKX08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNob3dUb2FzdChcIkNvbmZpZ3VyYcOnw7VlcyBFUlBcIiwgXCJUb3R2cyBQcm90aGV1cyB2MTIuMSBjb25lY3RhZG8gYW8gRGVww7NzaXRvIENlbnRyYWwgMDEuXCIsIFwiaW5mb1wiKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2hlc3QgdGV4dC1vbi1zdXJmYWNlIGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF1cIj5zZXR0aW5nc19pbnB1dF9jb21wb3NpdGU8L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5Db25maWd1cmFyIEVSUDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd1RvYXN0KFwiTm92byBQcmF0b1wiLCBcIkFicmEgbyBmb3JtdWzDoXJpbyBkZSBjYWRhc3RybyBkZSBTS1UgcGFyYSBzaW5jcm9uaXphciBjb20gaUZvb2QgZSBUb3R2cy5cIiwgXCJpbmZvXCIpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zLjUgcHktMS41IHJvdW5kZWQteGwgYmctcHJpbWFyeS1jb250YWluZXIgaG92ZXI6YmctcHJpbWFyeSB0ZXh0LW9uLXByaW1hcnkgZm9udC10aXRsZS1tZCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctc20gYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+YWRkX2NpcmNsZTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPk5vdm8gUHJvZHV0bzwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEhlYWRlciBQcmluY2lwYWwgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCByb3VuZGVkLXhsIHAtNSBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctM3hsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi0xIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtbGcgdGV4dC1vbi1zdXJmYWNlIHRyYWNraW5nLXRpZ2h0IGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICBDYXTDoWxvZ28gZGUgUHJvZHV0b3MgJiBJbnRlZ3Jhw6fDtWVzIEVSUFxuICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc2Vjb25kYXJ5LWZpeGVkIHRleHQtb24tc2Vjb25kYXJ5LWZpeGVkIGZvbnQtbGFiZWwtc20gZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICBWIDQuOCBMaXZlXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1ib2R5LW1kIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgU2luY3Jvbml6YcOnw6NvIGJpZGlyZWNpb25hbCBlbSB0ZW1wbyByZWFsIGNvbSBpRm9vZCBNYXJrZXRwbGFjZSwgVG90dnMgUHJvdGhldXMsIEJsaW5nLCBUaW55IGUgV2hhdHNBcHAgQ29tbWVyY2UuXG4gICAgICAgICAgICBBanVzdGUgZGlzcG9uaWJpbGlkYWRlcyBkZSBjb3ppbmhhLCBjcmllIHByb21vw6fDtWVzIGUgYW5leGUgaXRlbnMgZGlyZXRhbWVudGUgbmEgY29udmVyc2EgZG8gY2xpZW50ZS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNw6l0cmljYXMgQ29tcGFjdGFzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHNtOmdhcC00IHAtMi41IGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHB4LTIgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWxhYmVsLXNtXCI+SXRlbnMgbm8gaUZvb2Q8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLW1kIHRleHQtb24tc3VyZmFjZSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgMTQ4IDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC10ZXJ0aWFyeVwiPmF0aXZvczwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctcHggaC04IGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2hlc3RcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgcHgtMiB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtbGFiZWwtc21cIj5UYXhhIGRlIENvbnZlcnPDo288L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLW1kIHRleHQtcHJpbWFyeSBmb250LWJvbGRcIj4yNC42JTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctcHggaC04IGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2hlc3RcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgcHgtMiB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtbGFiZWwtc21cIj5SdXB0dXJhIEVzdG9xdWU8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLW1kIGZvbnQtYm9sZCB0ZXh0LXJlZC02MDBcIj4wLjglPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSHViIGRlIENvbmV4w7VlcyBBdGl2YXMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgeGw6Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTQgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBncm91cFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC14bCBiZy1lcnJvci1jb250YWluZXIvNjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1lcnJvciB0ZXh0LVsjRUExRDJDXVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjRweF1cIj5kZWxpdmVyeV9kaW5pbmc8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPmlGb29kIEphcmRpbnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5IGFuaW1hdGUtcHVsc2VcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtbW9ub1wiPklEICM4OTQyLVNQPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtcHJpbWFyeSBmb250LWxhYmVsLXNtIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgV2ViaG9vayAxMDAlXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHB0LTIgYm9yZGVyLXQgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8xNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1sYWJlbC1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlxuICAgICAgICAgICAgPHNwYW4+MTQ4IGl0ZW5zIHNpbmNyb25pemFkb3M8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXRlcnRpYXJ5IGZvbnQtbWVkaXVtXCI+Q2FyZMOhcGlvIE9maWNpYWwg4oCiIE9ubGluZTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTQgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBncm91cFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC14bCBiZy1wcmltYXJ5LWZpeGVkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtcHJpbWFyeSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzI0cHhdXCI+ZGF0YWJhc2U8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5Ub3R2cyBQcm90aGV1cyBFUlA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtbW9ub1wiPlJFU1QgQVBJIHYxMi4xPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtdGVydGlhcnkgZm9udC1sYWJlbC1zbSBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgIFNhbGRvIFJlYWxcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcHQtMiBib3JkZXItdCBib3JkZXItb3V0bGluZS12YXJpYW50LzE1IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICA8c3Bhbj5EZXDDs3NpdG8gQ2VudHJhbCAjMDE8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZm9udC1tZWRpdW1cIj5BdXRvLWJhaXhhIGRlIGVzdG9xdWU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHJvdW5kZWQteGwgcC00IHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBob3ZlcjpzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gZ3JvdXBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQteGwgYmctc2Vjb25kYXJ5LWZpeGVkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtc2Vjb25kYXJ5IGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjRweF1cIj5yZWNlaXB0X2xvbmc8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5CbGluZyEgRmlzY2FsIEh1Yjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWNvZGUtc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1tb25vXCI+TkZDLWUgQXV0b23DoXRpY2E8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1sYWJlbC1zbSBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgIFNFRkFaIE9LXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHB0LTIgYm9yZGVyLXQgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8xNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1sYWJlbC1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlxuICAgICAgICAgICAgPHNwYW4+U8OpcmllIDAwMyBlbWl0aWRhPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1vbi1zdXJmYWNlIGZvbnQtbWVkaXVtXCI+VGVtcG8gbcOpZGlvIDEuMnM8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHJvdW5kZWQteGwgcC00IHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBob3ZlcjpzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gZ3JvdXBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQteGwgYmctdGVydGlhcnktZml4ZWQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC10ZXJ0aWFyeSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzI0cHhdXCI+Y2hhdF9idWJibGU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5XaGF0c0FwcCBDYXRhbG9nPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LW1vbm9cIj5DbG91ZCBBUEkgTWV0YTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LXRlcnRpYXJ5IGZvbnQtbGFiZWwtc20gZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAxMDAlIFBhcmVhZG9cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcHQtMiBib3JkZXItdCBib3JkZXItb3V0bGluZS12YXJpYW50LzE1IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICA8c3Bhbj5DaGVja291dCB2aWEgQm90PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZvbnQtbWVkaXVtXCI+UGl4IG5hdGl2byBhdGl2bzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1haW4gV29ya3NwYWNlICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHhsOmdyaWQtY29scy0xMiBnYXAtNiBpdGVtcy1zdGFydFwiPlxuICAgICAgICB7LyogQ29sdW5hIEVzcXVlcmRhOiBGaWx0cm9zIGUgVGFiZWxhICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInhsOmNvbC1zcGFuLTggZmxleCBmbGV4LWNvbCBnYXAtNFwiPlxuICAgICAgICAgIHsvKiBCYXJyYSBkZSBCdXNjYSAmIEZpbHRyb3MgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTQgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBnYXAtM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGl0ZW1zLWNlbnRlciBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgcm91bmRlZC14bCBweC0zLjUgcHktMiBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkvMjAgdHJhbnNpdGlvbi1hbGxcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtb24tc3VyZmFjZS12YXJpYW50IG1yLTIgdGV4dC1bMjBweF1cIj5zZWFyY2g8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gc2VhcmNoUXVlcnkoKX1cbiAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9eyhldmVudCkgPT4gc2V0U2VhcmNoUXVlcnkoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkJ1c2NhciBwcm9kdXRvIHBvciBub21lLCBjw7NkaWdvIFNLVSwgaW5ncmVkaWVudGUgb3UgY2F0ZWdvcmlhIEVSUC4uLlwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctdHJhbnNwYXJlbnQgYm9yZGVyLW5vbmUgb3V0bGluZS1ub25lIGZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2UgcGxhY2Vob2xkZXI6dGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQvNzBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGtiZCBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lLWJsb2NrIGZvbnQtY29kZS1zbSBweC0xLjUgcHktMC41IHJvdW5kZWQgYmctc3VyZmFjZS1jb250YWluZXItaGlnaGVzdCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlxuICAgICAgICAgICAgICAgICAgQ3RybCAvXG4gICAgICAgICAgICAgICAgPC9rYmQ+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTZWxldG9yIGRlIENhbmFsIGRlIFByZcOnbyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgcm91bmRlZC14bCBwLTEgc2hyaW5rLTAgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICAgICAgICB7KFtcImlmb29kXCIsIFwiYmFsY2FvXCJdIGFzIGNvbnN0KS5tYXAoKGNoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBwcmljZUNoYW5uZWwoKSA9PT0gY2hhbm5lbDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NoYW5uZWx9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UHJpY2VDaGFubmVsKGNoYW5uZWwpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcInB4LTMgcHktMS41IHJvdW5kZWQtbGcgZm9udC10aXRsZS1tZCB0cmFuc2l0aW9uLWFsbCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgc2hhZG93LXNtIHRleHQtcHJpbWFyeSBmb250LWJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwicHgtMyBweS0xLjUgcm91bmRlZC1sZyBmb250LXRpdGxlLW1kIHRyYW5zaXRpb24tYWxsIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGhvdmVyOnRleHQtb24tc3VyZmFjZVwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2NoYW5uZWwgPT09IFwiaWZvb2RcIiA/IFwiQ2FyZMOhcGlvIGlGb29kXCIgOiBcIldoYXRzQXBwIC8gQmFsY8Ojb1wifVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBUYWdzIGRlIEZpbHRybyBSw6FwaWRvICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBvdmVyZmxvdy14LWF1dG8gcGItMSB0ZXh0LW5vd3JhcCBzY3JvbGxiYXItbm9uZVwiPlxuICAgICAgICAgICAgICB7Q0FUQUxPR19UQUdTLm1hcCgodGFnKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkVGFnKCkgPT09IHRhZy5pZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e3RhZy5pZH1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkVGFnKHRhZy5pZCl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwicHgtMyBweS0xIHJvdW5kZWQtZnVsbCBmb250LWxhYmVsLW1kIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHNocmluay0wIGJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IHNoYWRvdy1zbSBmb250LWJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0YWcuaXNXYXJuaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJweC0zIHB5LTEgcm91bmRlZC1mdWxsIGZvbnQtbGFiZWwtbWQgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgc2hyaW5rLTAgYmctZXJyb3ItY29udGFpbmVyLzQwIGhvdmVyOmJnLWVycm9yLWNvbnRhaW5lciB0ZXh0LW9uLWVycm9yLWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJweC0zIHB5LTEgcm91bmRlZC1mdWxsIGZvbnQtbGFiZWwtbWQgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgc2hyaW5rLTAgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3RhZy5pY29uICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE2cHhdICR7dGFnLmlzRmlyZSA/IFwidGV4dC1hbWJlci02MDBcIiA6IFwidGV4dC1lcnJvclwifWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3RhZy5pY29ufVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3RhZy5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIExpc3RhIGRlIFByb2R1dG9zICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMi41XCI+XG4gICAgICAgICAgICB7KCkgPT5cbiAgICAgICAgICAgICAgcHJvZHVjdHMoKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKHApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXNTZWFyY2ggPVxuICAgICAgICAgICAgICAgICAgICBwLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeSgpLnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgICAgICAgICAgICAgIHAuc2t1LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkoKS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICAgICAgICAgICAgICBwLmNhdGVnb3J5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkoKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2hlc1NlYXJjaCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGFnKCkgPT09IFwiTWFpcyBWZW5kaWRvc1wiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcC5yYXRpbmdCYWRnZT8uaW5jbHVkZXMoXCJNYWlzIFBlZGlkb1wiKSB8fCBwLnJhdGluZ0JhZGdlPy5pbmNsdWRlcyhcIlRvcCAxXCIpO1xuICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGFnKCkgPT09IFwiUHJhdG9zIFByaW5jaXBhaXNcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuY2F0ZWdvcnkuaW5jbHVkZXMoXCJQaXp6YXNcIikgfHwgcC5jYXRlZ29yeS5pbmNsdWRlcyhcIlRyYWRpY2lvbmFpc1wiKSB8fCBwLmNhdGVnb3J5LmluY2x1ZGVzKFwiQm93bHNcIik7XG4gICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRUYWcoKSA9PT0gXCJCZWJpZGFzICYgRHJpbmtzXCIpIHJldHVybiBwLmNhdGVnb3J5LmluY2x1ZGVzKFwiQmViaWRhc1wiKTtcbiAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFRhZygpID09PSBcIlNvYnJlbWVzYXNcIikgcmV0dXJuIHAuY2F0ZWdvcnkuaW5jbHVkZXMoXCJTb2JyZW1lc2FzXCIpO1xuICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGFnKCkgPT09IFwiQmFpeG8gRXN0b3F1ZVwiKSByZXR1cm4gQm9vbGVhbihwLmxvd1N0b2NrKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm1hcCgocHJvZHVjdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTQgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IG1kOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgZ3JvdXAgJHsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICFwcm9kdWN0LmFjdGl2ZUluSWZvb2QgPyBcIm9wYWNpdHktODAgYmctc3VyZmFjZS1jb250YWluZXItbG93LzQwXCIgOiBcIlwifWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMuNSBtaW4tdy0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xNiBoLTE2IHJvdW5kZWQteGwgb2JqZWN0LWNvdmVyIHNoYWRvdy1pbm5lciBzaHJpbmstMCByaW5nLTEgcmluZy1vdXRsaW5lLXZhcmlhbnQvMjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtwcm9kdWN0Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM9e3Byb2R1Y3QuaW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1sZyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkIHRydW5jYXRlXCI+e3Byb2R1Y3QubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LnJhdGluZ0JhZGdlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCB0ZXh0LXByaW1hcnkgZm9udC1sYWJlbC1zbSBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvZHVjdC5yYXRpbmdCYWRnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LnRhZyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtbGFiZWwtc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LnRhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgbXQtMSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWJvZHktc20gZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbSBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgcHgtMS41IHB5LTAuNSByb3VuZGVkIHRleHQtb24tc3VyZmFjZSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNLVToge3Byb2R1Y3Quc2t1fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNhdDoge3Byb2R1Y3QuY2F0ZWdvcnl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xICR7cHJvZHVjdC5sb3dTdG9jayA/IFwidGV4dC1yZWQtNjAwXCIgOiBcInRleHQtdGVydGlhcnlcIn1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE0cHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvZHVjdC5sb3dTdG9jayA/IFwid2FybmluZ1wiIDogXCJpbnZlbnRvcnlfMlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvZHVjdC5zdG9ja1RleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtZDpqdXN0aWZ5LWVuZCBnYXAtNSB3LWZ1bGwgbWQ6dy1hdXRvIGJvcmRlci10IG1kOmJvcmRlci10LTAgcHQtMiBtZDpwdC0wIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogUHJlw6dvcyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWJhc2VsaW5lIGdhcC0xIGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbGcgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcmljZUNoYW5uZWwoKSA9PT0gXCJpZm9vZFwiID8gcHJvZHVjdC5pZm9vZFByaWNlIDogcHJvZHVjdC5iYWxjYW9QcmljZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtdGVydGlhcnkgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7cHJpY2VDaGFubmVsKCkgPT09IFwiaWZvb2RcIiA/IFwiaUZvb2RcIiA6IFwiQmFsY8Ojb1wifSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtY29kZS1zbSBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5CYWxjw6NvOiB7cHJvZHVjdC5iYWxjYW9QcmljZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSBmb250LXNlbWlib2xkXCI+e3Byb2R1Y3QubWFyZ2luVGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBTd2l0Y2ggUGF1c2FyIG5vIGlGb29kICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgbWItMC41XCI+aUZvb2QgTG9qYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXsoKSA9PiBwcm9kdWN0LmFjdGl2ZUluSWZvb2R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBoYW5kbGVUb2dnbGVQcm9kdWN0KHByb2R1Y3QuaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdC5hY3RpdmVJbklmb29kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwidy05IGgtNSBiZy1wcmltYXJ5IHJvdW5kZWQtZnVsbCBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXIgcmVsYXRpdmUgc2hhZG93LWlubmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJ3LTkgaC01IGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2hlc3Qgcm91bmRlZC1mdWxsIGFwcGVhcmFuY2Utbm9uZSBjdXJzb3ItcG9pbnRlciByZWxhdGl2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogQcOnw7VlcyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVNlbmRUb0NoYXQocHJvZHVjdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRW52aWFyIG5vIENoYXQgcGFyYSBDbGllbnRlIEF0dWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXByaW1hcnkgaG92ZXI6dGV4dC1vbi1wcmltYXJ5IHRleHQtb24tc3VyZmFjZSB0cmFuc2l0aW9uLWFsbCBhY3RpdmU6c2NhbGUtOTAgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzIwcHhdXCI+c2VuZF9hbmRfYXJjaGl2ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb2FzdChcIkNyaWFyIENhbXBhbmhhXCIsIGBJbmljaWFuZG8gZGlzcGFybyBzZWdtZW50YWRvIHBhcmEgJHtwcm9kdWN0Lm5hbWV9YCwgXCJpbmZvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKFNDUkVFTl9ST1VURVNbXCJlc3R1ZGlvLWJhbm5lcnNcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkNyaWFyIENhbXBhbmhhIGRlIERpc3Bhcm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaGVzdCB0ZXh0LW9uLXN1cmZhY2UgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzIwcHhdXCI+Y2FtcGFpZ248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFBhZ2luYcOnw6NvICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCByb3VuZGVkLXhsIHAtNCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZm9udC1sYWJlbC1tZCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlxuICAgICAgICAgICAgPHNwYW4+RXhpYmluZG8geygpID0+IHByb2R1Y3RzKCkubGVuZ3RofSBkZSAxNDggcHJhdG9zIGludGVncmFkb3MgdmlhIFRvdHZzL2lGb29kPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkaXNhYmxlZCBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyB0ZXh0LW9uLXN1cmZhY2UgZGlzYWJsZWQ6b3BhY2l0eS00MFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF1cIj5jaGV2cm9uX2xlZnQ8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXByaW1hcnktY29udGFpbmVyIHRleHQtb24tcHJpbWFyeSBmb250LWJvbGRcIj4xPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZVwiPjI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlXCI+MzwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW9uLXN1cmZhY2VcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+Y2hldnJvbl9yaWdodDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENvbHVuYSBEaXJlaXRhOiBJQSBDb3BpbG90ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInhsOmNvbC1zcGFuLTQgZmxleCBmbGV4LWNvbCBnYXAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHJvdW5kZWQteGwgcC01IHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbCBnYXAtNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTEyIC1yaWdodC0xMiB3LTM2IGgtMzYgcm91bmRlZC1mdWxsIGJnLXByaW1hcnktY29udGFpbmVyLzEwIGJsdXItMnhsIHBvaW50ZXItZXZlbnRzLW5vbmVcIj48L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC14bCBiZy1ncmFkaWVudC10by10ciBmcm9tLXByaW1hcnkgdG8tcHJpbWFyeS1jb250YWluZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1vbi1wcmltYXJ5IHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPmF1dG9fYXdlc29tZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPklBIENvcGlsb3QgVmVuZGFzPC9oMj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC10ZXJ0aWFyeSBmb250LXNlbWlib2xkXCI+T3RpbWl6YWRvciBkZSBDYXJkw6FwaW8gQXRpdm88L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCB0ZXh0LXByaW1hcnkgZm9udC1jb2RlLXNtIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIEdQVC00byBPbW5pXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogSW5zaWdodCAxICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGZsZXgtY29sIGdhcC0xLjUgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LWxhYmVsLXNtIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXByaW1hcnkgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE2cHhdXCI+dHJlbmRpbmdfdXA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICBBbGVydGEgZGUgRGVtYW5kYSBpRm9vZFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXRlcnRpYXJ5IGZvbnQtbGFiZWwtc20gZm9udC1zZW1pYm9sZFwiPiszOCUgUHJvY3VyYTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2UgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgTyBwcmF0byA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+UGl6emEgTWFyZ2hlcml0YSBFc3BlY2lhbDwvc3Ryb25nPiBhdGluZ2UgcGljb1xuICAgICAgICAgICAgICAgIGhpc3TDs3JpY28gw6BzIHNleHRhcyBlbnRyZSAxOWggZSAyMmguIFN1Z2VzdMOjbzogcHJvZ3JhbWFyIGRpc3Bhcm8gcmVsw6JtcGFnbyBkZSAxMiUgb2ZmIG5vIFdoYXRzQXBwIHBhcmFcbiAgICAgICAgICAgICAgICBjbGllbnRlcyBjb20gdGlja2V0IG3DqWRpbyAmZ3Q7IFIkIDcwLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd1RvYXN0KFwiRGlzcGFybyBBZ2VuZGFkb1wiLCBcIkNhbXBhbmhhIGRlIDEyJSBPRkYgcHJvZ3JhbWFkYSBwYXJhIHNleHRhLWZlaXJhIMOgcyAxODozMCB2aWEgV2hhdHNBcHAuXCIsIFwic3VjY2Vzc1wiKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0xLjUgcHgtMyByb3VuZGVkLWxnIGJnLXByaW1hcnktY29udGFpbmVyIGhvdmVyOmJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtIGFjdGl2ZTpzY2FsZS05NSB0ZXh0LWNlbnRlciBmb250LWJvbGRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIEFnZW5kYXIgRGlzcGFybyBTZWdtZW50YWRvXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBJbnNpZ2h0IDIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTEuNSByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbGFiZWwtc20gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtdGVydGlhcnkgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE2cHhdXCI+cG9pbnRfb2Zfc2FsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIFN1Z2VzdMOjbyBkZSBDb21ibyBJbnRlbGlnZW50ZVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXByaW1hcnkgZm9udC1jb2RlLXNtIGZvbnQtYm9sZFwiPk1hcmdlbSA2MiU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIEFncnVwYXIgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPlNtYXNoIEJ1cmdlciBEdXBsbyArIFN1Y28gZGUgTWFyYWN1asOhIDUwMG1sPC9zdHJvbmc+e1wiIFwifVxuICAgICAgICAgICAgICAgIHBvciA8c3Ryb25nPlIkIDU4LDkwPC9zdHJvbmc+IG5vIGlGb29kLiBJc3NvIGdlcmEgK1IkIDE0IGRlIG1hcmdlbSBsw61xdWlkYSBwb3IgcGVkaWRvIHNlbSBhdW1lbnRhciBjYXJnYSBkYSBjaGFwYS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd1RvYXN0KFwiQ29tYm8gQ3JpYWRvXCIsIFwiQ29tYm8gU21hc2ggQnVyZ2VyICsgU3VjbyBjcmlhZG8gbm8gaUZvb2QgZSBwcm92aXNpb25hZG8gbm8gVG90dnMgRVJQIVwiLCBcInN1Y2Nlc3NcIil9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTEuNSBweC0zIHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoZXN0IHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIHRyYW5zaXRpb24tYWxsIHRleHQtY2VudGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF1cIj5hZGRfc2hvcHBpbmdfY2FydDwvc3Bhbj5cbiAgICAgICAgICAgICAgICBDcmlhciBDb21ibyBubyBpRm9vZCAmIFRvdHZzXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBSZWRhdG9yIEFwZXRpdG9zbyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBmbGV4LWNvbCBnYXAtMS41IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbGFiZWwtc20gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF1cIj5lZGl0X25vdGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgUmVkYXRvciBBcGV0aXRvc28gZGUgQ2FyZMOhcGlvXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICAgICAgUmVlc2NyZXZhIGluZ3JlZGllbnRlcyBwYXJhIGVsZXZhciB0YXhhcyBkZSBjbGlxdWUgbm8gY2FyZMOhcGlvIGRpZ2l0YWwgZG8gV2hhdHNBcHAgZSBJbnN0YWdyYW06XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3QgcC0yLjUgcm91bmRlZC1sZyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2R5LXNtIGl0YWxpYyBib3JkZXItbC0yIGJvcmRlci1wcmltYXJ5LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIHsoKSA9PiBDT1BZX1ZBUklBVElPTlNbY29weUluZGV4KCldfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBwdC0xXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVOZXh0Q29weX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0xLjUgcHgtMiByb3VuZGVkLWxnIGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaGVzdCB0ZXh0LW9uLXN1cmZhY2UgZm9udC10aXRsZS1tZCB0cmFuc2l0aW9uLWFsbCB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgR2VyYXIgVmFyaWHDp8Ojb1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd1RvYXN0KFwiVGV4dG8gU2Fsdm9cIiwgXCJEZXNjcmnDp8OjbyBhcGxpY2FkYSBubyBpdGVtIHNlbGVjaW9uYWRvIG5vIGlGb29kIVwiLCBcInN1Y2Nlc3NcIil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweS0xLjUgcHgtMyByb3VuZGVkLWxnIGJnLXByaW1hcnktY29udGFpbmVyIGhvdmVyOmJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1hbGwgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiQXBsaWNhciBubyBQcm9kdXRvXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBTYWx2YXJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE9mZXJ0YSBSZWzDom1wYWdvICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLXByaW1hcnkgdG8tdGVydGlhcnkgcC00IHJvdW5kZWQteGwgdGV4dC1vbi1wcmltYXJ5IGZsZXggZmxleC1jb2wgZ2FwLTIgcmVsYXRpdmUgei0xMCBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXRpdGxlLW1kIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPmJvbHQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICBEaXNwYXJvIFJlbMOibXBhZ28gMS1DbGlja1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiZy1vbi1wcmltYXJ5LzIwIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBmb250LWxhYmVsLXNtXCI+T21uaSBTZW5kPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tcHJpbWFyeS85MFwiPlxuICAgICAgICAgICAgICAgIERpc3BhcmEgY2FyZCBpbnRlcmF0aXZvIGNvbSBib3TDo28gJ1BlZGlyIEFnb3JhIHZpYSBpRm9vZC9XaGF0cycgcGFyYSBvcyDDumx0aW1vcyAyNTAgY2xpZW50ZXMgcXVlIHBlZGlyYW1cbiAgICAgICAgICAgICAgICBuYXMgw7psdGltYXMgNCBzZW1hbmFzLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93VG9hc3QoXCJPZmVydGEgTGFuw6dhZGFcIiwgXCJEaXNwYXJvIGVudmlhZG8gcGFyYSBhIGZpbGEgZGUgdHJhbnNtaXNzw6NvIGRlIDI1MCBjbGllbnRlcy5cIiwgXCJzdWNjZXNzXCIpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yIHB4LTMgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3QgdGV4dC1wcmltYXJ5IGhvdmVyOmJnLXN1cmZhY2UgZm9udC10aXRsZS1tZCBmb250LWJvbGQgc2hhZG93LXNtIHRyYW5zaXRpb24tYWxsIHRleHQtY2VudGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIExhbsOnYXIgT2ZlcnRhIFJlbMOibXBhZ29cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTdGF0dXMgZGUgV2ViaG9va3MgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTQgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPkludGVncmlkYWRlIGRlIFJlZGUgJiBBUElzPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5IGFuaW1hdGUtcHVsc2VcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG10LTEgZm9udC1ib2R5LXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+aUZvb2QgUG9sbGluZyAmIEhlYXJ0YmVhdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXRlcnRpYXJ5IGZvbnQtc2VtaWJvbGQgZm9udC1jb2RlLXNtXCI+MThtcyAvIE9LPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBoLTEuNSByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1wcmltYXJ5LWNvbnRhaW5lciBoLWZ1bGwgdy1bOTklXVwiPjwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgcHQtMVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlRvdHZzIFByb3RoZXVzIFNvY2tldDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXRlcnRpYXJ5IGZvbnQtc2VtaWJvbGQgZm9udC1jb2RlLXNtXCI+NDJtcyAvIEVzdMOhdmVsPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBoLTEuNSByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zZWNvbmRhcnktY29udGFpbmVyIGgtZnVsbCB3LVs5OCVdXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59IiwiXG5pbXBvcnQgKiBhcyBjbGllbnRNb2R1bGUgZnJvbSBcIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL29tbmktaHViL2NhdGFsb2ctc2NyZWVuLnRzeFwiO1xuaW1wb3J0IHsgaHlkcmF0ZUNsaWVudENvbXBvbmVudHMgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuXG5oeWRyYXRlQ2xpZW50Q29tcG9uZW50cyhcImNvbXBvbmVudHMvb21uaS1odWIvY2F0YWxvZy1zY3JlZW5cIiwgY2xpZW50TW9kdWxlKTtcbmV4cG9ydCB7fTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBLE1BQU0sa0JBQWtCO0NBQ3RCO0NBQ0E7Q0FDQTtBQUNGO0FBRUEsTUFBTSxlQUFzRztDQUMxRztFQUFFLElBQUk7RUFBUyxPQUFPO0NBQTBCO0NBQ2hEO0VBQUUsSUFBSTtFQUFpQixPQUFPO0VBQTBCLE1BQU07RUFBeUIsUUFBUTtDQUFLO0NBQ3BHO0VBQUUsSUFBSTtFQUFxQixPQUFPO0NBQW9CO0NBQ3REO0VBQUUsSUFBSTtFQUFvQixPQUFPO0NBQW1CO0NBQ3BEO0VBQUUsSUFBSTtFQUFjLE9BQU87Q0FBYTtDQUN4QztFQUFFLElBQUk7RUFBaUIsT0FBTztFQUFpQixNQUFNO0VBQVcsV0FBVztDQUFL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