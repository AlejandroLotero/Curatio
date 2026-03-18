import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  children,
  width = "w-[400px]",
  backgroundColor = "dark:bg-neutral-900/85",
}) {
  // Evita scroll del fondo cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay oscuro */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Contenido del modal */}
      <div className={`relative ${backgroundColor} backdrop-blur-[2px] rounded-2xl shadow-xl ${width} p-8 text-center z-10 animate-fadeIn`}>
        
        {title && (
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        )}

        {message && (
          <p className="text-gray-600 mb-6">{message}</p>
        )}

        {children}

      </div>
    </div>,
    document.body
  );
}
