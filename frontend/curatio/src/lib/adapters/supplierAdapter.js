// /**
//  * Adaptador entre la API de proveedores (products/api_products_views.py)
//  * y el shape que ya usan tablas y formularios del feature suppliers.
//  *
//  * El backend expone id/name/nit/status más campos en español alineados al modelo.
//  */

// export function mapSupplierFromApi(item) {
//   if (!item) return null;
//   const estado = item.status ?? "";
//   return {
//     // En BD el NIT es la PK; la columna "Id" de la tabla muestra el mismo identificador.
//     id: item.nit,
//     nombreProveedor: item.name ?? "",
//     nit: item.nit ?? "",
//     nombreContacto: item.nombre_contacto ?? "",
//     telefonoContacto: item.telefono_contacto ?? "",
//     correoElectronico: item.correo_contacto ?? "",
//     razonSocial: item.razon_social ?? "",
//     direccion: item.direccion ?? "",
//     ciudad: item.ciudad ?? "",
//     estado,
//     is_active: estado === "Activo",
//     correo: item.correo_contacto ?? "",
//   };
// }

// /**
//  * Cuerpo JSON para POST /v1/procurement/suppliers/ — nombres de campo del CrearProveedorForm (Django).
//  */
// export function buildSupplierCreateBody(basicAndContact) {
//   const d = basicAndContact || {};
//   return {
//     nit: d.nit,
//     nombre: d.fullnames,
//     razon_social: d.supplierSocialReason ?? "",
//     nombre_contacto: d.nombreContacto ?? "",
//     telefono_contacto: d.phoneNumber ?? "",
//     correo_contacto: d.email ?? "",
//     direccion: d.address ?? "",
//     ciudad: d.ciudad ?? "",
//     estado: "Activo",
//   };
// }

/**
 * Adaptador entre la API de proveedores (products/api_views.py)
 * y el shape que ya usan tablas y formularios del feature suppliers.
 *
 * El backend expone:
 * - id
 * - name
 * - nit
 * - status
 * - razon_social
 * - nombre_contacto
 * - telefono_contacto
 * - correo_contacto
 * - direccion
 * - ciudad
 */

export function mapSupplierFromApi(item) {
  if (!item) return null;

  const estado = item.status ?? "";

  return {
    // En BD el NIT es la PK; la UI mantiene id y nit con el mismo valor
    // para no romper tablas, rutas ni acciones ya implementadas.
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
 * Cuerpo JSON para POST /v1/procurement/suppliers/
 * usando los nombres esperados por CrearProveedorForm en Django.
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
    // Regla de negocio: si no se envía uno distinto, se crea Activo.
    estado: d.estado ?? "Activo",
  };
}

/**
 * Cuerpo JSON para PATCH /v1/procurement/suppliers/:nit/
 * usando los nombres esperados por ActualizarProveedorForm en Django.
 *
 * Importante:
 * - El NIT no se envía porque no debe modificarse.
 */
export function buildSupplierUpdateBody(formData) {
  const d = formData || {};

  return {
    nombre: d.fullnames ?? d.nombreProveedor ?? "",
    razon_social: d.supplierSocialReason ?? d.razonSocial ?? "",
    nombre_contacto: d.nombreContacto ?? "",
    telefono_contacto: d.phoneNumber ?? d.telefonoContacto ?? "",
    correo_contacto: d.email ?? d.correoElectronico ?? "",
    direccion: d.address ?? d.direccion ?? "",
    ciudad: d.ciudad ?? "",
    estado: d.estado ?? "Activo",
  };
}