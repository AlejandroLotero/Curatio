import { useState, useEffect } from "react";
import Input from "../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Toast from "../../../shared/components/Toast";
import CreatePharmaceuticalFormForm from "./CreatePharmaceuticalFormForm";
import CreatePresentationForm from "./CreatePresentationForm";
import CreateAdministrationRouteForm from "./CreateAdministrationRouteForm";
import CreateLaboratoryForm from "./CreateLaboratoryForm";
import CreateSupplierForm from "./CreateSupplierForm";
import CreateStatusForm from "./CreateStatusForm";
import pharmaceuticalFormsData from "../../../data/medjson/pharmaceuticalForms.json";
import presentationsData from "../../../data/medjson/presentations.json";
import administrationRoutesData from "../../../data/medjson/administrationRoutes.json";
import laboratoriesData from "../../../data/medjson/laboratories.json";
import suppliersData from "../../../data/medjson/suppliers.json";
import statusOptionsData from "../../../data/medjson/statusOptions.json";
import "../../../styles/tokens.css";
import "../../../styles/semantic.css";

export default function ProductForm({ onSubmit, onBack, initialData = null }) {
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
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Estados para los modales
  const [openModals, setOpenModals] = useState({
    form: false,
    presentation: false,
    route: false,
    laboratory: false,
    supplier: false,
    status: false,
  });


  // Estados para los arrays dinámicos - cargados desde localStorage o JSONs
  const [pharmaceuticalForms, setPharmaceuticalForms] = useState([]);
  const [presentations, setPresentations] = useState([]);
  const [administrationRoutes, setAdministrationRoutes] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  // Cargar datos desde localStorage o JSONs en el montaje
  useEffect(() => {
    // Cargar o inicializar desde localStorage
    const loadedForms = localStorage.getItem("pharmaceuticalForms") ? 
      JSON.parse(localStorage.getItem("pharmaceuticalForms")) : 
      pharmaceuticalFormsData;
    
    const loadedPresentations = localStorage.getItem("presentations") ? 
      JSON.parse(localStorage.getItem("presentations")) : 
      presentationsData;
    
    const loadedRoutes = localStorage.getItem("administrationRoutes") ? 
      JSON.parse(localStorage.getItem("administrationRoutes")) : 
      administrationRoutesData;
    
    const loadedLaboratories = localStorage.getItem("laboratories") ? 
      JSON.parse(localStorage.getItem("laboratories")) : 
      laboratoriesData;
    
    const loadedSuppliers = localStorage.getItem("suppliers") ? 
      JSON.parse(localStorage.getItem("suppliers")) : 
      suppliersData;
    
    const loadedStatus = localStorage.getItem("statusOptions") ? 
      JSON.parse(localStorage.getItem("statusOptions")) : 
      statusOptionsData;

    setPharmaceuticalForms(loadedForms);
    setPresentations(loadedPresentations);
    setAdministrationRoutes(loadedRoutes);
    setLaboratories(loadedLaboratories);
    setSuppliers(loadedSuppliers);
    setStatusOptions(loadedStatus);
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const toggleModal = (modalKey) => {
    setOpenModals((prev) => ({
      ...prev,
      [modalKey]: !prev[modalKey],
    }));
  };

  const handleAddPharmaceuticalForm = (newForm) => {
    const updated = [...pharmaceuticalForms, newForm];
    setPharmaceuticalForms(updated);
    localStorage.setItem("pharmaceuticalForms", JSON.stringify(updated));
  };

  const handleAddPresentation = (newPresentation) => {
    const updated = [...presentations, newPresentation];
    setPresentations(updated);
    localStorage.setItem("presentations", JSON.stringify(updated));
  };

  const handleAddAdministrationRoute = (newRoute) => {
    const updated = [...administrationRoutes, newRoute];
    setAdministrationRoutes(updated);
    localStorage.setItem("administrationRoutes", JSON.stringify(updated));
  };

  const handleAddLaboratory = (newLaboratory) => {
    const updated = [...laboratories, newLaboratory];
    setLaboratories(updated);
    localStorage.setItem("laboratories", JSON.stringify(updated));
  };

  const handleAddSupplier = (newSupplier) => {
    const updated = [...suppliers, newSupplier];
    setSuppliers(updated);
    localStorage.setItem("suppliers", JSON.stringify(updated));
  };

  const handleAddStatus = (newStatus) => {
    const updated = [...statusOptions, newStatus];
    setStatusOptions(updated);
    localStorage.setItem("statusOptions", JSON.stringify(updated));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Manejar opciones especiales de "agregar nuevo"
    if (value === "add_new_form") {
      toggleModal("form");
      return;
    }
    if (value === "add_new_presentation") {
      toggleModal("presentation");
      return;
    }
    if (value === "add_new_route") {
      toggleModal("route");
      return;
    }
    if (value === "add_new_lab") {
      toggleModal("laboratory");
      return;
    }
    if (value === "add_new_supplier") {
      toggleModal("supplier");
      return;
    }
    if (value === "add_new_status") {
      toggleModal("status");
      return;
    }
    
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
      setToastMessage("Operación exitosa, medicamento creado exitosamente");
      setShowToast(true);
      
      // Limpiar formulario después de 1.5 segundos
      setTimeout(() => {
        setFormData({
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
          status: "",
        });
      }, 1500);
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {pharmaceuticalForms.map(form => (
                  <option key={form.value} value={form.value}>{form.label}</option>
                ))}
                <option value="add_new_form" style={{ color: "var(--color-primary-500)", fontWeight: "bold" }}>+ Agregar nueva forma</option>
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {presentations.map(pres => (
                  <option key={pres.value} value={pres.value}>{pres.label}</option>
                ))}
                <option value="add_new_presentation" style={{ color: "var(--color-primary-500)", fontWeight: "bold" }}>+ Agregar nueva presentación</option>
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {administrationRoutes.map(route => (
                  <option key={route.value} value={route.value}>{route.label}</option>
                ))}
                <option value="add_new_route" style={{ color: "var(--color-primary-500)", fontWeight: "bold" }}>+ Agregar nueva vía</option>
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {laboratories.map(lab => (
                  <option key={lab.value} value={lab.value}>{lab.label}</option>
                ))}
                <option value="add_new_lab" style={{ color: "var(--color-primary-500)", fontWeight: "bold" }}>+ Agregar nuevo laboratorio</option>
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              />
            </div>
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                <option value="">Seleccionar...</option>
                {suppliers.map(sup => (
                  <option key={sup.value} value={sup.value}>{sup.label}</option>
                ))}
                <option value="add_new_supplier" style={{ color: "var(--color-primary-500)", fontWeight: "bold" }}>+ Agregar nuevo proveedor</option>
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
                className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                style={{
                  borderWidth: "2px",
                  borderColor: "var(--color-primary-300)",
                  backgroundColor: "var(--color-primary-50)"
                }}
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
                <option value="add_new_status" style={{ color: "var(--color-primary-500)", fontWeight: "bold" }}>+ Agregar nuevo estado</option>
              </select>
            </div>
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

      {/* MODALES */}
      <CreatePharmaceuticalFormForm
        isOpen={openModals.form}
        onClose={() => toggleModal("form")}
        onAdd={handleAddPharmaceuticalForm}
      />
      <CreatePresentationForm
        isOpen={openModals.presentation}
        onClose={() => toggleModal("presentation")}
        onAdd={handleAddPresentation}
      />
      <CreateAdministrationRouteForm
        isOpen={openModals.route}
        onClose={() => toggleModal("route")}
        onAdd={handleAddAdministrationRoute}
      />
      <CreateLaboratoryForm
        isOpen={openModals.laboratory}
        onClose={() => toggleModal("laboratory")}
        onAdd={handleAddLaboratory}
      />
      <CreateSupplierForm
        isOpen={openModals.supplier}
        onClose={() => toggleModal("supplier")}
        onAdd={handleAddSupplier}
      />
      <CreateStatusForm
        isOpen={openModals.status}
        onClose={() => toggleModal("status")}
        onAdd={handleAddStatus}
      />

      {/* TOAST PARA MEDICAMENTO CREADO */}
      <Toast
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
