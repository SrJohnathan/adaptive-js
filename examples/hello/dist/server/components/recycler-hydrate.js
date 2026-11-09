import * as serverModule from "./recycler-hydrate.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/recycler-hydrate", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const ListaRecycler = createHydrateComponent("components/recycler-hydrate", "ListaRecycler", typeof serverModule["ListaRecycler"] === "function" ? serverModule["ListaRecycler"] : undefined);
