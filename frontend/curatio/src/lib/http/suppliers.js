import { httpClient } from "./client";
import { mapSupplierFromApi } from "../adapters/supplierAdapter";

/**
 * Cliente HTTP del módulo de proveedores (rutas en products/urls.py bajo v1/procurement/suppliers/).
 */

export async function fetchSuppliersList(query = {}) {
  const params = new URLSearchParams();
  if (query.status) params.set("status", query.status);
  const suffix = params.toString() ? `?${params}` : "";
  return httpClient.get(`/v1/procurement/suppliers/${suffix}`);
}

export function mapSuppliersResponseToRows(response) {
  const raw = response?.data?.results ?? [];
  return raw.map(mapSupplierFromApi);
}

export async function fetchSupplierDetail(nit) {
  return httpClient.get(`/v1/procurement/suppliers/${encodeURIComponent(nit)}/`);
}

export function mapSupplierDetailResponse(response) {
  return mapSupplierFromApi(response?.data?.supplier);
}

export async function createSupplier(body) {
  return httpClient.post("/v1/procurement/suppliers/", body);
}

export async function patchSupplierStatus(nit, estado) {
  return httpClient.patch(
    `/v1/procurement/suppliers/${encodeURIComponent(nit)}/status/`,
    { estado }
  );
}
