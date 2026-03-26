import SalesRowActions from "../components/SalesRowActions";

export const SalesColumns = [
  {
    accessorKey: "invoiceNumber",
    header: "Número de factura",
  },
  {
    accessorKey: "saleDateTime",
    header: "Fecha y hora",
  },
  {
    accessorKey: "customer",
    header: "Cliente",
  },
  {
    accessorKey: "pharmacist",
    header: "Farmaceuta",
  },
  {
    accessorKey: "statusLabel",
    header: "Estado de la venta",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <SalesRowActions sale={row.original} />,
  },
];
