import React, { useState, useEffect } from 'react';
import { ScreenType } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CONVERSATIONS } from '../data/mockData';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredScreens = [
    { id: 'chat-omnichannel', title: 'Chat Omnichannel', desc: 'Atendimento WhatsApp, Instagram e Telegram', icon: 'forum' },
    { id: 'catalogo-erp', title: 'Catálogo de Produtos & ERP', desc: 'Sincronizador iFood e Totvs Protheus', icon: 'sync_alt' },
    { id: 'estudio-banners', title: 'Estúdio de Criação com IA', desc: 'Criador de banners gastronômicos 4K', icon: 'photo_library' },
    { id: 'armazenamento-midias', title: 'Armazenamento & Gestão de Mídias', desc: 'Monitoramento de disco, limpeza de cache e expansão', icon: 'cloud_sync' },
    { id: 'configuracoes-conta', title: 'Configurações de Conta', desc: 'Endereço fiscal, plano e faturamento', icon: 'manage_accounts' },
    { id: 'autenticacao', title: 'Login Corporativo', desc: 'Trocar operador ou acessar como administrador', icon: 'lock' },
  ].filter((s) => s.title.toLowerCase().includes(query.toLowerCase()) || s.desc.toLowerCase().includes(query.toLowerCase()));

  const filteredProducts = INITIAL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredClients = INITIAL_CONVERSATIONS.filter((c) =>
    c.clientName.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in">
      <div 
        className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-outline-variant/20 bg-surface-container-low">
          <span className="material-symbols-outlined text-on-surface-variant text-[22px] mr-3">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite para buscar telas, clientes, pratos do cardápio ou ações..."
            className="w-full bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70"
          />
          <kbd className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-code-sm text-[11px]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 scrollbar-thin">
          
          {/* Módulos do Sistema */}
          <div>
            <span className="px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
              Módulos e Telas
            </span>
            <div className="space-y-1">
              {filteredScreens.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as ScreenType);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    </div>
                    <div>
                      <span className="font-title-md text-title-md text-on-surface font-semibold block">
                        {item.title}
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px]">arrow_forward</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clientes Encontrados */}
          {filteredClients.length > 0 && (
            <div>
              <span className="px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
                Clientes & Conversas
              </span>
              <div className="space-y-1">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => {
                      onNavigate('chat-omnichannel');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={client.avatar} alt={client.clientName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="font-title-md text-title-md text-on-surface font-semibold block">
                          {client.clientName}
                        </span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant">
                          {client.phone} • {client.channelBadgeText}
                        </span>
                      </div>
                    </div>
                    <span className="font-code-sm text-[11px] text-primary font-bold">Abrir Chat</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pratos do Cardápio ERP */}
          {filteredProducts.length > 0 && (
            <div>
              <span className="px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
                Cardápio & Estoque ERP
              </span>
              <div className="space-y-1">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onNavigate('catalogo-erp');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <span className="font-title-md text-title-md text-on-surface font-semibold block">
                          {prod.name}
                        </span>
                        <span className="font-body-sm text-[11px] text-on-surface-variant">
                          SKU {prod.sku} • {prod.category}
                        </span>
                      </div>
                    </div>
                    <span className="font-title-md text-title-md font-bold text-primary">
                      {prod.ifoodPrice}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">
          <span>Use <strong>Tab</strong> ou as <strong>Setas</strong> para navegar</span>
          <span>Pressione <strong>ESC</strong> para fechar</span>
        </div>
      </div>
    </div>
  );
};
