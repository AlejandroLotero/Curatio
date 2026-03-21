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

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductRowActions({ product }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/products/detalle/${product.id}`);
  };

  const handleEdit = () => {
    navigate(`/products/editar/${product.id}`);
  };

  const handleDelete = () => {
    console.log("Pending real action for medication:", product.id);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleView}
        className="p-1 rounded hover:bg-gray-300 text-black transition"
        title="Ver detalles"
      >
        <Eye size={16} />
      </button>

      <button
        onClick={handleEdit}
        className="p-1 rounded hover:bg-gray-300 text-black transition"
        title="Editar"
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={handleDelete}
        className="p-1 rounded hover:bg-red-200 text-red-900 transition"
        title="Eliminar"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
