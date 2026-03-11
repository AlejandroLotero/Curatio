import { X, Check } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p 
          className="text-center text-lg"
          style={{ 
            color: "var(--semantic-text-primary)",
            fontFamily: "var(--font-body)"
          }}
        >
          {message}
        </p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full flex items-center justify-center hover:opacity-80 transition"
            style={{
              backgroundColor: "#FF4444",
            }}
          >
            <X size={32} className="text-white" strokeWidth={3} />
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-16 h-16 rounded-full flex items-center justify-center hover:opacity-80 transition"
            style={{
              backgroundColor: "var(--color-button-primary-bg)",
            }}
          >
            <Check size={32} className="text-white" strokeWidth={3} />
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full px-6 py-2 rounded-full font-semibold hover:opacity-80 transition"
          style={{
            backgroundColor: "var(--color-gray-800)",
            color: "var(--color-black)",
            fontFamily: "var(--font-body)"
          }}
        >
          Volver
        </button>
      </div>
    </Modal>
  );
}
