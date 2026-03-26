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
      <div className="relative bg-white rounded-2xl shadow-xl w-[400px] p-8 text-center z-10 animate-fadeIn">
        
        {title && (
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        )}

        {message && (
          <p className="text-gray-600 mb-6">{message}</p>
        )}

        {children}

      </div>
    </div>
  );
}