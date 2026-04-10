// Fuente de datos de productos (mock o fuente centralizada)
import { listProducts } from "@/data/product/listProducts";


// Utilidad para transformar datos en dataset de reporte
import { buildProductReportDataset } from "../utils/buildProductReportDataset";


// Servicios de exportación
import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";


// Caso de uso: orquestador de generación de reportes de productos
// Patrón: Application Service (coordina utilidades y servicios)
export function generateProductReport({
  format,          // "excel" | "pdf"
  selectedFields,  // Campos seleccionados por el usuario
  scope,           // Alcance del reporte
  laboratoryFilter   // Filtro opcional
}) {


  // Construcción del dataset (desacoplado de la UI)
  const { headers, rows } = buildProductReportDataset({
    products: listProducts,
    selectedFields,
    scope,
    laboratoryFilter
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
      fileName: `products-report-${timestamp}.xlsx`
    });
  }


  if (format === "pdf") {
    generatePdfReport({
      headers,
      rows,
      fileName: `products-report-${timestamp}.pdf`
    });
  }
}
