import DataTableCartShop from "../components/DataTableCartShop"
import { UserColumns } from "../table/UserColumns"
import { cartshops } from "@/data/cartshop/cartshops"
import { Button } from "@/shared/components"
import { Link } from "react-router-dom"

export default function ListCartShopPage() {

  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-4 text-center pb-4">
        Carritos de compra
      </h1>

      <div className="flex flex-wrap items-center justify-end gap-2 pb-6">
          
          <Button variant="secondary" size="sm" type="button">
            Exportar en Excel
          </Button>
          <Button variant="primary" size="sm" type="button">
            Exportar en PDF
          </Button>
        </div>     

      <DataTableCartShop
        data={cartshops}
        columns={UserColumns}
      />

    </div>
  )
}
