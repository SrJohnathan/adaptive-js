import type { AuthSessionData, AuthUser, ExternalAuthAdapter, ExternalAuthInput, ExternalAuthResult } from "./types.js";
export interface ExternalAuthAdapterOptions<TUser extends AuthUser = AuthUser, TData extends AuthSessionData = AuthSessionData> {
    id?: string;
    /**
     * Base URL of the external auth API (e.g., "http://localhost:3001" or "https://auth.example.com").
     * Optional if a custom `request` function is provided.
     */
    baseUrl?: string;
    /**
     * Endpoint path for user login when using baseUrl.
     * @default "/api/v1/auth/login"
     */
    loginPath?: string;
    /**
     * Endpoint path for user registration when using baseUrl.
     * @default "/api/v1/auth/register"
     */
    registerPath?: string;
    /**
     * Endpoint path for refreshing tokens when using baseUrl.
     * @default "/api/v1/auth/refresh"
     */
    refreshPath?: string;
    /** Initial auth token (optional) */
    token?: string;
    /**
     * Custom request / login handler.
     * If provided, takes precedence over the default fetch(baseUrl + loginPath).
     *
     * @example
     * ```ts
     * request: async ({ email, password }) => {
     *   const res = await fetch("http://localhost:3001/api/v1/auth/login", { ... });
     *   return res.json(); // or AppUser
     * }
     * ```
     */
    request?: (input: ExternalAuthInput) => Promise<TUser | ExternalAuthResult<TUser> | unknown>;
    /**
     * Custom register handler.
     * If provided, takes precedence over fetch(baseUrl + registerPath).
     */
    register?: (input: ExternalAuthInput) => Promise<TUser | ExternalAuthResult<TUser> | unknown>;
    /**
     * Custom refresh handler.
     */
    refresh?: (input: ExternalAuthInput) => Promise<TUser | ExternalAuthResult<TUser> | unknown>;
    /**
     * Transform the API response payload into an AuthUser object.
     */
    mapUser?: (payload: unknown) => TUser;
    /**
     * Extract the token from the API response payload.
     */
    mapToken?: (payload: unknown) => string | undefined;
    /**
     * Custom fetch function (defaults to globalThis.fetch).
     */
    fetch?: typeof globalThis.fetch;
    /**
     * If true, keeps sessions in a local Map instead of global process cache. Useful for tests.
     */
    isolated?: boolean;
    /** Interval to clean up expired local sessions (in ms). Default: 60_000 */
    cleanupIntervalMs?: number;
}
/**
 * Creates an External Auth Adapter that delegates user authentication,
 * registration and token management to an external HTTP API (such as Rust Axum,
 * Go, FastAPI, etc.) or a custom `request` function, while maintaining local
 * session persistence for AdaptiveJS SSR.
 *
 * @example
 * ```ts
 * export const adapter = createExternalAuthAdapter<AppUser>({
 *   baseUrl: process.env.AUTH_SERVICE_URL ?? "http://localhost:3001",
 *   loginPath: "/api/v1/auth/login",
 *   registerPath: "/api/v1/auth/register",
 *   mapUser: (res: any) => res.user,
 *   mapToken: (res: any) => res.token,
 * });
 *
 * export const auth = createAuth({
 *   adapter, // Single adapter! No separate providers.
 *   csrf: { allowedOrigins: ["http://localhost:3000"] },
 * });
 * ```
 */
export declare function createExternalAuthAdapter<TUser extends AuthUser = AuthUser, TData extends AuthSessionData = AuthSessionData>(options: ExternalAuthAdapterOptions<TUser, TData>): ExternalAuthAdapter<TUser, TData>;
/**
 * Backward compatibility alias for createExternalAuthAdapter.
 */
export declare const createApiExternalAdapter: typeof createExternalAuthAdapter;
