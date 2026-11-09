import * as serverModule from "./drawer-contact.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/chatscreen/drawer-contact", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const DrawerContact = createHydrateComponent("components/chatscreen/drawer-contact", "DrawerContact", typeof serverModule["DrawerContact"] === "function" ? serverModule["DrawerContact"] : undefined);
