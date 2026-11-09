export declare class AdaptiveBuildError extends Error {
    readonly sourcePath: string;
    readonly errors: any[];
    constructor(message: string, sourcePath: string, errors: any[]);
}
export declare function buildServerFile(sourcePath: string, outputPath: string, options: any): Promise<void>;
