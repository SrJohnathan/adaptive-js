import * as serverModule from "./catalog-screen.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/catalog-screen", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const CatalogScreen = createHydrateComponent("components/omni-hub/catalog-screen", "CatalogScreen", typeof serverModule["CatalogScreen"] === "function" ? serverModule["CatalogScreen"] : undefined);
