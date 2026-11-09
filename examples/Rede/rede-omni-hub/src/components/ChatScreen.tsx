import React, { useState } from 'react';
import { INITIAL_CONVERSATIONS, INITIAL_PRODUCTS } from '../data/mockData';
import { ConversationItem, ChatMessage, ScreenType, ProductItem } from '../types';
import { useToast } from '../context/ToastContext';

interface ChatScreenProps {
  onNavigate: (screen: ScreenType) => void;
  selectedProductFromCatalog?: ProductItem | null;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate, selectedProductFromCatalog }) => {
  const { showToast } = useToast();
  const [conversations, setConversations] = useState<ConversationItem[]>(INITIAL_CONVERSATIONS);
  const [selectedConvId, setSelectedConvId] = useState<string>('conv-carlos');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'open' | 'mine' | 'queue' | 'resolved'>('mine');
  const [inputText, setInputText] = useState('');
  const [aiTone, setAiTone] = useState<'friendly' | 'formal' | 'promo'>('friendly');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'agent',
      senderName: 'Mariana Silva',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'done_all'
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            lastMessage: text,
            time: newMsg.time,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    setInputText('');
    showToast('Mensagem Enviada', `Enviada com sucesso para ${activeConv.clientName} via WhatsApp Cloud API.`, 'success');
  };

  const handleQuickAiReply = (suggestion: string) => {
    setInputText(suggestion);
    showToast('IA Copilot', 'Sugestão inserida no campo de texto. Você pode editar ou enviar diretamente.');
  };

  const handleAddDessertToOrder = () => {
    showToast(
      'Item Adicionado ao Pedido iFood',
      'Petit Gâteau Belga c/ Gelato (R$ 28,00) adicionado ao pedido #8942 e faturado no Totvs ERP.',
      'success'
    );
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'agent',
      senderName: 'Mariana Silva',
      text: 'Perfeito, Carlos! Já incluí o Petit Gâteau Belga no seu pedido #8942 com sucesso. O motoboy levará quentinho com o gelato bem gelado!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'done_all'
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text }
          : c
      )
    );
  };

  const handleSaveInternalNote = () => {
    if (!internalNoteText.trim()) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? { ...c, notes: `"${internalNoteText}"` }
          : c
      )
    );
    setIsAddingNote(false);
    setInternalNoteText('');
    showToast('Nota Interna Salva', 'A anotação foi registrada com sucesso no perfil do cliente.', 'info');
  };

  const filteredConversations = conversations.filter((c) => {
    if (channelFilter === 'all') return true;
    return c.channel === channelFilter;
  });

  return (
    <div className="flex-1 flex overflow-hidden h-[calc(100vh-64px)] w-full bg-surface">
      
      {/* ========================================================================= */}
      {/* COLUNA 1: CAIXA DE ENTRADA OMNICHANNEL (280px - 340px) */}
      {/* ========================================================================= */}
      <section className="w-80 lg:w-96 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col shrink-0 h-full">
        
        {/* Topo da Inbox */}
        <div className="p-4 border-b border-outline-variant/20 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">Conversas</h1>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm text-code-sm font-semibold">
                38 ativas
              </span>
              <button 
                type="button"
                onClick={() => showToast('Atualizando Inbox', 'Verificando novas mensagens no WhatsApp Cloud API e Instagram...', 'info')}
                className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors" 
                title="Filtrar Mensagens"
              >
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
            </div>
          </div>

          {/* Filtro de Canais em Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-nowrap">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'whatsapp', label: 'WhatsApp', icon: 'chat', count: '21', color: 'text-emerald-700' },
              { id: 'instagram', label: 'Instagram', icon: 'photo_camera', count: '9', color: 'text-pink-600' },
              { id: 'telegram', label: 'Telegram', icon: 'send', count: '5', color: 'text-sky-600' }
            ].map((chan) => {
              const isSelected = channelFilter === chan.id;
              return (
                <button
                  key={chan.id}
                  type="button"
                  onClick={() => setChannelFilter(chan.id)}
                  className={`px-2.5 py-1 rounded-full font-label-md text-label-md transition-colors flex items-center gap-1 shrink-0 ${
                    isSelected
                      ? 'bg-primary text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {chan.icon && (
                    <span className={`material-symbols-outlined text-[15px] ${chan.color}`}>
                      {chan.icon}
                    </span>
                  )}
                  <span>{chan.label}</span>
                  {chan.count && (
                    <span className={`text-[11px] ml-0.5 ${isSelected ? 'text-white/80' : 'text-on-surface-variant/70'}`}>
                      {chan.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Abas de Atendimento (Abertas, Minhas, Fila, Resolvidas) */}
          <div className="flex border-b border-outline-variant/15 text-label-md font-label-md">
            <button 
              type="button" 
              onClick={() => setActiveTab('mine')}
              className={`flex-1 py-1.5 text-center font-bold border-b-2 transition-colors ${
                activeTab === 'mine' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Minhas (12)
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('queue')}
              className={`flex-1 py-1.5 text-center font-medium border-b-2 transition-colors ${
                activeTab === 'queue' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Fila (8)
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('resolved')}
              className={`flex-1 py-1.5 text-center font-medium border-b-2 transition-colors ${
                activeTab === 'resolved' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Resolvidas
            </button>
          </div>

          {/* Campo de Busca Rápida na Inbox */}
          <div className="flex items-center bg-surface-container-low rounded-xl px-3 py-1.5 border border-outline-variant/20 focus-within:ring-1 focus-within:ring-primary">
            <span className="material-symbols-outlined text-on-surface-variant mr-2 text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Buscar por cliente, pedido # ou telefone..." 
              className="w-full bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/70"
            />
            <kbd className="font-code-sm text-code-sm text-on-surface-variant text-[10px] px-1 bg-surface-container-highest rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Lista de Conversas com Scroll */}
        <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/15 scrollbar-thin">
          {filteredConversations.map((conv) => {
            const isSelected = conv.id === activeConv.id;
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-surface-container-high/60 border-l-4 border-primary'
                    : 'hover:bg-surface-container-low'
                }`}
              >
                {/* Avatar com badge do canal */}
                <div className="relative shrink-0">
                  {conv.avatar ? (
                    <img 
                      className="w-11 h-11 rounded-full object-cover ring-1 ring-outline-variant/30" 
                      alt={conv.clientName} 
                      src={conv.avatar} 
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-headline-md text-headline-md">
                      {conv.clientName.charAt(0)}
                    </div>
                  )}
                  <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[11px] shadow-sm border border-surface-container-lowest ${
                    conv.channel === 'whatsapp' ? 'bg-emerald-600 text-white' :
                    conv.channel === 'instagram' ? 'bg-pink-600 text-white' :
                    'bg-sky-600 text-white'
                  }`}>
                    <span className="material-symbols-outlined text-[13px]">
                      {conv.channel === 'whatsapp' ? 'chat' : conv.channel === 'instagram' ? 'photo_camera' : 'send'}
                    </span>
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-title-md text-title-md text-on-surface font-semibold truncate">
                      {conv.clientName}
                    </span>
                    <span className="font-code-sm text-[11px] text-on-surface-variant font-mono">
                      {conv.time}
                    </span>
                  </div>

                  {conv.orderRef && (
                    <div className="flex items-center gap-1 text-[11px] text-primary font-code-sm font-semibold mb-0.5">
                      <span className="material-symbols-outlined text-[12px]">receipt</span>
                      <span>Pedido iFood {conv.orderRef}</span>
                      {conv.vipStatus && (
                        <span className="bg-amber-100 text-amber-800 px-1 py-0.2 rounded text-[9px] font-bold ml-1">
                          {conv.vipStatus}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unreadCount && conv.unreadCount > 0 ? (
                  <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary font-bold text-[11px] flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Rodapé da Inbox com Status da Conexão Meta */}
        <div className="p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Meta WhatsApp Cloud API Ativa
          </span>
          <span className="font-code-sm text-code-sm">SLA Médio: 1.8 min</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* COLUNA 2: ÁREA CENTRAL DE MENSAGENS E ATENDIMENTO (Flex-1) */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col bg-surface-container-low/40 h-full overflow-hidden">
        
        {/* Header da Conversa Ativa */}
        <div className="h-16 px-6 bg-surface-container-lowest border-b border-outline-variant/20 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                className="w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant/30" 
                alt={activeConv.clientName} 
                src={activeConv.avatar} 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {activeConv.clientName}
                </h2>
                {activeConv.vipStatus && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-label-sm text-label-sm font-bold">
                    {activeConv.vipStatus}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                <span>{activeConv.phone}</span>
                <span>•</span>
                <span className="text-primary font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  {activeConv.channelBadgeText}
                </span>
              </div>
            </div>
          </div>

          {/* SLA e Ações Rápidas */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface font-code-sm text-code-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-[16px] text-tertiary">timer</span>
              <span>SLA: <strong className="text-primary">{activeConv.slaTime}</strong></span>
            </div>

            <button 
              type="button" 
              onClick={() => showToast('Transferir Atendimento', 'Escolha o operador ou departamento de destino (Cozinha/Logística).', 'info')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md text-title-md transition-colors border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              <span>Transferir</span>
            </button>

            <button 
              type="button" 
              onClick={() => onNavigate('catalogo-erp')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md text-title-md transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">restaurant_menu</span>
              <span>Cardápio ERP</span>
            </button>

            <button 
              type="button" 
              onClick={() => {
                showToast('Atendimento Concluído', `Conversa com ${activeConv.clientName} finalizada com protocolo registrado no Totvs.`, 'success');
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md transition-all shadow-sm active:scale-95 font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Concluir</span>
            </button>
          </div>
        </div>

        {/* Fluxo de Mensagens com Rolagem */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin">
          
          {/* Tag de Início de Sessão Criptografada */}
          <div className="flex justify-center my-2">
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm border border-outline-variant/15">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Conversa criptografada de ponta a ponta • Protocolo Totvs #99281-2024
            </span>
          </div>

          {activeConv.messages.map((msg) => {
            if (msg.isOrderCard && msg.orderInfo) {
              return (
                <div key={msg.id} className="max-w-md mx-auto bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/30 my-3">
                  <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
                      <span className="font-title-md text-title-md text-on-surface font-bold">
                        {msg.orderInfo.orderNumber}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                      {msg.orderInfo.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 py-1 font-body-sm text-body-sm text-on-surface">
                    {msg.orderInfo.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-code-sm text-code-sm font-semibold">{item.price}</span>
                      </div>
                    ))}
                    {msg.orderInfo.notes && (
                      <div className="text-tertiary font-medium bg-tertiary-fixed/30 px-2 py-1 rounded mt-1 text-[12px]">
                        {msg.orderInfo.notes}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-outline-variant/20 pt-2 mt-2 flex items-center justify-between font-title-md text-title-md">
                    <span className="text-on-surface-variant">Total Faturado</span>
                    <span className="text-primary font-bold">{msg.orderInfo.total}</span>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-[11px] text-on-surface-variant font-code-sm">
                      {msg.orderInfo.eta}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Totvs ERP', 'Abrindo detalhes do pedido fiscal na filial Jardins.', 'info')}
                    className="w-full mt-2 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-title-md text-title-md font-semibold text-center transition-colors"
                  >
                    Ver Pedido Completo no Totvs
                  </button>
                </div>
              );
            }

            if (msg.isDessertCard && msg.dessertInfo) {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-md bg-surface-container-lowest rounded-2xl rounded-tr-sm p-4 shadow-sm border border-outline-variant/20">
                    <div className="flex items-center gap-3">
                      <img 
                        src={msg.dessertInfo.image} 
                        alt={msg.dessertInfo.title}
                        className="w-16 h-16 rounded-xl object-cover ring-1 ring-outline-variant/20 shrink-0"
                      />
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">
                          Sugestão do Chef para Carlos
                        </span>
                        <h4 className="font-title-md text-title-md text-on-surface font-bold">
                          {msg.dessertInfo.title}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {msg.dessertInfo.desc}
                        </p>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold block mt-1">
                          {msg.dessertInfo.price}
                        </span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleAddDessertToOrder}
                      className="w-full mt-3 py-1.5 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md transition-all shadow-sm text-center flex items-center justify-center gap-1 font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Adicionar ao Pedido iFood #8942
                    </button>
                  </div>
                </div>
              );
            }

            const isAgent = msg.sender === 'agent';
            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-lg rounded-2xl p-3.5 shadow-sm text-body-md ${
                  isAgent 
                    ? 'bg-primary text-on-primary rounded-tr-none' 
                    : 'bg-surface-container-lowest text-on-surface rounded-tl-none border border-outline-variant/20'
                }`}>
                  {isAgent && (
                    <span className="text-[11px] text-white/80 font-bold block mb-0.5">
                      {msg.senderName}
                    </span>
                  )}
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-1 font-code-sm px-1">
                  <span>{msg.time}</span>
                  {isAgent && (
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      {msg.status || 'done_all'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Barra de Sugestão Ativa da IA (Rede Assist Copilot) */}
        <div className="px-4 sm:px-6 py-2 bg-surface-container border-t border-outline-variant/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-primary text-[18px] shrink-0">auto_awesome</span>
            <span className="font-body-sm text-body-sm text-on-surface truncate">
              <strong>Sugestão Rede Assist:</strong> "Carlos, seu pedido #8942 já está sendo embalado pela cozinha. O motoboy parceiro do iFood sai em 8 minutos!"
            </span>
          </div>
          <button 
            type="button" 
            onClick={() => handleQuickAiReply('Carlos, seu pedido #8942 já está sendo embalado pela cozinha. O motoboy parceiro do iFood sai em 8 minutos!')}
            className="px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold transition-colors shrink-0 shadow-sm"
          >
            Inserir (Tab)
          </button>
        </div>

        {/* Área de Composição e Envio */}
        <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/20 flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => showToast('Anexar Arquivo', 'Selecione imagem, PDF fiscal ou comprovante.', 'info')}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors" 
              title="Anexar Arquivo ou Foto"
            >
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickAiReply('🍕 Segue o link com nosso cardápio completo atualizado e promoções do dia: https://cardapio.redehub.com.br')}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors" 
              title="Cardápio Digital Rápido"
            >
              <span className="material-symbols-outlined text-[20px]">restaurant</span>
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickAiReply('A chave Pix para pagamento direto com 5% de desconto é: financeiro@redehub.com.br')}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors" 
              title="Chave Pix"
            >
              <span className="material-symbols-outlined text-[20px]">pix</span>
            </button>

            {/* Input Principal de Texto */}
            <div className="flex-1 flex items-center bg-surface-container-low rounded-xl px-4 py-2 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Digite sua mensagem para Carlos... (Enter para enviar)" 
                className="w-full bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70"
              />
              <button 
                type="button" 
                onClick={() => handleQuickAiReply('Temos sim! Nossos doces e sobremesas finas estão saindo com desconto especial hoje.')}
                className="text-on-surface-variant hover:text-primary transition-colors p-1" 
                title="Melhorar com IA"
              >
                <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
              </button>
            </div>

            {/* Gravar Áudio ou Enviar */}
            <button 
              type="button" 
              onClick={() => showToast('Gravação de Áudio', 'Microfone ativado para mensagem de voz de alta fidelidade.', 'info')}
              className="p-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors" 
              title="Gravar Áudio"
            >
              <span className="material-symbols-outlined text-[22px]">mic</span>
            </button>
            <button 
              type="button" 
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm active:scale-95 flex items-center justify-center" 
              title="Enviar Mensagem"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>

          {/* Atalhos Rápidos no Rodapé do Chat */}
          <div className="flex items-center gap-2 overflow-x-auto text-nowrap scrollbar-none pt-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">Atalhos:</span>
            <button 
              type="button" 
              onClick={() => handleQuickAiReply('Carlos, a previsão estimada do iFood é de 35 a 45 minutos no endereço da Av. Paulista!')}
              className="px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm border border-outline-variant/15 transition-colors"
            >
              /previsao (Previsão de Entrega)
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickAiReply('Você gostaria de adicionar refrigerante ou suco artesanal de maracujá 500ml ao seu pedido?')}
              className="px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm border border-outline-variant/15 transition-colors"
            >
              /bebidas (Ofertar Bebidas)
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickAiReply('Obrigado pela preferência! Caso precise de algo a mais, é só chamar por aqui.')}
              className="px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm border border-outline-variant/15 transition-colors"
            >
              /agradecer (Finalizar Cortesia)
            </button>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* COLUNA 3: PAINEL LATERAL 360° DO CLIENTE & COPILOT IA (340px) */}
      {/* ========================================================================= */}
      <aside className="w-80 xl:w-96 bg-surface-container-lowest border-l border-outline-variant/20 flex flex-col shrink-0 h-full overflow-y-auto p-4 space-y-4 scrollbar-thin">
        
        {/* Cartão de Perfil do Cliente */}
        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img 
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20" 
              alt={activeConv.clientName} 
              src={activeConv.avatar} 
            />
            <div className="min-w-0">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">
                {activeConv.clientName}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="px-2 py-0.2 rounded bg-amber-100 text-amber-800 font-label-sm text-label-sm font-bold">
                  {activeConv.vipStatus || 'Cliente Frequente'}
                </span>
                <span className="font-code-sm text-[11px] text-on-surface-variant font-mono">
                  {activeConv.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Dados Financeiros / Totvs ERP */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant/20 text-center">
            <div className="bg-surface-container-lowest p-2 rounded-lg">
              <span className="text-[11px] text-on-surface-variant block">Gasto Mês</span>
              <span className="font-title-md text-title-md text-primary font-bold">
                {activeConv.totalSpentMonth}
              </span>
            </div>
            <div className="bg-surface-container-lowest p-2 rounded-lg">
              <span className="text-[11px] text-on-surface-variant block">Pedidos</span>
              <span className="font-title-md text-title-md text-on-surface font-bold">
                {activeConv.completedOrdersCount} concl.
              </span>
            </div>
            <div className="bg-surface-container-lowest p-2 rounded-lg">
              <span className="text-[11px] text-on-surface-variant block">Ticket Médio</span>
              <span className="font-title-md text-title-md text-tertiary font-bold">
                {activeConv.avgTicket}
              </span>
            </div>
          </div>

          <div className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
            <span className="truncate">{activeConv.address}</span>
          </div>
        </div>

        {/* Rede Assist Copilot & Análise de Sentimento */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
              </div>
              <span className="font-title-md text-title-md text-on-surface font-bold">
                Rede Assist Copilot
              </span>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {activeConv.sentimentPercent}% Positivo
            </span>
          </div>

          {/* Sugestões de Respostas em 1-Click */}
          <div className="space-y-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
              Respostas Prontas (1-Click)
            </span>

            <button 
              type="button" 
              onClick={() => handleQuickAiReply('Carlos, seu pedido #8942 já está em preparo na filial Jardins! Previsão de entrega entre 35 e 45 minutos no seu endereço.')}
              className="w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-body-sm text-on-surface flex items-start gap-2 group"
            >
              <span className="material-symbols-outlined text-[16px] text-primary group-hover:scale-110 transition-transform">
                send
              </span>
              <span>Previsão de Entrega Totvs</span>
            </button>

            <button 
              type="button" 
              onClick={() => handleQuickAiReply('Como você é nosso cliente VIP Ouro, caso queira a sobremesa Petit Gâteau hoje, envio com 20% de cortesia!')}
              className="w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-body-sm text-on-surface flex items-start gap-2 group"
            >
              <span className="material-symbols-outlined text-[16px] text-tertiary group-hover:scale-110 transition-transform">
                redeem
              </span>
              <span>Oferecer Cortesia Sobremesa</span>
            </button>

            <button 
              type="button" 
              onClick={() => handleQuickAiReply('Segue a chave Pix direta da loja com confirmação instantânea no seu pedido: 11.234.567/0001-89')}
              className="w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-body-sm text-on-surface flex items-start gap-2 group"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary group-hover:scale-110 transition-transform">
                qr_code_2
              </span>
              <span>Enviar Link Pix Direto</span>
            </button>
          </div>

          {/* Modulador de Tom da Resposta */}
          <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Tom da IA:</span>
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
              {(['friendly', 'formal', 'promo'] as const).map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => {
                    setAiTone(tone);
                    showToast('Tom da IA', `Tom ajustado para ${tone === 'friendly' ? 'Amigável' : tone === 'formal' ? 'Formal' : 'Promocional'}.`);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize ${
                    aiTone === tone 
                      ? 'bg-surface-container-lowest text-primary shadow-sm' 
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tone === 'friendly' ? 'Amigável' : tone === 'formal' ? 'Formal' : 'Promo'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pratos Favoritos do Cliente (Integrados ao ERP) */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-title-md text-on-surface font-bold">
              Pratos Mais Pedidos (ERP)
            </span>
            <span className="font-code-sm text-[11px] text-tertiary font-bold">Histórico</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low font-body-sm text-body-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍕</span>
                <div>
                  <span className="font-semibold text-on-surface block">Pizza Margherita Especial</span>
                  <span className="text-[11px] text-on-surface-variant">Pediu 4x este mês</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => handleQuickAiReply('Que tal repetir a sua favorita Pizza Margherita Especial hoje?')}
                className="p-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary transition-colors"
                title="Ofertar Prato"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low font-body-sm text-body-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍫</span>
                <div>
                  <span className="font-semibold text-on-surface block">Petit Gâteau Belga</span>
                  <span className="text-[11px] text-on-surface-variant">Pediu 2x este mês</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => handleQuickAiReply('Separamos um Petit Gâteau Belga quentinho para acompanhar seu almoço!')}
                className="p-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary transition-colors"
                title="Ofertar Prato"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notas Internas da Equipe */}
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-title-md text-on-surface font-bold">
              Notas Internas da Equipe
            </span>
            <button 
              type="button" 
              onClick={() => setIsAddingNote(!isAddingNote)}
              className="text-primary hover:underline font-label-sm text-label-sm font-bold"
            >
              {isAddingNote ? 'Cancelar' : '+ Nova Nota'}
            </button>
          </div>

          {isAddingNote ? (
            <div className="flex flex-col gap-2 pt-1">
              <textarea
                value={internalNoteText}
                onChange={(e) => setInternalNoteText(e.target.value)}
                placeholder="Escreva uma instrução para a equipe de atendimento e cozinha..."
                rows={3}
                className="w-full p-2 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleSaveInternalNote}
                className="w-full py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md font-bold transition-colors"
              >
                Salvar Anotação
              </button>
            </div>
          ) : (
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 border-l-2 border-amber-500 text-body-sm font-body-sm">
              {activeConv.notes}
            </div>
          )}
        </div>

      </aside>
    </div>
  );
};
