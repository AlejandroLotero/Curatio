import DataTable from "../../components/DataTable";
import { ProductColumns } from "../../table/ProductColumns";
import { Button } from "@/shared/components";
import Select from "@/shared/components/Select";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductReportConfigModal from "../../reports/components/ProductReportConfigModal";
import { getMedications } from "@/lib/http/medications";
import { adaptMedicationToListItem } from "@/lib/adapters/medicationAdapter";
import {
  getViasAdministracion,
  getEstadosMedicamento,
  getLaboratorios,
} from "../../services/selectServices";

export default function ListProductsPage() {
  const navigate = useNavigate();

  // Estados para los filtros de la tabla
  const [filterVia, setFilterVia] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [filterLaboratorio, setFilterLaboratorio] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para almacenar los datos cargados desde la API
  const [products, setProducts] = useState([]);
  const [viasAdministracion, setViasAdministracion] = useState([]);
  const [estados, setEstados] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carga los catalogos de opciones al montar el componente
  useEffect(() => {
    getViasAdministracion().then(setViasAdministracion);
    getEstadosMedicamento().then(setEstados);
    getLaboratorios().then(setLaboratorios);
  }, []);

  // Carga los medicamentos desde la API cuando cambian los filtros o termino de busqueda
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const response = await getMedications({
          search: searchTerm,
          administrationRoute: filterVia,
          laboratory: filterLaboratorio,
          status: filterEstado,
          page: 1,
          pageSize: 200,
        });

        const items = (response?.data?.results ?? []).map(adaptMedicationToListItem);
        setProducts(items);
      } catch (error) {
        console.error("Error loading medications:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchTerm, filterVia, filterEstado, filterLaboratorio]);

  // Navega a la pagina de creacion de nuevo producto
  const handleCreateProduct = () => {
    navigate("/products");
  };

  return (
    <div className="p-6">
      <h1
        className="text-5xl font-bold text-center mb-6 text-label"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Gestion de Productos
      </h1>

      {/* Controles de filtrado y busqueda */}
      <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
        {/* Filtros de medicamentos */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Input de busqueda por nombre */}
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-2 bg-gray-900 text-gray-50"
          />

          {/* Filtro por via de administracion */}
          <Select
            label=""
            options={viasAdministracion}
            placeholder="Vía de administración"
            value={filterVia}
            onChange={(e) => setFilterVia(e.target.value)}
            wrapperClassName="min-w-fit"
          />

          {/* Filtro por estado del medicamento */}
          <Select
            label=""
            options={estados}
            placeholder="Estado"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            wrapperClassName="min-w-fit"
          />

          {/* Filtro por laboratorio */}
          <Select
            label=""
            options={laboratorios}
            placeholder="Laboratorio"
            value={filterLaboratorio}
            onChange={(e) => setFilterLaboratorio(e.target.value)}
            wrapperClassName="min-w-fit"
          />
        </div>

        {/* Botones de acciones y selector de paginacion */}
        <div className="flex gap-2 items-center">
          {/* Boton para crear nuevo producto */}
          <Button size="sm" onClick={handleCreateProduct}>
            Crear Producto
          </Button>

          {/* Boton para generar reporte */}
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            Generar Reporte
          </Button>

          {/* Selector del tamanio de pagina */}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded px-2 py-2 bg-gray-900 text-gray-50"
          >
            {[5, 7, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} filas
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Indicador de carga */}
      {loading && <div className="mb-4 text-label">Loading medications...</div>}

      {/* Tabla de medicamentos con paginacion y filtros */}
      <DataTable
        data={products}
        columns={ProductColumns}
        globalFilter={searchTerm}
        onGlobalFilterChange={setSearchTerm}
        pageSize={pageSize}
        meta={{
          statuses: estados,
          /* Callback para actualizar el estado de un medicamento cuando cambia */
          onStatusChanged: (productId, newStatus) => {
            setProducts((prev) =>
              prev.map((item) =>
                item.id === productId
                  ? {
                      ...item,
                      state: newStatus.label,
                      stateId: newStatus.id,
                    }
                  : item
              )
            );
          },
        }}
      />

      {/* Modal para generar reporte de medicamentos */}
      <ProductReportConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}