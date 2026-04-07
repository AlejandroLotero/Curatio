// // Componente reutilizable que muestra un switch para activar o desactivar estados
// import StatusSwitch from "@/shared/components/StatusSwitch";

// // Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
// import ProductRowActions from "../components/ProductRowActions";

// // Definición de las columnas de la tabla de productos
// // Este arreglo suele usarse en librerías de tablas como TanStack Table
// export const ProductColumns = [

//   // Columna ID
//   {
//     accessorKey: "id", // Propiedad del objeto product que se mostrará en la columna
//     header: "Id",      // Título de la columna
//   },

//   // Columna Nombre del Producto
//   {
//     accessorKey: "nameproduct", // Campo del objeto product
//     header: "Medicamento",    // Encabezado visible
//   },

//   // Columna Concentración
//   {
//     accessorKey: "concentration",
//     header: "Concentración",
//   },

//   // Columna Vía de Administración
//   {
//     accessorKey: "administration_guide",
//     header: "Vía de Administración",
//   },

//   // Columna Laboratorio
//   {
//     accessorKey: "laboratory",
//     header: "Laboratorio",
//   },

//   // Columna Stock
//   {
//     accessorKey: "stock",
//     header: "Stock",
//   },

//   // Columna Estado (activo / inactivo)
//   {
//     accessorKey: "state",
//     header: "Estado",

//     // Render personalizado de la celda
//     // Permite mostrar un componente en lugar de solo texto
//     cell: ({ row }) => {

//       // Se obtiene el objeto completo del producto de la fila
//       const product = row.original;

//       // Función que se ejecuta cuando cambia el switch
//       const handleChange = (value) => {

//         // value representa el nuevo estado del switch (true o false)
//         console.log("Actualizar estado producto:", product.id, value);

//         // Aquí normalmente se llamaría una API para actualizar el estado
//         // updateProductStatus(product.id, value)
//       };

//       return (
//         // Componente reutilizable para mostrar el switch
//         <StatusSwitch
//           checked={product.state === "Activo"} // Estado actual del producto
//           onChange={handleChange}  // Función que maneja el cambio
//         />
//       );
//     },
//   },

//   // Columna de acciones (editar / eliminar)
//   {
//     id: "actions", // No usa accessorKey porque no corresponde a un campo del producto
//     header: () => <div className="text-center">Acciones</div>, // Encabezado centrado

//     // Renderiza el componente de acciones pasando el producto completo
//     cell: ({ row }) => <div className="flex justify-center"><ProductRowActions product={row.original} /></div>,
//   },
// ];

import ProductRowActions from "../components/ProductRowActions";

export const ProductColumns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nameproduct",
    header: "Medicamento",
  },
  {
    accessorKey: "concentration",
    header: "Concentración",
  },
  {
    accessorKey: "administration_guide",
    header: "Vía de Administración",
  },
  {
    accessorKey: "laboratory",
    header: "Laboratorio",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => {
      const state = row.original?.state ?? "";

      return (
        <div className="flex justify-center">
          <span
            className="px-3 py-1 p-3 text-gray-50 text-center ">
            {state}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Acciones</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ProductRowActions product={row.original} />
      </div>
    ),
  },
];