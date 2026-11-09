/*
 * Copyright (c) 2026 Antonio Johnathan
 * Licensed under the MIT License.
 *
 * Valida a hierarquia de diretivas no grafo do bundle client:
 *
 *   página (server, sem diretiva)  ->  hydrate  ->  client
 *
 * Herança em cascata: arquivo sem diretiva herda o modo de quem importa, até
 * aparecer uma diretiva explícita. client é a última fronteira: tudo abaixo
 * dele é client.
 *
 *   - sob hydrate: hydrate ou client
 *   - sob client:  só client            (nunca hydrate)
 *
 * Diretiva repetida sob o mesmo modo (hydrate dentro de hydrate, client dentro
 * de client) NÃO é erro: cada arquivo com diretiva vira um componente próprio
 * (createHydrateComponent / createClientComponent), ou seja, um escopo reativo
 * separado. Costuma ser esquecimento, então vira AVISO (`redundantDirective`).
 *
 * "server" / "use server" e pastas actions/ NÃO são modo aqui: são server
 * actions, que o client importa de propósito e que o serverOnlyProxyPlugin já
 * troca por proxy RPC antes deste plugin ver o conteúdo.
 */
import path from "node:path";
import { getHydratableDirective } from "./utilly.js";
const ALLOWED_UNDER = {
    hydrate: new Set(["hydrate", "client"]),
    client: new Set(["client"]),
};
/** Usa o mesmo detector do build, para o plugin e o SSR nunca discordarem. */
function readMode(code) {
    const directive = getHydratableDirective(code);
    return directive === "hydrate" || directive === "client" ? directive : undefined;
}
export function adaptiveBoundariesPlugin(options = {}) {
    const { redundantDirective = "warn" } = options;
    // módulo -> diretiva declarada (undefined = sem diretiva, herda)
    const declared = new Map();
    return {
        name: "adaptive-boundaries",
        // "pre": lê a diretiva antes de qualquer outro transform mexer no código
        transform: {
            order: "pre",
            handler(code, id) {
                if (id.includes("\0") || id.includes("node_modules"))
                    return null;
                if (!/\.[cm]?[jt]sx?$/.test(id.split("?")[0]))
                    return null;
                declared.set(id, readMode(code));
                return null;
            },
        },
        buildEnd(error) {
            if (error)
                return; // o build já falhou por outro motivo
            const rel = (id) => path.relative(process.cwd(), id);
            const errors = [];
            const seen = new Set();
            const warned = new Set();
            const visit = (id, inherited, chain) => {
                const own = declared.get(id);
                const mode = own ?? inherited;
                // mesmo módulo sob o mesmo modo não precisa ser revisitado
                const key = `${id}|${mode}`;
                if (seen.has(key))
                    return;
                seen.add(key);
                const nextChain = [...chain, `${rel(id)} (${mode ?? "sem diretiva"})`];
                if (own && inherited && !ALLOWED_UNDER[inherited].has(own)) {
                    errors.push(`'${own}' não pode ficar abaixo de '${inherited}'.\n` +
                        `  ${nextChain.join("\n    -> ")}`);
                    return; // não desce: o erro já aponta a origem
                }
                // mesma diretiva que já herda: válido, mas é um escopo reativo novo
                if (redundantDirective === "warn" &&
                    own &&
                    own === inherited &&
                    !warned.has(id)) {
                    warned.add(id);
                    this.warn(`'${own}' repetida em ${rel(id)}, que já herda '${inherited}'. ` +
                        `Isso cria um escopo reativo separado do pai. ` +
                        `Se for intencional, ignore; senão, remova a diretiva.\n` +
                        `  ${nextChain.join("\n    -> ")}`);
                }
                const info = this.getModuleInfo(id);
                if (!info)
                    return;
                for (const child of [...info.importedIds, ...info.dynamicallyImportedIds]) {
                    // externo, virtual, css, asset ou node_modules: fora da regra
                    if (!declared.has(child))
                        continue;
                    visit(child, mode, nextChain);
                }
            };
            for (const id of this.getModuleIds()) {
                const info = this.getModuleInfo(id);
                if (info?.isEntry && declared.has(id))
                    visit(id, null, []);
            }
            if (errors.length > 0) {
                this.error(`[adaptive] violação de fronteira entre diretivas:\n\n${errors.join("\n\n")}`);
            }
        },
    };
}
//# sourceMappingURL=diretriz.js.map