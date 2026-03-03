import { useState } from "react";
import Modal from "../../../shared/components/Modal";
import Toast from "../../../shared/components/Toast";

export default function CreatePharmaceuticalFormForm({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAdd({
        value: formData.name.toLowerCase().replace(/\s+/g, "_"),
        label: formData.name,
      });
      setFormData({ name: "", description: "" });
      setShowToast(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="CREAR FORMA FARMACÉUTICA">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--semantic-text-label)" }}>
              Nombre de la Forma
            </label>
            <input
              type="text"
              placeholder="Ej. Gel, Pomada"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 p-3 rounded-lg focus:outline-none"
              style={{
                borderWidth: "2px",
                borderColor: "var(--color-primary-300)",
                backgroundColor: "var(--color-primary-50)",
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--semantic-text-label)" }}>
              Descripción
            </label>
            <textarea
              placeholder="Descripción de la forma farmacéutica"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg focus:outline-none resize-none"
              rows="4"
              style={{
                borderWidth: "2px",
                borderColor: "var(--color-primary-300)",
                backgroundColor: "var(--color-primary-50)",
              }}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-2 rounded-full font-semibold hover:opacity-80 transition"
              style={{
                backgroundColor: "var(--color-gray-100)",
                color: "var(--semantic-text-primary)",
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-full font-semibold hover:opacity-90 transition"
              style={{
                backgroundColor: "var(--color-button-primary-bg)",
                color: "var(--semantic-text-button-primary)",
              }}
            >
              Crear Forma
            </button>
          </div>
        </form>
      </Modal>
      <Toast isVisible={showToast} message="Forma farmacéutica creada exitosamente" onClose={() => setShowToast(false)} />
    </>
  );
}
