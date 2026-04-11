import { useMemo, useState } from "react";

import { cartShopReportFields } from "../config/userReportFields";
import { generateUserReport } from "../services/generateUserReport";

import { Button, Input, Select } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";

export default function ReportConfigModal({
  isOpen,
  onClose,
  cartshops = [],
  filters = {},
}) {
  const [format, setFormat] = useState("pdf");
  const [scope, setScope] = useState("filtered");
  const [invoiceNumber, setInvoiceNumber] = useState(filters.invoice_number || "");
  const [date, setDate] = useState(filters.date || "");
  const [status, setStatus] = useState(filters.status || "");

  const [selectedFields, setSelectedFields] = useState(() =>
    cartShopReportFields.filter((f) => f.default)
  );

  if (!isOpen) return null;

  const handleFieldToggle = (field) => {
    const exists = selectedFields.find((f) => f.key === field.key);

    if (exists) {
      setSelectedFields(selectedFields.filter((f) => f.key !== field.key));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const filteredData = useMemo(() => {
    let rows = Array.isArray(cartshops) ? [...cartshops] : [];

    if (scope === "invoice" && invoiceNumber.trim()) {
      const q = invoiceNumber.trim().toLowerCase();
      rows = rows.filter((item) =>
        String(item.invoice_number || "").toLowerCase().includes(q)
      );
    }

    if (scope === "filtered") {
      if (invoiceNumber.trim()) {
        const q = invoiceNumber.trim().toLowerCase();
        rows = rows.filter((item) =>
          String(item.invoice_number || "").toLowerCase().includes(q)
        );
      }

      if (date.trim()) {
        rows = rows.filter((item) => String(item.date || "") === date.trim());
      }

      if (status.trim()) {
        rows = rows.filter((item) => String(item.state || "") === status.trim());
      }
    }

    return rows;
  }, [cartshops, scope, invoiceNumber, date, status]);

  const handleGenerateReport = () => {
    generateUserReport({
      format,
      selectedFields,
      data: filteredData,
      fileName: "reporte-carritos",
      reportTitle: "Reporte de Carritos",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold">
          Generar reporte de Carritos
        </h2>

        <div className="mb-4">
          <Select
            label="Formato del reporte"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            options={[
              { label: "PDF", value: "pdf" },
              { label: "Excel", value: "excel" },
            ]}
          />
        </div>

        <div className="mb-4">
          <p className="mb-2 font-medium">Campos del reporte</p>

          <div className="grid grid-cols-2 gap-2">
            {cartShopReportFields.map((field) => {
              const checked = selectedFields.some((f) => f.key === field.key);

              return (
                <Checkbox
                  key={field.key}
                  id={field.key}
                  name={field.key}
                  label={field.label}
                  checked={checked}
                  onChange={() => handleFieldToggle(field)}
                />
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <Select
            label="Alcance del reporte"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            options={[
              { label: "Todos los carritos cargados", value: "all" },
              { label: "Filtros actuales", value: "filtered" },
              { label: "Filtrar por factura", value: "invoice" },
            ]}
          />
        </div>

        {(scope === "filtered" || scope === "invoice") && (
          <div className="space-y-4">
            <Input
              label="Número de factura"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="Ingrese número de factura"
            />

            {scope === "filtered" ? (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>

                <Select
                  label="Estado"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  options={[
                    { label: "Activo", value: "Activo" },
                    { label: "Completado", value: "Completado" },
                    { label: "Cancelado", value: "Cancelado" },
                  ]}
                  placeholder="Todos"
                />
              </>
            ) : null}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={handleGenerateReport}
            disabled={!selectedFields.length || !filteredData.length}
          >
            Generar reporte
          </Button>
        </div>
      </div>
    </div>
  );
}