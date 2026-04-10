// import { RouterProvider } from "react-router-dom";
// import router from "@/app/router";
// import { CartProvider } from "@/features/cartshop/context/CartContext";
// import { AuthProvider, useAuth } from "@/features/auth/context/AuthContext";
// import { CreateUserWizardProvider } from "@/features/users/context/CreateUserWizardContext";
// import Toast from "@/shared/components/Toast";
// import { ToastProvider } from "../shared/components/ToastContext";
// import { SalesNotificationsProvider } from "../features/sales/context/SalesNotificationsContext";

// /**
//  * Componente interno que escucha avisos globales de auth
//  * y muestra toast visual.
//  */
// function AuthNoticeBridge() {
//   const { authNotice, clearAuthNotice } = useAuth();

//   return (
//     <Toast
//       isVisible={Boolean(authNotice)}
//       message={authNotice}
//       onClose={clearAuthNotice}
//     />
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <CreateUserWizardProvider>
//         <CartProvider>
//           <SalesNotificationsProvider>
//           <ToastProvider>
//           <RouterProvider router={router} />
//           <AuthNoticeBridge />
//           </ToastProvider>
//           </SalesNotificationsProvider>
//         </CartProvider>
//       </CreateUserWizardProvider>
//     </AuthProvider>
//   );
// }

import { RouterProvider } from "react-router-dom";
import router from "@/app/router";
import { CartProvider } from "@/features/cartshop/context/CartContext";
import { AuthProvider, useAuth } from "@/features/auth/context/AuthContext";
import { CreateUserWizardProvider } from "@/features/users/context/CreateUserWizardContext";
import { SalesNotificationsProvider } from "@/features/sales/context/SalesNotificationsContext";
import Toast from "@/shared/components/Toast";
import { ToastProvider } from "@/shared/components/ToastContext";

/**
 * Componente puente que escucha avisos globales de autenticación
 * y los muestra usando el toast visual ya existente.
 */
function AuthNoticeBridge() {
  const { authNotice, clearAuthNotice } = useAuth();

  return (
    <Toast
      isVisible={Boolean(authNotice)}
      message={authNotice}
      onClose={clearAuthNotice}
    />
  );
}

/**
 * App principal.
 *
 * Orden de providers:
 * - AuthProvider: sesión y usuario
 * - CreateUserWizardProvider: flujo de creación de usuarios
 * - CartProvider: carrito de compras
 * - ToastProvider: notificaciones visuales globales
 * - SalesNotificationsProvider: notificaciones internas del módulo de ventas
 */
export default function App() {
  return (
    <AuthProvider>
      <CreateUserWizardProvider>
        <CartProvider>
          <ToastProvider>
            <SalesNotificationsProvider>
              <RouterProvider router={router} />
              <AuthNoticeBridge />
            </SalesNotificationsProvider>
          </ToastProvider>
        </CartProvider>
      </CreateUserWizardProvider>
    </AuthProvider>
  );
}