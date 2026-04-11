/**
 * Valor exportable por campo, alineado con `mapSaleRowFromApi` (salesAdapter).
 */
function getSaleExportValue(sale, key) {
  if (!sale) return "";

  switch (key) {
    case "saleDate": {
      if (sale.saleDate) return sale.saleDate;
      const dt = sale.saleDateTime;
      if (dt == null || dt === "") return "";
      const s = String(dt);
      return s.length >= 10 ? s.slice(0, 10) : s;
    }
    case "status":
      return sale.status ?? sale.statusLabel ?? "";
    case "statusLabel":
      return sale.statusLabel ?? sale.status ?? "";
    case "total":
    case "subtotal":
    case "iva":
    case "discount":
      return sale[key] ?? "";
    default:
      return sale[key];
  }
}

/**
 * Construye cabeceras y filas para exportar ventas (PDF / Excel).
 *
 * @param {object[]} sales - Filas del listado (p. ej. `mapSalesListResponse`).
 */
export function buildSalesReportDataset({
  sales,
  selectedFields,
}) {
  const list = Array.isArray(sales) ? sales : [];

  const headers = selectedFields.map((field) => field.label);

  const rows = list.map((sale) =>
    selectedFields.map((field) => {
      const value = getSaleExportValue(sale, field.key);
      if (value === null || value === undefined) return "";
      if (typeof value === "number" && Number.isNaN(value)) return "";
      return value;
    })
  );

  return { headers, rows };
}
