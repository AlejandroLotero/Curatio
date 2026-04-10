import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Button, Select } from "@/shared/components"
// Importamos Lucide solo para el icono de búsqueda y flechas internas si deseas, 
// pero mantendremos tus botones.
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { getStatusCartTypes } from "../services/selectService";

export default function DataTable({ data, columns }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5
  })
  //prueba
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")

  const [statusCartTypes, setStatusCartTypes] = useState([]);

  useEffect(() => {
    getStatusCartTypes().then(setStatusCartTypes);
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, pagination, columnFilters },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
  })

  return (
    <div className="space-y-4">
      {/* ================== TOOLBAR ================== */}
      <div className="flex items-center justify-between gap-4 ">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 pr-3 py-2 border rounded-lg w-64 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-amber-400/50 outline-none transition-all"
          />
        </div>

        <div className="flex items-center ">
          <Select
            className="relative   w-4 h-4 text-gray-400"
            name="statuCartTypes"
            options={statusCartTypes}
            placeholder="Todos los Estados"
            wrapperClassName="w-[320px]"
            onChange={(e) => {
              const selectedId = e.target.value;

              // Mapeamos el ID del JSON al texto que tienes en cartshops
              const filterMap = {
                ACTIVE: "Activo",
                CONFIRMED: "Completado",
                CANCELLED: "Cancelado",
              };

              const filterValue = filterMap[selectedId] || "";

              // Usamos "state" porque así se llama en tu UserColumns accessorKey
              table
                .getColumn("state")
                ?.setFilterValue(filterValue === "" ? undefined : filterValue);
            }}
          />
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border rounded-lg px-2 py-2 bg-white/50 backdrop-blur-sm outline-none"
        >
          {[5, 7, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} filas
            </option>
          ))}
        </select>
      </div>

      {/* ================== TABLA CON EFECTO GLASS ================== */}
      <div className="overflow-x-auto border rounded-xl shadow-sm bg-white/30 backdrop-blur-md">
        <table className="w-full border-collapse">
          <thead className="bg-white/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-4 text-left border-b border-gray-200/50 font-semibold text-label"
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
                className="hover:bg-green-900/40 transition-colors duration-150"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-4 border-b border-gray-200/50 text-label"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================== FOOTER  ================== */}
      <div className="flex flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-center text-sm font-medium text-label sm:text-left">
          Mostrando {table.getRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} registros
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="mr-1 h-4 w-4" />
            <span className="sm:hidden">Ini</span>
            <span className="hidden sm:inline">Inicio</span>
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            <span className="sm:hidden">Ant</span>
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          <span className="rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-xs font-medium sm:px-4 sm:text-sm">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>

          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sm:hidden">Sig</span>
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>

          <Button
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sm:hidden">Fin</span>
            <span className="hidden sm:inline">Final</span>
            <ChevronsRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ================== IR A PÁGINA ================== */}
      <div className="flex flex-wrap items-center justify-center gap-2 pl-2 text-sm text-label sm:justify-start">
        <span>Ir a página:</span>
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="w-16 rounded-lg border bg-white/50 px-2 py-1 backdrop-blur-sm outline-none focus:ring-1"
        />
      </div>
    </div>
  );
}