import { DataTableSuppliers } from "@/features/suppliers"
import { Button } from "@/shared/components"
import { Link } from "react-router-dom"
import { SuppliersColumns } from "../table/SuppliersColumns"
import {suppliers} from "../../../data/supplier/suppliers"

export default function ListSupplierPage() {

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-4">

        {/* Header superior con título, botón Volver y acciones */}
        <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-black">
              Proveedores
            </h2>
            <Link to="/">
              <Button variant="secondary" size="sm">
                Volver
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Link to="/accounts/datos-basicos">
              <Button variant="primary" size="sm">
                Crear usuario
              </Button>
            </Link>
            <Button variant="secondary" size="sm" type="button">
              Exportar en Excel
            </Button>
            <Button variant="secondary" size="sm" type="button">
              Exportar en PDF
            </Button>
          </div>
        </div>

        {/* Tabla de proveedores (mismo ancho que el header) */}
        <DataTableSuppliers
          data={suppliers}
          columns={SuppliersColumns}
        />

      </div>
    </div>
  )
}
