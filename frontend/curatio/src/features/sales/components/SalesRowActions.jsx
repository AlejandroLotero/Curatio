// import { Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// /**
//  * Acciones por fila en el listado de ventas.
//  * El ícono Eye navega al recibo / factura electrónica de venta.
//  */
// export default function SalesRowActions({ sale }) {
//   const navigate = useNavigate();

//   const handleView = () => {
//     const q = sale?.id ? `?saleId=${encodeURIComponent(sale.id)}` : "";
//     navigate(`/sales/factura-electronica${q}`);
//   };

//   return (
//     <div className="flex gap-2">
//       <button
//         type="button"
//         onClick={handleView}
//         className="p-1 rounded hover:bg-white/80 transition-colors duration-400"
//         title="Ver recibo de venta"
//       >
//         <Eye size={16} />
//       </button>
//     </div>
//   );
// }
import { Eye, Pencil, Ban } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Acciones por fila del módulo de ventas.
 *
 * Se separan de la configuración de columnas para:
 * - mantener el archivo de columnas más limpio
 * - facilitar reuso y mantenimiento
 * - conservar consistencia con otros módulos del proyecto
 */
export default function SalesRowActions({ sale }) {
  const navigate = useNavigate();

  /**
   * Navega al detalle de la venta.
   */
  const handleView = () => {
    if (!sale?.id) return;
    navigate(`/sales/detalle/${sale.id}`);
  };

  /**
   * Navega a la pantalla de edición.
   */
  const handleEdit = () => {
    if (!sale?.id) return;
    navigate(`/sales/editar/${sale.id}`);
  };

  /**
   * Navega a la pantalla de anulación.
   */
  const handleCancel = () => {
    if (!sale?.id) return;
    navigate(`/sales/anular/${sale.id}`);
  };

  const canEdit = sale?.status !== "Anulada";
  const canCancel = sale?.status === "Pendiente" || sale?.status === "Completada";

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleView}
        className="p-1 rounded hover:bg-gray-100"
        title="Ver detalle"
      >
        <Eye size={16} />
      </button>

      <button
        type="button"
        onClick={handleEdit}
        className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        title="Editar"
        disabled={!canEdit}
      >
        <Pencil size={16} />
      </button>

      <button
        type="button"
        onClick={handleCancel}
        className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        title="Anular"
        disabled={!canCancel}
      >
        <Ban size={16} />
      </button>
    </div>
  );
}