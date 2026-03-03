import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit2 } from "lucide-react";
import "../../../styles/tokens.css";
import "../../../styles/semantic.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicamento, setMedicamento] = useState(null);
  const [loading, setLoading] = useState(true);

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
            navigate("/products");
          }
        } else {
          navigate("/products");
        }
      } catch (error) {
        console.error("Error cargando medicamento:", error);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    cargarMedicamento();
  }, [id, navigate]);

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
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "var(--color-primary-50)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* ENCABEZADO CON BOTÓN VOLVER */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/products")}
            className="p-2 rounded-lg hover:opacity-70 transition"
            style={{
              backgroundColor: "var(--color-gray-100)",
              color: "var(--semantic-text-primary)",
            }}
            title="Volver"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1
              className="text-4xl font-bold"
              style={{ color: "var(--semantic-text-primary)" }}
            >
              {medicamento.medicationName}
            </h1>
            <p style={{ color: "var(--semantic-text-label)" }}>
              ID: {medicamento.medicationId}
            </p>
          </div>
        </div>

        {/* TARJETA PRINCIPAL */}
        <div
          className="rounded-lg p-8 mb-6"
          style={{
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* GRID DE DETALLES */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* COLUMNA 1 */}
            <div className="space-y-6">
              <DetailItem
                label="Forma Farmacéutica"
                value={medicamento.pharmaceuticalForm}
              />
              <DetailItem
                label="Presentación"
                value={medicamento.presentation}
              />
              <DetailItem
                label="Concentración"
                value={medicamento.concentration}
              />
              <DetailItem
                label="Descripción"
                value={medicamento.description}
              />
              <DetailItem
                label="Vía de Administración"
                value={medicamento.administrationRoute}
              />
              <DetailItem
                label="Laboratorio"
                value={medicamento.laboratory}
              />
            </div>

            {/* COLUMNA 2 */}
            <div className="space-y-6">
              <DetailItem label="Lote" value={medicamento.lote} />
              <DetailItem
                label="Fecha de Fabricación"
                value={medicamento.manufactureDate}
              />
              <DetailItem
                label="Fecha de Vencimiento"
                value={medicamento.expirationDate}
              />
              <DetailItem label="Proveedor" value={medicamento.supplier} />
              <DetailItem label="Estado" value={medicamento.status} />
              <DetailItem label="Stock" value={medicamento.stock} />
            </div>
          </div>

          {/* SECCIÓN DE PRECIOS */}
          <div
            className="border-t pt-6"
            style={{ borderColor: "var(--color-primary-200)" }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--semantic-text-primary)" }}
            >
              Información de Precios
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <PriceCard
                label="Precio de Compra"
                value={medicamento.purchasePrice}
              />
              <PriceCard
                label="Precio de Venta"
                value={medicamento.salePrice}
              />
            </div>
          </div>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 rounded-full font-semibold hover:opacity-80 transition"
            style={{
              backgroundColor: "var(--color-gray-100)",
              color: "var(--semantic-text-primary)",
            }}
          >
            Volver
          </button>
          <button
            onClick={() => navigate(`/products/${id}/edit`)}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
            style={{
              backgroundColor: "var(--color-button-primary-bg)",
              color: "var(--semantic-text-button-primary)",
            }}
          >
            <Edit2 size={18} />
            Editar
          </button>
        </div>

        {/* INFORMACIÓN DE AUDITORÍA */}
        {(medicamento.createdAt || medicamento.updatedAt) && (
          <div
            className="mt-6 p-4 rounded-lg text-xs"
            style={{
              backgroundColor: "var(--color-primary-100)",
              color: "var(--semantic-text-label)",
            }}
          >
            {medicamento.createdAt && (
              <p>Creado: {new Date(medicamento.createdAt).toLocaleString()}</p>
            )}
            {medicamento.updatedAt && (
              <p>Última actualización: {new Date(medicamento.updatedAt).toLocaleString()}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para mostrar detalles
function DetailItem({ label, value }) {
  return (
    <div>
      <p
        className="text-sm font-semibold mb-2"
        style={{ color: "var(--semantic-text-label)" }}
      >
        {label}
      </p>
      <p
        className="text-lg"
        style={{ color: "var(--semantic-text-primary)" }}
      >
        {value || "-"}
      </p>
    </div>
  );
}

// Componente para mostrar precios
function PriceCard({ label, value }) {
  return (
    <div
      className="p-4 rounded-lg"
      style={{ backgroundColor: "var(--color-primary-50)" }}
    >
      <p
        className="text-sm font-semibold mb-2"
        style={{ color: "var(--semantic-text-label)" }}
      >
        {label}
      </p>
      <p
        className="text-2xl font-bold"
        style={{ color: "var(--color-primary-500)" }}
      >
        ${value || "0.00"}
      </p>
    </div>
  );
}
