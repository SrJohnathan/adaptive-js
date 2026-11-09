import * as serverModule from "./storage-screen.__client_ssr.js";
import { createHydrateComponent } from "@adaptive-js/web";
export default createHydrateComponent("components/omni-hub/storage-screen", "default", typeof serverModule.default === "function" ? serverModule.default : undefined);
export const StorageScreen = createHydrateComponent("components/omni-hub/storage-screen", "StorageScreen", typeof serverModule["StorageScreen"] === "function" ? serverModule["StorageScreen"] : undefined);
