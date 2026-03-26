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

import DataTableCartShop from "../components/DataTableCartShop";
import { UserColumns } from "../table/UserColumns";
import { Button } from "@/shared/components";
import { useEffect, useState } from "react";
import ReportConfigModal from "../reports/components/ReportConfigModal";
import { useCart } from "@/features/cartshop/context/CartContext";

/**
 * ListCartShopPage
 * ----------------
 * Vista de listado/gestión de carritos.
 *
 * Importante:
 * - Esta vista NO reemplaza el carrito actual del navbar
 * - El navbar debe abrir ViewCartShopPage
 * - Esta pantalla queda como listado administrativo / operativo
 */
export default function ListCartShopPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  /**
   * Aquí usamos la fuente real del contexto del carrito.
   * Si luego decides tener endpoint de listados históricos,
   * este mismo page se conecta a ese endpoint.
   */
  const { cartItems, hydrateCart } = useCart();

  useEffect(() => {
    hydrateCart?.();
  }, [hydrateCart]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center pb-4 text-label">
        Carritos de compra
      </h1>

      <div className="flex flex-wrap items-center justify-end gap-2 pb-6">
        <Button
          variant="primary"
          onClick={() => setIsReportModalOpen(true)}
        >
          Generar Reporte
        </Button>
      </div>

      <DataTableCartShop
        data={cartItems}
        columns={UserColumns}
      />

      <ReportConfigModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
