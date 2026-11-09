import { createContext, useContext, signal } from "@adaptive-js/web";
const EMPTY_AUTH_STATE = {
    authenticated: false,
    user: null,
    expiresAt: null
};
export function createAuthClient(clientOptions = {}) {
    const AuthContext = createContext(null);
    function AuthProvider(props) {
        const [state, setState] = signal(props.initialState ?? EMPTY_AUTH_STATE);
        const autoClear = props.autoClearOnExpired ?? clientOptions.autoClearOnExpired ?? false;
        const onExpiredCallback = props.onExpired ?? clientOptions.onExpired;
        let timerId = null;
        function scheduleExpiryCheck(currentState) {
            if (typeof setTimeout === "undefined")
                return;
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            if (!currentState.authenticated || !currentState.expiresAt) {
                return;
            }
            const remaining = getAuthStateExpiresInMs(currentState);
            if (remaining === null)
                return;
            if (remaining <= 0) {
                if (autoClear) {
                    setState(EMPTY_AUTH_STATE);
                }
                onExpiredCallback?.();
                return;
            }
            // Schedule callback slightly after expiration
            timerId = setTimeout(() => {
                if (autoClear) {
                    setState(EMPTY_AUTH_STATE);
                }
                onExpiredCallback?.();
            }, remaining + 50);
        }
        // Schedule on initial state
        scheduleExpiryCheck(state());
        function updateState(next) {
            setState(next);
            scheduleExpiryCheck(next);
        }
        function clear() {
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            setState(EMPTY_AUTH_STATE);
        }
        const api = {
            state,
            user: () => state().user,
            authenticated: () => {
                const s = state();
                if (!s.authenticated)
                    return false;
                if (isAuthStateExpired(s)) {
                    if (autoClear) {
                        clear();
                    }
                    return false;
                }
                return true;
            },
            isExpired: () => isAuthStateExpired(state()),
            expiresInMs: () => getAuthStateExpiresInMs(state()),
            setState: updateState,
            clear
        };
        return AuthContext.Provider({
            value: api,
            children: props.children
        });
    }
    function useAuth() {
        const auth = useContext(AuthContext);
        if (!auth) {
            throw new Error("useAuth must be used inside an AuthProvider.");
        }
        return auth;
    }
    return {
        AuthProvider,
        useAuth
    };
}
export function toAuthClientState(session, selectUser) {
    if (!session) {
        return EMPTY_AUTH_STATE;
    }
    // Never expose arbitrary adapter fields (for example passwordHash) by default.
    const user = selectUser
        ? selectUser(session.user)
        : {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            roles: session.user.roles ? [...session.user.roles] : undefined
        };
    return {
        authenticated: true,
        user,
        expiresAt: session.expiresAt.toISOString()
    };
}
export function isAuthStateExpired(state) {
    if (!state.expiresAt) {
        return false;
    }
    const expiresAt = Date.parse(state.expiresAt);
    return Number.isFinite(expiresAt) && expiresAt <= Date.now();
}
export function getAuthStateExpiresInMs(state) {
    if (!state.expiresAt) {
        return null;
    }
    const expiresAt = Date.parse(state.expiresAt);
    if (!Number.isFinite(expiresAt)) {
        return null;
    }
    return Math.max(0, expiresAt - Date.now());
}
//# sourceMappingURL=client.js.map