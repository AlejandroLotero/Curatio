import { useEffect } from "react";
import { Check } from "lucide-react";

export default function Toast({ isVisible, message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-8 right-8 z-50 animate-fade-in">
      <div 
        className="rounded-lg shadow-lg p-6 max-w-sm"
        style={{
          backgroundColor: "var(--color-primary-50)",
          border: "2px solid #14AE5C",
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#14AE5C" }}
          >
            <Check size={28} className="text-white" strokeWidth={3} />
          </div>
          <p 
            className="font-semibold text-lg"
            style={{ color: "var(--semantic-text-primary)" }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
