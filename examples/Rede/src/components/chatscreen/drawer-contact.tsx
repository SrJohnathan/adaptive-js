'hydrate'
import {Reveal} from "@adaptive-js/components";
import {events, signal} from "@adaptive-js/web";
import {clientPanelOpen, closeClientPanel} from "../../shared/omni-hub/client-panel-store";
import {getActive} from "../../features/chat/reactives-helpes.ts";
import {showToast} from "../../shared/omni-hub/toast-store.ts";
import { avatarUrl, iniciais } from "../../shared/avatar.ts";

type AiTone = "friendly" | "formal" | "promo";

const TONE_LABELS: Record<AiTone, string> = {
    friendly: "Amigável",
    formal: "Formal",
    promo: "Promo",
};

const TONE_TOASTS: Record<AiTone, string> = {
    friendly: "Amigável",
    formal: "Formal",
    promo: "Promocional",
};

export const DrawerContact = () => {


    const [internalNoteText, setInternalNoteText] = signal("");
    const [isAddingNote, setIsAddingNote] = signal(false);
    const [inputText, setInputText] = signal("");
    const [aiTone, setAiTone] = signal<AiTone>("friendly");

    const handleQuickAiReply = (suggestion: string) => {
        setInputText(suggestion);
        showToast("IA Copilot", "Sugestão inserida no campo de texto. Você pode editar ou enviar diretamente.");
    };


    const handleSaveInternalNote = () => {
        if (!internalNoteText().trim() || !getActive()) return;
        setIsAddingNote(false);
        setInternalNoteText("");
        showToast("Nota Interna Salva", "A anotação foi registrada com sucesso no perfil do cliente.", "info");
    };

    return (<>
        <Reveal when={() => clientPanelOpen()}>
            <Reveal.If>
                <div
                    className="fixed inset-0 z-[60] bg-black/25 backdrop-blur-[1px]"
                    onClick={closeClientPanel}
                ></div>

                <aside
                    className="fixed top-16 right-0 bottom-0 z-[61] w-80 xl:w-96 bg-surface-container-lowest border-l border-outline-variant/20 shadow-2xl overflow-y-auto scrollbar-thin animate-in fade-in">
                    {/* Cabeçalho do Drawer */}
                    <div
                        className="sticky top-0 z-10 px-4 py-3 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/20 flex items-center justify-between">
                            <span className="font-headline-sm text-on-surface font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px] text-primary">contact_page</span>
                                Perfil 360° do Cliente
                            </span>
                        <button
                            type="button"
                            onClick={closeClientPanel}
                            className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                            title="Fechar Painel 360°"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                        {/* Cartão de Perfil */}
                        {() => {
                            const active = getActive();
                            if (!active) return null;
                            return (
                                <div
                                    className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        {() => {
                                            const src = avatarUrl(active.avatar);
                                            return src ? (
                                                <img
                                                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                                                    alt={active.clientName}
                                                    src={src}
                                                />
                                            ) : (
                                                <span className="w-14 h-14 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-headline-lg">
                                                    {iniciais(active.clientName)}
                                                </span>
                                            );
                                        }}
                                        <div className="min-w-0">
                                            <h3 className="font-headline-sm text-on-surface font-bold truncate">{active.clientName}</h3>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="px-2 py-0.2 rounded bg-amber-100 text-amber-800 font-label-sm font-bold">
                          {active.vipStatus || "Cliente Frequente"}
                        </span>
                                                <span
                                                    className="font-code-sm text-[11px] text-on-surface-variant font-mono">{active.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="grid grid-cols-3 gap-2 pt-2 border-t border-outline-variant/20 text-center">
                                        <div className="bg-surface-container-lowest p-2 rounded-lg">
                                            <span className="text-[11px] text-on-surface-variant block">Gasto Mês</span>
                                            <span
                                                className="font-title-md text-primary font-bold">{active.totalSpentMonth}</span>
                                        </div>
                                        <div className="bg-surface-container-lowest p-2 rounded-lg">
                                            <span className="text-[11px] text-on-surface-variant block">Pedidos</span>
                                            <span
                                                className="font-title-md text-on-surface font-bold">{active.completedOrdersCount} concl.</span>
                                        </div>
                                        <div className="bg-surface-container-lowest p-2 rounded-lg">
                                            <span
                                                className="text-[11px] text-on-surface-variant block">Ticket Médio</span>
                                            <span
                                                className="font-title-md text-tertiary font-bold">{active.avgTicket}</span>
                                        </div>
                                    </div>

                                    <div className="font-body-sm text-on-surface-variant flex items-center gap-1">
                                        <span
                                            className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                                        <span className="truncate">{active.address}</span>
                                    </div>
                                </div>
                            );
                        }}

                        {/* Rede Assist Copilot */}
                        {() => {
                            const active = getActive();
                            if (!active) return null;
                            return (
                                <div
                                    className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                                                <span
                                                    className="material-symbols-outlined text-[16px]">psychology</span>
                                            </div>
                                            <span className="font-title-md text-on-surface font-bold">Rede Assist Copilot</span>
                                        </div>
                                        <span
                                            className="font-label-sm px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {active.sentimentPercent}% Positivo
                    </span>
                                    </div>

                                    <div className="space-y-2">
                    <span className="font-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                      Respostas Prontas (1-Click)
                    </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleQuickAiReply("Carlos, seu pedido #8942 já está em preparo na filial Jardins! Previsão de entrega entre 35 e 45 minutos no seu endereço.")
                                            }
                                            className="w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-on-surface flex items-start gap-2 group"
                                        >
                                                <span
                                                    className="material-symbols-outlined text-[16px] text-primary group-hover:scale-110 transition-transform">send</span>
                                            <span>Previsão de Entrega Totvs</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleQuickAiReply("Como você é nosso cliente VIP Ouro, caso queira a sobremesa Petit Gâteau hoje, envio com 20% de cortesia!")}
                                            className="w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-on-surface flex items-start gap-2 group"
                                        >
                                                <span
                                                    className="material-symbols-outlined text-[16px] text-tertiary group-hover:scale-110 transition-transform">redeem</span>
                                            <span>Oferecer Cortesia Sobremesa</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleQuickAiReply("Segue a chave Pix direta da loja com confirmação instantânea no seu pedido: 11.234.567/0001-89")}
                                            className="w-full text-left p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors font-body-sm text-on-surface flex items-start gap-2 group"
                                        >
                                                <span
                                                    className="material-symbols-outlined text-[16px] text-secondary group-hover:scale-110 transition-transform">qr_code_2</span>
                                            <span>Enviar Link Pix Direto</span>
                                        </button>
                                    </div>

                                    {/* Modulador de Tom */}
                                    <div
                                        className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
                                        <span className="font-label-sm text-on-surface-variant">Tom da IA:</span>
                                        <div
                                            className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
                                            {(["friendly", "formal", "promo"] as const).map((tone) => (
                                                <button
                                                    key={tone}
                                                    type="button"
                                                    onClick={() => {
                                                        setAiTone(tone);
                                                        showToast("Tom da IA", `Tom ajustado para ${TONE_TOASTS[tone]}.`);
                                                    }}
                                                    className={() =>
                                                        aiTone() === tone
                                                            ? "px-2 py-0.5 rounded text-[11px] font-semibold capitalize bg-surface-container-lowest text-primary shadow-sm"
                                                            : "px-2 py-0.5 rounded text-[11px] font-semibold capitalize text-on-surface-variant hover:text-on-surface"
                                                    }
                                                >
                                                    {TONE_LABELS[tone]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }}

                        {/* Pratos Favoritos do Cliente */}
                        <div
                            className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-2.5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span
                                    className="font-title-md text-on-surface font-bold">Pratos Mais Pedidos (ERP)</span>
                                <span className="font-code-sm text-[11px] text-tertiary font-bold">Histórico</span>
                            </div>

                            <div className="space-y-2">
                                <div
                                    className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low font-body-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">🍕</span>
                                        <div>
                                                <span
                                                    className="font-semibold text-on-surface block">Pizza Margherita Especial</span>
                                            <span
                                                className="text-[11px] text-on-surface-variant">Pediu 4x este mês</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleQuickAiReply("Que tal repetir a sua favorita Pizza Margherita Especial hoje?")}
                                        className="p-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary transition-colors"
                                        title="Ofertar Prato"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">send</span>
                                    </button>
                                </div>

                                <div
                                    className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low font-body-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">🍫</span>
                                        <div>
                                            <span
                                                className="font-semibold text-on-surface block">Petit Gâteau Belga</span>
                                            <span
                                                className="text-[11px] text-on-surface-variant">Pediu 2x este mês</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleQuickAiReply("Separamos um Petit Gâteau Belga quentinho para acompanhar seu almoço!")}
                                        className="p-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-primary transition-colors"
                                        title="Ofertar Prato"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">send</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notas Internas */}
                        {() => {
                            const active = getActive();
                            if (!active) return null;
                            return (
                                <div
                                    className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 flex flex-col gap-2 shadow-sm">
                                    <div className="flex items-center justify-between">
                                            <span
                                                className="font-title-md text-on-surface font-bold">Notas Internas da Equipe</span>
                                        <button
                                            type="button"
                                            onClick={() => setIsAddingNote(!isAddingNote())}
                                            className="text-primary hover:underline font-label-sm font-bold"
                                        >
                                            {() => (isAddingNote() ? "Cancelar" : "+ Nova Nota")}
                                        </button>
                                    </div>

                                    <Reveal when={() => isAddingNote()}>
                                        <Reveal.If>
                                            <div className="flex flex-col gap-2 pt-1">
                        <textarea
                            value={() => internalNoteText()}
                            onInput={(event) => setInternalNoteText(event.currentTarget.value)}
                            placeholder="Escreva uma instrução para a equipe de atendimento e cozinha..."
                            rows={3}
                            className="w-full p-2 bg-surface-container-low border border-outline-variant/30 rounded-lg font-body-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                        />
                                                <button
                                                    type="button"
                                                    onClick={handleSaveInternalNote}
                                                    className="w-full py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-title-md font-bold transition-colors"
                                                >
                                                    Salvar Anotação
                                                </button>
                                            </div>
                                        </Reveal.If>
                                        <Reveal.Else>
                                            <div
                                                className="p-2.5 rounded-lg bg-amber-50 text-amber-900 border-l-2 border-amber-500 font-body-sm">
                                                {active.notes}
                                            </div>
                                        </Reveal.Else>
                                    </Reveal>
                                </div>
                            );
                        }}
                    </div>
                </aside>
            </Reveal.If>
            <Reveal.Else>
                <> </>
            </Reveal.Else>
        </Reveal>
  </>  )

}