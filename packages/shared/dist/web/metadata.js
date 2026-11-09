import { CLIENT_COMPONENT_SYMBOL } from "../hydration/client-boundary.js";
export function getClientComponentMetadata(value) {
    if (typeof value !== "function")
        return null;
    const meta = value[CLIENT_COMPONENT_SYMBOL];
    return meta ?? null;
}
//# sourceMappingURL=metadata.js.map