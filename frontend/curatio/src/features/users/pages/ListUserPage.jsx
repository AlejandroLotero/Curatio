// import { Link } from "react-router-dom"
// import { DataTableUser } from "@/features/users"
// import { UserColumns } from "../table/UserColumns"
// import { users } from "@/data/user/users"
// import { Button } from "@/shared/components"
// import { useState } from "react"
// import ReportConfigModal from "../reports/components/ReportConfigModal"

// export default function ListUserPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [reportFormat, setReportFormat] = useState("pdf")

//   const handleOpenReportModal = (format) => {
//     setReportFormat(format)
//     setIsModalOpen(true)
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-center text-label text-tittles">
//         Gestion de usuarios
//       </h1>

//       <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex flex-col gap-3">
//           <Link to="/">
//             <Button variant="secondary" size="sm">
//               Volver
//             </Button>
//           </Link>

//         </div>
//         <div className="flex flex-wrap items-center justify-end gap-2 mt-12">
//           <Link to="/accounts/datos-basicos">
//             <Button variant="primary" size="sm">
//               Crear usuario
//             </Button>
//           </Link>
//           <Button
//             variant="secondary"
//             size="sm"
//             type="button"
//             onClick={() => handleOpenReportModal()}
//           >
//             Generar Reporte
//           </Button>
//           {/* <Button
//             variant="secondary"
//             size="sm"
//             type="button"
//             onClick={() => handleOpenReportModal("pdf")}
//           >
//             Exportar en PDF
//           </Button> */}
//         </div>
//       </div>

//       <DataTableUser
//         data={users}
//         columns={UserColumns}
//       />

//       {isModalOpen && (
//         <ReportConfigModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           initialFormat={reportFormat}
//           usersSource={users}
//         />
//       )}

//     </div>
//   )
// }

// Navegación
import { Link, useLocation } from "react-router-dom";

// Tabla reutilizable de usuarios
import { DataTableUser } from "@/features/users";

// Configuración de columnas
import { UserColumns } from "../table/UserColumns";

// Botones compartidos
import { Button } from "@/shared/components";

// Hooks de React
import { useEffect, useState } from "react";

// Modal de reportes
import ReportConfigModal from "../reports/components/ReportConfigModal";

// Servicio HTTP de usuarios
import { getUsers } from "@/lib/http/users";

// Adapter backend -> UI
import { adaptUsersList } from "@/lib/adapters/userAdapter";

/**
 * ListUserPage
 * ------------
 * Página de listado de usuarios conectada a backend real.
 *
 * Funcionalidades:
 * - búsqueda por nombre
 * - filtro por rol
 * - filtro por estado
 * - búsqueda por documento
 * - cambio de estado con switch
 */
export default function ListUserPage() {
  const location = useLocation();

  // Estado del modal de reportes
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formato inicial de reporte
  const [reportFormat, setReportFormat] = useState("pdf");

  // Fuente de datos real
  const [users, setUsers] = useState([]);

  // Estado de carga
  const [loading, setLoading] = useState(false);

  // Filtros reales contra backend
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [documentFilter, setDocumentFilter] = useState("");

  /**
   * Abre el modal de reportes.
   */
  const handleOpenReportModal = (format) => {
    setReportFormat(format);
    setIsModalOpen(true);
  };

  /**
   * Carga usuarios desde backend usando filtros actuales.
   */
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);

        const response = await getUsers({
          search,
          role,
          status: statusFilter,
          document: documentFilter,
          page: 1,
          pageSize: 200,
        });

        setUsers(adaptUsersList(response));
      } catch (error) {
        console.error("Error loading users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [search, role, statusFilter, documentFilter, location.key]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-label text-tittles mb-6">
        Gestion de usuarios
      </h1>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          {/* Barra superior */}
          <div className="mb-4 flex w-full flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:gap-3">
              <Link to="/">
                <Button variant="secondary" size="sm">
                  Volver
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
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
            </div>
          </div>

          {/* Loading */}
          {loading && <div className="mb-4 text-label">Loading users...</div>}

          {/* Tabla con filtros reales */}
          <DataTableUser
            data={users}
            columns={UserColumns}
            filters={{
              search,
              role,
              statusFilter,
              documentFilter,
            }}
            onFiltersChange={{
              setSearch,
              setRole,
              setStatusFilter,
              setDocumentFilter,
            }}
            meta={{
              onStatusChanged: (userId, nextValue) => {
                setUsers((prev) =>
                  prev.map((item) =>
                    item.id === userId
                      ? {
                          ...item,
                          isActive: nextValue,
                        }
                      : item
                  )
                );
              },
            }}
          />
        </div>
      </div>

      {/* Modal de reportes */}
      {isModalOpen && (
        <ReportConfigModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialFormat={reportFormat}
          usersSource={users}
        />
      )}
    </div>
  );
}