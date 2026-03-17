export async function getStatusCartTypes () {
    const response = await fetch("/src/data/selects/statusCartTypes.json");
    return response.json();
}
