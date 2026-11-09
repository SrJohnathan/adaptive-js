import * as serverModule from "./command-palette.__client_ssr.js?t=1791414636356";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/command-palette", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const CommandPalette = createHydrateComponent("components/omni-hub/command-palette", "CommandPalette", typeof serverModule["CommandPalette"] === "function" ? serverModule["CommandPalette"] : undefined);
