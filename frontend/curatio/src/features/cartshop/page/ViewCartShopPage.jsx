import { useNavigate } from "react-router-dom";
import { useCart } from "@/features/cartshop/context/CartContext";
import { useAuth } from "@/features/auth/context/AuthContext";

import CartProductList from "../components/CartProductList";
import CartSummaryCard from "../components/CardSummaryCard";

/**
 * ViewCartShopPage
 * ----------------
 * Vista del carrito actual con:
 * - lista scrollable a la izquierda
 * - resumen fijo a la derecha
 * - control directo de cantidades
 */
export default function ViewCartShopPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartSubtotal,
    removeCartItem,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    clearActiveCart,
    isMutatingCart,
  } = useCart();

  const { isAuthenticated, user } = useAuth();

  const handleGoToCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: {
          from: "/cartshop/ver-carrito",
          reason: "checkout_required",
        },
      });
      return;
    }

    const role = user?.rol || user?.role || "";

    if (role === "Cliente") {
      navigate("/checkout");
      return;
    }

    if (role === "Administrador" || role === "Farmaceuta") {
      navigate("/sales/factura-electronica");
      return;
    }

    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 text-label">
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>

            <p className="text-base mb-6 text-label/80">
              Aún no has agregado productos a tu carrito de compras.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                inline-flex items-center justify-center
                rounded-4xl border border-border-strong
                bg-primarybtnbg text-primarybtntext
                px-4 py-2 text-small font-heading font-body
                transition-colors hover:bg-primarybtnhoverbg hover:text-label
              "
            >
              Ir a comprar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 text-label">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-label">
              Tu carrito de compras
            </h1>
            <p className="text-sm text-label/80 mt-1">
              Revisa tus productos antes de continuar al pago.
            </p>
          </div>

          <div className="inline-flex items-center self-start sm:self-auto rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
            {cartCount} item(s)
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          <CartProductList
            items={cartItems}
            isMutatingCart={isMutatingCart}
            onRemoveItem={removeCartItem}
            onIncreaseItem={increaseCartItemQuantity}
            onDecreaseItem={decreaseCartItemQuantity}
          />

          <CartSummaryCard
            cartCount={cartCount}
            cartSubtotal={cartSubtotal}
            isMutatingCart={isMutatingCart}
            onClearCart={clearActiveCart}
            onCheckout={handleGoToCheckout}
            onContinueShopping={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
}