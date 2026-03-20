import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "@/shared/components/Button";
import { listProducts } from "@/data/product/listProducts";
import "../../../../styles/tokens.css";
import "../../../../styles/semantic.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [medicamento, setMedicamento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarMedicamento();
  }, [id]);

  const cargarMedicamento = () => {
    try {
      const med = listProducts.find((m) => m.id == id);
      if (med) {
        setMedicamento(med);
      } else {
        setMedicamento(null);
      }
    } catch (error) {
      console.error("Error cargando medicamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const DetailField = ({ label, value }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-label" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
        {label}
      </label>
      <p className="p-3 rounded-lg bg-cyan-50 text-label" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)", border: "1px solid var(--color-primary-200)" }}>
        {value || "—"}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-label">Cargando...</p>
      </div>
    );
  }

  if (!medicamento) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-label mb-4">Medicamento no encontrado</p>
          <Link to="/products/listar">
            <Button variant="primary" size="sm">
              Volver a medicamentos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className="relative flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
        <div
          className="
            w-full max-w-5xl
            min-w-0
            px-4 py-8 sm:px-6 sm:py-12
            flex flex-col gap-6
            bg-white/30
            backdrop-blur-md
            border
            rounded-lg
            shadow-xl
            ring-1
          "
          style={{
            borderColor: "var(--color-primary-200)",
          }}
        >
        <h2
          className="
            text-center
            text-4xl
            font-bold
            text-label
            wrap-break-word
          "
          style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
        >
          DETALLES DEL MEDICAMENTO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DetailField label="ID" value={medicamento.id} />
          <DetailField label="Medicamento" value={medicamento.nameproduct} />
          <DetailField label="Forma Farmacéutica" value={medicamento.formaFarmaceutica} />
          <DetailField label="Presentación" value={medicamento.presentacion} />
          <DetailField label="Concentración" value={medicamento.concentration} />
          <DetailField label="Descripción" value={medicamento.descripcion} />
          <DetailField label="Vía de Administración" value={medicamento.administration_guide} />
          <DetailField label="Laboratorio" value={medicamento.laboratory} />
          <DetailField label="Lote" value={medicamento.lote} />
          <DetailField label="Fecha de Fabricación" value={medicamento.fechaFabricacion} />
          <DetailField label="Fecha de Vencimiento" value={medicamento.fechaVencimiento} />
          <DetailField label="Stock" value={medicamento.stock} />
          <DetailField label="Precio de Compra" value={`$${medicamento.precioCompra}`} />
          <DetailField label="Precio de Venta" value={`$${medicamento.precioVenta}`} />
          <DetailField label="Proveedor" value={medicamento.proveedor} />
          <DetailField label="Estado" value={medicamento.state} />
        </div>

        {/* Botón Volver */}
        <div className="flex w-full pt-4">
          <Link to="/products/listar">
            <Button variant="secondary" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Volver
            </Button>
          </Link>
        </div>

      </div>
      </div>
    </div>
  );
}