import { AuthError } from "../errors.js";
/**
 * Creates an internal identity provider for credentials validation
 * against your internal database (e.g., PostgreSQL, MySQL, Prisma, Drizzle, etc.).
 *
 * This provider handles identity verification only. Session persistence
 * and cookie creation are managed by the configured `AuthAdapter` via `auth.signIn()`.
 *
 * @example
 * ```ts
 * const auth = createAuth({
 *   adapter: myCustomDbAdapter,
 *   providers: {
 *     credentials: createCredentialsProvider({
 *       authorize: async ({ email, password }) => {
 *         const user = await myDb.findUser(String(email));
 *         if (!user || !verifyHash(String(password), user.passwordHash)) {
 *           return null;
 *         }
 *         return { id: user.id, email: user.email, roles: user.roles };
 *       }
 *     }),
 *     external: createExternalProvider({
 *       baseUrl: "https://api.my-auth-service.com",
 *       mapUser: (res: any) => res.user
 *     })
 *   },
 *   csrf: { allowedOrigins: ["https://app.example.com"] }
 * });
 *
 * // Sign in:
 * const { session, cookie } = await auth.signIn("credentials", { email, password }, request);
 * ```
 */
export function createCredentialsProvider(options) {
    const id = options.id ?? "credentials";
    return {
        id,
        async authorize(input = {}) {
            const result = await options.authorize(input);
            if (!result) {
                throw new AuthError("AUTHENTICATION_REQUIRED", `[CredentialsProvider: "${id}"] Invalid credentials or user not found.`, 401);
            }
            // Check if caller returned a full ProviderAuthResult ({ user: ... }) or just a TUser ({ id: ... })
            if ("user" in result && result.user && typeof result.user === "object") {
                return result;
            }
            return {
                user: result
            };
        }
    };
}
//# sourceMappingURL=credentials.js.map