// Fuente de datos de proveedores (mock o fuente centralizada)
import { suppliers } from "@/data/supplier/suppliers";


// Utilidad para transformar datos en dataset de reporte
import { buildReportDataset } from "../utils/buildReportDataset";


// Servicios de exportación
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";


// Caso de uso: orquestador de generación de reportes de proveedores
// Patrón: Application Service (coordina utilidades y servicios)
export function generateUserReport({
  format,          // "excel" | "pdf"
  selectedFields,  // Campos seleccionados por el usuario
  scope,           // Alcance del reporte
  documentNumber,  // Filtro opcional
  usersSource      // Fuente de datos opcional
}) {


  // Construcción del dataset (desacoplado de la UI)
  const { headers, rows } = buildReportDataset({
    users: usersSource ?? suppliers,
    selectedFields,
    scope,
    documentNumber
  });


  // Validación: evita generar archivos vacíos
  if (!rows.length) {
    alert("No hay datos para generar el reporte.");
    return; // Corte de ejecución
  }


  // Generación de timestamp para nombres únicos de archivo (YYYY-MM-DD)
  const timestamp = new Date().toISOString().slice(0, 10);


  // Selección de estrategia de exportación según formato
  if (format === "excel") {
    generateExcelReport({
      headers,
      rows,
      fileName: `suppliers-report-${timestamp}.xlsx`
    });
  }


  if (format === "pdf") {
    generatePdfReport({
      headers,
      rows,
      fileName: `suppliers-report-${timestamp}.pdf`
    });
  }
}
