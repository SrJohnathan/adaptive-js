"hydrate";

import {  signal, useRouter } from "@adaptive-js/web";
import { showToast } from "../../shared/omni-hub/toast-store";
import { SCREEN_ROUTES } from "../../shared/omni-hub/types";

interface MediaFileItem {
  id: string;
  name: string;
  ident: string;
  format: string;
  type: "photo" | "video" | "doc" | "audio";
  originTitle: string;
  originSub: string;
  channel: string;
  sizeMB: number;
  sizeText: string;
  dateTime: string;
  timestamp: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}

type MediaTypeFilter = "all" | "photo" | "video" | "doc" | "audio";
type SortOption = "size_desc" | "recent" | "oldest";

const INITIAL_MEDIA_FILES: MediaFileItem[] = [
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
    timestamp: 1731943320000,
    icon: "videocam",
    iconBg: "bg-secondary-fixed/60",
    iconColor: "text-secondary",
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
    timestamp: 1731838500000,
    icon: "picture_as_pdf",
    iconBg: "bg-tertiary-fixed/60",
    iconColor: "text-tertiary",
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
    timestamp: 1731949440000,
    icon: "image",
    iconBg: "bg-primary-fixed/60",
    iconColor: "text-primary",
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
    timestamp: 1731872400000,
    icon: "fastfood",
    iconBg: "bg-primary-fixed/60",
    iconColor: "text-primary",
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
    timestamp: 1731791400000,
    icon: "table_chart",
    iconBg: "bg-tertiary-fixed/60",
    iconColor: "text-tertiary",
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
    timestamp: 1731760320000,
    icon: "graphic_eq",
    iconBg: "bg-surface-container-high",
    iconColor: "text-outline",
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
    timestamp: 1731696600000,
    icon: "assignment_turned_in",
    iconBg: "bg-tertiary-fixed/60",
    iconColor: "text-tertiary",
  },
];

const TYPE_LABELS: Record<MediaTypeFilter, string> = {
  all: "Todos",
  photo: "Fotos",
  video: "Vídeos",
  doc: "Documentos",
  audio: "Áudios",
};

export function StorageScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = signal("");
  const [selectedType, setSelectedType] = signal<MediaTypeFilter>("all");
  const [selectedChannel, setSelectedChannel] = signal("all");
  const [sortBy, setSortBy] = signal<SortOption>("size_desc");
  const [files, setFiles] = signal<MediaFileItem[]>(INITIAL_MEDIA_FILES);

  const [totalCapacityGB, setTotalCapacityGB] = signal(3.0);
  const [usedGB, setUsedGB] = signal(2.42);
  const [autoPurgeEnabled, setAutoPurgeEnabled] = signal(true);

  const [isCleaningCache, setIsCleaningCache] = signal(false);
  const [cacheCleaned, setCacheCleaned] = signal(false);
  const [showUpgradeModal, setShowUpgradeModal] = signal(false);
  const [previewFile, setPreviewFile] = signal<MediaFileItem | null>(null);

  const handleQuickCacheClean = () => {
    if (isCleaningCache()) return;
    setIsCleaningCache(true);
    showToast("Limpeza em Andamento", "Removendo miniaturas em cache e logs temporários...", "info");

    setTimeout(() => {
      setIsCleaningCache(false);
      setCacheCleaned(true);
      setUsedGB((prev) => Math.max(1.8, +(prev - 0.18).toFixed(2)));
      showToast("Cache Liberado com Sucesso", "180 MB de arquivos temporários foram expurgados.", "success");

      setTimeout(() => {
        setCacheCleaned(false);
      }, 3500);
    }, 1200);
  };

  const handleContractPlan = (planName: string, additionalGB: number, price: string) => {
    setTotalCapacityGB((prev) => +(prev + additionalGB).toFixed(1));
    setShowUpgradeModal(false);
    showToast(
      "Upgrade Contratado!",
      `Pacote de ${planName} ativado com sucesso por ${price}. Cota atualizada instantaneamente.`,
      "success",
    );
  };

  const handleDeleteFile = (file: MediaFileItem) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
    setUsedGB((prev) => Math.max(1.0, +(prev - file.sizeMB / 1024).toFixed(2)));
    showToast("Arquivo Excluído", `"${file.name}" foi removido do armazenamento em nuvem.`, "info");
  };

  const filteredFiles = () =>
    files()
      .filter((item) => {
        const query = searchQuery().toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.ident.toLowerCase().includes(query) ||
          item.originTitle.toLowerCase().includes(query);

        const matchesType = selectedType() === "all" || item.type === selectedType();
        const matchesChannel = selectedChannel() === "all" || item.channel === selectedChannel();

        return matchesSearch && matchesType && matchesChannel;
      })
      .sort((a, b) => {
        if (sortBy() === "size_desc") return b.sizeMB - a.sizeMB;
        if (sortBy() === "recent") return b.timestamp - a.timestamp;
        if (sortBy() === "oldest") return a.timestamp - b.timestamp;
        return 0;
      });

  const percentageUsed = () =>
    Math.min(100, Math.round((usedGB() / totalCapacityGB()) * 100 * 10) / 10);

  const freeMB = () => Math.max(0, Math.round((totalCapacityGB() - usedGB()) * 1024));

  const goToSettings = () => router.push(SCREEN_ROUTES["configuracoes-conta"]);

  const scrollToPackages = () => {
    const elem = document.getElementById("expansion-packages");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1440px] mx-auto">
        {/* Top Bar: Breadcrumb, Heading & Global Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1 text-on-surface-variant font-label-sm">
              <button
                type="button"
                onClick={goToSettings}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Configurações
              </button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="hover:text-primary transition-colors cursor-pointer">
                Espaço em Disco & Mídias
              </span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-semibold">Monitoramento de Armazenamento</span>
            </nav>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]">cloud_sync</span>
              </div>
              <h1 className="font-headline-xl text-on-surface tracking-tight font-bold">
                Armazenamento & Gestão de Mídias
              </h1>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-3xl">
              Monitore o volume de arquivos de conversas, catálogos, mídias de campanhas e documentos fiscais
              trafegados nos mensageiros.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled={() => isCleaningCache()}
              onClick={handleQuickCacheClean}
              className="h-9 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-title-md shadow-sm hover:bg-surface-container-high transition-all flex items-center gap-1.5 active:scale-95 border border-outline-variant/20 cursor-pointer disabled:opacity-70"
            >
              {() =>
                isCleaningCache() ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin text-primary">
                      progress_activity
                    </span>
                    <span>Limpando 180 MB...</span>
                  </>
                ) : cacheCleaned() ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-tertiary">check</span>
                    <span className="text-tertiary font-bold">180 MB Liberados!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      cleaning_services
                    </span>
                    <span>Limpeza Rápida de Cache</span>
                  </>
                )
              }
            </button>

            <button
              type="button"
              onClick={() => setShowUpgradeModal(true)}
              className="h-9 px-4 rounded-xl bg-primary-container text-on-primary font-title-md shadow-sm hover:bg-primary transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>+ Fazer Upgrade de Espaço</span>
            </button>
          </div>
        </div>

        {/* Main Alert & Global Meter Card */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm p-6 flex flex-col gap-5 border border-outline-variant/20">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-title-md text-on-surface-variant uppercase tracking-wider font-semibold">
                  Cota Padrão Alocada
                </span>
                <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                  {() => (percentageUsed() >= 80 ? `Crítico: ${percentageUsed()}%` : `Uso: ${percentageUsed()}%`)}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-xl text-primary font-bold">
                  {() => usedGB().toFixed(2).replace(".", ",")} GB
                </span>
                <span className="font-body-lg text-on-surface-variant">
                  utilizados de{" "}
                  <strong className="text-on-surface font-semibold">
                    {() => totalCapacityGB().toFixed(2).replace(".", ",")} GB
                  </strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="font-label-sm text-on-surface-variant">Disponível em Nuvem</span>
                <span className="font-title-lg text-tertiary font-bold">{() => freeMB()} MB livres</span>
              </div>
              <button
                type="button"
                onClick={scrollToPackages}
                className="h-9 px-3.5 rounded-xl bg-primary text-on-primary font-title-md shadow-sm hover:bg-on-primary-container transition-all flex items-center gap-1.5 shrink-0 font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                <span>Comprar Pacote Adicional (+10 GB por R$ 29/mês)</span>
              </button>
            </div>
          </div>

          {/* Segmented Multi-Color Progress Bar */}
          <div className="flex flex-col gap-1 relative z-10">
            <div className="w-full h-3.5 rounded-full bg-surface-container-high overflow-hidden flex shadow-inner">
              <div
                className="h-full bg-primary-container transition-all hover:opacity-90"
                style={{ width: "38.3%" }}
                title="Fotos & Imagens: 1,15 GB (38.3%)"
              />
              <div
                className="h-full bg-secondary transition-all hover:opacity-90"
                style={{ width: "29.6%" }}
                title="Vídeos & Reels: 890 MB (29.6%)"
              />
              <div
                className="h-full bg-tertiary-container transition-all hover:opacity-90"
                style={{ width: "10.3%" }}
                title="Documentos & PDFs: 310 MB (10.3%)"
              />
              <div
                className="h-full bg-outline transition-all hover:opacity-90"
                style={{ width: "4.0%" }}
                title="Áudios de Voz & Outros: 120 MB (4.0%)"
              />
              <div className="h-full bg-transparent flex-1" title={() => `Livre: ${freeMB()} MB`} />
            </div>

            {/* Legend for Progress Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 font-body-sm text-on-surface-variant">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <span className="font-medium text-on-surface">Fotos & Imagens</span>
                  <span className="font-code-sm text-on-surface-variant">1,15 GB (38.3%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="font-medium text-on-surface">Vídeos & Reels</span>
                  <span className="font-code-sm text-on-surface-variant">890 MB (29.6%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                  <span className="font-medium text-on-surface">Documentos & PDFs</span>
                  <span className="font-code-sm text-on-surface-variant">310 MB (10.3%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                  <span className="font-medium text-on-surface">Áudios & Whisper</span>
                  <span className="font-code-sm text-on-surface-variant">120 MB (4.0%)</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-surface-variant"></span>
                <span className="font-medium text-on-surface">Espaço Não Utilizado</span>
                <span className="font-code-sm text-on-surface-variant font-semibold">
                  {() => `${freeMB()} MB (${(100 - percentageUsed()).toFixed(1)}%)`}
                </span>
              </div>
            </div>
          </div>

          {/* Warning Callout */}
          <div className="p-3.5 rounded-xl bg-error-container/40 text-on-error-container flex items-start gap-3 relative z-10 border border-error-container/50">
            <span className="material-symbols-outlined text-[22px] text-error shrink-0">warning</span>
            <div className="flex flex-col gap-0.5">
              <p className="font-title-md font-bold text-error">
                {() => `Atenção: Você atingiu ${percentageUsed()}% da sua cota padrão de ${totalCapacityGB().toFixed(0)} GB.`}
              </p>
              <p className="font-body-sm text-on-surface-variant">
                Mídias temporárias e arquivos antigos com mais de 90 dias poderão ter retenção automática programada
                caso a capacidade se esgote.
              </p>
            </div>
          </div>
        </div>

        {/* Category Breakdown Grid (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">photo_library</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm font-semibold">
                38.3%
              </span>
            </div>
            <div>
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Fotos & Imagens
              </span>
              <h3 className="font-headline-lg text-on-surface font-bold mt-0.5">1,15 GB</h3>
              <p className="font-body-sm text-on-surface-variant mt-1">
                4.820 arquivos registrados em chats e vitrines.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm">
              <div className="flex justify-between items-center">
                <span>Formatos:</span>
                <span className="font-code-sm text-on-surface font-semibold">.jpg, .png, .webp</span>
              </div>
              <div className="flex justify-between items-center">
                <span>TurboCompress:</span>
                <span className="font-code-sm text-tertiary font-bold">-42% poupados</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: "38.3%" }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[24px]">movie</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-sm font-semibold">
                29.6%
              </span>
            </div>
            <div>
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Vídeos & Reels
              </span>
              <h3 className="font-headline-lg text-on-surface font-bold mt-0.5">890 MB</h3>
              <p className="font-body-sm text-on-surface-variant mt-1">
                312 vídeos promocionais e unboxing enviados.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm">
              <div className="flex justify-between items-center">
                <span>Resolução:</span>
                <span className="font-code-sm text-on-surface font-semibold">720p / 1080p MP4</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API Gateway:</span>
                <span className="font-code-sm text-on-surface font-semibold">WhatsApp Cloud OK</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: "29.6%" }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[24px]">description</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm font-semibold">
                10.3%
              </span>
            </div>
            <div>
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Documentos & PDFs
              </span>
              <h3 className="font-headline-lg text-on-surface font-bold mt-0.5">310 MB</h3>
              <p className="font-body-sm text-on-surface-variant mt-1">
                1.450 contratos, faturas ERP e notas fiscais.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm">
              <div className="flex justify-between items-center">
                <span>Segurança:</span>
                <span className="font-code-sm text-on-surface font-semibold">AES-256 Em Repouso</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sincronia:</span>
                <span className="font-code-sm text-primary font-semibold">ERP Totvs & Bling</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary-container h-full rounded-full" style={{ width: "10.3%" }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow border border-outline-variant/20">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-[24px]">mic</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-outline font-label-sm font-semibold">
                4.0%
              </span>
            </div>
            <div>
              <span className="font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Áudios & Transcrições
              </span>
              <h3 className="font-headline-lg text-on-surface font-bold mt-0.5">120 MB</h3>
              <p className="font-body-sm text-on-surface-variant mt-1">
                3.910 mensagens de áudio dos clientes no Omni.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-surface-container-low flex flex-col gap-1 text-on-surface-variant font-body-sm">
              <div className="flex justify-between items-center">
                <span>Formato Áudio:</span>
                <span className="font-code-sm text-on-surface font-semibold">OGG Opus 16kbps</span>
              </div>
              <div className="flex justify-between items-center">
                <span>IA Transcrição:</span>
                <span className="font-code-sm text-on-surface font-semibold">Whisper v3 Turbo</span>
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-outline h-full rounded-full" style={{ width: "4.0%" }} />
            </div>
          </div>
        </div>

        {/* Expansion Packages Section */}
        <div className="flex flex-col gap-4 scroll-mt-20" id="expansion-packages">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-md text-on-surface font-bold">
                Pacotes de Expansão de Armazenamento
              </h2>
              <p className="font-body-sm text-on-surface-variant">
                Aumente sua cota sem interrupções operacionais e mantenha históricos completos de conversas e mídias.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 font-label-sm text-primary font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Cobrança flexível pós-pago na fatura
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Package 1: +10 GB (Popular) */}
            <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden border border-primary/30">
              <div className="absolute top-0 right-0">
                <span className="px-3.5 py-1 rounded-bl-xl bg-primary-container text-on-primary font-label-sm font-bold tracking-wide uppercase">
                  Mais Escolhido
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[24px] text-primary">cloud</span>
                  <h4 className="font-title-lg text-on-surface font-bold">+10 GB Adicionais</h4>
                </div>
                <p className="font-body-sm text-on-surface-variant">
                  Ideal para operações em crescimento contínuo de WhatsApp e catálogos recorrentes.
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-xl text-primary font-bold">R$ 29,90</span>
                  <span className="font-body-sm text-on-surface-variant">/mês</span>
                </div>
                <ul className="flex flex-col gap-1.5 pt-1 font-body-sm text-on-surface">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                    <span>Ativação instantânea em 1 clique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                    <span>Histórico garantido sem auto-expurgo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                    <span>Compressão inteligente ativada</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleContractPlan("+10 GB Adicionais", 10, "R$ 29,90/mês")}
                className="w-full h-10 rounded-xl bg-primary-container text-on-primary font-title-md shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                <span>Contratar Agora</span>
              </button>
            </div>

            {/* Package 2: +50 GB */}
            <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5 hover:shadow-md transition-shadow border border-outline-variant/20">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[24px] text-secondary">database</span>
                  <h4 className="font-title-lg text-on-surface font-bold">+50 GB Adicionais</h4>
                </div>
                <p className="font-body-sm text-on-surface-variant">
                  Perfeito para lojas de varejo com grandes fluxos de mídias de alta definição e vídeos.
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-xl text-secondary font-bold">R$ 89,90</span>
                  <span className="font-body-sm text-on-surface-variant">/mês</span>
                </div>
                <ul className="flex flex-col gap-1.5 pt-1 font-body-sm text-on-surface">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                    <span>Suporte a vídeos até 4K e catálogos pesados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                    <span>Prioridade no pipeline de CDN Cloudflare</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                    <span>Exportação periódica em massa</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleContractPlan("+50 GB Adicionais", 50, "R$ 89,90/mês")}
                className="w-full h-10 rounded-xl bg-surface-container text-on-surface font-title-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer font-bold"
              >
                <span>Contratar Plano</span>
              </button>
            </div>

            {/* Package 3: +200 GB Enterprise */}
            <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-5 hover:shadow-md transition-shadow border border-outline-variant/20">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[24px] text-tertiary">domain</span>
                  <h4 className="font-title-lg text-on-surface font-bold">+200 GB Enterprise</h4>
                </div>
                <p className="font-body-sm text-on-surface-variant">
                  Infraestrutura corporativa dedicada com retenção perpétua de documentos fiscais e auditoria.
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-headline-xl text-tertiary font-bold">R$ 199,00</span>
                  <span className="font-body-sm text-on-surface-variant">/mês</span>
                </div>
                <ul className="flex flex-col gap-1.5 pt-1 font-body-sm text-on-surface">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                    <span>Bucket AWS S3 Dedicado na região Brasil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                    <span>Retenção legal regulamentar de 5 anos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                    <span>SLA de disponibilidade 99.99%</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() =>
                  showToast("Gerente de Conta", "Um consultor empresarial do time de infraestrutura entrará em contato.", "info")
                }
                className="w-full h-10 rounded-xl bg-surface-container text-on-surface font-title-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer font-bold"
              >
                <span>Falar com Gerente de Conta</span>
              </button>
            </div>
          </div>
        </div>

        {/* Media Table & Explorer */}
        <div className="rounded-xl bg-surface-container-lowest shadow-sm p-5 flex flex-col gap-4 border border-outline-variant/20">
          {/* Table Filters & Header Tools */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-lg">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                value={() => searchQuery()}
                onInput={(event) => setSearchQuery(event.currentTarget.value)}
                placeholder="Pesquisar por nome do arquivo, protocolo de chat ou cliente..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-on-surface-variant/60 shadow-inner border border-outline-variant/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Type Filter */}
              <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant/20">
                {(["all", "photo", "video", "doc", "audio"] as const).map((type) => {
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={() =>
                        selectedType() === type
                          ? "px-3 py-1 rounded-lg font-label-sm font-semibold transition-colors cursor-pointer text-on-primary bg-primary-container shadow-sm"
                          : "px-3 py-1 rounded-lg font-label-sm font-semibold transition-colors cursor-pointer text-on-surface-variant hover:text-on-surface"
                      }
                    >
                      {TYPE_LABELS[type]}
                    </button>
                  );
                })}
              </div>

              {/* Channel Filter Dropdown */}
              <select
                value={() => selectedChannel()}
                onChange={(event) => setSelectedChannel(event.currentTarget.value)}
                className="h-9 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm outline-none cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20"
              >
                <option value="all">Todos os Canais</option>
                <option value="WhatsApp Gupshup">WhatsApp Gupshup</option>
                <option value="Instagram Direct">Instagram Direct</option>
                <option value="Telegram Omni">Telegram Omni</option>
                <option value="Catálogo ERP Totvs">Catálogo ERP Totvs</option>
              </select>

              {/* Sorting Dropdown */}
              <select
                value={() => sortBy()}
                onChange={(event) => setSortBy(event.currentTarget.value as SortOption)}
                className="h-9 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm outline-none cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20"
              >
                <option value="size_desc">Mais pesados primeiro</option>
                <option value="recent">Mais recentes</option>
                <option value="oldest">Mais antigos</option>
              </select>
            </div>
          </div>

          {/* File Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm border-collapse">
              <thead>
                <tr className="text-on-surface-variant font-label-sm uppercase tracking-wider bg-surface-container-low/60 rounded-xl">
                  <th className="py-3 px-4 rounded-l-xl">Arquivo & Identificador</th>
                  <th className="py-3 px-3">Formato</th>
                  <th className="py-3 px-3">Origem & Vínculo</th>
                  <th className="py-3 px-3">Tamanho</th>
                  <th className="py-3 px-3">Data / Hora</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Ações</th>
                </tr>
              </thead>
              <tbody className="text-on-surface divide-y divide-outline-variant/10">
                {(() => {
                  const rows = filteredFiles();
                  if (rows.length === 0) {
                    return (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-on-surface-variant">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40">
                              folder_off
                            </span>
                            <span>Nenhum arquivo encontrado com os filtros selecionados.</span>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                  return rows.map((file) => (
                    <tr className="hover:bg-surface-container-low/40 transition-colors group">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-lg ${file.iconBg} ${file.iconColor} flex items-center justify-center shrink-0`}
                          >
                            <span className="material-symbols-outlined text-[20px]">{file.icon}</span>
                          </div>
                          <div className="flex flex-col min-w-0 max-w-xs md:max-w-md">
                            <span className="font-title-md font-semibold truncate text-on-surface">{file.name}</span>
                            <span className="font-label-sm text-on-surface-variant font-mono">{file.ident}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm font-semibold">
                          {file.format}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex flex-col">
                          <span className="font-title-md text-on-surface font-semibold">{file.originTitle}</span>
                          <span className="font-body-sm text-on-surface-variant">{file.originSub}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-code-sm font-bold text-on-surface">{file.sizeText}</td>
                      <td className="py-3.5 px-3 text-on-surface-variant">{file.dateTime}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => showToast("Download Iniciado", `Baixando ${file.name}...`, "success")}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                            title="Download do Arquivo"
                          >
                            <span className="material-symbols-outlined text-[18px]">download</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewFile(file)}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                            title="Visualizar Detalhes"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFile(file)}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors cursor-pointer"
                            title="Liberar Espaço"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>

          {/* Pagination & Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 text-on-surface-variant font-body-sm">
            <span>
              Exibindo <strong className="text-on-surface font-semibold">{() => `1-${filteredFiles().length}`}</strong> de{" "}
              <strong className="text-on-surface font-semibold">6.582 arquivos armazenados</strong> •{" "}
              {() => `${usedGB().toFixed(2).replace(".", ",")} GB totais`}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors disabled:opacity-40"
                disabled
              >
                Anterior
              </button>
              <button type="button" className="px-3 py-1 rounded-lg bg-primary-container text-on-primary font-title-md font-bold">
                1
              </button>
              <button type="button" className="px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors">
                2
              </button>
              <button type="button" className="px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors">
                3
              </button>
              <span className="px-2">...</span>
              <button type="button" className="px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors">
                941
              </button>
              <button type="button" className="px-3 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md transition-colors">
                Próxima
              </button>
            </div>
          </div>
        </div>

        {/* Retention & Governance Footer Card */}
        <div className="rounded-xl bg-surface-container-lowest shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-on-surface font-bold">
                Políticas de Retenção & Governança de Dados
              </span>
              <span className="font-body-sm text-on-surface-variant">
                Conformidade com LGPD, criptografia ponta a ponta e redundância AWS multi-região São Paulo.
              </span>
            </div>
          </div>

          {/* Auto-purge Toggle */}
          <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl shrink-0 border border-outline-variant/20">
            <div className="flex flex-col text-right">
              <span className="font-title-md text-on-surface font-semibold">Auto-expurgo 90 dias</span>
              <span className="font-label-sm text-primary font-bold">
                {() => (autoPurgeEnabled() ? "Economiza ~600 MB/mês" : "Auto-expurgo Desativado")}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={() => autoPurgeEnabled()}
                onChange={(event) => {
                  setAutoPurgeEnabled(event.currentTarget.checked);
                  showToast(
                    event.currentTarget.checked ? "Auto-expurgo Ativado" : "Auto-expurgo Desativado",
                    event.currentTarget.checked
                      ? "Arquivos de mídia com mais de 90 dias serão purgados automaticamente."
                      : "Retenção perpétua ativada. Pode consumir maior cota em disco.",
                    event.currentTarget.checked ? "success" : "warning",
                  );
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Reveal when={() => showUpgradeModal()}>
        <Reveal.If>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-[26px]">add_shopping_cart</span>
                  <h3 className="font-headline-md font-bold text-on-surface">Upgrade de Armazenamento</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowUpgradeModal(false)}
                  className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <p className="font-body-sm text-on-surface-variant">
                Selecione o plano desejado para expandir imediatamente a capacidade do seu hub omnichannel sem
                interrupção de atendimento ou perda de históricos.
              </p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleContractPlan("+10 GB Adicionais", 10, "R$ 29,90/mês")}
                  className="w-full p-3.5 rounded-xl border-2 border-primary bg-primary/5 hover:bg-primary/10 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="font-title-md text-on-surface">+10 GB Adicionais</strong>
                      <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary text-[10px] font-bold">
                        Mais Escolhido
                      </span>
                    </div>
                    <span className="text-[12px] text-on-surface-variant block mt-0.5">
                      Ideal para chats WhatsApp recorrentes e catálogos
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-sm font-bold text-primary">R$ 29,90</span>
                    <span className="text-[11px] text-on-surface-variant block">/mês</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleContractPlan("+50 GB Adicionais", 50, "R$ 89,90/mês")}
                  className="w-full p-3.5 rounded-xl border border-outline-variant/30 hover:border-secondary hover:bg-secondary/5 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <strong className="font-title-md text-on-surface block">+50 GB Adicionais</strong>
                    <span className="text-[12px] text-on-surface-variant block mt-0.5">
                      Suporte a vídeos 4K e catálogos de alta definição
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-sm font-bold text-secondary">R$ 89,90</span>
                    <span className="text-[11px] text-on-surface-variant block">/mês</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleContractPlan("+200 GB Enterprise", 200, "R$ 199,00/mês")}
                  className="w-full p-3.5 rounded-xl border border-outline-variant/30 hover:border-tertiary hover:bg-tertiary/5 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <strong className="font-title-md text-on-surface block">+200 GB Enterprise</strong>
                    <span className="text-[12px] text-on-surface-variant block mt-0.5">
                      Bucket dedicado AWS S3 e conformidade regulamentar
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-sm font-bold text-tertiary">R$ 199,00</span>
                    <span className="text-[11px] text-on-surface-variant block">/mês</span>
                  </div>
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setShowUpgradeModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-title-md font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </Reveal.If>
      </Reveal>

      {/* Preview File Modal */}
      <Reveal when={() => previewFile() !== null}>
        <Reveal.If>
          {(() => {
            const file = previewFile();
            if (!file) return <></>;
            return (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg ${file.iconBg} ${file.iconColor} flex items-center justify-center`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{file.icon}</span>
                      </div>
                      <h3 className="font-title-lg font-bold text-on-surface truncate max-w-[240px]">{file.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewFile(null)}
                      className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low space-y-2 text-body-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Tamanho:</span>
                      <strong className="text-on-surface font-mono">{file.sizeText}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Formato:</span>
                      <span className="font-semibold text-primary">{file.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Origem:</span>
                      <span className="text-on-surface">
                        {file.originTitle} • {file.originSub}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Canal:</span>
                      <span className="text-on-surface">{file.channel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Data do Upload:</span>
                      <span className="text-on-surface">{file.dateTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Identificador:</span>
                      <span className="font-mono text-[11px] text-on-surface-variant">{file.ident}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                    <button
                      type="button"
                      onClick={() => setPreviewFile(null)}
                      className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-title-md font-semibold"
                    >
                      Fechar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        showToast("Download Concluído", `Arquivo ${file.name} baixado.`, "success");
                        setPreviewFile(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-primary text-on-primary font-title-md font-bold flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      <span>Baixar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </Reveal.If>
      </Reveal>
    </div>
  );
}