import * as serverModule from "./hydrate-lista-map.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/hydrate-lista-map", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const HydrateListaMap = createHydrateComponent("components/hydrate-lista-map", "HydrateListaMap", typeof serverModule["HydrateListaMap"] === "function" ? serverModule["HydrateListaMap"] : undefined);
