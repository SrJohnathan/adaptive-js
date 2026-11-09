import { readContext } from "../reactive/index.js";
export { CONTEXT_PROVIDER_TAG } from "@adaptive-js/shared";
import { CONTEXT_PROVIDER_TAG } from "@adaptive-js/shared";
export function createContext(defaultValue) {
    const ctx = {
        id: Symbol("adaptive.context"),
        defaultValue
    };
    function Provider(props) {
        return {
            tag: CONTEXT_PROVIDER_TAG,
            props: {
                context: ctx,
                value: props.value
            },
            children: props.children
        };
    }
    return {
        Provider,
        _context: ctx
    };
}
export function useContext(context) {
    return readContext(context._context.id, context._context.defaultValue);
}
//# sourceMappingURL=context-runtime.js.map