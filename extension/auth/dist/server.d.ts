import type { AuthActionContext, AuthActionOptions, AuthAdapter, AuthCookieResult, AuthPageContext, AuthRequestLike, AuthSession, AuthSessionData, AuthUser, CreateAuthOptions, CreateSessionOptions, ManagedUserSession, ProtectedPageContext, ProtectPageOptions, ReadSessionResult } from "./types.js";
export type { AuthPageContext, ProtectPageOptions, ProtectedPageContext } from "./types.js";
export declare function createAuth<TUser extends AuthUser = AuthUser, TData extends AuthSessionData = AuthSessionData, TAdapter extends AuthAdapter<TUser, TData> = AuthAdapter<TUser, TData>>(options: CreateAuthOptions<TUser, TData, TAdapter>): {
    createSession: (user: TUser, sessionOptions?: CreateSessionOptions<TData>, request?: AuthRequestLike) => Promise<{
        session: AuthSession<TUser, TData>;
        cookie: AuthCookieResult;
    }>;
    readSession: (request: AuthRequestLike | Headers | Record<string, string | string[] | undefined> | string) => Promise<ReadSessionResult<TUser, TData>>;
    requireSession: (request: AuthRequestLike | Headers | Record<string, string | string[] | undefined> | string) => Promise<{
        session: AuthSession<TUser, TData>;
        freshCookie?: AuthCookieResult;
    }>;
    invalidateSession: (sessionId: string) => Promise<AuthCookieResult>;
    invalidateRequestSession: (request: AuthRequestLike | Headers | Record<string, string | string[] | undefined> | string) => Promise<AuthCookieResult>;
    invalidateUserSessions: (userId: string) => Promise<void>;
    invalidateUserSessionsExcept: (userId: string, currentSessionId: string) => Promise<void>;
    listUserSessions: (userId: string) => Promise<ManagedUserSession[]>;
    getCsrfToken: (session: Pick<AuthSession<TUser, TData>, "id">) => Promise<string>;
    requireCsrf: (request: AuthRequestLike | Headers | Record<string, string | string[] | undefined> | string, session: AuthSession<TUser, TData> | null, submittedToken?: string | null) => Promise<void>;
    passwordChanged: (userId: string) => Promise<void>;
    roleElevated: (userId: string) => Promise<void>;
    forceReauth: (userId: string, reason?: string) => Promise<void>;
    mfaEnabled: (userId: string) => Promise<void>;
    updateSessionData: (sessionId: string, dataOrUpdater: Partial<TData> | ((prev: TData) => Partial<TData>)) => Promise<void>;
    withSession: <TResult = any>(request: AuthRequestLike | Headers | Record<string, string | string[] | undefined> | string, handler: (context: {
        session: AuthSession<TUser, TData>;
        freshCookie?: AuthCookieResult;
    }) => Promise<TResult> | TResult) => Promise<TResult>;
    login: (userOrInput: TUser | Record<string, unknown>, request?: AuthRequestLike, sessionOptions?: CreateSessionOptions<TData>) => Promise<{
        session: AuthSession<TUser, TData>;
        cookie: AuthCookieResult;
        user: TUser;
        token?: string;
    }>;
    logout: (request?: AuthRequestLike | Headers | Record<string, string | string[] | undefined> | string) => Promise<{
        cookie: AuthCookieResult;
    }>;
    logoutEverywhere: (userId: string) => Promise<void>;
    protectPage: <TContext extends AuthPageContext>(page: (context: ProtectedPageContext<TContext, TUser, TData>) => any | Promise<any>, protection?: ProtectPageOptions) => (context: TContext) => Promise<any>;
    protectAction: <TArgs extends any[], TReturn>(actionFn: (...args: TArgs) => Promise<TReturn> | TReturn, protection?: {
        roles?: string[];
    }) => (...args: TArgs) => Promise<TReturn>;
    protectRoute: (handler: (context: any) => any, protection?: ProtectPageOptions) => (context: any) => Promise<any>;
    action: <TReturn = any>(optionsOrHandler: AuthActionOptions | ((context: AuthActionContext<TUser, TData, TAdapter>) => Promise<TReturn> | TReturn), maybeHandler?: (context: AuthActionContext<TUser, TData, TAdapter>) => Promise<TReturn> | TReturn) => (...args: any[]) => Promise<TReturn>;
    hasRole: (session: AuthSession<TUser, TData> | null, role: string) => boolean;
    requireRole: (session: AuthSession<TUser, TData> | null, role: string) => AuthSession<TUser, TData>;
    adapter: TAdapter;
    cookie: {
        create: (sessionId: string) => AuthCookieResult;
        blank: () => AuthCookieResult;
    };
};
export type AdaptiveAuth<TUser extends AuthUser = AuthUser, TData extends AuthSessionData = AuthSessionData, TAdapter extends AuthAdapter<TUser, TData> = AuthAdapter<TUser, TData>> = ReturnType<typeof createAuth<TUser, TData, TAdapter>>;
export { buildLoginReturnUrl, readReturnToFromSearchParams, sanitizeReturnTo } from "./intended-url.js";
