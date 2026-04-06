// Iconos usados en los botones de acciones
import { Eye, Pencil } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useNavigate } from "react-router-dom";

// Componente que renderiza las acciones de cada fila de supplier
// Recibe como prop el objeto supplier
export default function SuppliersRowActions({ supplier }) {

  // Hook que permite redirigir a otra ruta desde código
  const navigate = useNavigate();

  // Acción para ver/editar el supplier
  // Redirige a la ruta de detalle configurada en el router
  const handleEdit = () => {
    // Detalle vía GET /v1/procurement/suppliers/<nit>/ (NIT es la PK en el backend).
    const nit = supplier?.nit;
    if (nit) {
      navigate(`/suppliers/detalle?nit=${encodeURIComponent(nit)}`);
    } else {
      navigate("/suppliers/detalle");
    }
  };

  // Abre el modal de confirmación
  const handleOpenConfirm = () => {
    setIsConfirmOpen(true);
  };

  // El backend (products) no expone DELETE de proveedores vía API REST; sigue siendo solo simulación en UI.
  const handleConfirmDelete = () => {
    console.log("Eliminar supplier", supplier.id);
    setIsSuccessOpen(true);
  };

  // Acción para editar el supplier
  const handleEdit = () => {
    navigate(`/suppliers/editar/${supplier.id}`);
  };

  return (
    <div className="flex gap-2">

      {/* Botón visualizar */}
      <button
        onClick={handleView}
        className="p-1 rounded hover:bg-gray-100"
        title="Ver detalle"
      >
        <Eye size={16} />
      </button>

      {/* Botón editar */}
      <button
        onClick={handleEdit}
        className="p-1 rounded hover:bg-gray-100"
        title="Editar"
      >
        <Pencil size={16} />
      </button>

    </div>
  );
}

