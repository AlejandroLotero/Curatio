// //Si necesito realizer la celda de las acciones de la Fila de los productos el componente debe llamarse.

// // Iconos usados en los botones de acciones
// import { Eye, Pencil, Trash2 } from "lucide-react";

// // Hook de React Router para navegar programáticamente entre rutas
// import { useNavigate } from "react-router-dom";

// // Componente que renderiza las acciones de cada fila de usuario
// // Recibe como prop el objeto user
// export default function UserRowActions({ user }) {

//   // const handleEdit = () => {
//   //   console.log("Editar usuario", user.id);
//   // };

//   // Hook que permite redirigir a otra ruta desde código
//   const navigate = useNavigate();

//   // Acción para editar el usuario
//   // Redirige a la página de edición usando el id del usuario
//   const handleEdit = () => {
//     navigate(`/accounts/editar-datos-basicos/${user.id}`); // Redirige a la página de edición de datos básicos
//   };
  
//   const handleView = () => {
//     navigate(`/accounts/perfil/${user.id}`);
//   };


//   // Acción para eliminar el usuario
//   // Actualmente solo imprime en consola el id
//   // En una aplicación real aquí se llamaría a la API
//   const handleDelete = () => {
//     console.log("Eliminar usuario", user.id);
//   };

//   return (
//     // Contenedor de los botones de acciones
//     <div className="flex gap-2">

//       {/* Botón ver */}
//       <button
//         onClick={handleView}
//         className="p-1 rounded hover:bg-white/80 transition-colors duration-400"
//       >
//         <Eye size={16} />
//       </button>

//       {/* Botón editar */}
//             <button
//         onClick={handleEdit} // Ejecuta la navegación a la página de edición
//         className="p-1 rounded hover:bg-white/80 transition-colors duration-400"
//       >
//         <Pencil size={16} /> {/* Icono de editar */}
//       </button>


//       {/* Botón eliminar */}
//       <button
//         onClick={handleDelete} // Ejecuta la acción de eliminación
//         className="p-1 rounded hover:bg-white/80 transition-colors duration-400"
//       >
//         <Trash2 size={16} /> {/* Icono de eliminar */}
//       </button>

//     </div>
//   );
// }

// Iconos permitidos para acciones de usuario
import { Eye, Pencil } from "lucide-react";

// Hook de React Router para navegar programáticamente
import { useNavigate } from "react-router-dom";

/**
 * UserRowActions
 * --------------
 * Acciones disponibles por fila para usuarios.
 *
 * Regla aplicada:
 * - NO se permite acción de eliminar en el listado.
 * - El cambio de estado no va aquí, va en una columna con switch.
 * - Solo se deja ver y editar.
 */
export default function UserRowActions({ user }) {
  // Hook para navegación
  const navigate = useNavigate();

  /**
   * Navega a edición del usuario.
   */
  const handleEdit = () => {
    navigate(`/accounts/editar-datos-basicos/${user.id}`);
  };

  /**
   * Navega al perfil/detalle del usuario.
   */
  const handleView = () => {
    navigate(`/accounts/perfil/${user.id}`);
  };

  return (
    // Contenedor de acciones permitidas
    <div className="flex gap-2">
      {/* Acción: ver */}
      <button
        onClick={handleView}
        className="p-1 rounded hover:bg-white/80 transition-colors duration-400"
        title="Ver"
      >
        <Eye size={16} />
      </button>

      {/* Acción: editar */}
      <button
        onClick={handleEdit}
        className="p-1 rounded hover:bg-white/80 transition-colors duration-400"
        title="Editar"
      >
        <Pencil size={16} />
      </button>
    </div>
  );
}