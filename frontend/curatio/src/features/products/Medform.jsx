import { useState, useEffect } from "react";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";
import "../../styles/tokens.css";
import "../../styles/semantic.css";

const PHARMACEUTICAL_FORMS = [
  { value: "tableta", label: "Tableta" },
  { value: "capsula", label: "Cápsula" },
  { value: "suspension", label: "Suspensión" },
  { value: "inyectable", label: "Inyectable" },
  { value: "topico", label: "Tópico" },
];

const PRESENTATIONS = [
  { value: "blister", label: "Blister" },
  { value: "frasco", label: "Frasco" },
  { value: "ampolla", label: "Ampolla" },
  { value: "tubo", label: "Tubo" },
];

const ADMINISTRATION_ROUTES = [
  { value: "oral", label: "Oral" },
  { value: "inyectable", label: "Inyectable" },
  { value: "topico", label: "Tópico" },
  { value: "rectal", label: "Rectal" },
  { value: "intramuscular", label: "Intramuscular" },
];

const LABORATORIES = [
  { value: "pfizer", label: "Pfizer" },
  { value: "novartis", label: "Novartis" },
  { value: "bayer", label: "Bayer" },
  { value: "roche", label: "Roche" },
];

const SUPPLIERS = [
  { value: "supplier1", label: "Proveedor 1" },
  { value: "supplier2", label: "Proveedor 2" },
  { value: "supplier3", label: "Proveedor 3" },
];

const STATUS_OPTIONS = [
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo" },
  { value: "descontinuado", label: "Descontinuado" },
];

export default function MedForm({ onSubmit, onBack, initialData = null }) {
  const [formData, setFormData] = useState({
    medicationId: "",
    medicationName: "",
    pharmaceuticalForm: "",
    presentation: "",
    concentration: "",
    description: "",
    administrationRoute: "",
    laboratory: "",
    lote: "",
    manufactureDate: "",
    expirationDate: "",
    stock: "",
    purchasePrice: "",
    salePrice: "",
    supplier: "",
    status: "activo",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.medicationId.trim()) newErrors.medicationId = "ID requerido";
    if (!formData.medicationName.trim()) newErrors.medicationName = "Nombre requerido";
    if (!formData.pharmaceuticalForm) newErrors.pharmaceuticalForm = "Forma requerida";
    if (!formData.concentration.trim()) newErrors.concentration = "Concentración requerida";
    if (!formData.administrationRoute) newErrors.administrationRoute = "Vía requerida";
    if (!formData.laboratory) newErrors.laboratory = "Laboratorio requerido";
    if (!formData.expirationDate) newErrors.expirationDate = "Fecha vencimiento requerida";
    if (!formData.stock.trim()) newErrors.stock = "Stock requerido";
    if (!formData.supplier) newErrors.supplier = "Proveedor requerido";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  return (
    <div 
      className="min-h-screen p-8"
      style={{ 
        backgroundColor: "var(--color-primary-50)"
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* TÍTULO */}
        <h1 className="text-4xl font-bold text-center mb-12" style={{ color: "var(--semantic-text-primary)" }}>
          GESTIÓN DE MEDICAMENTOS
        </h1>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          {/* COLUMNA 1 - IZQUIERDA */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                ID del Medicamento (visual)
              </label>
              <input
                type="text"
                placeholder="Ingrese ID"
                name="medicationId"
                value={formData.medicationId}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Nombre
              </label>
              <input
                type="text"
                placeholder="Digite el nombre del medicamento"
                name="medicationName"
                value={formData.medicationName}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Forma Farmacéutica
              </label>
              <select
                name="pharmaceuticalForm"
                value={formData.pharmaceuticalForm}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {PHARMACEUTICAL_FORMS.map(form => (
                  <option key={form.value} value={form.value}>{form.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Presentación
              </label>
              <select
                name="presentation"
                value={formData.presentation}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {PRESENTATIONS.map(pres => (
                  <option key={pres.value} value={pres.value}>{pres.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Concentración
              </label>
              <input
                type="text"
                placeholder="Concentración del medicamento"
                name="concentration"
                value={formData.concentration}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Descripción
              </label>
              <input
                type="text"
                placeholder="Añade una descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <button
              type="button"
              className="w-full h-10 rounded font-medium text-sm"
              style={{
                backgroundColor: "var(--color-primary-300)",
                color: "var(--semantic-text-primary)"
              }}
            >
              + Nueva Forma Farmacéutica
            </button>
          </div>

          {/* COLUMNA 2 - CENTRO */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Vía de administración
              </label>
              <select
                name="administrationRoute"
                value={formData.administrationRoute}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {ADMINISTRATION_ROUTES.map(route => (
                  <option key={route.value} value={route.value}>{route.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Laboratorio
              </label>
              <select
                name="laboratory"
                value={formData.laboratory}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {LABORATORIES.map(lab => (
                  <option key={lab.value} value={lab.value}>{lab.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Lote
              </label>
              <input
                type="text"
                placeholder="Digite el lote del medicamento"
                name="lote"
                value={formData.lote}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Fecha de fabricación
              </label>
              <input
                type="date"
                placeholder="AAAA-MM-DD"
                name="manufactureDate"
                value={formData.manufactureDate}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Fecha de vencimiento
              </label>
              <input
                type="date"
                placeholder="AAAA-MM-DD"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <button
              type="button"
              className="w-full h-10 rounded font-medium text-sm"
              style={{
                backgroundColor: "var(--color-primary-300)",
                color: "var(--semantic-text-primary)"
              }}
            >
              + Nuevo Laboratorio
            </button>
          </div>

          {/* COLUMNA 3 - DERECHA */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Stock
              </label>
              <input
                type="text"
                placeholder="Text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Precio de Compra
              </label>
              <input
                type="text"
                placeholder="Text"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Precio de venta
              </label>
              <input
                type="text"
                placeholder="Text"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Proveedor
              </label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {SUPPLIERS.map(sup => (
                  <option key={sup.value} value={sup.value}>{sup.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--semantic-text-label)" }}>
                Estado
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-12 p-3 rounded-lg focus:outline-none"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="w-full h-10 rounded font-medium text-sm"
              style={{
                backgroundColor: "var(--color-primary-300)",
                color: "var(--semantic-text-primary)"
              }}
            >
              + Nuevo Proveedor
            </button>
          </div>

          {/* BOTONES - FILA COMPLETA */}
          <div className="col-span-3 flex gap-4 justify-end mt-8">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 rounded-full font-semibold hover:opacity-80 transition"
              style={{ 
                backgroundColor: "var(--color-gray-100)",
                color: "var(--semantic-text-primary)"
              }}
            >
              Volver
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
              style={{ 
                backgroundColor: "var(--color-button-primary-bg)",
                color: "var(--semantic-text-button-primary)"
              }}
            >
              {initialData ? "Actualizar" : "Registrar"} Medicamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}