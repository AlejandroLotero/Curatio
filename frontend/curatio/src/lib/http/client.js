import { getClientInstanceId } from "@/lib/auth/clientInstance";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ??
  `${window.location.protocol}//${window.location.hostname}:8000`;

if (!BASE_URL) {
  throw new Error("VITE_BACKEND_URL no está definida");
}

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
 */
function isFormDataBody(value) {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const method = options.method || "GET";
  const csrfToken = getCookie("csrftoken");
  const responseType = options.responseType || "json";

  const bodyIsFormData = isFormDataBody(options.body);
  const hasBody = options.body !== undefined && options.body !== null;

  const headers = {
  ...(hasBody && !bodyIsFormData ? { "Content-Type": "application/json" } : {}),
  ...(options.headers || {}),
  
};

  if (csrfToken && !["GET", "HEAD", "OPTIONS"].includes(method)) {
    headers["X-CSRFToken"] = csrfToken;
  }

  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers,
  });

  if (responseType === "blob") {
    const blob = await response.blob();

    if (!response.ok) {
      throw {
        error: {
          code: "REQUEST_FAILED",
          message: "Unexpected request error.",
          fields: {},
        },
        status: response.status,
        data: blob,
      };
    }

    return {
      data: blob,
      status: response.status,
      headers: response.headers,
    };
  }

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    if (response.status === 401 && body?.error?.code === "SESSION_EXPIRED") {
      window.dispatchEvent(
        new CustomEvent("session-expired", {
          detail: {
            message: "Sesión cerrada por inactividad, vuelva a iniciar sesión.",
          },
        })
      );
    }

      if (response.status === 401 && body?.error?.code === "SESSION_REPLACED") {
      window.dispatchEvent(
        new CustomEvent("session-replaced", {
          detail: {
            message: "Tu sesión fue reemplazada por otra pestaña o dispositivo.",
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

export async function bootstrapCsrf() {
  return request("/v1/identity/csrf-token/", {
    method: "GET",
  });
}

export const httpClient = {
  get: (path, options = {}) =>
    request(path, {
      ...options,
      method: "GET",
    }),

  post: (path, data, options = {}) =>
    request(path, {
      ...options,
      method: "POST",
      body: isFormDataBody(data) ? data : JSON.stringify(data),
    }),

  put: (path, data, options = {}) =>
    request(path, {
      ...options,
      method: "PUT",
      body: isFormDataBody(data) ? data : JSON.stringify(data),
    }),

  patch: (path, data, options = {}) =>
    request(path, {
      ...options,
      method: "PATCH",
      body: isFormDataBody(data) ? data : JSON.stringify(data),
    }),

  delete: (path, options = {}) =>
    request(path, {
      ...options,
      method: "DELETE",
    }),
};

export { BASE_URL };