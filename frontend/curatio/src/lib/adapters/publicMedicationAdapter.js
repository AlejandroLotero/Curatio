// /**
//  * Adapta un item de búsqueda pública
//  * al formato que consumirá el overlay.
//  */
// export function adaptPublicMedicationSearchItem(item) {
//   if (!item) return null;

//   return {
//     id: item.id,
//     name: item.name,
//     presentation: item.presentation ?? "",
//     concentration: item.concentration ?? "",
//     laboratory: item.laboratory ?? "",
//     description: item.description ?? "",
//     salePrice: Number(item.sale_price ?? 0),
//     stock: Number(item.stock ?? 0),
//     status: item.status ?? "",
//     canBeSold: Boolean(item.can_be_sold),
//   };
// }

// /**
//  * Adapta respuesta de búsqueda pública
//  * para el componente de autocomplete.
//  */
// export function adaptPublicMedicationSearchResponse(response) {
//   return {
//     exactMatch: adaptPublicMedicationSearchItem(
//       response?.data?.exact_match
//     ),
//     topResults: (response?.data?.top_results ?? []).map(
//       adaptPublicMedicationSearchItem
//     ),
//     suggestions: response?.data?.suggestions ?? [],
//     totalMatches: Number(response?.data?.total_matches ?? 0),
//   };
// }

// /**
//  * Adapta detalle público/comercial
//  * para ProductShowPage o pantallas similares.
//  */
// export function adaptPublicMedicationDetail(item) {
//   if (!item) return null;

//   return {
//     id: item.id,
//     name: item.name,
//     description: item.description ?? "",
//     pharmaceuticalForm: item.pharmaceutical_form ?? "",
//     presentation: item.presentation ?? "",
//     concentration: item.concentration ?? "",
//     administrationRoute: item.administration_route ?? "",
//     laboratory: item.laboratory ?? "",
//     batch: item.batch ?? "",
//     expirationDate: item.expiration_date ?? "",
//     stock: Number(item.stock ?? 0),
//     salePrice: Number(item.sale_price ?? 0),
//     status: item.status ?? "",
//     canBeSold: Boolean(item.can_be_sold),
//     imageUrl: item.image_url ?? null,
//   };
// }

/**
 * Adapta un item de búsqueda pública de medicamentos.
 */
export function adaptPublicMedicationSearchItem(item) {
  if (!item) return null;

  return {
    id: item.id,
    name: item.name ?? "",
    title: item.name ?? "",
    imageUrl: item.image_url ?? null,
    image: item.image_url ?? null,
    presentation:
      typeof item.presentation === "string"
        ? item.presentation
        : item.presentation?.name ?? "",
    concentration: item.concentration ?? "",
    laboratory:
      typeof item.laboratory === "string"
        ? item.laboratory
        : item.laboratory?.name ?? "",
    description: item.description ?? "",
    salePrice: Number(item.sale_price ?? 0),
    price: Number(item.sale_price ?? 0),
    stock: Number(item.stock ?? 0),
    status:
      typeof item.status === "string"
        ? item.status
        : item.status?.name ?? "",
    canBeSold: Boolean(item.can_be_sold),
  };
}

/**
 * Adapta la respuesta completa del buscador público.
 */
export function adaptPublicMedicationSearchResponse(data) {
  return {
    exactMatch: adaptPublicMedicationSearchItem(data?.exact_match),
    topResults: Array.isArray(data?.top_results)
      ? data.top_results.map(adaptPublicMedicationSearchItem)
      : [],
    suggestions: Array.isArray(data?.suggestions)
      ? data.suggestions.map((item) => ({
          id: item.id,
          name: item.name ?? "",
        }))
      : [],
    totalMatches: Number(data?.total_matches ?? 0),
  };
}

/**
 * Adapta el detalle público/comercial de un medicamento.
 */
export function adaptPublicMedicationDetail(item) {
  if (!item) return null;

  return {
    id: item.id,
    name: item.name ?? "",
    title: item.name ?? "",
    imageUrl: item.image_url ?? null,
    image: item.image_url ?? null,
    description: item.description ?? "",
    pharmaceuticalForm:
      typeof item.pharmaceutical_form === "string"
        ? item.pharmaceutical_form
        : item.pharmaceutical_form?.name ?? "",
    presentation:
      typeof item.presentation === "string"
        ? item.presentation
        : item.presentation?.name ?? "",
    concentration: item.concentration ?? "",
    administrationRoute:
      typeof item.administration_route === "string"
        ? item.administration_route
        : item.administration_route?.name ?? "",
    laboratory:
      typeof item.laboratory === "string"
        ? item.laboratory
        : item.laboratory?.name ?? "",
    batch: item.batch ?? "",
    expirationDate: item.expiration_date ?? "",
    stock: Number(item.stock ?? 0),
    salePrice: Number(item.sale_price ?? 0),
    price: Number(item.sale_price ?? 0),
    status:
      typeof item.status === "string"
        ? item.status
        : item.status?.name ?? "",
    canBeSold: Boolean(item.can_be_sold),
  };
}

/**
 * Adapta un item del catálogo público para cards del home.
 */
export function adaptPublicMedicationCatalogItem(item) {
  const adapted = adaptPublicMedicationDetail(item);

  if (!adapted) return null;

  return {
    id: adapted.id,
    title: adapted.title,
    name: adapted.name,
    imageUrl: adapted.imageUrl,
    image: adapted.image,
    description: adapted.description,
    price: adapted.price,
    salePrice: adapted.salePrice,
    stock: adapted.stock,
    laboratory: adapted.laboratory,
    canBeSold: adapted.canBeSold,
  };
}

/**
 * Adapta la respuesta del catálogo público.
 */
export function adaptPublicMedicationCatalogResponse(data) {
  return {
    results: Array.isArray(data?.results)
      ? data.results.map(adaptPublicMedicationCatalogItem).filter(Boolean)
      : [],
    suggestions: Array.isArray(data?.suggestions)
      ? data.suggestions.map(adaptPublicMedicationCatalogItem).filter(Boolean)
      : [],
    pagination: data?.pagination ?? null,
    exactMatch: data?.exact_match
      ? adaptPublicMedicationCatalogItem(data.exact_match)
      : null,
  };
}