export function adaptMedicationToListItem(item) {
  return {
    id: item.id,
    visualId: `MED-${String(item.id).padStart(3, "0")}`,
    nameproduct: item.name,
    formaFarmaceutica: item.pharmaceutical_form?.name ?? "",
    presentacion: item.presentation?.name ?? "",
    concentration: item.concentration ?? "",
    descripcion: item.description ?? "",
    administration_guide: item.administration_route?.name ?? "",
    laboratory: item.laboratory?.name ?? "",
    lote: item.batch ?? "",
    fechaFabricacion: item.manufacturing_date ?? "",
    fechaVencimiento: item.expiration_date ?? "",
    stock: item.stock ?? 0,
    precioCompra: Number(item.purchase_price ?? 0),
    precioVenta: Number(item.sale_price ?? 0),
    proveedor: item.supplier?.name ?? "",
    supplierId: item.supplier?.id ?? "",
    state: item.status?.name ?? "",
    stateId: item.status?.id ?? "",
    canBeSold: item.can_be_sold ?? false,
    responsible: item.responsible?.name ?? "",
  };
}

export function adaptMedicationDetail(item) {
  return adaptMedicationToListItem(item);
}

export function adaptMedicationPayloadFromForm(values) {
  return {
    nombre: values.nombre,
    forma: values.formaFarmaceutica,
    presentacion: values.presentacion,
    concentracion: values.concentracion,
    descripcion: values.descripcion,
    via_administracion: values.viaAdministracion,
    laboratorio: values.laboratorio,
    lote: values.lote,
    fecha_fabricacion: values.fechaFabricacion,
    fecha_vencimiento: values.fechaVencimiento,
    stock: Number(values.stock),
    precio_compra: values.precioCompra,
    precio_venta: values.precioVenta,
    proveedor: values.proveedor,
    estado: values.estado,
  };
}

export function adaptCatalogItems(response) {
  return (response?.data?.results ?? []).map((item) => ({
    id: String(item.id),
    label: item.name,
    value: String(item.id),
  }));
}