import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Acciones por fila en el listado de ventas.
 * El ícono Eye navega al recibo / factura electrónica de venta.
 */
export default function SalesRowActions({ sale }) {
  const navigate = useNavigate();

  const handleView = () => {
    const q = sale?.id ? `?saleId=${encodeURIComponent(sale.id)}` : "";
    navigate(`/sales/factura-electronica${q}`);
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleView}
        className="p-1 rounded hover:bg-white/80 transition-colors duration-400"
        title="Ver recibo de venta"
      >
        <Eye size={16} />
      </button>
    </div>
  );
}
