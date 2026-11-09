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
export function createExternalAuthAdapter(options) {
    const baseUrl = options.baseUrl ? options.baseUrl.replace(/\/+$/, "") : "";
    const loginPath = options.loginPath ?? "/api/v1/auth/login";
    const registerPath = options.registerPath ?? "/api/v1/auth/register";
    const refreshPath = options.refreshPath ?? "/api/v1/auth/refresh";
    const fetchFn = options.fetch ?? globalThis.fetch;
    let currentToken = options.token;
    const users = options.isolated
        ? new Map()
        : (globalThis.__ADAPTIVE_AUTH_EXTERNAL_USERS__ ??= new Map());
    const sessions = options.isolated
        ? new Map()
        : (globalThis.__ADAPTIVE_AUTH_EXTERNAL_SESSIONS__ ??= new Map());
    const defaultMapUser = (payload) => {
        const raw = payload?.user ?? payload;
        return {
            id: String(raw?.id ?? ""),
            email: raw?.email ? String(raw.email) : undefined,
            name: raw?.name ? String(raw.name) : undefined,
            roles: Array.isArray(raw?.roles) ? raw.roles.map(String) : [],
            ...(typeof raw === "object" ? raw : {})
        };
    };
    const defaultMapToken = (payload) => {
        const token = payload?.token ?? payload?.access_token ?? payload?.authToken;
        return typeof token === "string" && token.length > 0 ? token : undefined;
    };
    const mapUser = options.mapUser ?? defaultMapUser;
    const mapToken = options.mapToken ?? defaultMapToken;
    function processPayload(payload) {
        if (payload && typeof payload === "object" && "user" in payload && payload.user) {
            const user = payload.user;
            const token = payload.token ?? mapToken(payload);
            if (token)
                currentToken = token;
            if (user?.id)
                users.set(user.id, user);
            return {
                user,
                token,
                data: typeof payload === "object" ? payload : undefined
            };
        }
        const user = mapUser(payload);
        const token = mapToken(payload);
        if (token) {
            currentToken = token;
        }
        if (user?.id) {
            users.set(user.id, user);
        }
        return {
            user,
            token,
            data: typeof payload === "object" && payload !== null ? payload : undefined
        };
    }
    async function postApi(path, body) {
        if (!baseUrl) {
            throw new Error(`[ExternalAuthAdapter] Neither baseUrl nor custom request function was provided.`);
        }
        const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
        const headers = {
            "Content-Type": "application/json"
        };
        if (currentToken) {
            headers["Authorization"] = `Bearer ${currentToken}`;
        }
        const response = await fetchFn(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const errorText = await response.text().catch(() => String(response.status));
            throw new Error(`[ExternalAuthAdapter] HTTP ${response.status} from ${url} — ${errorText}`);
        }
        const json = await response.json();
        return processPayload(json);
    }
    function cleanupExpiredSessions() {
        const now = Date.now();
        let count = 0;
        for (const [id, session] of sessions) {
            if (session.expiresAt.getTime() <= now || session.absoluteExpiresAt.getTime() <= now) {
                sessions.delete(id);
                count += 1;
            }
        }
        return count;
    }
    let cleanupTimer = null;
    const interval = options.cleanupIntervalMs ?? 60_000;
    if (interval > 0 && typeof setInterval !== "undefined") {
        cleanupTimer = setInterval(cleanupExpiredSessions, interval);
        if (cleanupTimer && typeof cleanupTimer.unref === "function") {
            cleanupTimer.unref();
        }
    }
    return {
        id: options.id ?? "external",
        get token() {
            return currentToken;
        },
        async login(input) {
            if (options.request) {
                const payload = await options.request(input);
                return processPayload(payload);
            }
            return postApi(loginPath, input);
        },
        async register(input) {
            if (options.register) {
                const payload = await options.register(input);
                return processPayload(payload);
            }
            return postApi(registerPath, input);
        },
        async refresh(input = {}) {
            if (options.refresh) {
                const payload = await options.refresh(input);
                return processPayload(payload);
            }
            return postApi(refreshPath, input);
        },
        async request(endpointOrInput, input) {
            if (typeof endpointOrInput === "string") {
                return postApi(endpointOrInput, input ?? {});
            }
            // If called as request({ email, password })
            return this.login(endpointOrInput);
        },
        getUser(userId) {
            return users.get(userId) ?? null;
        },
        getSession(sessionId) {
            const session = sessions.get(sessionId) ?? null;
            if (!session)
                return null;
            const now = Date.now();
            if (session.expiresAt.getTime() <= now || session.absoluteExpiresAt.getTime() <= now) {
                sessions.delete(sessionId);
                return null;
            }
            return session;
        },
        createSession(session) {
            sessions.set(session.id, session);
        },
        updateSession(session) {
            sessions.set(session.id, session);
        },
        deleteSession(sessionId) {
            sessions.delete(sessionId);
        },
        deleteUserSessions(userId) {
            for (const [sessionId, session] of sessions) {
                if (session.userId === userId) {
                    sessions.delete(sessionId);
                }
            }
        },
        deleteUserSessionsExcept(userId, exceptSessionId) {
            for (const [sessionId, session] of sessions) {
                if (session.userId === userId && sessionId !== exceptSessionId) {
                    sessions.delete(sessionId);
                }
            }
        },
        listUserSessions(userId) {
            const now = Date.now();
            const result = [];
            for (const [sessionId, session] of sessions) {
                if (session.userId === userId) {
                    if (session.expiresAt.getTime() <= now || session.absoluteExpiresAt.getTime() <= now) {
                        sessions.delete(sessionId);
                        continue;
                    }
                    result.push({
                        id: session.id,
                        userId: session.userId,
                        createdAt: session.createdAt,
                        expiresAt: session.expiresAt,
                        absoluteExpiresAt: session.absoluteExpiresAt
                    });
                }
            }
            return result;
        },
        setUser(user) {
            users.set(user.id, user);
        },
        deleteUser(userId) {
            users.delete(userId);
        },
        clear() {
            users.clear();
            sessions.clear();
            currentToken = undefined;
        },
        destroy() {
            if (cleanupTimer) {
                clearInterval(cleanupTimer);
                cleanupTimer = null;
            }
        }
    };
}
/**
 * Backward compatibility alias for createExternalAuthAdapter.
 */
export const createApiExternalAdapter = createExternalAuthAdapter;
//# sourceMappingURL=external-adapter.js.map