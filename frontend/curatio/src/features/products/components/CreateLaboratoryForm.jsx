import { useState } from "react";
import Modal from "../../../shared/components/Modal";
import Toast from "../../../shared/components/Toast";

export default function CreateLaboratoryForm({ isOpen, onClose, onAdd }) {
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
      <Modal isOpen={isOpen} onClose={onClose} title="CREAR LABORATORIO">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
              Nombre Laboratorio
            </label>
            <input
              type="text"
              placeholder="Ej. Bayer S.A"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 p-3 rounded-lg focus:outline-none placeholder:text-gray-600"
              style={{
                borderWidth: "2px",
                borderColor: "var(--color-primary-300)",
                backgroundColor: "white",
                fontFamily: "var(--font-body)",
                color: "var(--color-black)"
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
              Descripción
            </label>
            <textarea
              placeholder="Laboratorio de medicamentos genéricos"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg focus:outline-none resize-none placeholder:text-gray-600"
              rows="4"
              style={{
                borderWidth: "2px",
                borderColor: "var(--color-primary-300)",
                backgroundColor: "white",
                fontFamily: "var(--font-body)",
                color: "var(--color-black)"
              }}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-2 rounded-full font-semibold hover:opacity-80 transition"
              style={{
                backgroundColor: "var(--color-gray-800)",
                color: "var(--color-black)",
                fontFamily: "var(--font-body)"
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-full font-semibold hover:opacity-90 transition"
              style={{
                backgroundColor: "var(--color-secondary-700)",
                color: "white",
                fontFamily: "var(--font-body)"
              }}
            >
              Crear Laboratorio
            </button>
          </div>
        </form>
      </Modal>
      <Toast isVisible={showToast} message="Laboratorio creado exitosamente" onClose={() => setShowToast(false)} />
    </>
  );
}
