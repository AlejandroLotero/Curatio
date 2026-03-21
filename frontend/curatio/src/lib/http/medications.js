import { httpClient } from "./client";

export async function getMedications(params = {}) {
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
  return httpClient.get(`/v1/inventory/medications/${query ? `?${query}` : ""}`);
}

export async function getMedicationById(id) {
  return httpClient.get(`/v1/inventory/medications/${id}/`);
}

export async function createMedication(payload) {
  return httpClient.post("/v1/inventory/medications/", payload);
}

export async function updateMedication(id, payload) {
  return httpClient.put(`/v1/inventory/medications/${id}/`, payload);
}

export async function updateMedicationStatus(id, statusId) {
  return httpClient.patch(`/v1/inventory/medications/${id}/status/`, {
    status_id: statusId,
  });
}