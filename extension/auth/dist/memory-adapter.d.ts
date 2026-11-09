import type { AuthAdapter, AuthSessionData, AuthUser } from "./types.js";
export interface MemoryAuthAdapterOptions<TUser extends AuthUser = AuthUser> {
    users?: Iterable<TUser>;
    isolated?: boolean;
    cleanupIntervalMs?: number;
}
/**
 * Development adapter. Its contents are lost whenever the process restarts.
 */
export declare function createMemoryAuthAdapter<TUser extends AuthUser = AuthUser, TData extends AuthSessionData = AuthSessionData>(options?: MemoryAuthAdapterOptions<TUser>): AuthAdapter<TUser, TData> & {
    setUser(user: TUser): void;
    deleteUser(userId: string): void;
    clear(): void;
    cleanup(): number;
    destroy(): void;
};
