// Iconos usados en los botones de acciones
import { Eye, Pencil } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useNavigate } from "react-router-dom";

// Componente que renderiza las acciones de cada fila de supplier
// Recibe como prop el objeto supplier
export default function SuppliersRowActions({ supplier }) {

  // Hook que permite redirigir a otra ruta desde código
  const navigate = useNavigate();

  // Acción para visualizar el supplier
  const handleView = () => {
    navigate(`/suppliers/detalle/${supplier.id}`);
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

