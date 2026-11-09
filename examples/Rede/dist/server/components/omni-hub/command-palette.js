import * as serverModule from "./command-palette.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/command-palette", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const CommandPalette = createHydrateComponent("components/omni-hub/command-palette", "CommandPalette", typeof serverModule["CommandPalette"] === "function" ? serverModule["CommandPalette"] : undefined);
