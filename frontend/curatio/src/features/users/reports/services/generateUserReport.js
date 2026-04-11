// Fuente de datos de usuarios (mock o fuente centralizada)
import { users } from "@/data/user/users";


// Utilidad para transformar datos en dataset de reporte
import { buildReportDataset } from "../utils/buildReportDataset";


// Servicios de exportación
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";


// Caso de uso: orquestador de generación de reportes de usuarios
// Patrón: Application Service (coordina utilidades y servicios)
export function generateUserReport({
  format,          // "excel" | "pdf"
  selectedFields,  // Campos seleccionados por el usuario
  scope,           // Alcance del reporte
  documentNumber,  // Filtro opcional
  usersSource,     // Listado desde API (p. ej. ListUserPage); si no hay, se usa mock
}) {


  // Construcción del dataset (desacoplado de la UI)
  const { headers, rows } = buildReportDataset({
    users: usersSource ?? users,
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
      fileName: `users-report-${timestamp}.xlsx`
    });
  }


  if (format === "pdf") {
    generatePdfReport({
      headers,
      rows,
      fileName: `users-report-${timestamp}.pdf`
    });
  }
}
