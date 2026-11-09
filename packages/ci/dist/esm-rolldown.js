/*
 * Copyright (c) 2026 Antonio Johnathan
 * Licensed under the MIT License.
 */
import path from "node:path";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { build } from "rolldown";
import { extractExports, getHydratableDirective, markClientExportsPlugin, normalizeEntryId } from "./utilly.js";
import { applyThunkTransform } from "./thunk-transform.js";
function adaptiveThunkPlugin() {
    return {
        name: "adaptive-thunk",
        transform(code, id) {
            if (!/\.(tsx|jsx)$/.test(id))
                return null;
            const { code: thunked, wrapped } = applyThunkTransform(code, id);
            if (wrapped === 0)
                return null;
            return { code: thunked, map: null };
        },
    };
}
// esm-rolldown.ts
// esm-rolldown.ts
function normalizeExternalOption(external) {
    if (!external)
        return () => false;
    const list = Array.isArray(external) ? external : [external];
    return (id, parentId, isResolved) => {
        // Normaliza separadores do Windows/Unix para comparar caminhos
        const normalizedId = id.replace(/\\/g, "/");
        return list.some((pattern) => {
            if (typeof pattern === "function") {
                return Boolean(pattern(id, parentId, isResolved));
            }
            if (pattern instanceof RegExp) {
                return pattern.test(id) || pattern.test(normalizedId);
            }
            if (typeof pattern === "string") {
                const cleanPattern = pattern.endsWith("/*")
                    ? pattern.slice(0, -2)
                    : pattern;
                // 1. Checa import direto do módulo/subcaminho (ex: "monaco-editor" ou "monaco-editor/...")
                if (normalizedId === cleanPattern ||
                    normalizedId.startsWith(`${cleanPattern}/`)) {
                    return true;
                }
                // 2. IMPORTANTE: Checa se o Rolldown já resolveu o caminho para node_modules!
                if (normalizedId.includes(`node_modules/${cleanPattern}/`)) {
                    return true;
                }
            }
            return false;
        });
    };
}
/* ================= MAIN ================= */
/**
 * Faz o bundle do client usando Rolldown.
 * - Coleta entradas explícitas (client components)
 * - Cria wrappers de hidratação
 * - Gera chunks e manifest.json
 */
export async function bundleClientEntries({ appDir, srcDir, clientDistDir, tempDir, dev = false, define = {}, external }) {
    const entryPoints = [];
    const entryPointIds = new Map();
    const explicitEntryIds = new Set();
    // A flag não pula o bundle: hydrate continua funcionando com ela desligada.
    // Ela é avaliada dentro de @adaptive-js/web, por componente e por diretiva.
    // Entradas definidas manualmente
    for (const { file, id } of await collectExplicitClientEntries(appDir, tempDir)) {
        entryPoints.push(file);
        entryPointIds.set(path.resolve(file), id);
        explicitEntryIds.add(id);
    }
    // Wrappers automáticos para componentes hidratáveis
    for (const { wrapperPath, id } of await createClientComponentWrappers({
        srcDir,
        tempDir,
    })) {
        entryPoints.push(wrapperPath);
        entryPointIds.set(path.resolve(wrapperPath), id);
    }
    // Sem diretiva "client"/"hydrate" não existe entrada de client - SSR puro.
    // O rolldown exige options.input, então não chama o build nesse caso.
    if (entryPoints.length === 0) {
        return;
    }
    // Named inputs: name = entryId (facilita mapear saída ↔ id)
    const input = {};
    for (const file of entryPoints) {
        const resolved = path.resolve(file);
        const id = entryPointIds.get(resolved) ??
            normalizeEntryId(path.relative(appDir, resolved));
        // Evita colisão de nomes: se o mesmo id aparecer mais de uma vez, usa path-based key
        const key = input[id] ? `${id}__${path.basename(file, path.extname(file))}` : id;
        input[key] = file;
        if (!entryPointIds.has(resolved)) {
            entryPointIds.set(resolved, id);
        }
    }
    const result = await build({
        cwd: appDir,
        input,
        platform: "browser",
        treeshake: true,
        external: normalizeExternalOption(external),
        checks: {
            configurationFieldConflict: false
        },
        transform: {
            define,
            target: "es2020",
            jsx: {
                runtime: "automatic",
                importSource: "@adaptive-js/web",
            },
        },
        // CSS tratado pelo adaptiveCssPlugin (sem dependência externa quebrada)
        moduleTypes: {
            ".svg": "asset",
            ".woff": "asset",
            ".woff2": "asset",
            ".ttf": "asset",
            ".eot": "asset",
            ".otf": "asset",
            ".png": "asset",
            ".jpg": "asset",
            ".jpeg": "asset",
            ".gif": "asset",
            ".webp": "asset",
            ".avif": "asset",
        },
        plugins: [
            //  adaptiveBoundariesPlugin(),
            adaptiveThunkPlugin(),
            adaptiveCssPlugin({ minify: !dev }),
            serverOnlyProxyPlugin(srcDir),
            markClientExportsPlugin(srcDir)
        ],
        output: {
            dir: clientDistDir,
            format: "esm",
            minify: !dev,
            sourcemap: dev ? "inline" : false,
            entryFileNames: "assets/entry-[hash].js",
            chunkFileNames: "assets/chunk-[hash].js",
            assetFileNames: "assets/asset-[hash][extname]",
        },
    });
    // Gera manifest de assets a partir do output do Rolldown
    const manifest = {};
    const assetManifest = {};
    const assetBase = process.env.ADAPTIVE_ASSET_BASE || "";
    // CSS assets emitidos (type === "asset" e .css)
    const cssAssets = result.output.filter((item) => item.type === "asset" &&
        typeof item.fileName === "string" &&
        item.fileName.replace(/\\/g, "/").endsWith(".css"));
    // Mapa moduleId → fileName público do CSS (preenchido no plugin via meta implícita nos assets)
    const cssByModuleId = new Map();
    for (const asset of cssAssets) {
        const name = asset.fileName.replace(/\\/g, "/");
        // nome do source original pode vir em asset.name
        if (asset.name) {
            cssByModuleId.set(path.resolve(String(asset.name)), name);
        }
    }
    for (const item of result.output) {
        if (item.type !== "chunk" || !item.isEntry)
            continue;
        const publicName = joinPublicPath(assetBase, item.fileName.replace(/\\/g, "/"));
        const facade = item.facadeModuleId
            ? path.resolve(item.facadeModuleId)
            : null;
        let entryId;
        if (facade) {
            entryId = entryPointIds.get(facade);
            if (!entryId) {
                entryId = normalizeEntryId(path.relative(appDir, facade));
            }
        }
        if (!entryId && item.name) {
            entryId = item.name;
        }
        if (!entryId)
            continue;
        manifest[entryId] = publicName;
        const styles = collectStylesForChunk({
            chunk: item,
            cssAssets,
            entryId,
            assetBase,
        });
        assetManifest[entryId] = {
            script: publicName,
            styles,
            global: explicitEntryIds.has(entryId),
        };
    }
    await fs.writeFile(path.join(clientDistDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
    await fs.writeFile(path.join(clientDistDir, "asset-manifest.json"), JSON.stringify(assetManifest, null, 2), "utf8");
}
/* ================= DIRECTIVES ================= */
/**
 * Detecta se um módulo possui a diretiva "server" ou "use server"
 */
function hasServerDirective(source) {
    return /^\s*(?:(?:\/\*[\s\S]*?\*\/|\/\/[^\n]*\n)\s*)*["'](?:server|use server)["']\s*;?/.test(source);
}
/**
 * Detecta se um módulo é uma server action:
 * - Possui a diretiva "server" ou "use server"
 * - OU está localizado dentro de um diretório "actions" (ex: src/actions/..., src/modules/user/actions/...)
 */
export function isServerActionModule(filePath, source, srcDir) {
    if (hasServerDirective(source)) {
        return true;
    }
    const normalizedPath = filePath.replace(/\\/g, "/");
    if (srcDir) {
        const rel = path.relative(srcDir, filePath).replace(/\\/g, "/");
        if (rel.startsWith("actions/") || rel.includes("/actions/")) {
            return true;
        }
    }
    return normalizedPath.includes("/actions/");
}
/* ================= PATH UTILS ================= */
/**
 * Junta base pública com path gerado
 * Ex: "/_adaptive" + "assets/file.js"
 */
function joinPublicPath(basePath, relativePath) {
    const normalizedBase = basePath
        ? `/${basePath.replace(/^\/+|\/+$/g, "")}`
        : "";
    const normalizedRelative = relativePath.replace(/^\/+/, "");
    return `${normalizedBase}/${normalizedRelative}`.replace(/\/{2,}/g, "/");
}
/**
 * Coleta URLs públicas de CSS associados a um entry chunk.
 */
function collectStylesForChunk({ chunk, cssAssets, entryId, assetBase, }) {
    const styles = new Set();
    const chunkDir = path.posix.dirname(chunk.fileName.replace(/\\/g, "/"));
    // 1) CSS referenciado no código do chunk
    const code = chunk.code ?? "";
    const importRe = /(?:import\s+|require\s*\(\s*)["']([^"']+\.css)["']\s*\)?/g;
    let match;
    while ((match = importRe.exec(code)) !== null) {
        const spec = match[1].replace(/\\/g, "/");
        const resolved = path.posix.normalize(path.posix.join(chunkDir, spec));
        styles.add(joinPublicPath(assetBase, resolved.replace(/^\.\//, "")));
    }
    // 2) Módulos CSS incluídos neste chunk (moduleIds / modules)
    const moduleIds = new Set([
        ...(chunk.moduleIds ?? []),
        ...Object.keys(chunk.modules ?? {}),
    ]);
    for (const asset of cssAssets) {
        const fileName = asset.fileName.replace(/\\/g, "/");
        const sourceName = asset.name ? path.resolve(String(asset.name)) : null;
        if (sourceName && moduleIds.has(sourceName)) {
            styles.add(joinPublicPath(assetBase, fileName));
            continue;
        }
        // fallback por nome do entry
        const base = path.posix.basename(fileName, ".css");
        if (base === entryId ||
            base.startsWith(`${entryId}.`) ||
            base.startsWith(`${entryId}-`) ||
            (chunk.name &&
                (base === chunk.name ||
                    base.startsWith(`${chunk.name}.`) ||
                    base.startsWith(`${chunk.name}-`)))) {
            styles.add(joinPublicPath(assetBase, fileName));
        }
    }
    return Array.from(styles);
}
/**
 * Plugin mínimo de CSS para Rolldown (substitui rolldown-plugin-css quebrado).
 * - Carrega .css / .module.css
 * - Emite asset em assets/css-[hash].css
 * - CSS modules: export default { className: "..." }
 * - CSS normal: módulo vazio com side-effects (para o asset ser emitido)
 */
function adaptiveCssPlugin(options = {}) {
    const minify = options.minify === true;
    // id absoluto → reference id do emitFile
    const emitted = new Map();
    return {
        name: "adaptive-css",
        load: {
            filter: {
                id: /\.css$/i,
            },
            async handler(id) {
                // ignora virtual / query strings especializadas
                const cleanId = id.split("?")[0];
                if (!/\.css$/i.test(cleanId))
                    return null;
                let source;
                try {
                    source = await fs.readFile(cleanId, "utf8");
                }
                catch {
                    return null;
                }
                let css = source;
                if (minify) {
                    css = minifyCss(css);
                }
                const isModule = /\.module\.css$/i.test(cleanId);
                let classMap = null;
                if (isModule) {
                    const scoped = scopeCssModules(css, cleanId);
                    css = scoped.css;
                    classMap = scoped.exports;
                }
                const hash = createHash("sha256")
                    .update(css)
                    .digest("hex")
                    .slice(0, 8);
                const fileName = `assets/css-${hash}.css`;
                const refId = this.emitFile({
                    type: "asset",
                    fileName,
                    source: css,
                    // name guarda o path original para associar no manifest
                    name: cleanId,
                });
                emitted.set(path.resolve(cleanId), refId);
                if (classMap) {
                    return {
                        code: `export default ${JSON.stringify(classMap)};`,
                        moduleType: "js",
                        moduleSideEffects: true,
                    };
                }
                // CSS global: placeholder com side-effect para não ser tree-shaken
                return {
                    code: `/* adaptive-css: ${fileName} */\nexport {};`,
                    moduleType: "js",
                    moduleSideEffects: true,
                };
            },
        },
    };
}
/** Minify CSS bem simples (espaço/comentários). Suficiente para produção básica. */
function minifyCss(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}:;,])\s*/g, "$1")
        .replace(/;}/g, "}")
        .trim();
}
/**
 * CSS Modules mínimo: .foo → .foo_xxxxxx e export { foo: "foo_xxxxxx" }
 */
function scopeCssModules(css, filePath) {
    const hash = createHash("sha256")
        .update(filePath)
        .digest("hex")
        .slice(0, 6);
    const exports = {};
    const scoped = css.replace(/\.([A-Za-z_][\w-]*)\b/g, (_m, local) => {
        if (!exports[local]) {
            exports[local] = `${local}_${hash}`;
        }
        return `.${exports[local]}`;
    });
    return { css: scoped, exports };
}
/**
 * Garante caminho válido para import
 */
function toImportPath(relativePath) {
    const normalized = relativePath.replace(/\\/g, "/");
    return normalized.startsWith(".") ? normalized : `./${normalized}`;
}
/* ================= SERVER ACTION PROXY ================= */
/**
 * Plugin do Rolldown (estilo Rollup) que transforma módulos "use server"
 * em proxies client → server (RPC)
 */
function serverOnlyProxyPlugin(srcDir) {
    return {
        name: "adaptive-server-only-proxy",
        load: {
            filter: {
                id: /\.[cm]?[jt]sx?$/,
            },
            async handler(id) {
                // Só processa arquivos reais do filesystem
                if (id.includes("\0") || id.startsWith("virtual:"))
                    return null;
                let source;
                try {
                    source = await fs.readFile(id, "utf8");
                }
                catch {
                    return null;
                }
                if (!isServerActionModule(id, source, srcDir))
                    return null;
                return {
                    code: createClientServerProxyModule(source, normalizeEntryId(path.relative(srcDir, id))),
                    moduleType: "js",
                };
            },
        },
    };
}
/**
 * Gera módulo proxy para server actions
 */
function createClientServerProxyModule(sourceText, moduleId) {
    const { namedExports, hasDefaultExport } = extractExports(sourceText);
    const lines = [
        `import { callServerAction } from "@adaptive-js/web";`,
    ];
    if (hasDefaultExport) {
        lines.push(`export default (...args) => callServerAction(${JSON.stringify(moduleId)}, "default", args);`);
    }
    for (const exportName of namedExports) {
        if (exportName === "default")
            continue;
        lines.push(`export const ${exportName} = (...args) => callServerAction(${JSON.stringify(moduleId)}, ${JSON.stringify(exportName)}, args);`);
    }
    return lines.join("\n");
}
/**
 * Coleta módulos que possuem a diretiva "server" / "use server"
 * ou estão localizados dentro de pastas "actions" e gera o manifesto server-modules.json
 */
export async function writeServerModulesManifest(srcDir, serverDistDir) {
    const files = await collectSourceFiles(srcDir);
    const serverModules = new Set();
    for (const file of files) {
        try {
            const source = await fs.readFile(file, "utf8");
            if (isServerActionModule(file, source, srcDir)) {
                const relativePath = path.relative(srcDir, file);
                serverModules.add(normalizeEntryId(relativePath));
            }
        }
        catch {
            // ignore read errors
        }
    }
    const manifestList = Array.from(serverModules);
    if (!manifestList.includes("actions/index")) {
        const hasActionsIndex = files.some((f) => {
            const rel = path.relative(srcDir, f).replace(/\\/g, "/");
            return /^actions\/index\.(ts|tsx|js|jsx)$/.test(rel);
        });
        if (hasActionsIndex) {
            manifestList.push("actions/index");
        }
    }
    await fs.writeFile(path.join(serverDistDir, "server-modules.json"), JSON.stringify(manifestList, null, 2), "utf8");
    return manifestList;
}
/* ================= FILE COLLECTION ================= */
/**
 * Coleta arquivos do client que possuem diretivas de hidratação
 */
async function collectExplicitClientEntries(appDir, tempDir) {
    try {
        const files = await collectTopLevelSourceFiles(appDir);
        const entries = [];
        const explicitWrapperDir = path.join(tempDir, "explicit-client-entries");
        await fs.mkdir(explicitWrapperDir, { recursive: true });
        for (const file of files) {
            if (isGlobalDependencyEntryPath(appDir, file)) {
                const wrapperPath = await createExplicitClientEntryWrapper({
                    appDir,
                    explicitWrapperDir,
                    file,
                    entryId: "dependency",
                });
                entries.push({
                    file: wrapperPath,
                    id: "dependency",
                });
                continue;
            }
            const source = await fs.readFile(file, "utf8");
            if (!getHydratableDirective(source))
                continue;
            if (!isExplicitClientEntryPath(appDir, file))
                continue;
            entries.push({
                file,
                id: normalizeEntryId(path.relative(appDir, file)),
            });
        }
        return entries;
    }
    catch (error) {
        if (error?.code === "ENOENT")
            return [];
        throw error;
    }
}
async function collectTopLevelSourceFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        if (!entry.isFile()) {
            continue;
        }
        if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
            files.push(path.join(dir, entry.name));
        }
    }
    return files;
}
/**
 * Recursivamente coleta arquivos de código
 */
async function collectSourceFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await collectSourceFiles(fullPath)));
            continue;
        }
        if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
            files.push(fullPath);
        }
    }
    return files;
}
/* ================= WRAPPERS ================= */
/**
 * Cria wrappers para hidratação de componentes client
 */
async function createClientComponentWrappers({ srcDir, tempDir, }) {
    const files = await collectSourceFiles(srcDir);
    const wrappers = [];
    const wrapperDir = path.join(tempDir, "client-components");
    await fs.mkdir(wrapperDir, { recursive: true });
    for (const file of files) {
        const relativePath = path.relative(srcDir, file);
        const source = await fs.readFile(file, "utf8");
        if (isServerActionModule(file, source, srcDir))
            continue;
        if (!getHydratableDirective(source))
            continue;
        const moduleId = normalizeEntryId(relativePath);
        const wrapperPath = path.join(wrapperDir, `${moduleId.replace(/[\\/]/g, "__")}.tsx`);
        const importPath = toImportPath(path.relative(path.dirname(wrapperPath), file));
        const wrapperSource = `
import * as clientModule from ${JSON.stringify(importPath)};
import { hydrateClientComponents } from "@adaptive-js/web";

hydrateClientComponents(${JSON.stringify(moduleId)}, clientModule);
export {};
`;
        await fs.writeFile(wrapperPath, wrapperSource, "utf8");
        wrappers.push({ wrapperPath, id: moduleId });
    }
    return wrappers;
}
function isExplicitClientEntryPath(appDir, file) {
    const relativePath = path.relative(appDir, file).replace(/\\/g, "/");
    if (relativePath.startsWith("src/") ||
        relativePath.startsWith("public/") ||
        relativePath.startsWith("dist/") ||
        relativePath.startsWith(".adaptivejs/") ||
        relativePath.startsWith("node_modules/")) {
        return false;
    }
    return true;
}
function isGlobalDependencyEntryPath(appDir, file) {
    const relativePath = path.relative(appDir, file).replace(/\\/g, "/");
    return /^dependency\.(ts|tsx|js|jsx)$/.test(relativePath);
}
async function createExplicitClientEntryWrapper({ appDir, explicitWrapperDir, file, entryId, }) {
    const wrapperPath = path.join(explicitWrapperDir, `${entryId.replace(/[\\/]/g, "__")}.ts`);
    const importPath = toImportPath(path.relative(path.dirname(wrapperPath), file));
    const wrapperSource = `
"client";
import ${JSON.stringify(importPath)};
export {};
`;
    await fs.writeFile(wrapperPath, wrapperSource, "utf8");
    return wrapperPath;
}
//# sourceMappingURL=esm-rolldown.js.map