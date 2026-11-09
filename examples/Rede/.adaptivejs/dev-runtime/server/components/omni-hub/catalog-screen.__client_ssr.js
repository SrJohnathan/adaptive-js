import { signal, useRouter } from "@adaptive-js/web";
import { products, setProducts } from "../../shared/omni-hub/catalog-store.js?t=1791414636356";
import { showToast } from "../../shared/omni-hub/toast-store.js?t=1791414636356";
import { SCREEN_ROUTES } from "../../shared/omni-hub/types.js?t=1791414636356";
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
const COPY_VARIATIONS = [
	"\"Massa de fermentação natural 48h, molho artesanal de tomates San Marzano e fior di latte fresco maçaricado na hora.\"",
	"\"Smash suculento com crosta crocante caramelizada, queijo cheddar inglês derretido e fatias de bacon artesanal defumado em lenha nobre.\"",
	"\"Salmão fresco selecionado cortado em cubos grelhados, acompanhado de edamame crocante, lâminas de abacate hass e gergelim tostado.\""
];
const CATALOG_TAGS = [
	{
		id: "Todos",
		label: `Todos os Itens (${"6"})`
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
export function CatalogScreen() {
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
	return /* @__PURE__ */ _jsxs("div", {
		className: "p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1680px] mx-auto",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "flex items-center gap-2 text-on-surface-variant font-label-md",
					children: [
						/* @__PURE__ */ _jsxs("span", {
							className: "flex items-center gap-1 hover:text-primary transition-colors cursor-pointer",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[18px]",
								children: "restaurant_menu"
							}), "Catálogo Unificado"]
						}),
						/* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[14px]",
							children: "chevron_right"
						}),
						/* @__PURE__ */ _jsx("span", {
							className: "text-primary font-semibold",
							children: "Sincronizador ERP & iFood API"
						}),
						/* @__PURE__ */ _jsx("span", {
							className: "hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-code-sm font-semibold",
							children: "Node: BR-SP-JARDINS-01"
						})
					]
				}), /* @__PURE__ */ _jsxs("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [
						/* @__PURE__ */ _jsxs("div", {
							className: "hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm border border-outline-variant/20",
							children: [/* @__PURE__ */ _jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-ping" }), /* @__PURE__ */ _jsx("span", { children: "Sync há 45s • Uptime 99.8%" })]
						}),
						/* @__PURE__ */ _jsxs("button", {
							type: "button",
							onClick: handleSync,
							disabled: () => isSyncing(),
							className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md transition-all shadow-sm active:scale-95 border border-outline-variant/20",
							children: [/* @__PURE__ */ _jsx("span", {
								className: `material-symbols-outlined text-primary text-[18px] ${isSyncing() ? "animate-spin" : ""}`,
								children: "sync"
							}), /* @__PURE__ */ _jsx("span", { children: () => isSyncing() ? "Sincronizando..." : "Sincronizar Agora" })]
						}),
						/* @__PURE__ */ _jsxs("button", {
							type: "button",
							onClick: () => showToast("Configurações ERP", "Totvs Protheus v12.1 conectado ao Depósito Central 01.", "info"),
							className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[18px]",
								children: "settings_input_composite"
							}), /* @__PURE__ */ _jsx("span", { children: "Configurar ERP" })]
						}),
						/* @__PURE__ */ _jsxs("button", {
							type: "button",
							onClick: () => showToast("Novo Prato", "Abra o formulário de cadastro de SKU para sincronizar com iFood e Totvs.", "info"),
							className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm active:scale-95",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[18px]",
								children: "add_circle"
							}), /* @__PURE__ */ _jsx("span", { children: "Novo Produto" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "max-w-3xl",
					children: [/* @__PURE__ */ _jsxs("div", {
						className: "flex items-center gap-2 mb-1 flex-wrap",
						children: [/* @__PURE__ */ _jsx("h1", {
							className: "font-headline-lg text-on-surface tracking-tight font-bold",
							children: "Catálogo de Produtos & Integrações ERP"
						}), /* @__PURE__ */ _jsx("span", {
							className: "inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-semibold",
							children: "V 4.8 Live"
						})]
					}), /* @__PURE__ */ _jsx("p", {
						className: "text-on-surface-variant font-body-md leading-relaxed",
						children: "Sincronização bidirecional em tempo real com iFood Marketplace, Totvs Protheus, Bling, Tiny e WhatsApp Commerce. Ajuste disponibilidades de cozinha, crie promoções e anexe itens diretamente na conversa do cliente."
					})]
				}), /* @__PURE__ */ _jsxs("div", {
					className: "flex items-center gap-3 sm:gap-4 p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20",
					children: [
						/* @__PURE__ */ _jsxs("div", {
							className: "flex flex-col px-2 text-left",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "text-on-surface-variant font-label-sm",
								children: "Itens no iFood"
							}), /* @__PURE__ */ _jsxs("span", {
								className: "font-headline-md text-on-surface font-bold",
								children: ["148 ", /* @__PURE__ */ _jsx("span", {
									className: "font-label-sm text-tertiary",
									children: "ativos"
								})]
							})]
						}),
						/* @__PURE__ */ _jsx("div", { className: "w-px h-8 bg-surface-container-highest" }),
						/* @__PURE__ */ _jsxs("div", {
							className: "flex flex-col px-2 text-left",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "text-on-surface-variant font-label-sm",
								children: "Taxa de Conversão"
							}), /* @__PURE__ */ _jsx("span", {
								className: "font-headline-md text-primary font-bold",
								children: "24.6%"
							})]
						}),
						/* @__PURE__ */ _jsx("div", { className: "w-px h-8 bg-surface-container-highest" }),
						/* @__PURE__ */ _jsxs("div", {
							className: "flex flex-col px-2 text-left",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "text-on-surface-variant font-label-sm",
								children: "Ruptura Estoque"
							}), /* @__PURE__ */ _jsx("span", {
								className: "font-headline-md font-bold text-red-600",
								children: "0.8%"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ _jsx("div", {
									className: "w-10 h-10 rounded-xl bg-error-container/60 flex items-center justify-center text-error text-[#EA1D2C]",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "delivery_dining"
									})
								}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "font-title-md text-on-surface font-semibold",
										children: "iFood Jardins"
									}), /* @__PURE__ */ _jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" })]
								}), /* @__PURE__ */ _jsx("span", {
									className: "font-code-sm text-on-surface-variant font-mono",
									children: "ID #8942-SP"
								})] })]
							}), /* @__PURE__ */ _jsx("span", {
								className: "px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm font-semibold",
								children: "Webhook 100%"
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant",
							children: [/* @__PURE__ */ _jsx("span", { children: "148 itens sincronizados" }), /* @__PURE__ */ _jsx("span", {
								className: "text-tertiary font-medium",
								children: "Cardápio Oficial • Online"
							})]
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ _jsx("div", {
									className: "w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-bold",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "database"
									})
								}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("div", {
									className: "flex items-center gap-1",
									children: /* @__PURE__ */ _jsx("span", {
										className: "font-title-md text-on-surface font-semibold",
										children: "Totvs Protheus ERP"
									})
								}), /* @__PURE__ */ _jsx("span", {
									className: "font-code-sm text-on-surface-variant font-mono",
									children: "REST API v12.1"
								})] })]
							}), /* @__PURE__ */ _jsx("span", {
								className: "px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm font-semibold",
								children: "Saldo Real"
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant",
							children: [/* @__PURE__ */ _jsx("span", { children: "Depósito Central #01" }), /* @__PURE__ */ _jsx("span", {
								className: "text-primary font-medium",
								children: "Auto-baixa de estoque"
							})]
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ _jsx("div", {
									className: "w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary font-bold",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "receipt_long"
									})
								}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("div", {
									className: "flex items-center gap-1",
									children: /* @__PURE__ */ _jsx("span", {
										className: "font-title-md text-on-surface font-semibold",
										children: "Bling! Fiscal Hub"
									})
								}), /* @__PURE__ */ _jsx("span", {
									className: "font-code-sm text-on-surface-variant font-mono",
									children: "NFC-e Automática"
								})] })]
							}), /* @__PURE__ */ _jsx("span", {
								className: "px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm font-semibold",
								children: "SEFAZ OK"
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant",
							children: [/* @__PURE__ */ _jsx("span", { children: "Série 003 emitida" }), /* @__PURE__ */ _jsx("span", {
								className: "text-on-surface font-medium",
								children: "Tempo médio 1.2s"
							})]
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ _jsx("div", {
									className: "w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "chat_bubble"
									})
								}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("div", {
									className: "flex items-center gap-1",
									children: /* @__PURE__ */ _jsx("span", {
										className: "font-title-md text-on-surface font-semibold",
										children: "WhatsApp Catalog"
									})
								}), /* @__PURE__ */ _jsx("span", {
									className: "font-code-sm text-on-surface-variant font-mono",
									children: "Cloud API Meta"
								})] })]
							}), /* @__PURE__ */ _jsx("span", {
								className: "px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm font-semibold",
								children: "100% Pareado"
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant",
							children: [/* @__PURE__ */ _jsx("span", { children: "Checkout via Bot" }), /* @__PURE__ */ _jsx("span", {
								className: "text-primary font-medium",
								children: "Pix nativo ativo"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "grid grid-cols-1 xl:grid-cols-12 gap-6 items-start",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "xl:col-span-8 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ _jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex flex-col sm:flex-row gap-3",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex-1 flex items-center bg-surface-container-low rounded-xl px-3.5 py-2 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20 transition-all",
									children: [
										/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-on-surface-variant mr-2 text-[20px]",
											children: "search"
										}),
										/* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => searchQuery(),
											onInput: (event) => setSearchQuery(event.currentTarget.value),
											placeholder: "Buscar produto por nome, código SKU, ingrediente ou categoria ERP...",
											className: "w-full bg-transparent border-none outline-none font-body-sm text-on-surface placeholder:text-on-surface-variant/70"
										}),
										/* @__PURE__ */ _jsx("kbd", {
											className: "hidden sm:inline-block font-code-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant",
											children: "Ctrl /"
										})
									]
								}), /* @__PURE__ */ _jsx("div", {
									className: "flex items-center bg-surface-container-low rounded-xl p-1 shrink-0 border border-outline-variant/20",
									children: ["ifood", "balcao"].map((channel) => {
										const isSelected = priceChannel() === channel;
										return /* @__PURE__ */ _jsx("button", {
											type: "button",
											onClick: () => setPriceChannel(channel),
											className: () => isSelected ? "px-3 py-1.5 rounded-lg font-title-md transition-all bg-surface-container-lowest shadow-sm text-primary font-bold" : "px-3 py-1.5 rounded-lg font-title-md transition-all text-on-surface-variant hover:text-on-surface",
											children: channel === "ifood" ? "Cardápio iFood" : "WhatsApp / Balcão"
										}, channel);
									})
								})]
							}), /* @__PURE__ */ _jsx("div", {
								className: "flex items-center gap-2 overflow-x-auto pb-1 text-nowrap scrollbar-none",
								children: CATALOG_TAGS.map((tag) => {
									const isSelected = selectedTag() === tag.id;
									return /* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => setSelectedTag(tag.id),
										className: () => isSelected ? "px-3 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-primary text-on-primary shadow-sm font-bold" : tag.isWarning ? "px-3 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-error-container/40 hover:bg-error-container text-on-error-container" : "px-3 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/20",
										children: [tag.icon && /* @__PURE__ */ _jsx("span", {
											className: `material-symbols-outlined text-[16px] ${tag.isFire ? "text-amber-600" : "text-error"}`,
											children: tag.icon
										}), /* @__PURE__ */ _jsx("span", { children: tag.label })]
									}, tag.id);
								})
							})]
						}),
						/* @__PURE__ */ _jsx("div", {
							className: "flex flex-col gap-2.5",
							children: () => products().filter((p) => {
								const matchesSearch = p.name.toLowerCase().includes(searchQuery().toLowerCase()) || p.sku.toLowerCase().includes(searchQuery().toLowerCase()) || p.category.toLowerCase().includes(searchQuery().toLowerCase());
								if (!matchesSearch) return false;
								if (selectedTag() === "Mais Vendidos") return p.ratingBadge?.includes("Mais Pedido") || p.ratingBadge?.includes("Top 1");
								if (selectedTag() === "Pratos Principais") return p.category.includes("Pizzas") || p.category.includes("Tradicionais") || p.category.includes("Bowls");
								if (selectedTag() === "Bebidas & Drinks") return p.category.includes("Bebidas");
								if (selectedTag() === "Sobremesas") return p.category.includes("Sobremesas");
								if (selectedTag() === "Baixo Estoque") return Boolean(p.lowStock);
								return true;
							}).map((product) => /* @__PURE__ */ _jsxs("div", {
								className: `bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group ${() => !product.activeInIfood ? "opacity-80 bg-surface-container-low/40" : ""}`,
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-3.5 min-w-0",
									children: [/* @__PURE__ */ _jsx("img", {
										className: "w-16 h-16 rounded-xl object-cover shadow-inner shrink-0 ring-1 ring-outline-variant/20",
										alt: product.name,
										src: product.image
									}), /* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col min-w-0",
										children: [/* @__PURE__ */ _jsxs("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [
												/* @__PURE__ */ _jsx("span", {
													className: "font-title-lg text-on-surface font-bold truncate",
													children: product.name
												}),
												product.ratingBadge && /* @__PURE__ */ _jsx("span", {
													className: "px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm font-semibold",
													children: product.ratingBadge
												}),
												product.tag && /* @__PURE__ */ _jsx("span", {
													className: "px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm",
													children: product.tag
												})
											]
										}), /* @__PURE__ */ _jsxs("div", {
											className: "flex items-center gap-3 mt-1 text-on-surface-variant font-body-sm flex-wrap",
											children: [
												/* @__PURE__ */ _jsxs("span", {
													className: "font-code-sm bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface border border-outline-variant/20",
													children: ["SKU: ", product.sku]
												}),
												/* @__PURE__ */ _jsxs("span", { children: ["Cat: ", product.category] }),
												/* @__PURE__ */ _jsxs("span", {
													className: `font-semibold flex items-center gap-1 ${product.lowStock ? "text-red-600" : "text-tertiary"}`,
													children: [/* @__PURE__ */ _jsx("span", {
														className: "material-symbols-outlined text-[14px]",
														children: product.lowStock ? "warning" : "inventory_2"
													}), product.stockText]
												})
											]
										})]
									})]
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex items-center justify-between md:justify-end gap-5 w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-outline-variant/20",
									children: [
										/* @__PURE__ */ _jsxs("div", {
											className: "flex flex-col text-right",
											children: [/* @__PURE__ */ _jsxs("div", {
												className: "flex items-baseline gap-1 justify-end",
												children: [/* @__PURE__ */ _jsx("span", {
													className: "font-title-lg text-on-surface font-bold",
													children: priceChannel() === "ifood" ? product.ifoodPrice : product.balcaoPrice
												}), /* @__PURE__ */ _jsxs("span", {
													className: "font-label-sm text-tertiary font-semibold",
													children: [
														"(",
														priceChannel() === "ifood" ? "iFood" : "Balcão",
														")"
													]
												})]
											}), /* @__PURE__ */ _jsxs("div", {
												className: "flex items-center gap-1 text-on-surface-variant font-code-sm justify-end",
												children: [/* @__PURE__ */ _jsxs("span", { children: ["Balcão: ", product.balcaoPrice] }), /* @__PURE__ */ _jsx("span", {
													className: "text-primary font-semibold",
													children: product.marginText
												})]
											})]
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "flex flex-col items-center",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "font-label-sm text-on-surface-variant mb-0.5",
												children: "iFood Loja"
											}), /* @__PURE__ */ _jsx("input", {
												type: "checkbox",
												checked: () => product.activeInIfood,
												onChange: () => handleToggleProduct(product.id),
												className: () => product.activeInIfood ? "w-9 h-5 bg-primary rounded-full appearance-none cursor-pointer relative shadow-inner" : "w-9 h-5 bg-surface-container-highest rounded-full appearance-none cursor-pointer relative"
											})]
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ _jsx("button", {
												type: "button",
												onClick: () => handleSendToChat(product),
												title: "Enviar no Chat para Cliente Atual",
												className: "p-2 rounded-xl bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface transition-all active:scale-90 border border-outline-variant/20",
												children: /* @__PURE__ */ _jsx("span", {
													className: "material-symbols-outlined text-[20px]",
													children: "send_and_archive"
												})
											}), /* @__PURE__ */ _jsx("button", {
												type: "button",
												onClick: () => {
													showToast("Criar Campanha", `Iniciando disparo segmentado para ${product.name}`, "info");
													router.push(SCREEN_ROUTES["estudio-banners"]);
												},
												title: "Criar Campanha de Disparo",
												className: "p-2 rounded-xl bg-surface-container-low hover:bg-surface-container-highest text-on-surface transition-all border border-outline-variant/20",
												children: /* @__PURE__ */ _jsx("span", {
													className: "material-symbols-outlined text-[20px]",
													children: "campaign"
												})
											})]
										})
									]
								})]
							}))
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center justify-between bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 font-label-md text-on-surface-variant",
							children: [/* @__PURE__ */ _jsxs("span", { children: [
								"Exibindo ",
								() => products().length,
								" de 148 pratos integrados via Totvs/iFood"
							] }), /* @__PURE__ */ _jsxs("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ _jsx("button", {
										type: "button",
										disabled: true,
										className: "p-1.5 rounded-lg bg-surface-container-low text-on-surface disabled:opacity-40",
										children: /* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "chevron_left"
										})
									}),
									/* @__PURE__ */ _jsx("button", {
										type: "button",
										className: "px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-bold",
										children: "1"
									}),
									/* @__PURE__ */ _jsx("button", {
										type: "button",
										className: "px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface",
										children: "2"
									}),
									/* @__PURE__ */ _jsx("button", {
										type: "button",
										className: "px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface",
										children: "3"
									}),
									/* @__PURE__ */ _jsx("button", {
										type: "button",
										className: "p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface",
										children: /* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "chevron_right"
										})
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ _jsxs("div", {
					className: "xl:col-span-4 flex flex-col gap-4",
					children: [/* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 relative overflow-hidden flex flex-col gap-4",
						children: [
							/* @__PURE__ */ _jsx("div", { className: "absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary-container/10 blur-2xl pointer-events-none" }),
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between relative z-10",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ _jsx("div", {
										className: "w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary shadow-sm",
										children: /* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "auto_awesome"
										})
									}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h2", {
										className: "font-headline-md text-on-surface font-bold",
										children: "IA Copilot Vendas"
									}), /* @__PURE__ */ _jsx("span", {
										className: "font-label-sm text-tertiary font-semibold",
										children: "Otimizador de Cardápio Ativo"
									})] })]
								}), /* @__PURE__ */ _jsx("span", {
									className: "px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-bold",
									children: "GPT-4o Omni"
								})]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 relative z-10",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxs("span", {
											className: "inline-flex items-center gap-1 font-label-sm uppercase tracking-wider text-primary font-bold",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "trending_up"
											}), "Alerta de Demanda iFood"]
										}), /* @__PURE__ */ _jsx("span", {
											className: "text-tertiary font-label-sm font-semibold",
											children: "+38% Procura"
										})]
									}),
									/* @__PURE__ */ _jsxs("p", {
										className: "font-body-sm text-on-surface leading-relaxed",
										children: [
											"O prato ",
											/* @__PURE__ */ _jsx("strong", {
												className: "text-on-surface font-semibold",
												children: "Pizza Margherita Especial"
											}),
											" atinge pico histórico às sextas entre 19h e 22h. Sugestão: programar disparo relâmpago de 12% off no WhatsApp para clientes com ticket médio > R$ 70."
										]
									}),
									/* @__PURE__ */ _jsx("div", {
										className: "pt-1 flex items-center gap-2",
										children: /* @__PURE__ */ _jsx("button", {
											type: "button",
											onClick: () => showToast("Disparo Agendado", "Campanha de 12% OFF programada para sexta-feira às 18:30 via WhatsApp.", "success"),
											className: "w-full py-1.5 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm active:scale-95 text-center font-bold",
											children: "Agendar Disparo Segmentado"
										})
									})
								]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 relative z-10",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxs("span", {
											className: "inline-flex items-center gap-1 font-label-sm uppercase tracking-wider text-tertiary font-bold",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "point_of_sale"
											}), "Sugestão de Combo Inteligente"]
										}), /* @__PURE__ */ _jsx("span", {
											className: "text-primary font-code-sm font-bold",
											children: "Margem 62%"
										})]
									}),
									/* @__PURE__ */ _jsxs("p", {
										className: "font-body-sm text-on-surface leading-relaxed",
										children: [
											"Agrupar ",
											/* @__PURE__ */ _jsx("strong", {
												className: "text-on-surface font-semibold",
												children: "Smash Burger Duplo + Suco de Maracujá 500ml"
											}),
											" ",
											"por ",
											/* @__PURE__ */ _jsx("strong", { children: "R$ 58,90" }),
											" no iFood. Isso gera +R$ 14 de margem líquida por pedido sem aumentar carga da chapa."
										]
									}),
									/* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => showToast("Combo Criado", "Combo Smash Burger + Suco criado no iFood e provisionado no Totvs ERP!", "success"),
										className: "w-full py-1.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all text-center flex items-center justify-center gap-1",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[16px]",
											children: "add_shopping_cart"
										}), "Criar Combo no iFood & Totvs"]
									})
								]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 relative z-10",
								children: [
									/* @__PURE__ */ _jsxs("span", {
										className: "inline-flex items-center gap-1 font-label-sm uppercase tracking-wider text-on-surface-variant font-bold",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[16px]",
											children: "edit_note"
										}), "Redator Apetitoso de Cardápio"]
									}),
									/* @__PURE__ */ _jsx("p", {
										className: "font-body-sm text-on-surface-variant",
										children: "Reescreva ingredientes para elevar taxas de clique no cardápio digital do WhatsApp e Instagram:"
									}),
									/* @__PURE__ */ _jsx("div", {
										className: "bg-surface-container-lowest p-2.5 rounded-lg text-on-surface font-body-sm italic border-l-2 border-primary-container",
										children: () => COPY_VARIATIONS[copyIndex()]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-2 pt-1",
										children: [/* @__PURE__ */ _jsx("button", {
											type: "button",
											onClick: handleNextCopy,
											className: "flex-1 py-1.5 px-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all text-center",
											children: "Gerar Variação"
										}), /* @__PURE__ */ _jsx("button", {
											type: "button",
											onClick: () => showToast("Texto Salvo", "Descrição aplicada no item selecionado no iFood!", "success"),
											className: "py-1.5 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all font-bold",
											title: "Aplicar no Produto",
											children: "Salvar"
										})]
									})
								]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "bg-gradient-to-br from-primary to-tertiary p-4 rounded-xl text-on-primary flex flex-col gap-2 relative z-10 shadow-sm",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxs("span", {
											className: "font-title-md font-bold flex items-center gap-1",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: "bolt"
											}), "Disparo Relâmpago 1-Click"]
										}), /* @__PURE__ */ _jsx("span", {
											className: "bg-on-primary/20 px-2 py-0.5 rounded-full font-label-sm",
											children: "Omni Send"
										})]
									}),
									/* @__PURE__ */ _jsx("p", {
										className: "font-body-sm text-on-primary/90",
										children: "Dispara card interativo com botão 'Pedir Agora via iFood/Whats' para os últimos 250 clientes que pediram nas últimas 4 semanas."
									}),
									/* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => showToast("Oferta Lançada", "Disparo enviado para a fila de transmissão de 250 clientes.", "success"),
										className: "w-full py-2 px-3 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface font-title-md font-bold shadow-sm transition-all text-center",
										children: "Lançar Oferta Relâmpago"
									})
								]
							})
						]
					}), /* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 flex flex-col gap-1.5",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "font-title-md text-on-surface font-semibold",
								children: "Integridade de Rede & APIs"
							}), /* @__PURE__ */ _jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" })]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "space-y-2 mt-1 font-body-sm",
							children: [
								/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center justify-between text-on-surface-variant",
									children: [/* @__PURE__ */ _jsx("span", { children: "iFood Polling & Heartbeat" }), /* @__PURE__ */ _jsx("span", {
										className: "text-tertiary font-semibold font-code-sm",
										children: "18ms / OK"
									})]
								}),
								/* @__PURE__ */ _jsx("div", {
									className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
									children: /* @__PURE__ */ _jsx("div", { className: "bg-primary-container h-full w-[99%]" })
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center justify-between text-on-surface-variant pt-1",
									children: [/* @__PURE__ */ _jsx("span", { children: "Totvs Protheus Socket" }), /* @__PURE__ */ _jsx("span", {
										className: "text-tertiary font-semibold font-code-sm",
										children: "42ms / Estável"
									})]
								}),
								/* @__PURE__ */ _jsx("div", {
									className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
									children: /* @__PURE__ */ _jsx("div", { className: "bg-secondary-container h-full w-[98%]" })
								})
							]
						})]
					})]
				})]
			})
		]
	});
}

//# sourceMappingURL=catalog-screen.__client_ssr.js.map
