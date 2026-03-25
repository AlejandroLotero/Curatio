import { httpClient } from "./client";

/**
 * cart.js
 * -------
 * Cliente HTTP del módulo carrito.
 *
 * Backend actual:
 * - GET    /v1/commerce/carts/active/
 * - POST   /v1/commerce/carts/active/items/
 * - PATCH  /v1/commerce/carts/active/items/:lineId/
 * - DELETE /v1/commerce/carts/active/items/:lineId/
 */

/**
 * Obtiene el carrito activo del usuario autenticado.
 */
export async function getActiveCart() {
  return httpClient.get("/v1/commerce/carts/active/");
}

/**
 * Agrega un medicamento al carrito activo.
 */
export async function addItemToActiveCart({ medicationId, quantity }) {
  return httpClient.post("/v1/commerce/carts/active/items/", {
    medication_id: medicationId,
    quantity,
  });
}

/**
 * Actualiza la cantidad de una línea del carrito.
 */
export async function updateActiveCartItem(lineId, { quantity }) {
  return httpClient.patch(`/v1/commerce/carts/active/items/${lineId}/`, {
    quantity,
  });
}

/**
 * Elimina una línea del carrito activo.
 */
export async function removeActiveCartItem(lineId) {
  return httpClient.delete(`/v1/commerce/carts/active/items/${lineId}/`);
}