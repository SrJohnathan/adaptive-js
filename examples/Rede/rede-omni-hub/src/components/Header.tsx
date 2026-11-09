import React from 'react';
import { LOGO_URL, USER_AVATAR } from '../data/mockData';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onOpenSearch }) => {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
      <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('catalogo-erp')}
          className="flex items-center gap-2 sm:gap-3 min-w-[180px] cursor-pointer hover:opacity-95 transition-opacity"
        >
          <img 
            alt="Logo Rede Omnichannel" 
            className="h-8 w-auto object-contain" 
            src={LOGO_URL} 
          />
          <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">Rede</span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            Omni Hub
          </span>
        </div>

        {/* Global Search Bar with Ctrl+K */}
        <div className="flex-1 max-w-xl hidden md:flex items-center">
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between bg-surface-container-low hover:bg-surface-container rounded-xl px-3.5 py-1.5 shadow-inner transition-colors text-left"
          >
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">search</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant/70">
                Pesquisar contatos, protocolos, mensagens...
              </span>
            </div>
            <kbd className="hidden lg:inline-block font-code-sm text-code-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Section: Telemetry, Status & Profile */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Operational Metrics */}
          <div className="hidden xl:flex items-center gap-4 px-3 py-1 rounded-xl bg-surface-container-low border border-outline-variant/20">
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">Campanhas Hoje</span>
              <span className="font-title-md text-title-md text-primary font-bold mt-0.5">14 disparos</span>
            </div>
            <div className="w-px h-6 bg-outline-variant/40"></div>
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">Taxa Entrega</span>
              <span className="font-title-md text-title-md text-tertiary font-bold mt-0.5">98.7%</span>
            </div>
          </div>

          {/* Availability Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-full border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">Disponível</span>
          </div>

          {/* Notification Bell */}
          <button 
            type="button" 
            className="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" 
            title="Notificações da Operação"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface-container-lowest"></span>
          </button>

          {/* User Profile & Dropdown */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 pl-1 p-1 rounded-xl hover:bg-surface-container-low transition-colors"
            >
              <img 
                alt="Mariana Silva" 
                className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" 
                src={USER_AVATAR} 
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="font-title-md text-title-md text-on-surface leading-tight font-semibold">Mariana Silva</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Atendimento Sênior</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant hidden md:inline">
                expand_more
              </span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-in fade-in">
                <div className="px-3 py-2 border-b border-outline-variant/20">
                  <p className="font-title-md text-title-md text-on-surface font-bold">Mariana Silva</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant truncate">mariana.silva@redehub.com.br</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('armazenamento-midias');
                    setUserMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">cloud_sync</span>
                  Armazenamento & Mídias
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('configuracoes-conta');
                    setUserMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">manage_accounts</span>
                  Configurações de Conta
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('estudio-banners');
                    setUserMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary">photo_library</span>
                  Estúdio de Banners & IA
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('autenticacao');
                    setUserMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left font-body-sm text-body-sm text-primary hover:bg-surface-container-high flex items-center gap-2 border-t border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                  Tela de Login Corporativo
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
