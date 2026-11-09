/*
 * Painel de erro de hydration - desenvolvimento only.
 *
 * O runtime (@adaptive-js/web) dispara dois CustomEvents quando algo dá errado
 * depois que o HTML do servidor já chegou na tela:
 *
 *   adaptive:hydration-error     ilha lançou
 *   adaptive:hydration-mismatch  o DOM do servidor não bateu com o esperado
 *
 * Sem isto o erro só existia no console, e como a ilha morre mantendo o HTML do
 * servidor, a página continuava com cara de estar funcionando.
 *
 * O painel é um badge compacto que abre sob demanda. Não recarrega a página, não
 * bloqueia interação e some com o reload do live reload.
 */

export function createDevHydrationPanelScript(): string {
    return `<script data-adaptive-hydration-panel>
(() => {
  const MAX_ITEMS = 25;
  const items = [];
  let open = false;
  let el = null;
  let list = null;
  let panel = null;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function ensureDom() {
    if (el) return;

    const style = document.createElement("style");
    // setAttribute exige dois argumentos; com um só lança e o painel não sobe.
    style.setAttribute("data-adaptive-hydration-panel", "");
    style.textContent =
      "[data-adaptive-hydration-badge]{position:fixed;right:16px;bottom:16px;z-index:2147483000;" +
      "font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;display:flex;align-items:center;gap:8px;" +
      "padding:8px 12px;border-radius:8px;cursor:pointer;color:#fff;background:#b42318;" +
      "box-shadow:0 8px 24px rgba(0,0,0,.28);border:1px solid #7a1a12;user-select:none}" +
      "[data-adaptive-hydration-badge][data-open='true']{background:#7a1a12}" +
      "[data-adaptive-hydration-badge]:hover{filter:brightness(1.08)}" +
      "[data-adaptive-hydration-badge] b{font-weight:600}" +
      "[data-adaptive-hydration-badge] span{opacity:.85;font-weight:400}" +
      "[data-adaptive-hydration-panel]{position:fixed;right:16px;bottom:56px;z-index:2147483000;" +
      "width:min(520px,calc(100vw - 32px));max-height:min(60vh,520px);overflow:auto;" +
      "font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;color:#f5f5f5;background:#17171a;" +
      "border:1px solid #3a3a40;border-radius:10px;box-shadow:0 12px 40px rgba(0,0,0,.4)}" +
      "[data-adaptive-hydration-panel] header{display:flex;align-items:center;gap:8px;" +
      "padding:10px 12px;border-bottom:1px solid #2c2c31;position:sticky;top:0;background:#17171a}" +
      "[data-adaptive-hydration-panel] header strong{font-size:12px;letter-spacing:.02em}" +
      "[data-adaptive-hydration-panel] header button{margin-left:auto;background:#2c2c31;color:#f5f5f5;" +
      "border:1px solid #45454d;border-radius:6px;padding:4px 8px;font:inherit;cursor:pointer}" +
      "[data-adaptive-hydration-panel] header button:hover{background:#3a3a42}" +
      "[data-adaptive-hydration-item]{padding:10px 12px;border-bottom:1px solid #24242a}" +
      "[data-adaptive-hydration-item]:last-child{border-bottom:0}" +
      "[data-adaptive-hydration-kind]{display:inline-block;font-size:10px;letter-spacing:.06em;" +
      "text-transform:uppercase;padding:2px 6px;border-radius:4px;margin-bottom:6px}" +
      "[data-adaptive-hydration-kind='error']{background:#3d1414;color:#ff9d94}" +
      "[data-adaptive-hydration-kind='mismatch']{background:#3a2f10;color:#f2c66b}" +
      "[data-adaptive-hydration-item] p{margin:0 0 6px;white-space:pre-wrap;word-break:break-word}" +
      "[data-adaptive-hydration-item] code{color:#a9b1d6}" +
      "[data-adaptive-hydration-item] pre{margin:0;white-space:pre-wrap;word-break:break-word;" +
      "color:#8b8b96;font-size:11px}" +
      "[data-adaptive-hydration-empty]{padding:14px 12px;color:#8b8b96}";

    const badge = document.createElement("div");
    badge.setAttribute("data-adaptive-hydration-badge", "");
    badge.setAttribute("role", "button");
    badge.setAttribute("tabindex", "0");

    const box = document.createElement("div");
    box.setAttribute("data-adaptive-hydration-panel", "");
    box.setAttribute("hidden", "");
    box.innerHTML =
      "<header><strong>hydration</strong>" +
      "<button type=\\"button\\" data-adaptive-hydration-clear>limpar</button></header>" +
      "<div data-adaptive-hydration-list></div>";

    (document.head || document.documentElement).appendChild(style);
    document.body.appendChild(badge);
    document.body.appendChild(box);

    el = badge;
    panel = box;
    list = box.querySelector("[data-adaptive-hydration-list]");

    const toggle = () => {
      open = !open;
      panel.hidden = !open;
      badge.setAttribute("data-open", open ? "true" : "false");
    };
    badge.addEventListener("click", toggle);
    badge.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); toggle(); }
    });
    box.querySelector("[data-adaptive-hydration-clear]").addEventListener("click", () => {
      items.length = 0;
      render();
    });
  }

  function kindLabel(kind) {
    return kind === "error" ? "erro" : "mismatch";
  }

  function addItem(kind, detail) {
    ensureDom();
    if (items.length >= MAX_ITEMS) return;
    items.unshift({
      kind: kind,
      path: (detail && detail.path) || "",
      message: (detail && detail.message) || "",
      expected: detail && detail.expected,
      found: detail && detail.found,
      snippet: detail && detail.htmlSnippet,
      stack: detail && detail.stack
    });
    open = true;
    render();
  }

  function render() {
    if (!el) return;
    panel.hidden = !open || items.length === 0;

    const errors = items.filter((i) => i.kind === "error").length;
    const mismatches = items.length - errors;
    const parts = [];
    if (errors) parts.push(errors + (errors === 1 ? " erro" : " erros"));
    if (mismatches) parts.push(mismatches + (mismatches === 1 ? " mismatch" : " mismatches"));

    el.innerHTML = "<b>hydration</b><span>" + escapeHtml(parts.join(" · ") || "ok") + "</span>";
    el.setAttribute("data-open", open && items.length ? "true" : "false");

    if (!items.length) {
      list.innerHTML = "<div data-adaptive-hydration-empty>nada por aqui</div>";
      return;
    }

    list.innerHTML = items.map((item) => {
      const rows = [];
      if (item.path) rows.push("<code>" + escapeHtml(item.path) + "</code>");
      rows.push("<p>" + escapeHtml(item.message) + "</p>");
      if (item.expected !== undefined || item.found !== undefined) {
          console.log("G",  escapeHtml(item.expected) , item.expected)
        rows.push(
          "<pre>esperado: " + escapeHtml(item.expected) +
          "\\nencontrado: " + escapeHtml(item.found) + "</pre>"
        );
      }
      if (item.snippet) rows.push("<pre>" + escapeHtml(item.snippet) + "</pre>");
      if (item.kind === "error" && item.stack) {
        rows.push("<pre>" + escapeHtml(String(item.stack).split("\\n").slice(0, 8).join("\\n")) + "</pre>");
      }
      return "<div data-adaptive-hydration-item>" +
        "<span data-adaptive-hydration-kind=\\"" + item.kind + "\\">" + kindLabel(item.kind) + "</span>" +
        rows.join("") +
        "</div>";
    }).join("");
  }

  window.addEventListener("adaptive:hydration-error", (ev) => addItem("error", ev.detail));
  window.addEventListener("adaptive:hydration-mismatch", (ev) => addItem("mismatch", ev.detail));

  // Erro que escapou do try/catch do runtime: entra no painel também.
  window.addEventListener("error", (ev) => {
    // Falha de recurso (favicon 404, imagem quebrada) também dispara "error",
    // mas sem message e sem Error. Sem este filtro o painel acende por causa de
    // qualquer 404 da página.
    if (!ev || (!ev.message && !ev.error)) return;
    const error = ev.error;
    addItem("error", {
      path: "uncaught",
      message: ev.message ? ev.message : "erro não identificado",
      stack: error && error.stack ? error.stack : undefined
    });
  });
  window.addEventListener("unhandledrejection", (ev) => {
    const reason = ev && ev.reason;
    addItem("error", {
      path: "unhandledrejection",
      message: reason && reason.message ? reason.message : String(reason),
      stack: reason && reason.stack ? reason.stack : undefined
    });
  });
})();
</script>`;
}
