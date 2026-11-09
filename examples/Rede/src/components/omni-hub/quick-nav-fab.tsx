"hydrate";

import { init, signal, useRouter } from "@adaptive-js/web";
import { openPalette } from "../../shared/omni-hub/palette-store";
import { SCREEN_ROUTES, type ScreenType } from "../../shared/omni-hub/types";

interface QuickNavFabProps {
  active: ScreenType;
}

const QUICK_NAV: { id: ScreenType; label: string; icon: string }[] = [
  { id: "chat-omnichannel", label: "Chat Omnichannel", icon: "forum" },
  { id: "catalogo-erp", label: "Catálogo & ERP", icon: "sync_alt" },
  { id: "estudio-banners", label: "Estúdio de IA", icon: "photo_library" },
  { id: "armazenamento-midias", label: "Armazenamento", icon: "cloud_sync" },
  { id: "configuracoes-conta", label: "Conta & Sede", icon: "manage_accounts" },
  { id: "autenticacao", label: "Tela de Login", icon: "lock" },
];

const QUICK_NAV_HIDE_DELAY_MS = 10_000;

export function QuickNavFab({ active }: QuickNavFabProps) {
  const router = useRouter();
  const [quickNavOpen, setQuickNavOpen] = signal(false);
  const [quickNavPing, setQuickNavPing] = signal(0);

  const resetQuickNavTimer = () => setQuickNavPing((ping) => ping + 1);

  init(() => {
    quickNavOpen();
    quickNavPing();
    if (!quickNavOpen()) return;
    const timer = setTimeout(() => setQuickNavOpen(false), QUICK_NAV_HIDE_DELAY_MS);
    return () => clearTimeout(timer);
  });

  const openQuickNav = () => {
    setQuickNavOpen(true);
    setQuickNavPing((ping) => ping + 1);
  };

  return (
    <div>
      {() =>
        quickNavOpen() ? (
          <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end gap-2.5">
            <nav
              aria-label="Alternar Telas do Aplicativo"
              onClick={resetQuickNavTimer}
              className="bg-surface-container-lowest/95 backdrop-blur-md px-3 py-2.5 rounded-2xl shadow-xl border border-outline-variant/30 flex flex-col gap-2 items-end max-w-[90vw]"
            >
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
                <span className="hidden xl:inline text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/80 pl-1 pr-2">
                  Navegação Rápida:
                </span>

                {QUICK_NAV.map((screen) => {
                  const isActive = active === screen.id;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => router.push(SCREEN_ROUTES[screen.id])}
                      className={`px-3 py-1.5 rounded-xl font-label-md flex items-center gap-1.5 transition-all text-nowrap shrink-0 ${
                        isActive
                          ? "bg-primary text-on-primary font-bold shadow-sm"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[16px] ${isActive ? "text-on-primary" : "text-primary"}`}>
                        {screen.icon}
                      </span>
                      <span>{screen.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-2 w-full">
                <div className="w-px h-5 bg-outline-variant/30 hidden sm:block"></div>
                <button
                  type="button"
                  onClick={openPalette}
                  className="p-1.5 rounded-xl hover:bg-surface-container text-on-surface-variant transition-colors"
                  title="Abrir Busca Rápida (Ctrl+K)"
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
              </div>
            </nav>

            <button
              type="button"
              onClick={() => setQuickNavOpen(false)}
              className="h-11 w-11 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl rotate-90 hover:rotate-0 transition-all flex items-center justify-center"
              title="Fechar Navegação Rápida"
              aria-label="Fechar Navegação Rápida"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={openQuickNav}
            className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 h-11 flex items-center gap-2 px-4 rounded-full bg-primary text-on-primary shadow-lg hover:shadow-xl transition-all animate-in fade-in"
            title="Abrir Navegação Rápida"
            aria-label="Abrir Navegação Rápida"
          >
            <span className="material-symbols-outlined text-[22px]">apps</span>
            <span className="font-label-md font-bold">Nav Rápida</span>
          </button>
        )
      }
    </div>
  );
}