import * as serverModule from "./client.__client_ssr.js";
import { createClientComponent } from "@adaptive-js/web";
export default createClientComponent("components/client", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const ClientComponet = createClientComponent("components/client", "ClientComponet", typeof serverModule["ClientComponet"] === "function" ? serverModule["ClientComponet"] : undefined);
