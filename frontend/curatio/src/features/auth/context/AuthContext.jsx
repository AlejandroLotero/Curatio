import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  createSession as createSessionRequest,
  deleteSession as deleteSessionRequest,
  getCurrentSession,
} from "@/lib/http/identity";
import { adaptBackendUserToUi } from "@/lib/adapters/userAdapter";

const AuthContext = createContext(null);

// Timeout configurable desde Vite o fallback a 60s
const INACTIVITY_TIMEOUT_MS = Number(
  import.meta.env.VITE_SESSION_INACTIVITY_TIMEOUT_MS ?? 60000
);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [authNotice, setAuthNotice] = useState("");

  const inactivityTimerRef = useRef(null);

  /**
   * Limpia timer actual.
   */
  const clearInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  /**
   * Cierra sesión localmente por inactividad.
   * También intenta cerrar sesión backend si aún existe.
   */
  const handleLocalInactivityLogout = async () => {
    try {
      await deleteSessionRequest();
    } catch (error) {
      // Si backend ya expiró la sesión, no pasa nada
      console.warn("Session already expired in backend or logout failed silently.");
    } finally {
      setUser(null);
      setAuthNotice("Sesión cerrada por inactividad, vuelva a iniciar sesión.");
    }
  };

  /**
   * Reinicia contador de inactividad en frontend.
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
   */
  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const response = await getCurrentSession();
        if (!isMounted) return;

        setUser(adaptBackendUserToUi(response?.data?.user));
      } catch (error) {
        if (!isMounted) return;
        setUser(null);
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    const handleSessionExpired = (event) => {
      if (!isMounted) return;
      setUser(null);
      setAuthNotice(
        event?.detail?.message ||
          "Sesión cerrada por inactividad, vuelva a iniciar sesión."
      );
    };

    window.addEventListener("session-expired", handleSessionExpired);
    bootstrap();

    return () => {
      isMounted = false;
      window.removeEventListener("session-expired", handleSessionExpired);
    };
  }, []);

  /**
   * Cuando hay usuario autenticado, escuchar actividad y reiniciar timer.
   */
  useEffect(() => {
    if (!user) {
      clearInactivityTimer();
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

    // Inicializa timer al autenticarse
    resetInactivityTimer();

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });

      clearInactivityTimer();
    };
  }, [user]);

  /**
   * Login real.
   */
  const signIn = async (payload) => {
    const response = await createSessionRequest(payload);
    const adaptedUser = adaptBackendUserToUi(response?.data?.user);

    setUser(adaptedUser);
    setAuthNotice("");

    return adaptedUser;
  };

  /**
   * Logout manual real.
   */
  const signOut = async () => {
    try {
      await deleteSessionRequest();
    } finally {
      clearInactivityTimer();
      setUser(null);
      setAuthNotice("");
    }
  };

  /**
   * Permite cerrar el toast/notificación.
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
      signIn,
      signOut,
      clearAuthNotice,
    }),
    [user, isBootstrapping, authNotice]
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