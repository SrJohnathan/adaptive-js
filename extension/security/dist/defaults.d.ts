import type { CspDirectives, CreateSecurityOptions, HstsOptions, PermissionsPolicyOptions, ResolvedSecurityConfig } from "./types.js";
export declare const DEFAULT_CSP: CspDirectives;
export declare const DEFAULT_PERMISSIONS_POLICY: PermissionsPolicyOptions;
export declare const DEFAULT_HSTS: HstsOptions;
export declare const PRODUCTION_RATE_LIMIT: {
    readonly global: {
        readonly max: 300;
        readonly windowMs: 60000;
    };
    readonly actions: {
        readonly max: 60;
        readonly windowMs: 60000;
    };
};
export declare const DEVELOPMENT_RATE_LIMIT: {
    readonly global: {
        readonly max: 1000;
        readonly windowMs: 60000;
    };
    readonly actions: {
        readonly max: 200;
        readonly windowMs: 60000;
    };
};
export declare function resolveSecurityConfig(options?: CreateSecurityOptions): ResolvedSecurityConfig;
export declare function validateSecurityConfig(config: ResolvedSecurityConfig): void;
