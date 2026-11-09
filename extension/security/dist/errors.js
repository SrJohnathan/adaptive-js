export class SecurityError extends Error {
    code;
    status;
    constructor(code, message, status = 500) {
        super(message);
        this.name = "SecurityError";
        this.code = code;
        this.status = status;
    }
}
export function toSecurityResponseBody(error) {
    return {
        ok: false,
        error: error.code,
        message: error.message,
    };
}
//# sourceMappingURL=errors.js.map