// Cliente HTTP central (axios configurado con baseURL y credentials)
import { httpClient } from "./client";

/**
 * =========================
 * GET USERS (LISTADO)
 * =========================
 * Permite obtener usuarios con filtros opcionales
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

  return httpClient.get(
    `/v1/people/users/${query ? `?${query}` : ""}`
  );
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
 * Activa / desactiva usuario (soft state)
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
 * - Usa FormData (porque incluye imagen)
 * - Se usa en el Wizard
 * - Backend genera contraseña automáticamente
 */
export async function createUser(formData) {
  try {
    const response = await httpClient.post(
      "/v1/people/users/", // ✔ consistente con tu naming actual
      formData,
      {
        headers: {
          // ⚠️ IMPORTANTE:
          // NO pongas multipart manualmente → axios lo maneja solo
        },
      }
    );

    return response.data;

  } catch (error) {
    /**
     * Normalizamos error backend → frontend
     * para que el wizard pueda mostrar errores por campo
     */
    const backendError = error?.response?.data;

    throw {
      error: {
        message: backendError?.detail || "Error creating user",
        fields: backendError || {},
      },
    };
  }
}