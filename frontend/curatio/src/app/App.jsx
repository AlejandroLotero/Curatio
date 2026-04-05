import { RouterProvider } from "react-router-dom";
import router from "@/app/router";
import { CartProvider } from "@/features/cartshop/context/CartContext";
import { AuthProvider, useAuth } from "@/features/auth/context/AuthContext";
import { CreateUserWizardProvider } from "@/features/users/context/CreateUserWizardContext";
import Toast from "@/shared/components/Toast";

/**
 * Componente interno que escucha avisos globales de auth
 * y muestra toast visual.
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

export default function App() {
  return (
    <AuthProvider>
      <CreateUserWizardProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <AuthNoticeBridge />
        </CartProvider>
      </CreateUserWizardProvider>
    </AuthProvider>
  );
}