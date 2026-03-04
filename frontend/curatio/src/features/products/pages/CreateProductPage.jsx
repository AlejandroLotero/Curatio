import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductForm from "../components/ProductForm";
import Toast from "../../../shared/components/Toast";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleCreateMedicamento = (formData) => {
    try {
      // Generar ID único
      const newMedicamento = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      // Obtener medicamentos existentes
      const stored = localStorage.getItem("medicamentos");
      const medicamentos = stored ? JSON.parse(stored) : [];

      // Agregar nuevo
      const updated = [...medicamentos, newMedicamento];
      localStorage.setItem("medicamentos", JSON.stringify(updated));

      setToastMessage("Medicamento creado exitosamente");
      setShowToast(true);

      // Redirigir después de 2 segundos
      setTimeout(() => navigate("/products"), 2000);
    } catch (error) {
      console.error("Error creando medicamento:", error);
      setToastMessage("Error al crear el medicamento");
      setShowToast(true);
    }
  };

  const handleBack = () => {
    navigate("/products");
  };

  return (
    <>
      <ProductForm onSubmit={handleCreateMedicamento} onBack={handleBack} />
      <Toast
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
