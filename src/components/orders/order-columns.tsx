"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Order } from "@/types/order"
import { Button } from "@/components/ui/button"

export const orderColumns = (
  onEdit: (order: Order) => void,
  onDelete: (order: Order) => void
): ColumnDef<Order>[] => [
  {
    id: 'accountName',
    accessorKey: 'accountName',
    header: 'Account',
  },
  {
    id: 'salesmanName',
    accessorKey: 'salesmanName',
    header: 'Salesman',
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: 'Date',
    cell: row => {
      const date = new Date(row.getValue() as string | Date);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
  {
    id: 'totalSales',
    accessorKey: 'totalSales',
    header: 'Total Sales',
    cell: row => {
      const value = row.getValue() as number;
      return `PHP ${value.toFixed(2)}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className='space-x-2'>
          <Button onClick={() => onEdit(order)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(order)}>
            Delete
          </Button>
        </div>
      );
    },
  },
]
