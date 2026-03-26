/**
 * cartAdapter.js
 * --------------
 * Adaptadores del dominio carrito:
 * - backend -> UI
 * - helpers de lectura segura
 */

/**
 * Adapta una línea de carrito del backend al formato UI.
 */
export function adaptBackendCartItemToUi(item) {
  if (!item) return null;

  return {
    id: item.id,
    medicationId: item.medication?.id ?? null,
    medicationName: item.medication?.name ?? "",
    presentation: item.medication?.presentation ?? "",
    concentration: item.medication?.concentration ?? "",
    medicationStatus: item.medication?.status ?? "",
    stock: Number(item.medication?.stock ?? 0),

    quantity: Number(item.quantity ?? 0),
    unitPrice: Number(item.unit_price ?? 0),
    subtotal: Number(item.subtotal ?? 0),
  };
}

/**
 * Adapta el carrito completo del backend al formato UI.
 */
export function adaptBackendCartToUi(cart) {
  if (!cart) return null;

  return {
    id: cart.id,
    invoiceNumber: cart.invoice_number,
    status: cart.status,
    paymentType: cart.payment_type,

    customer: {
      id: cart.customer?.id ?? null,
      name: cart.customer?.name ?? "",
      email: cart.customer?.email ?? "",
    },

    seller: {
      id: cart.seller?.id ?? null,
      name: cart.seller?.name ?? "",
      email: cart.seller?.email ?? "",
      role: cart.seller?.role ?? "",
    },

    summary: {
      itemsCount: Number(cart.summary?.items_count ?? 0),
      subtotal: Number(cart.summary?.subtotal ?? 0),
      iva: Number(cart.summary?.iva ?? 0),
      discount: Number(cart.summary?.discount ?? 0),
      total: Number(cart.summary?.total ?? 0),
    },

    items: Array.isArray(cart.items)
      ? cart.items.map(adaptBackendCartItemToUi)
      : [],
  };
}

/**
 * Obtiene la cantidad total de unidades del carrito.
 */
export function getCartItemsCount(cart) {
  return Number(cart?.summary?.itemsCount ?? 0);
}

/**
 * Obtiene la cantidad de líneas del carrito.
 */
export function getCartLinesCount(cart) {
  return Array.isArray(cart?.items) ? cart.items.length : 0;
}