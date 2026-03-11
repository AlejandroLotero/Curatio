import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Edit2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "@/shared/components/Button";
import bgAll from "@/assets/images/bgAll.jpg";
import "../../../styles/tokens.css";
import "../../../styles/semantic.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [medicamento, setMedicamento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarMedicamento();
  }, []);

  const cargarMedicamento = () => {
    try {
      const stored = localStorage.getItem("medicamentos");
      if (stored) {
        const meds = JSON.parse(stored);
        const med = meds.find((m) => m.id == id);
        if (med) {
          setMedicamento(med);
        } else {
          setMedicamento(null);
        }
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
          <Link to="/products">
            <Button variant="primary" size="sm">
              Volver a medicamentos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full" style={{
      backgroundImage: `url(${bgAll})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="absolute inset-0 bg-white/20"></div>
      <div className="relative flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
        <div
          className="
            w-full max-w-full lg:max-w-5xl
            min-w-0
            px-4 py-8 sm:px-6 sm:py-12
            grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6
            bg-white/70 dark:bg-neutral-900/20
            backdrop-blur-md
            shadow-xl
            ring-1
            rounded-2xl sm:rounded-3xl
          "
          style={{
            borderColor: "var(--color-primary-200)",
          }}
        >
        <h2
          className="
            text-center
            text-base sm:text-lg md:text-subtittles
            font-bold
            text-label
            col-span-full
            mb-2 sm:mb-4
            wrap-break-word
          "
          style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
        >
          DETALLES DEL MEDICAMENTO
        </h2>

        {/* Columna izquierda */}
        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <DetailField label="ID del Medicamento" value={medicamento.visualId} />
          <DetailField label="Nombre" value={medicamento.nombre} />
          <DetailField label="Forma Farmacéutica" value={medicamento.formaFarmaceutica} />
          <DetailField label="Presentación" value={medicamento.presentacion} />
          <DetailField label="Concentración" value={medicamento.concentracion} />
          <DetailField label="Descripción" value={medicamento.descripcion} />
        </div>

        {/* Columna central */}
        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <DetailField label="Vía de Administración" value={medicamento.viaAdministracion} />
          <DetailField label="Laboratorio" value={medicamento.laboratorio} />
          <DetailField label="Lote" value={medicamento.lote} />
          <DetailField label="Fecha de Fabricación" value={medicamento.fechaFabricacion} />
          <DetailField label="Fecha de Vencimiento" value={medicamento.fechaVencimiento} />
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <DetailField label="Stock" value={medicamento.stock} />
          <DetailField label="Precio de Compra" value={`$${medicamento.precioCompra}`} />
          <DetailField label="Precio de Venta" value={`$${medicamento.precioVenta}`} />
          <DetailField label="Proveedor" value={medicamento.proveedor} />
          <DetailField label="Estado" value={medicamento.estado} />
        </div>

        {/* Botones */}
        <div className="col-span-full flex flex-col-reverse sm:flex-row justify-start gap-3 w-full max-w-full mx-auto mt-6 min-w-0">
          <Link to="/products">
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
