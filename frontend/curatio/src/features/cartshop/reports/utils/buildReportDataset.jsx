/**
 * Construye el dataset del reporte a partir de los datos visibles
 * y los campos seleccionados.
 */
export function buildReportDataset({ data = [], selectedFields = [] }) {
  const headers = selectedFields.map((field) => field.label);

  const rows = data.map((item) =>
    selectedFields.map((field) => {
      const value = item[field.key];

      if (value === null || value === undefined) return "";

      if (typeof value === "number") return value;

      if (typeof value === "object") {
        return JSON.stringify(value);
      }

      return String(value);
    })
  );

  return { headers, rows };
}