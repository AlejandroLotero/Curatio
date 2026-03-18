// // Hooks y utilidades principales de TanStack Table
import {
  useReactTable,          // Hook que crea la instancia de la tabla
  getCoreRowModel,        // Modelo base de filas (sin filtros ni paginación)
  flexRender,             // Permite renderizar contenido dinámico de columnas
  getPaginationRowModel,  // Modelo de filas con paginación
  getFilteredRowModel     // Modelo de filas filtradas
} from "@tanstack/react-table"

// Hook de React para manejar estado
import { useState } from "react"

// Botón reutilizable del sistema de componentes
import { Button } from "@/shared/components"

// Componente reutilizable de tabla
// Recibe:
// - data: datos que se mostrarán
// - columns: configuración de columnas
// - globalFilter: (opcional) filtro global controlado desde fuera
// - onGlobalFilterChange: (opcional) callback cuando cambia el filtro
// - pageSize: (opcional) tamaño de página controlado desde fuera
export default function DataTable({ data, columns, globalFilter: externalGlobalFilter, onGlobalFilterChange, pageSize: externalPageSize }) {

  // ================== ESTADO DE PAGINACIÓN ==================
  // pageIndex → página actual
  // pageSize → cantidad de filas por página
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: externalPageSize || 5
  })

  // ================== ESTADO DEL FILTRO GLOBAL ==================
  // Se usa para el buscador de la tabla
  const [localGlobalFilter, setLocalGlobalFilter] = useState("")
  
  // Usa el filtro externo si se proporciona, sino usa el local
  const globalFilter = externalGlobalFilter !== undefined ? externalGlobalFilter : localGlobalFilter
  const setGlobalFilter = onGlobalFilterChange || setLocalGlobalFilter

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
    <div className="space-y-4">

      {/* ================== TOOLBAR ================== */}
      {/* Barra superior con buscador y selector de filas (solo si no se controlan desde fuera) */}

      {externalGlobalFilter === undefined && (
      <div className="flex items-center justify-between gap-4">

        {/* ================== BUSCADOR ================== */}
        {/* Filtra todas las columnas de la tabla */}
        <input
          type="text"
          placeholder="Buscar..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-10 pr-3 py-2 border rounded-lg w-64 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-amber-400/50 outline-none transition-all text-gray-200"
        />

        {/* ================== SELECTOR DE FILAS ================== */}
        {/* Permite cambiar cuántas filas se muestran por página */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border rounded px-2 py-2 bg-gray-900 text-gray-50"
        >
          {[5, 7, 10, 20, 50].map(size => (
            <option key={size} value={size}>
              {size} filas
            </option>
          ))}
        </select>

      </div>
      )}

      {/* ================== TABLA ================== */}
      <div className="overflow-x-auto border rounded-xl shadow-sm bg-white/30 backdrop-blur-md">
        <table className="w-full">

          {/* ================== CABECERA ================== */}
          <thead className="bg-white">

            {/* TanStack agrupa cabeceras automáticamente */}
            {table.getHeaderGroups().map(headerGroup => (

              <tr key={headerGroup.id}>

                {headerGroup.headers.map(header => (

                  <th
                    key={header.id}
                    className="p-3 border-b border-gray-500 text-gray-50 text-center font-semibold"
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

              <tr key={row.id} className="hover:bg-green-900/40 transition-colors duration-150">

                {/* Celdas visibles de cada fila */}
                {row.getVisibleCells().map(cell => (

                  <td key={cell.id} className="p-3 border-b border-gray-500 text-gray-50 text-center">

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
        <span className="text-sm text-label font-medium">
          Mostrando {table.getRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} registros
        </span>

        {/* ================== CONTROLES DE PAGINACIÓN ================== */}
        <div className="flex items-center gap-2 text-sm text-label pl-2">
          

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

          <span className="text-sm font-medium px-4 py-1 bg-white/50 rounded-full border border-gray-200">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
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
      {/* <div className="flex items-center gap-2 text-sm text-label pl-2"> 

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

          className="border rounded-lg px-2 py-1 w-16 bg-white/50 backdrop-blur-sm outline-none focus:ring-1"
        />

      </div> */}
       <div className="flex items-center gap-2 text-sm text-label pl-2">
        <span>Ir a página:</span>
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          className="border rounded-lg px-2 py-1 w-16 bg-white/50 backdrop-blur-sm outline-none focus:ring-1"
        />
      </div>
    </div>

  )
}
