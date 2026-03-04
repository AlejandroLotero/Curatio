import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Toast({ isVisible, message, onClose }) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return createPortal(
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
      <div
        className="rounded-lg px-6 py-4 shadow-lg text-white"
        style={{ backgroundColor: "var(--color-primary-600)" }}
      >
        {message}
      </div>
    </div>,
    document.body
  );
}
