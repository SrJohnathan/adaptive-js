import { Plugin } from "rolldown";
export type FileChange = {
    eventType: "rename" | "change";
    filePath: string;
};
export declare function parseCliArgs(args: any): {
    targetDir: string;
    preset: any;
    staticBuild: boolean;
};
export declare const presetMap: Record<string, string>;
/**
 * Detecta se módulo deve ser hidratado no client
 */
export declare function getHydratableDirective(source: string): "client" | "hydrate" | null;
export declare function stripHydrateDirective(source: string): string;
export declare function stripClientDirective(source: string): string;
/**
 * Reescreve imports relativos sem extensão.
 * Ex: import "./foo" vira import "./foo.js".
 */
export declare function rewriteRelativeImportExtensions(code: string, sourcePath?: string): string;
/**
 * Extrai exports nomeados e default de um arquivo
 */
export declare function extractExports(source: string): {
    namedExports: string[];
    hasDefaultExport: boolean;
    defaultLocalName: string | null;
    /**
     * `export { X } from "spec"` — o nome NÃO existe no escopo local, então
     * quem consumir os export precisa importar da origem.
     */
    reexports: Reexport[];
};
export type Reexport = {
    /** nome como aparece no `export { ... as X }` */
    exported: string;
    /** specifier de origem */
    source: string;
};
/**
 * Normaliza id de módulo (remove extensão)
 */
export declare function normalizeEntryId(relativePath: string): string;
export declare function markClientExportsPlugin(srcDir: string): Plugin;
