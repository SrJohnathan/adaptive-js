import { ExternalPattern } from "./load-adaptive-config.js";
type BundleClientParams = {
    appDir: string;
    srcDir: string;
    clientDistDir: string;
    tempDir: string;
    dev?: boolean;
    define?: Record<string, string>;
    external?: ExternalPattern | ExternalPattern[];
};
/**
 * Faz o bundle do client usando Rolldown.
 * - Coleta entradas explícitas (client components)
 * - Cria wrappers de hidratação
 * - Gera chunks e manifest.json
 */
export declare function bundleClientEntries({ appDir, srcDir, clientDistDir, tempDir, dev, define, external }: BundleClientParams): Promise<void>;
/**
 * Detecta se um módulo é uma server action:
 * - Possui a diretiva "server" ou "use server"
 * - OU está localizado dentro de um diretório "actions" (ex: src/actions/..., src/modules/user/actions/...)
 */
export declare function isServerActionModule(filePath: string, source: string, srcDir?: string): boolean;
/**
 * Coleta módulos que possuem a diretiva "server" / "use server"
 * ou estão localizados dentro de pastas "actions" e gera o manifesto server-modules.json
 */
export declare function writeServerModulesManifest(srcDir: string, serverDistDir: string): Promise<string[]>;
export {};
