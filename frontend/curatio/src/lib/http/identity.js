import { bootstrapCsrf, httpClient } from "./client";

/**
 * =========================
 * SESSION
 * =========================
 */

/**
 * Crea sesión de usuario (login).
 */
export async function createSession(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/session/", {
    email: payload.email,
    password: payload.password,
  });
}

/**
 * Obtiene sesión actual.
 */
export async function getCurrentSession() {
  return httpClient.get("/v1/identity/session/");
}

/**
 * Elimina sesión actual (logout).
 */
export async function deleteSession() {
  await bootstrapCsrf();
  return httpClient.delete("/v1/identity/session/");
}

/**
 * =========================
 * PASSWORD RECOVERY
 * =========================
 */

/**
 * Solicita recuperación de contraseña.
 */
export async function requestPasswordRecovery(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/password-recovery/", {
    email: payload.email,
  });
}

/**
 * Valida token de recuperación.
 */
export async function validatePasswordRecoveryToken(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/password-recovery/validate/", {
    uid: payload.uid,
    token: payload.token,
  });
}

/**
 * Confirma cambio de contraseña.
 */
export async function confirmPasswordRecovery(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/password-recovery/confirm/", {
    uid: payload.uid,
    token: payload.token,
    password: payload.password,
    confirm_password: payload.confirmPassword,
  });
}

/**
 * Cambio de contraseña con sesión iniciada (misma política que el backend Django).
 */
export async function changePasswordWithSession(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/session/password/", {
    password: payload.password,
    confirm_password: payload.confirmPassword,
  });
}