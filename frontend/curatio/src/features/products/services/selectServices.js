export async function getFormasFarmaceuticas() {
  const response = await fetch("/src/data/selects/formasFarmaceuticas.json");
  return response.json();
}

export async function getPresentacionesEspeciales() {
  const response = await fetch("/src/data/selects/presentacionesEspeciales.json");
  return response.json();
}

export async function getPresentacionesGaseosas() {
  const response = await fetch("/src/data/selects/presentacionesGaseosas.json");
  return response.json();
}

export async function getPresentacionesLiquidas() {
  const response = await fetch("/src/data/selects/presentacionesLiquidas.json");
  return response.json();
}

export async function getPresentacionesSemisolidas() {
  const response = await fetch("/src/data/selects/presentacionesSemisolidas.json");
  return response.json();
}

export async function getPresentacionesSolidas() {
  const response = await fetch("/src/data/selects/presentacionesSolidas.json");
  return response.json();
}

export async function getViasAdministracion() {
  const response = await fetch("/src/data/selects/viasAdministracion.json");
  return response.json();
}

export async function getLaboratorios() {
  const response = await fetch("/src/data/selects/laboratorios.json");
  return response.json();
}

export async function getEstadosMedicamento() {
  const response = await fetch("/src/data/selects/estadosMedicamento.json");
  return response.json();
}

