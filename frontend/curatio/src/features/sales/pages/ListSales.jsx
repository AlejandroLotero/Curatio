// import { Link } from "react-router-dom";
// import { useMemo, useState, useEffect } from "react";
// import { Button } from "@/shared/components";
// import Input from "@/shared/components/Input";
// import Select from "@/shared/components/Select";
// import DataTableSales from "./DataTableSales";
// import { SalesColumns } from "../table/SalesColumns";
// import { mockSales } from "@/data/sales/salesMock";
// import { getStateSaleTypes } from "../services/selectServices";
// import SalesReportConfigModal from "../reports/components/SalesReportConfigModal";

// function normalize(str) {
//   return (str ?? "").toString().toLowerCase().trim();
// }

// /**
//  * Listado de ventas con filtros en cliente (sin backend).
//  * Filtros: número de factura, fecha, cliente, farmaceuta, estado.
//  */
// export default function ListSales() {
//   const [invoiceFilter, setInvoiceFilter] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const [customerFilter, setCustomerFilter] = useState("");
//   const [pharmacistFilter, setPharmacistFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [stateSaleTypes, setStateSaleTypes] = useState([]);
//   const [isReportOpen, setIsReportOpen] = useState(false);

//   useEffect(() => {
//     getStateSaleTypes().then(setStateSaleTypes);
//   }, []);

//   const filteredRows = useMemo(() => {
//     return mockSales.filter((row) => {
//       if (invoiceFilter) {
//         const q = normalize(invoiceFilter);
//         if (!normalize(row.invoiceNumber).includes(q)) return false;
//       }
//       if (dateFilter && row.saleDate !== dateFilter) return false;
//       if (customerFilter) {
//         const q = normalize(customerFilter);
//         if (!normalize(row.customer).includes(q)) return false;
//       }
//       if (pharmacistFilter) {
//         const q = normalize(pharmacistFilter);
//         if (!normalize(row.pharmacist).includes(q)) return false;
//       }
//       if (statusFilter && row.statusId !== statusFilter) return false;
//       return true;
//     });
//   }, [
//     invoiceFilter,
//     dateFilter,
//     customerFilter,
//     pharmacistFilter,
//     statusFilter,
//   ]);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 text-label">
//       <div className="w-full max-w-6xl space-y-6">
//         <div className="text-center mb-4">
//           <h1 className="text-2xl font-bold text-label text-tittles">
//             Ventas
//           </h1>
//         </div>

//         <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//             <Link to="/">
//               <Button variant="secondary" size="sm">
//                 Volver
//               </Button>
//             </Link>
//           </div>
//           <div className="flex flex-wrap items-center justify-end gap-2">
//             <Button
//               variant="secondary"
//               size="sm"
//               type="button"
//               onClick={() => setIsReportOpen(true)}
//             >
//               Generar reporte
//             </Button>
//             <Link to="/sales/factura-electronica">
//               <Button variant="primary" size="sm">
//                 Ver recibo / factura
//               </Button>
//             </Link>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
//           <Input
//             label="Número de factura"
//             placeholder="Ej. FEV00001"
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
//           <Input
//             label="Cliente"
//             placeholder="Nombre del cliente"
//             name="customer"
//             value={customerFilter}
//             onChange={(e) => setCustomerFilter(e.target.value)}
//             wrapperClassName="w-full min-w-0"
//           />
//           <Input
//             label="Farmaceuta"
//             placeholder="Nombre del farmaceuta"
//             name="pharmacist"
//             value={pharmacistFilter}
//             onChange={(e) => setPharmacistFilter(e.target.value)}
//             wrapperClassName="w-full min-w-0"
//           />
//           <Select
//             label="Estado de la venta"
//             name="saleStatus"
//             options={stateSaleTypes}
//             placeholder="Todos"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             wrapperClassName="w-full min-w-0"
//           />
//         </div>

//         <DataTableSales
//           key={`${invoiceFilter}|${dateFilter}|${customerFilter}|${pharmacistFilter}|${statusFilter}`}
//           data={filteredRows}
//           columns={SalesColumns}
//         />

//         <SalesReportConfigModal
//           isOpen={isReportOpen}
//           onClose={() => setIsReportOpen(false)}
//           salesAll={mockSales}
//           salesFiltered={filteredRows}
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

import DataTableSales from "./DataTableSales";
import { SalesColumns } from "../table/SalesColumns";

import {
  fetchSalesList,
  downloadSalesReport,
} from "@/lib/http/sales";
import { mapSalesListResponse } from "@/lib/adapters/salesAdapter";

/**
 * Opciones de estado alineadas con backend.
 *
 * Backend expone:
 * - Pendiente
 * - Completada
 * - Anulada
 */
const SALE_STATUS_OPTIONS = [
  { id: "Pendiente", value: "Pendiente", label: "Pendiente" },
  { id: "Completada", value: "Completada", label: "Completada" },
  { id: "Anulada", value: "Anulada", label: "Anulada" },
];

/**
 * Extrae un Blob desde la respuesta del cliente HTTP.
 *
 * Se deja defensivo porque el proyecto no está usando Axios de forma explícita
 * y el wrapper real puede devolver la carga útil en formas distintas.
 */
async function extractBlobPayload(response) {
  if (!response) {
    return null;
  }

  if (response instanceof Blob) {
    return response;
  }

  if (response.data instanceof Blob) {
    return response.data;
  }

  if (typeof response.blob === "function") {
    return await response.blob();
  }

  if (response.body instanceof Blob) {
    return response.body;
  }

  return null;
}

/**
 * Dispara la descarga de un archivo binario en el navegador.
 */
function triggerBlobDownload(blob, filename) {
  if (!blob) return;

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.URL.revokeObjectURL(url);
}

/**
 * Página de listado de ventas conectada al backend real.
 *
 * Funcionalidades cerradas en esta fase:
 * - filtros reales
 * - consumo de API real
 * - descarga de reportes Excel / PDF
 * - eliminación de mocks del listado
 */
export default function ListSales() {
  // =========================
  // ESTADOS DE FILTROS
  // =========================
  const [invoiceFilter, setInvoiceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [pharmacistFilter, setPharmacistFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // =========================
  // ESTADOS DE DATOS / UI
  // =========================
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reportError, setReportError] = useState("");
  const [downloadingReport, setDownloadingReport] = useState(false);

  /**
   * Query consolidada para consumir el backend.
   *
   * Se memoiza para evitar reconstrucciones innecesarias.
   */
  const query = useMemo(() => {
    return {
      invoice_number: invoiceFilter.trim(),
      sale_date: dateFilter.trim(),
      date_from: dateFromFilter.trim(),
      date_to: dateToFilter.trim(),
      customer: customerFilter.trim(),
      seller: pharmacistFilter.trim(),
      status: statusFilter.trim(),
    };
  }, [
    invoiceFilter,
    dateFilter,
    dateFromFilter,
    dateToFilter,
    customerFilter,
    pharmacistFilter,
    statusFilter,
  ]);

  /**
   * Carga real del listado desde backend.
   */
  const loadSales = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await fetchSalesList(query);
      const rows = mapSalesListResponse(response);
      setSales(rows);
    } catch (error) {
      setLoadError(
        error?.error?.message || "No se pudieron cargar las ventas."
      );
      setSales([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  /**
   * Carga inicial y recarga automática al cambiar filtros.
   */
  useEffect(() => {
    loadSales();
  }, [loadSales]);

  /**
   * Descarga de reporte real.
   */
  const handleDownloadReport = async (format) => {
    setDownloadingReport(true);
    setReportError("");

    try {
      const response = await downloadSalesReport(query, format);
      const blob = await extractBlobPayload(response);

      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
      const extension = format === "excel" ? "xlsx" : "pdf";

      triggerBlobDownload(blob, `reporte_ventas_${timestamp}.${extension}`);
    } catch (error) {
      setReportError(
        error?.error?.message || "No se pudo generar el reporte."
      );
    } finally {
      setDownloadingReport(false);
    }
  };

  /**
   * Limpia todos los filtros y recarga la consulta.
   */
  const handleClearFilters = () => {
    setInvoiceFilter("");
    setDateFilter("");
    setDateFromFilter("");
    setDateToFilter("");
    setCustomerFilter("");
    setPharmacistFilter("");
    setStatusFilter("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-label">
      <div className="w-full max-w-6xl space-y-6">
        {/* Encabezado */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-label text-tittles">
            Ventas
          </h1>
          <p className="text-sm text-label/80 mt-1">
            Consulta, filtra y exporta el historial de ventas registrado.
          </p>
        </div>

        {/* Acciones superiores */}
        <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/">
              <Button variant="secondary" size="sm">
                Volver
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => handleDownloadReport("excel")}
              disabled={downloadingReport}
            >
              Exportar Excel
            </Button>

            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => handleDownloadReport("pdf")}
              disabled={downloadingReport}
            >
              Exportar PDF
            </Button>

            <Link to="/sales/factura-electronica">
              <Button variant="primary" size="sm">
                Nueva venta
              </Button>
            </Link>
          </div>
        </div>

        {/* Filtros */}
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
              Fecha exacta
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

          <Input
            label="Cliente"
            placeholder="Nombre del cliente"
            name="customer"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            wrapperClassName="w-full min-w-0"
          />

          <Input
            label="Farmaceuta"
            placeholder="Nombre del farmaceuta"
            name="pharmacist"
            value={pharmacistFilter}
            onChange={(e) => setPharmacistFilter(e.target.value)}
            wrapperClassName="w-full min-w-0"
          />

          <Select
            label="Estado de la venta"
            name="saleStatus"
            options={SALE_STATUS_OPTIONS}
            placeholder="Todos"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            wrapperClassName="w-full min-w-0"
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="w-full min-w-0">
              <label className="block mb-1 text-label font-body text-mostsmall">
                Desde
              </label>
              <input
                type="date"
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
                className="
                  relative w-full h-10 rounded-md border border-border-strong px-4
                  text-label font-body text-small
                  focus:outline-none focus:ring-1 focus:ring-border focus:border-border
                  hover:bg-surface/50 cursor-pointer
                "
              />
            </div>

            <div className="w-full min-w-0">
              <label className="block mb-1 text-label font-body text-mostsmall">
                Hasta
              </label>
              <input
                type="date"
                value={dateToFilter}
                onChange={(e) => setDateToFilter(e.target.value)}
                className="
                  relative w-full h-10 rounded-md border border-border-strong px-4
                  text-label font-body text-small
                  focus:outline-none focus:ring-1 focus:ring-border focus:border-border
                  hover:bg-surface/50 cursor-pointer
                "
              />
            </div>
          </div>
        </div>

        {/* Mensajes de estado */}
        {loadError ? (
          <div
            className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {loadError}
          </div>
        ) : null}

        {reportError ? (
          <div
            className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {reportError}
          </div>
        ) : null}

        {/* Indicador de carga */}
        {loading ? (
          <div className="rounded-2xl bg-white/70 p-8 text-center shadow-xl backdrop-blur-md">
            <p className="text-label/80">Cargando ventas...</p>
          </div>
        ) : (
          <DataTableSales
            key={`${invoiceFilter}|${dateFilter}|${dateFromFilter}|${dateToFilter}|${customerFilter}|${pharmacistFilter}|${statusFilter}`}
            data={sales}
            columns={SalesColumns}
          />
        )}

        {/* Estado vacío */}
        {!loading && !loadError && sales.length === 0 ? (
          <div className="rounded-2xl bg-white/70 p-8 text-center shadow-xl backdrop-blur-md">
            <p className="text-label/80">
              No se encontraron ventas con los filtros aplicados.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}