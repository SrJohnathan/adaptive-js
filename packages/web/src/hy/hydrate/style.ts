/*
 * Copyright (c) 2026 Antonio Johnathan
 * Style helpers - reutiliza style-shared sem duplicar lógica
 */
import { resolveStyleEntries } from "../style-shared.js";

export function applyStyleObject(el: HTMLElement, style: Record<string, any> | null | undefined) {
  if (!style || typeof style !== "object") return;
  for (const [key, value] of resolveStyleEntries(style)) {
    if (value == null || value === false) {
      el.style.removeProperty(key.replace(/([A-Z])/g, "-$1").toLowerCase());
    } else {
      (el.style as any)[key] = value;
    }
  }
}
