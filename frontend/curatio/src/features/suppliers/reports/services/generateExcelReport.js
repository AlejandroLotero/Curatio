// Librería para manipulación y generación de archivos Excel
import * as XLSX from "xlsx";


// Función utilitaria para generar un archivo Excel a partir de datos tabulares
// Patrón: exportación de datos (dataset → archivo descargable)
export function generateExcelReport({
  headers,                       // Array de encabezados (columnas)
  rows,                          // Array de filas (array de arrays)
  fileName = "supplier-report.xlsx",  // Nombre del archivo de salida
  title = "Reporte de proveedores"                           // Título opcional del reporte
}) {


  // Estructura final de la hoja:
  // Primera fila = título (si se proporciona)
  // Fila vacía para separación
  // Primera fila = headers
  // Siguientes filas = datos
  const worksheetData = title ? [
    [title], //Fila del titulo
    [],
    headers,
    ...rows
  ]: [
    headers,
    ...rows
  ]


  // Convierte un array de arrays (AOA = Array of Arrays) en una hoja de Excel
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);


  // Aplica estilos al título (negrilla, tamaño mayor, centrado)
  if (title) {
    const titleCell = worksheet["A1"];
    if (titleCell) {
      titleCell.s = {
        font: {
          bold: true,
          size: 16,
          color: { rgb: "000000" }
        },
        alignment: {
          horizontal: "center",
          vertical: "center"
        }
      };
    }
  }


  // Crea un nuevo libro de Excel (workbook)
  const workbook = XLSX.utils.book_new();


  // Agrega la hoja al libro con el nombre "Proveedores"
  XLSX.utils.book_append_sheet(workbook, worksheet, "Proveedores");


  // Genera y descarga el archivo Excel en el cliente
  XLSX.writeFile(workbook, fileName, { cellStyles: true });
}
