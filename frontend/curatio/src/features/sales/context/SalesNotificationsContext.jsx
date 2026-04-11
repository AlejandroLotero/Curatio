// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import { useAuth } from "@/features/auth/context/AuthContext";
// import {
//   fetchSalesNotifications,
//   markSalesNotificationAsRead,
// } from "@/lib/http/sales";
// import { mapSalesNotificationsResponse } from "@/lib/adapters/salesAdapter";

// const SalesNotificationsContext = createContext(null);

// /**
//  * Contexto de notificaciones del módulo de ventas.
//  *
//  * Solo se activa para:
//  * - Administrador
//  * - Farmaceuta
//  *
//  * Decisión de UX:
//  * - la bandeja visual muestra únicamente notificaciones no leídas
//  * - al marcar una notificación como leída, se elimina de la lista visible
//  */
// export function SalesNotificationsProvider({ children }) {
//   const { user, isAuthenticated } = useAuth();

//   const role = user?.rol || user?.role || "";
//   const isInternalUser =
//     isAuthenticated && ["Administrador", "Farmaceuta"].includes(role);

//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   /**
//    * Carga únicamente las notificaciones no leídas.
//    *
//    * Esto permite que la bandeja se comporte como un buzón operativo:
//    * cuando una notificación ya fue atendida o marcada como leída,
//    * deja de mostrarse en la UI.
//    */
//   const loadNotifications = useCallback(async () => {
//     if (!isInternalUser) {
//       setNotifications([]);
//       setUnreadCount(0);
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetchSalesNotifications({
//         unread_only: true,
//       });

//       const mapped = mapSalesNotificationsResponse(response);

//       setNotifications(mapped.results);
//       setUnreadCount(mapped.results.length);
//     } catch (error) {
//       console.error("Error cargando notificaciones de ventas:", error);
//       setNotifications([]);
//       setUnreadCount(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [isInternalUser]);

//   /**
//    * Marca una notificación como leída.
//    *
//    * Como la UI solo muestra no leídas, al marcarla correctamente
//    * se elimina del arreglo local.
//    */
//   const markAsRead = useCallback(async (notificationId) => {
//     try {
//       await markSalesNotificationAsRead(notificationId);

//       setNotifications((prev) => {
//         const next = prev.filter((item) => item.id !== notificationId);
//         setUnreadCount(next.length);
//         return next;
//       });
//     } catch (error) {
//       console.error("Error marcando notificación como leída:", error);
//     }
//   }, []);

//   /**
//    * Carga inicial y recarga automática cuando cambia el usuario autenticado.
//    */
//   useEffect(() => {
//     loadNotifications();
//   }, [loadNotifications]);

//   const value = useMemo(
//     () => ({
//       notifications,
//       unreadCount,
//       loading,
//       loadNotifications,
//       markAsRead,
//       isInternalUser,
//     }),
//     [
//       notifications,
//       unreadCount,
//       loading,
//       loadNotifications,
//       markAsRead,
//       isInternalUser,
//     ]
//   );

//   return (
//     <SalesNotificationsContext.Provider value={value}>
//       {children}
//     </SalesNotificationsContext.Provider>
//   );
// }

// /**
//  * Hook de acceso al contexto de notificaciones de ventas.
//  */
// export function useSalesNotifications() {
//   const context = useContext(SalesNotificationsContext);

//   if (!context) {
//     throw new Error(
//       "useSalesNotifications debe usarse dentro de SalesNotificationsProvider."
//     );
//   }

//   return context;
// }

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useAuth } from "@/features/auth/context/AuthContext";
import {
  fetchSalesNotifications,
  markSalesNotificationAsRead,
} from "@/lib/http/sales";
import { mapSalesNotificationsResponse } from "@/lib/adapters/salesAdapter";

const SalesNotificationsContext = createContext(null);
const POLLING_INTERVAL_MS = 3000;

/**
 * Contexto de notificaciones del módulo de ventas.
 *
 * Solo se activa para:
 * - Administrador
 * - Farmaceuta
 *
 * Decisión de UX:
 * - la bandeja visual muestra únicamente notificaciones no leídas
 * - al marcar una notificación como leída, se elimina de la lista visible
 */
export function SalesNotificationsProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  const role = user?.rol || user?.role || "";
  const isInternalUser =
    isAuthenticated && ["Administrador", "Farmaceuta"].includes(role);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const isMountedRef = useRef(true);
  const requestInFlightRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * Carga únicamente las notificaciones no leídas.
   *
   * Esto permite que la bandeja se comporte como un buzón operativo:
   * cuando una notificación ya fue atendida o marcada como leída,
   * deja de mostrarse en la UI.
   */
  const loadNotifications = useCallback(
    async ({ silent = false } = {}) => {
      if (!isInternalUser) {
        if (isMountedRef.current) {
          setNotifications([]);
          setUnreadCount(0);
          setLoading(false);
        }
        return;
      }

      if (requestInFlightRef.current) return;
      requestInFlightRef.current = true;

      if (!silent && isMountedRef.current) {
        setLoading(true);
      }

      try {
        const response = await fetchSalesNotifications({
          unread_only: true,
        });

        const mapped = mapSalesNotificationsResponse(response);

        if (!isMountedRef.current) return;

        setNotifications(mapped.results);
        setUnreadCount(mapped.results.length);
      } catch (error) {
        console.error("Error cargando notificaciones de ventas:", error);

        if (!isMountedRef.current) return;

        setNotifications([]);
        setUnreadCount(0);
      } finally {
        requestInFlightRef.current = false;

        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    },
    [isInternalUser]
  );

  /**
   * Marca una notificación como leída.
   *
   * Como la UI solo muestra no leídas, al marcarla correctamente
   * se elimina del arreglo local.
   */
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await markSalesNotificationAsRead(notificationId);

      if (!isMountedRef.current) return;

      setNotifications((prev) => {
        const next = prev.filter((item) => item.id !== notificationId);
        setUnreadCount(next.length);
        return next;
      });
    } catch (error) {
      console.error("Error marcando notificación como leída:", error);
    }
  }, []);

  /**
   * Carga inicial y recarga automática cuando cambia el usuario autenticado.
   */
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  /**
   * Polling para mantener sincronizada la campana sin recargar la página.
   */
  useEffect(() => {
    if (!isInternalUser) return undefined;

    const intervalId = window.setInterval(() => {
      loadNotifications({ silent: true });
    }, POLLING_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isInternalUser, loadNotifications]);

  /**
   * Refresca cuando el usuario vuelve a la pestaña o recupera foco.
   */
  useEffect(() => {
    if (!isInternalUser) return undefined;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadNotifications({ silent: true });
      }
    };

    const handleWindowFocus = () => {
      loadNotifications({ silent: true });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [isInternalUser, loadNotifications]);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      loading,
      loadNotifications,
      markAsRead,
      isInternalUser,
    }),
    [
      notifications,
      unreadCount,
      loading,
      loadNotifications,
      markAsRead,
      isInternalUser,
    ]
  );

  return (
    <SalesNotificationsContext.Provider value={value}>
      {children}
    </SalesNotificationsContext.Provider>
  );
}

/**
 * Hook de acceso al contexto de notificaciones de ventas.
 */
export function useSalesNotifications() {
  const context = useContext(SalesNotificationsContext);

  if (!context) {
    throw new Error(
      "useSalesNotifications debe usarse dentro de SalesNotificationsProvider."
    );
  }

  return context;
}