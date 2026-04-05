// =========================
// COLUMNAS DEL CARRITO ACTUAL
// =========================
// Este archivo define la estructura de columnas
// para la vista operativa del carrito actual.
//
// Importante:
// - Se exporta como función para poder inyectar acciones
//   como removeCartItem e isMutatingCart desde la página.


import { Button } from "@/shared/components";

/**
 * buildCurrentCartColumns
 * -----------------------
 * Construye las columnas de la tabla del carrito actual.
 *
 * @param {Object} params
 * @param {Function} params.onRemoveItem - función que elimina un item del carrito
 * @param {boolean} params.isMutatingCart - bloquea botones mientras muta el carrito
 */
export function buildCurrentCartColumns({
  onRemoveItem,
  isMutatingCart,
}) {
  return [
    {
      // =========================
      // COLUMNA: NOMBRE DEL PRODUCTO
      // =========================
      accessorKey: "productName",
      header: "Medicamento",
      cell: ({ row }) => {
        return (
          <span className="font-medium text-label">
            {row.original.productName}
          </span>
        );
      },
    },
    {
      // =========================
      // COLUMNA: CANTIDAD
      // =========================
      accessorKey: "quantity",
      header: "Cantidad",
      cell: ({ row }) => {
        return (
          <span className="text-label">
            {row.original.quantity}
          </span>
        );
      },
    },
    {
      // =========================
      // COLUMNA: PRECIO UNITARIO
      // =========================
      accessorKey: "unitPrice",
      header: "Precio unitario",
      cell: ({ row }) => {
        return (
          <span className="text-label">
            ${Number(row.original.unitPrice || 0).toLocaleString("es-CO")}
          </span>
        );
      },
    },
    {
      // =========================
      // COLUMNA: SUBTOTAL
      // =========================
      accessorKey: "subtotal",
      header: "Subtotal",
      cell: ({ row }) => {
        return (
          <span className="font-semibold text-label">
            ${Number(row.original.subtotal || 0).toLocaleString("es-CO")}
          </span>
        );
      },
    },
    {
      // =========================
      // COLUMNA: ACCIONES
      // =========================
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex justify-center">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              disabled={isMutatingCart}
              onClick={() => onRemoveItem(item.id)}
            >
              Quitar
            </Button>
          </div>
        );
      },
    },
  ];
}