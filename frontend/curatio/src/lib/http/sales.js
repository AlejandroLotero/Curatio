import { httpClient } from "./client";

/**
 * Cliente HTTP del módulo de ventas.
 *
 * Rutas consumidas:
 * - GET/POST   /v1/sales/
 * - GET/PATCH  /v1/sales/:id/
 * - PATCH      /v1/sales/:id/confirm-payment/
 * - PATCH      /v1/sales/:id/cancel/
 * - GET        /v1/sales/reports/
 * - GET        /v1/sales/:id/invoice/
 * - POST       /v1/sales/web-checkout/
 * - GET        /v1/sales/catalogs/customers/
 * - GET        /v1/sales/catalogs/customers/lookup/
 */

/**
 * Obtiene el listado de ventas.
 *
 * Filtros soportados por backend:
 * - invoice_number
 * - sale_date
 * - date_from
 * - date_to
 * - customer
 * - seller
 * - status
 */
export async function fetchSalesList(query = {}) {
  const params = new URLSearchParams();

  if (query.invoice_number) params.set("invoice_number", query.invoice_number);
  if (query.sale_date) params.set("sale_date", query.sale_date);
  if (query.date_from) params.set("date_from", query.date_from);
  if (query.date_to) params.set("date_to", query.date_to);
  if (query.customer) params.set("customer", query.customer);
  if (query.seller) params.set("seller", query.seller);
  if (query.status) params.set("status", query.status);

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return httpClient.get(`/v1/sales/${suffix}`);
}

/**
 * Consulta el detalle completo de una venta.
 */
export async function fetchSaleDetail(saleId) {
  return httpClient.get(`/v1/sales/${saleId}/`);
}

/**
 * Alias semántico para detalle de venta.
 */
export async function fetchSaleById(saleId) {
  return fetchSaleDetail(saleId);
}

/**
 * Crea una venta.
 */
export async function createSale(body) {
  return httpClient.post("/v1/sales/", body);
}

/**
 * Actualiza campos editables de una venta existente.
 */
export async function updateSale(saleId, body) {
  return httpClient.patch(`/v1/sales/${saleId}/`, body);
}

/**
 * Confirma el pago de una venta.
 */
export async function confirmSalePayment(saleId) {
  return httpClient.patch(`/v1/sales/${saleId}/confirm-payment/`);
}

/**
 * Anula una venta.
 */
export async function cancelSale(saleId, reason) {
  return httpClient.patch(`/v1/sales/${saleId}/cancel/`, { reason });
}

/**
 * Descarga un reporte de ventas.
 *
 * format:
 * - excel
 * - pdf
 */
export async function downloadSalesReport(query = {}, format = "pdf") {
  const params = new URLSearchParams();

  if (query.invoice_number) params.set("invoice_number", query.invoice_number);
  if (query.sale_date) params.set("sale_date", query.sale_date);
  if (query.date_from) params.set("date_from", query.date_from);
  if (query.date_to) params.set("date_to", query.date_to);
  if (query.customer) params.set("customer", query.customer);
  if (query.seller) params.set("seller", query.seller);
  if (query.status) params.set("status", query.status);

  params.set("format", format);

  return httpClient.get(`/v1/sales/reports/?${params.toString()}`, {
    responseType: "blob",
  });
}

/**
 * Descarga la factura / comprobante individual de una venta.
 */
export async function downloadSaleInvoice(saleId) {
  return httpClient.get(`/v1/sales/${saleId}/invoice/`, {
    responseType: "blob",
  });
}

/**
 * Obtiene el catálogo de clientes activos para crear ventas.
 */
export async function fetchSalesCustomersCatalog() {
  return httpClient.get("/v1/sales/catalogs/customers/");
}

/**
 * Ejecuta el checkout web del cliente autenticado.
 */
export async function createCustomerCheckout(body) {
  return httpClient.post("/v1/sales/web-checkout/", body);
}

/**
 * Busca un cliente por documento para el flujo de venta interna.
 */
export async function fetchSalesCustomerByDocument({
  documentType = "CC",
  documentNumber = "",
}) {
  const params = new URLSearchParams();

  params.set("document_type", documentType);
  params.set("document_number", documentNumber);

  return httpClient.get(
    `/v1/sales/catalogs/customers/lookup/?${params.toString()}`
  );
}

/**
 * Lista notificaciones internas del módulo de ventas.
 *
 * Solo aplica para:
 * - Administrador
 * - Farmaceuta
 */
export async function fetchSalesNotifications(query = {}) {
  const params = new URLSearchParams();

  if (query.unread_only) {
    params.set("unread_only", "true");
  }

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return httpClient.get(`/v1/sales/notifications/${suffix}`);
}

/**
 * Marca una notificación como leída.
 */
export async function markSalesNotificationAsRead(notificationId) {
  return httpClient.patch(`/v1/sales/notifications/${notificationId}/read/`);
}

/**
 * Aprueba manualmente una compra web pendiente.
 */
export async function approveSaleInternal(saleId) {
  return httpClient.patch(`/v1/sales/${saleId}/approve-internal/`);
}