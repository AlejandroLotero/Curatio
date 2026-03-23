// export function adaptBackendUserToUi(user) {
//   if (!user) return null;

//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     isActive: user.is_active,
//     documentType: user.document_type,
//     documentNumber: user.document_number,
//     phone: user.phone,
//     secondaryPhone: user.secondary_phone,
//     address: user.address,
//     photoUrl: user.photo,
//     startDate: user.start_date,
//     endDate: user.end_date,
//   };
// }

/**
 * Adapta un usuario backend al formato consumido por UI.
 */
export function adaptBackendUserToUi(user) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.is_active,
    documentType: user.document_type,
    documentNumber: user.document_number,
    phone: user.phone,
    secondaryPhone: user.secondary_phone,
    address: user.address,
    photoUrl: user.photo,
    startDate: user.start_date,
    endDate: user.end_date,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

/**
 * Adapta lista backend de usuarios.
 */
export function adaptUsersList(response) {
  return (response?.data?.results ?? []).map(adaptBackendUserToUi);
}

/**
 * Adapta catálogos backend al formato del Select del front.
 */
export function adaptCatalogItems(response) {
  return (response?.data?.results ?? []).map((item) => ({
    id: String(item.id),
    value: String(item.id),
    label: item.name,
  }));
}

/**
 * Construye FormData final para crear usuario en una sola transacción.
 */
export function buildCreateUserFormData(values) {
  const formData = new FormData();

  formData.append("nombre", values.fullNames ?? "");
  formData.append("tipo_documento", values.documentTypes ?? "");
  formData.append("numero_documento", values.documentNumber ?? "");
  formData.append("rol", values.roles ?? "");
  formData.append("fecha_inicio", values.startDate ?? "");
  formData.append("fecha_fin", values.endDate ?? "");
  formData.append("email", values.email ?? "");
  formData.append("confirmar_email", values.confirmEmail ?? "");
  formData.append("telefono", values.phoneNumber ?? "");
  formData.append("telefono_secundario", values.secondaryPhone ?? "");
  formData.append("direccion", values.address ?? "");

  // Foto real
  if (values.photoFile instanceof File) {
    formData.append("foto", values.photoFile);
  }

  return formData;
}