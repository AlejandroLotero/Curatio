// import { httpClient } from "./client";
// import { mapSupplierFromApi } from "../adapters/supplierAdapter";

// /**
//  * Cliente HTTP del módulo de proveedores (rutas en products/urls.py bajo v1/procurement/suppliers/).
//  */

// export async function fetchSuppliersList(query = {}) {
//   const params = new URLSearchParams();
//   if (query.status) params.set("status", query.status);
//   const suffix = params.toString() ? `?${params}` : "";
//   return httpClient.get(`/v1/procurement/suppliers/${suffix}`);
// }

// export function mapSuppliersResponseToRows(response) {
//   const raw = response?.data?.results ?? [];
//   return raw.map(mapSupplierFromApi);
// }

// export async function fetchSupplierDetail(nit) {
//   return httpClient.get(`/v1/procurement/suppliers/${encodeURIComponent(nit)}/`);
// }

// export function mapSupplierDetailResponse(response) {
//   return mapSupplierFromApi(response?.data?.supplier);
// }

// export async function createSupplier(body) {
//   return httpClient.post("/v1/procurement/suppliers/", body);
// }

// export async function patchSupplierStatus(nit, estado) {
//   return httpClient.patch(
//     `/v1/procurement/suppliers/${encodeURIComponent(nit)}/status/`,
//     { estado }
//   );
// }

import { httpClient } from "./client";
import { mapSupplierFromApi } from "../adapters/supplierAdapter";

/**
 * Cliente HTTP del módulo de proveedores.
 *
 * Las rutas consumidas corresponden a:
 * - GET/POST   /v1/procurement/suppliers/
 * - GET/PATCH  /v1/procurement/suppliers/:nit/
 * - PATCH      /v1/procurement/suppliers/:nit/status/
 */

/**
 * Obtiene el listado de proveedores.
 *
 * Filtros soportados por backend:
 * - nit
 * - name
 * - status
 */
export async function fetchSuppliersList(query = {}) {
  const params = new URLSearchParams();

  if (query.nit) params.set("nit", query.nit);
  if (query.name) params.set("name", query.name);
  if (query.status) params.set("status", query.status);

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return httpClient.get(`/v1/procurement/suppliers/${suffix}`);
}

/**
 * Convierte la respuesta del listado al shape usado por la tabla de proveedores.
 */
export function mapSuppliersResponseToRows(response) {
  const raw = response?.data?.results ?? [];
  return raw.map(mapSupplierFromApi);
}

/**
 * Consulta el detalle de un proveedor por NIT.
 */
export async function fetchSupplierDetail(nit) {
  return httpClient.get(`/v1/procurement/suppliers/${encodeURIComponent(nit)}/`);
}

/**
 * Convierte la respuesta de detalle al shape consumido por la UI.
 */
export function mapSupplierDetailResponse(response) {
  return mapSupplierFromApi(response?.data?.supplier);
}

/**
 * Crea un proveedor.
 */
export async function createSupplier(body) {
  return httpClient.post("/v1/procurement/suppliers/", body);
}

/**
 * Actualiza los campos editables de un proveedor existente.
 *
 * El backend usa el NIT como identificador del recurso.
 * El body no debe intentar modificar el NIT.
 */
export async function updateSupplier(nit, body) {
  return httpClient.patch(
    `/v1/procurement/suppliers/${encodeURIComponent(nit)}/`,
    body
  );
}

/**
 * Actualiza únicamente el estado del proveedor.
 */
export async function patchSupplierStatus(nit, estado) {
  return httpClient.patch(
    `/v1/procurement/suppliers/${encodeURIComponent(nit)}/status/`,
    { estado }
  );
}
