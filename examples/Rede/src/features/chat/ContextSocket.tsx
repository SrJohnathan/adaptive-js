"hydrate";

import { init } from "@adaptive-js/web";
import { io, type Socket } from "socket.io-client";
import { realtimeCredentialsAction } from "../../shared/server-actions/realtime.ts";
import { showToast } from "../../shared/omni-hub/toast-store.ts";
import {
  appendMessage,
  applyBootstrap,
  applyConversation,
  isTyping,
  markConversationRead,
  removeConversation,
  setConnection,
  setLastError,
  setOnlineAgents,
  selectedConversationId,
  setTyping,
  type BootstrapPayload,
} from "./reactives-helpes.ts";
import type { ConversationItem } from "../../shared/omni-hub/types.ts";

/**
 * O front não fala com a porta do realtime: fala com o gateway de dev
 * (server/gateway-dev), que é quem conhece os serviços. `/socket.io` é
 * repassado intacto pelo gateway até o realtime.
 */
const GATEWAY_PORT = 4000;
const SOCKET_PATH = "/socket.io";

let activeSocket: Socket | null = null;

const realtimeUrl = (): string => {
  if (typeof window === "undefined") return `http://localhost:${GATEWAY_PORT}`;
  return `${window.location.protocol}//${window.location.hostname}:${GATEWAY_PORT}`;
};

/** Entra (e sai) da sala de uma conversa no realtime. */
export function joinConversation(conversationId: string): void {
  activeSocket?.emit("conversation:join", { conversationId });
}

export function leaveConversation(conversationId: string): void {
  activeSocket?.emit("conversation:leave", { conversationId });
}

/** Envia a mensagem do agente; o eco `message:new` do servidor renderiza na tela. */
export function sendAgentMessage(
  conversationId: string,
  text: string,
  senderName: string,
): boolean {
  if (!activeSocket?.connected) return false;
  activeSocket.emit("message:send", { conversationId, text, senderName });
  return true;
}

export function notifyTyping(conversationId: string, value: boolean): void {
  if (!activeSocket?.connected) return;
  activeSocket.emit("typing:set", { conversationId, isTyping: value });
}

/**
 * Apaga a conversa com todas as mensagens.
 *
 * O `conversation:removed` volta pelo mesmo socket e é quem tira o item da
 * lista — inclusive na aba de outro agente. Optimista aqui não faz sentido:
 * se o servidor recusar, a lista não muda e o agente continua vendo o item.
 */
export function deleteConversation(conversationId: string): void {
  if (!activeSocket?.connected) return;
  activeSocket.emit("conversation:delete", { conversationId });
}

export function readConversation(conversationId: string): void {
  if (!activeSocket?.connected) return;
  activeSocket.emit("conversation:read", { conversationId });
}

interface MessageEnvelope {
  conversationId: string;
  message: ConversationItem["messages"][number];
  conversation?: ConversationItem;
}

interface ConversationEnvelope {
  conversation: ConversationItem;
}

interface TypingEnvelope {
  conversationId: string;
  isTyping: boolean;
  sender: "client" | "agent" | "system";
  senderName?: string | null;
}

interface PresenceEnvelope {
  agentName: string;
  onlineAgents: number;
  online: boolean;
}

interface SessionReady {
  sid: string;
  agent: { name: string; email: string };
  onlineAgents: number;
}

export const ContextSocket = ({ children }: { children?: any }) => {
  init(() => {
    let disposed = false;
    let typingTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleStopTyping = (conversationId: string) => {
      if (typingTimer) clearTimeout(typingTimer);
      typingTimer = setTimeout(() => notifyTyping(conversationId, false), 1200);
    };

    const setup = async () => {
      let token = "";
      let user = "";
      try {
        const credentials = await realtimeCredentialsAction();
        if (disposed) return;
        token = credentials.token || "";
        user = credentials.user || "";
      } catch {
        // Sem sessão (ou RPC indisponível): o realtime cai no agente de dev.
      }

      const socket = io(realtimeUrl(), {
        path: SOCKET_PATH,
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionDelayMax: 10000,
        auth: { token, user },
      });

      activeSocket = socket;
      setConnection("connecting");

      socket.on("connect", () => {
        setConnection("online");
        setLastError("");
        const current = selectedConversationId();
        if (current) {
          socket.emit("conversation:join", { conversationId: current });
          readConversation(current);
          markConversationRead(current);
        }
      });


      socket.on("reconnect", () => {
      })

      socket.on("disconnect", () => setConnection("offline"));

      socket.on("connect_error", (error: Error) => {
        setConnection("offline");
        setLastError(error.message);
      });

      socket.on("session:ready", (payload: SessionReady) => {
        setOnlineAgents(payload.onlineAgents);
        const label = payload.agent?.name || user || "Agente";
        showToast("Realtime conectado", `Sessão de ${label} ativa.`, "info");
      });

      socket.on("conversations:snapshot", (payload: BootstrapPayload) => {
        console.log("Conversation:snapshot", payload);
        applyBootstrap(payload);
      });

      // Conversa que acabou de nascer: o contato ainda não tinha escrito. O
      // `message:new` que vem logo depois não basta, porque `appendMessage`
      // descarta mensagem de conversa que não está na lista — sem este
      // handler, o primeiro contato de uma sessão nova nunca aparecia.
      socket.on("conversation:new", (payload: ConversationEnvelope) => {
        applyConversation(payload.conversation);
      });

      socket.on("conversation:state", (payload: ConversationEnvelope) => {
        applyConversation(payload.conversation);
      });

      socket.on("message:new", (payload: MessageEnvelope) => {
        appendMessage(payload.conversationId, payload.message, payload.conversation);
        if (payload.message.sender === "client") {
          setTyping(payload.conversationId, false);
          scheduleStopTyping(payload.conversationId);
          if (payload.conversationId === selectedConversationId()) {
            readConversation(payload.conversationId);
            markConversationRead(payload.conversationId);
          }
        }
      });

      socket.on("conversation:updated", (payload: ConversationEnvelope) => {
        applyConversation(payload.conversation);
      });

      socket.on("conversation:removed", (payload: { id: string }) => {
        // Sai da sala antes de limpar: depois de apagada, não faz sentido
        // continuar entrando no `message:new` de uma conversa que não existe.
        if (payload.id === selectedConversationId()) leaveConversation(payload.id);
        removeConversation(payload.id);
      });

      socket.on("typing:update", (payload: TypingEnvelope) => {
        if (payload.sender === "agent") return;
        setTyping(payload.conversationId, Boolean(payload.isTyping));
      });

      socket.on("presence:online", (payload: PresenceEnvelope) => {
        setOnlineAgents(payload.onlineAgents);
      });

      socket.on("presence:offline", (payload: PresenceEnvelope) => {
        setOnlineAgents(payload.onlineAgents);
      });

      socket.on("session:error", (message: string) => {
        setLastError(message);
        showToast("Sessão realtime", message, "error");
      });

      socket.on("error", (payload: { error?: string }) => {
        const message = payload?.error || "Erro no realtime";
        setLastError(message);
        showToast("Realtime", message, "warning");
      });
    };

    void setup();

    return () => {
      disposed = true;
      if (typingTimer) clearTimeout(typingTimer);
      activeSocket?.removeAllListeners();
      activeSocket?.disconnect();
      activeSocket = null;
      setConnection("offline");
    };
  });

  return <div>{children}</div>;
};

export { isTyping };
