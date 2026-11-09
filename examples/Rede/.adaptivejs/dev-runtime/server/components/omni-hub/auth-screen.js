import * as serverModule from "./auth-screen.__client_ssr.js?t=1791414636356";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/auth-screen", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const AuthScreen = createHydrateComponent("components/omni-hub/auth-screen", "AuthScreen", typeof serverModule["AuthScreen"] === "function" ? serverModule["AuthScreen"] : undefined);
