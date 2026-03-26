import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@/shared/components";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import DataTableSales from "./DataTableSales";
import { SalesColumns } from "../table/SalesColumns";
import { mockSales } from "@/data/sales/salesMock";
import { getStateSaleTypes } from "../services/selectServices";
import SalesReportConfigModal from "../reports/components/SalesReportConfigModal";

function normalize(str) {
  return (str ?? "").toString().toLowerCase().trim();
}

/**
 * Listado de ventas con filtros en cliente (sin backend).
 * Filtros: número de factura, fecha, cliente, farmaceuta, estado.
 */
export default function ListSales() {
  const [invoiceFilter, setInvoiceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [pharmacistFilter, setPharmacistFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stateSaleTypes, setStateSaleTypes] = useState([]);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    getStateSaleTypes().then(setStateSaleTypes);
  }, []);

  const filteredRows = useMemo(() => {
    return mockSales.filter((row) => {
      if (invoiceFilter) {
        const q = normalize(invoiceFilter);
        if (!normalize(row.invoiceNumber).includes(q)) return false;
      }
      if (dateFilter && row.saleDate !== dateFilter) return false;
      if (customerFilter) {
        const q = normalize(customerFilter);
        if (!normalize(row.customer).includes(q)) return false;
      }
      if (pharmacistFilter) {
        const q = normalize(pharmacistFilter);
        if (!normalize(row.pharmacist).includes(q)) return false;
      }
      if (statusFilter && row.statusId !== statusFilter) return false;
      return true;
    });
  }, [
    invoiceFilter,
    dateFilter,
    customerFilter,
    pharmacistFilter,
    statusFilter,
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-label">
      <div className="w-full max-w-6xl space-y-6">
        <div className="mb-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-label text-tittles">
              Ventas
            </h2>
            <Link to="/">
              <Button variant="secondary" size="sm">
                Volver
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => setIsReportOpen(true)}
            >
              Generar reporte
            </Button>
            <Link to="/sales/factura-electronica">
              <Button variant="primary" size="sm">
                Ver recibo / factura
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <Input
            label="Número de factura"
            placeholder="Ej. FEV00001"
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
            options={stateSaleTypes}
            placeholder="Todos"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            wrapperClassName="w-full min-w-0"
          />
        </div>

        <DataTableSales
          key={`${invoiceFilter}|${dateFilter}|${customerFilter}|${pharmacistFilter}|${statusFilter}`}
          data={filteredRows}
          columns={SalesColumns}
        />

        <SalesReportConfigModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          salesAll={mockSales}
          salesFiltered={filteredRows}
        />
      </div>
    </div>
  );
}
