// // los actionsButtons Contienen las acionesde cada fila 
// //Si necesito realizar la celda de las acciones de la fila  de los productos debe de llamarse
// // Iconos usados en los botones de acciones
// import { Eye, Pencil, Trash2 } from "lucide-react";

// // Hook de React Router para navegar programáticamente entre rutas
// import { useNavigate } from "react-router-dom";

// // Componente que renderiza las acciones de cada fila de producto
// // Recibe como prop el objeto product
// export default function ProductRowActions({ product }) {

//   // Hook que permite redirigir a otra ruta desde código
//   const navigate = useNavigate();

//   // Acción para ver detalles del producto
//   // Redirige a la página de detalles usando el id del producto
//   const handleView = () => {
//     navigate(`/products/detalle/${product.id}`);
//   };

//   // Acción para editar el producto
//   // Redirige a la página de edición usando el id del producto
//   const handleEdit = () => {
//     navigate(`/products/${product.id}/edit`);
//   };

//   // Acción para eliminar el producto
//   // Actualmente solo imprime en consola el id
//   // En una aplicación real aquí se llamaría a la API
//   const handleDelete = () => {
//     console.log("Eliminar producto", product.id);
//   };

//   return (
//     // Contenedor de los botones de acciones
//     <div className="flex gap-2">

//       {/* Botón ver detalles */}
//       <button
//         onClick={handleView}
//         className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
//         title="Ver detalles"
//       >
//         <Eye size={16} /> {/* Icono de ver */}
//       </button>

//       {/* Botón editar */}
//       <button
//         onClick={handleEdit}
//         className="p-1 rounded hover:bg-amber-100 text-amber-600 transition"
//         title="Editar"
//       >
//         <Pencil size={16} /> {/* Icono de editar */}
//       </button>

//       {/* Botón eliminar */}
//       <button
//         onClick={handleDelete}
//         className="p-1 rounded hover:bg-red-100 text-red-600 transition"
//         title="Eliminar"
//       >
//         <Trash2 size={16} /> {/* Icono de eliminar */}
//       </button>

//     </div>
//   );
// }

/////VErsion 2

// // Iconos usados en los botones de acciones permitidas
// import { Eye, Pencil } from "lucide-react";

// // Hook de React Router para navegación programática
// import { useNavigate } from "react-router-dom";

// /**
//  * ProductRowActions
//  * -----------------
//  * Acciones disponibles por fila para medicamentos/productos.
//  *
//  * Regla aplicada:
//  * - NO se permite acción de eliminar en el listado.
//  * - Solo se deja ver detalle y editar.
//  */
// export default function ProductRowActions({ product }) {
//   // Hook para navegar a otras rutas
//   const navigate = useNavigate();

//   /**
//    * Navega al detalle del medicamento.
//    */
//   const handleView = () => {
//     navigate(`/products/detalle/${product.id}`);
//   };

//   /**
//    * Navega a edición del medicamento.
//    * La ruta puede ajustarse luego cuando cierres edición real.
//    */
//   const handleEdit = () => {
//     navigate(`/products/${product.id}/edit`);
//   };

//   return (
//     // Contenedor de acciones disponibles
//     <div className="flex gap-2">
//       {/* Acción: ver detalle */}
//       <button
//         onClick={handleView}
//         className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
//         title="Ver detalles"
//       >
//         <Eye size={16} />
//       </button>

//       {/* Acción: editar */}
//       <button
//         onClick={handleEdit}
//         className="p-1 rounded hover:bg-amber-100 text-amber-600 transition"
//         title="Editar"
//       >
//         <Pencil size={16} />
//       </button>
//     </div>
//   );
// }

// Iconos usados en los botones de acciones
import { Eye, Pencil } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useNavigate } from "react-router-dom";

// Componente que renderiza las acciones de cada fila de producto
// Recibe como prop el objeto product
export default function ProductRowActions({ product }) {
  // Hook que permite redirigir a otra ruta desde código
  const navigate = useNavigate();

  /**
   * Acción para ver detalle administrativo del producto.
   * Esta vista es interna para gestión.
   */
  const handleView = () => {
    navigate(`/products/admin/detalle/${product.id}`);
  };

  /**
   * Acción para editar el producto.
   * Redirige a la página de edición usando el id del producto.
   */
  const handleEdit = () => {
    navigate(`/products/${product.id}/edit`);
  };

  return (
    <div className="flex gap-2">
      {/* Botón ver detalle administrativo */}
      <button
        type="button"
        onClick={handleView}
        className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
        title="Ver detalles"
      >
        <Eye size={16} />
      </button>

      {/* Botón editar */}
      <button
        type="button"
        onClick={handleEdit}
        className="p-1 rounded hover:bg-amber-100 text-amber-600 transition"
        title="Editar"
      >
        <Pencil size={16} />
      </button>
    </div>
  );
}
