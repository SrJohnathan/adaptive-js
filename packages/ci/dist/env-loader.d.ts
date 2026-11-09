export type AdaptiveEnvMode = "development" | "production" | "test" | string;
export type PublicEnv = Record<string, string>;
export type ClientEnvDefine = Record<string, string>;
export interface LoadedAdaptiveEnv {
    mode: AdaptiveEnvMode;
    loadedFiles: string[];
    publicEnv: PublicEnv;
}
export declare function loadAdaptiveEnv(appDir: string, mode: AdaptiveEnvMode): Promise<LoadedAdaptiveEnv>;
export declare function getPublicEnv(prefix?: string): PublicEnv;
export declare function createClientEnvDefine(publicEnv?: PublicEnv): ClientEnvDefine;
export declare function prepareEnv(appDir: any, mode: AdaptiveEnvMode): Promise<void>;
