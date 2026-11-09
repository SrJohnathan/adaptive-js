import { signal, useRouter } from "@adaptive-js/web";
import { showToast } from "../../shared/omni-hub/toast-store.js";
import { SCREEN_ROUTES } from "../../shared/omni-hub/types.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
const INITIAL_MEDIA_FILES = [
	{
		id: "f1",
		name: "video_demonstrativo_lançamento_verao_1080p.mp4",
		ident: "ID: MP4-99824 • Hash: #88c9",
		format: ".mp4",
		type: "video",
		originTitle: "Campanha WhatsApp",
		originSub: "Disparo #102 Verão",
		channel: "WhatsApp Gupshup",
		sizeMB: 34.2,
		sizeText: "34.2 MB",
		dateTime: "18 Nov, 14:22",
		timestamp: 173194332e4,
		icon: "videocam",
		iconBg: "bg-secondary-fixed/60",
		iconColor: "text-secondary"
	},
	{
		id: "f2",
		name: "catalogo_produtos_colecao_novembro_2024.pdf",
		ident: "ID: PDF-55211 • ERP AutoSync",
		format: ".pdf",
		type: "doc",
		originTitle: "Catálogo & ERP",
		originSub: "Totvs Sync Ativo",
		channel: "Catálogo ERP Totvs",
		sizeMB: 18.5,
		sizeText: "18.5 MB",
		dateTime: "17 Nov, 09:15",
		timestamp: 17318385e5,
		icon: "picture_as_pdf",
		iconBg: "bg-tertiary-fixed/60",
		iconColor: "text-tertiary"
	},
	{
		id: "f3",
		name: "comprovante_pagamento_pix_pedido_8942.jpg",
		ident: "Chat: +55 11 98821-4432",
		format: ".jpg",
		type: "photo",
		originTitle: "Chat Omnichannel",
		originSub: "Pedido ERP #8942",
		channel: "WhatsApp Gupshup",
		sizeMB: 3.4,
		sizeText: "3.4 MB",
		dateTime: "18 Nov, 16:04",
		timestamp: 173194944e4,
		icon: "image",
		iconBg: "bg-primary-fixed/60",
		iconColor: "text-primary"
	},
	{
		id: "f4",
		name: "foto_prato_cardapio_combo_familia_hd.webp",
		ident: "iFood Hub Sync • SKU #442",
		format: ".webp",
		type: "photo",
		originTitle: "Catálogo & iFood",
		originSub: "Sincronizado Ativo",
		channel: "Catálogo ERP Totvs",
		sizeMB: 2.8,
		sizeText: "2.8 MB",
		dateTime: "17 Nov, 18:40",
		timestamp: 17318724e5,
		icon: "fastfood",
		iconBg: "bg-primary-fixed/60",
		iconColor: "text-primary"
	},
	{
		id: "f5",
		name: "relatorio_fechamento_mensal_omnichannel_outubro.xlsx",
		ident: "Export: Sistema BI",
		format: ".xlsx",
		type: "doc",
		originTitle: "Relatórios & Métricas",
		originSub: "Fechamento Mensal",
		channel: "Telegram Omni",
		sizeMB: 5.1,
		sizeText: "5.1 MB",
		dateTime: "16 Nov, 20:10",
		timestamp: 17317914e5,
		icon: "table_chart",
		iconBg: "bg-tertiary-fixed/60",
		iconColor: "text-tertiary"
	},
	{
		id: "f6",
		name: "audio_instrucoes_entrega_cliente_vip.ogg",
		ident: "Duração: 01:42 • Whisper OK",
		format: ".ogg",
		type: "audio",
		originTitle: "Chat Omnichannel",
		originSub: "WhatsApp +55 11 99120-1100",
		channel: "WhatsApp Gupshup",
		sizeMB: 1.1,
		sizeText: "1.1 MB",
		dateTime: "16 Nov, 11:32",
		timestamp: 173176032e4,
		icon: "graphic_eq",
		iconBg: "bg-surface-container-high",
		iconColor: "text-outline"
	},
	{
		id: "f7",
		name: "contrato_prestacao_servicos_corporativo_assinado.pdf",
		ident: "Docusign API • Assinatura Válida",
		format: ".pdf",
		type: "doc",
		originTitle: "Configurações de Conta",
		originSub: "Jurídico / Faturamento",
		channel: "Instagram Direct",
		sizeMB: 4.9,
		sizeText: "4.9 MB",
		dateTime: "15 Nov, 17:50",
		timestamp: 17316966e5,
		icon: "assignment_turned_in",
		iconBg: "bg-tertiary-fixed/60",
		iconColor: "text-tertiary"
	}
];
const TYPE_LABELS = {
	all: "Todos",
	photo: "Fotos",
	video: "Vídeos",
	doc: "Documentos",
	audio: "Áudios"
};
export function StorageScreen() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = signal("");
	const [selectedType, setSelectedType] = signal("all");
	const [selectedChannel, setSelectedChannel] = signal("all");
	const [sortBy, setSortBy] = signal("size_desc");
	const [files, setFiles] = signal(INITIAL_MEDIA_FILES);
	const [totalCapacityGB, setTotalCapacityGB] = signal(3);
	const [usedGB, setUsedGB] = signal(2.42);
	const [autoPurgeEnabled, setAutoPurgeEnabled] = signal(true);
	const [isCleaningCache, setIsCleaningCache] = signal(false);
	const [cacheCleaned, setCacheCleaned] = signal(false);
	const [showUpgradeModal, setShowUpgradeModal] = signal(false);
	const [previewFile, setPreviewFile] = signal(null);
	const handleQuickCacheClean = () => {
		if (isCleaningCache()) return;
		setIsCleaningCache(true);
		showToast("Limpeza em Andamento", "Removendo miniaturas em cache e logs temporários...", "info");
		setTimeout(() => {
			setIsCleaningCache(false);
			setCacheCleaned(true);
			setUsedGB((prev) => Math.max(1.8, +(prev - .18).toFixed(2)));
			showToast("Cache Liberado com Sucesso", "180 MB de arquivos temporários foram expurgados.", "success");
			setTimeout(() => {
				setCacheCleaned(false);
			}, 3500);
		}, 1200);
	};
	const handleContractPlan = (planName, additionalGB, price) => {
		setTotalCapacityGB((prev) => +(prev + additionalGB).toFixed(1));
		setShowUpgradeModal(false);
		showToast("Upgrade Contratado!", `Pacote de ${planName} ativado com sucesso por ${price}. Cota atualizada instantaneamente.`, "success");
	};
	const handleDeleteFile = (file) => {
		setFiles((prev) => prev.filter((f) => f.id !== file.id));
		setUsedGB((prev) => Math.max(1, +(prev - file.sizeMB / 1024).toFixed(2)));
		showToast("Arquivo Excluído", `"${file.name}" foi removido do armazenamento em nuvem.`, "info");
	};
	const filteredFiles = () => files().filter((item) => {
		const query = searchQuery().toLowerCase();
		const matchesSearch = item.name.toLowerCase().includes(query) || item.ident.toLowerCase().includes(query) || item.originTitle.toLowerCase().includes(query);
		const matchesType = selectedType() === "all" || item.type === selectedType();
		const matchesChannel = selectedChannel() === "all" || item.channel === selectedChannel();
		return matchesSearch && matchesType && matchesChannel;
	}).sort((a, b) => {
		if (sortBy() === "size_desc") return b.sizeMB - a.sizeMB;
		if (sortBy() === "recent") return b.timestamp - a.timestamp;
		if (sortBy() === "oldest") return a.timestamp - b.timestamp;
		return 0;
	});
	const percentageUsed = () => Math.min(100, Math.round(usedGB() / totalCapacityGB() * 100 * 10) / 10);
	const freeMB = () => Math.max(0, Math.round((totalCapacityGB() - usedGB()) * 1024));
	const goToSettings = () => router.push(SCREEN_ROUTES["configuracoes-conta"]);
	const scrollToPackages = () => {
		const elem = document.getElementById("expansion-packages");
		if (elem) elem.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ _jsxs("div", {
		className: "w-full",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1440px] mx-auto",
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex flex-col gap-1",
							children: [
								/* @__PURE__ */ _jsxs("nav", {
									className: "flex items-center gap-1 text-on-surface-variant font-label-sm",
									children: [
										/* @__PURE__ */ _jsx("button", {
											type: "button",
											onClick: goToSettings,
											className: "hover:text-primary transition-colors cursor-pointer",
											children: "Configurações"
										}),
										/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[14px]",
											children: "chevron_right"
										}),
										/* @__PURE__ */ _jsx("span", {
											className: "hover:text-primary transition-colors cursor-pointer",
											children: "Espaço em Disco & Mídias"
										}),
										/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[14px]",
											children: "chevron_right"
										}),
										/* @__PURE__ */ _jsx("span", {
											className: "text-primary font-semibold",
											children: "Monitoramento de Armazenamento"
										})
									]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsx("div", {
										className: "p-2 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center",
										children: /* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[26px]",
											children: "cloud_sync"
										})
									}), /* @__PURE__ */ _jsx("h1", {
										className: "font-headline-xl text-on-surface tracking-tight font-bold",
										children: "Armazenamento & Gestão de Mídias"
									})]
								}),
								/* @__PURE__ */ _jsx("p", {
									className: "font-body-md text-on-surface-variant max-w-3xl",
									children: "Monitore o volume de arquivos de conversas, catálogos, mídias de campanhas e documentos fiscais trafegados nos mensageiros."
								})
							]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [/* @__PURE__ */ _jsx("button", {
								type: "button",
								disabled: () => isCleaningCache(),
								onClick: handleQuickCacheClean,
								className: "h-9 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-title-md shadow-sm hover:bg-surface-container-high transition-all flex items-center gap-1.5 active:scale-95 border border-outline-variant/20 cursor-pointer disabled:opacity-70",
								children: () => isCleaningCache() ? /* @__PURE__ */ _jsxs(_Fragment, { children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[18px] animate-spin text-primary",
									children: "progress_activity"
								}), /* @__PURE__ */ _jsx("span", { children: "Limpando 180 MB..." })] }) : cacheCleaned() ? /* @__PURE__ */ _jsxs(_Fragment, { children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[18px] text-tertiary",
									children: "check"
								}), /* @__PURE__ */ _jsx("span", {
									className: "text-tertiary font-bold",
									children: "180 MB Liberados!"
								})] }) : /* @__PURE__ */ _jsxs(_Fragment, { children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[18px] text-on-surface-variant",
									children: "cleaning_services"
								}), /* @__PURE__ */ _jsx("span", { children: "Limpeza Rápida de Cache" })] })
							}), /* @__PURE__ */ _jsxs("button", {
								type: "button",
								onClick: () => setShowUpgradeModal(true),
								className: "h-9 px-4 rounded-xl bg-primary-container text-on-primary font-title-md shadow-sm hover:bg-primary transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer font-bold",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[18px]",
									children: "add_shopping_cart"
								}), /* @__PURE__ */ _jsx("span", { children: "+ Fazer Upgrade de Espaço" })]
							})]
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm p-6 flex flex-col gap-5 border border-outline-variant/20",
						children: [
							/* @__PURE__ */ _jsx("div", { className: "absolute -right-16 -top-16 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none" }),
							/* @__PURE__ */ _jsxs("div", {
								className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "font-title-md text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Cota Padrão Alocada"
										}), /* @__PURE__ */ _jsxs("span", {
											className: "px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm font-semibold flex items-center gap-1",
											children: [/* @__PURE__ */ _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-error animate-ping" }), () => percentageUsed() >= 80 ? `Crítico: ${percentageUsed()}%` : `Uso: ${percentageUsed()}%`]
										})]
									}), /* @__PURE__ */ _jsxs("div", {
										className: "flex items-baseline gap-2",
										children: [/* @__PURE__ */ _jsxs("span", {
											className: "font-headline-xl text-primary font-bold",
											children: [() => usedGB().toFixed(2).replace(".", ","), " GB"]
										}), /* @__PURE__ */ _jsxs("span", {
											className: "font-body-lg text-on-surface-variant",
											children: [
												"utilizados de",
												" ",
												/* @__PURE__ */ _jsxs("strong", {
													className: "text-on-surface font-semibold",
													children: [() => totalCapacityGB().toFixed(2).replace(".", ","), " GB"]
												})
											]
										})]
									})]
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col items-end",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "font-label-sm text-on-surface-variant",
											children: "Disponível em Nuvem"
										}), /* @__PURE__ */ _jsxs("span", {
											className: "font-title-lg text-tertiary font-bold",
											children: [() => freeMB(), " MB livres"]
										})]
									}), /* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: scrollToPackages,
										className: "h-9 px-3.5 rounded-xl bg-primary text-on-primary font-title-md shadow-sm hover:bg-on-primary-container transition-all flex items-center gap-1.5 shrink-0 font-bold",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "cloud_upload"
										}), /* @__PURE__ */ _jsx("span", { children: "Comprar Pacote Adicional (+10 GB por R$ 29/mês)" })]
									})]
								})]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "flex flex-col gap-1 relative z-10",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "w-full h-3.5 rounded-full bg-surface-container-high overflow-hidden flex shadow-inner",
									children: [
										/* @__PURE__ */ _jsx("div", {
											className: "h-full bg-primary-container transition-all hover:opacity-90",
											style: { width: "38.3%" },
											title: "Fotos & Imagens: 1,15 GB (38.3%)"
										}),
										/* @__PURE__ */ _jsx("div", {
											className: "h-full bg-secondary transition-all hover:opacity-90",
											style: { width: "29.6%" },
											title: "Vídeos & Reels: 890 MB (29.6%)"
										}),
										/* @__PURE__ */ _jsx("div", {
											className: "h-full bg-tertiary-container transition-all hover:opacity-90",
											style: { width: "10.3%" },
											title: "Documentos & PDFs: 310 MB (10.3%)"
										}),
										/* @__PURE__ */ _jsx("div", {
											className: "h-full bg-outline transition-all hover:opacity-90",
											style: { width: "4.0%" },
											title: "Áudios de Voz & Outros: 120 MB (4.0%)"
										}),
										/* @__PURE__ */ _jsx("div", {
											className: "h-full bg-transparent flex-1",
											title: () => `Livre: ${freeMB()} MB`
										})
									]
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex flex-wrap items-center justify-between gap-4 pt-1 font-body-sm text-on-surface-variant",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-wrap items-center gap-4",
										children: [
											/* @__PURE__ */ _jsxs("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ _jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-primary-container" }),
													/* @__PURE__ */ _jsx("span", {
														className: "font-medium text-on-surface",
														children: "Fotos & Imagens"
													}),
													/* @__PURE__ */ _jsx("span", {
														className: "font-code-sm text-on-surface-variant",
														children: "1,15 GB (38.3%)"
													})
												]
											}),
											/* @__PURE__ */ _jsxs("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ _jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-secondary" }),
													/* @__PURE__ */ _jsx("span", {
														className: "font-medium text-on-surface",
														children: "Vídeos & Reels"
													}),
													/* @__PURE__ */ _jsx("span", {
														className: "font-code-sm text-on-surface-variant",
														children: "890 MB (29.6%)"
													})
												]
											}),
											/* @__PURE__ */ _jsxs("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ _jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-tertiary-container" }),
													/* @__PURE__ */ _jsx("span", {
														className: "font-medium text-on-surface",
														children: "Documentos & PDFs"
													}),
													/* @__PURE__ */ _jsx("span", {
														className: "font-code-sm text-on-surface-variant",
														children: "310 MB (10.3%)"
													})
												]
											}),
											/* @__PURE__ */ _jsxs("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ _jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-outline" }),
													/* @__PURE__ */ _jsx("span", {
														className: "font-medium text-on-surface",
														children: "Áudios & Whisper"
													}),
													/* @__PURE__ */ _jsx("span", {
														className: "font-code-sm text-on-surface-variant",
														children: "120 MB (4.0%)"
													})
												]
											})
										]
									}), /* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ _jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-surface-variant" }),
											/* @__PURE__ */ _jsx("span", {
												className: "font-medium text-on-surface",
												children: "Espaço Não Utilizado"
											}),
											/* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-on-surface-variant font-semibold",
												children: () => `${freeMB()} MB (${(100 - percentageUsed()).toFixed(1)}%)`
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "p-3.5 rounded-xl bg-error-container/40 text-on-error-container flex items-start gap-3 relative z-10 border border-error-container/50",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[22px] text-error shrink-0",
									children: "warning"
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex flex-col gap-0.5",
									children: [/* @__PURE__ */ _jsx("p", {
										className: "font-title-md font-bold text-error",
										children: () => `Atenção: Você atingiu ${percentageUsed()}% da sua cota padrão de ${totalCapacityGB().toFixed(0)} GB.`
									}), /* @__PURE__ */ _jsx("p", {
										className: "font-body-sm text-on-surface-variant",
										children: "Mídias temporárias e arquivos antigos com mais de 90 dias poderão ter retenção automática programada caso a capacidade se esgote."
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ _jsx("div", {
											className: "w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary",
											children: /* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[24px]",
												children: "photo_library"
											})
										}), /* @__PURE__ */ _jsx("span", {
											className: "px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm font-semibold",
											children: "38.3%"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", { children: [
										/* @__PURE__ */ _jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Fotos & Imagens"
										}),
										/* @__PURE__ */ _jsx("h3", {
											className: "font-headline-lg text-on-surface font-bold mt-0.5",
											children: "1,15 GB"
										}),
										/* @__PURE__ */ _jsx("p", {
											className: "font-body-sm text-on-surface-variant mt-1",
											children: "4.820 arquivos registrados em chats e vitrines."
										})
									] }),
									/* @__PURE__ */ _jsxs("div", {
										className: "p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm",
										children: [/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ _jsx("span", { children: "Formatos:" }), /* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: ".jpg, .png, .webp"
											})]
										}), /* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ _jsx("span", { children: "TurboCompress:" }), /* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-tertiary font-bold",
												children: "-42% poupados"
											})]
										})]
									}),
									/* @__PURE__ */ _jsx("div", {
										className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ _jsx("div", {
											className: "bg-primary-container h-full rounded-full",
											style: { width: "38.3%" }
										})
									})
								]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ _jsx("div", {
											className: "w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary",
											children: /* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[24px]",
												children: "movie"
											})
										}), /* @__PURE__ */ _jsx("span", {
											className: "px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm font-semibold",
											children: "29.6%"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", { children: [
										/* @__PURE__ */ _jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Vídeos & Reels"
										}),
										/* @__PURE__ */ _jsx("h3", {
											className: "font-headline-lg text-on-surface font-bold mt-0.5",
											children: "890 MB"
										}),
										/* @__PURE__ */ _jsx("p", {
											className: "font-body-sm text-on-surface-variant mt-1",
											children: "312 vídeos promocionais e unboxing enviados."
										})
									] }),
									/* @__PURE__ */ _jsxs("div", {
										className: "p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm",
										children: [/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ _jsx("span", { children: "Resolução:" }), /* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "720p / 1080p MP4"
											})]
										}), /* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ _jsx("span", { children: "API Gateway:" }), /* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "WhatsApp Cloud OK"
											})]
										})]
									}),
									/* @__PURE__ */ _jsx("div", {
										className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ _jsx("div", {
											className: "bg-secondary h-full rounded-full",
											style: { width: "29.6%" }
										})
									})
								]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ _jsx("div", {
											className: "w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary",
											children: /* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[24px]",
												children: "description"
											})
										}), /* @__PURE__ */ _jsx("span", {
											className: "px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm font-semibold",
											children: "10.3%"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", { children: [
										/* @__PURE__ */ _jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Documentos & PDFs"
										}),
										/* @__PURE__ */ _jsx("h3", {
											className: "font-headline-lg text-on-surface font-bold mt-0.5",
											children: "310 MB"
										}),
										/* @__PURE__ */ _jsx("p", {
											className: "font-body-sm text-on-surface-variant mt-1",
											children: "1.450 contratos, faturas ERP e notas fiscais."
										})
									] }),
									/* @__PURE__ */ _jsxs("div", {
										className: "p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm",
										children: [/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ _jsx("span", { children: "Segurança:" }), /* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "AES-256 Em Repouso"
											})]
										}), /* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ _jsx("span", { children: "Sincronia:" }), /* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-primary font-semibold",
												children: "ERP Totvs & Bling"
											})]
										})]
									}),
									/* @__PURE__ */ _jsx("div", {
										className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ _jsx("div", {
											className: "bg-tertiary-container h-full rounded-full",
											style: { width: "10.3%" }
										})
									})
								]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ _jsx("div", {
											className: "w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-outline",
											children: /* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[24px]",
												children: "mic"
											})
										}), /* @__PURE__ */ _jsx("span", {
											className: "px-2 py-0.5 rounded-full bg-surface-container text-outline font-label-sm font-semibold",
											children: "4.0%"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", { children: [
										/* @__PURE__ */ _jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Áudios & Transcrições"
										}),
										/* @__PURE__ */ _jsx("h3", {
											className: "font-headline-lg text-on-surface font-bold mt-0.5",
											children: "120 MB"
										}),
										/* @__PURE__ */ _jsx("p", {
											className: "font-body-sm text-on-surface-variant mt-1",
											children: "3.910 mensagens de áudio dos clientes no Omni."
										})
									] }),
									/* @__PURE__ */ _jsxs("div", {
										className: "p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm",
										children: [/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ _jsx("span", { children: "Formato Áudio:" }), /* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "OGG Opus 16kbps"
											})]
										}), /* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ _jsx("span", { children: "IA Transcrição:" }), /* @__PURE__ */ _jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "Whisper v3 Turbo"
											})]
										})]
									}),
									/* @__PURE__ */ _jsx("div", {
										className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ _jsx("div", {
											className: "bg-outline h-full rounded-full",
											style: { width: "4.0%" }
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "flex flex-col gap-4 scroll-mt-20",
						id: "expansion-packages",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h2", {
								className: "font-headline-md text-on-surface font-bold",
								children: "Pacotes de Expansão de Armazenamento"
							}), /* @__PURE__ */ _jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: "Aumente sua cota sem interrupções operacionais e mantenha históricos completos de conversas e mídias."
							})] }), /* @__PURE__ */ _jsxs("span", {
								className: "hidden sm:inline-flex items-center gap-1 font-label-sm text-primary font-semibold",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[16px]",
									children: "verified"
								}), "Cobrança flexível pós-pago na fatura"]
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ _jsxs("div", {
									className: "p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden border border-primary/30",
									children: [
										/* @__PURE__ */ _jsx("div", {
											className: "absolute top-0 right-0",
											children: /* @__PURE__ */ _jsx("span", {
												className: "px-3.5 py-1 rounded-bl-xl bg-primary-container text-on-primary font-label-sm font-bold tracking-wide uppercase",
												children: "Mais Escolhido"
											})
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "flex flex-col gap-2 mt-2",
											children: [
												/* @__PURE__ */ _jsxs("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ _jsx("span", {
														className: "material-symbols-outlined text-[24px] text-primary",
														children: "cloud"
													}), /* @__PURE__ */ _jsx("h4", {
														className: "font-title-lg text-on-surface font-bold",
														children: "+10 GB Adicionais"
													})]
												}),
												/* @__PURE__ */ _jsx("p", {
													className: "font-body-sm text-on-surface-variant",
													children: "Ideal para operações em crescimento contínuo de WhatsApp e catálogos recorrentes."
												}),
												/* @__PURE__ */ _jsxs("div", {
													className: "flex items-baseline gap-1 mt-1",
													children: [/* @__PURE__ */ _jsx("span", {
														className: "font-headline-xl text-primary font-bold",
														children: "R$ 29,90"
													}), /* @__PURE__ */ _jsx("span", {
														className: "font-body-sm text-on-surface-variant",
														children: "/mês"
													})]
												}),
												/* @__PURE__ */ _jsxs("ul", {
													className: "flex flex-col gap-1.5 pt-1 font-body-sm text-on-surface",
													children: [
														/* @__PURE__ */ _jsxs("li", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ _jsx("span", {
																className: "material-symbols-outlined text-[16px] text-primary",
																children: "check_circle"
															}), /* @__PURE__ */ _jsx("span", { children: "Ativação instantânea em 1 clique" })]
														}),
														/* @__PURE__ */ _jsxs("li", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ _jsx("span", {
																className: "material-symbols-outlined text-[16px] text-primary",
																children: "check_circle"
															}), /* @__PURE__ */ _jsx("span", { children: "Histórico garantido sem auto-expurgo" })]
														}),
														/* @__PURE__ */ _jsxs("li", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ _jsx("span", {
																className: "material-symbols-outlined text-[16px] text-primary",
																children: "check_circle"
															}), /* @__PURE__ */ _jsx("span", { children: "Compressão inteligente ativada" })]
														})
													]
												})
											]
										}),
										/* @__PURE__ */ _jsxs("button", {
											type: "button",
											onClick: () => handleContractPlan("+10 GB Adicionais", 10, "R$ 29,90/mês"),
											className: "w-full h-10 rounded-xl bg-primary-container text-on-primary font-title-md shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer font-bold",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: "bolt"
											}), /* @__PURE__ */ _jsx("span", { children: "Contratar Agora" })]
										})
									]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5 hover:shadow-md transition-shadow border border-outline-variant/20",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-2",
										children: [
											/* @__PURE__ */ _jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ _jsx("span", {
													className: "material-symbols-outlined text-[24px] text-secondary",
													children: "database"
												}), /* @__PURE__ */ _jsx("h4", {
													className: "font-title-lg text-on-surface font-bold",
													children: "+50 GB Adicionais"
												})]
											}),
											/* @__PURE__ */ _jsx("p", {
												className: "font-body-sm text-on-surface-variant",
												children: "Perfeito para lojas de varejo com grandes fluxos de mídias de alta definição e vídeos."
											}),
											/* @__PURE__ */ _jsxs("div", {
												className: "flex items-baseline gap-1 mt-1",
												children: [/* @__PURE__ */ _jsx("span", {
													className: "font-headline-xl text-secondary font-bold",
													children: "R$ 89,90"
												}), /* @__PURE__ */ _jsx("span", {
													className: "font-body-sm text-on-surface-variant",
													children: "/mês"
												})]
											}),
											/* @__PURE__ */ _jsxs("ul", {
												className: "flex flex-col gap-1.5 pt-1 font-body-sm text-on-surface",
												children: [
													/* @__PURE__ */ _jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ _jsx("span", {
															className: "material-symbols-outlined text-[16px] text-secondary",
															children: "check_circle"
														}), /* @__PURE__ */ _jsx("span", { children: "Suporte a vídeos até 4K e catálogos pesados" })]
													}),
													/* @__PURE__ */ _jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ _jsx("span", {
															className: "material-symbols-outlined text-[16px] text-secondary",
															children: "check_circle"
														}), /* @__PURE__ */ _jsx("span", { children: "Prioridade no pipeline de CDN Cloudflare" })]
													}),
													/* @__PURE__ */ _jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ _jsx("span", {
															className: "material-symbols-outlined text-[16px] text-secondary",
															children: "check_circle"
														}), /* @__PURE__ */ _jsx("span", { children: "Exportação periódica em massa" })]
													})
												]
											})
										]
									}), /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => handleContractPlan("+50 GB Adicionais", 50, "R$ 89,90/mês"),
										className: "w-full h-10 rounded-xl bg-surface-container text-on-surface font-title-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer font-bold",
										children: /* @__PURE__ */ _jsx("span", { children: "Contratar Plano" })
									})]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5 hover:shadow-md transition-shadow border border-outline-variant/20",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-2",
										children: [
											/* @__PURE__ */ _jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ _jsx("span", {
													className: "material-symbols-outlined text-[24px] text-tertiary",
													children: "domain"
												}), /* @__PURE__ */ _jsx("h4", {
													className: "font-title-lg text-on-surface font-bold",
													children: "+200 GB Enterprise"
												})]
											}),
											/* @__PURE__ */ _jsx("p", {
												className: "font-body-sm text-on-surface-variant",
												children: "Infraestrutura corporativa dedicada com retenção perpétua de documentos fiscais e auditoria."
											}),
											/* @__PURE__ */ _jsxs("div", {
												className: "flex items-baseline gap-1 mt-1",
												children: [/* @__PURE__ */ _jsx("span", {
													className: "font-headline-xl text-tertiary font-bold",
													children: "R$ 199,00"
												}), /* @__PURE__ */ _jsx("span", {
													className: "font-body-sm text-on-surface-variant",
													children: "/mês"
												})]
											}),
											/* @__PURE__ */ _jsxs("ul", {
												className: "flex flex-col gap-1.5 pt-1 font-body-sm text-on-surface",
												children: [
													/* @__PURE__ */ _jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ _jsx("span", {
															className: "material-symbols-outlined text-[16px] text-tertiary",
															children: "check_circle"
														}), /* @__PURE__ */ _jsx("span", { children: "Bucket AWS S3 Dedicado na região Brasil" })]
													}),
													/* @__PURE__ */ _jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ _jsx("span", {
															className: "material-symbols-outlined text-[16px] text-tertiary",
															children: "check_circle"
														}), /* @__PURE__ */ _jsx("span", { children: "Retenção legal regulamentar de 5 anos" })]
													}),
													/* @__PURE__ */ _jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ _jsx("span", {
															className: "material-symbols-outlined text-[16px] text-tertiary",
															children: "check_circle"
														}), /* @__PURE__ */ _jsx("span", { children: "SLA de disponibilidade 99.99%" })]
													})
												]
											})
										]
									}), /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => showToast("Gerente de Conta", "Um consultor empresarial do time de infraestrutura entrará em contato.", "info"),
										className: "w-full h-10 rounded-xl bg-surface-container text-on-surface font-title-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer font-bold",
										children: /* @__PURE__ */ _jsx("span", { children: "Falar com Gerente de Conta" })
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "rounded-xl bg-surface-container-lowest shadow-sm p-5 flex flex-col gap-4 border border-outline-variant/20",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex flex-col lg:flex-row lg:items-center justify-between gap-3",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "relative flex-1 max-w-lg",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]",
										children: "search"
									}), /* @__PURE__ */ _jsx("input", {
										type: "text",
										value: () => searchQuery(),
										onInput: (event) => setSearchQuery(event.currentTarget.value),
										placeholder: "Pesquisar por nome do arquivo, protocolo de chat ou cliente...",
										className: "w-full h-10 pl-10 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-on-surface-variant/60 shadow-inner border border-outline-variant/20"
									})]
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ _jsx("div", {
											className: "flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant/20",
											children: [
												"all",
												"photo",
												"video",
												"doc",
												"audio"
											].map((type) => {
												return /* @__PURE__ */ _jsx("button", {
													type: "button",
													onClick: () => setSelectedType(type),
													className: () => selectedType() === type ? "px-3 py-1 rounded-lg font-label-sm font-semibold transition-colors cursor-pointer text-on-primary bg-primary-container shadow-sm" : "px-3 py-1 rounded-lg font-label-sm font-semibold transition-colors cursor-pointer text-on-surface-variant hover:text-on-surface",
													children: TYPE_LABELS[type]
												}, type);
											})
										}),
										/* @__PURE__ */ _jsxs("select", {
											value: () => selectedChannel(),
											onChange: (event) => setSelectedChannel(event.currentTarget.value),
											className: "h-9 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm outline-none cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20",
											children: [
												/* @__PURE__ */ _jsx("option", {
													value: "all",
													children: "Todos os Canais"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "WhatsApp Gupshup",
													children: "WhatsApp Gupshup"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "Instagram Direct",
													children: "Instagram Direct"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "Telegram Omni",
													children: "Telegram Omni"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "Catálogo ERP Totvs",
													children: "Catálogo ERP Totvs"
												})
											]
										}),
										/* @__PURE__ */ _jsxs("select", {
											value: () => sortBy(),
											onChange: (event) => setSortBy(event.currentTarget.value),
											className: "h-9 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm outline-none cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20",
											children: [
												/* @__PURE__ */ _jsx("option", {
													value: "size_desc",
													children: "Mais pesados primeiro"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "recent",
													children: "Mais recentes"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "oldest",
													children: "Mais antigos"
												})
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ _jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ _jsxs("table", {
									className: "w-full text-left font-body-sm border-collapse",
									children: [/* @__PURE__ */ _jsx("thead", { children: /* @__PURE__ */ _jsxs("tr", {
										className: "text-on-surface-variant font-label-sm uppercase tracking-wider bg-surface-container-low/60 rounded-xl",
										children: [
											/* @__PURE__ */ _jsx("th", {
												className: "py-3 px-4 rounded-l-xl",
												children: "Arquivo & Identificador"
											}),
											/* @__PURE__ */ _jsx("th", {
												className: "py-3 px-3",
												children: "Formato"
											}),
											/* @__PURE__ */ _jsx("th", {
												className: "py-3 px-3",
												children: "Origem & Vínculo"
											}),
											/* @__PURE__ */ _jsx("th", {
												className: "py-3 px-3",
												children: "Tamanho"
											}),
											/* @__PURE__ */ _jsx("th", {
												className: "py-3 px-3",
												children: "Data / Hora"
											}),
											/* @__PURE__ */ _jsx("th", {
												className: "py-3 px-4 text-right rounded-r-xl",
												children: "Ações"
											})
										]
									}) }), /* @__PURE__ */ _jsx("tbody", {
										className: "text-on-surface divide-y divide-outline-variant/10",
										children: (() => {
											const rows = filteredFiles();
											if (rows.length === 0) {
												return /* @__PURE__ */ _jsx("tr", { children: /* @__PURE__ */ _jsx("td", {
													colSpan: 6,
													className: "py-8 text-center text-on-surface-variant",
													children: /* @__PURE__ */ _jsxs("div", {
														className: "flex flex-col items-center justify-center gap-2",
														children: [/* @__PURE__ */ _jsx("span", {
															className: "material-symbols-outlined text-[36px] text-on-surface-variant/40",
															children: "folder_off"
														}), /* @__PURE__ */ _jsx("span", { children: "Nenhum arquivo encontrado com os filtros selecionados." })]
													})
												}) });
											}
											return rows.map((file) => /* @__PURE__ */ _jsxs("tr", {
												className: "hover:bg-surface-container-low/40 transition-colors group",
												children: [
													/* @__PURE__ */ _jsx("td", {
														className: "py-3.5 px-4",
														children: /* @__PURE__ */ _jsxs("div", {
															className: "flex items-center gap-3",
															children: [/* @__PURE__ */ _jsx("div", {
																className: `w-9 h-9 rounded-lg ${file.iconBg} ${file.iconColor} flex items-center justify-center shrink-0`,
																children: /* @__PURE__ */ _jsx("span", {
																	className: "material-symbols-outlined text-[20px]",
																	children: file.icon
																})
															}), /* @__PURE__ */ _jsxs("div", {
																className: "flex flex-col min-w-0 max-w-xs md:max-w-md",
																children: [/* @__PURE__ */ _jsx("span", {
																	className: "font-title-md font-semibold truncate text-on-surface",
																	children: file.name
																}), /* @__PURE__ */ _jsx("span", {
																	className: "font-label-sm text-on-surface-variant font-mono",
																	children: file.ident
																})]
															})]
														})
													}),
													/* @__PURE__ */ _jsx("td", {
														className: "py-3.5 px-3",
														children: /* @__PURE__ */ _jsx("span", {
															className: "px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm font-semibold",
															children: file.format
														})
													}),
													/* @__PURE__ */ _jsx("td", {
														className: "py-3.5 px-3",
														children: /* @__PURE__ */ _jsxs("div", {
															className: "flex flex-col",
															children: [/* @__PURE__ */ _jsx("span", {
																className: "font-title-md text-on-surface font-semibold",
																children: file.originTitle
															}), /* @__PURE__ */ _jsx("span", {
																className: "font-body-sm text-on-surface-variant",
																children: file.originSub
															})]
														})
													}),
													/* @__PURE__ */ _jsx("td", {
														className: "py-3.5 px-3 font-code-sm font-bold text-on-surface",
														children: file.sizeText
													}),
													/* @__PURE__ */ _jsx("td", {
														className: "py-3.5 px-3 text-on-surface-variant",
														children: file.dateTime
													}),
													/* @__PURE__ */ _jsx("td", {
														className: "py-3.5 px-4 text-right",
														children: /* @__PURE__ */ _jsxs("div", {
															className: "flex items-center justify-end gap-1",
															children: [
																/* @__PURE__ */ _jsx("button", {
																	type: "button",
																	onClick: () => showToast("Download Iniciado", `Baixando ${file.name}...`, "success"),
																	className: "p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer",
																	title: "Download do Arquivo",
																	children: /* @__PURE__ */ _jsx("span", {
																		className: "material-symbols-outlined text-[18px]",
																		children: "download"
																	})
																}),
																/* @__PURE__ */ _jsx("button", {
																	type: "button",
																	onClick: () => setPreviewFile(file),
																	className: "p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer",
																	title: "Visualizar Detalhes",
																	children: /* @__PURE__ */ _jsx("span", {
																		className: "material-symbols-outlined text-[18px]",
																		children: "visibility"
																	})
																}),
																/* @__PURE__ */ _jsx("button", {
																	type: "button",
																	onClick: () => handleDeleteFile(file),
																	className: "p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors cursor-pointer",
																	title: "Liberar Espaço",
																	children: /* @__PURE__ */ _jsx("span", {
																		className: "material-symbols-outlined text-[18px]",
																		children: "delete"
																	})
																})
															]
														})
													})
												]
											}));
										})()
									})]
								})
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 text-on-surface-variant font-body-sm",
								children: [/* @__PURE__ */ _jsxs("span", { children: [
									"Exibindo ",
									/* @__PURE__ */ _jsx("strong", {
										className: "text-on-surface font-semibold",
										children: () => `1-${filteredFiles().length}`
									}),
									" de",
									" ",
									/* @__PURE__ */ _jsx("strong", {
										className: "text-on-surface font-semibold",
										children: "6.582 arquivos armazenados"
									}),
									" •",
									" ",
									() => `${usedGB().toFixed(2).replace(".", ",")} GB totais`
								] }), /* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ _jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors disabled:opacity-40",
											disabled: true,
											children: "Anterior"
										}),
										/* @__PURE__ */ _jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-primary-container text-on-primary font-title-md font-bold",
											children: "1"
										}),
										/* @__PURE__ */ _jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors",
											children: "2"
										}),
										/* @__PURE__ */ _jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors",
											children: "3"
										}),
										/* @__PURE__ */ _jsx("span", {
											className: "px-2",
											children: "..."
										}),
										/* @__PURE__ */ _jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors",
											children: "941"
										}),
										/* @__PURE__ */ _jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors",
											children: "Próxima"
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "rounded-xl bg-surface-container-lowest shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/20",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ _jsx("div", {
								className: "w-10 h-10 rounded-xl bg-surface-container-high text-tertiary flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[24px]",
									children: "verified_user"
								})
							}), /* @__PURE__ */ _jsxs("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "font-title-md text-on-surface font-bold",
									children: "Políticas de Retenção & Governança de Dados"
								}), /* @__PURE__ */ _jsx("span", {
									className: "font-body-sm text-on-surface-variant",
									children: "Conformidade com LGPD, criptografia ponta a ponta e redundância AWS multi-região São Paulo."
								})]
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl shrink-0 border border-outline-variant/20",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex flex-col text-right",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "font-title-md text-on-surface font-semibold",
									children: "Auto-expurgo 90 dias"
								}), /* @__PURE__ */ _jsx("span", {
									className: "font-label-sm text-primary font-bold",
									children: () => autoPurgeEnabled() ? "Economiza ~600 MB/mês" : "Auto-expurgo Desativado"
								})]
							}), /* @__PURE__ */ _jsxs("label", {
								className: "relative inline-flex items-center cursor-pointer",
								children: [/* @__PURE__ */ _jsx("input", {
									type: "checkbox",
									checked: () => autoPurgeEnabled(),
									onChange: (event) => {
										setAutoPurgeEnabled(event.currentTarget.checked);
										showToast(event.currentTarget.checked ? "Auto-expurgo Ativado" : "Auto-expurgo Desativado", event.currentTarget.checked ? "Arquivos de mídia com mais de 90 dias serão purgados automaticamente." : "Retenção perpétua ativada. Pode consumir maior cota em disco.", event.currentTarget.checked ? "success" : "warning");
									},
									className: "sr-only peer"
								}), /* @__PURE__ */ _jsx("div", { className: "w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container" })]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ _jsx(Reveal, {
				when: () => showUpgradeModal(),
				children: /* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsx("div", {
					className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in",
					children: /* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-5",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between border-b border-outline-variant/20 pb-3",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center gap-2 text-primary",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[26px]",
										children: "add_shopping_cart"
									}), /* @__PURE__ */ _jsx("h3", {
										className: "font-headline-md font-bold text-on-surface",
										children: "Upgrade de Armazenamento"
									})]
								}), /* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => setShowUpgradeModal(false),
									className: "p-1 rounded-lg hover:bg-surface-container text-on-surface-variant",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "close"
									})
								})]
							}),
							/* @__PURE__ */ _jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: "Selecione o plano desejado para expandir imediatamente a capacidade do seu hub omnichannel sem interrupção de atendimento ou perda de históricos."
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => handleContractPlan("+10 GB Adicionais", 10, "R$ 29,90/mês"),
										className: "w-full p-3.5 rounded-xl border-2 border-primary bg-primary/5 hover:bg-primary/10 cursor-pointer transition-all flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ _jsx("strong", {
												className: "font-title-md text-on-surface",
												children: "+10 GB Adicionais"
											}), /* @__PURE__ */ _jsx("span", {
												className: "px-2 py-0.5 rounded-full bg-primary-container text-on-primary text-[10px] font-bold",
												children: "Mais Escolhido"
											})]
										}), /* @__PURE__ */ _jsx("span", {
											className: "text-[12px] text-on-surface-variant block mt-0.5",
											children: "Ideal para chats WhatsApp recorrentes e catálogos"
										})] }), /* @__PURE__ */ _jsxs("div", {
											className: "text-right",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "font-headline-sm font-bold text-primary",
												children: "R$ 29,90"
											}), /* @__PURE__ */ _jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "/mês"
											})]
										})]
									}),
									/* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => handleContractPlan("+50 GB Adicionais", 50, "R$ 89,90/mês"),
										className: "w-full p-3.5 rounded-xl border border-outline-variant/30 hover:border-secondary hover:bg-secondary/5 cursor-pointer transition-all flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("strong", {
											className: "font-title-md text-on-surface block",
											children: "+50 GB Adicionais"
										}), /* @__PURE__ */ _jsx("span", {
											className: "text-[12px] text-on-surface-variant block mt-0.5",
											children: "Suporte a vídeos 4K e catálogos de alta definição"
										})] }), /* @__PURE__ */ _jsxs("div", {
											className: "text-right",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "font-headline-sm font-bold text-secondary",
												children: "R$ 89,90"
											}), /* @__PURE__ */ _jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "/mês"
											})]
										})]
									}),
									/* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => handleContractPlan("+200 GB Enterprise", 200, "R$ 199,00/mês"),
										className: "w-full p-3.5 rounded-xl border border-outline-variant/30 hover:border-tertiary hover:bg-tertiary/5 cursor-pointer transition-all flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("strong", {
											className: "font-title-md text-on-surface block",
											children: "+200 GB Enterprise"
										}), /* @__PURE__ */ _jsx("span", {
											className: "text-[12px] text-on-surface-variant block mt-0.5",
											children: "Bucket dedicado AWS S3 e conformidade regulamentar"
										})] }), /* @__PURE__ */ _jsxs("div", {
											className: "text-right",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "font-headline-sm font-bold text-tertiary",
												children: "R$ 199,00"
											}), /* @__PURE__ */ _jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "/mês"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ _jsx("div", {
								className: "flex justify-end gap-2 pt-2 border-t border-outline-variant/20",
								children: /* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => setShowUpgradeModal(false),
									className: "px-4 py-2 rounded-xl bg-surface-container text-on-surface font-title-md font-semibold",
									children: "Cancelar"
								})
							})
						]
					})
				}) })
			}),
			/* @__PURE__ */ _jsx(Reveal, {
				when: () => previewFile() !== null,
				children: /* @__PURE__ */ _jsx(Reveal.If, { children: (() => {
					const file = previewFile();
					if (!file) return /* @__PURE__ */ _jsx(_Fragment, {});
					return /* @__PURE__ */ _jsx("div", {
						className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in",
						children: /* @__PURE__ */ _jsxs("div", {
							className: "bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4",
							children: [
								/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ _jsx("div", {
											className: `w-8 h-8 rounded-lg ${file.iconBg} ${file.iconColor} flex items-center justify-center`,
											children: /* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: file.icon
											})
										}), /* @__PURE__ */ _jsx("h3", {
											className: "font-title-lg font-bold text-on-surface truncate max-w-[240px]",
											children: file.name
										})]
									}), /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => setPreviewFile(null),
										className: "p-1 rounded-lg hover:bg-surface-container text-on-surface-variant",
										children: /* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[20px]",
											children: "close"
										})
									})]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "p-4 rounded-xl bg-surface-container-low space-y-2 text-body-sm",
									children: [
										/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "text-on-surface-variant",
												children: "Tamanho:"
											}), /* @__PURE__ */ _jsx("strong", {
												className: "text-on-surface font-mono",
												children: file.sizeText
											})]
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "text-on-surface-variant",
												children: "Formato:"
											}), /* @__PURE__ */ _jsx("span", {
												className: "font-semibold text-primary",
												children: file.format
											})]
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "text-on-surface-variant",
												children: "Origem:"
											}), /* @__PURE__ */ _jsxs("span", {
												className: "text-on-surface",
												children: [
													file.originTitle,
													" • ",
													file.originSub
												]
											})]
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "text-on-surface-variant",
												children: "Canal:"
											}), /* @__PURE__ */ _jsx("span", {
												className: "text-on-surface",
												children: file.channel
											})]
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "text-on-surface-variant",
												children: "Data do Upload:"
											}), /* @__PURE__ */ _jsx("span", {
												className: "text-on-surface",
												children: file.dateTime
											})]
										}),
										/* @__PURE__ */ _jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "text-on-surface-variant",
												children: "Identificador:"
											}), /* @__PURE__ */ _jsx("span", {
												className: "font-mono text-[11px] text-on-surface-variant",
												children: file.ident
											})]
										})
									]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20",
									children: [/* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => setPreviewFile(null),
										className: "px-4 py-2 rounded-xl bg-surface-container text-on-surface font-title-md font-semibold",
										children: "Fechar"
									}), /* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => {
											showToast("Download Concluído", `Arquivo ${file.name} baixado.`, "success");
											setPreviewFile(null);
										},
										className: "px-4 py-2 rounded-xl bg-primary text-on-primary font-title-md font-bold flex items-center gap-1.5",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "download"
										}), /* @__PURE__ */ _jsx("span", { children: "Baixar" })]
									})]
								})
							]
						})
					});
				})() })
			})
		]
	});
}

//# sourceMappingURL=storage-screen.__client_ssr.js.map
