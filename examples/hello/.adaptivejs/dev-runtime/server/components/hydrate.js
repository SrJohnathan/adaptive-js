import * as serverModule from "./hydrate.__client_ssr.js?t=1791415595788";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/hydrate", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const HydrateComponet = createHydrateComponent("components/hydrate", "HydrateComponet", typeof serverModule["HydrateComponet"] === "function" ? serverModule["HydrateComponet"] : undefined);
export const HydrateComponetChildClient = createHydrateComponent("components/hydrate", "HydrateComponetChildClient", typeof serverModule["HydrateComponetChildClient"] === "function" ? serverModule["HydrateComponetChildClient"] : undefined);
export const HydrateComponetErrorDigito = createHydrateComponent("components/hydrate", "HydrateComponetErrorDigito", typeof serverModule["HydrateComponetErrorDigito"] === "function" ? serverModule["HydrateComponetErrorDigito"] : undefined);
