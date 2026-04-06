// import { httpClient } from "./client";

// /**
//  * =========================
//  * SEARCH PUBLIC MEDICATIONS
//  * =========================
//  * Busca medicamentos públicos/comerciales
//  * para navbar cliente, navbar admin/farma
//  * y futuras pantallas de resultados.
//  */
// export async function searchPublicMedications(params = {}) {
//   const searchParams = new URLSearchParams();

//   if (params.query) {
//     searchParams.set("query", params.query);
//   }

//   if (params.id) {
//     searchParams.set("id", String(params.id));
//   }

//   const query = searchParams.toString();

//   return httpClient.get(
//     `/v1/catalogs/medications/${query ? `?${query}` : ""}`
//   );
// }

// /**
//  * =========================
//  * GET PUBLIC MEDICATION DETAIL
//  * =========================
//  * Obtiene el detalle comercial/público
//  * de un medicamento específico.
//  */
// export async function getPublicMedicationById(id) {
//   return httpClient.get(`/v1/catalogs/medications/${id}/`);
// }

import { httpClient } from "./client";

/**
 * publicMedications
 * -----------------
 * Cliente HTTP para consumo público/comercial de medicamentos.
 */

/**
 * Busca medicamentos para el overlay del navbar.
 *
 * Query soportada por backend:
 * - ?query=texto
 * - ?id=123
 */
export async function searchPublicMedications(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.query) {
    searchParams.set("query", params.query);
  }

  if (params.id) {
    searchParams.set("id", String(params.id));
  }

  const query = searchParams.toString();

  return httpClient.get(
    `/v1/catalog/medications/search/${query ? `?${query}` : ""}`
  );
}

/**
 * Obtiene detalle comercial/público de un medicamento.
 */
export async function getPublicMedicationById(id) {
  return httpClient.get(`/v1/catalog/medications/${id}/`);
}

/**
 * Obtiene catálogo público completo o paginado.
 * Este endpoint sí sirve para poblar el home.
 */
export async function getPublicCatalogMedications(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.query) {
    searchParams.set("query", params.query);
  }

  if (params.id) {
    searchParams.set("id", String(params.id));
  }

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.pageSize) {
    searchParams.set("page_size", String(params.pageSize));
  }

  const query = searchParams.toString();

  return httpClient.get(
    `/v1/catalogs/medications/${query ? `?${query}` : ""}`
  );
}

/**
 * Obtiene resultados amplios reutilizando el catálogo.
 */
export async function getPublicMedicationResults(params = {}) {
  return getPublicCatalogMedications(params);
}