import { s as rootSignal } from "./chunk-CME3klQt.js";
import { n as INITIAL_PRODUCTS } from "./chunk-i84mfdyU.js";

//#region src/shared/omni-hub/catalog-store.ts
/**
* Catálogo (produtos) é de outro serviço: enquanto ele não entra, a tela usa
* o mock local. O chat não mexe aqui.
*/
const [products, setProducts] = rootSignal(INITIAL_PRODUCTS);

//#endregion
export { setProducts as n, products as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstbmIweFNIWnAuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9vbW5pLWh1Yi9jYXRhbG9nLXN0b3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJvb3RTaWduYWwgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuaW1wb3J0IHsgSU5JVElBTF9QUk9EVUNUUyB9IGZyb20gXCIuL21vY2stZGF0YVwiO1xuaW1wb3J0IHR5cGUgeyBQcm9kdWN0SXRlbSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKlxuICogQ2F0w6Fsb2dvIChwcm9kdXRvcykgw6kgZGUgb3V0cm8gc2VydmnDp286IGVucXVhbnRvIGVsZSBuw6NvIGVudHJhLCBhIHRlbGEgdXNhXG4gKiBvIG1vY2sgbG9jYWwuIE8gY2hhdCBuw6NvIG1leGUgYXF1aS5cbiAqL1xuZXhwb3J0IGNvbnN0IFtwcm9kdWN0cywgc2V0UHJvZHVjdHNdID0gcm9vdFNpZ25hbDxQcm9kdWN0SXRlbVtdPihJTklUSUFMX1BST0RVQ1RTKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFRQSxNQUFhLENBQUMsVUFBVSxlQUFlLFdBQTBCLGdCQUFnQiJ9