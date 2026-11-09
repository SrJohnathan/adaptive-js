"hydrate";

import { init, signal, useRouter } from "@adaptive-js/web";
import { closePalette, paletteOpen, openPalette } from "../../shared/omni-hub/palette-store";
import { products } from "../../shared/omni-hub/catalog-store";
import { conversations } from "../../features/chat/reactives-helpes";
import { SCREEN_ROUTES, type ScreenType } from "../../shared/omni-hub/types";
import { avatarUrl, iniciais } from "../../shared/avatar";

const SCREEN_ACTIONS: { id: ScreenType; title: string; desc: string; icon: string }[] = [
  { id: "chat-omnichannel", title: "Chat Omnichannel", desc: "Atendimento WhatsApp, Instagram e Telegram", icon: "forum" },
  { id: "catalogo-erp", title: "Catálogo de Produtos & ERP", desc: "Sincronizador iFood e Totvs Protheus", icon: "sync_alt" },
  { id: "estudio-banners", title: "Estúdio de Criação com IA", desc: "Criador de banners gastronômicos 4K", icon: "photo_library" },
  { id: "armazenamento-midias", title: "Armazenamento & Mídias", desc: "Gerenciar mídias e hospedagem de arquivos", icon: "cloud_sync" },
  { id: "configuracoes-conta", title: "Configurações de Conta", desc: "Endereço fiscal, plano e faturamento", icon: "manage_accounts" },
  { id: "autenticacao", title: "Login Corporativo", desc: "Trocar operador ou acessar como administrador", icon: "lock" },
];

let keyboardBound = false;

export function CommandPalette() {
  const router = useRouter();
  const [query, setQuery] = signal("");

  init(() => {
    if (keyboardBound) return;
    keyboardBound = true;

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (paletteOpen()) {
          closePalette();
        } else {
          setQuery("");
          openPalette();
        }
      }
      if (event.key === "Escape") {
        closePalette();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const closeAndGo = (path: string) => {
    closePalette();
    router.push(path);
  };

  return (
    <>
      {() => {
        const search = query().toLowerCase();
        const screens = SCREEN_ACTIONS.filter(
          (s) => s.title.toLowerCase().includes(search) || s.desc.toLowerCase().includes(search),
        );
        const matchedClients = conversations().filter(
          (c) => c.clientName.toLowerCase().includes(search) || c.phone.includes(query()),
        );
        const matchedProducts = products().filter(
          (p) => p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search),
        );

        return paletteOpen() ? (
          <div
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in"
            onClick={closePalette}
          >
            <div
              className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Input Bar */}
              <div className="flex items-center px-4 py-3.5 border-b border-outline-variant/20 bg-surface-container-low">
                <span className="material-symbols-outlined text-on-surface-variant text-[22px] mr-3">search</span>
                <input
                  type="text"
                  autoFocus
                  value={() => query()}
                  onInput={(event) => setQuery(event.currentTarget.value)}
                  placeholder="Digite para buscar telas, clientes, pratos do cardápio ou ações..."
                  className="w-full bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-on-surface-variant/70"
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
                    {screens.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => closeAndGo(SCREEN_ROUTES[item.id])}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                          </div>
                          <div>
                            <span className="font-title-md text-on-surface font-semibold block">{item.title}</span>
                            <span className="font-body-sm text-[11px] text-on-surface-variant">{item.desc}</span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">arrow_forward</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clientes Encontrados */}
                {matchedClients.length > 0 && (
                  <div>
                    <span className="px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
                      Clientes & Conversas
                    </span>
                    <div className="space-y-1">
                      {matchedClients.map((client) => (
                        <div
                          key={client.id}
                          onClick={() => closeAndGo(SCREEN_ROUTES["chat-omnichannel"])}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {() => {
                              const src = avatarUrl(client.avatar);
                              return src ? (
                                <img src={src} alt={client.clientName} className="w-8 h-8 rounded-full object-cover" />
                              ) : (
                                <span className="w-8 h-8 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-title-sm">
                                  {iniciais(client.clientName)}
                                </span>
                              );
                            }}
                            <div>
                              <span className="font-title-md text-on-surface font-semibold block">{client.clientName}</span>
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
                {matchedProducts.length > 0 && (
                  <div>
                    <span className="px-2 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1.5">
                      Cardápio & Estoque ERP
                    </span>
                    <div className="space-y-1">
                      {matchedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => closeAndGo(SCREEN_ROUTES["catalogo-erp"])}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <span className="font-title-md text-on-surface font-semibold block">{prod.name}</span>
                              <span className="font-body-sm text-[11px] text-on-surface-variant">
                                SKU {prod.sku} • {prod.category}
                              </span>
                            </div>
                          </div>
                          <span className="font-title-md font-bold text-primary">{prod.ifoodPrice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-[11px] text-on-surface-variant">
                <span>
                  Use <strong>Tab</strong> ou as <strong>Setas</strong> para navegar
                </span>
                <span>
                  Pressione <strong>ESC</strong> para fechar
                </span>
              </div>
            </div>
          </div>
        ) : (<> </>);
        }
      }
    </>
  );
}