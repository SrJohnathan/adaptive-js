/**
 * Development adapter. Its contents are lost whenever the process restarts.
 */
export function createMemoryAuthAdapter(options = {}) {
    const users = options.isolated
        ? new Map()
        : (globalThis.__ADAPTIVE_AUTH_MEMORY_USERS__ ??= new Map());
    const sessions = options.isolated
        ? new Map()
        : (globalThis.__ADAPTIVE_AUTH_MEMORY_SESSIONS__ ??= new Map());
    for (const user of options.users ?? []) {
        users.set(user.id, user);
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
        },
        cleanup() {
            return cleanupExpiredSessions();
        },
        destroy() {
            if (cleanupTimer) {
                clearInterval(cleanupTimer);
                cleanupTimer = null;
            }
        }
    };
}
//# sourceMappingURL=memory-adapter.js.map