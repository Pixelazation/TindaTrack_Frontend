"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Item } from '../../types/item'
import { Button } from '../ui/button';

export const itemColumns = (
  onEdit: (item: Item) => void,
  onDelete: (item: Item) => void
): ColumnDef<Item>[] => [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: 'itemCode',
    accessorKey: 'itemCode',
    header: 'Item Code',
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price (PHP)',
    cell: row =>  {
      const value = row.getValue() as number;
      return `PHP ${value.toFixed(2)}`;
    },
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: 'Description',
    cell: row => row.getValue() || '-',
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className='space-x-2'> 
          <Button onClick={() => onEdit(item)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(item)}>
            Delete
          </Button>
        </div>
      )
    },
  },
]