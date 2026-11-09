/*
 * Helpers de desenvolvimento expostos como módulo.
 *
 * src/index.ts é o binário: importá-lo roda o CLI. Quem quiser usar as funções
 * de dev em teste ou ferramenta importa por este caminho.
 */
export { liveReloadClientCount, notifyLiveReload, createDevLiveReloadScript, subscribeLiveReload, } from "../live-reload.js";
export { createDevHydrationPanelScript } from "../dev-hydration-panel.js";
export { clearDevBuildError, getDevBuildError, renderDevErrorHtml, setDevBuildError, } from "../dev-error.js";
//# sourceMappingURL=index.js.map