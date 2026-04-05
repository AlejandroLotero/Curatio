/**
 * productAdapter.js
 * -----------------
 * Adaptadores del dominio productos/medicamentos:
 * - backend -> UI
 * - UI -> backend
 * - helpers de seguridad
 */

/**
 * Adapta un producto del backend al formato de UI (tabla/lista).
 * Normaliza nombres y valores para consistencia en componentes.
 */
export function adaptProductToListItem(item) {
  return {
    id: item.id,
    visualId: `MED-${String(item.id).padStart(3, "0")}`,
    nombre: item.name,
    formaFarmaceutica: item.pharmaceutical_form?.name ?? "",
    presentacion: item.presentation?.name ?? "",
    concentracion: item.concentration ?? "",
    descripcion: item.description ?? "",
    viaAdministracion: item.administration_route?.name ?? "",
    laboratorio: item.laboratory?.name ?? "",
    lote: item.batch ?? "",
    fechaFabricacion: item.manufacturing_date ?? "",
    fechaVencimiento: item.expiration_date ?? "",
    stock: Number(item.stock ?? 0),
    precioCompra: Number(item.purchase_price ?? 0),
    precioVenta: Number(item.sale_price ?? 0),
    proveedor: item.supplier?.name ?? "",
    supplierId: item.supplier?.id ?? "",
    estado: item.status?.name ?? "",
    estadoId: item.status?.id ?? "",
    puedeVenderse: item.can_be_sold ?? false,
    responsable: item.responsible?.name ?? "",
  };
}

/**
 * Adapta un producto para mostrar su detalle completo.
 * Incluye información adicional como quién lo creo.
 */
export function adaptProductDetail(item) {
  return {
    ...adaptProductToListItem(item),
    requiereFormula: item.requires_prescription ?? false,
    creadoPor: item.created_by?.name ?? "",
    creadoEn: item.created_at ?? "",
    actualizadoEn: item.updated_at ?? "",
    formaFarmaceuticaId: item.pharmaceutical_form?.id ?? null,
    presentacionId: item.presentation?.id ?? null,
    viaAdministracionId: item.administration_route?.id ?? null,
    laboratorioId: item.laboratory?.id ?? null,
  };
}

/**
 * Transforma datos del formulario UI al formato esperado por el backend.
 * Mapea nombres de propiedades en camelCase a snake_case.
 */
export function adaptProductPayloadFromForm(values) {
  return {
    nombre: values.nombre,
    forma: values.formaFarmaceuticaId || values.formaFarmaceutica,
    presentacion: values.presentacionId || values.presentacion,
    concentracion: values.concentracion,
    descripcion: values.descripcion,
    via_administracion: values.viaAdministracionId || values.viaAdministracion,
    laboratorio: values.laboratorioId || values.laboratorio,
    lote: values.lote,
    fecha_fabricacion: values.fechaFabricacion,
    fecha_vencimiento: values.fechaVencimiento,
    stock: Number(values.stock || 0),
    precio_compra: Number(values.precioCompra || 0),
    precio_venta: Number(values.precioVenta || 0),
    proveedor: values.supplierId || values.proveedor,
    estado: values.estadoId || values.estado,
  };
}

/**
 * Adapta items de catálogos (select/dropdown) al formato estándar.
 * Se usa para formas farmacéuticas, laboratorios, etc.
 * @param {Array} items - Array de items del backend
 * @returns {Array} Array con {id, label, value}
 */
export function adaptCatalogItems(items = []) {
  return items.map((item) => ({
    id: String(item.id),
    label: item.name,
    value: String(item.id),
  }));
}

/**
 * Obtiene información segura de un producto para mostrar.
 * Si el producto es null/undefined, retorna un objeto por defecto.
 */
export function getSafeProductInfo(product) {
  if (!product) {
    return {
      nombre: "N/A",
      estado: "Desconocido",
      stock: 0,
      precioVenta: 0,
    };
  }
  return adaptProductToListItem(product);
}
