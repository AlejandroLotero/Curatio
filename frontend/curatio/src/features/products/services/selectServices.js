import {
  getPharmaceuticalForms,
  getPresentations,
  getAdministrationRoutes,
  getLaboratories,
  getMedicationStatuses,
  getActiveSuppliers,
} from "@/lib/http/catalogs";
import { adaptCatalogItems } from "@/lib/adapters/medicationAdapter";

export async function getFormasFarmaceuticas() {
  const response = await getPharmaceuticalForms();
  return adaptCatalogItems(response);
}

export async function getPresentacionesByForma(formaId) {
  const response = await getPresentations(formaId);
  return adaptCatalogItems(response);
}

export async function getViasAdministracion() {
  const response = await getAdministrationRoutes();
  return adaptCatalogItems(response);
}

export async function getLaboratorios() {
  const response = await getLaboratories();
  return adaptCatalogItems(response);
}

export async function getEstadosMedicamento() {
  const response = await getMedicationStatuses();
  return adaptCatalogItems(response);
}

export async function getProveedoresActivos() {
  const response = await getActiveSuppliers();
  return adaptCatalogItems(response);
}