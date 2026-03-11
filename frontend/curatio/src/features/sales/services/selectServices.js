export async function getStateSaleTypes() {
    const response = await fetch("/src/data/selects/stateSaleTypes.json");
    return response.json();
}

export async function getPaymentsTypes() {
    const response = await fetch("/src/data/selects/paymentsTypes.json");
    return response.json();
}