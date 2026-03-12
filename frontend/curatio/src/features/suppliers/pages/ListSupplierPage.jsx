import DataTable from "@/shared/components/DataTable"
import { SuppliersColumns } from "../table/SuppliersColumns"
import suppliers from "../../../data/supplier/suppliers"

export default function ListSupplierPage() {

  return (
    <div className="p-6">

      <h1 className="text-xl font-semibold mb-4">
        Proveedores
      </h1>

      <DataTable
        data={suppliers}
        columns={SuppliersColumns}
      />
    </div>
  )
}
