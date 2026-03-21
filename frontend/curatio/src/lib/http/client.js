// const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     return parts.pop().split(";").shift();
//   }
//   return null;
// }

// async function request(path, options = {}) {
//   const url = `${BASE_URL}${path}`;

//   const headers = {
//     "Content-Type": "application/json",
//     ...(options.headers || {}),
//   };

//   const csrfToken = getCookie("csrftoken");
//   if (csrfToken && !["GET", "HEAD", "OPTIONS"].includes(options.method || "GET")) {
//     headers["X-CSRFToken"] = csrfToken;
//   }

//   const response = await fetch(url, {
//     credentials: "include",
//     ...options,
//     headers,
//   });

//   const contentType = response.headers.get("content-type") || "";
//   const body = contentType.includes("application/json")
//     ? await response.json()
//     : null;

//     if (!response.ok) {
//     if (response.status === 401) {
//       window.dispatchEvent(new Event("session-expired"));
//     }

//     throw body || {
//       error: {
//         code: "REQUEST_FAILED",
//         message: "Unexpected request error.",
//         fields: {},
//       },
//     };
//   }

//   return body;
// }

// export async function bootstrapCsrf() {
//   return request("/v1/identity/csrf-token/", {
//     method: "GET",
//   });
// }

// export const httpClient = {
//   get: (path) => request(path, { method: "GET" }),
//   post: (path, data) =>
//     request(path, {
//       method: "POST",
//       body: JSON.stringify(data),
//     }),
//   put: (path, data) =>
//     request(path, {
//       method: "PUT",
//       body: JSON.stringify(data),
//     }),
//   patch: (path, data) =>
//     request(path, {
//       method: "PATCH",
//       body: JSON.stringify(data),
//     }),
//   delete: (path) =>
//     request(path, {
//       method: "DELETE",
//     }),
// };

// export { BASE_URL };

const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const method = options.method || "GET";
  const csrfToken = getCookie("csrftoken");

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
  get: (path) => request(path, { method: "GET" }),
  post: (path, data) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  put: (path, data) =>
    request(path, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  patch: (path, data) =>
    request(path, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (path) =>
    request(path, {
      method: "DELETE",
    }),
};

export { BASE_URL };