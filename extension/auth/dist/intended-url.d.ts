export interface SanitizeReturnToOptions {
    maxLength?: number;
}
/**
 * Validates a post-login return path. Only same-origin relative paths are allowed.
 */
export declare function sanitizeReturnTo(value: string | null | undefined, options?: SanitizeReturnToOptions): string | null;
export interface BuildLoginReturnUrlOptions extends SanitizeReturnToOptions {
    paramName?: string;
}
/**
 * Builds a login URL with a safe internal return path query parameter.
 */
export declare function buildLoginReturnUrl(loginPath: string, returnTo: string | null | undefined, options?: BuildLoginReturnUrlOptions): string;
/**
 * Reads and validates a return path from request search params.
 */
export declare function readReturnToFromSearchParams(searchParams: URLSearchParams | Record<string, string | null | undefined>, options?: BuildLoginReturnUrlOptions): string | null;
