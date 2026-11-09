import { ListaRecycler } from "../components/recycler-hydrate.js";
import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
/**
* A página só monta a fronteira.
*
* A lista é hydrate: o servidor emite a estrutura (viewport, spacer e o pool
* de slots) e o client assume os mesmos nós para encher o conteúdo.
*/
export default function Lista() {
	return /* @__PURE__ */ _jsx(ListaRecycler, {});
}

//# sourceMappingURL=lista.js.map
