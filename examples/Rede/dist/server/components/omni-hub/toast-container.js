import * as serverModule from "./toast-container.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/toast-container", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const ToastContainer = createHydrateComponent("components/omni-hub/toast-container", "ToastContainer", typeof serverModule["ToastContainer"] === "function" ? serverModule["ToastContainer"] : undefined);
