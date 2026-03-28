import { DataTableSuppliers } from "@/features/suppliers"
import { Button } from "@/shared/components"
import { Link } from "react-router-dom"
import { SuppliersColumns } from "../table/SuppliersColumns"
import {suppliers} from "../../../data/supplier/suppliers"
import { useState } from "react"
import ReportConfigModal from "../reports/components/ReportConfigModal"

export default function ListSupplierPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reportFormat, setReportFormat] = useState("pdf")

  const handleOpenReportModal = (format) => {
    setReportFormat(format)
    setIsModalOpen(true)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-label text-tittles mb-6">
        Gestion de proveedores
      </h1>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          {/* Barra de acciones alineada con la tabla */}
          <div className="mb-4 flex w-full flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:gap-3">
              <Link to="/">
                <Button variant="secondary" size="sm">
                  Volver
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              <Link to="/suppliers/datos-basicos">
                <Button variant="primary" size="sm">
                  Crear proveedor
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => handleOpenReportModal()}
              >
                Generar reporte
              </Button>
            </div>
          </div>

          {/* Tabla de proveedores */}
          <DataTableSuppliers data={suppliers} columns={SuppliersColumns} />
        </div>
      </div>

      {isModalOpen && (
        <ReportConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialFormat={reportFormat}
          usersSource={suppliers}
        />
      )}
    </div>
  );
}
