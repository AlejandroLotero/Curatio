const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";

/**
 * Lee una cookie por nombre.
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

/**
 * Determina si el body enviado es FormData.
 * Esto es importante porque:
 * - FormData NO debe serializarse con JSON.stringify
 * - FormData NO debe forzar Content-Type manualmente
 */
function isFormDataBody(value) {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

/**
 * Cliente base para requests fetch.
 *
 * Soporta:
 * - JSON
 * - FormData
 * - credenciales con cookies/sesión
 * - CSRF automático para métodos mutables
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const method = options.method || "GET";
  const csrfToken = getCookie("csrftoken");

  /**
   * Si el body es FormData:
   * - no se debe poner Content-Type manualmente
   * - el navegador agrega el boundary correcto
   */
  const bodyIsFormData = isFormDataBody(options.body);

  const headers = {
    ...(bodyIsFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  // CSRF solo para métodos mutables
  if (csrfToken && !["GET", "HEAD", "OPTIONS"].includes(method)) {
    headers["X-CSRFToken"] = csrfToken;
  }

  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    // Si backend reporta expiración real por inactividad, emitir evento global
    if (response.status === 401 && body?.error?.code === "SESSION_EXPIRED") {
      window.dispatchEvent(
        new CustomEvent("session-expired", {
          detail: {
            message: "Sesión cerrada por inactividad, vuelva a iniciar sesión.",
          },
        })
      );
    }

    throw body || {
      error: {
        code: "REQUEST_FAILED",
        message: "Unexpected request error.",
        fields: {},
      },
    };
  }

  return body;
}

/**
 * Fuerza generación de CSRF cookie/token.
 */
export async function bootstrapCsrf() {
  return request("/v1/identity/csrf-token/", {
    method: "GET",
  });
}

export const httpClient = {
  /**
   * GET simple
   */
  get: (path) => request(path, { method: "GET" }),

  /**
   * POST:
   * - si recibe FormData, lo envía directo
   * - si recibe objeto normal, lo serializa a JSON
   */
  post: (path, data) =>
    request(path, {
      method: "POST",
      body: isFormDataBody(data) ? data : JSON.stringify(data),
    }),

  /**
   * PUT:
   * - si recibe FormData, lo envía directo
   * - si recibe objeto normal, lo serializa a JSON
   */
  put: (path, data) =>
    request(path, {
      method: "PUT",
      body: isFormDataBody(data) ? data : JSON.stringify(data),
    }),

  /**
   * PATCH:
   * - si recibe FormData, lo envía directo
   * - si recibe objeto normal, lo serializa a JSON
   */
  patch: (path, data) =>
    request(path, {
      method: "PATCH",
      body: isFormDataBody(data) ? data : JSON.stringify(data),
    }),

  /**
   * DELETE simple
   */
  delete: (path) =>
    request(path, {
      method: "DELETE",
    }),
};

export { BASE_URL };