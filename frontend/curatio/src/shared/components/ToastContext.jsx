import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

/**
 * Provider global de toasts.
 *
 * Soporta:
 * - success
 * - error
 * - info
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback((payload) => {
    const id = `${Date.now()}-${Math.random()}`;

    const nextToast = {
      id,
      type: payload?.type || "info",
      title: payload?.title || "",
      message: payload?.message || "",
      duration: payload?.duration ?? 4000,
    };

    setToasts((prev) => [...prev, nextToast]);

    window.setTimeout(() => {
      removeToast(id);
    }, nextToast.duration);
  }, [removeToast]);

  const value = useMemo(
    () => ({
      pushToast,
      removeToast,
    }),
    [pushToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe usarse dentro de ToastProvider.");
  }

  return context;
}

/**
 * Contenedor visual de toasts.
 */
function ToastViewport({ toasts, onClose }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex w-full max-w-sm flex-col gap-3 px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}

function ToastCard({ toast, onClose }) {
  const typeClasses = {
    success: "border-green-200 bg-green-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50",
  };

  return (
    <div
      className={`rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-md ${typeClasses[toast.type] || typeClasses.info}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {toast.title ? (
            <h4 className="text-sm font-bold text-label">{toast.title}</h4>
          ) : null}

          {toast.message ? (
            <p className="mt-1 text-sm text-label/90">{toast.message}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => onClose(toast.id)}
          className="text-xs font-semibold text-label/70 hover:text-label"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}