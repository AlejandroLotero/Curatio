import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  children,
  /** Clases del panel (ancho, alineación). Por defecto 400px centrado. */
  contentClassName,
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
        className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl"
        onClick={onClose}
      />

      {/* Contenido del modal */}
      <div
        className={`relative z-10 animate-fadeIn rounded-2xl bg-white/70 p-8 text-center shadow-xl ${
          contentClassName ?? "w-[400px]"
        }`}
      >
        
        {title && (
          <h2 className="text-xl text-label  font-semibold mb-4">{title}</h2>
        )}

        {message && (
          <p className="text-gray-600 mb-6">{message}</p>
        )}

        {children}

      </div>
    </div>
  );
}