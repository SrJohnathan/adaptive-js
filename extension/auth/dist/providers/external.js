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
export function createExternalProvider(options) {
    const id = options.id ?? "external";
    const path = options.path ?? "/login";
    const fetchFn = options.fetch ?? globalThis.fetch;
    async function callApi(endpoint, input) {
        const url = `${options.baseUrl}${endpoint}`;
        const response = await fetchFn(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input)
        });
        if (!response.ok) {
            const text = await response.text().catch(() => String(response.status));
            throw new Error(`[createExternalProvider] ${id}: HTTP ${response.status} from ${url} — ${text}`);
        }
        return response.json();
    }
    return {
        id,
        async authorize(input = {}) {
            const payload = await callApi(path, input);
            return {
                user: options.mapUser(payload),
                token: options.mapToken?.(payload)
            };
        },
        async refresh(input = {}) {
            const payload = await callApi("/refresh", input);
            return {
                user: options.mapUser(payload),
                token: options.mapToken?.(payload)
            };
        }
    };
}
//# sourceMappingURL=external.js.map