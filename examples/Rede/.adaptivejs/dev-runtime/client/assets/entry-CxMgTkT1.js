import { _ as jsx, b as __exportAll, c as signal, g as Fragment, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";
import { t as SCREEN_ROUTES } from "./chunk-BAJW75ro.js";

//#region src/components/omni-hub/storage-screen.tsx
var storage_screen_exports = /* @__PURE__ */ __exportAll({ StorageScreen: () => StorageScreen });
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
function StorageScreen() {
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
	return /* @__PURE__ */ jsxs("div", {
		className: "w-full",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1440px] mx-auto",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-1",
							children: [
								/* @__PURE__ */ jsxs("nav", {
									className: "flex items-center gap-1 text-on-surface-variant font-label-sm",
									children: [
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: goToSettings,
											className: "hover:text-primary transition-colors cursor-pointer",
											children: "Configurações"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[14px]",
											children: "chevron_right"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "hover:text-primary transition-colors cursor-pointer",
											children: "Espaço em Disco & Mídias"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[14px]",
											children: "chevron_right"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-primary font-semibold",
											children: "Monitoramento de Armazenamento"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-2 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center",
										children: /* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[26px]",
											children: "cloud_sync"
										})
									}), /* @__PURE__ */ jsx("h1", {
										className: "font-headline-xl text-on-surface tracking-tight font-bold",
										children: "Armazenamento & Gestão de Mídias"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "font-body-md text-on-surface-variant max-w-3xl",
									children: "Monitore o volume de arquivos de conversas, catálogos, mídias de campanhas e documentos fiscais trafegados nos mensageiros."
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: () => isCleaningCache(),
								onClick: handleQuickCacheClean,
								className: "h-9 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-title-md shadow-sm hover:bg-surface-container-high transition-all flex items-center gap-1.5 active:scale-95 border border-outline-variant/20 cursor-pointer disabled:opacity-70",
								children: () => isCleaningCache() ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[18px] animate-spin text-primary",
									children: "progress_activity"
								}), /* @__PURE__ */ jsx("span", { children: "Limpando 180 MB..." })] }) : cacheCleaned() ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[18px] text-tertiary",
									children: "check"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-tertiary font-bold",
									children: "180 MB Liberados!"
								})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[18px] text-on-surface-variant",
									children: "cleaning_services"
								}), /* @__PURE__ */ jsx("span", { children: "Limpeza Rápida de Cache" })] })
							}), /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setShowUpgradeModal(true),
								className: "h-9 px-4 rounded-xl bg-primary-container text-on-primary font-title-md shadow-sm hover:bg-primary transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer font-bold",
								children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[18px]",
									children: "add_shopping_cart"
								}), /* @__PURE__ */ jsx("span", { children: "+ Fazer Upgrade de Espaço" })]
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm p-6 flex flex-col gap-5 border border-outline-variant/20",
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute -right-16 -top-16 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none" }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-title-md text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Cota Padrão Alocada"
										}), /* @__PURE__ */ jsxs("span", {
											className: "px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm font-semibold flex items-center gap-1",
											children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-error animate-ping" }), () => percentageUsed() >= 80 ? `Crítico: ${percentageUsed()}%` : `Uso: ${percentageUsed()}%`]
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline gap-2",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "font-headline-xl text-primary font-bold",
											children: [() => usedGB().toFixed(2).replace(".", ","), " GB"]
										}), /* @__PURE__ */ jsxs("span", {
											className: "font-body-lg text-on-surface-variant",
											children: [
												"utilizados de",
												" ",
												/* @__PURE__ */ jsxs("strong", {
													className: "text-on-surface font-semibold",
													children: [() => totalCapacityGB().toFixed(2).replace(".", ","), " GB"]
												})
											]
										})]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col items-end",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-label-sm text-on-surface-variant",
											children: "Disponível em Nuvem"
										}), /* @__PURE__ */ jsxs("span", {
											className: "font-title-lg text-tertiary font-bold",
											children: [() => freeMB(), " MB livres"]
										})]
									}), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: scrollToPackages,
										className: "h-9 px-3.5 rounded-xl bg-primary text-on-primary font-title-md shadow-sm hover:bg-on-primary-container transition-all flex items-center gap-1.5 shrink-0 font-bold",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "cloud_upload"
										}), /* @__PURE__ */ jsx("span", { children: "Comprar Pacote Adicional (+10 GB por R$ 29/mês)" })]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1 relative z-10",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "w-full h-3.5 rounded-full bg-surface-container-high overflow-hidden flex shadow-inner",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "h-full bg-primary-container transition-all hover:opacity-90",
											style: { width: "38.3%" },
											title: "Fotos & Imagens: 1,15 GB (38.3%)"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "h-full bg-secondary transition-all hover:opacity-90",
											style: { width: "29.6%" },
											title: "Vídeos & Reels: 890 MB (29.6%)"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "h-full bg-tertiary-container transition-all hover:opacity-90",
											style: { width: "10.3%" },
											title: "Documentos & PDFs: 310 MB (10.3%)"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "h-full bg-outline transition-all hover:opacity-90",
											style: { width: "4.0%" },
											title: "Áudios de Voz & Outros: 120 MB (4.0%)"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "h-full bg-transparent flex-1",
											title: () => `Livre: ${freeMB()} MB`
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center justify-between gap-4 pt-1 font-body-sm text-on-surface-variant",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-4",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-primary-container" }),
													/* @__PURE__ */ jsx("span", {
														className: "font-medium text-on-surface",
														children: "Fotos & Imagens"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "font-code-sm text-on-surface-variant",
														children: "1,15 GB (38.3%)"
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-secondary" }),
													/* @__PURE__ */ jsx("span", {
														className: "font-medium text-on-surface",
														children: "Vídeos & Reels"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "font-code-sm text-on-surface-variant",
														children: "890 MB (29.6%)"
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-tertiary-container" }),
													/* @__PURE__ */ jsx("span", {
														className: "font-medium text-on-surface",
														children: "Documentos & PDFs"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "font-code-sm text-on-surface-variant",
														children: "310 MB (10.3%)"
													})
												]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-outline" }),
													/* @__PURE__ */ jsx("span", {
														className: "font-medium text-on-surface",
														children: "Áudios & Whisper"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "font-code-sm text-on-surface-variant",
														children: "120 MB (4.0%)"
													})
												]
											})
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-surface-variant" }),
											/* @__PURE__ */ jsx("span", {
												className: "font-medium text-on-surface",
												children: "Espaço Não Utilizado"
											}),
											/* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-on-surface-variant font-semibold",
												children: () => `${freeMB()} MB (${(100 - percentageUsed()).toFixed(1)}%)`
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-3.5 rounded-xl bg-error-container/40 text-on-error-container flex items-start gap-3 relative z-10 border border-error-container/50",
								children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[22px] text-error shrink-0",
									children: "warning"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-0.5",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-title-md font-bold text-error",
										children: () => `Atenção: Você atingiu ${percentageUsed()}% da sua cota padrão de ${totalCapacityGB().toFixed(0)} GB.`
									}), /* @__PURE__ */ jsx("p", {
										className: "font-body-sm text-on-surface-variant",
										children: "Mídias temporárias e arquivos antigos com mais de 90 dias poderão ter retenção automática programada caso a capacidade se esgote."
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary",
											children: /* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[24px]",
												children: "photo_library"
											})
										}), /* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm font-semibold",
											children: "38.3%"
										})]
									}),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Fotos & Imagens"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-headline-lg text-on-surface font-bold mt-0.5",
											children: "1,15 GB"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-body-sm text-on-surface-variant mt-1",
											children: "4.820 arquivos registrados em chats e vitrines."
										})
									] }),
									/* @__PURE__ */ jsxs("div", {
										className: "p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx("span", { children: "Formatos:" }), /* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: ".jpg, .png, .webp"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx("span", { children: "TurboCompress:" }), /* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-tertiary font-bold",
												children: "-42% poupados"
											})]
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ jsx("div", {
											className: "bg-primary-container h-full rounded-full",
											style: { width: "38.3%" }
										})
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary",
											children: /* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[24px]",
												children: "movie"
											})
										}), /* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm font-semibold",
											children: "29.6%"
										})]
									}),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Vídeos & Reels"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-headline-lg text-on-surface font-bold mt-0.5",
											children: "890 MB"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-body-sm text-on-surface-variant mt-1",
											children: "312 vídeos promocionais e unboxing enviados."
										})
									] }),
									/* @__PURE__ */ jsxs("div", {
										className: "p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx("span", { children: "Resolução:" }), /* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "720p / 1080p MP4"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx("span", { children: "API Gateway:" }), /* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "WhatsApp Cloud OK"
											})]
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ jsx("div", {
											className: "bg-secondary h-full rounded-full",
											style: { width: "29.6%" }
										})
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary",
											children: /* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[24px]",
												children: "description"
											})
										}), /* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm font-semibold",
											children: "10.3%"
										})]
									}),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Documentos & PDFs"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-headline-lg text-on-surface font-bold mt-0.5",
											children: "310 MB"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-body-sm text-on-surface-variant mt-1",
											children: "1.450 contratos, faturas ERP e notas fiscais."
										})
									] }),
									/* @__PURE__ */ jsxs("div", {
										className: "p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx("span", { children: "Segurança:" }), /* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "AES-256 Em Repouso"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx("span", { children: "Sincronia:" }), /* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-primary font-semibold",
												children: "ERP Totvs & Bling"
											})]
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ jsx("div", {
											className: "bg-tertiary-container h-full rounded-full",
											style: { width: "10.3%" }
										})
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-outline",
											children: /* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[24px]",
												children: "mic"
											})
										}), /* @__PURE__ */ jsx("span", {
											className: "px-2 py-0.5 rounded-full bg-surface-container text-outline font-label-sm font-semibold",
											children: "4.0%"
										})]
									}),
									/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold",
											children: "Áudios & Transcrições"
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "font-headline-lg text-on-surface font-bold mt-0.5",
											children: "120 MB"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "font-body-sm text-on-surface-variant mt-1",
											children: "3.910 mensagens de áudio dos clientes no Omni."
										})
									] }),
									/* @__PURE__ */ jsxs("div", {
										className: "p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx("span", { children: "Formato Áudio:" }), /* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "OGG Opus 16kbps"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ jsx("span", { children: "IA Transcrição:" }), /* @__PURE__ */ jsx("span", {
												className: "font-code-sm text-on-surface font-semibold",
												children: "Whisper v3 Turbo"
											})]
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ jsx("div", {
											className: "bg-outline h-full rounded-full",
											style: { width: "4.0%" }
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-4 scroll-mt-20",
						id: "expansion-packages",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "font-headline-md text-on-surface font-bold",
								children: "Pacotes de Expansão de Armazenamento"
							}), /* @__PURE__ */ jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: "Aumente sua cota sem interrupções operacionais e mantenha históricos completos de conversas e mídias."
							})] }), /* @__PURE__ */ jsxs("span", {
								className: "hidden sm:inline-flex items-center gap-1 font-label-sm text-primary font-semibold",
								children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[16px]",
									children: "verified"
								}), "Cobrança flexível pós-pago na fatura"]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden border border-primary/30",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "absolute top-0 right-0",
											children: /* @__PURE__ */ jsx("span", {
												className: "px-3.5 py-1 rounded-bl-xl bg-primary-container text-on-primary font-label-sm font-bold tracking-wide uppercase",
												children: "Mais Escolhido"
											})
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-2 mt-2",
											children: [
												/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ jsx("span", {
														className: "material-symbols-outlined text-[24px] text-primary",
														children: "cloud"
													}), /* @__PURE__ */ jsx("h4", {
														className: "font-title-lg text-on-surface font-bold",
														children: "+10 GB Adicionais"
													})]
												}),
												/* @__PURE__ */ jsx("p", {
													className: "font-body-sm text-on-surface-variant",
													children: "Ideal para operações em crescimento contínuo de WhatsApp e catálogos recorrentes."
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "flex items-baseline gap-1 mt-1",
													children: [/* @__PURE__ */ jsx("span", {
														className: "font-headline-xl text-primary font-bold",
														children: "R$ 29,90"
													}), /* @__PURE__ */ jsx("span", {
														className: "font-body-sm text-on-surface-variant",
														children: "/mês"
													})]
												}),
												/* @__PURE__ */ jsxs("ul", {
													className: "flex flex-col gap-1.5 pt-1 font-body-sm text-on-surface",
													children: [
														/* @__PURE__ */ jsxs("li", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ jsx("span", {
																className: "material-symbols-outlined text-[16px] text-primary",
																children: "check_circle"
															}), /* @__PURE__ */ jsx("span", { children: "Ativação instantânea em 1 clique" })]
														}),
														/* @__PURE__ */ jsxs("li", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ jsx("span", {
																className: "material-symbols-outlined text-[16px] text-primary",
																children: "check_circle"
															}), /* @__PURE__ */ jsx("span", { children: "Histórico garantido sem auto-expurgo" })]
														}),
														/* @__PURE__ */ jsxs("li", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ jsx("span", {
																className: "material-symbols-outlined text-[16px] text-primary",
																children: "check_circle"
															}), /* @__PURE__ */ jsx("span", { children: "Compressão inteligente ativada" })]
														})
													]
												})
											]
										}),
										/* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => handleContractPlan("+10 GB Adicionais", 10, "R$ 29,90/mês"),
											className: "w-full h-10 rounded-xl bg-primary-container text-on-primary font-title-md shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer font-bold",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: "bolt"
											}), /* @__PURE__ */ jsx("span", { children: "Contratar Agora" })]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5 hover:shadow-md transition-shadow border border-outline-variant/20",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-2",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("span", {
													className: "material-symbols-outlined text-[24px] text-secondary",
													children: "database"
												}), /* @__PURE__ */ jsx("h4", {
													className: "font-title-lg text-on-surface font-bold",
													children: "+50 GB Adicionais"
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "font-body-sm text-on-surface-variant",
												children: "Perfeito para lojas de varejo com grandes fluxos de mídias de alta definição e vídeos."
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-baseline gap-1 mt-1",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-headline-xl text-secondary font-bold",
													children: "R$ 89,90"
												}), /* @__PURE__ */ jsx("span", {
													className: "font-body-sm text-on-surface-variant",
													children: "/mês"
												})]
											}),
											/* @__PURE__ */ jsxs("ul", {
												className: "flex flex-col gap-1.5 pt-1 font-body-sm text-on-surface",
												children: [
													/* @__PURE__ */ jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "material-symbols-outlined text-[16px] text-secondary",
															children: "check_circle"
														}), /* @__PURE__ */ jsx("span", { children: "Suporte a vídeos até 4K e catálogos pesados" })]
													}),
													/* @__PURE__ */ jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "material-symbols-outlined text-[16px] text-secondary",
															children: "check_circle"
														}), /* @__PURE__ */ jsx("span", { children: "Prioridade no pipeline de CDN Cloudflare" })]
													}),
													/* @__PURE__ */ jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "material-symbols-outlined text-[16px] text-secondary",
															children: "check_circle"
														}), /* @__PURE__ */ jsx("span", { children: "Exportação periódica em massa" })]
													})
												]
											})
										]
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => handleContractPlan("+50 GB Adicionais", 50, "R$ 89,90/mês"),
										className: "w-full h-10 rounded-xl bg-surface-container text-on-surface font-title-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer font-bold",
										children: /* @__PURE__ */ jsx("span", { children: "Contratar Plano" })
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5 hover:shadow-md transition-shadow border border-outline-variant/20",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-2",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ jsx("span", {
													className: "material-symbols-outlined text-[24px] text-tertiary",
													children: "domain"
												}), /* @__PURE__ */ jsx("h4", {
													className: "font-title-lg text-on-surface font-bold",
													children: "+200 GB Enterprise"
												})]
											}),
											/* @__PURE__ */ jsx("p", {
												className: "font-body-sm text-on-surface-variant",
												children: "Infraestrutura corporativa dedicada com retenção perpétua de documentos fiscais e auditoria."
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-baseline gap-1 mt-1",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-headline-xl text-tertiary font-bold",
													children: "R$ 199,00"
												}), /* @__PURE__ */ jsx("span", {
													className: "font-body-sm text-on-surface-variant",
													children: "/mês"
												})]
											}),
											/* @__PURE__ */ jsxs("ul", {
												className: "flex flex-col gap-1.5 pt-1 font-body-sm text-on-surface",
												children: [
													/* @__PURE__ */ jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "material-symbols-outlined text-[16px] text-tertiary",
															children: "check_circle"
														}), /* @__PURE__ */ jsx("span", { children: "Bucket AWS S3 Dedicado na região Brasil" })]
													}),
													/* @__PURE__ */ jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "material-symbols-outlined text-[16px] text-tertiary",
															children: "check_circle"
														}), /* @__PURE__ */ jsx("span", { children: "Retenção legal regulamentar de 5 anos" })]
													}),
													/* @__PURE__ */ jsxs("li", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ jsx("span", {
															className: "material-symbols-outlined text-[16px] text-tertiary",
															children: "check_circle"
														}), /* @__PURE__ */ jsx("span", { children: "SLA de disponibilidade 99.99%" })]
													})
												]
											})
										]
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => showToast("Gerente de Conta", "Um consultor empresarial do time de infraestrutura entrará em contato.", "info"),
										className: "w-full h-10 rounded-xl bg-surface-container text-on-surface font-title-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer font-bold",
										children: /* @__PURE__ */ jsx("span", { children: "Falar com Gerente de Conta" })
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-surface-container-lowest shadow-sm p-5 flex flex-col gap-4 border border-outline-variant/20",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col lg:flex-row lg:items-center justify-between gap-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative flex-1 max-w-lg",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]",
										children: "search"
									}), /* @__PURE__ */ jsx("input", {
										type: "text",
										value: () => searchQuery(),
										onInput: (event) => setSearchQuery(event.currentTarget.value),
										placeholder: "Pesquisar por nome do arquivo, protocolo de chat ou cliente...",
										className: "w-full h-10 pl-10 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-on-surface-variant/60 shadow-inner border border-outline-variant/20"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant/20",
											children: [
												"all",
												"photo",
												"video",
												"doc",
												"audio"
											].map((type) => {
												return /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => setSelectedType(type),
													className: () => selectedType() === type ? "px-3 py-1 rounded-lg font-label-sm font-semibold transition-colors cursor-pointer text-on-primary bg-primary-container shadow-sm" : "px-3 py-1 rounded-lg font-label-sm font-semibold transition-colors cursor-pointer text-on-surface-variant hover:text-on-surface",
													children: TYPE_LABELS[type]
												}, type);
											})
										}),
										/* @__PURE__ */ jsxs("select", {
											value: () => selectedChannel(),
											onChange: (event) => setSelectedChannel(event.currentTarget.value),
											className: "h-9 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm outline-none cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "all",
													children: "Todos os Canais"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "WhatsApp Gupshup",
													children: "WhatsApp Gupshup"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Instagram Direct",
													children: "Instagram Direct"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Telegram Omni",
													children: "Telegram Omni"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Catálogo ERP Totvs",
													children: "Catálogo ERP Totvs"
												})
											]
										}),
										/* @__PURE__ */ jsxs("select", {
											value: () => sortBy(),
											onChange: (event) => setSortBy(event.currentTarget.value),
											className: "h-9 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm outline-none cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "size_desc",
													children: "Mais pesados primeiro"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "recent",
													children: "Mais recentes"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "oldest",
													children: "Mais antigos"
												})
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ jsxs("table", {
									className: "w-full text-left font-body-sm border-collapse",
									children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
										className: "text-on-surface-variant font-label-sm uppercase tracking-wider bg-surface-container-low/60 rounded-xl",
										children: [
											/* @__PURE__ */ jsx("th", {
												className: "py-3 px-4 rounded-l-xl",
												children: "Arquivo & Identificador"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "py-3 px-3",
												children: "Formato"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "py-3 px-3",
												children: "Origem & Vínculo"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "py-3 px-3",
												children: "Tamanho"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "py-3 px-3",
												children: "Data / Hora"
											}),
											/* @__PURE__ */ jsx("th", {
												className: "py-3 px-4 text-right rounded-r-xl",
												children: "Ações"
											})
										]
									}) }), /* @__PURE__ */ jsx("tbody", {
										className: "text-on-surface divide-y divide-outline-variant/10",
										children: (() => {
											const rows = filteredFiles();
											if (rows.length === 0) return /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
												colSpan: 6,
												className: "py-8 text-center text-on-surface-variant",
												children: /* @__PURE__ */ jsxs("div", {
													className: "flex flex-col items-center justify-center gap-2",
													children: [/* @__PURE__ */ jsx("span", {
														className: "material-symbols-outlined text-[36px] text-on-surface-variant/40",
														children: "folder_off"
													}), /* @__PURE__ */ jsx("span", { children: "Nenhum arquivo encontrado com os filtros selecionados." })]
												})
											}) });
											return rows.map((file) => /* @__PURE__ */ jsxs("tr", {
												className: "hover:bg-surface-container-low/40 transition-colors group",
												children: [
													/* @__PURE__ */ jsx("td", {
														className: "py-3.5 px-4",
														children: /* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-3",
															children: [/* @__PURE__ */ jsx("div", {
																className: `w-9 h-9 rounded-lg ${file.iconBg} ${file.iconColor} flex items-center justify-center shrink-0`,
																children: /* @__PURE__ */ jsx("span", {
																	className: "material-symbols-outlined text-[20px]",
																	children: file.icon
																})
															}), /* @__PURE__ */ jsxs("div", {
																className: "flex flex-col min-w-0 max-w-xs md:max-w-md",
																children: [/* @__PURE__ */ jsx("span", {
																	className: "font-title-md font-semibold truncate text-on-surface",
																	children: file.name
																}), /* @__PURE__ */ jsx("span", {
																	className: "font-label-sm text-on-surface-variant font-mono",
																	children: file.ident
																})]
															})]
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3.5 px-3",
														children: /* @__PURE__ */ jsx("span", {
															className: "px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm font-semibold",
															children: file.format
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3.5 px-3",
														children: /* @__PURE__ */ jsxs("div", {
															className: "flex flex-col",
															children: [/* @__PURE__ */ jsx("span", {
																className: "font-title-md text-on-surface font-semibold",
																children: file.originTitle
															}), /* @__PURE__ */ jsx("span", {
																className: "font-body-sm text-on-surface-variant",
																children: file.originSub
															})]
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3.5 px-3 font-code-sm font-bold text-on-surface",
														children: file.sizeText
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3.5 px-3 text-on-surface-variant",
														children: file.dateTime
													}),
													/* @__PURE__ */ jsx("td", {
														className: "py-3.5 px-4 text-right",
														children: /* @__PURE__ */ jsxs("div", {
															className: "flex items-center justify-end gap-1",
															children: [
																/* @__PURE__ */ jsx("button", {
																	type: "button",
																	onClick: () => showToast("Download Iniciado", `Baixando ${file.name}...`, "success"),
																	className: "p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer",
																	title: "Download do Arquivo",
																	children: /* @__PURE__ */ jsx("span", {
																		className: "material-symbols-outlined text-[18px]",
																		children: "download"
																	})
																}),
																/* @__PURE__ */ jsx("button", {
																	type: "button",
																	onClick: () => setPreviewFile(file),
																	className: "p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer",
																	title: "Visualizar Detalhes",
																	children: /* @__PURE__ */ jsx("span", {
																		className: "material-symbols-outlined text-[18px]",
																		children: "visibility"
																	})
																}),
																/* @__PURE__ */ jsx("button", {
																	type: "button",
																	onClick: () => handleDeleteFile(file),
																	className: "p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors cursor-pointer",
																	title: "Liberar Espaço",
																	children: /* @__PURE__ */ jsx("span", {
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
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 text-on-surface-variant font-body-sm",
								children: [/* @__PURE__ */ jsxs("span", { children: [
									"Exibindo ",
									/* @__PURE__ */ jsx("strong", {
										className: "text-on-surface font-semibold",
										children: () => `1-${filteredFiles().length}`
									}),
									" de",
									" ",
									/* @__PURE__ */ jsx("strong", {
										className: "text-on-surface font-semibold",
										children: "6.582 arquivos armazenados"
									}),
									" •",
									" ",
									() => `${usedGB().toFixed(2).replace(".", ",")} GB totais`
								] }), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors disabled:opacity-40",
											disabled: true,
											children: "Anterior"
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-primary-container text-on-primary font-title-md font-bold",
											children: "1"
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors",
											children: "2"
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors",
											children: "3"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "px-2",
											children: "..."
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors",
											children: "941"
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											className: "px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors",
											children: "Próxima"
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-surface-container-lowest shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/20",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-10 h-10 rounded-xl bg-surface-container-high text-tertiary flex items-center justify-center shrink-0",
								children: /* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[24px]",
									children: "verified_user"
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-title-md text-on-surface font-bold",
									children: "Políticas de Retenção & Governança de Dados"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-body-sm text-on-surface-variant",
									children: "Conformidade com LGPD, criptografia ponta a ponta e redundância AWS multi-região São Paulo."
								})]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl shrink-0 border border-outline-variant/20",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col text-right",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-title-md text-on-surface font-semibold",
									children: "Auto-expurgo 90 dias"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-label-sm text-primary font-bold",
									children: () => autoPurgeEnabled() ? "Economiza ~600 MB/mês" : "Auto-expurgo Desativado"
								})]
							}), /* @__PURE__ */ jsxs("label", {
								className: "relative inline-flex items-center cursor-pointer",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: () => autoPurgeEnabled(),
									onChange: (event) => {
										setAutoPurgeEnabled(event.currentTarget.checked);
										showToast(event.currentTarget.checked ? "Auto-expurgo Ativado" : "Auto-expurgo Desativado", event.currentTarget.checked ? "Arquivos de mídia com mais de 90 dias serão purgados automaticamente." : "Retenção perpétua ativada. Pode consumir maior cota em disco.", event.currentTarget.checked ? "success" : "warning");
									},
									className: "sr-only peer"
								}), /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container" })]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(Reveal, {
				when: () => showUpgradeModal(),
				children: /* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsx("div", {
					className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-5",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between border-b border-outline-variant/20 pb-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-primary",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[26px]",
										children: "add_shopping_cart"
									}), /* @__PURE__ */ jsx("h3", {
										className: "font-headline-md font-bold text-on-surface",
										children: "Upgrade de Armazenamento"
									})]
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setShowUpgradeModal(false),
									className: "p-1 rounded-lg hover:bg-surface-container text-on-surface-variant",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[20px]",
										children: "close"
									})
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: "Selecione o plano desejado para expandir imediatamente a capacidade do seu hub omnichannel sem interrupção de atendimento ou perda de históricos."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => handleContractPlan("+10 GB Adicionais", 10, "R$ 29,90/mês"),
										className: "w-full p-3.5 rounded-xl border-2 border-primary bg-primary/5 hover:bg-primary/10 cursor-pointer transition-all flex items-center justify-between",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("strong", {
												className: "font-title-md text-on-surface",
												children: "+10 GB Adicionais"
											}), /* @__PURE__ */ jsx("span", {
												className: "px-2 py-0.5 rounded-full bg-primary-container text-on-primary text-[10px] font-bold",
												children: "Mais Escolhido"
											})]
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[12px] text-on-surface-variant block mt-0.5",
											children: "Ideal para chats WhatsApp recorrentes e catálogos"
										})] }), /* @__PURE__ */ jsxs("div", {
											className: "text-right",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-headline-sm font-bold text-primary",
												children: "R$ 29,90"
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "/mês"
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => handleContractPlan("+50 GB Adicionais", 50, "R$ 89,90/mês"),
										className: "w-full p-3.5 rounded-xl border border-outline-variant/30 hover:border-secondary hover:bg-secondary/5 cursor-pointer transition-all flex items-center justify-between",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", {
											className: "font-title-md text-on-surface block",
											children: "+50 GB Adicionais"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[12px] text-on-surface-variant block mt-0.5",
											children: "Suporte a vídeos 4K e catálogos de alta definição"
										})] }), /* @__PURE__ */ jsxs("div", {
											className: "text-right",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-headline-sm font-bold text-secondary",
												children: "R$ 89,90"
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "/mês"
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => handleContractPlan("+200 GB Enterprise", 200, "R$ 199,00/mês"),
										className: "w-full p-3.5 rounded-xl border border-outline-variant/30 hover:border-tertiary hover:bg-tertiary/5 cursor-pointer transition-all flex items-center justify-between",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", {
											className: "font-title-md text-on-surface block",
											children: "+200 GB Enterprise"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[12px] text-on-surface-variant block mt-0.5",
											children: "Bucket dedicado AWS S3 e conformidade regulamentar"
										})] }), /* @__PURE__ */ jsxs("div", {
											className: "text-right",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-headline-sm font-bold text-tertiary",
												children: "R$ 199,00"
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[11px] text-on-surface-variant block",
												children: "/mês"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end gap-2 pt-2 border-t border-outline-variant/20",
								children: /* @__PURE__ */ jsx("button", {
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
			/* @__PURE__ */ jsx(Reveal, {
				when: () => previewFile() !== null,
				children: /* @__PURE__ */ jsx(Reveal.If, { children: (() => {
					const file = previewFile();
					if (!file) return /* @__PURE__ */ jsx(Fragment, {});
					return /* @__PURE__ */ jsx("div", {
						className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in",
						children: /* @__PURE__ */ jsxs("div", {
							className: "bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ jsx("div", {
											className: `w-8 h-8 rounded-lg ${file.iconBg} ${file.iconColor} flex items-center justify-center`,
											children: /* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: file.icon
											})
										}), /* @__PURE__ */ jsx("h3", {
											className: "font-title-lg font-bold text-on-surface truncate max-w-[240px]",
											children: file.name
										})]
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setPreviewFile(null),
										className: "p-1 rounded-lg hover:bg-surface-container text-on-surface-variant",
										children: /* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[20px]",
											children: "close"
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "p-4 rounded-xl bg-surface-container-low space-y-2 text-body-sm",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-on-surface-variant",
												children: "Tamanho:"
											}), /* @__PURE__ */ jsx("strong", {
												className: "text-on-surface font-mono",
												children: file.sizeText
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-on-surface-variant",
												children: "Formato:"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-semibold text-primary",
												children: file.format
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-on-surface-variant",
												children: "Origem:"
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-on-surface",
												children: [
													file.originTitle,
													" • ",
													file.originSub
												]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-on-surface-variant",
												children: "Canal:"
											}), /* @__PURE__ */ jsx("span", {
												className: "text-on-surface",
												children: file.channel
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-on-surface-variant",
												children: "Data do Upload:"
											}), /* @__PURE__ */ jsx("span", {
												className: "text-on-surface",
												children: file.dateTime
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-on-surface-variant",
												children: "Identificador:"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-mono text-[11px] text-on-surface-variant",
												children: file.ident
											})]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20",
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setPreviewFile(null),
										className: "px-4 py-2 rounded-xl bg-surface-container text-on-surface font-title-md font-semibold",
										children: "Fechar"
									}), /* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => {
											showToast("Download Concluído", `Arquivo ${file.name} baixado.`, "success");
											setPreviewFile(null);
										},
										className: "px-4 py-2 rounded-xl bg-primary text-on-primary font-title-md font-bold flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "download"
										}), /* @__PURE__ */ jsx("span", { children: "Baixar" })]
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
typeof StorageScreen === "function" && markClientExport(StorageScreen, "components/omni-hub/storage-screen", "StorageScreen", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__storage-screen.tsx
hydrateClientComponents("components/omni-hub/storage-screen", storage_screen_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktQ3hNZ1RrVDEuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9zdG9yYWdlLXNjcmVlbi50c3giLCIuLi8uLi90ZW1wL2NsaWVudC1jb21wb25lbnRzL2NvbXBvbmVudHNfX29tbmktaHViX19zdG9yYWdlLXNjcmVlbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJoeWRyYXRlXCI7XG5cbmltcG9ydCB7ICBzaWduYWwsIHVzZVJvdXRlciB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5pbXBvcnQgeyBzaG93VG9hc3QgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3RvYXN0LXN0b3JlXCI7XG5pbXBvcnQgeyBTQ1JFRU5fUk9VVEVTIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi90eXBlc1wiO1xuXG5pbnRlcmZhY2UgTWVkaWFGaWxlSXRlbSB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgaWRlbnQ6IHN0cmluZztcbiAgZm9ybWF0OiBzdHJpbmc7XG4gIHR5cGU6IFwicGhvdG9cIiB8IFwidmlkZW9cIiB8IFwiZG9jXCIgfCBcImF1ZGlvXCI7XG4gIG9yaWdpblRpdGxlOiBzdHJpbmc7XG4gIG9yaWdpblN1Yjogc3RyaW5nO1xuICBjaGFubmVsOiBzdHJpbmc7XG4gIHNpemVNQjogbnVtYmVyO1xuICBzaXplVGV4dDogc3RyaW5nO1xuICBkYXRlVGltZTogc3RyaW5nO1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgaWNvbjogc3RyaW5nO1xuICBpY29uQmc6IHN0cmluZztcbiAgaWNvbkNvbG9yOiBzdHJpbmc7XG59XG5cbnR5cGUgTWVkaWFUeXBlRmlsdGVyID0gXCJhbGxcIiB8IFwicGhvdG9cIiB8IFwidmlkZW9cIiB8IFwiZG9jXCIgfCBcImF1ZGlvXCI7XG50eXBlIFNvcnRPcHRpb24gPSBcInNpemVfZGVzY1wiIHwgXCJyZWNlbnRcIiB8IFwib2xkZXN0XCI7XG5cbmNvbnN0IElOSVRJQUxfTUVESUFfRklMRVM6IE1lZGlhRmlsZUl0ZW1bXSA9IFtcbiAge1xuICAgIGlkOiBcImYxXCIsXG4gICAgbmFtZTogXCJ2aWRlb19kZW1vbnN0cmF0aXZvX2xhbsOnYW1lbnRvX3ZlcmFvXzEwODBwLm1wNFwiLFxuICAgIGlkZW50OiBcIklEOiBNUDQtOTk4MjQg4oCiIEhhc2g6ICM4OGM5XCIsXG4gICAgZm9ybWF0OiBcIi5tcDRcIixcbiAgICB0eXBlOiBcInZpZGVvXCIsXG4gICAgb3JpZ2luVGl0bGU6IFwiQ2FtcGFuaGEgV2hhdHNBcHBcIixcbiAgICBvcmlnaW5TdWI6IFwiRGlzcGFybyAjMTAyIFZlcsOjb1wiLFxuICAgIGNoYW5uZWw6IFwiV2hhdHNBcHAgR3Vwc2h1cFwiLFxuICAgIHNpemVNQjogMzQuMixcbiAgICBzaXplVGV4dDogXCIzNC4yIE1CXCIsXG4gICAgZGF0ZVRpbWU6IFwiMTggTm92LCAxNDoyMlwiLFxuICAgIHRpbWVzdGFtcDogMTczMTk0MzMyMDAwMCxcbiAgICBpY29uOiBcInZpZGVvY2FtXCIsXG4gICAgaWNvbkJnOiBcImJnLXNlY29uZGFyeS1maXhlZC82MFwiLFxuICAgIGljb25Db2xvcjogXCJ0ZXh0LXNlY29uZGFyeVwiLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiZjJcIixcbiAgICBuYW1lOiBcImNhdGFsb2dvX3Byb2R1dG9zX2NvbGVjYW9fbm92ZW1icm9fMjAyNC5wZGZcIixcbiAgICBpZGVudDogXCJJRDogUERGLTU1MjExIOKAoiBFUlAgQXV0b1N5bmNcIixcbiAgICBmb3JtYXQ6IFwiLnBkZlwiLFxuICAgIHR5cGU6IFwiZG9jXCIsXG4gICAgb3JpZ2luVGl0bGU6IFwiQ2F0w6Fsb2dvICYgRVJQXCIsXG4gICAgb3JpZ2luU3ViOiBcIlRvdHZzIFN5bmMgQXRpdm9cIixcbiAgICBjaGFubmVsOiBcIkNhdMOhbG9nbyBFUlAgVG90dnNcIixcbiAgICBzaXplTUI6IDE4LjUsXG4gICAgc2l6ZVRleHQ6IFwiMTguNSBNQlwiLFxuICAgIGRhdGVUaW1lOiBcIjE3IE5vdiwgMDk6MTVcIixcbiAgICB0aW1lc3RhbXA6IDE3MzE4Mzg1MDAwMDAsXG4gICAgaWNvbjogXCJwaWN0dXJlX2FzX3BkZlwiLFxuICAgIGljb25CZzogXCJiZy10ZXJ0aWFyeS1maXhlZC82MFwiLFxuICAgIGljb25Db2xvcjogXCJ0ZXh0LXRlcnRpYXJ5XCIsXG4gIH0sXG4gIHtcbiAgICBpZDogXCJmM1wiLFxuICAgIG5hbWU6IFwiY29tcHJvdmFudGVfcGFnYW1lbnRvX3BpeF9wZWRpZG9fODk0Mi5qcGdcIixcbiAgICBpZGVudDogXCJDaGF0OiArNTUgMTEgOTg4MjEtNDQzMlwiLFxuICAgIGZvcm1hdDogXCIuanBnXCIsXG4gICAgdHlwZTogXCJwaG90b1wiLFxuICAgIG9yaWdpblRpdGxlOiBcIkNoYXQgT21uaWNoYW5uZWxcIixcbiAgICBvcmlnaW5TdWI6IFwiUGVkaWRvIEVSUCAjODk0MlwiLFxuICAgIGNoYW5uZWw6IFwiV2hhdHNBcHAgR3Vwc2h1cFwiLFxuICAgIHNpemVNQjogMy40LFxuICAgIHNpemVUZXh0OiBcIjMuNCBNQlwiLFxuICAgIGRhdGVUaW1lOiBcIjE4IE5vdiwgMTY6MDRcIixcbiAgICB0aW1lc3RhbXA6IDE3MzE5NDk0NDAwMDAsXG4gICAgaWNvbjogXCJpbWFnZVwiLFxuICAgIGljb25CZzogXCJiZy1wcmltYXJ5LWZpeGVkLzYwXCIsXG4gICAgaWNvbkNvbG9yOiBcInRleHQtcHJpbWFyeVwiLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiZjRcIixcbiAgICBuYW1lOiBcImZvdG9fcHJhdG9fY2FyZGFwaW9fY29tYm9fZmFtaWxpYV9oZC53ZWJwXCIsXG4gICAgaWRlbnQ6IFwiaUZvb2QgSHViIFN5bmMg4oCiIFNLVSAjNDQyXCIsXG4gICAgZm9ybWF0OiBcIi53ZWJwXCIsXG4gICAgdHlwZTogXCJwaG90b1wiLFxuICAgIG9yaWdpblRpdGxlOiBcIkNhdMOhbG9nbyAmIGlGb29kXCIsXG4gICAgb3JpZ2luU3ViOiBcIlNpbmNyb25pemFkbyBBdGl2b1wiLFxuICAgIGNoYW5uZWw6IFwiQ2F0w6Fsb2dvIEVSUCBUb3R2c1wiLFxuICAgIHNpemVNQjogMi44LFxuICAgIHNpemVUZXh0OiBcIjIuOCBNQlwiLFxuICAgIGRhdGVUaW1lOiBcIjE3IE5vdiwgMTg6NDBcIixcbiAgICB0aW1lc3RhbXA6IDE3MzE4NzI0MDAwMDAsXG4gICAgaWNvbjogXCJmYXN0Zm9vZFwiLFxuICAgIGljb25CZzogXCJiZy1wcmltYXJ5LWZpeGVkLzYwXCIsXG4gICAgaWNvbkNvbG9yOiBcInRleHQtcHJpbWFyeVwiLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiZjVcIixcbiAgICBuYW1lOiBcInJlbGF0b3Jpb19mZWNoYW1lbnRvX21lbnNhbF9vbW5pY2hhbm5lbF9vdXR1YnJvLnhsc3hcIixcbiAgICBpZGVudDogXCJFeHBvcnQ6IFNpc3RlbWEgQklcIixcbiAgICBmb3JtYXQ6IFwiLnhsc3hcIixcbiAgICB0eXBlOiBcImRvY1wiLFxuICAgIG9yaWdpblRpdGxlOiBcIlJlbGF0w7NyaW9zICYgTcOpdHJpY2FzXCIsXG4gICAgb3JpZ2luU3ViOiBcIkZlY2hhbWVudG8gTWVuc2FsXCIsXG4gICAgY2hhbm5lbDogXCJUZWxlZ3JhbSBPbW5pXCIsXG4gICAgc2l6ZU1COiA1LjEsXG4gICAgc2l6ZVRleHQ6IFwiNS4xIE1CXCIsXG4gICAgZGF0ZVRpbWU6IFwiMTYgTm92LCAyMDoxMFwiLFxuICAgIHRpbWVzdGFtcDogMTczMTc5MTQwMDAwMCxcbiAgICBpY29uOiBcInRhYmxlX2NoYXJ0XCIsXG4gICAgaWNvbkJnOiBcImJnLXRlcnRpYXJ5LWZpeGVkLzYwXCIsXG4gICAgaWNvbkNvbG9yOiBcInRleHQtdGVydGlhcnlcIixcbiAgfSxcbiAge1xuICAgIGlkOiBcImY2XCIsXG4gICAgbmFtZTogXCJhdWRpb19pbnN0cnVjb2VzX2VudHJlZ2FfY2xpZW50ZV92aXAub2dnXCIsXG4gICAgaWRlbnQ6IFwiRHVyYcOnw6NvOiAwMTo0MiDigKIgV2hpc3BlciBPS1wiLFxuICAgIGZvcm1hdDogXCIub2dnXCIsXG4gICAgdHlwZTogXCJhdWRpb1wiLFxuICAgIG9yaWdpblRpdGxlOiBcIkNoYXQgT21uaWNoYW5uZWxcIixcbiAgICBvcmlnaW5TdWI6IFwiV2hhdHNBcHAgKzU1IDExIDk5MTIwLTExMDBcIixcbiAgICBjaGFubmVsOiBcIldoYXRzQXBwIEd1cHNodXBcIixcbiAgICBzaXplTUI6IDEuMSxcbiAgICBzaXplVGV4dDogXCIxLjEgTUJcIixcbiAgICBkYXRlVGltZTogXCIxNiBOb3YsIDExOjMyXCIsXG4gICAgdGltZXN0YW1wOiAxNzMxNzYwMzIwMDAwLFxuICAgIGljb246IFwiZ3JhcGhpY19lcVwiLFxuICAgIGljb25CZzogXCJiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoXCIsXG4gICAgaWNvbkNvbG9yOiBcInRleHQtb3V0bGluZVwiLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiZjdcIixcbiAgICBuYW1lOiBcImNvbnRyYXRvX3ByZXN0YWNhb19zZXJ2aWNvc19jb3Jwb3JhdGl2b19hc3NpbmFkby5wZGZcIixcbiAgICBpZGVudDogXCJEb2N1c2lnbiBBUEkg4oCiIEFzc2luYXR1cmEgVsOhbGlkYVwiLFxuICAgIGZvcm1hdDogXCIucGRmXCIsXG4gICAgdHlwZTogXCJkb2NcIixcbiAgICBvcmlnaW5UaXRsZTogXCJDb25maWd1cmHDp8O1ZXMgZGUgQ29udGFcIixcbiAgICBvcmlnaW5TdWI6IFwiSnVyw61kaWNvIC8gRmF0dXJhbWVudG9cIixcbiAgICBjaGFubmVsOiBcIkluc3RhZ3JhbSBEaXJlY3RcIixcbiAgICBzaXplTUI6IDQuOSxcbiAgICBzaXplVGV4dDogXCI0LjkgTUJcIixcbiAgICBkYXRlVGltZTogXCIxNSBOb3YsIDE3OjUwXCIsXG4gICAgdGltZXN0YW1wOiAxNzMxNjk2NjAwMDAwLFxuICAgIGljb246IFwiYXNzaWdubWVudF90dXJuZWRfaW5cIixcbiAgICBpY29uQmc6IFwiYmctdGVydGlhcnktZml4ZWQvNjBcIixcbiAgICBpY29uQ29sb3I6IFwidGV4dC10ZXJ0aWFyeVwiLFxuICB9LFxuXTtcblxuY29uc3QgVFlQRV9MQUJFTFM6IFJlY29yZDxNZWRpYVR5cGVGaWx0ZXIsIHN0cmluZz4gPSB7XG4gIGFsbDogXCJUb2Rvc1wiLFxuICBwaG90bzogXCJGb3Rvc1wiLFxuICB2aWRlbzogXCJWw61kZW9zXCIsXG4gIGRvYzogXCJEb2N1bWVudG9zXCIsXG4gIGF1ZGlvOiBcIsOBdWRpb3NcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBTdG9yYWdlU2NyZWVuKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICBjb25zdCBbc2VhcmNoUXVlcnksIHNldFNlYXJjaFF1ZXJ5XSA9IHNpZ25hbChcIlwiKTtcbiAgY29uc3QgW3NlbGVjdGVkVHlwZSwgc2V0U2VsZWN0ZWRUeXBlXSA9IHNpZ25hbDxNZWRpYVR5cGVGaWx0ZXI+KFwiYWxsXCIpO1xuICBjb25zdCBbc2VsZWN0ZWRDaGFubmVsLCBzZXRTZWxlY3RlZENoYW5uZWxdID0gc2lnbmFsKFwiYWxsXCIpO1xuICBjb25zdCBbc29ydEJ5LCBzZXRTb3J0QnldID0gc2lnbmFsPFNvcnRPcHRpb24+KFwic2l6ZV9kZXNjXCIpO1xuICBjb25zdCBbZmlsZXMsIHNldEZpbGVzXSA9IHNpZ25hbDxNZWRpYUZpbGVJdGVtW10+KElOSVRJQUxfTUVESUFfRklMRVMpO1xuXG4gIGNvbnN0IFt0b3RhbENhcGFjaXR5R0IsIHNldFRvdGFsQ2FwYWNpdHlHQl0gPSBzaWduYWwoMy4wKTtcbiAgY29uc3QgW3VzZWRHQiwgc2V0VXNlZEdCXSA9IHNpZ25hbCgyLjQyKTtcbiAgY29uc3QgW2F1dG9QdXJnZUVuYWJsZWQsIHNldEF1dG9QdXJnZUVuYWJsZWRdID0gc2lnbmFsKHRydWUpO1xuXG4gIGNvbnN0IFtpc0NsZWFuaW5nQ2FjaGUsIHNldElzQ2xlYW5pbmdDYWNoZV0gPSBzaWduYWwoZmFsc2UpO1xuICBjb25zdCBbY2FjaGVDbGVhbmVkLCBzZXRDYWNoZUNsZWFuZWRdID0gc2lnbmFsKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dVcGdyYWRlTW9kYWwsIHNldFNob3dVcGdyYWRlTW9kYWxdID0gc2lnbmFsKGZhbHNlKTtcbiAgY29uc3QgW3ByZXZpZXdGaWxlLCBzZXRQcmV2aWV3RmlsZV0gPSBzaWduYWw8TWVkaWFGaWxlSXRlbSB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZVF1aWNrQ2FjaGVDbGVhbiA9ICgpID0+IHtcbiAgICBpZiAoaXNDbGVhbmluZ0NhY2hlKCkpIHJldHVybjtcbiAgICBzZXRJc0NsZWFuaW5nQ2FjaGUodHJ1ZSk7XG4gICAgc2hvd1RvYXN0KFwiTGltcGV6YSBlbSBBbmRhbWVudG9cIiwgXCJSZW1vdmVuZG8gbWluaWF0dXJhcyBlbSBjYWNoZSBlIGxvZ3MgdGVtcG9yw6FyaW9zLi4uXCIsIFwiaW5mb1wiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0SXNDbGVhbmluZ0NhY2hlKGZhbHNlKTtcbiAgICAgIHNldENhY2hlQ2xlYW5lZCh0cnVlKTtcbiAgICAgIHNldFVzZWRHQigocHJldikgPT4gTWF0aC5tYXgoMS44LCArKHByZXYgLSAwLjE4KS50b0ZpeGVkKDIpKSk7XG4gICAgICBzaG93VG9hc3QoXCJDYWNoZSBMaWJlcmFkbyBjb20gU3VjZXNzb1wiLCBcIjE4MCBNQiBkZSBhcnF1aXZvcyB0ZW1wb3LDoXJpb3MgZm9yYW0gZXhwdXJnYWRvcy5cIiwgXCJzdWNjZXNzXCIpO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2V0Q2FjaGVDbGVhbmVkKGZhbHNlKTtcbiAgICAgIH0sIDM1MDApO1xuICAgIH0sIDEyMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvbnRyYWN0UGxhbiA9IChwbGFuTmFtZTogc3RyaW5nLCBhZGRpdGlvbmFsR0I6IG51bWJlciwgcHJpY2U6IHN0cmluZykgPT4ge1xuICAgIHNldFRvdGFsQ2FwYWNpdHlHQigocHJldikgPT4gKyhwcmV2ICsgYWRkaXRpb25hbEdCKS50b0ZpeGVkKDEpKTtcbiAgICBzZXRTaG93VXBncmFkZU1vZGFsKGZhbHNlKTtcbiAgICBzaG93VG9hc3QoXG4gICAgICBcIlVwZ3JhZGUgQ29udHJhdGFkbyFcIixcbiAgICAgIGBQYWNvdGUgZGUgJHtwbGFuTmFtZX0gYXRpdmFkbyBjb20gc3VjZXNzbyBwb3IgJHtwcmljZX0uIENvdGEgYXR1YWxpemFkYSBpbnN0YW50YW5lYW1lbnRlLmAsXG4gICAgICBcInN1Y2Nlc3NcIixcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZUZpbGUgPSAoZmlsZTogTWVkaWFGaWxlSXRlbSkgPT4ge1xuICAgIHNldEZpbGVzKChwcmV2KSA9PiBwcmV2LmZpbHRlcigoZikgPT4gZi5pZCAhPT0gZmlsZS5pZCkpO1xuICAgIHNldFVzZWRHQigocHJldikgPT4gTWF0aC5tYXgoMS4wLCArKHByZXYgLSBmaWxlLnNpemVNQiAvIDEwMjQpLnRvRml4ZWQoMikpKTtcbiAgICBzaG93VG9hc3QoXCJBcnF1aXZvIEV4Y2x1w61kb1wiLCBgXCIke2ZpbGUubmFtZX1cIiBmb2kgcmVtb3ZpZG8gZG8gYXJtYXplbmFtZW50byBlbSBudXZlbS5gLCBcImluZm9cIik7XG4gIH07XG5cbiAgY29uc3QgZmlsdGVyZWRGaWxlcyA9ICgpID0+XG4gICAgZmlsZXMoKVxuICAgICAgLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaFF1ZXJ5KCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbWF0Y2hlc1NlYXJjaCA9XG4gICAgICAgICAgaXRlbS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpIHx8XG4gICAgICAgICAgaXRlbS5pZGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSB8fFxuICAgICAgICAgIGl0ZW0ub3JpZ2luVGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSk7XG5cbiAgICAgICAgY29uc3QgbWF0Y2hlc1R5cGUgPSBzZWxlY3RlZFR5cGUoKSA9PT0gXCJhbGxcIiB8fCBpdGVtLnR5cGUgPT09IHNlbGVjdGVkVHlwZSgpO1xuICAgICAgICBjb25zdCBtYXRjaGVzQ2hhbm5lbCA9IHNlbGVjdGVkQ2hhbm5lbCgpID09PSBcImFsbFwiIHx8IGl0ZW0uY2hhbm5lbCA9PT0gc2VsZWN0ZWRDaGFubmVsKCk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZXNTZWFyY2ggJiYgbWF0Y2hlc1R5cGUgJiYgbWF0Y2hlc0NoYW5uZWw7XG4gICAgICB9KVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKHNvcnRCeSgpID09PSBcInNpemVfZGVzY1wiKSByZXR1cm4gYi5zaXplTUIgLSBhLnNpemVNQjtcbiAgICAgICAgaWYgKHNvcnRCeSgpID09PSBcInJlY2VudFwiKSByZXR1cm4gYi50aW1lc3RhbXAgLSBhLnRpbWVzdGFtcDtcbiAgICAgICAgaWYgKHNvcnRCeSgpID09PSBcIm9sZGVzdFwiKSByZXR1cm4gYS50aW1lc3RhbXAgLSBiLnRpbWVzdGFtcDtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcblxuICBjb25zdCBwZXJjZW50YWdlVXNlZCA9ICgpID0+XG4gICAgTWF0aC5taW4oMTAwLCBNYXRoLnJvdW5kKCh1c2VkR0IoKSAvIHRvdGFsQ2FwYWNpdHlHQigpKSAqIDEwMCAqIDEwKSAvIDEwKTtcblxuICBjb25zdCBmcmVlTUIgPSAoKSA9PiBNYXRoLm1heCgwLCBNYXRoLnJvdW5kKCh0b3RhbENhcGFjaXR5R0IoKSAtIHVzZWRHQigpKSAqIDEwMjQpKTtcblxuICBjb25zdCBnb1RvU2V0dGluZ3MgPSAoKSA9PiByb3V0ZXIucHVzaChTQ1JFRU5fUk9VVEVTW1wiY29uZmlndXJhY29lcy1jb250YVwiXSk7XG5cbiAgY29uc3Qgc2Nyb2xsVG9QYWNrYWdlcyA9ICgpID0+IHtcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBhbnNpb24tcGFja2FnZXNcIik7XG4gICAgaWYgKGVsZW0pIGVsZW0uc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgc206cHgtNiBsZzpweC04IHB5LTYgZmxleCBmbGV4LWNvbCBnYXAtNiBtYXgtdy1bMTQ0MHB4XSBteC1hdXRvXCI+XG4gICAgICAgIHsvKiBUb3AgQmFyOiBCcmVhZGNydW1iLCBIZWFkaW5nICYgR2xvYmFsIEFjdGlvbnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xXCI+XG4gICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtbGFiZWwtc21cIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2dvVG9TZXR0aW5nc31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQ29uZmlndXJhw6fDtWVzXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE0cHhdXCI+Y2hldnJvbl9yaWdodDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgRXNwYcOnbyBlbSBEaXNjbyAmIE3DrWRpYXNcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE0cHhdXCI+Y2hldnJvbl9yaWdodDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGZvbnQtc2VtaWJvbGRcIj5Nb25pdG9yYW1lbnRvIGRlIEFybWF6ZW5hbWVudG88L3NwYW4+XG4gICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1wcmltYXJ5LWZpeGVkLzUwIHRleHQtcHJpbWFyeSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjZweF1cIj5jbG91ZF9zeW5jPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUteGwgdGV4dC1vbi1zdXJmYWNlIHRyYWNraW5nLXRpZ2h0IGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIEFybWF6ZW5hbWVudG8gJiBHZXN0w6NvIGRlIE3DrWRpYXNcbiAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2R5LW1kIHRleHQtb24tc3VyZmFjZS12YXJpYW50IG1heC13LTN4bFwiPlxuICAgICAgICAgICAgICBNb25pdG9yZSBvIHZvbHVtZSBkZSBhcnF1aXZvcyBkZSBjb252ZXJzYXMsIGNhdMOhbG9nb3MsIG3DrWRpYXMgZGUgY2FtcGFuaGFzIGUgZG9jdW1lbnRvcyBmaXNjYWlzXG4gICAgICAgICAgICAgIHRyYWZlZ2Fkb3Mgbm9zIG1lbnNhZ2Vpcm9zLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEFjdGlvbiBCdXR0b25zICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGRpc2FibGVkPXsoKSA9PiBpc0NsZWFuaW5nQ2FjaGUoKX1cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUXVpY2tDYWNoZUNsZWFufVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTkgcHgtMy41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIHNoYWRvdy1zbSBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYWN0aXZlOnNjYWxlLTk1IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGN1cnNvci1wb2ludGVyIGRpc2FibGVkOm9wYWNpdHktNzBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7KCkgPT5cbiAgICAgICAgICAgICAgICBpc0NsZWFuaW5nQ2FjaGUoKSA/IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF0gYW5pbWF0ZS1zcGluIHRleHQtcHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzX2FjdGl2aXR5XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+TGltcGFuZG8gMTgwIE1CLi4uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IGNhY2hlQ2xlYW5lZCgpID8gKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XSB0ZXh0LXRlcnRpYXJ5XCI+Y2hlY2s8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtdGVydGlhcnkgZm9udC1ib2xkXCI+MTgwIE1CIExpYmVyYWRvcyE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlxuICAgICAgICAgICAgICAgICAgICAgIGNsZWFuaW5nX3NlcnZpY2VzXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+TGltcGV6YSBSw6FwaWRhIGRlIENhY2hlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1VwZ3JhZGVNb2RhbCh0cnVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC05IHB4LTQgcm91bmRlZC14bCBiZy1wcmltYXJ5LWNvbnRhaW5lciB0ZXh0LW9uLXByaW1hcnkgZm9udC10aXRsZS1tZCBzaGFkb3ctc20gaG92ZXI6YmctcHJpbWFyeSB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGFjdGl2ZTpzY2FsZS05NSBjdXJzb3ItcG9pbnRlciBmb250LWJvbGRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+YWRkX3Nob3BwaW5nX2NhcnQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPisgRmF6ZXIgVXBncmFkZSBkZSBFc3Bhw6dvPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNYWluIEFsZXJ0ICYgR2xvYmFsIE1ldGVyIENhcmQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHNoYWRvdy1zbSBwLTYgZmxleCBmbGV4LWNvbCBnYXAtNSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXJpZ2h0LTE2IC10b3AtMTYgdy02NCBoLTY0IGJnLXByaW1hcnktZml4ZWQvMjAgcm91bmRlZC1mdWxsIGJsdXItM3hsIHBvaW50ZXItZXZlbnRzLW5vbmVcIj48L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgQ290YSBQYWRyw6NvIEFsb2NhZGFcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLWVycm9yLWNvbnRhaW5lciB0ZXh0LW9uLWVycm9yLWNvbnRhaW5lciBmb250LWxhYmVsLXNtIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMS41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1lcnJvciBhbmltYXRlLXBpbmdcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7KCkgPT4gKHBlcmNlbnRhZ2VVc2VkKCkgPj0gODAgPyBgQ3LDrXRpY286ICR7cGVyY2VudGFnZVVzZWQoKX0lYCA6IGBVc286ICR7cGVyY2VudGFnZVVzZWQoKX0lYCl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWJhc2VsaW5lIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS14bCB0ZXh0LXByaW1hcnkgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICB7KCkgPT4gdXNlZEdCKCkudG9GaXhlZCgyKS5yZXBsYWNlKFwiLlwiLCBcIixcIil9IEdCXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9keS1sZyB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlxuICAgICAgICAgICAgICAgICAgdXRpbGl6YWRvcyBkZXtcIiBcIn1cbiAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgeygpID0+IHRvdGFsQ2FwYWNpdHlHQigpLnRvRml4ZWQoMikucmVwbGFjZShcIi5cIiwgXCIsXCIpfSBHQlxuICAgICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1lbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+RGlzcG9uw612ZWwgZW0gTnV2ZW08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1sZyB0ZXh0LXRlcnRpYXJ5IGZvbnQtYm9sZFwiPnsoKSA9PiBmcmVlTUIoKX0gTUIgbGl2cmVzPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Njcm9sbFRvUGFja2FnZXN9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC05IHB4LTMuNSByb3VuZGVkLXhsIGJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IGZvbnQtdGl0bGUtbWQgc2hhZG93LXNtIGhvdmVyOmJnLW9uLXByaW1hcnktY29udGFpbmVyIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hyaW5rLTAgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF1cIj5jbG91ZF91cGxvYWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+Q29tcHJhciBQYWNvdGUgQWRpY2lvbmFsICgrMTAgR0IgcG9yIFIkIDI5L23DqnMpPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNlZ21lbnRlZCBNdWx0aS1Db2xvciBQcm9ncmVzcyBCYXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtMy41IHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIG92ZXJmbG93LWhpZGRlbiBmbGV4IHNoYWRvdy1pbm5lclwiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIGJnLXByaW1hcnktY29udGFpbmVyIHRyYW5zaXRpb24tYWxsIGhvdmVyOm9wYWNpdHktOTBcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBcIjM4LjMlXCIgfX1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIkZvdG9zICYgSW1hZ2VuczogMSwxNSBHQiAoMzguMyUpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtZnVsbCBiZy1zZWNvbmRhcnkgdHJhbnNpdGlvbi1hbGwgaG92ZXI6b3BhY2l0eS05MFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IFwiMjkuNiVcIiB9fVxuICAgICAgICAgICAgICAgIHRpdGxlPVwiVsOtZGVvcyAmIFJlZWxzOiA4OTAgTUIgKDI5LjYlKVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgYmctdGVydGlhcnktY29udGFpbmVyIHRyYW5zaXRpb24tYWxsIGhvdmVyOm9wYWNpdHktOTBcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBcIjEwLjMlXCIgfX1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIkRvY3VtZW50b3MgJiBQREZzOiAzMTAgTUIgKDEwLjMlKVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgYmctb3V0bGluZSB0cmFuc2l0aW9uLWFsbCBob3ZlcjpvcGFjaXR5LTkwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogXCI0LjAlXCIgfX1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIsOBdWRpb3MgZGUgVm96ICYgT3V0cm9zOiAxMjAgTUIgKDQuMCUpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLWZ1bGwgYmctdHJhbnNwYXJlbnQgZmxleC0xXCIgdGl0bGU9eygpID0+IGBMaXZyZTogJHtmcmVlTUIoKX0gTUJgfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBMZWdlbmQgZm9yIFByb2dyZXNzIEJhciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwdC0xIGZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yLjUgaC0yLjUgcm91bmRlZC1mdWxsIGJnLXByaW1hcnktY29udGFpbmVyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1vbi1zdXJmYWNlXCI+Rm90b3MgJiBJbWFnZW5zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+MSwxNSBHQiAoMzguMyUpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yLjUgaC0yLjUgcm91bmRlZC1mdWxsIGJnLXNlY29uZGFyeVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtb24tc3VyZmFjZVwiPlbDrWRlb3MgJiBSZWVsczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPjg5MCBNQiAoMjkuNiUpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yLjUgaC0yLjUgcm91bmRlZC1mdWxsIGJnLXRlcnRpYXJ5LWNvbnRhaW5lclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtb24tc3VyZmFjZVwiPkRvY3VtZW50b3MgJiBQREZzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+MzEwIE1CICgxMC4zJSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctb3V0bGluZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtb24tc3VyZmFjZVwiPsOBdWRpb3MgJiBXaGlzcGVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+MTIwIE1CICg0LjAlKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLXZhcmlhbnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1vbi1zdXJmYWNlXCI+RXNwYcOnbyBOw6NvIFV0aWxpemFkbzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWNvZGUtc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgeygpID0+IGAke2ZyZWVNQigpfSBNQiAoJHsoMTAwIC0gcGVyY2VudGFnZVVzZWQoKSkudG9GaXhlZCgxKX0lKWB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFdhcm5pbmcgQ2FsbG91dCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctZXJyb3ItY29udGFpbmVyLzQwIHRleHQtb24tZXJyb3ItY29udGFpbmVyIGZsZXggaXRlbXMtc3RhcnQgZ2FwLTMgcmVsYXRpdmUgei0xMCBib3JkZXIgYm9yZGVyLWVycm9yLWNvbnRhaW5lci81MFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMnB4XSB0ZXh0LWVycm9yIHNocmluay0wXCI+d2FybmluZzwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMC41XCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgZm9udC1ib2xkIHRleHQtZXJyb3JcIj5cbiAgICAgICAgICAgICAgICB7KCkgPT4gYEF0ZW7Dp8OjbzogVm9jw6ogYXRpbmdpdSAke3BlcmNlbnRhZ2VVc2VkKCl9JSBkYSBzdWEgY290YSBwYWRyw6NvIGRlICR7dG90YWxDYXBhY2l0eUdCKCkudG9GaXhlZCgwKX0gR0IuYH1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICBNw61kaWFzIHRlbXBvcsOhcmlhcyBlIGFycXVpdm9zIGFudGlnb3MgY29tIG1haXMgZGUgOTAgZGlhcyBwb2RlcsOjbyB0ZXIgcmV0ZW7Dp8OjbyBhdXRvbcOhdGljYSBwcm9ncmFtYWRhXG4gICAgICAgICAgICAgICAgY2FzbyBhIGNhcGFjaWRhZGUgc2UgZXNnb3RlLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENhdGVnb3J5IEJyZWFrZG93biBHcmlkICg0IENvbHVtbnMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgeGw6Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCBzaGFkb3ctc20gZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgaG92ZXI6c2hhZG93LW1kIHRyYW5zaXRpb24tc2hhZG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQteGwgYmctcHJpbWFyeS1maXhlZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzI0cHhdXCI+cGhvdG9fbGlicmFyeTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LXByaW1hcnkgZm9udC1sYWJlbC1zbSBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgMzguMyVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgRm90b3MgJiBJbWFnZW5zXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtbGcgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZCBtdC0wLjVcIj4xLDE1IEdCPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IG10LTFcIj5cbiAgICAgICAgICAgICAgICA0LjgyMCBhcnF1aXZvcyByZWdpc3RyYWRvcyBlbSBjaGF0cyBlIHZpdHJpbmVzLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItbG93IGZsZXggZmxleC1jb2wgZ2FwLTEgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1ib2R5LXNtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+Rm9ybWF0b3M6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbSB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPi5qcGcsIC5wbmcsIC53ZWJwPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5UdXJib0NvbXByZXNzOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWNvZGUtc20gdGV4dC10ZXJ0aWFyeSBmb250LWJvbGRcIj4tNDIlIHBvdXBhZG9zPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBoLTEuNSByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcHJpbWFyeS1jb250YWluZXIgaC1mdWxsIHJvdW5kZWQtZnVsbFwiIHN0eWxlPXt7IHdpZHRoOiBcIjM4LjMlXCIgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgc2hhZG93LXNtIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGdhcC0zIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLXNoYWRvdyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLXNlY29uZGFyeS1maXhlZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXNlY29uZGFyeVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjRweF1cIj5tb3ZpZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LXNlY29uZGFyeSBmb250LWxhYmVsLXNtIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAyOS42JVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICBWw61kZW9zICYgUmVlbHNcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1sZyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkIG10LTAuNVwiPjg5MCBNQjwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgMzEyIHbDrWRlb3MgcHJvbW9jaW9uYWlzIGUgdW5ib3hpbmcgZW52aWFkb3MuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgZmxleCBmbGV4LWNvbCBnYXAtMSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWJvZHktc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5SZXNvbHXDp8Ojbzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+NzIwcCAvIDEwODBwIE1QNDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+QVBJIEdhdGV3YXk6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbSB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPldoYXRzQXBwIENsb3VkIE9LPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBoLTEuNSByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2Vjb25kYXJ5IGgtZnVsbCByb3VuZGVkLWZ1bGxcIiBzdHlsZT17eyB3aWR0aDogXCIyOS42JVwiIH19IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHNoYWRvdy1zbSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBob3ZlcjpzaGFkb3ctbWQgdHJhbnNpdGlvbi1zaGFkb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgcm91bmRlZC14bCBiZy10ZXJ0aWFyeS1maXhlZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXRlcnRpYXJ5XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyNHB4XVwiPmRlc2NyaXB0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtdGVydGlhcnkgZm9udC1sYWJlbC1zbSBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgMTAuMyVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgRG9jdW1lbnRvcyAmIFBERnNcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1sZyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkIG10LTAuNVwiPjMxMCBNQjwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgMS40NTAgY29udHJhdG9zLCBmYXR1cmFzIEVSUCBlIG5vdGFzIGZpc2NhaXMuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgZmxleCBmbGV4LWNvbCBnYXAtMSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWJvZHktc21cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TZWd1cmFuw6dhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWNvZGUtc20gdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5BRVMtMjU2IEVtIFJlcG91c288L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlNpbmNyb25pYTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtIHRleHQtcHJpbWFyeSBmb250LXNlbWlib2xkXCI+RVJQIFRvdHZzICYgQmxpbmc8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIGgtMS41IHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy10ZXJ0aWFyeS1jb250YWluZXIgaC1mdWxsIHJvdW5kZWQtZnVsbFwiIHN0eWxlPXt7IHdpZHRoOiBcIjEwLjMlXCIgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgc2hhZG93LXNtIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGdhcC0zIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLXNoYWRvdyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1vdXRsaW5lXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyNHB4XVwiPm1pYzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW91dGxpbmUgZm9udC1sYWJlbC1zbSBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgNC4wJVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICDDgXVkaW9zICYgVHJhbnNjcmnDp8O1ZXNcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1sZyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkIG10LTAuNVwiPjEyMCBNQjwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgMy45MTAgbWVuc2FnZW5zIGRlIMOhdWRpbyBkb3MgY2xpZW50ZXMgbm8gT21uaS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBmbGV4IGZsZXgtY29sIGdhcC0xIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtYm9keS1zbVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPkZvcm1hdG8gw4F1ZGlvOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWNvZGUtc20gdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5PR0cgT3B1cyAxNmticHM8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPklBIFRyYW5zY3Jpw6fDo286PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbSB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPldoaXNwZXIgdjMgVHVyYm88L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIGgtMS41IHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1vdXRsaW5lIGgtZnVsbCByb3VuZGVkLWZ1bGxcIiBzdHlsZT17eyB3aWR0aDogXCI0LjAlXCIgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRXhwYW5zaW9uIFBhY2thZ2VzIFNlY3Rpb24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtNCBzY3JvbGwtbXQtMjBcIiBpZD1cImV4cGFuc2lvbi1wYWNrYWdlc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgUGFjb3RlcyBkZSBFeHBhbnPDo28gZGUgQXJtYXplbmFtZW50b1xuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICBBdW1lbnRlIHN1YSBjb3RhIHNlbSBpbnRlcnJ1cMOnw7VlcyBvcGVyYWNpb25haXMgZSBtYW50ZW5oYSBoaXN0w7NyaWNvcyBjb21wbGV0b3MgZGUgY29udmVyc2FzIGUgbcOtZGlhcy5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbGFiZWwtc20gdGV4dC1wcmltYXJ5IGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNnB4XVwiPnZlcmlmaWVkPC9zcGFuPlxuICAgICAgICAgICAgICBDb2JyYW7Dp2EgZmxleMOtdmVsIHDDs3MtcGFnbyBuYSBmYXR1cmFcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICAgICAgey8qIFBhY2thZ2UgMTogKzEwIEdCIChQb3B1bGFyKSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHNoYWRvdy1zbSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBnYXAtNSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1wcmltYXJ5LzMwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xIHJvdW5kZWQtYmwteGwgYmctcHJpbWFyeS1jb250YWluZXIgdGV4dC1vbi1wcmltYXJ5IGZvbnQtbGFiZWwtc20gZm9udC1ib2xkIHRyYWNraW5nLXdpZGUgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICBNYWlzIEVzY29saGlkb1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMiBtdC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyNHB4XSB0ZXh0LXByaW1hcnlcIj5jbG91ZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXRpdGxlLWxnIHRleHQtb24tc3VyZmFjZSBmb250LWJvbGRcIj4rMTAgR0IgQWRpY2lvbmFpczwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICAgICAgICBJZGVhbCBwYXJhIG9wZXJhw6fDtWVzIGVtIGNyZXNjaW1lbnRvIGNvbnTDrW51byBkZSBXaGF0c0FwcCBlIGNhdMOhbG9nb3MgcmVjb3JyZW50ZXMuXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1iYXNlbGluZSBnYXAtMSBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLXhsIHRleHQtcHJpbWFyeSBmb250LWJvbGRcIj5SJCAyOSw5MDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPi9tw6pzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xLjUgcHQtMSBmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlXCI+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNnB4XSB0ZXh0LXByaW1hcnlcIj5jaGVja19jaXJjbGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkF0aXZhw6fDo28gaW5zdGFudMOibmVhIGVtIDEgY2xpcXVlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE2cHhdIHRleHQtcHJpbWFyeVwiPmNoZWNrX2NpcmNsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+SGlzdMOzcmljbyBnYXJhbnRpZG8gc2VtIGF1dG8tZXhwdXJnbzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNnB4XSB0ZXh0LXByaW1hcnlcIj5jaGVja19jaXJjbGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkNvbXByZXNzw6NvIGludGVsaWdlbnRlIGF0aXZhZGE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29udHJhY3RQbGFuKFwiKzEwIEdCIEFkaWNpb25haXNcIiwgMTAsIFwiUiQgMjksOTAvbcOqc1wiKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xMCByb3VuZGVkLXhsIGJnLXByaW1hcnktY29udGFpbmVyIHRleHQtb24tcHJpbWFyeSBmb250LXRpdGxlLW1kIHNoYWRvdy1zbSBob3ZlcjpiZy1wcmltYXJ5IHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgYWN0aXZlOnNjYWxlLTk1IGN1cnNvci1wb2ludGVyIGZvbnQtYm9sZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+Ym9sdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Db250cmF0YXIgQWdvcmE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBQYWNrYWdlIDI6ICs1MCBHQiAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHNoYWRvdy1zbSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBnYXAtNSBob3ZlcjpzaGFkb3ctbWQgdHJhbnNpdGlvbi1zaGFkb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyNHB4XSB0ZXh0LXNlY29uZGFyeVwiPmRhdGFiYXNlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbGcgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPis1MCBHQiBBZGljaW9uYWlzPC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICAgIFBlcmZlaXRvIHBhcmEgbG9qYXMgZGUgdmFyZWpvIGNvbSBncmFuZGVzIGZsdXhvcyBkZSBtw61kaWFzIGRlIGFsdGEgZGVmaW5pw6fDo28gZSB2w61kZW9zLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtYmFzZWxpbmUgZ2FwLTEgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS14bCB0ZXh0LXNlY29uZGFyeSBmb250LWJvbGRcIj5SJCA4OSw5MDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPi9tw6pzPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xLjUgcHQtMSBmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlXCI+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNnB4XSB0ZXh0LXNlY29uZGFyeVwiPmNoZWNrX2NpcmNsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+U3Vwb3J0ZSBhIHbDrWRlb3MgYXTDqSA0SyBlIGNhdMOhbG9nb3MgcGVzYWRvczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNnB4XSB0ZXh0LXNlY29uZGFyeVwiPmNoZWNrX2NpcmNsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHJpb3JpZGFkZSBubyBwaXBlbGluZSBkZSBDRE4gQ2xvdWRmbGFyZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNnB4XSB0ZXh0LXNlY29uZGFyeVwiPmNoZWNrX2NpcmNsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+RXhwb3J0YcOnw6NvIHBlcmnDs2RpY2EgZW0gbWFzc2E8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29udHJhY3RQbGFuKFwiKzUwIEdCIEFkaWNpb25haXNcIiwgNTAsIFwiUiQgODksOTAvbcOqc1wiKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xMCByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBhY3RpdmU6c2NhbGUtOTUgY3Vyc29yLXBvaW50ZXIgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPkNvbnRyYXRhciBQbGFubzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFBhY2thZ2UgMzogKzIwMCBHQiBFbnRlcnByaXNlICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgc2hhZG93LXNtIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGdhcC01IGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLXNoYWRvdyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzI0cHhdIHRleHQtdGVydGlhcnlcIj5kb21haW48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC10aXRsZS1sZyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+KzIwMCBHQiBFbnRlcnByaXNlPC9oND5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICAgIEluZnJhZXN0cnV0dXJhIGNvcnBvcmF0aXZhIGRlZGljYWRhIGNvbSByZXRlbsOnw6NvIHBlcnDDqXR1YSBkZSBkb2N1bWVudG9zIGZpc2NhaXMgZSBhdWRpdG9yaWEuXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1iYXNlbGluZSBnYXAtMSBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLXhsIHRleHQtdGVydGlhcnkgZm9udC1ib2xkXCI+UiQgMTk5LDAwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+L23DqnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEuNSBwdC0xIGZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2VcIj5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE2cHhdIHRleHQtdGVydGlhcnlcIj5jaGVja19jaXJjbGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkJ1Y2tldCBBV1MgUzMgRGVkaWNhZG8gbmEgcmVnacOjbyBCcmFzaWw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF0gdGV4dC10ZXJ0aWFyeVwiPmNoZWNrX2NpcmNsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UmV0ZW7Dp8OjbyBsZWdhbCByZWd1bGFtZW50YXIgZGUgNSBhbm9zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE2cHhdIHRleHQtdGVydGlhcnlcIj5jaGVja19jaXJjbGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlNMQSBkZSBkaXNwb25pYmlsaWRhZGUgOTkuOTklPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICBzaG93VG9hc3QoXCJHZXJlbnRlIGRlIENvbnRhXCIsIFwiVW0gY29uc3VsdG9yIGVtcHJlc2FyaWFsIGRvIHRpbWUgZGUgaW5mcmFlc3RydXR1cmEgZW50cmFyw6EgZW0gY29udGF0by5cIiwgXCJpbmZvXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTEwIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlIGZvbnQtdGl0bGUtbWQgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IGFjdGl2ZTpzY2FsZS05NSBjdXJzb3ItcG9pbnRlciBmb250LWJvbGRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+RmFsYXIgY29tIEdlcmVudGUgZGUgQ29udGE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNZWRpYSBUYWJsZSAmIEV4cGxvcmVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHNoYWRvdy1zbSBwLTUgZmxleCBmbGV4LWNvbCBnYXAtNCBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgIHsvKiBUYWJsZSBGaWx0ZXJzICYgSGVhZGVyIFRvb2xzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXgtMSBtYXgtdy1sZ1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIGFic29sdXRlIGxlZnQtMyB0b3AtMi41IHRleHQtb24tc3VyZmFjZS12YXJpYW50IHRleHQtWzIwcHhdXCI+XG4gICAgICAgICAgICAgICAgc2VhcmNoXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXsoKSA9PiBzZWFyY2hRdWVyeSgpfVxuICAgICAgICAgICAgICAgIG9uSW5wdXQ9eyhldmVudCkgPT4gc2V0U2VhcmNoUXVlcnkoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQZXNxdWlzYXIgcG9yIG5vbWUgZG8gYXJxdWl2bywgcHJvdG9jb2xvIGRlIGNoYXQgb3UgY2xpZW50ZS4uLlwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtMTAgcGwtMTAgcHItNCByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2R5LXNtIGZvY3VzOmJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LWNvbnRhaW5lciBvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbi1hbGwgcGxhY2Vob2xkZXI6dGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQvNjAgc2hhZG93LWlubmVyIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICB7LyogVHlwZSBGaWx0ZXIgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgYmctc3VyZmFjZS1jb250YWluZXItbG93IHJvdW5kZWQteGwgcC0xIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCI+XG4gICAgICAgICAgICAgICAgeyhbXCJhbGxcIiwgXCJwaG90b1wiLCBcInZpZGVvXCIsIFwiZG9jXCIsIFwiYXVkaW9cIl0gYXMgY29uc3QpLm1hcCgodHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17dHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFR5cGUodHlwZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUeXBlKCkgPT09IHR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcInB4LTMgcHktMSByb3VuZGVkLWxnIGZvbnQtbGFiZWwtc20gZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciB0ZXh0LW9uLXByaW1hcnkgYmctcHJpbWFyeS1jb250YWluZXIgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInB4LTMgcHktMSByb3VuZGVkLWxnIGZvbnQtbGFiZWwtc20gZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBob3Zlcjp0ZXh0LW9uLXN1cmZhY2VcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtUWVBFX0xBQkVMU1t0eXBlXX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQ2hhbm5lbCBGaWx0ZXIgRHJvcGRvd24gKi99XG4gICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gc2VsZWN0ZWRDaGFubmVsKCl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VsZWN0ZWRDaGFubmVsKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtOSBweC0zIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IHRleHQtb24tc3VyZmFjZSBmb250LWJvZHktc20gb3V0bGluZS1ub25lIGN1cnNvci1wb2ludGVyIGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdHJhbnNpdGlvbi1jb2xvcnMgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFsbFwiPlRvZG9zIG9zIENhbmFpczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJXaGF0c0FwcCBHdXBzaHVwXCI+V2hhdHNBcHAgR3Vwc2h1cDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJJbnN0YWdyYW0gRGlyZWN0XCI+SW5zdGFncmFtIERpcmVjdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUZWxlZ3JhbSBPbW5pXCI+VGVsZWdyYW0gT21uaTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJDYXTDoWxvZ28gRVJQIFRvdHZzXCI+Q2F0w6Fsb2dvIEVSUCBUb3R2czwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgICAgICB7LyogU29ydGluZyBEcm9wZG93biAqL31cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXsoKSA9PiBzb3J0QnkoKX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTb3J0QnkoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSBhcyBTb3J0T3B0aW9uKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTkgcHgtMyByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2R5LXNtIG91dGxpbmUtbm9uZSBjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIHRyYW5zaXRpb24tY29sb3JzIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzaXplX2Rlc2NcIj5NYWlzIHBlc2Fkb3MgcHJpbWVpcm88L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmVjZW50XCI+TWFpcyByZWNlbnRlczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvbGRlc3RcIj5NYWlzIGFudGlnb3M8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBGaWxlIFRhYmxlICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCBmb250LWJvZHktc20gYm9yZGVyLWNvbGxhcHNlXCI+XG4gICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwidGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgZm9udC1sYWJlbC1zbSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmctc3VyZmFjZS1jb250YWluZXItbG93LzYwIHJvdW5kZWQteGxcIj5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTQgcm91bmRlZC1sLXhsXCI+QXJxdWl2byAmIElkZW50aWZpY2Fkb3I8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtM1wiPkZvcm1hdG88L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtM1wiPk9yaWdlbSAmIFbDrW5jdWxvPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTNcIj5UYW1hbmhvPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTNcIj5EYXRhIC8gSG9yYTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC00IHRleHQtcmlnaHQgcm91bmRlZC1yLXhsXCI+QcOnw7VlczwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5IGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZSBkaXZpZGUteSBkaXZpZGUtb3V0bGluZS12YXJpYW50LzEwXCI+XG4gICAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByb3dzID0gZmlsdGVyZWRGaWxlcygpO1xuICAgICAgICAgICAgICAgICAgaWYgKHJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezZ9IGNsYXNzTmFtZT1cInB5LTggdGV4dC1jZW50ZXIgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMzZweF0gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQvNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbGRlcl9vZmZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+TmVuaHVtIGFycXVpdm8gZW5jb250cmFkbyBjb20gb3MgZmlsdHJvcyBzZWxlY2lvbmFkb3MuPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiByb3dzLm1hcCgoZmlsZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItbG93LzQwIHRyYW5zaXRpb24tY29sb3JzIGdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTkgaC05IHJvdW5kZWQtbGcgJHtmaWxlLmljb25CZ30gJHtmaWxlLmljb25Db2xvcn0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hyaW5rLTBgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMHB4XVwiPntmaWxlLmljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1pbi13LTAgbWF4LXcteHMgbWQ6bWF4LXctbWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXRpdGxlLW1kIGZvbnQtc2VtaWJvbGQgdHJ1bmNhdGUgdGV4dC1vbi1zdXJmYWNlXCI+e2ZpbGUubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LW1vbm9cIj57ZmlsZS5pZGVudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMy41IHB4LTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWxhYmVsLXNtIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2ZpbGUuZm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPntmaWxlLm9yaWdpblRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+e2ZpbGUub3JpZ2luU3VifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMuNSBweC0zIGZvbnQtY29kZS1zbSBmb250LWJvbGQgdGV4dC1vbi1zdXJmYWNlXCI+e2ZpbGUuc2l6ZVRleHR9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMy41IHB4LTMgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj57ZmlsZS5kYXRlVGltZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zLjUgcHgtNCB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93VG9hc3QoXCJEb3dubG9hZCBJbmljaWFkb1wiLCBgQmFpeGFuZG8gJHtmaWxlLm5hbWV9Li4uYCwgXCJzdWNjZXNzXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtbGcgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6dGV4dC1wcmltYXJ5IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRG93bmxvYWQgZG8gQXJxdWl2b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+ZG93bmxvYWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UHJldmlld0ZpbGUoZmlsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBob3Zlcjp0ZXh0LXByaW1hcnkgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJWaXN1YWxpemFyIERldGFsaGVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF1cIj52aXNpYmlsaXR5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZUZpbGUoZmlsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBob3Zlcjp0ZXh0LWVycm9yIGhvdmVyOmJnLWVycm9yLWNvbnRhaW5lci80MCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJMaWJlcmFyIEVzcGHDp29cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPmRlbGV0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUGFnaW5hdGlvbiAmIFN1bW1hcnkgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcHQtMSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWJvZHktc21cIj5cbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICBFeGliaW5kbyA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+eygpID0+IGAxLSR7ZmlsdGVyZWRGaWxlcygpLmxlbmd0aH1gfTwvc3Ryb25nPiBkZXtcIiBcIn1cbiAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPjYuNTgyIGFycXVpdm9zIGFybWF6ZW5hZG9zPC9zdHJvbmc+IOKAontcIiBcIn1cbiAgICAgICAgICAgICAgeygpID0+IGAke3VzZWRHQigpLnRvRml4ZWQoMikucmVwbGFjZShcIi5cIiwgXCIsXCIpfSBHQiB0b3RhaXNgfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdGV4dC1vbi1zdXJmYWNlIGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1jb2xvcnMgZGlzYWJsZWQ6b3BhY2l0eS00MFwiXG4gICAgICAgICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEFudGVyaW9yXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1sZyBiZy1wcmltYXJ5LWNvbnRhaW5lciB0ZXh0LW9uLXByaW1hcnkgZm9udC10aXRsZS1tZCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1sZyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItaGlnaCB0ZXh0LW9uLXN1cmZhY2UgZm9udC10aXRsZS1tZCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkLWxnIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgM1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMlwiPi4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQtbGcgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdGV4dC1vbi1zdXJmYWNlIGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICA5NDFcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkLWxnIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgUHLDs3hpbWFcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJldGVudGlvbiAmIEdvdmVybmFuY2UgRm9vdGVyIENhcmQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgc2hhZG93LXNtIHAtNSBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IG1kOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdGV4dC10ZXJ0aWFyeSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzI0cHhdXCI+dmVyaWZpZWRfdXNlcjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIFBvbMOtdGljYXMgZGUgUmV0ZW7Dp8OjbyAmIEdvdmVybmFuw6dhIGRlIERhZG9zXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICAgICAgQ29uZm9ybWlkYWRlIGNvbSBMR1BELCBjcmlwdG9ncmFmaWEgcG9udGEgYSBwb250YSBlIHJlZHVuZMOibmNpYSBBV1MgbXVsdGktcmVnacOjbyBTw6NvIFBhdWxvLlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBBdXRvLXB1cmdlIFRvZ2dsZSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBweC00IHB5LTIgcm91bmRlZC14bCBzaHJpbmstMCBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPkF1dG8tZXhwdXJnbyA5MCBkaWFzPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtcHJpbWFyeSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICB7KCkgPT4gKGF1dG9QdXJnZUVuYWJsZWQoKSA/IFwiRWNvbm9taXphIH42MDAgTUIvbcOqc1wiIDogXCJBdXRvLWV4cHVyZ28gRGVzYXRpdmFkb1wiKX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgY2hlY2tlZD17KCkgPT4gYXV0b1B1cmdlRW5hYmxlZCgpfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldEF1dG9QdXJnZUVuYWJsZWQoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICAgIHNob3dUb2FzdChcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkID8gXCJBdXRvLWV4cHVyZ28gQXRpdmFkb1wiIDogXCJBdXRvLWV4cHVyZ28gRGVzYXRpdmFkb1wiLFxuICAgICAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiQXJxdWl2b3MgZGUgbcOtZGlhIGNvbSBtYWlzIGRlIDkwIGRpYXMgc2Vyw6NvIHB1cmdhZG9zIGF1dG9tYXRpY2FtZW50ZS5cIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJSZXRlbsOnw6NvIHBlcnDDqXR1YSBhdGl2YWRhLiBQb2RlIGNvbnN1bWlyIG1haW9yIGNvdGEgZW0gZGlzY28uXCIsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCA/IFwic3VjY2Vzc1wiIDogXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3Itb25seSBwZWVyXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTExIGgtNiBiZy1vdXRsaW5lLXZhcmlhbnQgcGVlci1mb2N1czpvdXRsaW5lLW5vbmUgcm91bmRlZC1mdWxsIHBlZXIgcGVlci1jaGVja2VkOmFmdGVyOnRyYW5zbGF0ZS14LWZ1bGwgcGVlci1jaGVja2VkOmFmdGVyOmJvcmRlci13aGl0ZSBhZnRlcjpjb250ZW50LVsnJ10gYWZ0ZXI6YWJzb2x1dGUgYWZ0ZXI6dG9wLVsycHhdIGFmdGVyOmxlZnQtWzJweF0gYWZ0ZXI6Ymctd2hpdGUgYWZ0ZXI6cm91bmRlZC1mdWxsIGFmdGVyOmgtNSBhZnRlcjp3LTUgYWZ0ZXI6dHJhbnNpdGlvbi1hbGwgcGVlci1jaGVja2VkOmJnLXByaW1hcnktY29udGFpbmVyXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVXBncmFkZSBNb2RhbCAqL31cbiAgICAgIDxSZXZlYWwgd2hlbj17KCkgPT4gc2hvd1VwZ3JhZGVNb2RhbCgpfT5cbiAgICAgICAgPFJldmVhbC5JZj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBiZy1ibGFjay82MCBiYWNrZHJvcC1ibHVyLXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBhbmltYXRlLWluIGZhZGUtaW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IG1heC13LWxnIHctZnVsbCByb3VuZGVkLTJ4bCBwLTYgc2hhZG93LTJ4bCBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8zMCBmbGV4IGZsZXgtY29sIGdhcC01XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgcGItM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1wcmltYXJ5XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzI2cHhdXCI+YWRkX3Nob3BwaW5nX2NhcnQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1tZCBmb250LWJvbGQgdGV4dC1vbi1zdXJmYWNlXCI+VXBncmFkZSBkZSBBcm1hemVuYW1lbnRvPC9oMz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dVcGdyYWRlTW9kYWwoZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQtbGcgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF1cIj5jbG9zZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICAgICAgU2VsZWNpb25lIG8gcGxhbm8gZGVzZWphZG8gcGFyYSBleHBhbmRpciBpbWVkaWF0YW1lbnRlIGEgY2FwYWNpZGFkZSBkbyBzZXUgaHViIG9tbmljaGFubmVsIHNlbVxuICAgICAgICAgICAgICAgIGludGVycnVww6fDo28gZGUgYXRlbmRpbWVudG8gb3UgcGVyZGEgZGUgaGlzdMOzcmljb3MuXG4gICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29udHJhY3RQbGFuKFwiKzEwIEdCIEFkaWNpb25haXNcIiwgMTAsIFwiUiQgMjksOTAvbcOqc1wiKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTMuNSByb3VuZGVkLXhsIGJvcmRlci0yIGJvcmRlci1wcmltYXJ5IGJnLXByaW1hcnkvNSBob3ZlcjpiZy1wcmltYXJ5LzEwIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2VcIj4rMTAgR0IgQWRpY2lvbmFpczwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5LWNvbnRhaW5lciB0ZXh0LW9uLXByaW1hcnkgdGV4dC1bMTBweF0gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBNYWlzIEVzY29saGlkb1xuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEycHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGJsb2NrIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIElkZWFsIHBhcmEgY2hhdHMgV2hhdHNBcHAgcmVjb3JyZW50ZXMgZSBjYXTDoWxvZ29zXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtc20gZm9udC1ib2xkIHRleHQtcHJpbWFyeVwiPlIkIDI5LDkwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBibG9ja1wiPi9tw6pzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvbnRyYWN0UGxhbihcIis1MCBHQiBBZGljaW9uYWlzXCIsIDUwLCBcIlIkIDg5LDkwL23DqnNcIil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0zLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8zMCBob3Zlcjpib3JkZXItc2Vjb25kYXJ5IGhvdmVyOmJnLXNlY29uZGFyeS81IGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJmb250LXRpdGxlLW1kIHRleHQtb24tc3VyZmFjZSBibG9ja1wiPis1MCBHQiBBZGljaW9uYWlzPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEycHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGJsb2NrIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIFN1cG9ydGUgYSB2w61kZW9zIDRLIGUgY2F0w6Fsb2dvcyBkZSBhbHRhIGRlZmluacOnw6NvXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtc20gZm9udC1ib2xkIHRleHQtc2Vjb25kYXJ5XCI+UiQgODksOTA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGJsb2NrXCI+L23DqnM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29udHJhY3RQbGFuKFwiKzIwMCBHQiBFbnRlcnByaXNlXCIsIDIwMCwgXCJSJCAxOTksMDAvbcOqc1wiKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTMuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzMwIGhvdmVyOmJvcmRlci10ZXJ0aWFyeSBob3ZlcjpiZy10ZXJ0aWFyeS81IGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJmb250LXRpdGxlLW1kIHRleHQtb24tc3VyZmFjZSBibG9ja1wiPisyMDAgR0IgRW50ZXJwcmlzZTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMnB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBibG9jayBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICBCdWNrZXQgZGVkaWNhZG8gQVdTIFMzIGUgY29uZm9ybWlkYWRlIHJlZ3VsYW1lbnRhclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLXNtIGZvbnQtYm9sZCB0ZXh0LXRlcnRpYXJ5XCI+UiQgMTk5LDAwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBibG9ja1wiPi9tw6pzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZCBnYXAtMiBwdC0yIGJvcmRlci10IGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dVcGdyYWRlTW9kYWwoZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlIGZvbnQtdGl0bGUtbWQgZm9udC1zZW1pYm9sZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgQ2FuY2VsYXJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9SZXZlYWwuSWY+XG4gICAgICA8L1JldmVhbD5cblxuICAgICAgey8qIFByZXZpZXcgRmlsZSBNb2RhbCAqL31cbiAgICAgIDxSZXZlYWwgd2hlbj17KCkgPT4gcHJldmlld0ZpbGUoKSAhPT0gbnVsbH0+XG4gICAgICAgIDxSZXZlYWwuSWY+XG4gICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlID0gcHJldmlld0ZpbGUoKTtcbiAgICAgICAgICAgIGlmICghZmlsZSkgcmV0dXJuIDw+PC8+O1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgYmctYmxhY2svNjAgYmFja2Ryb3AtYmx1ci1zbSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgYW5pbWF0ZS1pbiBmYWRlLWluXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3QgbWF4LXctbWQgdy1mdWxsIHJvdW5kZWQtMnhsIHAtNiBzaGFkb3ctMnhsIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzMwIGZsZXggZmxleC1jb2wgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctOCBoLTggcm91bmRlZC1sZyAke2ZpbGUuaWNvbkJnfSAke2ZpbGUuaWNvbkNvbG9yfSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlcmB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPntmaWxlLmljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXRpdGxlLWxnIGZvbnQtYm9sZCB0ZXh0LW9uLXN1cmZhY2UgdHJ1bmNhdGUgbWF4LXctWzI0MHB4XVwiPntmaWxlLm5hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQcmV2aWV3RmlsZShudWxsKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcm91bmRlZC1sZyBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lciB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzIwcHhdXCI+Y2xvc2U8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IHNwYWNlLXktMiB0ZXh0LWJvZHktc21cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+VGFtYW5obzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LW9uLXN1cmZhY2UgZm9udC1tb25vXCI+e2ZpbGUuc2l6ZVRleHR9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5Gb3JtYXRvOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntmaWxlLmZvcm1hdH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5PcmlnZW06PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2ZpbGUub3JpZ2luVGl0bGV9IOKAoiB7ZmlsZS5vcmlnaW5TdWJ9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+Q2FuYWw6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZVwiPntmaWxlLmNoYW5uZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+RGF0YSBkbyBVcGxvYWQ6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZVwiPntmaWxlLmRhdGVUaW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPklkZW50aWZpY2Fkb3I6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPntmaWxlLmlkZW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBnYXAtMiBwdC0yIGJvcmRlci10IGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFByZXZpZXdGaWxlKG51bGwpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIGZvbnQtc2VtaWJvbGRcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgRmVjaGFyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1RvYXN0KFwiRG93bmxvYWQgQ29uY2x1w61kb1wiLCBgQXJxdWl2byAke2ZpbGUubmFtZX0gYmFpeGFkby5gLCBcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQcmV2aWV3RmlsZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJnLXByaW1hcnkgdGV4dC1vbi1wcmltYXJ5IGZvbnQtdGl0bGUtbWQgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPmRvd25sb2FkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkJhaXhhcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pKCl9XG4gICAgICAgIDwvUmV2ZWFsLklmPlxuICAgICAgPC9SZXZlYWw+XG4gICAgPC9kaXY+XG4gICk7XG59IiwiXG5pbXBvcnQgKiBhcyBjbGllbnRNb2R1bGUgZnJvbSBcIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL29tbmktaHViL3N0b3JhZ2Utc2NyZWVuLnRzeFwiO1xuaW1wb3J0IHsgaHlkcmF0ZUNsaWVudENvbXBvbmVudHMgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuXG5oeWRyYXRlQ2xpZW50Q29tcG9uZW50cyhcImNvbXBvbmVudHMvb21uaS1odWIvc3RvcmFnZS1zY3JlZW5cIiwgY2xpZW50TW9kdWxlKTtcbmV4cG9ydCB7fTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBeUJBLE1BQU0sc0JBQXVDO0NBQzNDO0VBQ0UsSUFBSTtFQUNKLE1BQU07RUFDTixPQUFPO0VBQ1AsUUFBUTtFQUNSLE1BQU07RUFD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