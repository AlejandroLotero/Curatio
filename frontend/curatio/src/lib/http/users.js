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
 * =========================
 * GET USER BY ID
 * =========================
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