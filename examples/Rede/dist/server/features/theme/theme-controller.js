import * as serverModule from "./theme-controller.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("features/theme/theme-controller", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const ThemeController = createHydrateComponent("features/theme/theme-controller", "ThemeController", typeof serverModule["ThemeController"] === "function" ? serverModule["ThemeController"] : undefined);
