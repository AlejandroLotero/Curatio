import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/shared/components";

export default function DataTableSales({ data, columns }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-4">
        <div className="flex items-center justify-end gap-4">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border rounded px-2 py-2 text-black"
          >
            {[5, 7, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} filas
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100/60">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 text-left border-b border-r border-gray-200 last:border-r-0 align-middle"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
                  className="hover:bg-primarybtnbg/30 transition-colors duration-700 bg-white/80 text-label text-left last:[&_td]:border-b-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-3 border-b border-r border-gray-200 last:border-r-0 text-left align-middle"
                    >
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

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-center text-sm text-black/80 sm:text-left">
            Mostrando {table.getRowModel().rows.length} de {data.length}{" "}
            registros
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sm:hidden">Ini</span>
              <span className="hidden sm:inline">Inicio</span>
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sm:hidden">Ant</span>
              <span className="hidden sm:inline">Anterior</span>
            </Button>
            <span className="rounded bg-white/80 px-2 text-xs text-black sm:text-sm">
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
            </Button>
            <Button
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sm:hidden">Fin</span>
              <span className="hidden sm:inline">Final</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-black/80 sm:justify-start">
          <span>Ir a página:</span>
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border px-2 py-1 text-center"
          />
        </div>
      </div>
    </div>
  );
}
