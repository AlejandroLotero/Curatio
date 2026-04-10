// import { Bell } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSalesNotifications } from "@/features/sales/context/SalesNotificationsContext";

// /**
//  * Campana de notificaciones internas para ventas.
//  */
// export default function SalesNotificationsBell() {
//   const navigate = useNavigate();
//   const {
//     notifications,
//     unreadCount,
//     markAsRead,
//     isInternalUser,
//     loadNotifications,
//   } = useSalesNotifications();

//   const [open, setOpen] = useState(false);
//   const containerRef = useRef(null);

//   if (!isInternalUser) {
//     return null;
//   }

//   const handleToggleOpen = async () => {
//     const nextOpen = !open;
//     setOpen(nextOpen);

//     if (nextOpen) {
//       await loadNotifications({ silent: true });
//     }
//   };

//   const handleOpenSale = async (notification) => {
//     if (!notification?.isRead) {
//       await markAsRead(notification.id);
//     }

//     if (notification?.sale?.id) {
//       navigate(`/sales/list`);
//     }

//     setOpen(false);
//   };

//   // Efecto para cerrar la bandeja cuando se hace click fuera de ella
//   useEffect(() => {
//     if (!open) return undefined;

//     const handlePointerDownOutside = (event) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target)
//       ) {
//         setOpen(false);
//       }
//     };

//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handlePointerDownOutside);
//     document.addEventListener("touchstart", handlePointerDownOutside);
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("mousedown", handlePointerDownOutside);
//       document.removeEventListener("touchstart", handlePointerDownOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [open]);

//   return (
//     <div ref={containerRef} className="relative">
//       <button
//         type="button"
//         onClick={handleToggleOpen}
//         className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/20"
//         aria-label="Notificaciones de ventas"
//       >
//         <Bell className="size-5 text-label" />
//         {unreadCount > 0 ? (
//           <span className="absolute -right-1 -top-1 min-w-[20px] rounded-full bg-red-600 px-1.5 py-0.5 text-center text-[10px] font-bold text-white">
//             {unreadCount}
//           </span>
//         ) : null}
//       </button>

//       {open ? (
//         <div className="absolute right-0 z-50 mt-2 w-[360px] rounded-2xl border bg-white shadow-xl">
//           <div className="border-b px-4 py-3">
//             <h3 className="text-sm font-bold text-label">
//               Notificaciones de ventas
//             </h3>
//           </div>

//           <div className="max-h-[420px] overflow-y-auto">
//             {notifications.length === 0 ? (
//               <div className="px-4 py-6 text-sm text-label/70">
//                 No hay notificaciones disponibles.
//               </div>
//             ) : (
//               notifications.map((item) => (
//                 <button
//                   key={item.id}
//                   type="button"
//                   onClick={() => handleOpenSale(item)}
//                   className={`w-full border-b px-4 py-3 text-left hover:bg-gray-50 ${
//                     item.isRead ? "opacity-70" : ""
//                   }`}
//                 >
//                   <p className="text-sm font-semibold text-label">
//                     {item.title}
//                   </p>
//                   <p className="mt-1 text-sm text-label/80">
//                     {item.message}
//                   </p>
//                   <p className="mt-2 text-xs text-label/60">
//                     {item.createdAt}
//                   </p>
//                 </button>
//               ))
//             )}
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }

import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSalesNotifications } from "@/features/sales/context/SalesNotificationsContext";

/**
 * Campana de notificaciones internas para ventas.
 */
export default function SalesNotificationsBell() {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    markAsRead,
    isInternalUser,
    loadNotifications,
  } = useSalesNotifications();

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  if (!isInternalUser) {
    return null;
  }

  const handleToggleOpen = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (nextOpen) {
      await loadNotifications({ silent: true });
    }
  };

  const handleOpenSale = async (notification) => {
    if (!notification?.isRead) {
      await markAsRead(notification.id);
    }

    if (notification?.sale?.id) {
      navigate(`/sales/list`);
    }

    setOpen(false);
  };

  // Efecto para cerrar la bandeja cuando se hace click fuera de ella
  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDownOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleToggleOpen}
        className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/20"
        aria-label="Notificaciones de ventas"
      >
        <Bell className="size-5 text-label" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white shadow">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-3 w-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Notificaciones de ventas
              </h3>
              <p className="text-xs text-slate-500">
                {unreadCount > 0
                  ? `${unreadCount} pendiente${unreadCount > 1 ? "s" : ""}`
                  : "Sin pendientes"}
              </p>
            </div>

            {unreadCount > 0 ? (
              <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                {unreadCount} nueva{unreadCount > 1 ? "s" : ""}
              </span>
            ) : null}
          </div>

          <div className="max-h-[420px] overflow-y-auto bg-white p-2">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Bell className="size-5 text-slate-500" />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  No hay notificaciones disponibles
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Cuando llegue una nueva compra, aparecerá aquí.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleOpenSale(item)}
                    className={`group w-full rounded-xl border px-4 py-3 text-left transition ${
                      item.isRead
                        ? "border-slate-200 bg-slate-50 opacity-80"
                        : "border-emerald-100 bg-emerald-50/60 hover:border-emerald-200 hover:bg-emerald-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-1">
                        <span
                          className={`block h-2.5 w-2.5 rounded-full ${
                            item.isRead ? "bg-slate-300" : "bg-emerald-500"
                          }`}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="line-clamp-1 text-sm font-semibold text-slate-800">
                            {item.title}
                          </p>

                          <span className="shrink-0 text-[11px] font-medium text-slate-500">
                            {item.createdAt}
                          </span>
                        </div>

                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
                          {item.message}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs font-medium text-emerald-700 group-hover:underline">
                            Ver pedido
                          </span>

                          {!item.isRead ? (
                            <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
                              Nueva
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}