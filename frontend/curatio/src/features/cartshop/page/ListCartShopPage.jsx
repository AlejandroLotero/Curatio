// import DataTableCartShop from "../components/DataTableCartShop"
// import { UserColumns } from "../table/UserColumns"
// import { cartshops } from "@/data/cartshop/cartshops"
// import { Button } from "@/shared/components"
// import { Link } from "react-router-dom"
// import { useState } from "react"
// import ReportConfigModal from "../reports/components/ReportConfigModal";

// export default function ListCartShopPage() {

//    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

//   return (
//     <div className="p-6">

//       <h1 className="text-2xl font-semibold mb-4 text-center pb-4">
//         Carritos de compra
//       </h1>

//       <div className="flex flex-wrap items-center justify-end gap-2 pb-6">
          
        

       
//         <Button 
//           variant="primary"
//           onClick={() => setIsReportModalOpen(true)}
//         >
//           Generar Reporte
//         </Button>
     
//         </div>     

//       <DataTableCartShop
//         data={cartshops}
//         columns={UserColumns}
//       />

//       <ReportConfigModal
//         isOpen={isReportModalOpen}
//         onClose={() => setIsReportModalOpen(false)}
//       />

//     </div>
//   )
// }

import { useState } from "react";
import { Button } from "@/shared/components";
import { useCart } from "@/features/cartshop/context/CartContext";
import DataTableCartShop from "../components/DataTableCartShop";
import { UserColumns } from "../table/UserColumns";
import ReportConfigModal from "../reports/components/ReportConfigModal";

/**
 * ListCartShopPage
 * ----------------
 * Listado del carrito activo real.
 *
 * Ya no consume mocks desde data/cartshop/cartshops.js
 * sino el estado global conectado al backend.
 */
export default function ListCartShopPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const {
    cart,
    cartItems,
    cartCount,
    isLoadingCart,
    cartError,
    refreshCart,
  } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center pb-4 text-label">
        Shopping cart
      </h1>

      {/* Mensaje de error del módulo */}
      {cartError ? (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
          {cartError}
        </div>
      ) : null}

      {/* Resumen superior */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-xl ring-1 p-4">
          <p className="text-sm text-label/70">Invoice</p>
          <p className="text-lg font-bold text-label">
            {cart?.invoiceNumber ?? "—"}
          </p>
        </div>

        <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-xl ring-1 p-4">
          <p className="text-sm text-label/70">Status</p>
          <p className="text-lg font-bold text-label">
            {cart?.status ?? "No active cart"}
          </p>
        </div>

        <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-xl ring-1 p-4">
          <p className="text-sm text-label/70">Units</p>
          <p className="text-lg font-bold text-label">{cartCount}</p>
        </div>

        <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-xl ring-1 p-4">
          <p className="text-sm text-label/70">Total</p>
          <p className="text-lg font-bold text-label">
            ${Number(cart?.summary?.total ?? 0).toLocaleString("en-US")}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 pb-6">
        <Button
          variant="secondary"
          onClick={refreshCart}
          type="button"
        >
          Refresh
        </Button>

        <Button
          variant="primary"
          onClick={() => setIsReportModalOpen(true)}
          type="button"
          disabled={!cartItems.length}
        >
          Generate report
        </Button>
      </div>

      {isLoadingCart ? (
        <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-xl ring-1 p-6 text-center text-label">
          Loading cart...
        </div>
      ) : cartItems.length ? (
        <DataTableCartShop
          data={cartItems}
          columns={UserColumns}
        />
      ) : (
        <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-xl ring-1 p-6 text-center text-label">
          There are no items in the active cart.
        </div>
      )}

      <ReportConfigModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
