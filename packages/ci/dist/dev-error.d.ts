export type DevBuildError = {
    message: string;
    sourcePath?: string;
    details: string[];
    at: number;
};
export declare function setDevBuildError(error: unknown): DevBuildError | null;
export declare function clearDevBuildError(): void;
export declare function getDevBuildError(): DevBuildError | null;
/**
 * Pagina de erro renderizada no servidor e injetada no slot da app. Nao depende
 * de JS: o erro precisa aparecer mesmo com o bundle quebrado ou o JS desligado.
 */
export declare function renderDevErrorHtml(error: DevBuildError): string;
