import { bootstrapCsrf, httpClient } from "./client";

export async function createSession(payload) {
  await bootstrapCsrf();

  return httpClient.post("/v1/identity/session/", {
    email: payload.email,
    password: payload.password,
  });
}

export async function getCurrentSession() {
  return httpClient.get("/v1/identity/session/");
}

export async function deleteSession() {
  await bootstrapCsrf();
  return httpClient.delete("/v1/identity/session/");
}