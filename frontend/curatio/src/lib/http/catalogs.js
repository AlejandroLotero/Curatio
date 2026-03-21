import { httpClient } from "./client";

export async function getPharmaceuticalForms() {
  return httpClient.get("/v1/catalogs/pharmaceutical-forms/");
}

export async function getPresentations(pharmaceuticalFormId) {
  const query = pharmaceuticalFormId
    ? `?pharmaceutical_form_id=${pharmaceuticalFormId}`
    : "";
  return httpClient.get(`/v1/catalogs/presentations/${query}`);
}

export async function getAdministrationRoutes() {
  return httpClient.get("/v1/catalogs/administration-routes/");
}

export async function getLaboratories() {
  return httpClient.get("/v1/catalogs/laboratories/");
}

export async function getMedicationStatuses() {
  return httpClient.get("/v1/catalogs/medication-statuses/");
}

export async function getActiveSuppliers() {
  return httpClient.get("/v1/procurement/suppliers/?status=Activo");
}