import { rootSignal } from "@adaptive-js/web";
import { INITIAL_PRODUCTS } from "./mock-data.js";
/**
* Catálogo (produtos) é de outro serviço: enquanto ele não entra, a tela usa
* o mock local. O chat não mexe aqui.
*/
export const [products, setProducts] = rootSignal(INITIAL_PRODUCTS);

//# sourceMappingURL=catalog-store.js.map
