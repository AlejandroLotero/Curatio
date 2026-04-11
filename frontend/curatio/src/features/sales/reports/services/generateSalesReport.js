import { buildSalesReportDataset } from "../utils/buildSalesReportDataset";
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

/**
 * Genera PDF o Excel en el navegador con las filas ya cargadas en memoria.
 *
 * @param {"all"|"filtered"} scope - `all`: `salesAll`; `filtered`: `salesFiltered`.
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

  const all = Array.isArray(salesAll) ? salesAll : [];
  const filtered = Array.isArray(salesFiltered) ? salesFiltered : [];

  const source = scope === "all" ? all : filtered.length ? filtered : all;

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
      title: "Reporte de ventas",
    });
  }
}
