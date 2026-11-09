import * as serverModule from "./account-screen.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/account-screen", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const AccountScreen = createHydrateComponent("components/omni-hub/account-screen", "AccountScreen", typeof serverModule["AccountScreen"] === "function" ? serverModule["AccountScreen"] : undefined);
