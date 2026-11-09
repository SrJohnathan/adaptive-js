import React, { useState } from 'react';
import { INITIAL_BANNERS, STUDIO_VARIATIONS, MAIN_BURGER_STUDIO_IMG } from '../data/mockData';
import { BannerItem, ScreenType } from '../types';
import { useToast } from '../context/ToastContext';

interface StudioScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const StudioScreen: React.FC<StudioScreenProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [promptText, setPromptText] = useState(
    'Smash burger duplo suculento com queijo cheddar inglês derretido escorrendo, fatias de bacon crocante artesanal, iluminação cinematográfica de estúdio, vapor saindo do pão brioche selado, estilo gourmet food photography 8k.'
  );
  const [selectedFormat, setSelectedFormat] = useState<'9:16' | '1:1' | '16:9' | '16:10'>('1:1');
  const [selectedStyle, setSelectedStyle] = useState('Fotografia Comercial 4K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCanvasImage, setCurrentCanvasImage] = useState(MAIN_BURGER_STUDIO_IMG);
  const [currentTitle, setCurrentTitle] = useState('QUARTA DO SMASH');
  const [currentBadge, setCurrentBadge] = useState('30% OFF');
  const [activeTabBanner, setActiveTabBanner] = useState<'all' | 'whatsapp' | 'instagram' | 'ifood' | 'web'>('all');
  
  // Overlays flags
  const [showDiscountTag, setShowDiscountTag] = useState(true);
  const [showStoreLogo, setShowStoreLogo] = useState(true);
  const [showTimeBadge, setShowTimeBadge] = useState(true);
  const [showErpPrice, setShowErpPrice] = useState(true);

  const promptSuggestions = [
    { label: 'Burger Quarta 30% OFF', text: 'Smash burger artesanal duplo com cheddar derretido e batatas rústicas douradas, iluminação quente de restaurante gourmet.' },
    { label: 'Combo Sushi Família', text: 'Barca de sushi contemporâneo com salmão maçaricado, raspas de limão siciliano e tarê artesanal, fundo escuro elegante.' },
    { label: 'Black Friday Frete Grátis', text: 'Pizza artesanal saindo do forno a lenha com queijo puxando, banner promocional de Black Friday de alta energia.' },
    { label: 'Almoço Executivo + Bebida', text: 'Prato executivo suculento com picanha grelhada, arroz soltinho, feijão tropeiro e salada fresca com suco de laranja.' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    showToast('Gerando Imagem com IA', 'Renderizando composição cinematográfica via Imagen 3.0 Pro...', 'info');

    setTimeout(() => {
      setIsGenerating(false);
      showToast('Arte Criada com Sucesso!', 'Sua imagem com iluminação de estúdio está pronta para uso e disparo.', 'success');
    }, 1800);
  };

  const handleApplyPresetPrompt = (text: string, title: string, badge: string) => {
    setPromptText(text);
    setCurrentTitle(title.toUpperCase());
    setCurrentBadge(badge);
    showToast('Prompt Aplicado', 'Configurações de cena e selo atualizadas.');
  };

  const handleSelectVariation = (varItem: typeof STUDIO_VARIATIONS[0]) => {
    setCurrentCanvasImage(varItem.image);
    setCurrentTitle(varItem.title.toUpperCase());
    setCurrentBadge(varItem.badgeText);
    showToast('Variação Ativa', `Canvas atualizado para ${varItem.title} (${varItem.formatTag}).`);
  };

  const filteredBanners = INITIAL_BANNERS.filter((b) => {
    if (activeTabBanner === 'all') return true;
    return b.channel === activeTabBanner;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1680px] mx-auto">
      
      {/* Top Header */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Estúdio de Criação de Imagens com IA
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
              Imagen 3.0 Pro & Stable Food v2
            </span>
          </div>
          <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
            Gere criativos promocionais gastronômicos com iluminação profissional, formatos automáticos para Stories, Feed e WhatsApp,
            e selos integrados aos preços oficiais do Totvs ERP e iFood.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => onNavigate('catalogo-erp')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md text-title-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
            <span>Ver Catálogo ERP</span>
          </button>
          <button 
            type="button" 
            onClick={() => onNavigate('chat-omnichannel')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md transition-all shadow-sm font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            <span>Disparar no WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Grid Principal: Formulário Criativo & Canvas Live */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Painel Esquerdo: Configuração do Prompt & Estilos (5 cols) */}
        <div className="xl:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">auto_awesome</span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Prompt Criativo</h2>
            </div>
            <button 
              type="button" 
              onClick={() => {
                setPromptText((prev) => prev + ' Iluminação volumétrica quente, gotas de condensação fresca, foco macro nítido e apetitoso.');
                showToast('Prompt Enriquecido com IA', 'Adicionados modificadores visuais gastronômicos.');
              }}
              className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md font-semibold flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">magic_button</span>
              Aprimorar com IA
            </button>
          </div>

          {/* Área de Texto do Prompt */}
          <div className="flex flex-col gap-1.5">
            <textarea 
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={4} 
              className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/25 font-body-sm text-body-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
              placeholder="Descreva o prato, iluminação, ambiente e estilo da foto..."
            />
          </div>

          {/* Sugestões Rápidas de Campanhas Gastronômicas */}
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
              Sugestões Prontas de Alta Conversão:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {promptSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPresetPrompt(item.text, item.label.split(' ')[0] + ' FESTIVAL', '30% OFF')}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md border border-outline-variant/20 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Formato e Canal Alvo */}
          <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/15">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
              Formato & Canal Alvo:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: '9:16', label: '9:16 Stories', sub: 'Instagram / Whats' },
                { id: '1:1', label: '1:1 Feed', sub: 'Feed Instagram' },
                { id: '16:9', label: '16:9 Banner', sub: 'Campanhas Web' },
                { id: '16:10', label: '16:10 Vitrine', sub: 'iFood & Totvs' }
              ].map((fmt) => {
                const isSelected = selectedFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => {
                      setSelectedFormat(fmt.id as any);
                      showToast('Formato Alterado', `Canvas ajustado para ${fmt.label}.`);
                    }}
                    className={`p-2 rounded-xl text-center transition-all border ${
                      isSelected
                        ? 'bg-primary text-on-primary border-primary shadow-sm font-bold'
                        : 'bg-surface-container-low border-outline-variant/20 text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="font-title-md text-title-md block">{fmt.label}</span>
                    <span className={`text-[10px] block ${isSelected ? 'text-white/80' : 'text-on-surface-variant'}`}>
                      {fmt.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Predefinições de Estilo Visual */}
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
              Estilo Visual & Iluminação:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Fotografia Comercial 4K',
                'Iluminação Quente de Restaurante',
                'Estilo Dark & Neon',
                'Fundo Neutro Minimalista'
              ].map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => {
                    setSelectedStyle(style);
                    showToast('Estilo Selecionado', style);
                  }}
                  className={`px-3 py-2 rounded-xl text-left font-body-sm text-body-sm transition-all border ${
                    selectedStyle === style
                      ? 'bg-surface-container-high border-primary text-primary font-bold'
                      : 'bg-surface-container-low border-outline-variant/20 text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Selos Promocionais & Informações Sobrepostas */}
          <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/15">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
              Selos & Overlays no Banner:
            </span>
            <div className="grid grid-cols-2 gap-2 font-body-sm text-body-sm">
              <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15">
                <input 
                  type="checkbox" 
                  checked={showDiscountTag}
                  onChange={(e) => setShowDiscountTag(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>Selo Desconto ({currentBadge})</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15">
                <input 
                  type="checkbox" 
                  checked={showStoreLogo}
                  onChange={(e) => setShowStoreLogo(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>Logotipo da Loja</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15">
                <input 
                  type="checkbox" 
                  checked={showTimeBadge}
                  onChange={(e) => setShowTimeBadge(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>Badge Tempo Limitado</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low p-2 rounded-lg border border-outline-variant/15">
                <input 
                  type="checkbox" 
                  checked={showErpPrice}
                  onChange={(e) => setShowErpPrice(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>Preço Oficial ERP</span>
              </label>
            </div>
          </div>

          {/* Botão Principal de Geração */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] text-on-surface-variant mb-2">
              <span>Créditos de IA: <strong>142 / 200 restantes</strong> este mês</span>
              <span className="text-tertiary font-semibold">Consumo: 1 crédito</span>
            </div>
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerate}
              className="w-full py-3 px-4 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-headline-sm font-bold shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[24px] ${isGenerating ? 'animate-spin' : ''}`}>
                {isGenerating ? 'progress_activity' : 'auto_awesome'}
              </span>
              <span>{isGenerating ? 'Renderizando Imagem com IA...' : 'Gerar Imagem com IA (1 Crédito)'}</span>
            </button>
          </div>

        </div>

        {/* Painel Direito: Canvas Live Viewer & Ações (7 cols) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          
          {/* Card do Canvas Interativo */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">
                  Visualização do Canvas
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm text-code-sm font-bold">
                  Formato {selectedFormat} • 2048 x 2048px
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => showToast('Download 4K Iniciado', 'Arquivo PNG de alta resolução gerado para download.', 'success')}
                  className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md text-title-md flex items-center gap-1.5 transition-colors border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Baixar 4K</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    showToast('Disparo Programado', 'Arte direcionada para fila de envio de 1.420 contatos no WhatsApp.', 'success');
                    onNavigate('chat-omnichannel');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md flex items-center gap-1.5 transition-all shadow-sm font-bold"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Disparo WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Stage do Banner Gastronômico com Selos Dinâmicos */}
            <div className="relative w-full aspect-square max-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 bg-slate-900 flex items-center justify-center group">
              <img 
                src={currentCanvasImage} 
                alt="Criativo Gerado por IA" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Vinheta de Sombra para Legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none"></div>

              {/* Overlay Topo: Marca e Badge de Desconto */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                {showStoreLogo && (
                  <div className="glass-badge px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-headline-md text-headline-md text-white font-bold tracking-wider">
                      REDE OMNI
                    </span>
                  </div>
                )}

                {showDiscountTag && (
                  <div className="bg-red-600 text-white font-headline-md text-headline-md font-extrabold px-4 py-1.5 rounded-xl shadow-xl transform rotate-2 animate-bounce">
                    {currentBadge}
                  </div>
                )}
              </div>

              {/* Overlay Centro/Inferior: Título da Campanha e Preço */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-2">
                {showTimeBadge && (
                  <span className="inline-flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-label-sm text-label-sm font-extrabold uppercase tracking-wide">
                    <span className="material-symbols-outlined text-[14px]">timer</span>
                    Válido Somente Hoje Até 23h59
                  </span>
                )}

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-headline-xl text-headline-xl text-white font-extrabold tracking-tight drop-shadow-md">
                      {currentTitle}
                    </h3>
                    <p className="text-white/90 font-body-md text-body-md drop-shadow">
                      Smash duplo no brioche selado com cheddar e fritas crocantes
                    </p>
                  </div>

                  {showErpPrice && (
                    <div className="text-right shrink-0">
                      <span className="text-white/75 text-xs line-through block">De R$ 49,90</span>
                      <span className="font-headline-xl text-headline-xl text-amber-400 font-extrabold">
                        R$ 34,90
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Barra de Ações Rápidas do Criativo */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 font-title-md text-title-md">
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => showToast('Recortar Fundo', 'Remoção de fundo com IA concluída. PNG com canal alfa disponível.', 'info')}
                  className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-1.5 transition-colors border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                  <span>Recortar Fundo (PNG)</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    showToast('Vínculo Criado', 'Imagem associada ao produto Combo Smash Burger no iFood e Totvs!', 'success');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface flex items-center gap-1.5 transition-colors border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[18px]">link</span>
                  <span>Vincular ao Totvs & iFood</span>
                </button>
              </div>

              <button 
                type="button" 
                onClick={handleGenerate}
                className="px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                <span>Gerar Outra Variação</span>
              </button>
            </div>
          </div>

          {/* Variações Geradas Anteriores */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-title-md text-title-md text-on-surface font-bold">
                Variações Alternativas Geradas
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Clique para visualizar no Canvas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STUDIO_VARIATIONS.map((varItem) => (
                <div
                  key={varItem.id}
                  onClick={() => handleSelectVariation(varItem)}
                  className="group relative rounded-xl overflow-hidden border border-outline-variant/30 cursor-pointer hover:shadow-md transition-all aspect-video sm:aspect-square"
                >
                  <img 
                    src={varItem.image} 
                    alt={varItem.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-2.5 flex flex-col justify-between">
                    <span className="px-2 py-0.5 rounded bg-black/60 text-white font-code-sm text-[10px] w-fit">
                      {varItem.formatTag}
                    </span>
                    <div>
                      <span className="font-title-md text-title-md text-white font-bold block leading-tight">
                        {varItem.title}
                      </span>
                      <span className="text-[11px] text-white/80">
                        {varItem.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Galeria de Banners Promocionais Ativos & Desempenho */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Banners Ativos em Campanhas & Performance
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Acompanhe cliques, disparos no WhatsApp e conversão em tempo real vinculados aos pedidos do Totvs e iFood.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'whatsapp', label: 'WhatsApp' },
              { id: 'instagram', label: 'Instagram' },
              { id: 'ifood', label: 'iFood' },
              { id: 'web', label: 'Web' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabBanner(tab.id as any)}
                className={`px-3 py-1 rounded-lg font-label-md text-label-md transition-colors ${
                  activeTabBanner === tab.id
                    ? 'bg-primary text-on-primary font-bold'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBanners.map((banner) => (
            <div 
              key={banner.id}
              className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-code-sm text-[10px]">
                  {banner.code}
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-600 text-white font-label-sm text-[10px] font-bold">
                  {banner.statusBadge}
                </span>
              </div>

              <div className="p-3.5 flex flex-col gap-2">
                <div>
                  <h4 className="font-title-lg text-title-lg text-on-surface font-bold leading-snug">
                    {banner.title}
                  </h4>
                  <span className="font-body-sm text-[12px] text-on-surface-variant block">
                    {banner.campaignType}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20 font-body-sm text-body-sm">
                  <div>
                    <span className="text-[11px] text-on-surface-variant block">{banner.metric1Label}</span>
                    <strong className="text-on-surface font-bold">{banner.metric1Value}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-on-surface-variant block">{banner.metric2Label}</span>
                    <strong className="text-primary font-bold">{banner.metric2Value}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    showToast('Campanha Selecionada', `Reenviando arte de ${banner.title} no WhatsApp!`, 'info');
                    onNavigate('chat-omnichannel');
                  }}
                  className="w-full mt-1 py-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary font-title-md text-title-md font-semibold transition-all text-center"
                >
                  Usar nesta Conversa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
