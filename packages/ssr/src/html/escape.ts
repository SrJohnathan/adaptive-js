/*
 * Copyright (c) 2026 Antonio Johnathan
 * Helpers puros de escape - sem dependência de framework
 */

export function escapeAttr(v: string) {
  return v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function escapeHtml(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function escapeScriptJson(v: string) {
  return v.replace(/<\/script/gi, "<\\/script");
}

export function encodeCommentPayload(v: any) {
  return encodeURIComponent(JSON.stringify(v));
}
