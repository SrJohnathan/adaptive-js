import type { AuthProvider, AuthUser } from "../types.js";
export interface ExternalProviderOptions<TUser extends AuthUser = AuthUser> {
    /**
     * Provider id — used as the key in `createAuth({ providers: { [id]: ... } })`.
     * @default "external"
     */
    id?: string;
    /** Base URL of the external auth API, e.g. `"https://api.example.com"`. */
    baseUrl: string;
    /**
     * Path to POST credentials to.
     * @default "/login"
     */
    path?: string;
    /**
     * Map the raw API response payload to a `TUser` object.
     * The payload is whatever your API returns (parsed JSON).
     */
    mapUser: (payload: unknown) => TUser;
    /**
     * Optionally extract an IdP access token from the payload.
     * The token is surfaced in `ProviderAuthResult.token` — it is NOT the Adaptive session cookie.
     */
    mapToken?: (payload: unknown) => string | undefined;
    /**
     * Injectable fetch implementation — defaults to `globalThis.fetch`.
     * Override in tests to avoid real network calls.
     */
    fetch?: typeof globalThis.fetch;
}
/**
 * Creates an identity provider that authenticates by POSTing JSON credentials
 * to an external HTTP API.
 *
 * The provider only handles identity (validate credentials → return user).
 * Writing the Adaptive session cookie is handled by `auth.signIn()` after
 * `authorize()` resolves.
 *
 * @example
 * ```ts
 * const auth = createAuth({
 *   adapter: createMemoryAuthAdapter({ users: [] }),
 *   providers: {
 *     external: createExternalProvider({
 *       baseUrl: process.env.AUTH_API_URL!,
 *       mapUser: (p: any) => ({
 *         id: p.user.id,
 *         email: p.user.email,
 *         roles: p.user.roles ?? [],
 *       }),
 *     }),
 *   },
 *   csrf: { allowedOrigins: ["https://app.example.com"] },
 * });
 *
 * const { session, cookie } = await auth.signIn("external", { email, password }, request);
 * ```
 */
export declare function createExternalProvider<TUser extends AuthUser = AuthUser>(options: ExternalProviderOptions<TUser>): AuthProvider<TUser>;
