"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from '../ui/button';
import type { Salesman } from '../../types/salesman';

export const salesmanColumns = (
  onEdit: (salesman: Salesman) => void,
  onDelete: (salesman: Salesman) => void
): ColumnDef<Salesman>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className='flex justify-end space-x-2'> 
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