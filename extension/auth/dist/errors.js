export class AuthError extends Error {
    code;
    status;
    constructor(code, message, status) {
        super(message);
        this.name = "AuthError";
        this.code = code;
        this.status = status;
    }
}
//# sourceMappingURL=errors.js.map