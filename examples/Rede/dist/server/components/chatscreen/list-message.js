import * as serverModule from "./list-message.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/chatscreen/list-message", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const ListMessage = createHydrateComponent("components/chatscreen/list-message", "ListMessage", typeof serverModule["ListMessage"] === "function" ? serverModule["ListMessage"] : undefined);
