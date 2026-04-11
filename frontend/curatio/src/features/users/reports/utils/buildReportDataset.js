// Función utilitaria para construir el dataset de un reporte (tabla)
// Patrón: transformación de datos (input → output listo para exportar)

function userFieldValue(user, key) {
  if (key === "documentType") {
    return user.documentType ?? user.DocumentType;
  }
  if (key === "documentNumber") {
    return user.documentNumber ?? user.document;
  }
  return user[key];
}

export function buildReportDataset({
  users,           // Array de usuarios origen
  selectedFields,  // Campos seleccionados para el reporte [{ key, label }]
  scope,           // Alcance del reporte: "all" | "document"
  documentNumber   // Número de documento para filtrar (si aplica)
}) {


  // Copia inmutable del array original (evita mutaciones)
  let filteredUsers = [...users];


  // Filtro por alcance: si es por documento, se aplica filtro específico
  if (scope === "document" && documentNumber) {
    const wanted = String(documentNumber).trim();
    filteredUsers = filteredUsers.filter((user) => {
      const u = String(
        user.documentNumber ?? user.document ?? ""
      ).trim();
      return u === wanted;
    });
  }


  // Construcción de encabezados del reporte
  // Se toma el label de cada campo seleccionado
  const headers = selectedFields.map((field) => field.label);


  // Construcción de filas del reporte
  // Cada usuario se transforma en un array de valores según los campos seleccionados
  const rows = filteredUsers.map((user) =>
    selectedFields.map((field) => {
      const value = userFieldValue(user, field.key);


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
