// Configuración de campos disponibles para el reporte de productos
export const productReportFields = [
  { key: "visualId", label: "ID", default: true },
  { key: "nameproduct", label: "Medicamento", default: true },
  { key: "formaFarmaceutica", label: "Forma Farmacéutica", default: true },
  { key: "presentacion", label: "Presentación", default: true },
  { key: "concentration", label: "Concentración", default: true },
  { key: "administration_guide", label: "Vía de Administración", default: true },
  { key: "laboratory", label: "Laboratorio", default: true },
  { key: "lote", label: "Lote", default: false },
  { key: "fechaFabricacion", label: "Fecha de Fabricación", default: false },
  { key: "fechaVencimiento", label: "Fecha de Vencimiento", default: false },
  { key: "stock", label: "Stock", default: true },
  { key: "precioCompra", label: "Precio de Compra", default: false },
  { key: "precioVenta", label: "Precio de Venta", default: true },
  { key: "proveedor", label: "Proveedor", default: false },
  { key: "state", label: "Estado", default: true },
];
