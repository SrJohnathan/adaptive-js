#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { prepareEnv } from "./env-loader.js";
import { buildApp, buildAppDev } from "./build.js";
import { clearDevBuildError, setDevBuildError } from "./dev-error.js";
import { startAdaptiveDevServer } from "./dev-server.js";
import chokidar from "chokidar";
const command = process.argv[2];
const parsedArgs = parseCliArgs(process.argv.slice(3));
const targetDir = parsedArgs.targetDir;
switch (command) {
    case "build":
        await runBuild(targetDir, parsedArgs);
        break;
    case "dev":
        await runDev(targetDir);
        break;
    case "preview":
        await runPreview(targetDir);
        break;
    case "run":
    case "start":
        await runProduction(targetDir);
        break;
    default:
        console.error("Usage: adaptive <dev|build|preview|run|start> [appDir]");
        process.exit(1);
}
function parseCliArgs(args) {
    let targetDir = process.cwd();
    for (const arg of args) {
        if (!arg.startsWith("--")) {
            targetDir = path.resolve(arg);
        }
    }
    return { targetDir };
}
async function runBuild(appDir, args) {
    await prepareEnv(appDir, "production");
    process.env.ADAPTIVE_ASSET_BASE = "/_adaptive";
    await buildApp(appDir, { dev: false });
}
async function runPreview(appDir) {
    await prepareEnv(appDir, "production");
    /** todo*/
}
async function runProduction(appDir) {
    await prepareEnv(appDir, "production");
    /** todo*/
}
async function runDev(appDir) {
    await prepareEnv(appDir, "development");
    let building = false;
    let rebuildPending = false;
    let debounceTimer = null;
    const pendingChanges = new Map();
    async function executeRebuild() {
        if (building) {
            rebuildPending = true;
            return;
        }
        building = true;
        rebuildPending = false;
        const changes = Array.from(pendingChanges.values()).filter((c) => {
            const p = c.filePath.replace(/\\/g, "/");
            const base = p.split("/").pop() ?? "";
            return !base.endsWith("~") && !base.endsWith(".swp");
        });
        pendingChanges.clear();
        try {
            console.log("🔁 rebuilding...");
            console.log("[adaptive] changed:", changes.map((c) => c.filePath).join(", ") || "(full)");
            // DEV: full sempre — pages + components + shared
            await buildAppDev(appDir);
            clearDevBuildError();
            console.log("✅ done (full)");
        }
        catch (error) {
            const parsed = setDevBuildError(error);
            console.error("❌ rebuild failed", parsed?.message ?? error);
        }
        finally {
            building = false;
            if (rebuildPending) {
                rebuildPending = false;
                void executeRebuild();
            }
        }
    }
    /*async function executeRebuild() {
        if (building) {
            rebuildPending = true;
            return;
        }

        building = true;
        rebuildPending = false;

        const changes = Array.from(pendingChanges.values());
        pendingChanges.clear();

        try {
            console.log("🔁 rebuilding...");

            if (changes.length === 0) {
                await buildAppDev(appDir);
                console.log("✅ done (full)");
                return;
            }

            const result = await rebuildDevIncremental(appDir, changes, {
                fullRebuild: () => buildAppDev(appDir),
            });

            if (result.full) {
                console.log("✅ done (full)");
                return;
            }

            if (
                !result.server &&
                !result.client &&
                !result.public &&
                !result.html
            ) {
                console.log("✅ done (nothing to rebuild)");
                return;
            }

            const parts: string[] = [];
            if (result.server) parts.push("server");
            if (result.client) parts.push("client");
            if (result.public) parts.push("public");
            if (result.html) parts.push("html");
            console.log(
                `✅ done (${parts.join(" + ")})${
                    result.buildId ? ` · buildId=${result.buildId}` : ""
                }`,
            );
        } catch (error) {
            console.error("❌ rebuild failed", error);
        } finally {
            building = false;
            if (rebuildPending) {
                rebuildPending = false;
                void executeRebuild();
            }
        }
    }*/
    function scheduleRebuild(change) {
        if (change) {
            pendingChanges.set(change.filePath, change);
        }
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            debounceTimer = null;
            void executeRebuild();
        }, 100);
    }
    function watchDirectory(targetPath) {
        if (!fs.existsSync(targetPath))
            return;
        const watcher = chokidar.watch(targetPath, {
            ignoreInitial: true,
            persistent: true,
        });
        watcher.on("all", (eventType, filePath) => {
            scheduleRebuild({
                eventType: eventType === "unlink" || eventType === "unlinkDir" || eventType === "addDir"
                    ? "rename"
                    : "change",
                filePath: path.relative(appDir, filePath),
            });
        });
    }
    await executeRebuild();
    await startAdaptiveDevServer(appDir);
    watchDirectory(path.join(appDir, "src"));
    watchDirectory(path.join(appDir, "public"));
    watchIfExists(path.join(appDir, "index.html"), () => scheduleRebuild({
        eventType: "change",
        filePath: "index.html",
    }));
    watchIfExists(path.join(appDir, "dependency.ts"), () => scheduleRebuild({
        eventType: "change",
        filePath: "dependency.ts",
    }));
    watchIfExists(path.join(appDir, "dependency.tsx"), () => scheduleRebuild({
        eventType: "change",
        filePath: "dependency.tsx",
    }));
    watchIfExists(path.join(appDir, "dependency.js"), () => scheduleRebuild({
        eventType: "change",
        filePath: "dependency.js",
    }));
    watchIfExists(path.join(appDir, "dependency.jsx"), () => scheduleRebuild({
        eventType: "change",
        filePath: "dependency.jsx",
    }));
}
function watchIfExists(targetPath, listener) {
    if (!fs.existsSync(targetPath))
        return;
    fs.watch(targetPath, listener);
}
//# sourceMappingURL=index.js.map