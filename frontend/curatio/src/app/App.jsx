import { RouterProvider } from "react-router-dom";
import router from "@/app/router";
import { CartProvider } from "@/features/cartshop/context/CartContext";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}