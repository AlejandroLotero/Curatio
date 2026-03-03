import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import Toast from "../../../shared/components/Toast";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [medicamento, setMedicamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Cargar medicamento al montar
  useEffect(() => {
    const cargarMedicamento = () => {
      try {
        const stored = localStorage.getItem("medicamentos");
        if (stored) {
          const medicamentos = JSON.parse(stored);
          const found = medicamentos.find((m) => m.id === id);
          
          if (found) {
            setMedicamento(found);
          } else {
            setToastMessage("Medicamento no encontrado");
            setShowToast(true);
            setTimeout(() => navigate("/products"), 2000);
          }
        } else {
          setToastMessage("No hay medicamentos registrados");
          setShowToast(true);
          setTimeout(() => navigate("/products"), 2000);
        }
      } catch (error) {
        console.error("Error cargando medicamento:", error);
        setToastMessage("Error al cargar el medicamento");
        setShowToast(true);
        setTimeout(() => navigate("/products"), 2000);
      } finally {
        setLoading(false);
      }
    };

    cargarMedicamento();
  }, [id, navigate]);

  const handleUpdateMedicamento = (formData) => {
    try {
      const stored = localStorage.getItem("medicamentos");
      if (stored) {
        const medicamentos = JSON.parse(stored);
        const updated = medicamentos.map((m) =>
          m.id === id ? { ...m, ...formData, updatedAt: new Date().toISOString() } : m
        );

        localStorage.setItem("medicamentos", JSON.stringify(updated));
        
        setToastMessage("Medicamento actualizado exitosamente");
        setShowToast(true);
        
        setTimeout(() => navigate("/products"), 2000);
      }
    } catch (error) {
      console.error("Error actualizando medicamento:", error);
      setToastMessage("Error al actualizar el medicamento");
      setShowToast(true);
    }
  };

  const handleBack = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary-50)" }}
      >
        <p style={{ color: "var(--semantic-text-label)" }}>Cargando...</p>
      </div>
    );
  }

  if (!medicamento) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary-50)" }}
      >
        <p style={{ color: "var(--semantic-text-label)" }}>
          Medicamento no encontrado
        </p>
      </div>
    );
  }

  return (
    <>
      <ProductForm
        initialData={medicamento}
        onSubmit={handleUpdateMedicamento}
        onBack={handleBack}
      />

      <Toast
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
