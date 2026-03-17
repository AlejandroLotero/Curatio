// Hooks y utilidades principales de TanStack Table
import {
  useReactTable,          // Hook que crea la instancia de la tabla
  getCoreRowModel,        // Modelo base de filas (sin filtros ni paginación)
  flexRender,             // Permite renderizar contenido dinámico de columnas
  getPaginationRowModel,  // Modelo de filas con paginación
  getFilteredRowModel     // Modelo de filas filtradas
} from "@tanstack/react-table"

import Select from "@/shared/components/Select"
// Hook de React para manejar estado
import { useState } from "react"

// Botón reutilizable del sistema de componentes
import { Button } from "@/shared/components"

// Componente reutilizable de tabla
// Recibe:
// - data: datos que se mostrarán
// - columns: configuración de columnas
export default function DataTableUser({ data, columns }) {

  // ================== ESTADO DE PAGINACIÓN ==================
  // pageIndex → página actual
  // pageSize → cantidad de filas por página
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5
  })

  // ================== ESTADO DEL FILTRO GLOBAL ==================
  // Se usa para el buscador de la tabla
  const [globalFilter, setGlobalFilter] = useState("")

  // ================== CONFIGURACIÓN DE LA TABLA ==================
  const table = useReactTable({

    // Datos que se mostrarán
    data,

    // Definición de columnas
    columns,

    // Estado controlado de la tabla
    state: {
      globalFilter,
      pagination
    },

    // Función que se ejecuta cuando cambia la paginación
    onPaginationChange: setPagination,

    // Función que se ejecuta cuando cambia el filtro global
    onGlobalFilterChange: setGlobalFilter,

    // Modelo base de filas
    getCoreRowModel: getCoreRowModel(),

    // Modelo con filtrado aplicado
    getFilteredRowModel: getFilteredRowModel(),

    // Modelo con paginación aplicada
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-4">

      {/* ================== TOOLBAR ================== */}
      {/* Barra superior con buscador y selector de filas */}

      <div className="flex items-center justify-between gap-4">

        {/* ================== BUSCADOR ================== */}
        {/* Filtra todas las columnas de la tabla */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="border rounded px-3 py-2 w-258 text-black"
          />


          <div className="w-258 flex justify-between">
            
            {/* Filtro por Rol */}
            <select
              className="border rounded px-3 py-2 w-70 text-black bg-white"
              defaultValue=""
            >
              <option value="" disabled>
                Filtrar por rol
              </option>
              <option value="Admin">Admin</option>
              <option value="Farmaceuta">Farmaceuta</option>
              <option value="Proveedor">Proveedor</option>
              <option value="Cliente">Cliente</option>
            </select>

            {/* Filtro por Estado */}
            <select
              className="border rounded px-3 py-2 w-70 text-black bg-white"
              defaultValue=""
            >
              <option value="" disabled>
                Filtrar por estado
              </option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>

          {/* Buscador por Número de documento (funcional) */}
          <input
            type="text"
            placeholder="Buscar por número de documento..."
            className="border rounded px-3 py-2 w-70 text-black"
            onChange={(e) =>
              table.getColumn("document")?.setFilterValue(e.target.value || undefined)
            }
          />
          </div>


        </div>


        {/* ================== SELECTOR DE FILAS ================== */}
        {/* Permite cambiar cuántas filas se muestran por página */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border rounded px-2 py-2 text-black"
        >
          {[5, 7, 10, 20, 50].map(size => (
            <option key={size} value={size}>
              {size} filas
            </option>
          ))}
        </select>

      </div>

      {/* ================== TABLA ================== */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full border-collapse">

          {/* ================== CABECERA ================== */}
          <thead className="bg-gray-100/60">

            {/* TanStack agrupa cabeceras automáticamente */}
            {table.getHeaderGroups().map(headerGroup => (

              <tr key={headerGroup.id}>

                {headerGroup.headers.map(header => (

                  <th
                    key={header.id}
                    className="p-3 text-left border-b border-r border-gray-200 last:border-r-0 align-middle"
                  >

                    {/* 
                      flexRender permite renderizar:
                      - texto
                      - JSX
                      - funciones
                      definidos en columnDef.header
                    */}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                  </th>

                ))}
              </tr>

            ))}
          </thead>

          {/* ================== CUERPO DE LA TABLA ================== */}
          <tbody>

            {/* Filas generadas por TanStack */}
            {table.getRowModel().rows.map(row => (

              <tr key={row.id} className="hover:bg-primarybtnbg/30
              transition-colors duration-700 
              bg-white/80 
              text-label 
              text-left last:[&_td]:border-b-0">

                {/* Celdas visibles de cada fila */}
                {row.getVisibleCells().map(cell => (

                  <td key={cell.id} className="p-3 border-b border-r border-gray-200 last:border-r-0 text-left align-middle">

                    {/* Render dinámico del contenido de la celda */}
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>
      </div>

      {/* ================== FOOTER ================== */}
      <div className="flex items-center justify-between">

        {/* ================== INFORMACIÓN ================== */}
        {/* Cantidad de registros visibles */}
        <span className="text-sm text-black/80">
          Mostrando {table.getRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} registros
        </span>

        {/* ================== CONTROLES DE PAGINACIÓN ================== */}
        <div className="flex items-center gap-2">

          {/* Ir a la primera página */}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            Inicio
          </Button>

          {/* Página anterior */}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>

          {/* Información de página actual */}
          <span className="text-sm px-2 text-black bg-white/80 rounded">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>

          {/* Página siguiente */}
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>

          {/* Ir a la última página */}
          <Button
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Final
          </Button>

        </div>

      </div>

      {/* ================== IR A PÁGINA ================== */}
      {/* Permite navegar directamente a una página específica */}
      <div className="flex items-center gap-2 text-sm text-black/80">

        <span>Ir a página:</span>

        <input
          type="number"

          // Página actual (se muestra +1 porque el índice empieza en 0)
          defaultValue={table.getState().pagination.pageIndex + 1}

          onChange={(e) => {

            // Convierte el número ingresado en índice de página
            const page = e.target.value ? Number(e.target.value) - 1 : 0

            // Cambia la página
            table.setPageIndex(page)
          }}

          className="border rounded px-2 py-1 w-16 text-center"
        />

      </div>

      </div>
    </div>
  )
}
