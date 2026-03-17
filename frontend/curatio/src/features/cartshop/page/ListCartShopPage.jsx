import DataTableCartShop from "../components/DataTableCartShop"
import { UserColumns } from "../table/UserColumns"
import { cartshops } from "@/data/cartshop/cartshops"

export default function ListCartShopPage() {

  return (
    <div className="p-6">

      <h1 className="text-xl font-semibold mb-4 text-center ">
        Carritos de compra
      </h1>

     

      <DataTableCartShop
        data={cartshops}
        columns={UserColumns}
      />

    </div>
  )
}
