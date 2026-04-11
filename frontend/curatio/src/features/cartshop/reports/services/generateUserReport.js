import { buildReportDataset } from "../utils/buildReportDataset";
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

/**
 * Orquestador de generación de reportes para carritos.
 *
 * Mantiene la misma estructura del servicio anterior,
 * pero ahora recibe los datos reales desde la página.
 */
export function generateUserReport({
  format,
  selectedFields,
  data = [],
  fileName = "reporte-carritos",
  reportTitle = "Reporte de Carritos",
}) {
  const { headers, rows } = buildReportDataset({
    data,
    selectedFields,
  });

  if (!rows.length) {
    alert("No hay datos para generar el reporte.");
    return;
  }

  const timestamp = new Date().toISOString().slice(0, 10);

  if (format === "excel") {
    generateExcelReport({
      headers,
      rows,
      fileName: `${fileName}-${timestamp}.xlsx`,
      sheetName: "Carritos",
    });
  }

  if (format === "pdf") {
    generatePdfReport({
      headers,
      rows,
      fileName: `${fileName}-${timestamp}.pdf`,
      title: reportTitle,
    });
  }
}