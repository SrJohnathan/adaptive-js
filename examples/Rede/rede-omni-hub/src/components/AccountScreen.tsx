import React, { useState } from 'react';
import { USER_AVATAR, MAP_IMAGE_URL } from '../data/mockData';
import { ScreenType } from '../types';
import { useToast } from '../context/ToastContext';

interface AccountScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'address' | 'billing' | 'security' | 'danger'>('profile');

  // Profile Form State
  const [fullName, setFullName] = useState('Mariana Silva');
  const [jobTitle, setJobTitle] = useState('Atendimento & Operações Sênior');
  const [email, setEmail] = useState('mariana.silva@redehub.com.br');
  const [phone2fa, setPhone2fa] = useState('+55 (11) 98821-4432');
  const [timezone, setTimezone] = useState('America/Sao_Paulo (GMT-3)');
  const [language, setLanguage] = useState('Português (Brasil)');

  // Address Form State
  const [cnpj, setCnpj] = useState('42.189.330/0001-44');
  const [razaoSocial, setRazaoSocial] = useState('REDE OMNICHANNEL TECNOLOGIA EM ALIMENTOS LTDA');
  const [cep, setCep] = useState('01419-001');
  const [street, setStreet] = useState('Alameda Santos');
  const [number, setNumber] = useState('1827');
  const [complement, setComplement] = useState('12º Andar - Conjunto 1204');
  const [neighborhood, setNeighborhood] = useState('Cerqueira César');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');

  // Danger Zone Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Perfil Atualizado', 'As informações pessoais e de contato foram salvas.', 'success');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Endereço Salvo', 'Dados fiscais e endereço da sede atualizados com sucesso.', 'success');
  };

  const handleLookupCep = () => {
    showToast('Buscando CEP', 'Consultando base dos Correios e Receita Federal...', 'info');
    setTimeout(() => {
      setStreet('Alameda Santos');
      setNeighborhood('Cerqueira César');
      setCity('São Paulo');
      setState('SP');
      showToast('CEP Localizado', 'Alameda Santos, Cerqueira César - São Paulo/SP.');
    }, 600);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmationText.trim() === 'EXCLUIR CONTA REDE') {
      setShowDeleteModal(false);
      showToast('Conta Encerrada', 'Solicitação de exclusão processada com sucesso.', 'warning');
      onNavigate('autenticacao');
    } else {
      showToast('Erro de Validação', 'Digite exatamente "EXCLUIR CONTA REDE" para confirmar.', 'error');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto">
      
      {/* Workspace Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary shadow-md">
            <span className="material-symbols-outlined text-[32px]">domain</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                Rede Jardins Paulista
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold">
                Enterprise Ativo
              </span>
            </div>
            <p className="text-on-surface-variant font-body-sm text-body-sm mt-0.5">
              Workspace ID #8921 • 12 Operadores Ativos • Totvs Protheus & iFood Conectados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => onNavigate('catalogo-erp')}
            className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md text-title-md transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">sync_alt</span>
            <span>Ver Integrações ERP</span>
          </button>
          <button 
            type="button" 
            onClick={() => onNavigate('autenticacao')}
            className="px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-title-md text-title-md transition-all flex items-center gap-1.5 border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Trocar Usuário</span>
          </button>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="flex border-b border-outline-variant/20 overflow-x-auto text-nowrap scrollbar-none gap-2">
        {[
          { id: 'profile', label: 'Dados do Perfil & Contato', icon: 'person' },
          { id: 'address', label: 'Endereço & Sede Fiscal', icon: 'location_on' },
          { id: 'billing', label: 'Planos & Faturamento', icon: 'credit_card' },
          { id: 'security', label: 'Segurança & Sessões', icon: 'shield' },
          { id: 'danger', label: 'Zona Crítica', icon: 'warning', isDanger: true }
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 flex items-center gap-2 font-title-md text-title-md border-b-2 transition-all ${
                isSelected
                  ? tab.isDanger 
                    ? 'border-error text-error font-bold' 
                    : 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${
                isSelected ? (tab.isDanger ? 'text-error' : 'text-primary') : 'text-on-surface-variant'
              }`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: DADOS DO PERFIL & CONTATO */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Card do Avatar & Resumo */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col items-center text-center gap-3">
            <div className="relative group cursor-pointer">
              <img 
                src={USER_AVATAR} 
                alt="Mariana Silva" 
                className="w-28 h-28 rounded-full object-cover ring-4 ring-primary/20 shadow-md"
              />
              <div 
                onClick={() => showToast('Foto de Perfil', 'Selecione uma imagem JPG ou PNG de até 5MB.', 'info')}
                className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="material-symbols-outlined text-[24px]">photo_camera</span>
              </div>
            </div>

            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Mariana Silva</h3>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Atendimento & Operações Sênior</span>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-tertiary font-semibold">Conta Verificada Meta</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Alterar Foto', 'Upload de imagem concluído com sucesso!')}
              className="w-full mt-2 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md text-title-md transition-colors border border-outline-variant/20"
            >
              Alterar Foto de Perfil
            </button>
          </div>

          {/* Formulário com Campos de Edição */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Informações do Operador
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Nome Completo</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Cargo na Operação</label>
                <input 
                  type="text" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">E-mail Corporativo</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">WhatsApp de Segurança 2FA</label>
                <input 
                  type="text" 
                  value={phone2fa}
                  onChange={(e) => setPhone2fa(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Fuso Horário</label>
                <select 
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="America/Sao_Paulo (GMT-3)">America/Sao_Paulo (GMT-3)</option>
                  <option value="America/Manaus (GMT-4)">America/Manaus (GMT-4)</option>
                  <option value="America/Belem (GMT-3)">America/Belem (GMT-3)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Idioma da Interface</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Português (Brasil)">Português (Brasil)</option>
                  <option value="English (US)">English (US)</option>
                  <option value="Español">Español</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md font-bold transition-all shadow-sm active:scale-95"
              >
                Salvar Alterações
              </button>
            </div>
          </div>

        </form>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: ENDEREÇO & SEDE FISCAL COM MAPA */}
      {/* ========================================================================= */}
      {activeTab === 'address' && (
        <form onSubmit={handleSaveAddress} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Dados da Filial & Sede Fiscal
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm text-code-sm font-bold">
                CNPJ Ativo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Razão Social</label>
                <input 
                  type="text" 
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">CNPJ da Filial</label>
                <input 
                  type="text" 
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-code-sm text-code-sm outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">CEP</label>
                  <button 
                    type="button" 
                    onClick={handleLookupCep}
                    className="text-primary hover:underline text-[11px] font-bold"
                  >
                    Buscar Correios
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="flex-1 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-code-sm text-code-sm outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={handleLookupCep}
                    className="px-3 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface text-body-sm font-semibold"
                  >
                    Buscar
                  </button>
                </div>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Logradouro</label>
                <input 
                  type="text" 
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Número</label>
                <input 
                  type="text" 
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Complemento</label>
                <input 
                  type="text" 
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Bairro</label>
                <input 
                  type="text" 
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">Cidade</label>
                  <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none"
                  />
                </div>
                <div className="w-20 flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">UF</label>
                  <input 
                    type="text" 
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm text-body-sm outline-none text-center font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md font-bold transition-all shadow-sm"
              >
                Salvar Endereço Fiscal
              </button>
            </div>
          </div>

          {/* Visualizador de Localização / Mapa */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-title-md text-title-md text-on-surface font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-primary">pin_drop</span>
                Raio de Entrega iFood & Logística
              </span>
              <span className="font-code-sm text-[11px] text-tertiary font-bold">Raio 7.5 km</span>
            </div>

            <div className="relative w-full aspect-video sm:aspect-square max-h-80 rounded-xl overflow-hidden border border-outline-variant/20 shadow-inner group">
              <img 
                src={MAP_IMAGE_URL} 
                alt="Mapa da Região Jardins" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>

              {/* Pin da Sede */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/30 animate-ping"></span>
                <div className="bg-surface-container-lowest text-primary px-3 py-1 rounded-full shadow-lg font-headline-sm text-headline-sm font-bold mt-1 text-nowrap flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">restaurant</span>
                  Hub Jardins Paulista
                </div>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Endereço sincronizado com o raio de despacho do iFood Jardins e emissão automática de DANFE via Bling / Totvs.
            </p>
          </div>

        </form>
      )}

      {/* ========================================================================= */}
      {/* ABA 3: PLANOS & FATURAMENTO */}
      {/* ========================================================================= */}
      {activeTab === 'billing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Card do Plano Atual */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Plano Contratado
                </span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface font-extrabold mt-0.5">
                  Enterprise Pro
                </h3>
              </div>
              <div className="text-right">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">R$ 1.490</span>
                <span className="text-[11px] text-on-surface-variant block">/mês • Faturamento Totvs</span>
              </div>
            </div>

            {/* Barras de Uso de Recursos */}
            <div className="space-y-3 pt-2 border-t border-outline-variant/20">
              <div>
                <div className="flex justify-between font-label-md text-label-md text-on-surface mb-1">
                  <span>Sessões Meta WhatsApp Cloud API</span>
                  <strong className="font-code-sm">42.890 / 60.000 (71%)</strong>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full w-[71%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-label-md text-label-md text-on-surface mb-1">
                  <span>IA Copilot & Geração de Criativos</span>
                  <strong className="font-code-sm">18.420 / 25.000 req (73%)</strong>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary-container h-full w-[73%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-label-md text-label-md text-on-surface mb-1">
                  <span>Armazenamento de Imagens em Nuvem</span>
                  <strong className="font-code-sm">14.2 GB / 50 GB</strong>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary-container h-full w-[28%]"></div>
                </div>
              </div>
            </div>

            {/* Sparkline de Tráfego Semanal */}
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">
                Tráfego nos Últimos 7 Dias (Msgs & Pedidos)
              </span>
              <svg className="w-full h-12 text-primary" viewBox="0 0 100 25" preserveAspectRatio="none">
                <path
                  d="M0,20 L15,16 L30,19 L45,10 L60,12 L75,4 L90,8 L100,2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onNavigate('armazenamento-midias')}
                className="w-full py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
                <span>Gerenciar Mídias & Espaço em Disco</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Upgrade de Plano', 'Nossa equipe de contas corporativas entrará em contato para expandir o plano Enterprise.', 'info')}
                className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-title-md text-title-md font-bold transition-all text-center"
              >
                Fazer Upgrade de Capacidade
              </button>
            </div>
          </div>

          {/* Formas de Pagamento & Histórico de Faturas */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Formas de Pagamento */}
            <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="font-title-lg text-title-lg text-on-surface font-bold">
                  Métodos de Pagamento Corporativos
                </h4>
                <button 
                  type="button" 
                  onClick={() => showToast('Adicionar Cartão', 'Formulário de cadastro de cartão de crédito corporativo.', 'info')}
                  className="text-primary text-[12px] font-bold hover:underline"
                >
                  + Novo Método
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-primary/30">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[28px] text-primary">credit_card</span>
                    <div>
                      <span className="font-title-md text-title-md text-on-surface font-bold block">
                        Mastercard Corporativo •••• 8824
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        Expira em 08/2028 • Débito automático ativo
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold">
                    Padrão
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[28px] text-tertiary">pix</span>
                    <div>
                      <span className="font-title-md text-title-md text-on-surface font-bold block">
                        PIX Automático & Boleto DDA
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        Banco Itaú Empresas • CNPJ 42.189.330/0001-44
                      </span>
                    </div>
                  </div>
                  <span className="text-on-surface-variant text-[11px]">Reserva</span>
                </div>
              </div>
            </div>

            {/* Histórico de Faturas Recentes */}
            <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-3">
              <h4 className="font-title-lg text-title-lg text-on-surface font-bold">
                Últimas Faturas & Notas Fiscais
              </h4>

              <div className="divide-y divide-outline-variant/15 font-body-sm text-body-sm">
                {[
                  { ref: 'Outubro / 2024', val: 'R$ 1.490,00', status: 'Pago', nf: 'NF-e #8841', date: '05/10/2024' },
                  { ref: 'Setembro / 2024', val: 'R$ 1.490,00', status: 'Pago', nf: 'NF-e #8210', date: '05/09/2024' },
                  { ref: 'Agosto / 2024', val: 'R$ 1.490,00', status: 'Pago', nf: 'NF-e #7644', date: '05/08/2024' },
                ].map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-on-surface block">{item.ref}</span>
                      <span className="text-[11px] text-on-surface-variant font-code-sm">
                        {item.nf} • Pago em {item.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-title-md text-title-md font-bold text-on-surface">
                        {item.val}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => showToast('Download NF-e', `Baixando arquivo PDF da ${item.nf}...`, 'success')}
                        className="p-1.5 rounded-lg hover:bg-surface-container text-primary transition-colors" 
                        title="Baixar Nota Fiscal em PDF"
                      >
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 4: SEGURANÇA & SESSÕES */}
      {/* ========================================================================= */}
      {activeTab === 'security' && (
        <div className="max-w-3xl bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Segurança Corporativa & Acesso
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Proteja o acesso à sua conta de atendimento, catálogo e credenciais de webhooks.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold">
              Proteção Alta
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[28px]">verified_user</span>
              <div>
                <span className="font-title-md text-title-md text-on-surface font-bold block">
                  Autenticação em Dois Fatores (2FA)
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Requer confirmação no Google Authenticator ou código SMS ao conectar novos computadores na rede.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold shrink-0">
              Ativo
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-title-md text-title-md text-on-surface font-bold">
              Sessões Ativas em Dispositivos
            </h4>
            
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">laptop_mac</span>
                  <div>
                    <span className="font-semibold text-on-surface block">Google Chrome no macOS • São Paulo, Brasil</span>
                    <span className="text-[11px] text-tertiary font-code-sm">Sessão Atual • IP 177.18.29.102</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">Agora</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">smartphone</span>
                  <div>
                    <span className="font-semibold text-on-surface block">Rede Omni App (Android) • Samsung Galaxy S23</span>
                    <span className="text-[11px] text-on-surface-variant font-code-sm">Último acesso: Hoje às 08:30</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Sessão Desconectada', 'Dispositivo Android deslogado com sucesso.', 'info')}
                  className="text-error hover:underline text-label-sm font-semibold"
                >
                  Desconectar
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-outline-variant/20 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Sessões Encerradas', 'Todas as outras sessões foram invalidadas.', 'success')}
              className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md text-title-md transition-all"
            >
              Encerrar Todas as Outras Sessões
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 5: ZONA CRÍTICA (DANGER ZONE) */}
      {/* ========================================================================= */}
      {activeTab === 'danger' && (
        <div className="max-w-3xl bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-error/30 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-error">
            <span className="material-symbols-outlined text-[28px]">warning</span>
            <h3 className="font-headline-md text-headline-md font-bold">Zona Crítica e Irreversível</h3>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            As ações nesta seção têm impacto imediato sobre as operações do restaurante, cancelamento de canais Meta WhatsApp,
            desvinculação das credenciais do iFood e suspensão de webhooks do Totvs Protheus.
          </p>

          <div className="p-4 rounded-xl bg-error-container/20 border border-error-container flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <strong className="font-title-md text-title-md text-on-surface block">Desconectar Hub & Excluir Workspace</strong>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Remove permanentemente logs de atendimento, histórico de conversas e regras automatizadas.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 rounded-xl bg-error text-on-error font-title-md text-title-md font-bold hover:bg-error/90 transition-all shrink-0 shadow-sm"
            >
              Excluir Workspace
            </button>
          </div>
        </div>
      )}

      {/* Modal de Confirmação da Zona de Perigo */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-error/40 flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-error">
              <span className="material-symbols-outlined text-[32px]">warning</span>
              <h3 className="font-headline-sm text-headline-sm font-bold">Confirmar Exclusão</h3>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Esta ação é <strong>definitiva</strong>. Para confirmar que deseja desativar o workspace <strong>Rede Jardins Paulista (#8921)</strong>, digite <span className="font-mono font-bold text-on-surface">EXCLUIR CONTA REDE</span> abaixo:
            </p>

            <input 
              type="text" 
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              placeholder="Digite EXCLUIR CONTA REDE"
              className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-sm outline-none focus:ring-2 focus:ring-error"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-title-md text-title-md font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-xl bg-error text-on-error font-title-md text-title-md font-bold hover:bg-error/90 transition-all"
              >
                Confirmar e Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
