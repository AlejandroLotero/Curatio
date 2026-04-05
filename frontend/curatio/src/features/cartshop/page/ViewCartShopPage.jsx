// // import { Link, useNavigate } from "react-router-dom";
// // import { Button } from "@/shared/components";
// // import { useCart } from "@/features/cartshop/context/CartContext";

// // /**
// //  * ViewCartShopPage
// //  * ----------------
// //  * Vista del carrito actual del usuario autenticado.
// //  *
// //  * Diferencia con ListCartShopPage:
// //  * - ViewCartShopPage = carrito actual / operativo
// //  * - ListCartShopPage = listado histórico / gestión
// //  */
// // export default function ViewCartShopPage() {
// //   const navigate = useNavigate();

// //   const {
// //     cartItems,
// //     cartCount,
// //     cartSubtotal,
// //     removeCartItem,
// //     clearActiveCart,
// //     isMutatingCart,
// //   } = useCart();

// //   return (
// //     <div className="p-6 min-h-screen text-label">
// //       <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6">
// //         {/* =========================TÍTULO ========================= */}
// //         <div className="flex items-center justify-between gap-4 mb-6">
// //           <h1 className="text-2xl font-bold text-label">
// //             Tu carrito de compras
// //           </h1>

// //           <span className="text-sm font-semibold px-3 py-1 rounded-full bg-red-600 text-white">
// //             {cartCount} item(s)
// //           </span>
// //         </div>

// //         {/* ========================= CARRITO VACÍO ========================= */}
// //         {cartItems.length === 0 ? (
// //           <div className="text-center py-12">
// //             <p className="text-lg font-medium mb-4">
// //               Tu carrito está vacío.
// //             </p>

// //             <Button
// //               variant="primary"
// //               size="sm"
// //               type="button"
// //               onClick={() => navigate("/")}
// //             >
// //               Ir a comprar
// //             </Button>
// //           </div>
// //         ) : (
// //           <>
// //             {/* =========================
// //                 TABLA SIMPLE DEL CARRITO
// //                ========================= */}
// //             <div className="overflow-x-auto rounded-2xl border border-border-strong bg-white/40">
// //               <table className="w-full">
// //                 <thead>
// //                   <tr className="border-b border-border-strong text-left">
// //                     <th className="p-3">Medicamento</th>
// //                     <th className="p-3">Cantidad</th>
// //                     <th className="p-3">Precio unitario</th>
// //                     <th className="p-3">Subtotal</th>
// //                     <th className="p-3 text-center">Acciones</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>
// //                   {cartItems.map((item) => (
// //                     <tr
// //                       key={item.id}
// //                       className="border-b last:border-b-0 border-border/40"
// //                     >
// //                       <td className="p-3">
// //                         {item.productName}
// //                       </td>

// //                       <td className="p-3">
// //                         {item.quantity}
// //                       </td>

// //                       <td className="p-3">
// //                         ${Number(item.unitPrice || 0).toLocaleString("es-CO")}
// //                       </td>

// //                       <td className="p-3">
// //                         ${Number(item.subtotal || 0).toLocaleString("es-CO")}
// //                       </td>

// //                       <td className="p-3 text-center">
// //                         <Button
// //                           variant="secondary"
// //                           size="sm"
// //                           type="button"
// //                           disabled={isMutatingCart}
// //                           onClick={() => removeCartItem(item.id)}
// //                         >
// //                           Quitar
// //                         </Button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* ========================= RESUMEN ========================= */}
// //             <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
// //               <div className="text-lg font-semibold">
// //                 Subtotal: ${Number(cartSubtotal || 0).toLocaleString("es-CO")}
// //               </div>

// //               <div className="flex gap-3">
// //                 <Button
// //                   variant="secondary"
// //                   size="sm"
// //                   type="button"
// //                   disabled={isMutatingCart}
// //                   onClick={clearActiveCart}
// //                 >
// //                   Vaciar carrito
// //                 </Button>

// //                 <Link to="/sales/factura-electronica">
// //                   <Button
// //                     variant="primary"
// //                     size="sm"
// //                     type="button"
// //                     disabled={isMutatingCart}
// //                   >
// //                     Ir a Pagar
// //                   </Button>
// //                 </Link>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import { useNavigate } from "react-router-dom";
// import { Button } from "@/shared/components";
// import { useCart } from "@/features/cartshop/context/CartContext";
// import { useAuth } from "@/features/auth/context/AuthContext";

// /**
//  * ViewCartShopPage
//  * ----------------
//  * Vista del carrito actual / operativo.
//  *
//  * Reglas de comportamiento:
//  * - Esta vista puede abrirse sin login
//  * - Se puede revisar el carrito sin autenticación
//  * - Solo al momento de pagar se exige sesión activa
//  */
// export default function ViewCartShopPage() {
//   const navigate = useNavigate();

//   /**
//    * Estado real del carrito actual.
//    */
//   const {
//     cartItems,
//     cartCount,
//     cartSubtotal,
//     removeCartItem,
//     clearActiveCart,
//     isMutatingCart,
//   } = useCart();

//   /**
//    * Estado real de autenticación.
//    */
//   const { isAuthenticated } = useAuth();

//   /**
//    * Maneja el paso a checkout / pago.
//    *
//    * Reglas:
//    * - Si no está autenticado → redirigir a login
//    * - Si está autenticado → continuar al flujo de venta/pago
//    */
//   const handleGoToCheckout = () => {
//     if (!isAuthenticated) {
//       navigate("/login", {
//         replace: true,
//         state: {
//           from: "/cartshop/ver-carrito",
//           reason: "checkout_required",
//         },
//       });
//       return;
//     }

//     /**
//      * Aquí va el flujo real autenticado.
//      * Por ahora reutilizamos la pantalla actual de ventas.
//      */
//     navigate("/sales/factura-electronica");
//   };

//   return (
//     <div className="p-6 min-h-screen text-label">
//       <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6">
//         {/* ========================= TÍTULO ========================= */}
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
//             {/* ========================= TABLA DEL CARRITO ========================= */}
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

//                 <Button
//                   variant="primary"
//                   size="sm"
//                   type="button"
//                   disabled={isMutatingCart}
//                   onClick={handleGoToCheckout}
//                 >
//                   Ir a pagar
//                 </Button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components";
import { useCart } from "@/features/cartshop/context/CartContext";
import { useAuth } from "@/features/auth/context/AuthContext";

// Nueva tabla reutilizable del carrito actual
import DataTableCurrentCart from "@/features/cartshop/components/DataTableCurrentCart";

// Constructor de columnas del carrito actual
import { buildCurrentCartColumns } from "@/features/cartshop/table/CurrentCartColumns";

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
 * Ajuste realizado:
 * - Ya no usa una tabla HTML manual
 * - Ahora usa un componente estándar reutilizable
 * - Queda alineada con el patrón de tablas del proyecto
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
   * Construcción memoizada de columnas.
   *
   * Se usa useMemo para evitar recrear columnas
   * en cada render innecesariamente.
   */
  const columns = useMemo(() => {
    return buildCurrentCartColumns({
      onRemoveItem: removeCartItem,
      isMutatingCart,
    });
  }, [removeCartItem, isMutatingCart]);

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
          from: "/cartshop/ver-carrito",
          reason: "checkout_required",
        },
      });
      return;
    }

    /**
     * Aquí continúa el flujo de checkout real.
     */
    navigate("/sales/factura-electronica");
  };

  return (
    <div className="p-6 min-h-screen text-label">
      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6">
        {/* =========================
            TÍTULO DEL CARRITO
           ========================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-label">
            Tu carrito de compras
          </h1>

          <span className="text-sm font-semibold px-3 py-1 rounded-full bg-red-600 text-white">
            {cartCount} item(s)
          </span>
        </div>

        {/* =========================
            CARRITO VACÍO
           ========================= */}
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
            {/* =========================
                TABLA ESTÁNDAR DEL CARRITO
               =========================
               Se reemplaza la tabla manual por el componente
               reutilizable alineado al estándar del proyecto.
            */}
            <DataTableCurrentCart
              data={cartItems}
              columns={columns}
            />

            {/* =========================
                RESUMEN DEL CARRITO
               ========================= */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-lg font-semibold">
                Subtotal: ${Number(cartSubtotal || 0).toLocaleString("es-CO")}
              </div>

              <div className="flex flex-wrap gap-3">
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