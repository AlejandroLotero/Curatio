// import { useNavigate } from "react-router-dom";
// import Modal from "@/shared/components/Modal";
// import { useAuth } from "@/features/auth/context/AuthContext";

// /**
//  * Modal global para conflictos de sesión.
//  *
//  * Objetivo:
//  * - Mostrar conflicto backend entre navegadores/dispositivos
//  * - Mostrar conflicto entre pestañas del mismo navegador
//  * - Funcionar desde cualquier ruta, incluso rutas públicas como "/"
//  */
// function getDefaultPostLoginPath(user) {
//   if (!user?.role) return "/home";

//   switch (user.role) {
//     case "Administrador":
//       return "/home";
//     case "Farmaceuta":
//       return "/home";
//     case "Cliente":
//       return "/home";
//     default:
//       return "/";
//   }
// }

// export default function SessionConflictGlobalModal() {
//   const navigate = useNavigate();

//   const {
//     user,
//     sessionConflict,
//     tabConflict,
//     confirmTakeover,
//     cancelTakeover,
//     confirmTabTakeover,
//     cancelTabTakeover,
//   } = useAuth();

//   const handleConfirmTakeover = async () => {
//     const authenticatedUser = await confirmTakeover();
//     const nextPath = getDefaultPostLoginPath(authenticatedUser);
//     navigate(nextPath, { replace: true });
//   };

//   const handleCancelTakeover = () => {
//     cancelTakeover();
//   };

//   const handleConfirmTabTakeover = async () => {
//     const authenticatedUser = await confirmTabTakeover();

//     /**
//      * Si estaba en una ruta pública como "/",
//      * puede quedarse ahí y solo activarse esa pestaña.
//      * Si prefieres llevarlo al home, usa navigate(nextPath).
//      */
//     if (authenticatedUser) {
//       const nextPath = getDefaultPostLoginPath(authenticatedUser);
//       navigate(nextPath, { replace: true });
//     }
//   };

//   const handleCancelTabTakeover = async () => {
//     await cancelTabTakeover();

//     /**
//      * Como está conservando la otra pestaña, esta puede quedarse
//      * en la landing pública.
//      */
//     navigate("/", { replace: true });
//   };

//   return (
//     <>
//       <Modal
//         isOpen={Boolean(sessionConflict)}
//         onClose={handleCancelTakeover}
//         title={sessionConflict?.title}
//         message={sessionConflict?.message}
//         contentClassName="w-[460px]"
//       >
//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
//           <button
//             type="button"
//             onClick={handleCancelTakeover}
//             className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//           >
//             Conservar la otra sesión
//           </button>

//           <button
//             type="button"
//             onClick={handleConfirmTakeover}
//             className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
//           >
//             Quedarme en esta sesión
//           </button>
//         </div>
//       </Modal>

//       <Modal
//         isOpen={Boolean(tabConflict)}
//         onClose={handleCancelTabTakeover}
//         title={tabConflict?.title}
//         message={tabConflict?.message}
//         contentClassName="w-[460px]"
//       >
//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
//           <button
//             type="button"
//             onClick={handleCancelTabTakeover}
//             className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//           >
//             Conservar la otra pestaña
//           </button>

//           <button
//             type="button"
//             onClick={handleConfirmTabTakeover}
//             className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
//           >
//             Quedarme en esta pestaña
//           </button>
//         </div>
//       </Modal>
//     </>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@/shared/components/Modal";
import { Button } from "@/shared/components";
import { useAuth } from "@/features/auth/context/AuthContext";

/**
 * Modal global para conflictos de sesión.
 *
 * Objetivo:
 * - Mostrar conflicto backend entre navegadores/dispositivos
 * - Mostrar conflicto entre pestañas del mismo navegador
 * - Funcionar desde cualquier ruta, incluso rutas públicas como "/"
 */
function getDefaultPostLoginPath(user) {
  if (!user?.role) return "/home";

  switch (user.role) {
    case "Administrador":
    case "Farmaceuta":
    case "Cliente":
      return "/home";
    default:
      return "/";
  }
}

export default function SessionConflictGlobalModal() {
  const navigate = useNavigate();

  const {
    user,
    sessionConflict,
    tabConflict,
    confirmTakeover,
    cancelTakeover,
    confirmTabTakeover,
    cancelTabTakeover,
  } = useAuth();

  const [loadingSessionTakeover, setLoadingSessionTakeover] = useState(false);
  const [loadingTabTakeover, setLoadingTabTakeover] = useState(false);

  const handleConfirmTakeover = async () => {
    try {
      setLoadingSessionTakeover(true);
      const authenticatedUser = await confirmTakeover();
      const nextPath = getDefaultPostLoginPath(authenticatedUser ?? user);
      navigate(nextPath, { replace: true });
    } finally {
      setLoadingSessionTakeover(false);
    }
  };

  const handleCancelTakeover = () => {
    if (loadingSessionTakeover) return;
    cancelTakeover();
  };

  const handleConfirmTabTakeover = async () => {
    try {
      setLoadingTabTakeover(true);
      const authenticatedUser = await confirmTabTakeover();

      if (authenticatedUser) {
        const nextPath = getDefaultPostLoginPath(authenticatedUser ?? user);
        navigate(nextPath, { replace: true });
      }
    } finally {
      setLoadingTabTakeover(false);
    }
  };

  const handleCancelTabTakeover = async () => {
    if (loadingTabTakeover) return;

    await cancelTabTakeover();
    navigate("/", { replace: true });
  };

  return (
    <>
      <Modal
        isOpen={Boolean(sessionConflict)}
        onClose={handleCancelTakeover}
        title={sessionConflict?.title}
        message={sessionConflict?.message}
        contentClassName="w-[460px]"
      >
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={handleCancelTakeover}
            disabled={loadingSessionTakeover}
          >
            Salir
          </Button>

          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={handleConfirmTakeover}
            disabled={loadingSessionTakeover}
          >
            {loadingSessionTakeover
              ? "Procesando..."
              : "Usar Aquí"}
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(tabConflict)}
        onClose={handleCancelTabTakeover}
        title={tabConflict?.title}
        message={tabConflict?.message}
        contentClassName="w-[460px]"
      >
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={handleCancelTabTakeover}
            disabled={loadingTabTakeover}
          >
            Salir
          </Button>

          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={handleConfirmTabTakeover}
            disabled={loadingTabTakeover}
          >
            {loadingTabTakeover
              ? "Procesando..."
              : "Usar Aquí"}
          </Button>
        </div>
      </Modal>
    </>
  );
}