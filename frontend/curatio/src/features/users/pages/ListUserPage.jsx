import { Link } from "react-router-dom"
import { DataTableUser } from "@/features/users"
import { UserColumns } from "../table/UserColumns"
import { users } from "@/data/user/users"
import { Button } from "@/shared/components"

export default function ListUserPage() {

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
          <Button variant="secondary" size="sm" type="button">
            Exportar en Excel
          </Button>
          <Button variant="secondary" size="sm" type="button">
            Exportar en PDF
          </Button>
        </div>
      </div>

      <DataTableUser
        data={users}
        columns={UserColumns}
      />

    </div>
  )
}
