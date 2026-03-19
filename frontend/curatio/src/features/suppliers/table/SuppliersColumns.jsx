// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import SuppliersRowActions from "../components/SuppliersRowActions";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const SuppliersColumns = [

  // Columna ID
  {
    accessorKey: "id",
    header: "Id",
  },

  // Columna Nombre del proveedor
  {
    accessorKey: "nombreProveedor",
    header: "Nombre del proveedor",
  },

  // Columna NIT
  {
    accessorKey: "nit",
    header: "NIT",
  },

  // Columna Nombre del contacto
  {
    accessorKey: "nombreContacto",
    header: "Nombre contacto",
  },

  // Columna Teléfono del contacto
  {
    accessorKey: "telefonoContacto",
    header: "Teléfono contacto",
  },

  // Columna Correo electrónico
  {
    accessorKey: "correoElectronico",
    header: "Correo electrónico",
  },

  // Columna Estado (activo / inactivo)
  {
    accessorKey: "is_active",
    header: "Estado",
    // Render personalizado de la celda
    // Permite mostrar un componente en lugar de solo texto
    cell: ({ row }) => {

      // Se obtiene el objeto completo del proveedor de la fila
      const suplier = row.original;

      // Función que se ejecuta cuando cambia el switch
      const handleChange = (value) => {

        // value representa el nuevo estado del switch (true o false)
        console.log("Actualizar estado proveedor:", suplier.id, value);

        // Aquí normalmente se llamaría una API para actualizar el estado
        // updateSupplierStatus(suplier.id, value)
      };

      return (
        // Componente reutilizable para mostrar el switch
        <StatusSwitch
          checked={suplier.is_active} // Estado actual del proveedor
          onChange={handleChange}  // Función que maneja el cambio
        />
      );
    },
  },

  // Columna de acciones (editar / eliminar)
  {
    id: "actions", // No usa accessorKey porque no corresponde a un campo del proveedor

    // Renderiza el componente de acciones pasando el proveedor completo
    cell: ({ row }) => <SuppliersRowActions supplier={row.original} />,
  },
];
