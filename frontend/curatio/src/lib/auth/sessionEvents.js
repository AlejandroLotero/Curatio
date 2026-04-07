/**
 * Evento global: la sesión terminó (logout manual, inactividad o respuesta SESSION_EXPIRED).
 * Los providers pueden escucharlo para vaciar estado de UI que no debe persistir entre sesiones.
 */
export const CLEAR_UI_STATE_ON_AUTH_END = "curatio:clear-ui-state-on-auth-end";

export function dispatchClearUiStateOnAuthEnd() {
  window.dispatchEvent(new CustomEvent(CLEAR_UI_STATE_ON_AUTH_END));
}
