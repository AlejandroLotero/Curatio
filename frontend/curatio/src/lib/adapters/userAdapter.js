const API_ORIGIN = (
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000"
).replace(/\/$/, "");

/**
 * Si la API devuelve ruta relativa /media/..., el navegador la resolvería contra el origen del SPA.
 * Se antepone el origen del backend (misma lógica que medicamentos con URL absoluta).
 */
function absolutizeMediaUrl(url) {
  if (url === null || url === undefined) return url;
  if (typeof url !== "string") return url;
  const t = url.trim();
  if (!t) return url;
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.startsWith("/")) return `${API_ORIGIN}${t}`;
  return url;
}

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

  // is_active y fechas de auditoría solo vienen si quien consulta es Administrador
  // Adapta el estado del usuario (is_active) al formato booleano de la UI. Esto se hace para que el switch de la UI funcione correctamente.
    const isActive =
    user.is_active === undefined || user.is_active === null
      ? undefined
      : Boolean(user.is_active);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    // Estado del usuario. Se adapta al formato booleano de la UI.
    isActive,
    // Email confirmado. Se adapta al formato booleano de la UI.
    emailConfirmed:
      user.email_confirmed === undefined || user.email_confirmed === null
        ? undefined
        : Boolean(user.email_confirmed),
    documentType: user.document_type,
    documentNumber: user.document_number,
    phone: user.phone,
    secondaryPhone: user.secondary_phone,
    address: user.address,
    photoUrl: absolutizeMediaUrl(user.photo),
    startDate: user.start_date,
    endDate: user.end_date,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    lastLogin: user.last_login,
    phoneNumber: user.phone,
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

/**
 * Cuerpo para PATCH /v1/people/users/:id/ (mismos alias que usa el merge del backend).
 * Con archivo: multipart + `status` activo/inactivo (evita bool mal parseado en formularios).
 * Sin archivo: JSON con `estado` booleano.
 */
export function buildUpdateUserRequestBody(merged, { isActive }, photoFile) {
  const payload = {
    fullNames: merged.fullNames ?? "",
    documentTypes: merged.documentTypes ?? "",
    documentNumber: merged.documentNumber ?? "",
    email: merged.email ?? "",
    phoneNumber: merged.phoneNumber ?? "",
    secondaryPhone: merged.secondaryPhone ?? "",
    address: merged.address ?? "",
    roles: merged.roles ?? "",
    startDate: merged.startDate ?? "",
    endDate: merged.endDate ?? "",
    estado: Boolean(isActive),
  };

  if (photoFile instanceof File) {
    const fd = new FormData();
    const append = (key, value) => {
      if (value === null || value === undefined) return;
      fd.append(key, value);
    };

    append("fullNames", payload.fullNames);
    append("documentTypes", payload.documentTypes);
    append("documentNumber", payload.documentNumber);
    append("email", payload.email);
    append("phoneNumber", payload.phoneNumber);
    append("secondaryPhone", payload.secondaryPhone);
    append("address", payload.address);
    append("roles", payload.roles);
    append("startDate", payload.startDate);
    append("endDate", payload.endDate);
    fd.append("status", payload.estado ? "activo" : "inactivo");
    fd.append("foto", photoFile);
    return fd;
  }

  return {
    fullNames: payload.fullNames,
    documentTypes: payload.documentTypes,
    documentNumber: payload.documentNumber,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    secondaryPhone: payload.secondaryPhone ? payload.secondaryPhone : null,
    address: payload.address,
    roles: payload.roles,
    startDate: payload.startDate ? payload.startDate : null,
    endDate: payload.endDate ? payload.endDate : null,
    estado: payload.estado,
  };
}