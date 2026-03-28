// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/shared/components";
// import { useCart } from "@/features/cartshop/context/CartContext";

// /**
//  * ViewCartShopPage
//  * ----------------
//  * Vista del carrito actual del usuario autenticado.
//  *
//  * Diferencia con ListCartShopPage:
//  * - ViewCartShopPage = carrito actual / operativo
//  * - ListCartShopPage = listado histórico / gestión
//  */
// export default function ViewCartShopPage() {
//   const navigate = useNavigate();

//   const {
//     cartItems,
//     cartCount,
//     cartSubtotal,
//     removeCartItem,
//     clearActiveCart,
//     isMutatingCart,
//   } = useCart();

//   return (
//     <div className="p-6 min-h-screen text-label">
//       <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6">
//         {/* =========================TÍTULO ========================= */}
//         <div className="flex items-center justify-between gap-4 mb-6">
//           <h1 className="text-2xl font-bold text-label">
//             Tu carrito de compras
//           </h1>

//           <span className="text-sm font-semibold px-3 py-1 rounded-full bg-red-600 text-white">
//             {cartCount} item(s)
//           </span>
//         </div>

//         {/* ========================= CARRITO VACÍO ========================= */}
//         {cartItems.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-lg font-medium mb-4">
//               Tu carrito está vacío.
//             </p>

//             <Button
//               variant="primary"
//               size="sm"
//               type="button"
//               onClick={() => navigate("/")}
//             >
//               Ir a comprar
//             </Button>
//           </div>
//         ) : (
//           <>
//             {/* =========================
//                 TABLA SIMPLE DEL CARRITO
//                ========================= */}
//             <div className="overflow-x-auto rounded-2xl border border-border-strong bg-white/40">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border-strong text-left">
//                     <th className="p-3">Medicamento</th>
//                     <th className="p-3">Cantidad</th>
//                     <th className="p-3">Precio unitario</th>
//                     <th className="p-3">Subtotal</th>
//                     <th className="p-3 text-center">Acciones</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {cartItems.map((item) => (
//                     <tr
//                       key={item.id}
//                       className="border-b last:border-b-0 border-border/40"
//                     >
//                       <td className="p-3">
//                         {item.productName}
//                       </td>

//                       <td className="p-3">
//                         {item.quantity}
//                       </td>

//                       <td className="p-3">
//                         ${Number(item.unitPrice || 0).toLocaleString("es-CO")}
//                       </td>

//                       <td className="p-3">
//                         ${Number(item.subtotal || 0).toLocaleString("es-CO")}
//                       </td>

//                       <td className="p-3 text-center">
//                         <Button
//                           variant="secondary"
//                           size="sm"
//                           type="button"
//                           disabled={isMutatingCart}
//                           onClick={() => removeCartItem(item.id)}
//                         >
//                           Quitar
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* ========================= RESUMEN ========================= */}
//             <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-lg font-semibold">
//                 Subtotal: ${Number(cartSubtotal || 0).toLocaleString("es-CO")}
//               </div>

//               <div className="flex gap-3">
//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   type="button"
//                   disabled={isMutatingCart}
//                   onClick={clearActiveCart}
//                 >
//                   Vaciar carrito
//                 </Button>

//                 <Link to="/sales/factura-electronica">
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     type="button"
//                     disabled={isMutatingCart}
//                   >
//                     Ir a Pagar
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { Button } from "@/shared/components";
import { useCart } from "@/features/cartshop/context/CartContext";
import { useAuth } from "@/features/auth/context/AuthContext";

/**
 * ViewCartShopPage
 * ----------------
 * Vista del carrito actual / operativo.
 *
 * Reglas de comportamiento:
 * - Esta vista puede abrirse sin login
 * - Se puede revisar el carrito sin autenticación
 * - Solo al momento de pagar se exige sesión activa
 *
 * Datos del medicamento:
 * - `cartItems` viene ya enriquecido desde CartContext (resolveMedicationForCart +
 *   enrichCartLine): nombre, precio, imagen, laboratorio, presentación, etc.
 * - Si falta algún campo, la tabla usa fallback seguro (vacío o 0).
 */
export default function ViewCartShopPage() {
  const navigate = useNavigate();

  /**
   * Estado real del carrito actual.
   */
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    removeCartItem,
    clearActiveCart,
    isMutatingCart,
  } = useCart();

  /**
   * Estado real de autenticación.
   */
  const { isAuthenticated } = useAuth();

  /**
   * Maneja el paso a checkout / pago.
   *
   * Reglas:
   * - Si no está autenticado → redirigir a login
   * - Si está autenticado → continuar al flujo de venta/pago
   */
  const handleGoToCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: {
          /** Tras login, abrir directamente la vista de pagos (carrito sigue en contexto). */
          from: "/sales/pagos",
          reason: "checkout_required",
        },
      });
      return;
    }

    /**
     * Vista de pago (protegida): resumen del carrito + método de pago + totales.
     */
    navigate("/sales/pagos");
  };

  /**
   * Ruta "/" en el router carga NewHomePage (inicio público / tienda).
   */
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="p-6 min-h-screen text-label">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6">
        {/* ========================= TÍTULO ========================= */}
        <div className="mb-6 flex items-center justify-between gap-4">  {/* Este div contriene el titulo y el numero de items en el carrito */}
          <div className="flex min-w-0 items-center gap-3"> {/* Este div contiene el boton de volver al inicio y el titulo */}
            {/*
              Volver al inicio (NewHomePage): mismo patrón que otras pantallas
              del proyecto con CircleArrowLeft + lucide-react.
              la propiedad shrink-0 es para que el boton no se reduzca en tamaño cuando el texto es muy largo
            */}
            <button
              type="button"
              onClick={goToHome}
              className="w-12 h-12 place-items-center hover:scale-110 transition-all duration-300 hover:bg-primarybtnhoverbg hover:rounded-full"
              aria-label="Volver al inicio"
            >
              <CircleArrowLeft className="h-9 w-9" strokeWidth={1.75} />
            </button>
            <h1 className="truncate text-2xl font-bold text-label">
              Tu carrito de compras
            </h1>
          </div>

          <span className="shrink-0 text-sm font-semibold rounded-full bg-red-600 px-3 py-1 text-white"> {/* Este span contiene el numero de items en el carrito */}
            {cartCount} item(s)
          </span>
        </div>

        {/* ========================= CARRITO VACÍO ========================= */}
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium mb-4">
              Tu carrito está vacío.
            </p>

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => navigate("/")}
            >
              Ir a comprar
            </Button>
          </div>
        ) : (
          <>
            {/* ========================= TABLA DEL CARRITO ========================= */}
            <div className="overflow-x-auto rounded-2xl border border-border-strong bg-white/40">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-strong text-left">
                    <th className="p-3 min-w-[220px]">Medicamento</th> {/* Se define la columna de medicamento con un ancho minimo de 220px */}
                    <th className="p-3">Cantidad</th>
                    <th className="p-3">Precio unitario</th>
                    <th className="p-3">Subtotal</th>
                    <th className="p-3 text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b last:border-b-0 border-border/40"
                    >
                      {/*
                        Celda de medicamento: combina miniatura + datos del catálogo
                        que el contexto adjuntó a la línea (image, laboratory, …).
                      */}
                      <td className="p-3 align-top">
                        <div className="flex gap-3">
                          <div
                            className="
                              flex h-20 w-20 shrink-0 items-center justify-center
                              overflow-hidden rounded-lg bg-white/80
                            "
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.productName ?? "Medicamento"}
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <span className="px-1 text-center text-xs text-label/70">
                                Sin imagen
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 space-y-1">
                            <p className="font-semibold text-label">
                              {item.productName ?? "Medicamento"}
                            </p>
                            {item.laboratory ? (
                              <p className="text-xs text-label/80">
                                <span className="font-medium">Laboratorio:</span>{" "}
                                {item.laboratory}
                              </p>
                            ) : null}
                            {item.concentration ? (
                              <p className="text-xs text-label/80">
                                <span className="font-medium">Concentración:</span>{" "}
                                {item.concentration}
                              </p>
                            ) : null}
                            {item.presentation ? (
                              <p className="text-xs text-label/80">
                                <span className="font-medium">Presentación:</span>{" "}
                                {item.presentation}
                              </p>
                            ) : null}
                            {item.formaFarmaceutica ? (
                              <p className="text-xs text-label/80">
                                <span className="font-medium">Forma:</span>{" "}
                                {item.formaFarmaceutica}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </td>

                      <td className="p-3 align-middle">{item.quantity}</td>

                      <td className="p-3 align-middle">
                        ${Number(item.unitPrice || 0).toLocaleString("es-CO")}
                      </td>

                      <td className="p-3 align-middle">
                        ${Number(item.subtotal || 0).toLocaleString("es-CO")}
                      </td>

                      <td className="p-3 text-center align-middle">
                        <Button
                          variant="secondary"
                          size="sm"
                          type="button"
                          disabled={isMutatingCart}
                          onClick={() => removeCartItem(item.id)}
                        >
                          Quitar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ========================= RESUMEN ========================= */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-lg font-semibold">
                Subtotal: ${Number(cartSubtotal || 0).toLocaleString("es-CO")}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  disabled={isMutatingCart}
                  onClick={clearActiveCart}
                >
                  Vaciar carrito
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  disabled={isMutatingCart}
                  onClick={handleGoToCheckout}
                >
                  Ir a pagar
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}