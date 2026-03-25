import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePdfReport({
  headers,
  rows,
  fileName = "sales-report.pdf",
  title = "Reporte de ventas",
}) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(title, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [headers],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: [33, 150, 243],
      textColor: 255,
      fontSize: 11,
    },
    styles: {
      fontSize: 10,
    },
    margin: {
      left: 14,
      right: 14,
    },
  });

  doc.save(fileName);
}
