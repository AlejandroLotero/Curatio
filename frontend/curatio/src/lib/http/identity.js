import { bootstrapCsrf, httpClient } from "./client";
import { getClientInstanceId } from "@/lib/auth/clientInstance";

/**
 * =========================
 * SESSION
 * =========================
 */
export async function getCurrentSession() {
  return httpClient.get("/v1/identity/session/");
}

export async function createSession(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/session/", {
    email: payload.email,
    password: payload.password,
    remember: payload.remember,
    client_instance_id: getClientInstanceId(),
  });
}

export async function takeoverSession(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/session/takeover/", {
    email: payload.email,
    password: payload.password,
    remember: payload.remember,
    client_instance_id: getClientInstanceId(),
  });
}

export async function deleteSession() {
  await bootstrapCsrf();
  return httpClient.delete("/v1/identity/session/");
}

/**
 * =========================
 * PASSWORD RECOVERY
 * =========================
 */
export async function requestPasswordRecovery(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/password-recovery/", {
    email: payload.email,
  });
}

export async function validatePasswordRecoveryToken(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/password-recovery/validate/", {
    uid: payload.uid,
    token: payload.token,
  });
}

export async function confirmPasswordRecovery(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/password-recovery/confirm/", {
    uid: payload.uid,
    token: payload.token,
    password: payload.password,
    confirm_password: payload.confirmPassword,
  });
}