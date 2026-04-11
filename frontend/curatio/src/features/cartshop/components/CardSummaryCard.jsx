import { ShoppingCart } from "lucide-react";
import { Button } from "@/shared/components";

/**
 * CartSummaryCard
 * ---------------
 * Resumen lateral premium del carrito.
 *
 * Diseño:
 * - cabecera verde
 * - bloque de resumen limpio
 * - acciones claras y jerarquizadas
 * - sticky en desktop
 */
export default function CartSummaryCard({
  cartCount,
  cartSubtotal,
  isMutatingCart,
  onClearCart,
  onCheckout,
  onContinueShopping,
}) {
  /**
   * Por ahora el ahorro queda listo para conectarse
   * a descuentos/promociones futuras.
   */
  const savings = 0;

  return (
    <aside className="xl:sticky xl:top-24">
      <div className="overflow-hidden rounded-3xl bg-white/85 backdrop-blur-md shadow-xl border border-border/20">
        {/* =========================
            HEADER
           ========================= */}
        <div className="bg-[#3A9890] px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-xl font-bold">Tu carrito de compras</h2>
          </div>
        </div>

        {/* =========================
            BODY
           ========================= */}
        <div className="p-5 space-y-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-label/80">Total productos</span>
            <span className="font-semibold text-label">{cartCount}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-label/80">Ahorro</span>
            <span className="font-semibold text-label">
              ${savings.toLocaleString("es-CO")}
            </span>
          </div>

          <div className="border-t border-border/30 pt-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-lg font-semibold text-label">Subtotal</span>
              <span className="text-2xl sm:text-3xl font-bold text-label">
                ${Number(cartSubtotal || 0).toLocaleString("es-CO")}
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-900 leading-relaxed">
            El costo del envío no está incluido en el total a pagar.
            Se calculará en el siguiente paso del proceso de compra.
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="md"
              type="button"
              disabled={isMutatingCart}
              onClick={onCheckout}
              className="w-full justify-center text-base"
            >
              Ir a pagar
            </Button>

            <Button
              variant="secondary"
              size="md"
              type="button"
              disabled={isMutatingCart}
              onClick={onClearCart}
              className="w-full justify-center"
            >
              Vaciar carrito
            </Button>

            <button
              type="button"
              onClick={onContinueShopping}
              className="w-full text-center text-sm font-semibold text-green-700 hover:underline"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}