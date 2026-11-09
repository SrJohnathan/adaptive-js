import * as serverModule from "./studio-screen.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/studio-screen", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const StudioScreen = createHydrateComponent("components/omni-hub/studio-screen", "StudioScreen", typeof serverModule["StudioScreen"] === "function" ? serverModule["StudioScreen"] : undefined);
