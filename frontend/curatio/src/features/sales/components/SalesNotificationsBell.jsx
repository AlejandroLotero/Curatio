import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSalesNotifications } from "@/features/sales/context/SalesNotificationsContext";

/**
 * Campana de notificaciones internas para ventas.
 */
export default function SalesNotificationsBell() {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, isInternalUser } = useSalesNotifications();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  if (!isInternalUser) {
    return null;
  }

  const handleOpenSale = async (notification) => {
    if (!notification?.isRead) {
      await markAsRead(notification.id);
    }

    if (notification?.sale?.id) {
      navigate(`/sales/list`);
    }

    setOpen(false);
  };
//Efecto para cerrar la bandeja cuando se hace click fuera de ella
  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDownOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDownOutside);
    document.addEventListener("touchstart", handlePointerDownOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDownOutside);
      document.removeEventListener("touchstart", handlePointerDownOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative"> {/* ref para el contenedor de la bandeja */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/20"
        aria-label="Notificaciones de ventas"
      >
        <Bell className="size-5 text-label" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 min-w-[20px] rounded-full bg-red-600 px-1.5 py-0.5 text-center text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-[360px] rounded-2xl border bg-white shadow-xl z-50">
          <div className="border-b px-4 py-3">
            <h3 className="text-sm font-bold text-label">Notificaciones de ventas</h3>
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-sm text-label/70">
                No hay notificaciones disponibles.
              </div>
            ) : (
              notifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleOpenSale(item)}
                  className={`w-full border-b px-4 py-3 text-left hover:bg-gray-50 ${item.isRead ? "opacity-70" : ""}`}
                >
                  <p className="text-sm font-semibold text-label">{item.title}</p>
                  <p className="mt-1 text-sm text-label/80">{item.message}</p>
                  <p className="mt-2 text-xs text-label/60">{item.createdAt}</p>
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}