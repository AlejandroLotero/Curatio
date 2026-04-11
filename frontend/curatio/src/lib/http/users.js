// // Cliente HTTP central basado en fetch wrapper propio
// import { bootstrapCsrf, httpClient } from "./client";

// /**
//  * =========================
//  * GET USERS (LISTADO)
//  * =========================
//  * Permite obtener usuarios con filtros opcionales.
//  */
// export async function getUsers(params = {}) {
//   const searchParams = new URLSearchParams();

//   if (params.search) searchParams.set("search", params.search);
//   if (params.role) searchParams.set("role", params.role);
//   if (params.status !== undefined && params.status !== "") {
//     searchParams.set("status", params.status);
//   }
//   if (params.document) searchParams.set("document", params.document);
//   if (params.page) searchParams.set("page", String(params.page));
//   if (params.pageSize) searchParams.set("page_size", String(params.pageSize));

//   const query = searchParams.toString();

//   return httpClient.get(`/v1/people/users/${query ? `?${query}` : ""}`);
// }

// /**
//  * =========================
//  * GET USER BY ID
//  * =========================
//  * Obtiene detalle de un usuario por su ID.
//  */
// export async function getUserById(id) {
//   return httpClient.get(`/v1/people/users/${id}/`);
// }

// /**
//  * =========================
//  * UPDATE USER STATUS
//  * =========================
//  * Activa o desactiva un usuario.
//  */
// export async function updateUserStatus(id, isActive, reason = "") {
//   return httpClient.patch(`/v1/people/users/${id}/status/`, {
//     is_active: isActive,
//     reason,
//   });
// }

// /**
//  * =========================
//  * CREATE USER (REAL)
//  * =========================
//  * Crea un usuario real usando FormData.
//  *
//  * Importante:
//  * - el backend genera la contraseña automáticamente
//  * - este método soporta foto/archivo
//  * - se envía con multipart/form-data gestionado por el navegador
//  */
// export async function createUser(formData) {
//   try {
//     // Asegura CSRF antes de enviar POST mutable
//     await bootstrapCsrf();

//     // El httpClient ya detecta FormData y lo envía correctamente
//     return await httpClient.post("/v1/people/users/", formData);
//   } catch (backendError) {
//     /**
//      * Normalización del error backend para el wizard.
//      * Tu backend responde con:
//      * {
//      *   error: {
//      *     code,
//      *     message,
//      *     fields
//      *   }
//      * }
//      */
//     throw {
//       error: {
//         code: backendError?.error?.code || "CREATE_USER_FAILED",
//         message: backendError?.error?.message || "Error creating user",
//         fields: backendError?.error?.fields || {},
//       },
//     };
//   }
// }

import { bootstrapCsrf, httpClient } from "./client";
// Importaciones para actualizar usuario 
import { buildUpdateUserRequestBody, buildSelfProfilePatchBody, } from "@/lib/adapters/userAdapter";

/**
 * =========================
 * GET USERS (LISTADO)
 * =========================
 */
export async function getUsers(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.search) searchParams.set("search", params.search);
  if (params.role) searchParams.set("role", params.role);
  if (params.status !== undefined && params.status !== "") {
    searchParams.set("status", params.status);
  }
  if (params.document) searchParams.set("document", params.document);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("page_size", String(params.pageSize));

  const query = searchParams.toString();

  return httpClient.get(`/v1/people/users/${query ? `?${query}` : ""}`);
}

/**
 * Perfil del usuario en sesión (FFARMA02 / backend users/me).
 * Función para obtener el perfil del usuario en sesión.
 */
export async function getMyProfile() {
  return httpClient.get("/v1/people/users/me/");
}

/**
 * Actualiza el perfil del usuario en sesión (Cliente / Farmaceuta).
 */
export async function patchMyProfile(merged, photoFile) {
  try {
    await bootstrapCsrf();
    const body = buildSelfProfilePatchBody(merged, photoFile);
    return await httpClient.patch("/v1/people/users/me/", body);
  } catch (backendError) {
    throw {
      error: {
        code: backendError?.error?.code || "UPDATE_PROFILE_FAILED",
        message:
          backendError?.error?.message || "No se pudo actualizar el perfil.",
        fields: backendError?.error?.fields || {},
      },
    };
  }
}

/**
 * =========================
 * GET USER BY ID
 * =========================
 * Función para obtener un usuario por su ID.
 */
export async function getUserById(id) {
  return httpClient.get(`/v1/people/users/${id}/`);
}

/**
 * =========================
 * UPDATE USER STATUS
 * =========================
 */
export async function updateUserStatus(id, isActive, reason = "") {
  return httpClient.patch(`/v1/people/users/${id}/status/`, {
    is_active: isActive,
    reason,
  });
}

/**
 * Actualiza cuenta de usuario (admin, PATCH /v1/people/users/:id/).
 * `merged` debe incluir los campos del wizard (fullNames, email, roles, etc.).
 * Nueva función updateUser(userId, merged, { isActive }, photoFile) que hace PATCH /v1/people/users/:id/ con CSRF, reutilizando el mismo contrato que el backend (merge de campos en inglés / español).
Errores normalizados como en createUser.
 */
export async function updateUser(userId, merged, { isActive }, photoFile) {
  try {
    await bootstrapCsrf();
    const body = buildUpdateUserRequestBody(merged, { isActive }, photoFile);
    return await httpClient.patch(`/v1/people/users/${userId}/`, body);
  } catch (backendError) {
    throw {
      error: {
        code: backendError?.error?.code || "UPDATE_USER_FAILED",
        message:
          backendError?.error?.message || "No se pudo actualizar el usuario.",
        fields: backendError?.error?.fields || {},
      },
    };
  }
}

/**
 * =========================
 * CREATE USER (REAL)
 * =========================
 */
export async function createUser(formData) {
  try {
    await bootstrapCsrf();

    // Debug temporal: ver exactamente qué se envía
    console.log("CREATE USER FORMDATA:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    return await httpClient.post("/v1/people/users/", formData);
  } catch (backendError) {
    console.error("CREATE USER BACKEND ERROR:", backendError);

    throw {
      error: {
        code: backendError?.error?.code || "CREATE_USER_FAILED",
        message: backendError?.error?.message || "Error creating user",
        fields: backendError?.error?.fields || {},
      },
    };
  }
}