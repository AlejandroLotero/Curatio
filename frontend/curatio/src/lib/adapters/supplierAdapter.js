/**
 * Adaptador entre la API de proveedores (products/api_products_views.py)
 * y el shape que ya usan tablas y formularios del feature suppliers.
 *
 * El backend expone id/name/nit/status más campos en español alineados al modelo.
 */

export function mapSupplierFromApi(item) {
  if (!item) return null;
  const estado = item.status ?? "";
  return {
    // En BD el NIT es la PK; la columna "Id" de la tabla muestra el mismo identificador.
    id: item.nit,
    nombreProveedor: item.name ?? "",
    nit: item.nit ?? "",
    nombreContacto: item.nombre_contacto ?? "",
    telefonoContacto: item.telefono_contacto ?? "",
    correoElectronico: item.correo_contacto ?? "",
    razonSocial: item.razon_social ?? "",
    direccion: item.direccion ?? "",
    ciudad: item.ciudad ?? "",
    estado,
    is_active: estado === "Activo",
    correo: item.correo_contacto ?? "",
  };
}

/**
 * Cuerpo JSON para POST /v1/procurement/suppliers/ — nombres de campo del CrearProveedorForm (Django).
 */
export function buildSupplierCreateBody(basicAndContact) {
  const d = basicAndContact || {};
  return {
    nit: d.nit,
    nombre: d.fullnames,
    razon_social: d.supplierSocialReason ?? "",
    nombre_contacto: d.nombreContacto ?? "",
    telefono_contacto: d.phoneNumber ?? "",
    correo_contacto: d.email ?? "",
    direccion: d.address ?? "",
    ciudad: d.ciudad ?? "",
    estado: "Activo",
  };
}
