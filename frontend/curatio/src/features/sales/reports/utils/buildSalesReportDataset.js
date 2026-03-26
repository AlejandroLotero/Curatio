/**
 * Construye cabeceras y filas para exportar ventas (PDF / Excel).
 */
export function buildSalesReportDataset({
  sales,
  selectedFields,
}) {
  const headers = selectedFields.map((field) => field.label);

  const rows = sales.map((sale) =>
    selectedFields.map((field) => {
      const value = sale[field.key];
      return value ?? "";
    })
  );

  return { headers, rows };
}
