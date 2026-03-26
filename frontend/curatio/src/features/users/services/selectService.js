/**
 * Catálogo alineado con backend Django.
 * Los values deben coincidir exactamente con los choices del modelo.
 */
export async function getDocumentTypes() {
  return [
    { id: "NIT", value: "NIT", label: "NIT" },
    { id: "CC", value: "CC", label: "Cédula Ciudadanía" },
    { id: "CE", value: "CE", label: "Cédula Extranjería" },
    { id: "TI", value: "TI", label: "Tarjeta Identidad" },
    { id: "PEP", value: "PEP", label: "Permiso Especial de Permanencia" },
    { id: "PPT", value: "PPT", label: "Permiso por Protección Temporal" },
  ];
}

/**
 * Catálogo alineado con backend Django.
 * Debe coincidir exactamente con User.ROLES.
 */
export async function getRoles() {
  return [
    { id: "Administrador", value: "Administrador", label: "Administrador" },
    { id: "Farmaceuta", value: "Farmaceuta", label: "Farmaceuta" },
    { id: "Cliente", value: "Cliente", label: "Cliente" },
  ];
}

/* Si estos otros métodos siguen existiendo, se dejan como estaban */
export async function getSaleTypes() {
  const response = await fetch("/src/data/selects/saleTypes.json");
  return response.json();
}

export async function getStatusCarTypes() {
  const response = await fetch("/src/data/selects/statusCarTypes.json");
  return response.json();
}

export async function getPaymentsTypes() {
  const response = await fetch("/src/data/selects/paymentsTypes.json");
  return response.json();
}