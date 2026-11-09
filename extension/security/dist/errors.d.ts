export type SecurityErrorCode = "SECURITY_CONFIGURATION_INVALID" | "RATE_LIMIT_EXCEEDED" | "ACTION_GUARD_REJECTED";
export declare class SecurityError extends Error {
    readonly code: SecurityErrorCode;
    readonly status: number;
    constructor(code: SecurityErrorCode, message: string, status?: number);
}
export declare function toSecurityResponseBody(error: SecurityError): {
    ok: false;
    error: SecurityErrorCode;
    message: string;
};
