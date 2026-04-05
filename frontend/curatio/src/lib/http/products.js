import { httpClient } from "./client";

/**
 * Obtiene listado de medicamentos/productos con paginación y filtros.
 * @param {Object} params
 * @param {string} params.search - Busca por nombre, concentración, lote, proveedor
 * @param {number} params.administrationRoute - ID de vía de administración
 * @param {number} params.laboratory - ID de laboratorio
 * @param {number} params.status - ID de estado
 * @param {number} params.page - Número de página (default: 1)
 * @param {number} params.pageSize - Resultados por página (default: 10)
 */
export async function getProducts(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.set("search", params.search);
  if (params.administrationRoute) {
    searchParams.set("administration_route", params.administrationRoute);
  }
  if (params.laboratory) searchParams.set("laboratory", params.laboratory);
  if (params.status) searchParams.set("status", params.status);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("page_size", String(params.pageSize));

  const query = searchParams.toString();
  return httpClient.get(
    `/v1/inventory/medications/${query ? `?${query}` : ""}`,
  );
}

/**
 * Obtiene detalle completo de un medicamento/producto.
 * @param {number} id - ID del medicamento
 */
export async function getProductById(id) {
  return httpClient.get(`/v1/inventory/medications/${id}/`);
}

/**
 * Crea un nuevo medicamento/producto.
 * @param {Object} payload - Datos del medicamento (ver adaptProductPayloadFromForm)
 */
export async function createProduct(payload) {
  return httpClient.post("/v1/inventory/medications/", payload);
}

/**
 * Actualiza un medicamento/producto existente.
 * @param {number} id - ID del medicamento
 * @param {Object} payload - Datos a actualizar
 */
export async function updateProduct(id, payload) {
  return httpClient.put(`/v1/inventory/medications/${id}/`, payload);
}

/**
 * Cambia el estado de un medicamento/producto.
 * @param {number} id - ID del medicamento
 * @param {number} statusId - ID del nuevo estado
 */
export async function updateProductStatus(id, statusId) {
  return httpClient.patch(`/v1/inventory/medications/${id}/status/`, {
    status_id: statusId,
  });
}

/**
 * Elimina un medicamento/producto.
 * @param {number} id - ID del medicamento
 */
export async function deleteProduct(id) {
  return httpClient.delete(`/v1/inventory/medications/${id}/delete/`);
}
