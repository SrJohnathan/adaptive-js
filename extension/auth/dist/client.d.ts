import type { AuthClientState, AuthUser } from "./types.js";
export interface AuthProviderProps<TUser extends AuthUser = AuthUser> {
    initialState?: AuthClientState<TUser>;
    autoClearOnExpired?: boolean;
    onExpired?: () => void;
    children?: any;
}
export interface AuthClientApi<TUser extends AuthUser = AuthUser> {
    state: () => AuthClientState<TUser>;
    user: () => TUser | null;
    authenticated: () => boolean;
    isExpired: () => boolean;
    expiresInMs: () => number | null;
    setState: (state: AuthClientState<TUser>) => void;
    clear: () => void;
}
export interface CreateAuthClientOptions {
    autoClearOnExpired?: boolean;
    onExpired?: () => void;
}
export declare function createAuthClient<TUser extends AuthUser = AuthUser>(clientOptions?: CreateAuthClientOptions): {
    AuthProvider: (props: AuthProviderProps<TUser>) => {
        tag: symbol;
        props: {
            context: import("@adaptive-js/web").AdaptiveContext<AuthClientApi<TUser> | null>;
            value: AuthClientApi<TUser> | null;
        };
        children: any;
    };
    useAuth: () => AuthClientApi<TUser>;
};
export declare function toAuthClientState<TUser extends AuthUser>(session: {
    user: TUser;
    expiresAt: Date;
} | null): AuthClientState<AuthUser>;
export declare function toAuthClientState<TUser extends AuthUser, TClientUser extends AuthUser>(session: {
    user: TUser;
    expiresAt: Date;
} | null, selectUser: (user: TUser) => TClientUser): AuthClientState<TClientUser>;
export declare function isAuthStateExpired(state: AuthClientState): boolean;
export declare function getAuthStateExpiresInMs(state: AuthClientState): number | null;
