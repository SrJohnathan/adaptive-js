"hydrate";

import {  signal, useRouter } from "@adaptive-js/web";
import { products, setProducts } from "../../shared/omni-hub/catalog-store";
import { showToast } from "../../shared/omni-hub/toast-store";
import { SCREEN_ROUTES, type ProductItem } from "../../shared/omni-hub/types";

const COPY_VARIATIONS = [
  '"Massa de fermentação natural 48h, molho artesanal de tomates San Marzano e fior di latte fresco maçaricado na hora."',
  '"Smash suculento com crosta crocante caramelizada, queijo cheddar inglês derretido e fatias de bacon artesanal defumado em lenha nobre."',
  '"Salmão fresco selecionado cortado em cubos grelhados, acompanhado de edamame crocante, lâminas de abacate hass e gergelim tostado."',
];

const CATALOG_TAGS: { id: string; label: string; icon?: string; isFire?: boolean; isWarning?: boolean }[] = [
  { id: "Todos", label: `Todos os Itens (${"6"})` },
  { id: "Mais Vendidos", label: "Mais Vendidos no iFood", icon: "local_fire_department", isFire: true },
  { id: "Pratos Principais", label: "Pratos Principais" },
  { id: "Bebidas & Drinks", label: "Bebidas & Drinks" },
  { id: "Sobremesas", label: "Sobremesas" },
  { id: "Baixo Estoque", label: "Baixo Estoque", icon: "warning", isWarning: true },
];

export function CatalogScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = signal("");
  const [selectedTag, setSelectedTag] = signal("Todos");
  const [priceChannel, setPriceChannel] = signal<"ifood" | "balcao">("ifood");
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

  const handleToggleProduct = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const newState = !p.activeInIfood;
        showToast(
          newState ? "Produto Ativado no iFood" : "Produto Pausado no iFood",
          `${p.name} agora está ${newState ? "disponível para pedidos" : "pausado na cozinha"}.`,
          newState ? "success" : "warning",
        );
        return { ...p, activeInIfood: newState };
      }),
    );
  };

  const handleSendToChat = (product: ProductItem) => {
    showToast("Prato Anexado ao Chat", `${product.name} (${product.ifoodPrice}) pronto para envio no Chat Omnichannel.`);
    router.push(SCREEN_ROUTES["chat-omnichannel"]);
  };

  const handleNextCopy = () => {
    const next = (copyIndex() + 1) % COPY_VARIATIONS.length;
    setCopyIndex(next);
    showToast("IA Copilot Vendas", "Nova variação gerada com foco em conversão de cardápio!");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1680px] mx-auto">
      {/* Top Breadcrumbs & Operational Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
          <span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
            Catálogo Unificado
          </span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">Sincronizador ERP & iFood API</span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-code-sm font-semibold">
            Node: BR-SP-JARDINS-01
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span>Sync há 45s • Uptime 99.8%</span>
          </div>

          <button
            type="button"
            onClick={handleSync}
            disabled={() => isSyncing()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md transition-all shadow-sm active:scale-95 border border-outline-variant/20"
          >
            <span className={`material-symbols-outlined text-primary text-[18px] ${isSyncing() ? "animate-spin" : ""}`}>
              sync
            </span>
            <span>{() => (isSyncing() ? "Sincronizando..." : "Sincronizar Agora")}</span>
          </button>

          <button
            type="button"
            onClick={() => showToast("Configurações ERP", "Totvs Protheus v12.1 conectado ao Depósito Central 01.", "info")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">settings_input_composite</span>
            <span>Configurar ERP</span>
          </button>

          <button
            type="button"
            onClick={() => showToast("Novo Prato", "Abra o formulário de cadastro de SKU para sincronizar com iFood e Totvs.", "info")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Novo Produto</span>
          </button>
        </div>
      </div>

      {/* Header Principal */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="font-headline-lg text-on-surface tracking-tight font-bold">
              Catálogo de Produtos & Integrações ERP
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm font-semibold">
              V 4.8 Live
            </span>
          </div>
          <p className="text-on-surface-variant font-body-md leading-relaxed">
            Sincronização bidirecional em tempo real com iFood Marketplace, Totvs Protheus, Bling, Tiny e WhatsApp Commerce.
            Ajuste disponibilidades de cozinha, crie promoções e anexe itens diretamente na conversa do cliente.
          </p>
        </div>

        {/* Métricas Compactas */}
        <div className="flex items-center gap-3 sm:gap-4 p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
          <div className="flex flex-col px-2 text-left">
            <span className="text-on-surface-variant font-label-sm">Itens no iFood</span>
            <span className="font-headline-md text-on-surface font-bold">
              148 <span className="font-label-sm text-tertiary">ativos</span>
            </span>
          </div>
          <div className="w-px h-8 bg-surface-container-highest"></div>
          <div className="flex flex-col px-2 text-left">
            <span className="text-on-surface-variant font-label-sm">Taxa de Conversão</span>
            <span className="font-headline-md text-primary font-bold">24.6%</span>
          </div>
          <div className="w-px h-8 bg-surface-container-highest"></div>
          <div className="flex flex-col px-2 text-left">
            <span className="text-on-surface-variant font-label-sm">Ruptura Estoque</span>
            <span className="font-headline-md font-bold text-red-600">0.8%</span>
          </div>
        </div>
      </div>

      {/* Hub de Conexões Ativas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-error-container/60 flex items-center justify-center text-error text-[#EA1D2C]">
                <span className="material-symbols-outlined text-[24px]">delivery_dining</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-on-surface font-semibold">iFood Jardins</span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                </div>
                <span className="font-code-sm text-on-surface-variant font-mono">ID #8942-SP</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm font-semibold">
              Webhook 100%
            </span>
          </div>
          <div className="mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant">
            <span>148 itens sincronizados</span>
            <span className="text-tertiary font-medium">Cardápio Oficial • Online</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-bold">
                <span className="material-symbols-outlined text-[24px]">database</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-title-md text-on-surface font-semibold">Totvs Protheus ERP</span>
                </div>
                <span className="font-code-sm text-on-surface-variant font-mono">REST API v12.1</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm font-semibold">
              Saldo Real
            </span>
          </div>
          <div className="mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant">
            <span>Depósito Central #01</span>
            <span className="text-primary font-medium">Auto-baixa de estoque</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary font-bold">
                <span className="material-symbols-outlined text-[24px]">receipt_long</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-title-md text-on-surface font-semibold">Bling! Fiscal Hub</span>
                </div>
                <span className="font-code-sm text-on-surface-variant font-mono">NFC-e Automática</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm font-semibold">
              SEFAZ OK
            </span>
          </div>
          <div className="mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant">
            <span>Série 003 emitida</span>
            <span className="text-on-surface font-medium">Tempo médio 1.2s</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold">
                <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-title-md text-on-surface font-semibold">WhatsApp Catalog</span>
                </div>
                <span className="font-code-sm text-on-surface-variant font-mono">Cloud API Meta</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm font-semibold">
              100% Pareado
            </span>
          </div>
          <div className="mt-4 pt-2 border-t border-outline-variant/15 flex items-center justify-between font-label-sm text-on-surface-variant">
            <span>Checkout via Bot</span>
            <span className="text-primary font-medium">Pix nativo ativo</span>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Coluna Esquerda: Filtros e Tabela */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          {/* Barra de Busca & Filtros */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center bg-surface-container-low rounded-xl px-3.5 py-2 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <span className="material-symbols-outlined text-on-surface-variant mr-2 text-[20px]">search</span>
                <input
                  type="text"
                  value={() => searchQuery()}
                  onInput={(event) => setSearchQuery(event.currentTarget.value)}
                  placeholder="Buscar produto por nome, código SKU, ingrediente ou categoria ERP..."
                  className="w-full bg-transparent border-none outline-none font-body-sm text-on-surface placeholder:text-on-surface-variant/70"
                />
                <kbd className="hidden sm:inline-block font-code-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">
                  Ctrl /
                </kbd>
              </div>

              {/* Seletor de Canal de Preço */}
              <div className="flex items-center bg-surface-container-low rounded-xl p-1 shrink-0 border border-outline-variant/20">
                {(["ifood", "balcao"] as const).map((channel) => {
                  const isSelected = priceChannel() === channel;
                  return (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => setPriceChannel(channel)}
                      className={() =>
                        isSelected
                          ? "px-3 py-1.5 rounded-lg font-title-md transition-all bg-surface-container-lowest shadow-sm text-primary font-bold"
                          : "px-3 py-1.5 rounded-lg font-title-md transition-all text-on-surface-variant hover:text-on-surface"
                      }
                    >
                      {channel === "ifood" ? "Cardápio iFood" : "WhatsApp / Balcão"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tags de Filtro Rápido */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-nowrap scrollbar-none">
              {CATALOG_TAGS.map((tag) => {
                const isSelected = selectedTag() === tag.id;
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => setSelectedTag(tag.id)}
                    className={() =>
                      isSelected
                        ? "px-3 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-primary text-on-primary shadow-sm font-bold"
                        : tag.isWarning
                          ? "px-3 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-error-container/40 hover:bg-error-container text-on-error-container"
                          : "px-3 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/20"
                    }
                  >
                    {tag.icon && (
                      <span className={`material-symbols-outlined text-[16px] ${tag.isFire ? "text-amber-600" : "text-error"}`}>
                        {tag.icon}
                      </span>
                    )}
                    <span>{tag.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lista de Produtos */}
          <div className="flex flex-col gap-2.5">
            {() =>
              products()
                .filter((p) => {
                  const matchesSearch =
                    p.name.toLowerCase().includes(searchQuery().toLowerCase()) ||
                    p.sku.toLowerCase().includes(searchQuery().toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery().toLowerCase());
                  if (!matchesSearch) return false;
                  if (selectedTag() === "Mais Vendidos")
                    return p.ratingBadge?.includes("Mais Pedido") || p.ratingBadge?.includes("Top 1");
                  if (selectedTag() === "Pratos Principais")
                    return p.category.includes("Pizzas") || p.category.includes("Tradicionais") || p.category.includes("Bowls");
                  if (selectedTag() === "Bebidas & Drinks") return p.category.includes("Bebidas");
                  if (selectedTag() === "Sobremesas") return p.category.includes("Sobremesas");
                  if (selectedTag() === "Baixo Estoque") return Boolean(p.lowStock);
                  return true;
                })
                .map((product) => (
                  <div
                    className={`bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group ${() =>
                      !product.activeInIfood ? "opacity-80 bg-surface-container-low/40" : ""}`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        className="w-16 h-16 rounded-xl object-cover shadow-inner shrink-0 ring-1 ring-outline-variant/20"
                        alt={product.name}
                        src={product.image}
                      />
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-title-lg text-on-surface font-bold truncate">{product.name}</span>
                          {product.ratingBadge && (
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm font-semibold">
                              {product.ratingBadge}
                            </span>
                          )}
                          {product.tag && (
                            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm">
                              {product.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-on-surface-variant font-body-sm flex-wrap">
                          <span className="font-code-sm bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface border border-outline-variant/20">
                            SKU: {product.sku}
                          </span>
                          <span>Cat: {product.category}</span>
                          <span className={`font-semibold flex items-center gap-1 ${product.lowStock ? "text-red-600" : "text-tertiary"}`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {product.lowStock ? "warning" : "inventory_2"}
                            </span>
                            {product.stockText}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0 border-outline-variant/20">
                      {/* Preços */}
                      <div className="flex flex-col text-right">
                        <div className="flex items-baseline gap-1 justify-end">
                          <span className="font-title-lg text-on-surface font-bold">
                            {priceChannel() === "ifood" ? product.ifoodPrice : product.balcaoPrice}
                          </span>
                          <span className="font-label-sm text-tertiary font-semibold">
                            ({priceChannel() === "ifood" ? "iFood" : "Balcão"})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant font-code-sm justify-end">
                          <span>Balcão: {product.balcaoPrice}</span>
                          <span className="text-primary font-semibold">{product.marginText}</span>
                        </div>
                      </div>

                      {/* Switch Pausar no iFood */}
                      <div className="flex flex-col items-center">
                        <span className="font-label-sm text-on-surface-variant mb-0.5">iFood Loja</span>
                        <input
                          type="checkbox"
                          checked={() => product.activeInIfood}
                          onChange={() => handleToggleProduct(product.id)}
                          className={() =>
                            product.activeInIfood
                              ? "w-9 h-5 bg-primary rounded-full appearance-none cursor-pointer relative shadow-inner"
                              : "w-9 h-5 bg-surface-container-highest rounded-full appearance-none cursor-pointer relative"
                          }
                        />
                      </div>

                      {/* Ações */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSendToChat(product)}
                          title="Enviar no Chat para Cliente Atual"
                          className="p-2 rounded-xl bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface transition-all active:scale-90 border border-outline-variant/20"
                        >
                          <span className="material-symbols-outlined text-[20px]">send_and_archive</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            showToast("Criar Campanha", `Iniciando disparo segmentado para ${product.name}`, "info");
                            router.push(SCREEN_ROUTES["estudio-banners"]);
                          }}
                          title="Criar Campanha de Disparo"
                          className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container-highest text-on-surface transition-all border border-outline-variant/20"
                        >
                          <span className="material-symbols-outlined text-[20px]">campaign</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            }
          </div>

          {/* Paginação */}
          <div className="flex items-center justify-between bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 font-label-md text-on-surface-variant">
            <span>Exibindo {() => products().length} de 148 pratos integrados via Totvs/iFood</span>
            <div className="flex items-center gap-1">
              <button type="button" disabled className="p-1.5 rounded-lg bg-surface-container-low text-on-surface disabled:opacity-40">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button type="button" className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary font-bold">1</button>
              <button type="button" className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface">2</button>
              <button type="button" className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface">3</button>
              <button type="button" className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Coluna Direita: IA Copilot */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 relative overflow-hidden flex flex-col gap-4">
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary-container/10 blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-on-surface font-bold">IA Copilot Vendas</h2>
                  <span className="font-label-sm text-tertiary font-semibold">Otimizador de Cardápio Ativo</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-bold">
                GPT-4o Omni
              </span>
            </div>

            {/* Insight 1 */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-label-sm uppercase tracking-wider text-primary font-bold">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  Alerta de Demanda iFood
                </span>
                <span className="text-tertiary font-label-sm font-semibold">+38% Procura</span>
              </div>
              <p className="font-body-sm text-on-surface leading-relaxed">
                O prato <strong className="text-on-surface font-semibold">Pizza Margherita Especial</strong> atinge pico
                histórico às sextas entre 19h e 22h. Sugestão: programar disparo relâmpago de 12% off no WhatsApp para
                clientes com ticket médio &gt; R$ 70.
              </p>
              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast("Disparo Agendado", "Campanha de 12% OFF programada para sexta-feira às 18:30 via WhatsApp.", "success")}
                  className="w-full py-1.5 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm active:scale-95 text-center font-bold"
                >
                  Agendar Disparo Segmentado
                </button>
              </div>
            </div>

            {/* Insight 2 */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-label-sm uppercase tracking-wider text-tertiary font-bold">
                  <span className="material-symbols-outlined text-[16px]">point_of_sale</span>
                  Sugestão de Combo Inteligente
                </span>
                <span className="text-primary font-code-sm font-bold">Margem 62%</span>
              </div>
              <p className="font-body-sm text-on-surface leading-relaxed">
                Agrupar <strong className="text-on-surface font-semibold">Smash Burger Duplo + Suco de Maracujá 500ml</strong>{" "}
                por <strong>R$ 58,90</strong> no iFood. Isso gera +R$ 14 de margem líquida por pedido sem aumentar carga da chapa.
              </p>
              <button
                type="button"
                onClick={() => showToast("Combo Criado", "Combo Smash Burger + Suco criado no iFood e provisionado no Totvs ERP!", "success")}
                className="w-full py-1.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all text-center flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                Criar Combo no iFood & Totvs
              </button>
            </div>

            {/* Redator Apetitoso */}
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5 relative z-10">
              <span className="inline-flex items-center gap-1 font-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                Redator Apetitoso de Cardápio
              </span>
              <p className="font-body-sm text-on-surface-variant">
                Reescreva ingredientes para elevar taxas de clique no cardápio digital do WhatsApp e Instagram:
              </p>
              <div className="bg-surface-container-lowest p-2.5 rounded-lg text-on-surface font-body-sm italic border-l-2 border-primary-container">
                {() => COPY_VARIATIONS[copyIndex()]}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleNextCopy}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all text-center"
                >
                  Gerar Variação
                </button>
                <button
                  type="button"
                  onClick={() => showToast("Texto Salvo", "Descrição aplicada no item selecionado no iFood!", "success")}
                  className="py-1.5 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all font-bold"
                  title="Aplicar no Produto"
                >
                  Salvar
                </button>
              </div>
            </div>

            {/* Oferta Relâmpago */}
            <div className="bg-gradient-to-br from-primary to-tertiary p-4 rounded-xl text-on-primary flex flex-col gap-2 relative z-10 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-title-md font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  Disparo Relâmpago 1-Click
                </span>
                <span className="bg-on-primary/20 px-2 py-0.5 rounded-full font-label-sm">Omni Send</span>
              </div>
              <p className="font-body-sm text-on-primary/90">
                Dispara card interativo com botão 'Pedir Agora via iFood/Whats' para os últimos 250 clientes que pediram
                nas últimas 4 semanas.
              </p>
              <button
                type="button"
                onClick={() => showToast("Oferta Lançada", "Disparo enviado para a fila de transmissão de 250 clientes.", "success")}
                className="w-full py-2 px-3 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface font-title-md font-bold shadow-sm transition-all text-center"
              >
                Lançar Oferta Relâmpago
              </button>
            </div>
          </div>

          {/* Status de Webhooks */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-title-md text-on-surface font-semibold">Integridade de Rede & APIs</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            </div>
            <div className="space-y-2 mt-1 font-body-sm">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>iFood Polling & Heartbeat</span>
                <span className="text-tertiary font-semibold font-code-sm">18ms / OK</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full w-[99%]"></div>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant pt-1">
                <span>Totvs Protheus Socket</span>
                <span className="text-tertiary font-semibold font-code-sm">42ms / Estável</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary-container h-full w-[98%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}