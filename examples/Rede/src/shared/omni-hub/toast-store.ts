import { rootSignal } from "@adaptive-js/web";
import type { ToastItem, ToastType } from "./types";

const [toastsSignal, setToasts] = rootSignal<ToastItem[]>([]);

export const toasts = toastsSignal;

export function showToast(
  title: string,
  message: string,
  type: ToastType = "success",
): void {
  const id = Math.random().toString(36).slice(2, 9);
  setToasts((prev) => [...prev, { id, title, message, type }]);
  setTimeout(() => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, 3500);
}