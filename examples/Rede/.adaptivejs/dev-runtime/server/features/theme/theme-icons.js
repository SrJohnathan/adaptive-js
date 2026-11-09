import * as serverModule from "./theme-icons.__client_ssr.js?t=1791414636356";
import { createClientComponent } from "@adaptive-js/web";
export default createClientComponent("features/theme/theme-icons", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const MoonIcon = createClientComponent("features/theme/theme-icons", "MoonIcon", typeof serverModule["MoonIcon"] === "function" ? serverModule["MoonIcon"] : undefined);
export const SunIcon = createClientComponent("features/theme/theme-icons", "SunIcon", typeof serverModule["SunIcon"] === "function" ? serverModule["SunIcon"] : undefined);
