// Iconos usados en los botones de acciones
import { Link, Pencil, Trash2 } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useNavigate } from "react-router-dom";

// Componente que renderiza las acciones de cada fila de supplier
// Recibe como prop el objeto supplier
export default function SuppliersRowActions({ supplier }) {

  // const handleEdit = () => {
  //   console.log("Editar supplier", supplier.id);
  // };

  // Hook que permite redirigir a otra ruta desde código
  const navigate = useNavigate();

  // Acción para editar el  supplier
  // Redirige a la página de edición usando el id del supplier
  const handleEdit = () => {
    navigate(`/suppliers/${supplier.id}/edit/`);
  };


  // Acción para eliminar el usuario
  // Actualmente solo imprime en consola el id
  // En una aplicación real aquí se llamaría a la API
  const handleDelete = () => {
    console.log("Eliminar supplier", supplier.id);
    navigate(`/suppliers/${supplier.id}/delete/`);
  };

  return (
    // Contenedor de los botones de acciones
    <div className="flex gap-2">

      {/* Botón editar */}
    
      <button
        onClick={handleEdit} // Ejecuta la navegación a la página de edición
        className="p-1 rounded hover:bg-gray-100"
        
      >
        <Pencil size={16} /> {/* Icono de editar */}
      </button>
       

      {/* Botón eliminar */}
      <button
        onClick={handleDelete} // Ejecuta la acción de eliminación
        className="p-1 rounded hover:bg-gray-100"
      >
        <Trash2 size={16} /> {/* Icono de eliminar */}
      </button>

    </div>
  );
}
