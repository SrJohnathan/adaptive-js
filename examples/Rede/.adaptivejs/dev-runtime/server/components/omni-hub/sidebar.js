import * as serverModule from "./sidebar.__client_ssr.js?t=1791414636356";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/sidebar", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const Sidebar = createHydrateComponent("components/omni-hub/sidebar", "Sidebar", typeof serverModule["Sidebar"] === "function" ? serverModule["Sidebar"] : undefined);
