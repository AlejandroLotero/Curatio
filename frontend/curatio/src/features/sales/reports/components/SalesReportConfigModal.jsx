import { useState } from "react";
import { Button, Select } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";
import { salesReportFields } from "../config/salesReportFields";
import { generateSalesReport } from "../services/generateSalesReport";

export default function SalesReportConfigModal({
  isOpen,
  onClose,
  salesAll,
  salesFiltered,
}) {
  const [format, setFormat] = useState("pdf");
  const [scope, setScope] = useState("filtered");
  const [selectedFields, setSelectedFields] = useState(() =>
    salesReportFields.filter((f) => f.default)
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

  const handleGenerateReport = () => {
    generateSalesReport({
      format,
      selectedFields,
      scope,
      salesAll,
      salesFiltered,
    });
    onClose();
  };

  const scopeLabel =
    scope === "all"
      ? `Todos los registros (${salesAll?.length ?? 0})`
      : `Resultado de filtros actuales (${salesFiltered?.length ?? 0})`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white/50 backdrop-blur-sm outline-none focus:ring-1 rounded-lg p-6 w-full max-w-[400px] text-left text-label max-h-[90vh] overflow-y-auto">
        <h2 className="mb-6 text-xl font-semibold text-label">
          Generar reporte de ventas
        </h2>

        <p className="mb-4 text-sm text-label/80">{scopeLabel}</p>

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
          <Select
            label="Alcance del reporte"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            options={[
              { label: "Ventas según filtros actuales", value: "filtered" },
              { label: "Todas las ventas (listado completo)", value: "all" },
            ]}
          />
        </div>

        <div className="mb-4">
          <p className="mb-2 font-medium">Campos del reporte</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {salesReportFields.map((field) => {
              const checked = selectedFields.some((f) => f.key === field.key);
              return (
                <Checkbox
                  key={field.key}
                  id={`sale-report-${field.key}`}
                  name={field.key}
                  label={field.label}
                  checked={checked}
                  onChange={() => handleFieldToggle(field)}
                />
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGenerateReport}>
            Generar reporte
          </Button>
        </div>
      </div>
    </div>
  );
}
