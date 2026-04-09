const STORAGE_KEY = "curatio_client_instance_id";

function generateClientInstanceId() {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    typeof window.crypto.randomUUID === "function"
  ) {
    return window.crypto.randomUUID();
  }

  const randomPart = Math.random().toString(36).slice(2, 12);
  const timePart = Date.now().toString(36);

  return `tab-${timePart}-${randomPart}`;
}

export function getClientInstanceId() {
  let value = window.sessionStorage.getItem(STORAGE_KEY);

  if (!value) {
    value = generateClientInstanceId();
    window.sessionStorage.setItem(STORAGE_KEY, value);
  }

  return value;
}