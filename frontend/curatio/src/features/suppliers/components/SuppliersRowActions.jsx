// Iconos usados en los botones de acciones
import { Link, Pencil, Trash2 } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useNavigate } from "react-router-dom";

// Modal de confirmación reutilizable
import { ConfirmDialog } from "@/shared/components";

import { useState } from "react";

// Componente que renderiza las acciones de cada fila de supplier
// Recibe como prop el objeto supplier
export default function SuppliersRowActions({ supplier }) {

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Hook que permite redirigir a otra ruta desde código
  const navigate = useNavigate();

  // Acción para ver/editar el supplier
  // Redirige a la ruta de detalle configurada en el router
  const handleEdit = () => {
    navigate("/suppliers/detalle");
  };

  // Abre el modal de confirmación
  const handleOpenConfirm = () => {
    setIsConfirmOpen(true);
  };

  // Acción real de "eliminar" (simulada)
  const handleConfirmDelete = () => {
    console.log("Eliminar supplier", supplier.id);
    // Aquí iría la llamada a la API real para eliminar
    setIsSuccessOpen(true);
  };

  // Cuando se cierra el modal de éxito, redirigimos a la lista
  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    navigate("/suppliers/listar-proveedores");
  };

  return (
    <>
      {/* Contenedor de los botones de acciones */}
      <div className="flex gap-2">

        {/* Botón editar */}
        <button
          onClick={handleEdit} // Ejecuta la navegación a la página de detalle
          className="p-1 rounded hover:bg-gray-100"
        >
          <Pencil size={16} /> {/* Icono de editar */}
        </button>

        {/* Botón eliminar */}
        <button
          onClick={handleOpenConfirm} // Abre el modal de confirmación
          className="p-1 rounded hover:bg-gray-100"
        >
          <Trash2 size={16} /> {/* Icono de eliminar */}
        </button>

      </div>

      {/* Modal de confirmación de eliminación */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar proveedor"
        message={`¿Estás seguro de que deseas eliminar al proveedor "${supplier.nombreProveedor}"?`}
      />

      {/* Modal de éxito de eliminación */}
      <ConfirmDialog
        isOpen={isSuccessOpen}
        onClose={handleCloseSuccess}
        onConfirm={handleCloseSuccess}
        title="Proveedor eliminado"
        message="El proveedor ha sido eliminado exitosamente."
      />
    </>
  );
}
