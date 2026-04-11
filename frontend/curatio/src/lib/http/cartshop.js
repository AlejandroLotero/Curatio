import { httpClient } from "./client";

/**
 * Listado administrativo de carritos.
 *
 * Filtros soportados por backend:
 * - invoice_number
 * - date
 * - status
 */
export async function fetchCartShopsList(query = {}) {
  const params = new URLSearchParams();

  if (query.invoice_number) params.set("invoice_number", query.invoice_number);
  if (query.date) params.set("date", query.date);
  if (query.status) params.set("status", query.status);

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return httpClient.get(`/v1/cartshops/${suffix}`);
}

/**
 * Detalle de carrito.
 */
export async function fetchCartShopDetail(saleId) {
  return httpClient.get(`/v1/cartshops/${saleId}/`);
}