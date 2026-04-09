const TAB_ID_KEY = "curatio_tab_id";
const ACTIVE_OWNER_KEY = "curatio_active_owner_tab";
const TAKEOVER_EVENT_KEY = "curatio_takeover_event";

/**
 * Genera un identificador único para la pestaña actual.
 */
function generateTabId() {
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

/**
 * Obtiene o crea el identificador único de esta pestaña.
 *
 * sessionStorage es independiente por pestaña, por eso aquí sí sirve.
 */
export function getCurrentTabId() {
  let tabId = window.sessionStorage.getItem(TAB_ID_KEY);

  if (!tabId) {
    tabId = generateTabId();
    window.sessionStorage.setItem(TAB_ID_KEY, tabId);
  }

  return tabId;
}

/**
 * Retorna el id de la pestaña que actualmente se considera dueña.
 */
export function getActiveOwnerTabId() {
  return window.localStorage.getItem(ACTIVE_OWNER_KEY);
}

/**
 * Marca a esta pestaña como dueña activa.
 */
export function claimTabOwnership() {
  const tabId = getCurrentTabId();
  window.localStorage.setItem(ACTIVE_OWNER_KEY, tabId);
  return tabId;
}

/**
 * Libera la propiedad solo si esta pestaña era la dueña.
 */
export function releaseTabOwnership() {
  const tabId = getCurrentTabId();
  const activeOwner = getActiveOwnerTabId();

  if (activeOwner === tabId) {
    window.localStorage.removeItem(ACTIVE_OWNER_KEY);
  }
}

/**
 * Indica si existe otra pestaña distinta que actualmente es dueña.
 */
export function hasAnotherActiveTabOwner() {
  const tabId = getCurrentTabId();
  const activeOwner = getActiveOwnerTabId();

  return Boolean(activeOwner && activeOwner !== tabId);
}

/**
 * Notifica a otras pestañas que esta pestaña tomó control.
 */
export function broadcastTabTakeover() {
  const payload = {
    ownerTabId: getCurrentTabId(),
    emittedAt: Date.now(),
  };

  window.localStorage.setItem(TAKEOVER_EVENT_KEY, JSON.stringify(payload));
}

/**
 * Escucha cuando otra pestaña toma el control.
 */
export function subscribeToTabTakeover(onTakeover) {
  const currentTabId = getCurrentTabId();

  const handleStorage = (event) => {
    if (event.key !== TAKEOVER_EVENT_KEY || !event.newValue) return;

    try {
      const payload = JSON.parse(event.newValue);

      if (payload.ownerTabId !== currentTabId) {
        onTakeover?.(payload);
      }
    } catch {
      // Ignorar payloads inválidos
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
  };
}