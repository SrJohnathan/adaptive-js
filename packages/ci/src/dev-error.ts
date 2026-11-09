/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Ultimo erro de build, para a pagina de erro do dev server. O watcher nao pode
 * derrubar o servidor: quando um arquivo esta com erro de digitacao a pagina
 * precisa continuar respondendo, senao o browser so mostra um 404 sem contexto.
 */

export type DevBuildError = {
  message: string;
  sourcePath?: string;
  details: string[];
  at: number;
};

let current: DevBuildError | null = null;

export function setDevBuildError(error: unknown): DevBuildError | null {
  const parsed = parseBuildError(error);
  current = parsed;
  return parsed;
}

export function clearDevBuildError(): void {
  current = null;
}

export function getDevBuildError(): DevBuildError | null {
  return current;
}

function parseBuildError(error: unknown): DevBuildError {
  const err = error as {
    message?: string;
    sourcePath?: string;
    errors?: { message?: string; codeframe?: string }[];
  };

  const details: string[] = [];
  for (const item of err?.errors ?? []) {
    if (item?.codeframe) details.push(item.codeframe);
    else if (item?.message) details.push(item.message);
  }

  return {
    message: err?.message ?? String(error),
    sourcePath: err?.sourcePath,
    details,
    at: Date.now(),
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const STYLE = [
  "margin:0",
  "padding:24px",
  "background:#0c0c0e",
  "color:#e6e6e6",
  "min-height:100vh",
  "box-sizing:border-box",
  "font:13px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
].join(";");

function block(text: string, border: string): string {
  return (
    `<pre style="margin:0 0 12px;padding:12px 14px;background:#15151a;` +
    `border-left:3px solid ${border};border-radius:4px;white-space:pre-wrap;` +
    `word-break:break-word;overflow-x:auto">${escapeHtml(text)}</pre>`
  );
}

/**
 * Pagina de erro renderizada no servidor e injetada no slot da app. Nao depende
 * de JS: o erro precisa aparecer mesmo com o bundle quebrado ou o JS desligado.
 */
export function renderDevErrorHtml(error: DevBuildError): string {
  const parts: string[] = [
    `<div style="${STYLE}">`,
    `<div style="font-size:15px;font-weight:600;margin-bottom:16px;color:#ff6b6b">`,
    `Erro de compilacao</div>`,
    block(error.message || "erro desconhecido", "#ff6b6b"),
  ];

  if (error.sourcePath) {
    parts.push(block(error.sourcePath, "#7aa2f7"));
  }

  for (const detail of error.details) {
    parts.push(block(detail, "#e0af68"));
  }

  parts.push(`</div>`);
  return parts.join("");
}
