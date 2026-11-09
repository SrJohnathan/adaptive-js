/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, ProductItem } from './types';
import { ToastProvider, useToast } from './context/ToastContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CatalogScreen } from './components/CatalogScreen';
import { ChatScreen } from './components/ChatScreen';
import { StudioScreen } from './components/StudioScreen';
import { AccountScreen } from './components/AccountScreen';
import { StorageScreen } from './components/StorageScreen';
import { AuthScreen } from './components/AuthScreen';
import { CommandPaletteModal } from './components/CommandPaletteModal';

function MainApp() {
  const { showToast } = useToast();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('chat-omnichannel');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProductForChat, setSelectedProductForChat] = useState<ProductItem | null>(null);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductForChat = (product: ProductItem) => {
    setSelectedProductForChat(product);
  };

  // Se a tela for de Autenticação, renderizamos em tela cheia com a experiência corporativa
  if (currentScreen === 'autenticacao') {
    return (
      <div className="relative min-h-screen">
        <AuthScreen 
          onLoginSuccess={(screen) => handleNavigate(screen || 'chat-omnichannel')} 
        />
        
        {/* Botão de Retorno Rápido ao Painel Principal */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            type="button"
            onClick={() => handleNavigate('chat-omnichannel')}
            className="px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-sky-400 font-title-md text-title-md border border-slate-700 shadow-xl flex items-center gap-2 backdrop-blur-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Voltar ao Hub Operacional</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
      />

      <div className="flex flex-1 pt-16">
        
        {/* Sidebar Fixa à Esquerda */}
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
        />

        {/* Canvas de Conteúdo Central (com margem esquerda para acomodar a Sidebar de 256px) */}
        <div className="flex-1 md:ml-64 flex flex-col min-h-[calc(100vh-64px)] pb-16 md:pb-6 overflow-x-hidden">
          {currentScreen === 'chat-omnichannel' && (
            <ChatScreen
              onNavigate={handleNavigate}
              selectedProductFromCatalog={selectedProductForChat}
            />
          )}

          {currentScreen === 'catalogo-erp' && (
            <CatalogScreen
              onNavigate={handleNavigate}
              onSelectProductForChat={handleSelectProductForChat}
            />
          )}

          {currentScreen === 'estudio-banners' && (
            <StudioScreen
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'configuracoes-conta' && (
            <AccountScreen
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'armazenamento-midias' && (
            <StorageScreen
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </div>

      {/* Seletor Flutuante de Telas / Quick Switcher (permite alternar entre as telas) */}
      <nav 
        aria-label="Alternar Telas do Aplicativo"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl border border-outline-variant/30 flex items-center gap-1 sm:gap-2 max-w-[95vw] overflow-x-auto scrollbar-none"
      >
        <span className="hidden xl:inline text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/80 pl-1 pr-2">
          Navegação Rápida:
        </span>

        {[
          { id: 'chat-omnichannel', label: 'Chat Omnichannel', icon: 'forum' },
          { id: 'catalogo-erp', label: 'Catálogo & ERP', icon: 'sync_alt' },
          { id: 'estudio-banners', label: 'Estúdio de IA', icon: 'photo_library' },
          { id: 'armazenamento-midias', label: 'Armazenamento', icon: 'cloud_sync' },
          { id: 'configuracoes-conta', label: 'Conta & Sede', icon: 'manage_accounts' },
          { id: 'autenticacao', label: 'Tela de Login', icon: 'lock' },
        ].map((screen) => {
          const isActive = currentScreen === screen.id;
          return (
            <button
              key={screen.id}
              type="button"
              onClick={() => handleNavigate(screen.id as ScreenType)}
              className={`px-3 py-1.5 rounded-xl font-label-md text-label-md flex items-center gap-1.5 transition-all text-nowrap shrink-0 ${
                isActive
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[16px] ${isActive ? 'text-on-primary' : 'text-primary'}`}>
                {screen.icon}
              </span>
              <span>{screen.label}</span>
            </button>
          );
        })}

        <div className="w-px h-5 bg-outline-variant/30 mx-1 hidden sm:block"></div>

        <button
          type="button"
          onClick={() => setIsCommandPaletteOpen(true)}
          className="p-1.5 rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors"
          title="Abrir Busca Rápida (Ctrl+K)"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>
      </nav>

      {/* Modal de Busca Rápida & Comandos */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
