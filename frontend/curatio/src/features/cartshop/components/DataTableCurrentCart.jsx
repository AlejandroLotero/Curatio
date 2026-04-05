// =========================
// TABLA REUTILIZABLE DEL CARRITO ACTUAL
// =========================
//
// Responsabilidades:
// - renderizar la tabla del carrito actual
// - permitir búsqueda global
// - permitir paginación
// - mantener el mismo estilo visual del sistema
//
// - Solo sirve para ViewCartShopPage

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useState } from "react";

import { Button } from "@/shared/components";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

/**
 * DataTableCurrentCart
 * --------------------
 * Tabla reutilizable del carrito actual.
 *
 * @param {Object[]} data - items actuales del carrito
 * @param {Object[]} columns - columnas configuradas
 */
export default function DataTableCurrentCart({ data, columns }) {
  /**
   * Estado de paginación controlado.
   */
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  /**
   * Estado del filtro global.
   * Se usa para el buscador.
   */
  const [globalFilter, setGlobalFilter] = useState("");

  /**
   * Instancia principal de la tabla.
   */
  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
      pagination,
    },

    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* =========================
          TOOLBAR
         ========================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Buscador global */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Buscar medicamento..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="
              pl-10 pr-3 py-2
              border rounded-lg
              w-64
              bg-white/50
              backdrop-blur-sm
              focus:ring-2
              focus:ring-amber-400/50
              outline-none
              transition-all
            "
          />
        </div>

        {/* Selector de page size */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
          className="
            border rounded-lg px-2 py-2
            bg-white/50
            backdrop-blur-sm
            outline-none
          "
        >
          {[5, 7, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size} filas
            </option>
          ))}
        </select>
      </div>

      {/* =========================
          TABLA
         ========================= */}
      <div className="overflow-x-auto border rounded-xl shadow-sm bg-white/30 backdrop-blur-md">
        <table className="w-full border-collapse">
          <thead className="bg-white/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="
                      p-4
                      text-left
                      border-b
                      border-gray-200/50
                      font-semibold
                      text-label
                    "
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-green-900/20 transition-colors duration-150"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="
                      p-4
                      border-b
                      border-gray-200/50
                      text-label
                    "
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================
          FOOTER DE PAGINACIÓN
         ========================= */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-2">
        <span className="text-sm text-label font-medium">
          Mostrando {table.getRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} registros
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="w-4 h-4 mr-1" />
            Inicio
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>

          <span className="text-sm font-medium px-4 py-1 bg-white/50 rounded-full border border-gray-200">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>

          <Button
            size="sm"
            variant="primary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Final
            <ChevronsRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* =========================
          NAVEGACIÓN DIRECTA
         ========================= */}
      <div className="flex items-center gap-2 text-sm text-label pl-2">
        <span>Ir a página:</span>

        <input
          type="number"
          min="1"
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(event) => {
            const page = event.target.value
              ? Number(event.target.value) - 1
              : 0;

            table.setPageIndex(page);
          }}
          className="
            border rounded-lg px-2 py-1 w-16
            bg-white/50
            backdrop-blur-sm
            outline-none
            focus:ring-1
          "
        />
      </div>
    </div>
  );
}