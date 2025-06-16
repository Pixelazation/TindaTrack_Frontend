"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Item } from '../../types/item'
import { Button } from '../ui/button';

export const itemColumns = (onEdit: (item: Item) => void): ColumnDef<Item>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
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
    accessorKey: 'description',
    header: 'Description',
    cell: row => row.getValue() || '-',
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Button onClick={() => onEdit(item)}>
          Edit
        </Button>
      )
    },
  },
]