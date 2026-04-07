import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { fetchSalesNotifications, markSalesNotificationAsRead } from "@/lib/http/sales";
import { mapSalesNotificationsResponse } from "@/lib/adapters/salesAdapter";

const SalesNotificationsContext = createContext(null);

/**
 * Contexto de notificaciones del módulo de ventas.
 *
 * Solo se activa para:
 * - Administrador
 * - Farmaceuta
 */
export function SalesNotificationsProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  const role = user?.rol || user?.role || "";
  const isInternalUser = isAuthenticated && ["Administrador", "Farmaceuta"].includes(role);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadNotifications = useCallback(async () => {
    if (!isInternalUser) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setLoading(true);

    try {
      const response = await fetchSalesNotifications();
      const mapped = mapSalesNotificationsResponse(response);

      setNotifications(mapped.results);
      setUnreadCount(mapped.unreadCount);
    } catch (error) {
      console.error("Error cargando notificaciones de ventas:", error);
    } finally {
      setLoading(false);
    }
  }, [isInternalUser]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await markSalesNotificationAsRead(notificationId);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notificationId
            ? { ...item, isRead: true, readAt: new Date().toISOString() }
            : item
        )
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("Error marcando notificación como leída:", error);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      loading,
      loadNotifications,
      markAsRead,
      isInternalUser,
    }),
    [notifications, unreadCount, loading, loadNotifications, markAsRead, isInternalUser]
  );

  return (
    <SalesNotificationsContext.Provider value={value}>
      {children}
    </SalesNotificationsContext.Provider>
  );
}

export function useSalesNotifications() {
  const context = useContext(SalesNotificationsContext);

  if (!context) {
    throw new Error("useSalesNotifications debe usarse dentro de SalesNotificationsProvider.");
  }

  return context;
}