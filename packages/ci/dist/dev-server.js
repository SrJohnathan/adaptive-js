/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
// dev-server.ts
import { H3, defineHandler, readBody } from "h3";
import { toNodeHandler } from "h3/node";
import path from "node:path";
import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createRouter, handle_actions_request, parseActionCallRequest, getActionHeader } from "@adaptive-js/runtime";
import * as http from "node:http";
import { createDevLiveReloadScript, subscribeLiveReload, } from "./live-reload.js";
import { writeServerModulesManifest } from "./esm-rolldown.js";
import { loadAdaptiveConfig, resolveActionAllowedOrigins } from "./load-adaptive-config.js";
import { getDevBuildError, renderDevErrorHtml, setDevBuildError } from "./dev-error.js";
import { createDevHydrationPanelScript } from "./dev-hydration-panel.js";
import { buildHydrationPayloadHtml } from "@adaptive-js/shared";
const ACTION_PATH = "/_action";
const MAX_PORT_CANDIDATES = 20;
export async function startAdaptiveDevServer(appDir) {
    const preferredPort = Number(process.env.PORT || 3000);
    const sourceDir = path.join(appDir, "src");
    const devRuntimeDir = path.join(appDir, ".adaptivejs", "dev-runtime");
    const serverBuildDir = path.join(devRuntimeDir, "server");
    const clientBuildDir = path.join(devRuntimeDir, "client");
    const templatePath = path.join(clientBuildDir, "index.html");
    const buildMetaPath = path.join(clientBuildDir, "build-meta.json");
    await fs.mkdir(serverBuildDir, { recursive: true });
    try {
        await writeServerModulesManifest(sourceDir, serverBuildDir);
    }
    catch {
        // best effort in dev startup
    }
    const config = await loadAdaptiveConfig(appDir);
    const allowedOrigins = resolveActionAllowedOrigins(config);
    const app = new H3();
    app.use("/**", defineHandler(async (event) => {
        const pathname = event.url.pathname;
        const url = pathname + event.url.search;
        try {
            const staticResponse = await tryServeStatic(event, clientBuildDir, pathname);
            if (staticResponse)
                return staticResponse;
            if (event.req.method === "POST" && pathname === ACTION_PATH) {
                return handleAction(event, {
                    appDir,
                    sourceDir,
                    serverBuildDir,
                    clientBuildDir,
                    allowedOrigins,
                });
            }
            return await handleSsr(event, url, {
                templatePath,
                buildMetaPath,
                sourceDir,
                serverBuildDir,
                clientBuildDir,
                appDir
            });
        }
        catch (error) {
            console.error(`[Adaptive Dev Server] Erro ao processar requisição ${url}:`, error);
            // Se o erro for de módulo não encontrado durante um rebuild, tenta responder algo básico
            // ou deixa o h3 lidar com o erro.
            event.res.status = 500;
            return {
                status: 500,
                message: "Internal Server Error during rebuild. Please try again in a moment.",
                error: error?.message
            };
        }
    }));
    const nodeHandler = toNodeHandler(app);
    const { server, port } = await listenOnAvailablePort(() => http.createServer((req, res) => {
        const url = req.url ?? "";
        if (url.startsWith("/_adaptive/livereload")) {
            subscribeLiveReload(res);
            return;
        }
        return nodeHandler(req, res);
    }), preferredPort);
    server.on("error", (error) => {
        console.error("Adaptive dev server error", error);
    });
    console.log(`🚀 Adaptive dev server: http://localhost:${port}`);
}
async function listenOnAvailablePort(createServer, preferredPort) {
    let lastError = null;
    for (let offset = 0; offset < MAX_PORT_CANDIDATES; offset += 1) {
        const port = preferredPort + offset;
        const server = createServer();
        try {
            await listen(server, port);
            if (offset > 0) {
                console.warn(`⚠️ Port ${preferredPort} occupied, using ${port} instead.`);
            }
            return { server, port };
        }
        catch (error) {
            lastError = error;
            server.close();
            if (error?.code !== "EADDRINUSE") {
                throw error;
            }
        }
    }
    throw lastError instanceof Error
        ? lastError
        : new Error(`Could not find an available port starting from ${preferredPort}.`);
}
function listen(server, port) {
    return new Promise((resolve, reject) => {
        const onError = (error) => {
            server.off("listening", onListening);
            reject(error);
        };
        const onListening = () => {
            server.off("error", onError);
            resolve();
        };
        server.once("error", onError);
        server.once("listening", onListening);
        server.listen(port);
    });
}
async function tryServeStatic(event, clientBuildDir, pathname) {
    let filePath = null;
    if (pathname.startsWith("/_adaptive/")) {
        filePath = path.join(clientBuildDir, pathname.replace(/^\/_adaptive\//, ""));
    }
    else if (pathname !== "/" && !pathname.includes("..")) {
        filePath = path.join(clientBuildDir, pathname.slice(1));
    }
    if (!filePath)
        return null;
    try {
        await fs.access(filePath);
        event.res.headers.set("content-type", getContentType(filePath));
        setNoStoreHeaders(event.res.headers);
        return createReadStream(filePath);
    }
    catch {
        return null;
    }
}
async function handleAction(event, dirs) {
    const reqHeaders = event.req?.headers ?? event.node?.req?.headers ?? event.headers;
    const reqMethod = event.req?.method ?? event.node?.req?.method ?? event.method ?? "POST";
    const reqUrl = event.req?.url ?? event.node?.req?.url ?? event.url;
    // O cliente manda módulo e action em headers E no corpo. JSON cabe no
    // corpo; FormData não, e era o que quebrava qualquer action com arquivo.
    const contentType = String(getActionHeader(reqHeaders, "content-type") ?? "");
    const isMultipart = contentType.toLowerCase().includes("multipart/form-data");
    let body;
    let parts;
    if (isMultipart) {
        parts = parts = await event.req.formData();
    }
    else {
        try {
            body = await readBody(event);
        }
        catch {
            return new Response(JSON.stringify({
                status: 400,
                statusText: "Bad Request",
                message: "Invalid JSON body",
            }), { status: 400, headers: { "content-type": "application/json" } });
        }
    }
    const call = parseActionCallRequest({ headers: reqHeaders, body, parts });
    const result = await handle_actions_request({
        moduleId: call.moduleId,
        actionName: call.actionName,
        args: call.args,
        isProduction: false,
        sourceDir: dirs.sourceDir,
        serverBuildDir: dirs.serverBuildDir,
        request: {
            headers: reqHeaders,
            method: reqMethod,
            url: reqUrl
        },
        context: {
            event,
            appDir: dirs.appDir,
            sourceDir: dirs.sourceDir,
            serverBuildDir: dirs.serverBuildDir,
            clientBuildDir: dirs.clientBuildDir,
        },
        allowedOrigins: dirs.allowedOrigins,
    });
    event.res.status = result.status;
    return result.body;
}
async function renderSsrErrorPage(event, dirs, url, error) {
    console.error(`[Adaptive Dev Server] Erro ao renderizar ${url}:`, error);
    const parsed = setDevBuildError({
        message: error instanceof Error ? error.message : String(error),
        errors: [{ codeframe: buildRuntimeCodeframe(error, dirs.sourceDir) }],
    });
    const template = await loadTemplate(dirs.templatePath);
    const assetVersion = await loadBuildVersion(dirs.buildMetaPath);
    const uri = parseUrl(url);
    const html = applyAssetVersion(injectIntoTemplate(template, renderDevErrorHtml(parsed), buildHydrationPayloadHtml({
        route: uri.pathname,
        params: {},
        query: {},
    }) + createDevLiveReloadScript(assetVersion) + createDevHydrationPanelScript(), [], [], ""), assetVersion);
    event.res.headers.set("content-type", "text/html; charset=utf-8");
    event.res.status = 500;
    setNoStoreHeaders(event.res.headers);
    return html;
}
/**
 * Monta o codeframe a partir do stack. O stack aponta para o JS compilado em
 * .adaptivejs/dev-runtime/server, entao os frames sao traduzidos de volta para
 * src/ — senao o dev ve um caminho que nao existe no editor.
 */
function buildRuntimeCodeframe(error, sourceDir) {
    const stack = error instanceof Error ? error.stack : undefined;
    if (!stack)
        return undefined;
    const lines = stack.split("\n");
    const header = lines[0];
    const serverBuildDir = path.join(sourceDir, "..", ".adaptivejs", "dev-runtime", "server");
    const frames = [];
    for (const line of lines.slice(1)) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("at "))
            continue;
        let file = trimmed;
        if (file.includes(serverBuildDir)) {
            file = file.replace(serverBuildDir, path.join(sourceDir, "..", "src"));
            // O sufixo pode ser ":13:3" ou "?t=<timestamp>.349:13:3" por causa do
            // cache-bust do dev server, entao a busca nao pode ancorar no fim.
            file = file.replace(/\.(js|jsx|mjs)(?=[?:]|$)/, ".tsx");
        }
        if (!file.includes("/src/"))
            continue;
        frames.push(`  ${file}`);
        if (frames.length >= 6)
            break;
    }
    return frames.length > 0 ? [header, ...frames].join("\n") : undefined;
}
async function handleSsr(event, url, dirs) {
    let result;
    try {
        result = await createRouter(url, [], {
            isProduction: false,
            sourceDir: dirs.sourceDir,
            serverBuildDir: dirs.serverBuildDir,
            clientBuildDir: dirs.clientBuildDir,
            freshServerModules: true,
            request: {
                headers: event.req.headers,
                url: `http://${event.node.req.headers.host ?? "localhost"}${url}`
            }
        });
    }
    catch (error) {
        // Erro de runtime: o build passou mas algo lancou ao renderizar. Reaproveita
        // a mesma pagina de erro do build quebrado, senao o dev recebe um JSON.
        return await renderSsrErrorPage(event, dirs, url, error);
    }
    if (result?.__type === "redirect") {
        event.res.status = result.status ?? 302;
        event.res.headers.set("location", result.location);
        return null;
    }
    const uri = parseUrl(url);
    const template = await loadTemplate(dirs.templatePath);
    const assetVersion = await loadBuildVersion(dirs.buildMetaPath);
    const headHtml = renderMetadataTags(result.metadata ?? null);
    const hydrationScript = buildHydrationPayloadHtml({
        route: uri.pathname,
        params: (result.params ?? {}),
        query: (result.query ?? {}),
    });
    const liveReloadScript = createDevLiveReloadScript(assetVersion) + createDevHydrationPanelScript();
    const devError = getDevBuildError();
    // Com erro de build a pagina de erro substitui o conteudo da app: o dev
    // precisa ver o erro, nao o build antigo nem um 404 sem contexto.
    const appHtml = devError ? renderDevErrorHtml(devError) : result.html;
    const html = applyAssetVersion(injectIntoTemplate(template, appHtml, `${hydrationScript}${liveReloadScript}`, result.clientEntries ?? [], result.clientStyles ?? [], headHtml), assetVersion);
    event.res.headers.set("content-type", "text/html; charset=utf-8");
    event.res.status = devError ? 500 : result.status ?? 200;
    for (const cookie of result.setCookies ?? []) {
        event.res.headers.append("set-cookie", cookie);
    }
    setNoStoreHeaders(event.res.headers);
    // Security headers — honor the shared plugin slot so the same
    // extension-security config used in production also applies in dev SSR.
    /*   const securityPlugin = getSecurityPlugin();
       if (securityPlugin) {
           securityPlugin.applyHeaders(event, securityPlugin.generateNonce());
       }
   */
    return html;
}
async function loadTemplate(templatePath) {
    try {
        return await fs.readFile(templatePath, "utf8");
    }
    catch {
        return `<!doctype html><html><head><!--adaptive-head--><!--hydration-script--></head><body><div id="root"><!--app-html--></div></body></html>`;
    }
}
async function loadBuildVersion(buildMetaPath) {
    try {
        const metadata = await fs.readFile(buildMetaPath, "utf8");
        const parsed = JSON.parse(metadata);
        return parsed.buildId ?? null;
    }
    catch {
        return null;
    }
}
function injectIntoTemplate(template, html, hydrationScript, clientEntries, clientStyles, headHtml = "") {
    const withHtml = template.includes("<!--app-html-->")
        ? template.replace("<!--app-html-->", html)
        : template.replace("</body>", `<div id="root">${html}</div></body>`);
    const styleLinks = clientStyles
        .map((entry) => `<link rel="stylesheet" href="${entry}">`)
        .join("");
    const withHead = headHtml || styleLinks
        ? withHtml.includes("<!--adaptive-head-->")
            ? withHtml.replace("<!--adaptive-head-->", `${headHtml}${styleLinks}`)
            : withHtml.replace("</head>", `${headHtml}${styleLinks}</head>`)
        : withHtml;
    const clientScripts = clientEntries
        .map((entry) => `<script type="module" src="${entry}"></script>`)
        .join("");
    if (withHead.includes("<!--hydration-script-->")) {
        return withHead.replace("<!--hydration-script-->", `${hydrationScript}${clientScripts}`);
    }
    return withHead.replace("</body>", `${hydrationScript}${clientScripts}</body>`);
}
function applyAssetVersion(html, assetVersion) {
    if (!assetVersion)
        return html;
    return html.replace(/\b(href|src)="(\/[^"#]*)"/g, (_match, attr, url) => {
        if (!shouldVersionAssetUrl(url)) {
            return `${attr}="${url}"`;
        }
        const separator = url.includes("?") ? "&" : "?";
        return `${attr}="${url}${separator}v=${assetVersion}"`;
    });
}
function shouldVersionAssetUrl(url) {
    if (url.startsWith("//") ||
        url.startsWith("/#") ||
        url.startsWith("/?")) {
        return false;
    }
    if (url.startsWith("/_adaptive/")) {
        return true;
    }
    return /\.[a-z0-9]+($|\?)/i.test(url);
}
function setNoStoreHeaders(headers) {
    headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    headers.set("pragma", "no-cache");
    headers.set("expires", "0");
}
function parseUrl(fullUrl) {
    const url = new URL(fullUrl, "http://adaptive.local");
    const query = {};
    for (const [key, value] of url.searchParams.entries()) {
        query[key] = value;
    }
    return { pathname: url.pathname, query };
}
function renderMetadataTags(metadata) {
    if (!metadata)
        return "";
    const title = metadata.title;
    const description = metadata.description;
    const image = metadata.image;
    const url = metadata.url;
    const siteName = metadata.siteName;
    const locale = metadata.locale;
    const type = metadata.type;
    const keywords = Array.isArray(metadata.keywords)
        ? metadata.keywords.join(", ")
        : metadata.keywords;
    const og = {
        title: metadata.openGraph?.title ?? title,
        description: metadata.openGraph?.description ?? description,
        image: metadata.openGraph?.image ?? image,
        url: metadata.openGraph?.url ?? url,
        type: metadata.openGraph?.type ?? type,
        siteName: metadata.openGraph?.siteName ?? siteName,
        locale: metadata.openGraph?.locale ?? locale,
    };
    const twitter = {
        card: metadata.twitter?.card ?? "summary_large_image",
        title: metadata.twitter?.title ?? title,
        description: metadata.twitter?.description ?? description,
        image: metadata.twitter?.image ?? image,
        site: metadata.twitter?.site,
        creator: metadata.twitter?.creator,
    };
    return [
        title ? `<title>${escapeHtml(title)}</title>` : "",
        description ? `<meta name="description" content="${escapeAttr(description)}" />` : "",
        metadata.themeColor ? `<meta name="theme-color" content="${escapeAttr(metadata.themeColor)}" />` : "",
        metadata.robots ? `<meta name="robots" content="${escapeAttr(metadata.robots)}" />` : "",
        keywords ? `<meta name="keywords" content="${escapeAttr(keywords)}" />` : "",
        metadata.canonical ? `<link rel="canonical" href="${escapeAttr(metadata.canonical)}" />` : "",
        og.title ? `<meta property="og:title" content="${escapeAttr(og.title)}" />` : "",
        og.description ? `<meta property="og:description" content="${escapeAttr(og.description)}" />` : "",
        og.image ? `<meta property="og:image" content="${escapeAttr(og.image)}" />` : "",
        og.url ? `<meta property="og:url" content="${escapeAttr(og.url)}" />` : "",
        og.type ? `<meta property="og:type" content="${escapeAttr(og.type)}" />` : "",
        og.siteName ? `<meta property="og:site_name" content="${escapeAttr(og.siteName)}" />` : "",
        og.locale ? `<meta property="og:locale" content="${escapeAttr(og.locale)}" />` : "",
        twitter.card ? `<meta name="twitter:card" content="${escapeAttr(twitter.card)}" />` : "",
        twitter.title ? `<meta name="twitter:title" content="${escapeAttr(twitter.title)}" />` : "",
        twitter.description ? `<meta name="twitter:description" content="${escapeAttr(twitter.description)}" />` : "",
        twitter.image ? `<meta name="twitter:image" content="${escapeAttr(twitter.image)}" />` : "",
        twitter.site ? `<meta name="twitter:site" content="${escapeAttr(twitter.site)}" />` : "",
        twitter.creator ? `<meta name="twitter:creator" content="${escapeAttr(twitter.creator)}" />` : "",
    ].filter(Boolean).join("");
}
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
function escapeAttr(value) {
    return escapeHtml(value).replace(/"/g, "&quot;");
}
function getContentType(filePath) {
    if (filePath.endsWith(".js"))
        return "application/javascript; charset=utf-8";
    if (filePath.endsWith(".css"))
        return "text/css; charset=utf-8";
    if (filePath.endsWith(".html"))
        return "text/html; charset=utf-8";
    if (filePath.endsWith(".ico"))
        return "image/x-icon";
    if (filePath.endsWith(".svg"))
        return "image/svg+xml";
    if (filePath.endsWith(".json"))
        return "application/json; charset=utf-8";
    if (filePath.endsWith(".png"))
        return "image/png";
    return "application/octet-stream";
}
//# sourceMappingURL=dev-server.js.map