import DataTableCartShop from "../components/DataTableCartShop"
import { UserColumns } from "../table/UserColumns"
import { cartshops } from "@/data/cartshop/cartshops"
import { Button } from "@/shared/components"
import { Link } from "react-router-dom"
import { useState } from "react"
import ReportConfigModal from "../reports/components/ReportConfigModal";

export default function ListCartShopPage() {

   const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-4 text-center pb-4">
        Carritos de compra
      </h1>

      <div className="flex flex-wrap items-center justify-end gap-2 pb-6">
          
        

       
        <Button 
          variant="primary"
          onClick={() => setIsReportModalOpen(true)}
        >
          Generar Reporte
        </Button>
     
        </div>     

      <DataTableCartShop
        data={cartshops}
        columns={UserColumns}
      />

      <ReportConfigModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

    </div>
  )
}
