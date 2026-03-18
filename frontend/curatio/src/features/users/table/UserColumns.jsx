// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import UserRowActions from "../components/UserRowActions";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const UserColumns = [

  // Columna ID
  {
    accessorKey: "id", // Propiedad del objeto user que se mostrará en la columna
    header: "Id",      // Título de la columna
  },

  // Columna Nombre
  {
    accessorKey: "name", // Campo del objeto user
    header: "Nombre",    // Encabezado visible
  },
  {
    accessorKey: "DocumentType", // Campo del objeto user
    header: "Tipo Documento",    // Encabezado visible
  },
  {
    accessorKey: "document", // Campo del objeto user
    header: "Número Documento",    // Encabezado visible
  },
  {
    accessorKey: "rol", // Campo del objeto user
    header: "Rol",    // Encabezado visible
  },
  {
    accessorKey: "phone", // Campo del objeto user
    header: "Teléfono",    // Encabezado visible
  },

  // Columna Email
  {
    accessorKey: "email",
    header: "Email",
  },

  // Columna Estado (activo / inactivo)
  {
    accessorKey: "is_active",
    header: "Estado",

    // Render personalizado de la celda
    // Permite mostrar un componente en lugar de solo texto
    cell: ({ row }) => {

      // Se obtiene el objeto completo del usuario de la fila
      const user = row.original;

      // Función que se ejecuta cuando cambia el switch
      const handleChange = (value) => {

        // value representa el nuevo estado del switch (true o false)
        console.log("Actualizar estado usuario:", user.id, value);

        // Aquí normalmente se llamaría una API para actualizar el estado
        // updateUserStatus(user.user_id, value)
      };

      return (
        // Componente reutilizable para mostrar el switch
        <StatusSwitch
          checked={user.is_active} // Estado actual del usuario
          onChange={handleChange}  // Función que maneja el cambio
        />
      );
    },
  },

  // Columna de acciones (editar / eliminar)
  {
    id: "actions", // No usa accessorKey porque no corresponde a un campo del usuario
    header: "Acciones", // Título de la columna en el encabezado

    // Renderiza el componente de acciones pasando el usuario completo
    cell: ({ row }) => <UserRowActions user={row.original} />,
  },
];
