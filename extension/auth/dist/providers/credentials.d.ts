import type { AuthProvider, AuthUser, MaybePromise, ProviderAuthInput, ProviderAuthResult } from "../types.js";
export interface CredentialsProviderOptions<TUser extends AuthUser = AuthUser> {
    /**
     * Provider identifier.
     * @default "credentials"
     */
    id?: string;
    /**
     * Authorize handler that validates credentials directly against your local
     * database, ORM, or auth logic.
     *
     * @example
     * ```ts
     * authorize: async ({ email, password }) => {
     *   const user = await db.users.findUnique({ where: { email } });
     *   if (!user || !(await verifyPassword(password, user.passwordHash))) {
     *     return null; // or throw
     *   }
     *   return { id: user.id, email: user.email, roles: user.roles };
     * }
     * ```
     */
    authorize: (credentials?: ProviderAuthInput) => MaybePromise<TUser | ProviderAuthResult<TUser> | null | undefined>;
}
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
export declare function createCredentialsProvider<TUser extends AuthUser = AuthUser>(options: CredentialsProviderOptions<TUser>): AuthProvider<TUser>;
