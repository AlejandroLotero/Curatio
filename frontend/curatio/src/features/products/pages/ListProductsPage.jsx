import  DataTable  from "../components/DataTable"
import { ProductColumns } from "../table/ProductColumns"
import { listProducts } from "@/data/product/listProducts"
import { Button } from "@/shared/components"
import Select from "@/shared/components/Select"
import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react"
import ProductReportConfigModal from "../reports/components/ProductReportConfigModal"


export default function ListProductsPage() {
  const navigate = useNavigate()
  const [filterVia, setFilterVia] = useState("")
  const [filterEstado, setFilterEstado] = useState("")
  const [filterLaboratorio, setFilterLaboratorio] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [pageSize, setPageSize] = useState(5)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Obtener opciones únicas para los filtros
  const viasAdministracion = useMemo(() => {
    const vias = [...new Set(listProducts.map(p => p.administration_guide))];
    return vias.map((via) => ({ id: via, label: via }));
  }, []);

  const estados = useMemo(() => {
    const est = [...new Set(listProducts.map(p => p.state))];
    return est.map((estado) => ({ id: estado, label: estado }));
  }, []);

  const laboratorios = useMemo(() => {
    const labs = [...new Set(listProducts.map(p => p.laboratory))];
    return labs.map((lab) => ({ id: lab, label: lab }));
  }, []);

  // Filtrar productos según los filtros seleccionados
  const filteredProducts = useMemo(() => {
    return listProducts.filter(product => {
      const matchVia = !filterVia || product.administration_guide === filterVia;
      const matchEstado = !filterEstado || product.state === filterEstado;
      const matchLaboratorio = !filterLaboratorio || product.laboratory === filterLaboratorio;
      return matchVia && matchEstado && matchLaboratorio;
    });
  }, [filterVia, filterEstado, filterLaboratorio])

  const handleCreateProduct = () => {
    navigate("/products")
  }

  return (
    <div className="p-6">

      <h1 className="text-5xl font-bold text-center mb-6 text-label" style={{ fontFamily: "var(--font-body)" }}>
        Gestion de Medicamentos 
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-2 bg-gray-900 text-gray-50"
          />
          
          <Select
            label=""
            options={viasAdministracion}
            placeholder="Vía de administración"
            value={filterVia}
            onChange={(e) => setFilterVia(e.target.value)}
            wrapperClassName="min-w-fit"
          />
          <Select
            label=""
            options={estados}
            placeholder="Estado"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            wrapperClassName="min-w-fit"
          />
          <Select
            label=""
            options={laboratorios}
            placeholder="Laboratorio"
            value={filterLaboratorio}
            onChange={(e) => setFilterLaboratorio(e.target.value)}
            wrapperClassName="min-w-fit"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            onClick={handleCreateProduct}
            disabled={false}
          >
            Crear Medicamento
          </Button>
          <Button
            size="sm"
            onClick={() => setIsModalOpen(true)}
            disabled={false}
          >
            Generar Reporte
          </Button>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded px-2 py-2 bg-gray-900 text-gray-50"
          >
            {[5, 7, 10, 20, 50].map(size => (
              <option key={size} value={size}>
                {size} filas
              </option>
            ))}
          </select>
        </div>
      </div>

      <DataTable
        data={listProducts}
        columns={ProductColumns}
        globalFilter={searchTerm}
        onGlobalFilterChange={setSearchTerm}
        pageSize={pageSize}
      />

      <ProductReportConfigModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  )
}