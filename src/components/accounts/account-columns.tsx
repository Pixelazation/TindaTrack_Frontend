"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Account } from '../../types/account'
import { Button } from '../ui/button';

export const accountColumns = (
  onEdit: (account: Account) => void,
  onDelete: (account: Account) => void
): ColumnDef<Account>[] => [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: 'Address',
  },
  {
    id: 'municipalityName',
    accessorKey: 'municipalityName',
    header: 'Municipality',
  },
  {
    id: 'barangayName',
    accessorKey: 'barangayName',
    header: 'Barangay',
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original;
      return (
        <div className='space-x-2'> 
          <Button onClick={() => onEdit(account)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(account)}>
            Delete
          </Button>
        </div>
      )
    },
  },
]