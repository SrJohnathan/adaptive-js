export type ThunkTransformResult = {
    code: string;
    wrapped: number;
    scopes: number;
};
export declare function applyThunkTransform(code: string, _filePath?: string): ThunkTransformResult;
