import { Link } from "react-router-dom"
import { DataTableUser } from "@/features/users"
import { UserColumns } from "../table/UserColumns"
import { users } from "@/data/user/users"
import { Button } from "@/shared/components"
import { useState } from "react"
import ReportConfigModal from "../reports/components/ReportConfigModal"

export default function ListUserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reportFormat, setReportFormat] = useState("pdf")

  const handleOpenReportModal = (format) => {
    setReportFormat(format)
    setIsModalOpen(true)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-label text-tittles">
        Gestion de usuarios
      </h1>

      <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <Link to="/">
            <Button variant="secondary" size="sm">
              Volver
            </Button>
          </Link>

        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 mt-12">
          <Link to="/accounts/datos-basicos">
            <Button variant="primary" size="sm">
              Crear usuario
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => handleOpenReportModal()}
          >
            Generar Reporte
          </Button>
          {/* <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => handleOpenReportModal("pdf")}
          >
            Exportar en PDF
          </Button> */}
        </div>
      </div>

      <DataTableUser
        data={users}
        columns={UserColumns}
      />

      {isModalOpen && (
        <ReportConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialFormat={reportFormat}
          usersSource={users}
        />
      )}

    </div>
  )
}
