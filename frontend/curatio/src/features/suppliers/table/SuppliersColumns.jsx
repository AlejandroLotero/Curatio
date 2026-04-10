// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import SuppliersRowActions from "../components/SuppliersRowActions";

/**
 * Columnas de la tabla de proveedores.
 * onStatusChange: callback hacia PATCH /v1/procurement/suppliers/<nit>/status/ (solo admin en backend).
 */
export function buildSuppliersColumns({ onStatusChange } = {}) {
  return [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "nombreProveedor",
      header: "Nombre del proveedor",
    },
    {
      accessorKey: "nit",
      header: "NIT",
    },
    {
      accessorKey: "nombreContacto",
      header: "Nombre contacto",
    },
    {
      accessorKey: "telefonoContacto",
      header: "Teléfono contacto",
    },
    {
      accessorKey: "correoElectronico",
      header: "Correo electrónico",
    },
    {
      accessorKey: "is_active",
      header: "Estado",
      cell: ({ row }) => {
        const suplier = row.original;

        const handleChange = (value) => {
          onStatusChange?.(suplier, value);
        };

        return (
          <StatusSwitch
            checked={suplier.is_active}
            onChange={handleChange}
          />
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <SuppliersRowActions supplier={row.original} />,
    },
  ];
}
