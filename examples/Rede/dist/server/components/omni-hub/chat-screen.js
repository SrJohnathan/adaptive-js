import * as serverModule from "./chat-screen.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/chat-screen", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const ChatScreen = createHydrateComponent("components/omni-hub/chat-screen", "ChatScreen", typeof serverModule["ChatScreen"] === "function" ? serverModule["ChatScreen"] : undefined);
