import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  children,
}) {
  // Evita scroll del fondo cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay oscuro */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenido del modal */}
      <div className="relative rounded-3xl shadow-xl ring-1 ring-primary-200 dark:ring-neutral-700 bg-white dark:bg-neutral-900 w-[400px] p-8 text-center z-10 animate-fadeIn">
        
        {title && (
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ 
              color: "var(--color-black)",
              fontFamily: "var(--font-body)"
            }}
          >
            {title}
          </h2>
        )}

        {message && (
          <p 
            className="mb-6"
            style={{ 
              color: "var(--color-black)",
              fontFamily: "var(--font-body)"
            }}
          >
            {message}
          </p>
        )}

        {children}

      </div>
    </div>
  );
}
