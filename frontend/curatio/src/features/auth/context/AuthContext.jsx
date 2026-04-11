import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  createSession as createSessionRequest,
  deleteSession as deleteSessionRequest,
  getCurrentSession,
  takeoverSession as takeoverSessionRequest,
} from "@/lib/http/identity";
import { adaptBackendUserToUi } from "@/lib/adapters/userAdapter";
import { dispatchClearUiStateOnAuthEnd } from "@/lib/auth/sessionEvents";
import {
  claimTabOwnership,
  releaseTabOwnership,
  hasAnotherActiveTabOwner,
  subscribeToTabTakeover,
  broadcastTabTakeover,
} from "@/lib/auth/tabSessionCoordinator";

const AuthContext = createContext(null);

// Timeout configurable desde Vite o fallback
const INACTIVITY_TIMEOUT_MS = Number(
  import.meta.env.VITE_SESSION_INACTIVITY_TIMEOUT_MS ?? 6000000
);

// Polling liviano para detectar reemplazo de sesión desde otro navegador/dispositivo
const SESSION_HEALTHCHECK_MS = 15000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [authNotice, setAuthNotice] = useState("");

  /**
   * Conflicto de sesión real detectado por backend:
   * otro navegador, otro dispositivo, otro perfil, etc.
   */
  const [sessionConflict, setSessionConflict] = useState(null);

  /**
   * Conflicto entre pestañas del mismo navegador.
   * Este se coordina en frontend porque las pestañas comparten
   * la misma cookie de sesión de Django.
   */
  const [tabConflict, setTabConflict] = useState(null);

  /**
   * Guarda credenciales del intento de login mientras el usuario
   * decide si quiere hacer takeover de una sesión backend ya existente.
   */
  const pendingCredentialsRef = useRef(null);

  /**
   * Guarda el usuario ya autenticado en backend cuando el conflicto
   * es entre pestañas del mismo navegador y aún falta decidir
   * qué pestaña se queda activa visualmente.
   */
  const pendingAuthenticatedUserRef = useRef(null);

  const inactivityTimerRef = useRef(null);
  const sessionPollingRef = useRef(null);

  /**
   * Limpia el timer local de inactividad.
   */
  const clearInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  /**
   * Detiene el polling de salud de sesión backend.
   */
  const stopSessionHealthcheck = () => {
    if (sessionPollingRef.current) {
      clearInterval(sessionPollingRef.current);
      sessionPollingRef.current = null;
    }
  };

  /**
   * Inicia polling liviano para detectar si la sesión fue reemplazada
   * por otro navegador o dispositivo.
   *
   * Este polling no resuelve el caso de pestañas del mismo navegador;
   * ese caso se maneja con storage events en frontend.
   */
  // const startSessionHealthcheck = () => {
  //   stopSessionHealthcheck();

  //   sessionPollingRef.current = setInterval(async () => {
  //     try {
  //       await getCurrentSession();
  //     } catch (error) {
  //       if (
  //         error?.error?.code === "SESSION_REPLACED" ||
  //         error?.error?.code === "SESSION_EXPIRED" ||
  //         error?.error?.code === "UNAUTHENTICATED"
  //       ) {
  //         releaseTabOwnership();
  //         dispatchClearUiStateOnAuthEnd();
  //         setUser(null);
  //         setAuthNotice(
  //           error?.error?.code === "SESSION_REPLACED"
  //             ? "Tu sesión fue cerrada porque se inició en otro navegador o dispositivo."
  //             : "Tu sesión ya no está activa. Vuelve a iniciar sesión."
  //         );
  //         stopSessionHealthcheck();
  //         clearInactivityTimer();
  //       }
  //     }
  //   }, SESSION_HEALTHCHECK_MS);
  // };

    const startSessionHealthcheck = () => {
      stopSessionHealthcheck();

      sessionPollingRef.current = setInterval(async () => {
        try {
          await getCurrentSession();
        } catch (error) {
          const code = error?.error?.code;

          if (code === "SESSION_REPLACED" || code === "SESSION_EXPIRED") {
            releaseTabOwnership();
            dispatchClearUiStateOnAuthEnd();
            setUser(null);
            setAuthNotice(
              code === "SESSION_REPLACED"
                ? "Tu sesión fue cerrada porque se inició en otro navegador o dispositivo."
                : "Sesión cerrada por inactividad, vuelva a iniciar sesión."
            );
            stopSessionHealthcheck();
            clearInactivityTimer();
            setSessionConflict(null);
            setTabConflict(null);
            pendingCredentialsRef.current = null;
            pendingAuthenticatedUserRef.current = null;
            return;
          }

          if (code === "UNAUTHENTICATED") {
            releaseTabOwnership();
            dispatchClearUiStateOnAuthEnd();
            setUser(null);
            setAuthNotice(
              "Se perdió la sesión del navegador. Vuelve a iniciar sesión."
            );
            stopSessionHealthcheck();
            clearInactivityTimer();
            setSessionConflict(null);
            setTabConflict(null);
            pendingCredentialsRef.current = null;
            pendingAuthenticatedUserRef.current = null;
          }
        }
      }, SESSION_HEALTHCHECK_MS);
    };

  /**
   * Cierra sesión local por inactividad.
   * También intenta notificar al backend.
   */
  const handleLocalInactivityLogout = async () => {
    try {
      await deleteSessionRequest();
    } catch (error) {
      console.warn("Session already expired in backend or logout failed silently.");
    } finally {
      releaseTabOwnership();
      dispatchClearUiStateOnAuthEnd();
      setUser(null);
      setAuthNotice("Sesión cerrada por inactividad, vuelva a iniciar sesión.");
      stopSessionHealthcheck();
      clearInactivityTimer();
      setSessionConflict(null);
      setTabConflict(null);
      pendingCredentialsRef.current = null;
      pendingAuthenticatedUserRef.current = null;
    }
  };

  /**
   * Reinicia el contador de inactividad del frontend.
   */
  const resetInactivityTimer = () => {
    clearInactivityTimer();

    if (!user) return;

    inactivityTimerRef.current = setTimeout(() => {
      handleLocalInactivityLogout();
    }, INACTIVITY_TIMEOUT_MS);
  };

  /**
   * Bootstrap inicial de sesión.
   *
   * Si backend dice que hay sesión activa, el contexto recupera al usuario.
   * No reclamamos ownership automáticamente aquí para no pisar otra pestaña
   * abierta del mismo navegador sin una decisión explícita del flujo.
   */
  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
  try {
    const response = await getCurrentSession();
    if (!isMounted) return;

    const adaptedUser = adaptBackendUserToUi(response?.data?.user);

    /**
     * Si ya existe otra pestaña activa en este mismo navegador,
     * no tomamos control automáticamente.
     * Dejamos el usuario pendiente y abrimos modal para decidir.
     */
    if (hasAnotherActiveTabOwner()) {
      pendingAuthenticatedUserRef.current = adaptedUser;
      setTabConflict({
        title: "La cuenta ya está abierta en otra pestaña",
        message:
          "Solo puedes usar una pestaña activa al mismo tiempo en este navegador. Decide si quieres continuar aquí o conservar la pestaña anterior.",
      });

      return;
    }

    /**
     * Si no hay otra pestaña dueña, esta pestaña toma control normal.
     */
    claimTabOwnership();
    setUser(adaptedUser);
  } catch (error) {
    if (!isMounted) return;
    setUser(null);
  } finally {
    if (isMounted) {
      setIsBootstrapping(false);
    }
  }
};

    /**
     * Evento emitido por el cliente HTTP cuando backend informa
     * expiración por inactividad.
     */
    const handleSessionExpired = (event) => {
      if (!isMounted) return;

      releaseTabOwnership();
      dispatchClearUiStateOnAuthEnd();
      setUser(null);
      setAuthNotice(
        event?.detail?.message ||
          "Sesión cerrada por inactividad, vuelva a iniciar sesión."
      );
      stopSessionHealthcheck();
      clearInactivityTimer();
      setSessionConflict(null);
      setTabConflict(null);
      pendingCredentialsRef.current = null;
      pendingAuthenticatedUserRef.current = null;
    };

    /**
     * Evento emitido por el cliente HTTP cuando backend informa
     * que la sesión fue reemplazada por otro navegador/dispositivo.
     */
    const handleSessionReplaced = (event) => {
      if (!isMounted) return;

      releaseTabOwnership();
      dispatchClearUiStateOnAuthEnd();
      setUser(null);
      setAuthNotice(
        event?.detail?.message ||
          "Tu sesión fue reemplazada por otro navegador o dispositivo."
      );
      stopSessionHealthcheck();
      clearInactivityTimer();
      setSessionConflict(null);
      setTabConflict(null);
      pendingCredentialsRef.current = null;
      pendingAuthenticatedUserRef.current = null;
    };

    /**
     * Evento coordinado por localStorage para detectar takeover
     * entre pestañas del mismo navegador.
     */
    const unsubscribeTabTakeover = subscribeToTabTakeover(() => {
      if (!isMounted) return;

      dispatchClearUiStateOnAuthEnd();
      setUser(null);
      setAuthNotice(
        "Tu sesión quedó activa en otra pestaña de este navegador."
      );
      stopSessionHealthcheck();
      clearInactivityTimer();
      setSessionConflict(null);
      setTabConflict(null);
      pendingCredentialsRef.current = null;
      pendingAuthenticatedUserRef.current = null;
    });

    window.addEventListener("session-expired", handleSessionExpired);
    window.addEventListener("session-replaced", handleSessionReplaced);

    bootstrap();

    return () => {
      isMounted = false;
      window.removeEventListener("session-expired", handleSessionExpired);
      window.removeEventListener("session-replaced", handleSessionReplaced);
      unsubscribeTabTakeover?.();
      stopSessionHealthcheck();
      clearInactivityTimer();
    };
  }, []);

  /**
   * Cuando hay usuario autenticado:
   * - escuchar actividad del usuario
   * - reiniciar timer local
   * - iniciar polling para detectar reemplazo backend
   */
  useEffect(() => {
    if (!user) {
      clearInactivityTimer();
      stopSessionHealthcheck();
      return;
    }

    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    const handleActivity = () => {
      resetInactivityTimer();
    };

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity);
    });

    resetInactivityTimer();
    startSessionHealthcheck();

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });

      clearInactivityTimer();
      stopSessionHealthcheck();
    };
  }, [user]);

  /**
   * Login principal.
   *
   * Flujo:
   * 1. Intenta crear sesión backend.
   * 2. Si backend informa SESSION_CONFLICT, se trata de otro navegador/dispositivo.
   * 3. Si backend autentica bien, consultamos la sesión actual.
   * 4. Luego validamos si ya existe otra pestaña activa en este mismo navegador.
   *    - Si sí existe, no entramos visualmente todavía: abrimos modal.
   *    - Si no existe, esta pestaña reclama propiedad y entra normal.
   */
   const signIn = async (payload) => {
  try {
    await createSessionRequest(payload);

    let sessionResponse;
    try {
      sessionResponse = await getCurrentSession();
    } catch (error) {
      releaseTabOwnership();
      dispatchClearUiStateOnAuthEnd();
      setUser(null);

      throw {
        error: {
          code: "SESSION_NOT_PERSISTED",
          message:
            "El backend autenticó al usuario, pero la sesión no quedó activa en el navegador.",
          fields: {},
        },
      };
    }

    const adaptedUser = adaptBackendUserToUi(sessionResponse?.data?.user);

    if (!adaptedUser) {
      throw {
        error: {
          code: "INVALID_LOGIN_RESPONSE",
          message: "No se pudo recuperar el usuario autenticado.",
          fields: {},
        },
      };
    }

    if (hasAnotherActiveTabOwner()) {
      pendingAuthenticatedUserRef.current = adaptedUser;
      setTabConflict({
        title: "La cuenta ya está abierta en otra pestaña",
        message:
          "Solo puedes usar una pestaña activa al mismo tiempo en este navegador. Decide si quieres continuar aquí o conservar la pestaña anterior.",
      });

      return null;
    }

    claimTabOwnership();

    pendingCredentialsRef.current = null;
    pendingAuthenticatedUserRef.current = null;
    setSessionConflict(null);
    setTabConflict(null);
    setUser(adaptedUser);
    setAuthNotice("");

    return adaptedUser;
  } catch (error) {
    if (error?.error?.code === "SESSION_CONFLICT") {
      pendingCredentialsRef.current = payload;
      setSessionConflict({
        title: "La cuenta ya está abierta en otro navegador o dispositivo",
        message:
          "Solo puedes tener una sesión activa al mismo tiempo. Decide si quieres continuar aquí o conservar la sesión anterior.",
      });
    }

    throw error;
  }
};

  /**
   * El usuario decide quedarse en esta pestaña/dispositivo
   * cuando backend detectó conflicto real de sesión.
   *
   * Esto invalida la sesión anterior en backend.
   */
  const confirmTakeover = async () => {
    const payload = pendingCredentialsRef.current;

    if (!payload) {
      throw new Error("No hay credenciales pendientes para takeover.");
    }

    const response = await takeoverSessionRequest(payload);
    const adaptedUser = adaptBackendUserToUi(response?.data?.user);

    /**
     * Una vez backend confirma takeover, esta pestaña también
     * reclama propiedad local dentro del navegador actual.
     */
    claimTabOwnership();
    broadcastTabTakeover();

    pendingCredentialsRef.current = null;
    pendingAuthenticatedUserRef.current = null;
    setSessionConflict(null);
    setTabConflict(null);
    setUser(adaptedUser);
    setAuthNotice("");

    return adaptedUser;
  };

  /**
   * El usuario decide conservar la sesión anterior
   * cuando el conflicto es backend.
   */
  const cancelTakeover = () => {
    pendingCredentialsRef.current = null;
    setSessionConflict(null);
  };

  /**
   * El usuario decide quedarse en esta pestaña
   * cuando el conflicto es solo entre pestañas del mismo navegador.
   *
   * Aquí no hace falta otro login backend porque la sesión ya existe;
   * solo se cambia la propiedad visual/local entre pestañas.
   */
  const confirmTabTakeover = async () => {
    const adaptedUser = pendingAuthenticatedUserRef.current;

    if (!adaptedUser) {
      throw new Error("No hay usuario pendiente para takeover entre pestañas.");
    }

    claimTabOwnership();
    broadcastTabTakeover();

    pendingAuthenticatedUserRef.current = null;
    setTabConflict(null);
    setSessionConflict(null);
    setUser(adaptedUser);
    setAuthNotice("");

    return adaptedUser;
  };

  /**
   * El usuario decide conservar la otra pestaña.
   *
   * En este caso limpiamos la sesión backend recién creada
   * para que no quede autenticación abierta innecesariamente.
   */
  const cancelTabTakeover = async () => {
    try {
      await deleteSessionRequest();
    } catch (error) {
      // Si backend ya no tiene sesión o hubo limpieza previa, se ignora.
      console.warn("Tab takeover cancellation cleanup failed silently.");
    } finally {
      pendingAuthenticatedUserRef.current = null;
      setTabConflict(null);
    }
  };

  /**
   * Logout manual.
   */
  const signOut = async () => {
    try {
      await deleteSessionRequest();
    } finally {
      releaseTabOwnership();
      clearInactivityTimer();
      stopSessionHealthcheck();
      dispatchClearUiStateOnAuthEnd();
      setUser(null);
      setAuthNotice("");
      setSessionConflict(null);
      setTabConflict(null);
      pendingCredentialsRef.current = null;
      pendingAuthenticatedUserRef.current = null;
    }
  };

  /**
   * Permite cerrar el mensaje informativo mostrado al usuario.
   */
  const clearAuthNotice = () => {
    setAuthNotice("");
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isBootstrapping,
      authNotice,

      // Conflictos
      sessionConflict,
      tabConflict,

      // Acciones principales
      signIn,
      signOut,

      // Takeover backend
      confirmTakeover,
      cancelTakeover,

      // Takeover entre pestañas
      confirmTabTakeover,
      cancelTabTakeover,

      // UI
      clearAuthNotice,
    }),
    [
      user,
      isBootstrapping,
      authNotice,
      sessionConflict,
      tabConflict,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}