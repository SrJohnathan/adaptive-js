import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface ToastContextType {
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-surface-container-lowest text-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-outline-variant/30 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              toast.type === 'error' ? 'bg-red-100 text-red-600' :
              toast.type === 'warning' ? 'bg-amber-100 text-amber-700' :
              'bg-primary-container/20 text-primary'
            }`}>
              <span className="material-symbols-outlined text-[20px]">
                {toast.type === 'error' ? 'error' : toast.type === 'warning' ? 'warning' : 'check_circle'}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-title-md text-title-md font-bold text-on-surface">{toast.title}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
