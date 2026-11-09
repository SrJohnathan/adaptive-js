"hydrate";

import { useRouter } from "@adaptive-js/web";
import { SCREEN_ROUTES, type ScreenType } from "../../shared/omni-hub/types";
import { toggleClientPanel } from "../../shared/omni-hub/client-panel-store";

interface SidebarProps {
  active: ScreenType;
}

const NAV_ITEMS: { id: ScreenType; label: string; icon: string; badge?: string }[] = [
  { id: "chat-omnichannel", label: "Chat Omnichannel", icon: "forum", badge: "38" },
  { id: "catalogo-erp", label: "Catálogo & ERP", icon: "sync_alt" },
  { id: "estudio-banners", label: "Estúdio de Banners & IA", icon: "photo_library" },
  { id: "armazenamento-midias", label: "Armazenamento & Mídias", icon: "cloud_sync" },
  { id: "configuracoes-conta", label: "Configurações de Conta", icon: "manage_accounts" },
  { id: "autenticacao", label: "Login Corporativo", icon: "lock" },
];

export function Sidebar({ active }: SidebarProps) {
  const router = useRouter();

  const goTo = (screen: ScreenType) => router.push(SCREEN_ROUTES[screen]);

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest shadow-[1px_0_8px_rgba(0,0,0,0.02)] border-r border-outline-variant/20 z-40 flex flex-col justify-between py-4">
      <div className="flex flex-col gap-1 px-3">
        <div className="px-3 py-1 mb-1 flex items-center justify-between">
          <span className="font-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
            Canais & Módulos
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm text-[10px] font-bold">
            v4.8
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-title-md transition-all text-left group ${
                  isActive
                    ? "bg-primary-container text-on-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                      isActive ? "text-on-primary" : "text-primary"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                      isActive ? "bg-white/25 text-white" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Acesso Rápido */}
          <div className="pt-3 mt-2 border-t border-outline-variant/20">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-1 block">
              Acesso Rápido
            </span>
            {active === "chat-omnichannel" ? (
              <button
                type="button"
                onClick={toggleClientPanel}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-sm font-medium transition-colors"
                title="Abrir Painel 360° do Cliente"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">contact_page</span>
                <span>Perfil 360° do Cliente</span>
              </button>
            ) : (
              <></>
            )}
            <button
              type="button"
              onClick={() => goTo("catalogo-erp")}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary">storefront</span>
              <span>Vitrines iFood</span>
            </button>
            <button
              type="button"
              onClick={() => goTo("estudio-banners")}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-body-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">campaign</span>
              <span>Disparos & Campanhas</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Footer Sync Status Widget */}
      <div className="px-3">
        <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[20px]">hub</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-on-surface font-semibold">iFood & ERP Sync</span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Conectado (18ms)
              </span>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
        </div>
      </div>
    </aside>
  );
}