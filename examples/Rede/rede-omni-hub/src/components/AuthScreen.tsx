import React, { useState } from 'react';
import { LOGO_URL } from '../data/mockData';
import { ScreenType } from '../types';
import { useToast } from '../context/ToastContext';

interface AuthScreenProps {
  onLoginSuccess: (screen?: ScreenType) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const { showToast } = useToast();
  const [role, setRole] = useState<'operator' | 'admin'>('operator');
  const [email, setEmail] = useState('mariana.silva@redehub.com.br');
  const [password, setPassword] = useState('OmniHub2024!@#');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    showToast('Autenticando', 'Validando credenciais na Cloud Engine da Rede...', 'info');

    setTimeout(() => {
      setIsLoading(false);
      showToast(
        'Bem-vinda, Mariana!',
        'Sessão iniciada com sucesso na filial Rede Jardins Paulista.',
        'success'
      );
      onLoginSuccess('chat-omnichannel');
    }, 1000);
  };

  const handleSsoGoogle = () => {
    setIsLoading(true);
    showToast('Google Workspace SSO', 'Conectando ao provedor de identidade corporativo...', 'info');
    setTimeout(() => {
      setIsLoading(false);
      showToast('Autenticado via Google Workspace', 'Sessão iniciada como mariana.silva@redehub.com.br', 'success');
      onLoginSuccess('chat-omnichannel');
    }, 900);
  };

  const handleSsoMeta = () => {
    setIsLoading(true);
    showToast('Meta Business SSO', 'Validando token de parceiro WhatsApp Cloud API...', 'info');
    setTimeout(() => {
      setIsLoading(false);
      showToast('Autenticado via Meta Business', 'Permissões de WhatsApp e Instagram ativas.', 'success');
      onLoginSuccess('chat-omnichannel');
    }, 900);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0f172a] text-[#f8fafc] font-sans">
      
      {/* ========================================================================= */}
      {/* COLUNA ESQUERDA: HERO CORPORATIVO & TELEMETRIA AO VIVO (55% em telas grandes) */}
      {/* ========================================================================= */}
      <section className="lg:w-[55%] relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden glass-panel-left border-r border-slate-800">
        
        {/* Background Grid Pattern & Ambient Glows */}
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"></div>

        {/* Topo do Painel Esquerdo */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="Logo Rede" 
              className="h-10 w-auto object-contain drop-shadow"
            />
            <span className="font-headline-md text-headline-md text-white font-extrabold tracking-tight">
              Rede
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-label-sm text-label-sm font-semibold border border-sky-500/30">
              Omni Hub
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cloud Engine v4.8 Operante
          </div>
        </div>

        {/* Conteúdo Central: Proposta de Valor Corporativa */}
        <div className="relative z-10 my-10 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 font-label-sm text-label-sm font-bold border border-sky-500/20 inline-block mb-3">
            Plataforma Unificada Corporativa
          </span>
          <h2 className="font-headline-xl text-headline-xl text-white font-extrabold tracking-tight leading-tight">
            Orquestrador Inteligente de Atendimento, Cardápios ERP e Delivery.
          </h2>
          <p className="text-slate-300 font-body-md text-body-md mt-4 leading-relaxed">
            Centralize WhatsApp Cloud API, Instagram Direct e Telegram com sincronização bidirecional em tempo real ao Totvs Protheus e vitrines do iFood.
          </p>

          {/* Cards Bento de Telemetria Ao Vivo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <span className="text-[11px] text-slate-400 block">iFood Jardins</span>
              <strong className="text-white font-headline-md text-headline-md block mt-0.5">#8942-SP</strong>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Sincronizado 18ms
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <span className="text-[11px] text-slate-400 block">Taxa de Entrega</span>
              <strong className="text-sky-400 font-headline-md text-headline-md block mt-0.5">98.7%</strong>
              <span className="text-[10px] text-slate-400 mt-1 block">Meta WhatsApp Oficial</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
              <span className="text-[11px] text-slate-400 block">Copilot Omnichannel</span>
              <strong className="text-amber-400 font-headline-md text-headline-md block mt-0.5">1.420</strong>
              <span className="text-[10px] text-slate-400 mt-1 block">msgs/min sob demanda</span>
            </div>
          </div>
        </div>

        {/* Rodapé da Coluna Esquerda */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-6 border-t border-slate-800/80">
          <span>© 2024 Rede Omnichannel Tecnologia S.A.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Criptografia AES-256
            </span>
            <span>Meta Tech Provider</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* COLUNA DIREITA: FORMULÁRIO DE LOGIN CORPORATIVO (45%) */}
      {/* ========================================================================= */}
      <main className="lg:w-[45%] flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-[#0b1120]">
        <div className="w-full max-w-md flex flex-col gap-6">
          
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-sky-400 font-bold">
              Acesso Restrito
            </span>
            <h1 className="font-headline-lg text-headline-lg text-white font-extrabold mt-1">
              Entrar no Hub Operacional
            </h1>
            <p className="text-slate-400 font-body-sm text-body-sm mt-1">
              Informe seu e-mail corporativo ou utilize o provedor de identidade da sua empresa.
            </p>
          </div>

          {/* Seletor de Perfil (Operador vs Administrador) */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-800/80 border border-slate-700">
            <button
              type="button"
              onClick={() => setRole('operator')}
              className={`py-2 rounded-lg font-title-md text-title-md transition-all ${
                role === 'operator'
                  ? 'bg-sky-500 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Operador / Atendente
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-2 rounded-lg font-title-md text-title-md transition-all ${
                role === 'admin'
                  ? 'bg-sky-500 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Administrador / Gestor
            </button>
          </div>

          {/* Botões de SSO Corporativo */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleSsoGoogle}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-title-md text-title-md border border-slate-700 flex items-center justify-center gap-3 transition-colors active:scale-98"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Entrar com Google Workspace</span>
            </button>

            <button
              type="button"
              onClick={handleSsoMeta}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-title-md text-title-md border border-slate-700 flex items-center justify-center gap-3 transition-colors active:scale-98"
            >
              <span className="material-symbols-outlined text-[20px] text-sky-400">all_inclusive</span>
              <span>Continuar com Meta Business ID</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800"></div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              ou credenciais corporativas
            </span>
            <div className="flex-1 h-px bg-slate-800"></div>
          </div>

          {/* Formulário de E-mail e Senha */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-slate-300 font-semibold">
                E-mail Corporativo
              </label>
              <div className="flex items-center bg-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-700 focus-within:border-sky-500 transition-colors">
                <span className="material-symbols-outlined text-slate-400 mr-2.5 text-[20px]">mail</span>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@suaempresa.com.br"
                  className="w-full bg-transparent border-none outline-none font-body-sm text-body-sm text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md text-slate-300 font-semibold">
                  Senha
                </label>
                <button 
                  type="button" 
                  onClick={() => showToast('Recuperação de Senha', 'Link de redefinição enviado para o e-mail cadastrado.', 'info')}
                  className="text-[11px] text-sky-400 hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="flex items-center bg-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-700 focus-within:border-sky-500 transition-colors">
                <span className="material-symbols-outlined text-slate-400 mr-2.5 text-[20px]">lock</span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent border-none outline-none font-body-sm text-body-sm text-white placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 text-body-sm">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-sky-500"
                />
                <span>Lembrar este dispositivo por 30 dias</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-headline-sm text-headline-sm font-bold shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  <span>Iniciando Sessão...</span>
                </>
              ) : (
                <>
                  <span>Acessar Central de Atendimento</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Mini Card de Status Operacional */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 text-[11px] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Todos os sistemas operacionais (99.98% SLA)
            </span>
            <span className="font-mono text-slate-400">Latência: 18ms</span>
          </div>

        </div>
      </main>

    </div>
  );
};
