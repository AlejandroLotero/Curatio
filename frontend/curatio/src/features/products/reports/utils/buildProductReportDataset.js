// Función utilitaria para construir el dataset de un reporte de productos (tabla)
// Patrón: transformación de datos (input → output listo para exportar)
export function buildProductReportDataset({
  products,           // Array de productos origen
  selectedFields,  // Campos seleccionados para el reporte [{ key, label }]
  scope,           // Alcance del reporte: "all" | "laboratory"
  laboratoryFilter   // Laboratorio para filtrar (si aplica)
}) {


  // Copia inmutable del array original (evita mutaciones)
  let filteredProducts = [...products];


  // Filtro por alcance: valor puede ser id de catálogo o nombre (mock / derivado)
  if (scope === "laboratory" && laboratoryFilter) {
    const want = String(laboratoryFilter);
    filteredProducts = filteredProducts.filter((product) => {
      const byId = String(product.laboratoryId ?? product.laboratorioId ?? "") === want;
      const byName = String(product.laboratory ?? product.laboratorio ?? "") === want;
      return byId || byName;
    });
  }


  // Construcción de encabezados del reporte
  // Se toma el label de cada campo seleccionado
  const headers = selectedFields.map((field) => field.label);


  // Construcción de filas del reporte
  // Cada producto se transforma en un array de valores según los campos seleccionados
  const rows = filteredProducts.map((product) =>
    selectedFields.map((field) => {
      const value = product[field.key]; // Acceso dinámico a la propiedad


      // Normalización: evita undefined o null en el reporte
      return value ?? "";
    })
  );


  // Estructura final desacoplada de la UI
  // Lista para exportar a Excel, PDF o renderizar en tabla
  return {
    headers, // Array de strings (columnas)
    rows     // Array de arrays (filas)
  };
}
