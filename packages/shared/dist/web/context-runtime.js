export const CONTEXT_PROVIDER_TAG = Symbol.for("adaptive.context.provider");
const serverContextStack = [];
export function runWithServerContext(id, value, fn) {
    serverContextStack.push({ id, value });
    try {
        return fn();
    }
    finally {
        serverContextStack.pop();
    }
}
export function readServerContext(id, defaultValue) {
    for (let index = serverContextStack.length - 1; index >= 0; index -= 1) {
        const frame = serverContextStack[index];
        if (frame.id === id) {
            return frame.value;
        }
    }
    return defaultValue;
}
//# sourceMappingURL=context-runtime.js.map