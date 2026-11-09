import { rootSignal } from "@adaptive-js/web";
import type { ChatMessage, ConversationItem } from "../../shared/omni-hub/types.ts";

/**
 * Estado do chat.
 *
 * As conversas vêm do microserviço realtime (`conversations:snapshot`), então
 * aqui não há seed: o store nasce vazio e é preenchido pelo `ContextSocket`.
 * Catálogo/produtos são de outro serviço e vivem em `catalog-store.ts`.
 */
export const [conversations, setConversations] = rootSignal<ConversationItem[]>([]);
export const [selectedConversationId, setSelectedConversationId] = rootSignal<string>("");
export const [channelFilter, setChannelFilter] = rootSignal<string>("all");

export const [connection, setConnection] = rootSignal<
  "connecting" | "online" | "offline"
>("connecting");
export const [onlineAgents, setOnlineAgents] = rootSignal<number>(0);
export const [typing, setTypingState] = rootSignal<Record<string, boolean>>({});
export const [lastError, setLastError] = rootSignal<string>("");

/** Conversa aberta: a selecionada. Sem selected cai na primeira da lista. */
export const getActive = (): ConversationItem | undefined => {
  const list = conversations();
  const id = selectedConversationId();
  if (!id) return list[0];
  return list.find((conv) => conv.id === id);
};

/** Mensagens da conversa aberta. */
export const messages = (): ChatMessage[] => getActive()?.messages ?? [];

export const selectConversation = (conversationId: string): void => {
  setSelectedConversationId(conversationId);
  markConversationRead(conversationId);
};

export const isTyping = (conversationId: string): boolean =>
  Boolean(typing()[conversationId]);

export const setTyping = (conversationId: string, value: boolean): void => {
  setTypingState((prev) => {
    if (Boolean(prev[conversationId]) === value) return prev;
    const next = { ...prev };
    if (value) next[conversationId] = true;
    else delete next[conversationId];
    return next;
  });
};

export interface BootstrapPayload {
  conversations: ConversationItem[];
}

/**
 * Junta dois históricos: o que já está na tela e o que veio do servidor.
 *
 * Ninguém é apagado e ninguém é duplicado. A mensagem que entra fora de hora
 * (um `conversation:state` atrasado, uma reconexão) é colocada no lugar certo
 * pelo `sentAt`, e não jogada no fim da lista — era o que fazia a conversa
 * "embaralhar" depois de queda. Mensagem sem `sentAt` (as que o front monta
 * na hora, tipo o card de sobremesa) fica no fim, onde o agente a criou.
 */
function juntaMensagens(atual: ChatMessage[], incoming: ChatMessage[]): ChatMessage[] {
  if (incoming.length === 0) return atual;

  const resultado = [...atual];
  for (const msg of incoming) {
    const i = resultado.findIndex((item) => item.id === msg.id);
    if (i !== -1) {
      resultado[i] = msg;
      continue;
    }
    // Primeira mensagem mais nova que ela: insere antes. Sem `sentAt` novo,
    // nenhuma posição serve, então vai para o fim.
    let destino = resultado.findIndex(
      (item) => msg.sentAt !== undefined && item.sentAt !== undefined && item.sentAt > msg.sentAt,
    );
    if (destino === -1) destino = resultado.length;
    resultado.splice(destino, 0, msg);
  }
  return resultado;
}

/**
 * Une a conversa que o front já tem com a que veio do servidor.
 *
 * O `updatedAt` decide quem manda: uma resposta velha (o `conversation:state`
 * de um `join` que só agora voltou, por exemplo) não pode reescrever o que a
 * tela já mostrou. E as mensagens nunca somem — só entram.
 */
function fundeConversa(atual: ConversationItem, incoming: ConversationItem): ConversationItem {
  if (
    incoming.updatedAt !== undefined &&
    atual.updatedAt !== undefined &&
    incoming.updatedAt < atual.updatedAt
  ) {
    return atual;
  }

  const mensagens = juntaMensagens(atual.messages, incoming.messages ?? []);

  // Já é o mesmo conteúdo? Devolve a MESMA referência, senão `setConversations`
  // vê um array novo e propaga para os 7 assinantes da lista — que é o que
  // fazia a lista de contatos se refazer a cada `conversation:updated`.
  if (mesmoConteudo(atual, incoming, mensagens)) return atual;

  return {
    ...atual,
    ...incoming,
    messages: mensagens,
  };
}

/** Campos da conversa que a lista e o header leem. Igual em todos = nada mudou. */
function mesmoConteudo(
  atual: ConversationItem,
  incoming: ConversationItem,
  mensagens: ChatMessage[],
): boolean {
  return (
    atual.clientName === incoming.clientName &&
    atual.avatar === incoming.avatar &&
    atual.lastMessage === incoming.lastMessage &&
    atual.time === incoming.time &&
    atual.unreadCount === incoming.unreadCount &&
    atual.vipStatus === incoming.vipStatus &&
    atual.channelBadgeText === incoming.channelBadgeText &&
    atual.messages.length === mensagens.length &&
    mensagens.every((msg, i) => msg === atual.messages[i])
  );
}

/**
 * Reordena a fila pela conversa mais recente no topo, que é a ordem que o
 * servidor devolve no `conversations:snapshot`.
 *
 * Sem isso a lista fica torta: `applyConversation` e `appendMessage` mudavam a
 * conversa no lugar, sem tirá-la da posição antiga. A mensagem chegava, o
 * preview atualizava, e a conversa continuava no meio da lista — o sintoma de
 * "chegou algo mas a lista não atualizou". Pior com a lista rolada: a conversa
 * que subiu para o topo saía da janela virtual e o item continuava fora da
 * tela, porque a posição do array é a âncora do scroll.
 *
 * Só devolve um array novo quando a ordem realmente muda: devolver `prev`
 * intacto é o que evita a lista inteira se refazer a cada `message:new`.
 */
function ordenaPorRecencia(prev: ConversationItem[]): ConversationItem[] {
  // `updatedAt` é o mesmo relógio do servidor (epoch em segundos). Conversa
  // sem ele fica onde está, para não trocar de lugar por falta de dado.
  const posicao = new Map(prev.map((conv, i) => [conv.id, i]));
  const ordenada = [...prev].sort((a, b) => {
    const ta = a.updatedAt ?? Number.NEGATIVE_INFINITY;
    const tb = b.updatedAt ?? Number.NEGATIVE_INFINITY;
    if (ta === tb) return (posicao.get(a.id) ?? 0) - (posicao.get(b.id) ?? 0);
    return tb - ta;
  });
  const mudou = ordenada.some((conv, i) => conv !== prev[i]);
  return mudou ? ordenada : prev;
}

/**
 * Snapshot do realtime: atualiza a lista sem jogar fora o que já está na tela.
 *
 * Antes isto era um `setConversations(incoming)` que trocava tudo. A cada
 * reconexão o front recebia o snapshot e recomeçava a lista do zero, o que
 * fazia a conversa aberta piscar e o histórico remontar sozinho.
 */
export function applyBootstrap(payload: BootstrapPayload): void {
  const incoming = payload?.conversations;
  if (!Array.isArray(incoming) || incoming.length === 0) return;

  setConversations((prev) => {
    const porId = new Map(prev.map((conv) => [conv.id, conv]));
    for (const conv of incoming) {
      const atual = porId.get(conv.id);
      porId.set(conv.id, atual ? fundeConversa(atual, conv) : conv);
    }
    // A ordem do servidor manda na lista, para conversa nova aparecer em
    // cima como o agente espera.
    return incoming.map((conv) => porId.get(conv.id) ?? conv);
  });

  const lista = conversations();
  const current = selectedConversationId();
  if (!current || !lista.some((conv) => conv.id === current)) {
    setSelectedConversationId(lista[0]?.id ?? "");
  }
}

/** Atualiza (ou insere) uma conversa vinda do servidor. */
export function applyConversation(conversation: ConversationItem): void {
  setConversations((prev) => {
    const index = prev.findIndex((conv) => conv.id === conversation.id);
    // Conversa nova entra no topo, como o servidor já devolveria.
    if (index === -1) return ordenaPorRecencia([conversation, ...prev]);
    const fundida = fundeConversa(prev[index], conversation);
    // A fusão devolveu a mesma referência: o payload não mudou nada. Devolver
    // `prev` inteiro evita que os assinantes da lista refaçam o render.
    if (fundida === prev[index]) return prev;
    const next = [...prev];
    next[index] = fundida;
    // O `conversation:updated` do contato renomeado também pode trazer um
    // `updatedAt` novo, e a conversa tem que acompanhar a fila.
    return ordenaPorRecencia(next);
  });
}

/** Acrescenta uma mensagem à conversa e atualiza a pré-visualização da lista. */
export function appendMessage(
  conversationId: string,
  message: ChatMessage,
  conversation?: ConversationItem,
): void {
  setConversations((prev) => {
    const index = prev.findIndex((conv) => conv.id === conversationId);
    // Conversa que o front ainda não tinha (contato que escreveu pela
    // primeira vez, ou `message:new` que chegou antes do `conversation:new`).
    // O envelope traz a conversa inteira, então dá para abrir a ficha em vez
    // de descartar a mensagem: o preview dela é justamente o que o agente
    // precisa ver para saber que arrived algo.
    if (index === -1) {
      if (!conversation) return prev;
      return ordenaPorRecencia([
        {
          ...conversation,
          messages: juntaMensagens(conversation.messages ?? [], [message]),
          lastMessage: message.text || conversation.lastMessage,
          time: message.time || conversation.time,
        },
        ...prev,
      ]);
    }
    const alvo = prev[index];
    const base = conversation
      ? { ...alvo, ...conversation, messages: alvo.messages }
      : alvo;
    // Eco do mesmo `message:new` chegando duas vezes (retransmissão do
    // engine.io) não pode virar outra render: se a mensagem já está na
    // lista, devolve a conversa como está.
    if (base.messages.some((item) => item.id === message.id)) return prev;

    const atualizada: ConversationItem = {
      ...base,
      messages: juntaMensagens(base.messages, [message]),
      lastMessage: message.text || base.lastMessage,
      time: message.time || base.time,
    };

    const proxima = [...prev];
    proxima[index] = atualizada;
    return ordenaPorRecencia(proxima);
  });
}

/** Inserção local (usada quando o realtime está offline). */
export function pushMessage(conversationId: string, message: ChatMessage): void {
  appendMessage(conversationId, message);
}

/**
 * Tira a conversa da lista depois de apagada no servidor.
 *
 * Se ela era a selecionada, a seleção anda para a primeira que sobrou, senão
 * a tela de mensagens ficaria lendo uma conversa que não existe mais. O
 * `getActive()` cairia na primeira da lista sozinho, mas o cabeçalho e o
 * `conversation:join` leem `selectedConversationId` direto.
 */
export function removeConversation(conversationId: string): void {
  let selecionadaAntes: string | undefined;
  setConversations((prev) => {
    const alvo = prev.find((conv) => conv.id === conversationId);
    if (!alvo) return prev;
    if (conversationId === selectedConversationId()) selecionadaAntes = conversationId;
    return prev.filter((conv) => conv.id !== conversationId);
  });

  if (!selecionadaAntes) return;
  setTyping(conversationId, false);
  const resto = conversations();
  setSelectedConversationId(resto[0]?.id ?? "");
}

export function markConversationRead(conversationId: string): void {
  
  setConversations((prev) => {
    const alvo = prev.find((conv) => conv.id === conversationId);
    // Já estava lida: devolver `prev` evita propagar para os 7 assinantes da
    // lista. É chamado a cada join e a cada `message:new` de cliente, então
    // o caso "não mudou" é o comum, não a exceção.
    if (!alvo || alvo.unreadCount === 0) return prev;
    return prev.map((conv) =>
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv,
    );
  });
}
