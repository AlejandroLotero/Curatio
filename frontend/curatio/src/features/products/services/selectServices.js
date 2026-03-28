/**
 * selectServices.js
 * 
 * Servicio de catálogos (Select/Dropdowns) para el sistema de medicamentos.
 * 
 * Actúa como intermediario entre la API backend y los componentes React.
 * Cada función:
 * 1. Llama a la API correspondiente en lib/http/catalogs
 * 2. Adapta los datos al formato esperado por los componentes (id, label)
 * 3. Retorna un array de objetos listos para usar en Select/Options
 * 
 * Uso en componentes:
 * const vias = await getViasAdministracion();
 * <Select options={vias} /> // [{ id: 1, label: "Oral" }, ...]
 */

import {
  getPharmaceuticalForms,
  getPresentations,
  getAdministrationRoutes,
  getLaboratories,
  getMedicationStatuses,
  getActiveSuppliers,
} from "@/lib/http/catalogs";
import { adaptCatalogItems } from "@/lib/adapters/medicationAdapter";

/**
 * Obtiene las formas farmacéuticas disponibles (tabletas, cápsulas, inyectable, etc).
 * Usado en: Select "Forma Farmacéutica" cuando se crea/edita un medicamento
 */
export async function getFormasFarmaceuticas() {
  const response = await getPharmaceuticalForms();
  return adaptCatalogItems(response);
}

/**
 * Obtiene presentaciones disponibles para una forma farmacéutica específica.
 * Ejemplo: Para "Tableta" retorna "10mg", "20mg", "50mg", etc.
 * @param {number} formaId - ID de la forma farmacéutica seleccionada
 * Usado en: Select "Presentación" (cascada dependiente de Forma)
 */
export async function getPresentacionesByForma(formaId) {
  const response = await getPresentations(formaId);
  return adaptCatalogItems(response);
}

/**
 * Obtiene las vías de administración de medicamentos (Oral, IV, IM, Subcutánea, etc).
 * Usado en: Select "Vía de Administración" en formularios de medicamentos
 */
export async function getViasAdministracion() {
  const response = await getAdministrationRoutes();
  return adaptCatalogItems(response);
}

/**
 * Obtiene los laboratorios farmacéuticos disponibles en el sistema.
 * Usado en: Select "Laboratorio" en formularios de medicamentos
 */
export async function getLaboratorios() {
  const response = await getLaboratories();
  return adaptCatalogItems(response);
}

/**
 * Obtiene los estados disponibles para medicamentos (Activo, Inactivo, Descontinuado, etc).
 * Usado en: Select "Estado" para cambiar el status de un medicamento
 */
export async function getEstadosMedicamento() {
  const response = await getMedicationStatuses();
  return adaptCatalogItems(response);
}

/**
 * Obtiene los proveedores activos del sistema.
 * Solo retorna proveedores con estado "activo" disponibles para compras.
 * Usado en: Select "Proveedor" en formularios de medicamentos
 */
export async function getProveedoresActivos() {
  const response = await getActiveSuppliers();
  return adaptCatalogItems(response);
}