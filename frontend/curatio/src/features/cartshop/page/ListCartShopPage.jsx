// // import DataTableCartShop from "../components/DataTableCartShop";
// // import { UserColumns } from "../table/UserColumns";
// // import { Button } from "@/shared/components";
// // import { useEffect, useState } from "react";
// // import ReportConfigModal from "../reports/components/ReportConfigModal";
// // import { useCart } from "@/features/cartshop/context/CartContext";

// // /**
// //  * ListCartShopPage
// //  * ----------------
// //  * Vista de listado/gestión de carritos.
// //  *
// //  * Importante:
// //  * - Esta vista NO reemplaza el carrito actual del navbar
// //  * - El navbar debe abrir ViewCartShopPage
// //  * - Esta pantalla queda como listado administrativo / operativo
// //  */
// // export default function ListCartShopPage() {
// //   const [isReportModalOpen, setIsReportModalOpen] = useState(false);

// //   /**
// //    * Aquí usamos la fuente real del contexto del carrito.
// //    * Si luego decides tener endpoint de listados históricos,
// //    * este mismo page se conecta a ese endpoint.
// //    */
// //   const { cartItems, hydrateCart } = useCart();

// //   useEffect(() => {
// //     hydrateCart?.();
// //   }, [hydrateCart]);

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold text-center text-label text-tittles mb-6">
// //         Carritos de compra
// //       </h1>

// //       <div className="flex flex-wrap items-center justify-end gap-2 pb-6">
// //         <Button variant="primary" onClick={() => setIsReportModalOpen(true)}>
// //           Generar Reporte
// //         </Button>
// //       </div>

// //       <DataTableCartShop data={cartItems} columns={UserColumns} />

// //       <ReportConfigModal
// //         isOpen={isReportModalOpen}
// //         onClose={() => setIsReportModalOpen(false)}
// //       />
// //     </div>
// //   );
// // }
// import { Link } from "react-router-dom";
// import { useCallback, useEffect, useMemo, useState } from "react";

// import { Button } from "@/shared/components";
// import Input from "@/shared/components/Input";
// import Select from "@/shared/components/Select";

// import DataTableCartShop from "../components/DataTableCartShop";
// import { UserColumns } from "../table/UserColumns";
// import ReportConfigModal from "../reports/components/ReportConfigModal";

// import { fetchCartShopsList } from "@/lib/http/cartshop";
// import { mapCartShopListResponse } from "@/lib/adapters/cartshopAdapter";

// /**
//  * Opciones de estado alineadas con el RQ.
//  */
// const CART_STATUS_OPTIONS = [
//   { id: "Activo", value: "Activo", label: "Activo" },
//   { id: "Completado", value: "Completado", label: "Completado" },
//   { id: "Cancelado", value: "Cancelado", label: "Cancelado" },
// ];

// /**
//  * Página de listado de carritos conectada al backend real.
//  *
//  * Funcionalidades:
//  * - filtros reales
//  * - consumo de API real
//  * - mantenimiento de la misma estructura visual/funcional de ListSales
//  */
// export default function ListCartShopPage() {
//   // =========================
//   // ESTADOS DE FILTROS
//   // =========================
//   const [invoiceFilter, setInvoiceFilter] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   // =========================
//   // ESTADOS DE DATOS / UI
//   // =========================
//   const [cartshops, setCartshops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const [isReportModalOpen, setIsReportModalOpen] = useState(false);

//   /**
//    * Query consolidada para consumir el backend.
//    */
//   const query = useMemo(() => {
//     return {
//       invoice_number: invoiceFilter.trim(),
//       date: dateFilter.trim(),
//       status: statusFilter.trim(),
//     };
//   }, [invoiceFilter, dateFilter, statusFilter]);

//   /**
//    * Carga real del listado desde backend.
//    */
//   const loadCartShops = useCallback(async () => {
//     setLoading(true);
//     setLoadError("");

//     try {
//       const response = await fetchCartShopsList(query);
//       const rows = mapCartShopListResponse(response);
//       setCartshops(rows);
//     } catch (error) {
//       setLoadError(
//         error?.error?.message || "No se pudieron cargar los carritos."
//       );
//       setCartshops([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [query]);

//   /**
//    * Carga inicial y recarga automática al cambiar filtros.
//    */
//   useEffect(() => {
//     loadCartShops();
//   }, [loadCartShops]);

//   /**
//    * Limpia todos los filtros.
//    */
//   const handleClearFilters = () => {
//     setInvoiceFilter("");
//     setDateFilter("");
//     setStatusFilter("");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 text-label">
//       <div className="w-full max-w-6xl space-y-6">
//         {/* Encabezado */}
//         <div className="text-center mb-4">
//           <h1 className="text-2xl font-bold text-label text-tittles">
//             Carritos de compra
//           </h1>
//           <p className="text-sm text-label/80 mt-1">
//             Consulta y filtra los carritos registrados en la plataforma.
//           </p>
//         </div>

//         {/* Acciones superiores */}
//         <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//             <Link to="/">
//               <Button variant="secondary" size="sm">
//                 Volver
//               </Button>
//             </Link>

//             <Button
//               variant="secondary"
//               size="sm"
//               type="button"
//               onClick={handleClearFilters}
//             >
//               Limpiar filtros
//             </Button>
//           </div>

//           <div className="flex flex-wrap items-center justify-end gap-2">
//             <Button
//               variant="secondary"
//               size="sm"
//               type="button"
//               onClick={() => setIsReportModalOpen(true)}
//             >
//               Generar reporte
//             </Button>
//           </div>
//         </div>

//         {/* Filtros */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
//           <Input
//             label="Número de factura"
//             placeholder="Ej. FEV-12345678"
//             name="invoiceNumber"
//             value={invoiceFilter}
//             onChange={(e) => setInvoiceFilter(e.target.value)}
//             wrapperClassName="w-full min-w-0"
//           />

//           <div className="w-full min-w-0">
//             <label className="block mb-1 text-label font-body text-mostsmall">
//               Fecha
//             </label>
//             <input
//               type="date"
//               value={dateFilter}
//               onChange={(e) => setDateFilter(e.target.value)}
//               className="
//                 relative w-full h-10 rounded-md border border-border-strong px-4
//                 text-label font-body text-small
//                 focus:outline-none focus:ring-1 focus:ring-border focus:border-border
//                 hover:bg-surface/50 cursor-pointer
//               "
//             />
//           </div>

//           <Select
//             label="Estado del carrito"
//             name="cartStatus"
//             options={CART_STATUS_OPTIONS}
//             placeholder="Todos"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             wrapperClassName="w-full min-w-0"
//           />
//         </div>

//         {/* Mensajes de estado */}
//         {loadError ? (
//           <div
//             className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
//             role="alert"
//           >
//             {loadError}
//           </div>
//         ) : null}

//         {/* Indicador de carga */}
//         {loading ? (
//           <div className="rounded-2xl bg-white/70 p-8 text-center shadow-xl backdrop-blur-md">
//             <p className="text-label/80">Cargando carritos...</p>
//           </div>
//         ) : (
//           <DataTableCartShop
//             key={`${invoiceFilter}|${dateFilter}|${statusFilter}`}
//             data={cartshops}
//             columns={UserColumns}
//           />
//         )}

//         {/* Estado vacío */}
//         {!loading && !loadError && cartshops.length === 0 ? (
//           <div className="rounded-2xl bg-white/70 p-8 text-center shadow-xl backdrop-blur-md">
//             <p className="text-label/80">
//               No se encontraron carritos con los filtros aplicados.
//             </p>
//           </div>
//         ) : null}

//         <ReportConfigModal
//           isOpen={isReportModalOpen}
//           onClose={() => setIsReportModalOpen(false)}
//         />
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/shared/components";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";

import DataTableCartShop from "../components/DataTableCartShop";
import { UserColumns } from "../table/UserColumns";
import ReportConfigModal from "../reports/components/ReportConfigModal";

import { fetchCartShopsList } from "@/lib/http/cartshop";
import { mapCartShopListResponse } from "@/lib/adapters/cartshopAdapter";

const CART_STATUS_OPTIONS = [
  { id: "Activo", value: "Activo", label: "Activo" },
  { id: "Completado", value: "Completado", label: "Completado" },
  { id: "Cancelado", value: "Cancelado", label: "Cancelado" },
];

export default function ListCartShopPage() {
  const [invoiceFilter, setInvoiceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [cartshops, setCartshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const query = useMemo(() => {
    return {
      invoice_number: invoiceFilter.trim(),
      date: dateFilter.trim(),
      status: statusFilter.trim(),
    };
  }, [invoiceFilter, dateFilter, statusFilter]);

  const loadCartShops = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await fetchCartShopsList(query);
      const rows = mapCartShopListResponse(response);
      setCartshops(rows);
    } catch (error) {
      setLoadError(
        error?.error?.message || "No se pudieron cargar los carritos."
      );
      setCartshops([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadCartShops();
  }, [loadCartShops]);

  const handleClearFilters = () => {
    setInvoiceFilter("");
    setDateFilter("");
    setStatusFilter("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-label">
      <div className="w-full max-w-6xl space-y-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-label text-tittles">
            Carritos
          </h1>
          <p className="text-sm text-label/80 mt-1">
            Consulta y filtra los carritos registrados en la plataforma.
          </p>
        </div>

        <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/">
              <Button variant="secondary" size="sm">
                Volver
              </Button>
            </Link>

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => setIsReportModalOpen(true)}
            >
              Generar reporte
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <Input
            label="Número de factura"
            placeholder="Ej. FEV-12345678"
            name="invoiceNumber"
            value={invoiceFilter}
            onChange={(e) => setInvoiceFilter(e.target.value)}
            wrapperClassName="w-full min-w-0"
          />

          <div className="w-full min-w-0">
            <label className="block mb-1 text-label font-body text-mostsmall">
              Fecha
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="
                relative w-full h-10 rounded-md border border-border-strong px-4
                text-label font-body text-small
                focus:outline-none focus:ring-1 focus:ring-border focus:border-border
                hover:bg-surface/50 cursor-pointer
              "
            />
          </div>

          <Select
            label="Estado del carrito"
            name="cartStatus"
            options={CART_STATUS_OPTIONS}
            placeholder="Todos"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            wrapperClassName="w-full min-w-0"
          />
        </div>

        {loadError ? (
          <div
            className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {loadError}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-2xl bg-white/70 p-8 text-center shadow-xl backdrop-blur-md">
            <p className="text-label/80">Cargando carritos...</p>
          </div>
        ) : (
          <DataTableCartShop
            key={`${invoiceFilter}|${dateFilter}|${statusFilter}`}
            data={cartshops}
            columns={UserColumns}
          />
        )}

        {!loading && !loadError && cartshops.length === 0 ? (
          <div className="rounded-2xl bg-white/70 p-8 text-center shadow-xl backdrop-blur-md">
            <p className="text-label/80">
              No se encontraron carritos con los filtros aplicados.
            </p>
          </div>
        ) : null}

       <ReportConfigModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          cartshops={cartshops}
          filters={{
            invoice_number: invoiceFilter,
            date: dateFilter,
            status: statusFilter,
          }}
        />
      </div>
    </div>
  );
}