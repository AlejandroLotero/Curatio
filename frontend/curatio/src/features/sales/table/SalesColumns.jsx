// import SalesRowActions from "../components/SalesRowActions";

// /**
//  * Columnas del listado de ventas.
//  *
//  * Se alinean con el shape construido por mapSaleRowFromApi:
//  * - invoiceNumber
//  * - saleDateTime
//  * - customer
//  * - pharmacist
//  * - approver
//  * - paymentType
//  * - status
//  * - total
//  */
// export const SalesColumns = [
//   {
//     header: "Factura",
//     accessorKey: "invoiceNumber",
//   },
//   {
//     header: "Fecha y hora",
//     accessorKey: "saleDateTime",
//   },
//   {
//     header: "Cliente",
//     accessorKey: "customer",
//   },
//   {
//     header: "Farmaceuta",
//     accessorKey: "pharmacist",
//   },
//   {
//     header: "Aprobador",
//     accessorKey: "approver",
//   },
//   {
//     header: "Tipo de pago",
//     accessorKey: "paymentType",
//   },
//   {
//     header: "Estado",
//     accessorKey: "status",
//     cell: ({ row }) => {
//       const status = row.original?.status ?? "";

//       const classes =
//         status === "Completada"
//           ? "bg-emerald-100 text-emerald-800"
//           : status === "Pendiente"
//           ? "bg-amber-100 text-amber-800"
//           : "bg-red-100 text-red-800";

//       return (
//         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
//           {status}
//         </span>
//       );
//     },
//   },
//   {
//     header: "Total",
//     accessorKey: "total",
//     cell: ({ row }) => {
//       const value = Number(row.original?.total ?? 0);
//       return `$${value.toLocaleString("es-CO")}`;
//     },
//   },
//   {
//     header: "Acciones",
//     id: "actions",
//     cell: ({ row }) => <SalesRowActions sale={row.original} />,
//   },
// ];

import { Link } from "react-router-dom";
import SalesRowActions from "../components/SalesRowActions";

/**
 * Columnas del listado de ventas.
 *
 * Se alinean con el shape construido por mapSaleRowFromApi:
 * - invoiceNumber
 * - saleDateTime
 * - customer
 * - pharmacist
 * - approver
 * - paymentType
 * - status
 * - total
 *
 * La aprobación manual NO se realiza desde la tabla.
 * Se realiza desde el detalle de la venta para no alterar
 * la lógica actual de SalesRowActions.
 */
export const SalesColumns = [
  {
    header: "Factura",
    accessorKey: "invoiceNumber",
  },
  {
    header: "Fecha y hora",
    accessorKey: "saleDateTime",
  },
  {
    header: "Cliente",
    accessorKey: "customer",
  },
  {
    header: "Farmaceuta",
    accessorKey: "pharmacist",
  },
  {
    header: "Aprobador",
    accessorKey: "approver",
  },
  {
    header: "Tipo de pago",
    accessorKey: "paymentType",
  },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original?.status ?? "";

      const classes =
        status === "Completada"
          ? "bg-emerald-100 text-emerald-800"
          : status === "Pendiente"
          ? "bg-amber-100 text-amber-800"
          : "bg-red-100 text-red-800";

      return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
          {status}
        </span>
      );
    },
  },
  {
    header: "Total",
    accessorKey: "total",
    cell: ({ row }) => {
      const value = Number(row.original?.total ?? 0);
      return `$${value.toLocaleString("es-CO")}`;
    },
  },
  {
    header: "Acciones",
    id: "actions",
    cell: ({ row }) => <SalesRowActions sale={row.original} />,
  },
];

