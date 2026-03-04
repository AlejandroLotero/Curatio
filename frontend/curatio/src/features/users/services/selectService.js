
import rolesData from "@/data/selects/roles.json";

export async function getDocumentTypes () {
    const response = await fetch("/src/data/selects/documentTypes.json");
    return response.json();
}

/*FUNCION ASINCRONA PARA LLAMADA DE ROLES*/
export async function getRoles() {
    const response = await fetch("/src/data/selects/roles.json");
    return response.json();
}



export async function getSaleTypes () {

    const response = await fetch("/src/data/selects/saleTypes.json");

    return response.json();
}

export async function getStatusCarTypes () {

    const response = await fetch("/src/data/selects/statusCarTypes.json");

    return response.json();
}

export async function getPaymentsTypes () {

    const response = await fetch("/src/data/selects/paymentsTypes.json");

    return response.json();
}