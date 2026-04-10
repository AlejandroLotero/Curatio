import { buildSalesReportDataset } from "../utils/buildSalesReportDataset";
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

/**
 * Genera PDF o Excel con las ventas y campos indicados.
 *
 * @param {"all"|"filtered"} scope - Todo el listado mock o solo lo filtrado en pantalla.
 */
export function generateSalesReport({
  format,
  selectedFields,
  scope,
  salesAll,
  salesFiltered,
}) {
  if (!selectedFields?.length) {
    alert("Selecciona al menos un campo para el reporte.");
    return;
  }

  const source = scope === "all" ? salesAll : salesFiltered;

  const { headers, rows } = buildSalesReportDataset({
    sales: source,
    selectedFields,
  });

  if (!rows.length) {
    alert("No hay datos para generar el reporte con el alcance elegido.");
    return;
  }

  const timestamp = new Date().toISOString().slice(0, 10);

  if (format === "excel") {
    generateExcelReport({
      headers,
      rows,
      fileName: `ventas-report-${timestamp}.xlsx`,
    });
  } else if (format === "pdf") {
    generatePdfReport({
      headers,
      rows,
      fileName: `ventas-report-${timestamp}.pdf`,
    });
  }
}
