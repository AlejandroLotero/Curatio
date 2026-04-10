import { useCallback, useEffect, useMemo, useState } from "react"; // UseCallback para manejar el estado de la carga
import { DataTableSuppliers } from "@/features/suppliers";
import { Button } from "@/shared/components";
import { Link } from "react-router-dom";
import { buildSuppliersColumns } from "../table/SuppliersColumns";
import ReportConfigModal from "../reports/components/ReportConfigModal"; 
import {
  fetchSuppliersList,
  mapSuppliersResponseToRows,
  patchSupplierStatus,
} from "@/lib/http/suppliers"; // Funciones para obtener la lista de proveedores y actualizar el estado del proveedor

export default function ListSupplierPage() {
  const [suppliers, setSuppliers] = useState([]); // Estado para almacenar la lista de proveedores
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de la carga
  const [loadError, setLoadError] = useState(""); // Estado para manejar el error de la carga

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el estado de la modal de reporte
  const [reportFormat, setReportFormat] = useState("pdf"); // Estado para manejar el formato de reporte

  const reload = useCallback(async () => { // Función para recargar la lista de proveedores
    setLoadError(""); // Limpiar el error de la carga
    try {
      const res = await fetchSuppliersList();
      setSuppliers(mapSuppliersResponseToRows(res)); // Mapear la respuesta de la API a la lista de proveedores
    } catch (e) {
      setLoadError(e?.error?.message || "No se pudieron cargar los proveedores."); 
      setSuppliers([]);
    } finally {
      setLoading(false); // Cambiar el estado de la carga a false
    }
  }, []);

  useEffect(() => { // Efecto para recargar la lista de proveedores cuando se monta el componente
    reload(); // Recargar la lista de proveedores cuando se monta el componente
  }, [reload]); // Dependencia para recargar la lista de proveedores cuando se cambia el estado de la carga

  const columns = useMemo( 
    () =>
      buildSuppliersColumns({
        onStatusChange: async (row, isActive) => {
          try {
            await patchSupplierStatus(row.nit, isActive ? "Activo" : "Inactivo");
            await reload();
          } catch (e) {
            window.alert(e?.error?.message || "No se pudo actualizar el estado.");
            await reload();
          }
        },
      }),
    [reload]
  );

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
          {/* Barra de acciones: mismo patrón que productos (columna en móvil, fila desde sm) */}
          <div className="mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:gap-4">
            <Link to="/" className="block w-full sm:w-auto">
              <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                Volver
              </Button>
            </Link>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end md:gap-4">
              <Link to="/suppliers/datos-basicos" className="block w-full sm:w-auto">
                <Button variant="primary" size="sm" className="w-full sm:w-auto">
                  Crear proveedor
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                className="w-full sm:w-auto"
                onClick={() => handleOpenReportModal()}
              >
                Generar reporte
              </Button>
            </div>
          </div>

          {loadError && (
            <p className="text-sm text-red-600 dark:text-red-400 mb-2" role="alert">
              {loadError}
            </p>
          )}
          {loading ? (
            <p className="text-sm text-label/80">Cargando proveedores…</p>
          ) : (
            <DataTableSuppliers data={suppliers} columns={columns} />
          )}
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
