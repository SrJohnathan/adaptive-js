/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import path from "node:path";
import { pathToFileURL } from "node:url";
import fs from "node:fs/promises";
import fg from "fast-glob";
import { matchRouteServer, parseRoutePathServer } from "./parse.js";
import { renderToString, renderToStringWithMetadata } from "@adaptive-js/ssr";
export async function createRouter(url, routes = [], options) {
    const isProduction = options?.isProduction ?? process.env.NODE_ENV === "production";
    const sourceDir = options?.sourceDir || path.join(process.cwd(), "src");
    const serverBuildDir = options?.serverBuildDir ||
        path.join(process.cwd(), "dist", "server");
    const clientBuildDir = options?.clientBuildDir ||
        path.join(process.cwd(), "dist", "client");
    const pagesDir = path.join(serverBuildDir, "pages");
    const pagePattern = "**/*.js";
    const clientManifest = await loadClientManifest(clientBuildDir);
    const clientAssetManifest = await loadClientAssetManifest(clientBuildDir);
    const globalClientAssets = Object.values(clientAssetManifest).filter((record) => record.global);
    if (routes.length === 0) {
        const modules = await fg(pagePattern, {
            cwd: pagesDir,
            onlyFiles: true,
            suppressErrors: true, // Adicionado para evitar que erros de acesso matem a busca
            ignore: [
                "**/components/**",
                "**/forms/**",
                "**/_*.tsx",
                "**/_*.js",
                "404.tsx",
                "404.ts",
                "404.jsx",
                "404.js",
            ]
        });
        // Tenta novamente uma vez se não encontrar nada (race condition no dev server)
        // Usamos um contador de tentativas simples via options para evitar loop infinito
        const attempt = options?._attempt || 0;
        if (modules.length === 0 && !isProduction && attempt < 3) {
            await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
            return createRouter(url, routes, { ...options, _attempt: attempt + 1 });
        }
        for (const relativePath of modules) {
            const absolutePath = path.join(pagesDir, relativePath);
            const mod = await importServerRouteModule(absolutePath, Boolean(options?.freshServerModules));
            if (typeof mod.default !== "function")
                continue;
            const routePath = parseRoutePathServer(relativePath);
            routes.push({
                path: parseRoutePathServer(relativePath),
                component: mod.default,
                clientEntry: normalizeRouteEntryId(relativePath),
                metadata: typeof mod.generateMetadata === "function"
                    ? mod.generateMetadata
                    : mod.metadata
            });
        }
    }
    const notFoundPage = await loadNotFoundPage(pagesDir, isProduction, Boolean(options?.freshServerModules));
    const uri = parseUrl(url);
    const pathname = uri.pathname;
    const routeMatch = resolveRoute(routes, pathname, uri.query);
    if (!routeMatch) {
        return renderNotFoundResponse({
            notFoundPage,
            url,
            pathname: uri.pathname,
            query: uri.query,
            request: options?.request,
            clientManifest,
            clientAssetManifest,
            globalClientAssets,
        });
    }
    const setCookies = [];
    const element = await routeMatch.component({
        params: routeMatch.params,
        query: uri.query,
        request: options?.request,
        appendSetCookie: (header) => setCookies.push(header)
    });
    // 🔥 intercepta redirect
    if (element?.__type === "redirect") {
        return element;
    }
    if (element?.__type === "not-found") {
        return renderNotFoundResponse({
            notFoundPage,
            url,
            pathname: uri.pathname,
            query: uri.query,
            request: options?.request,
            clientManifest,
            clientAssetManifest,
            globalClientAssets,
            setCookies,
        });
    }
    const rendered = renderToStringWithMetadata(element);
    const metadata = await resolveMetadata(routeMatch.metadata, {
        url,
        pathname: uri.pathname,
        params: routeMatch.params ?? {},
        query: uri.query
    });
    const resolvedEntryIds = Array.from(new Set([
        routeMatch.clientEntry,
        ...rendered.clientModuleIds,
    ].filter((entry) => Boolean(entry))));
    return {
        html: rendered.html,
        params: routeMatch.params ?? {},
        query: uri.query,
        metadata,
        clientEntries: Array.from(new Set([
            ...globalClientAssets.map((record) => record.script),
            ...resolvedEntryIds
                .map((entryId) => clientManifest[entryId] ?? clientAssetManifest[entryId]?.script ?? null)
                .filter((entry) => Boolean(entry)),
        ])),
        clientStyles: Array.from(new Set([
            ...globalClientAssets.flatMap((record) => record.styles),
            ...resolvedEntryIds.flatMap((entryId) => clientAssetManifest[entryId]?.styles ?? []),
        ])),
        setCookies,
    };
}
async function renderNotFoundResponse(options) {
    const { notFoundPage, url, pathname, query, request, clientManifest, clientAssetManifest, globalClientAssets, } = options;
    const setCookies = options.setCookies ?? [];
    if (!notFoundPage) {
        return createFallbackNotFoundResponse(globalClientAssets, query, setCookies);
    }
    const element = await notFoundPage.component({
        params: {},
        query,
        request,
        appendSetCookie: (header) => setCookies.push(header),
    });
    if (element?.__type === "redirect") {
        return element;
    }
    if (element?.__type === "not-found") {
        return createFallbackNotFoundResponse(globalClientAssets, query, setCookies);
    }
    const rendered = renderToStringWithMetadata(element);
    const metadata = await resolveMetadata(notFoundPage.metadata, {
        url,
        pathname,
        params: {},
        query,
    });
    const resolvedEntryIds = Array.from(new Set([
        notFoundPage.clientEntry,
        ...rendered.clientModuleIds,
    ].filter((entry) => Boolean(entry))));
    return {
        status: 404,
        html: rendered.html,
        params: {},
        query,
        metadata,
        clientEntries: Array.from(new Set([
            ...globalClientAssets.map((record) => record.script),
            ...resolvedEntryIds
                .map((entryId) => clientManifest[entryId] ?? clientAssetManifest[entryId]?.script ?? null)
                .filter((entry) => Boolean(entry)),
        ])),
        clientStyles: Array.from(new Set([
            ...globalClientAssets.flatMap((record) => record.styles),
            ...resolvedEntryIds.flatMap((entryId) => clientAssetManifest[entryId]?.styles ?? []),
        ])),
        setCookies,
    };
}
function createFallbackNotFoundResponse(globalClientAssets, query, setCookies) {
    return {
        status: 404,
        html: renderToString({ tag: "div", props: {}, children: ["404 - Page not found"] }),
        params: {},
        query,
        clientEntries: Array.from(new Set(globalClientAssets.map((record) => record.script))),
        clientStyles: Array.from(new Set(globalClientAssets.flatMap((record) => record.styles))),
        setCookies,
    };
}
async function loadNotFoundPage(pagesDir, isProduction, fresh) {
    const candidates = isProduction
        ? ["404.js"]
        : ["404.tsx", "404.ts", "404.jsx", "404.js"];
    for (const relativePath of candidates) {
        const absolutePath = path.join(pagesDir, relativePath);
        try {
            await fs.access(absolutePath);
        }
        catch {
            continue;
        }
        const mod = await importServerRouteModule(absolutePath, fresh);
        if (typeof mod.default !== "function") {
            continue;
        }
        return {
            component: mod.default,
            clientEntry: normalizeRouteEntryId(relativePath),
            metadata: typeof mod.generateMetadata === "function"
                ? mod.generateMetadata
                : mod.metadata,
        };
    }
    return null;
}
async function importServerRouteModule(absolutePath, fresh) {
    const moduleUrl = pathToFileURL(absolutePath);
    if (fresh) {
        const stats = await fs.stat(absolutePath);
        moduleUrl.searchParams.set("t", `${stats.mtimeMs}`);
    }
    return import(moduleUrl.href);
}
async function loadClientManifest(clientBuildDir) {
    try {
        const manifest = await fs.readFile(path.join(clientBuildDir, "manifest.json"), "utf8");
        return JSON.parse(manifest);
    }
    catch {
        return {};
    }
}
function normalizeRouteEntryId(relativePath) {
    return "pages/" + relativePath
        .replace(/\.(tsx|ts|jsx|js)$/, "")
        .replace(/\\/g, "/")
        .replace(/\.__client_ssr$/, "");
}
async function resolveMetadata(resolver, context) {
    if (!resolver) {
        return null;
    }
    if (typeof resolver === "function") {
        const resolved = await resolver(context);
        return resolved ?? null;
    }
    return resolver;
}
function parseUrl(fullUrl) {
    const url = new URL(fullUrl, "http://adaptive.local");
    const query = {};
    for (const [key, value] of url.searchParams.entries()) {
        query[key] = value;
    }
    return {
        pathname: url.pathname,
        segments: url.pathname.replace(/^\/|\/$/g, "").split("/").filter(Boolean),
        query
    };
}
function resolveRoute(routes, pathname, query = {}) {
    for (const route of routes) {
        const { matched, params } = matchRouteServer(route.path, pathname);
        if (matched) {
            return {
                component: route.component,
                params,
                query,
                clientEntry: route.clientEntry,
                metadata: route.metadata
            };
        }
    }
    return null;
}
async function loadClientAssetManifest(clientBuildDir) {
    try {
        const manifest = await fs.readFile(path.join(clientBuildDir, "asset-manifest.json"), "utf8");
        return JSON.parse(manifest);
    }
    catch {
        return {};
    }
}
//# sourceMappingURL=create-route.js.map