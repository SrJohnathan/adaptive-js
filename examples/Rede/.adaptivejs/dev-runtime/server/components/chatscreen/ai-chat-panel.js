import * as serverModule from "./ai-chat-panel.__client_ssr.js?t=1791414636356";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/chatscreen/ai-chat-panel", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const AiChatPanel = createHydrateComponent("components/chatscreen/ai-chat-panel", "AiChatPanel", typeof serverModule["AiChatPanel"] === "function" ? serverModule["AiChatPanel"] : undefined);
