import * as XLSX from "xlsx";

export function generateExcelReport({
  headers,
  rows,
  fileName = "sales-report.xlsx",
  sheetName = "Ventas",
}) {
  const worksheetData = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}
