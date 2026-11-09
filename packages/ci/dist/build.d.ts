type BuildOptionsAdaptive = {
    dev?: boolean;
    publicEnv?: Record<string, string>;
    external?: (string | RegExp)[];
};
export declare function buildApp(appDir: string, options?: BuildOptionsAdaptive): Promise<void>;
export declare function buildAppDev(appDir: string): Promise<void>;
export declare function buildAppDevIncremental(appDir: string, changes: Array<{
    eventType: "rename" | "change";
    filePath: string;
}>): Promise<void>;
export {};
