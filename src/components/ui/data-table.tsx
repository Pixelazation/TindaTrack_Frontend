"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  ChevronLeft,
  ChevronRight,
  // ChevronsLeft,
  // ChevronsRight,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from './button'
import { ComboBox } from './combo-box'
import { SearchInput } from './search-input'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filter: string
  setFilter: (value: string) => void
  page: number
  pageSize: number
  setPage: (value: number) => void
  setQuery: (value: string) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filter,
  setFilter,
  page,
  pageSize,
  setPage,
  setQuery
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <div className="flex items-center justify-between gap-8">
        <div className="flex flex-row grow items-center gap-2 py-4">
          <SearchInput setQuery={setQuery} />
          <ComboBox 
            options={columns.filter(col => col.header && col.id).map(col => ({value: col.id || "", label: col.header as string}))}
            setValue={(val) => setFilter(val as string)}
            value={filter}
            placeholder="Select column filter"
          />
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setPage(page - 1)}
            disabled={page == 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <span className="select-none">{page}</span>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setPage(page + 1)}
            disabled={pageSize > data.length}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}