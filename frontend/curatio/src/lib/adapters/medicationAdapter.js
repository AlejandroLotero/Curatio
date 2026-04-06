// export function adaptMedicationToListItem(item) {
//   return {
//     id: item.id,
//     visualId: `MED-${String(item.id).padStart(3, "0")}`,
//     nameproduct: item.name,
//     imageUrl: item.image_url ?? null,
//     formaFarmaceutica: item.pharmaceutical_form?.name ?? "",
//     presentacion: item.presentation?.name ?? "",
//     concentration: item.concentration ?? "",
//     descripcion: item.description ?? "",
//     administration_guide: item.administration_route?.name ?? "",
//     laboratory: item.laboratory?.name ?? "",
//     lote: item.batch ?? "",
//     fechaFabricacion: item.manufacturing_date ?? "",
//     fechaVencimiento: item.expiration_date ?? "",
//     stock: item.stock ?? 0,
//     precioCompra: Number(item.purchase_price ?? 0),
//     precioVenta: Number(item.sale_price ?? 0),
//     proveedor: item.supplier?.name ?? "",
//     supplierId: item.supplier?.id ?? "",
//     state: item.status?.name ?? "",
//     stateId: item.status?.id ?? "",
//     canBeSold: item.can_be_sold ?? false,
//     responsible: item.responsible?.name ?? "",
//   };
// }

// export function adaptMedicationDetail(item) {
//   return adaptMedicationToListItem(item);
// }

// /**
//  * Construye FormData real para crear/editar medicamento.
//  *
//  * Importante:
//  * - NO retorna objeto plano
//  * - retorna FormData para que viaje el archivo real
//  * - el cliente HTTP ya detecta FormData y no pone JSON.stringify
//  */
// export function adaptMedicationPayloadFromForm(values) {
//   const formData = new FormData();

//   formData.append("nombre", values.nombre ?? "");
//   formData.append("forma", values.formaFarmaceutica ?? "");
//   formData.append("presentacion", values.presentacion ?? "");
//   formData.append("concentracion", values.concentracion ?? "");
//   formData.append("descripcion", values.descripcion ?? "");
//   formData.append("via_administracion", values.viaAdministracion ?? "");
//   formData.append("laboratorio", values.laboratorio ?? "");
//   formData.append("lote", values.lote ?? "");
//   formData.append("fecha_fabricacion", values.fechaFabricacion ?? "");
//   formData.append("fecha_vencimiento", values.fechaVencimiento ?? "");
//   formData.append("stock", values.stock ?? "");
//   formData.append("precio_compra", values.precioCompra ?? "");
//   formData.append("precio_venta", values.precioVenta ?? "");
//   formData.append("proveedor", values.proveedor ?? "");
//   formData.append("estado", values.estado ?? "");

//   /**
//    * Solo anexamos la imagen si realmente existe un File.
//    */
//   if (values.imagen instanceof File) {
//     formData.append("imagen", values.imagen);
//   }

//   return formData;
// }

// export function adaptCatalogItems(response) {
//   return (response?.data?.results ?? []).map((item) => ({
//     id: String(item.id),
//     label: item.name,
//     value: String(item.id),
//   }));
// }

// /**
//  * Adapta un medicamento del catálogo read-only
//  * al formato comercial que usa ProductShowPage.
//  */
// export function adaptCatalogMedicationDetail(item) {
//   if (!item) return null;

//   return {
//     id: item.id,
//     visualId: `MED-${String(item.id).padStart(3, "0")}`,
//     nameproduct: item.name ?? "",
//     title: item.name ?? "",
//     imageUrl: item.image_url ?? null,
//     formaFarmaceutica: item.pharmaceutical_form?.name ?? "",
//     presentacion: item.presentation?.name ?? "",
//     concentration: item.concentration ?? "",
//     descripcion: item.description ?? "",
//     administration_guide: item.administration_route?.name ?? "",
//     laboratory: item.laboratory?.name ?? "",
//     lote: item.batch ?? "",
//     fechaFabricacion: item.manufacturing_date ?? "",
//     fechaVencimiento: item.expiration_date ?? "",
//     stock: item.stock ?? 0,
//     precioCompra: Number(item.purchase_price ?? 0),
//     precioVenta: Number(item.sale_price ?? 0),
//     proveedor: item.supplier?.name ?? "",
//     state: item.status?.name ?? "",
//     canBeSold: item.can_be_sold ?? false,
//   };
// }

export function adaptMedicationToListItem(item) {
  return {
    id: item.id,
    visualId: `MED-${String(item.id).padStart(3, "0")}`,

    /**
     * Texto principal
     */
    nameproduct: item.name ?? "",
    title: item.name ?? "",

    /**
     * Imagen real desde backend
     */
    imageUrl: item.image_url ?? null,

    /**
     * Forma farmacéutica
     */
    formaFarmaceutica: item.pharmaceutical_form?.name ?? "",
    formaId: item.pharmaceutical_form?.id ? String(item.pharmaceutical_form.id) : "",
    pharmaceuticalFormId: item.pharmaceutical_form?.id
      ? String(item.pharmaceutical_form.id)
      : "",

    /**
     * Presentación
     */
    presentacion: item.presentation?.name ?? "",
    presentacionId: item.presentation?.id ? String(item.presentation.id) : "",
    presentationId: item.presentation?.id ? String(item.presentation.id) : "",

    /**
     * Concentración y descripción
     */
    concentration: item.concentration ?? "",
    concentracion: item.concentration ?? "",
    descripcion: item.description ?? "",
    description: item.description ?? "",

    /**
     * Vía de administración
     */
    administration_guide: item.administration_route?.name ?? "",
    viaAdministracion: item.administration_route?.name ?? "",
    viaAdministracionId: item.administration_route?.id
      ? String(item.administration_route.id)
      : "",
    administrationRouteId: item.administration_route?.id
      ? String(item.administration_route.id)
      : "",

    /**
     * Laboratorio
     */
    laboratory: item.laboratory?.name ?? "",
    laboratorio: item.laboratory?.name ?? "",
    laboratorioId: item.laboratory?.id ? String(item.laboratory.id) : "",
    laboratoryId: item.laboratory?.id ? String(item.laboratory.id) : "",

    /**
     * Lote y fechas
     */
    lote: item.batch ?? "",
    fechaFabricacion: item.manufacturing_date ?? "",
    fechaVencimiento: item.expiration_date ?? "",

    /**
     * Inventario y precios
     */
    stock: item.stock ?? 0,
    precioCompra: Number(item.purchase_price ?? 0),
    precioVenta: Number(item.sale_price ?? 0),

    /**
     * Proveedor
     */
    proveedor: item.supplier?.name ?? "",
    proveedorId: item.supplier?.id ? String(item.supplier.id) : "",
    supplierId: item.supplier?.id ? String(item.supplier.id) : "",

    /**
     * Estado
     */
    state: item.status?.name ?? "",
    estado: item.status?.name ?? "",
    stateId: item.status?.id ? String(item.status.id) : "",
    estadoId: item.status?.id ? String(item.status.id) : "",

    /**
     * Reglas de venta
     */
    canBeSold: item.can_be_sold ?? false,

    /**
     * Responsable
     */
    responsible: item.responsible?.name ?? "",
  };
}

export function adaptMedicationDetail(item) {
  return adaptMedicationToListItem(item);
}

/**
 * Construye FormData real para crear/editar medicamento.
 *
 * Importante:
 * - NO retorna objeto plano
 * - retorna FormData para que viaje el archivo real
 * - el cliente HTTP ya detecta FormData y no pone JSON.stringify
 */
export function adaptMedicationPayloadFromForm(values) {
  const formData = new FormData();

  formData.append("nombre", values.nombre ?? "");
  formData.append("forma", values.formaFarmaceutica ?? "");
  formData.append("presentacion", values.presentacion ?? "");
  formData.append("concentracion", values.concentracion ?? "");
  formData.append("descripcion", values.descripcion ?? "");
  formData.append("via_administracion", values.viaAdministracion ?? "");
  formData.append("laboratorio", values.laboratorio ?? "");
  formData.append("lote", values.lote ?? "");
  formData.append("fecha_fabricacion", values.fechaFabricacion ?? "");
  formData.append("fecha_vencimiento", values.fechaVencimiento ?? "");
  formData.append("stock", values.stock ?? "");
  formData.append("precio_compra", values.precioCompra ?? "");
  formData.append("precio_venta", values.precioVenta ?? "");
  formData.append("proveedor", values.proveedor ?? "");
  formData.append("estado", values.estado ?? "");

  /**
   * Solo anexamos la imagen si realmente existe un File.
   */
  if (values.imagen instanceof File) {
    formData.append("imagen", values.imagen);
  }

  return formData;
}

export function adaptCatalogItems(response) {
  return (response?.data?.results ?? []).map((item) => ({
    id: String(item.id),
    label: item.name,
    value: String(item.id),
  }));
}

/**
 * Adapta un medicamento del catálogo read-only
 * al formato comercial que usa ProductShowPage.
 */
export function adaptCatalogMedicationDetail(item) {
  if (!item) return null;

  return {
    id: item.id,
    visualId: `MED-${String(item.id).padStart(3, "0")}`,
    nameproduct: item.name ?? "",
    title: item.name ?? "",
    imageUrl: item.image_url ?? null,
    formaFarmaceutica:
      typeof item.pharmaceutical_form === "string"
        ? item.pharmaceutical_form
        : item.pharmaceutical_form?.name ?? "",
    presentacion:
      typeof item.presentation === "string"
        ? item.presentation
        : item.presentation?.name ?? "",
    concentration: item.concentration ?? "",
    concentracion: item.concentration ?? "",
    descripcion: item.description ?? "",
    administration_guide:
      typeof item.administration_route === "string"
        ? item.administration_route
        : item.administration_route?.name ?? "",
    laboratory:
      typeof item.laboratory === "string"
        ? item.laboratory
        : item.laboratory?.name ?? "",
    lote: item.batch ?? "",
    fechaFabricacion: item.manufacturing_date ?? "",
    fechaVencimiento: item.expiration_date ?? "",
    stock: item.stock ?? 0,
    precioCompra: Number(item.purchase_price ?? 0),
    precioVenta: Number(item.sale_price ?? 0),
    proveedor:
      typeof item.supplier === "string"
        ? item.supplier
        : item.supplier?.name ?? "",
    state:
      typeof item.status === "string"
        ? item.status
        : item.status?.name ?? "",
    canBeSold: item.can_be_sold ?? false,
  };
}