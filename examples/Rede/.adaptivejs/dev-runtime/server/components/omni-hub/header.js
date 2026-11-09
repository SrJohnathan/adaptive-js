import * as serverModule from "./header.__client_ssr.js?t=1791414636356";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/header", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const Header = createHydrateComponent("components/omni-hub/header", "Header", typeof serverModule["Header"] === "function" ? serverModule["Header"] : undefined);
