'hydrate'
import {ListMessage} from "../chatscreen/list-message.tsx";
import {DrawerContact} from "../chatscreen/drawer-contact.tsx";
import {AiChatPanel} from "../chatscreen/ai-chat-panel.tsx";
import {ListContects} from "../chatscreen/list-contects.tsx";
import {

    events,
    signal,
    useRouter,
    init,

} from "@adaptive-js/web";
import {Reveal} from "@adaptive-js/components";
import {
    channelFilter,
    connection, getActive, isTyping,
    pushMessage, selectedConversationId, setChannelFilter, setTyping,
} from "../../features/chat/reactives-helpes";
import {showToast} from "../../shared/omni-hub/toast-store";
import { avatarUrl, iniciais } from "../../shared/avatar";
import {joinConversation, notifyTyping, sendAgentMessage} from "../../features/chat/ContextSocket";
import {
    clientPanelOpen, toggleClientPanel
} from "../../shared/omni-hub/client-panel-store";



import {SCREEN_ROUTES, type ChatMessage} from "../../shared/omni-hub/types";

const CHANNEL_PILLS: { id: string; label: string; icon?: string; count?: string; color?: string }[] = [
    {id: "all", label: "Todos", count: "38"},
    {id: "whatsapp", label: "WhatsApp", icon: "chat", count: "21", color: "text-emerald-700"},
    {id: "instagram", label: "Instagram", icon: "photo_camera", count: "9", color: "text-pink-600"},
    {id: "telegram", label: "Telegram", icon: "send", count: "5", color: "text-sky-600"},
];

type ServiceTab = "mine" | "queue" | "resolved";
type AiTone = "friendly" | "formal" | "promo";


export function ChatScreen() {
    const router = useRouter();

    const [activeTab, setActiveTab] = signal<ServiceTab>("mine");
    const [inputText, setInputText] = signal("");


    init(() => {



    })

    const timeNow = () =>
        new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

    // Entra na sala realtime da conversa ativa sempre que a seleção muda.
    events(() => {
        const id = selectedConversationId();
        if (id) joinConversation(id);
    }, [selectedConversationId]);

    const handleInputChange = (value: string) => {
        setInputText(value);
        const active = getActive();
        if (active) notifyTyping(active.id, value.trim().length > 0);
    };

    const handleSendMessage = (textToSend?: string) => {
        const text = textToSend ?? inputText();
        if (!text.trim()) return;

        const active = getActive();
        if (!active) {
            showToast("Nenhuma conversa aberta", "Aguarde o realtime carregar a caixa de entrada.", "warning");
            return;
        }

        const delivered = sendAgentMessage(active.id, text, "Mariana Silva");
        if (!delivered) {
            // Sem realtime: mantém o comportamento local para a UI não morrer.
            const message: ChatMessage = {
                id: "msg-" + Date.now(),
                sender: "agent",
                senderName: "Mariana Silva",
                text,
                time: timeNow(),
                status: "done_all",
            };
            pushMessage(active.id, message);
        }
        setInputText("");
        notifyTyping(active.id, false);
        setTyping(active.id, false);
        showToast(
            delivered ? "Mensagem Enviada" : "Mensagem Enviada (offline)",
            delivered
                ? `Enviada em tempo real para ${active.clientName}.`
                : `Salva localmente para ${active.clientName} (realtime offline).`,
            delivered ? "success" : "warning",
        );
    };

    const handleQuickAiReply = (suggestion: string) => {
        setInputText(suggestion);
        showToast("IA Copilot", "Sugestão inserida no campo de texto. Você pode editar ou enviar diretamente.");
    };


    return (
        <div className="flex-1 flex overflow-hidden h-[calc(100vh-64px)] w-full bg-surface">
            {/* ============ COLUNA 1: CAIXA DE ENTRADA OMNICHANNEL ============ */}
            <section
                className="w-80 lg:w-96 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col shrink-0 h-full">
                <div className="p-4 border-b border-outline-variant/20 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h1 className="font-headline-md text-on-surface font-bold">Conversas</h1>
                        <div className="flex items-center gap-1.5">
                            <span
                                className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-semibold">38 ativas</span>
                            <button
                                type="button"
                                onClick={() =>
                                    showToast("Atualizando Inbox", "Verificando novas mensagens no WhatsApp Cloud API e Instagram...", "info")
                                }
                                className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                                title="Filtrar Mensagens"
                            >
                                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                            </button>
                        </div>


                    </div>

                    {/* Filtro de Canais em Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-nowrap">
                        {CHANNEL_PILLS.map((chan) => {
                            const selected = channelFilter() === chan.id;
                            return (
                                <button
                                    key={chan.id}
                                    type="button"
                                    onClick={() => setChannelFilter(chan.id)}
                                    className={() =>
                                        selected
                                            ? "px-2.5 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-primary text-on-primary font-bold shadow-sm"
                                            : "px-2.5 py-1 rounded-full font-label-md transition-colors flex items-center gap-1 shrink-0 bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                                    }
                                >
                                    {chan.icon && (
                                        <span className={`material-symbols-outlined text-[15px] ${chan.color}`}>{chan.icon}</span>
                                    )}
                                    <span>{chan.label}</span>
                                    {chan.count && (
                                        <span
                                            className="text-[11px] ml-0.5 text-on-surface-variant/70">{chan.count}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Abas de Atendimento */}
                    <div className="flex border-b border-outline-variant/15 text-label-md font-label-md">
                        {(["mine", "queue", "resolved"] as const).map((tab) => {
                            const label = tab === "mine" ? "Minhas (12)" : tab === "queue" ? "Fila (8)" : "Resolvidas";
                            const isActive = activeTab() === tab;
                            return (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setActiveTab(tab)}
                                    className={() =>
                                        isActive
                                            ? "flex-1 py-1.5 text-center font-bold border-b-2 border-primary text-primary"
                                            : "flex-1 py-1.5 text-center border-b-2 border-transparent text-on-surface-variant hover:text-on-surface"
                                    }
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Campo de Busca Rápida na Inbox */}
                    <div
                        className="flex items-center bg-surface-container-low rounded-xl px-3 py-1.5 border border-outline-variant/20 focus-within:ring-1 focus-within:ring-primary">
                        <span
                            className="material-symbols-outlined text-on-surface-variant mr-2 text-[18px]">search</span>
                        <input
                            type="text"
                            placeholder="Buscar por cliente, pedido # ou telefone..."
                            className="w-full bg-transparent border-none outline-none font-body-sm text-on-surface placeholder:text-on-surface-variant/70"
                        />
                        <kbd
                            className="font-code-sm text-on-surface-variant text-[10px] px-1 bg-surface-container-highest rounded">
                            Ctrl K
                        </kbd>
                    </div>
                </div>

                {/* Lista de Conversas */}

               <ListContects/>

                {/* Rodapé da Inbox */}
                <div
                    className="p-3 bg-surface-container-low border-t border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Meta WhatsApp Cloud API Ativa
          </span>
                    <span className="font-code-sm">SLA Médio: 1.8 min</span>
                </div>
            </section>

            {/* ============ COLUNA 2: MENSAGENS E ATENDIMENTO ============ */}
            <main className="flex-1 flex flex-col bg-surface-container-low/40 h-full overflow-hidden">
                {/* Header da Conversa Ativa*/}
                <div
                    className="h-16 px-6 bg-surface-container-lowest border-b border-outline-variant/20 flex items-center justify-between shrink-0 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            {() => {
                                const active = getActive();
                                const src = active ? avatarUrl(active.avatar) : null;

                                if (!active) {
                                    return (
                                        <span className="w-10 h-10 rounded-full bg-surface-container-high animate-pulse"></span>
                                    );
                                }

                                return src ? (
                                    <img
                                        className="w-10 h-10 rounded-full object-cover ring-1 ring-outline-variant/30"
                                        alt={active.clientName}
                                        src={src}
                                    />
                                ) : (
                                    <span className="w-10 h-10 rounded-full bg-primary-container/20 text-primary font-bold flex items-center justify-center font-headline-md">
                                        {iniciais(active.clientName)}
                                    </span>
                                );
                            }}
                        </div>
                        <div>
                            {() => {
                                const active = getActive()

                                if (!active) {
                                    return (
                                        <div className="flex items-center gap-2">
                                            <h2 className="font-headline-sm text-on-surface-variant font-bold">
                                                Carregando conversas do realtime…
                                            </h2>
                                        </div>
                                    );
                                }

                                return (
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="font-headline-sm text-on-surface font-bold">{active.clientName}</h2>
                                            {active.vipStatus && (
                                                <span
                                                    className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-label-sm font-bold">{active.vipStatus}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-on-surface-variant font-body-sm">
                                            <span>{active.phone}</span>
                                            <span>•</span>
                                            <span className="text-primary font-medium flex items-center gap-1"><span
                                                className="material-symbols-outlined text-[14px]">verified</span>
                                                {active.channelBadgeText}</span>
                                        </div>
                                    </div>
                                );
                            }}
                        </div>
                    </div>

                    {/* SLA e Ações Rápidas*/}
                    <div className="flex items-center gap-2">
                        <div
                            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface font-code-sm border border-outline-variant/20">
                            <span className="material-symbols-outlined text-[16px] text-tertiary">timer</span>
                            <span>SLAJ: <strong className="text-primary">{() => inputText()}</strong></span>
                        </div>

                        {/* Status do realtime */}
                        <div
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm border border-outline-variant/20"
                            title="Microserviço realtime (Socket.IO)"
                        >
                            <span
                                className={`w-2 h-2 rounded-full ${() =>
                                    connection() === "online"
                                        ? "bg-emerald-500"
                                        : connection() === "connecting"
                                          ? "bg-amber-400 animate-pulse"
                                          : "bg-red-500"}`}
                            ></span>
                            <span>{() =>
                                connection() === "online"
                                    ? "Realtime"
                                    : connection() === "connecting"
                                      ? "Conectando"
                                      : "Offline"}</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => showToast("Transferir Atendimento", "Escolha o operador ou departamento de destino (Cozinha/Logística).", "info")}
                            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md transition-colors border border-outline-variant/20"
                        >
                            <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                            <span>Transferir</span>
                        </button>

                        <button
                            type="button"
                            onClick={toggleClientPanel}
                            className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors relative"
                            title="Perfil 360° do Cliente"
                        >
                            <span className="material-symbols-outlined text-[20px]">contact_page</span>


                            <Reveal when={() => clientPanelOpen()}>
                                <Reveal.If>
                                    <span
                                        className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
                                </Reveal.If>
                                <Reveal.Else>
                                    <> </>
                                </Reveal.Else>
                            </Reveal>
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push(SCREEN_ROUTES["catalogo-erp"])}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px] text-primary">restaurant_menu</span>
                            <span>Cardápio ERP</span>
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                showToast("Atendimento Concluído", `Conversa com ${getActive()?.clientName ?? "cliente"} finalizada com protocolo registrado no Totvs.`, "success")
                            }
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md transition-all shadow-sm active:scale-95 font-bold"
                        >
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            <span>Concluir</span>
                        </button>
                    </div>
                </div>

            {/*     Fluxo de Mensagens*/}
                <div className="flex-1 flex flex-col min-h-0 p-4 sm:p-6">
                  {/*   Tag de Início de Sessão*/}
                    <div className="flex justify-center my-2 shrink-0">
                        <span
                            className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm flex items-center gap-1.5 shadow-sm border border-outline-variant/15"><span
                            className="material-symbols-outlined text-[14px]">lock</span>Conversa criptografada de ponta a ponta • Protocolo Totvs #99281-2024</span>
                    </div>


                    <ListMessage/>


                    {/* Indicador de digitação vindo do realtime */}
                    {() =>
                        isTyping(getActive()?.id ?? "") ? (
                            <div className="flex items-center gap-2 px-1 pt-1">
                                <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">more_horiz</span>
                                <span className="text-label-sm text-on-surface-variant">
                                    {getActive()?.clientName} está digitando...
                                </span>
                            </div>
                        ) : null
                    }
                </div>

             {/*    Barra de Sugestão Ativa da IA*/}
                <div
                    className="px-4 sm:px-6 py-2 bg-surface-container border-t border-outline-variant/20 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                        <span
                            className="material-symbols-outlined text-primary text-[18px] shrink-0">auto_awesome</span>
                        <span className="font-body-sm text-on-surface truncate">
              <strong>Sugestão Rede Assist:</strong> "Carlos, seu pedido #8942 já está sendo embalado pela cozinha. O motoboy parceiro do iFood sai em 8 minutos!"
            </span>
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            handleQuickAiReply(
                                "Carlos, seu pedido #8942 já está sendo embalado pela cozinha. O motoboy parceiro do iFood sai em 8 minutos!",
                            )
                        }
                        className="px-2.5 py-1 rounded-lg bg-surface-container-highest hover:bg-surface-container-lowest text-primary font-label-md font-semibold transition-colors shrink-0 shadow-sm"
                    >
                        Inserir (Tab)
                    </button>
                </div>

                 {/*Área de Composição e Envio*/}
                <div
                    className="p-4 bg-surface-container-lowest border-t border-outline-variant/20 flex flex-col gap-2 shrink-0">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => showToast("Anexar Arquivo", "Selecione imagem, PDF fiscal ou comprovante.", "info")}
                            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
                            title="Anexar Arquivo ou Foto"
                        >
                            <span className="material-symbols-outlined text-[20px]">attach_file</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickAiReply("🍕 Segue o link com nosso cardápio completo atualizado e promoções do dia: https://cardapio.redehub.com.br")}
                            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
                            title="Cardápio Digital Rápido"
                        >
                            <span className="material-symbols-outlined text-[20px]">restaurant</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickAiReply("A chave Pix para pagamento direto com 5% de desconto é: financeiro@redehub.com.br")}
                            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
                            title="Chave Pix"
                        >
                            <span className="material-symbols-outlined text-[20px]">pix</span>
                        </button>

                        {/* Input Principal*/}
                        <div
                            className="flex-1 flex items-center bg-surface-container-low rounded-xl px-4 py-2 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20">
                            <input
                                type="text"
                                value={() => inputText()}
                                onInput={(event) => handleInputChange(event.currentTarget.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") handleSendMessage();
                                }}
                                placeholder="Digite sua mensagem para Carlos... (Enter para enviar)"
                                className="w-full bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-on-surface-variant/70"
                            />
                            <button
                                type="button"
                                onClick={() => handleQuickAiReply("Temos sim! Nossos doces e sobremesas finas estão saindo com desconto especial hoje.")}
                                className="text-on-surface-variant hover:text-primary transition-colors p-1"
                                title="Melhorar com IA"
                            >
                                <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => showToast("Gravação de Áudio", "Microfone ativado para mensagem de voz de alta fidelidade.", "info")}
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

                  {/*   Atalhos Rápidos*/}
                    <div className="flex items-center gap-2 overflow-x-auto text-nowrap scrollbar-none pt-1">
                        <span className="font-label-sm text-on-surface-variant font-bold">Atalhos:</span>
                        <button
                            type="button"
                            onClick={() => handleQuickAiReply("Carlos, a previsão estimada do iFood é de 35 a 45 minutos no endereço da Av. Paulista!")}
                            className="px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors"
                        >
                            /previsao (Previsão de Entrega)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickAiReply("Você gostaria de adicionar refrigerante ou suco artesanal de maracujá 500ml ao seu pedido?")}
                            className="px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors"
                        >
                            /bebidas (Ofertar Bebidas)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickAiReply("Obrigado pela preferência! Caso precise de algo a mais, é só chamar por aqui.")}
                            className="px-2.5 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm border border-outline-variant/15 transition-colors"
                        >
                            /agradecer (Finalizar Cortesia)
                        </button>
                    </div>
                </div>
            </main>

            {/* ============ COLUNA 3: CHAT COM A IA (REDE ASSIST) ============ */}
            <AiChatPanel/>

            {/* ============ DRAWER FLUTUANTE: PERFIL 360° DO CLIENTE ============ */}

         <DrawerContact/>


        </div>
    );
}
