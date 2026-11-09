"hydrate";

import { toasts } from "../../shared/omni-hub/toast-store";
import type { ToastType } from "../../shared/omni-hub/types";

const TOAST_ICONS: Record<ToastType, string> = {
  success: "check_circle",
  info: "info",
  warning: "warning",
  error: "error",
};

const TOAST_ICON_CLASSES: Record<ToastType, string> = {
  success: "bg-primary-container/20 text-primary",
  info: "bg-primary-container/20 text-primary",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-600",
};

export function ToastContainer() {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 pointer-events-none">
      {() =>
        toasts().length > 0 ? (
          <div className="flex flex-col gap-2">
            {toasts().map((toast) => (
              <div
                key={toast.id}
                className="pointer-events-auto bg-surface-container-lowest text-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-outline-variant/30 animate-in fade-in slide-in-from-bottom-5"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    TOAST_ICON_CLASSES[toast.type]
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {TOAST_ICONS[toast.type]}
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-title-md font-bold text-on-surface">
                    {toast.title}
                  </span>
                  <span className="font-body-sm text-on-surface-variant">
                    {toast.message}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (<> </>)
      }
    </div>
  );
}