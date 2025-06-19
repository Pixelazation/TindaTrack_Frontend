import { LucidePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, type JSX } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DataTable } from '../components/ui/data-table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTitle } from '../components/ui/alert-dialog';
import type { ColumnDef } from '@tanstack/react-table';
import type { FormProps } from '../interfaces/form';

interface Props<T extends { id: number }> {
  addForm: (props: FormProps<T>) => JSX.Element;
  deleteItem: (id: number) => Promise<void>;
  fetchItems: (page?: number, pageSize?: number, searchQuery?: string, filter?: string) => Promise<T[]>;
  columns: (onEdit: (item: T) => void, onDelete: (item: T) => void) => ColumnDef<T>[];
  title: string;
  itemName: string;
}

export default function DataManager<T extends { id: number }> (props: Props<T>) {
  const { addForm: AddForm, deleteItem, fetchItems, columns, title, itemName } = props;

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [items, setItems] = useState<T[]>([]);
  const [editItem, setEditItem] = useState<T | null>(null);

  const [query, setQuery]  = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  async function loadItems() {
    try {
      const data = await fetchItems(page, 10, query, filter);
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  }

  function handleAdd() {
    setEditItem(null);
    setOpenForm(true);
  }

  function handleEdit(item: T) {
    setEditItem(item);
    setOpenForm(true);
    console.log(item);
  }

  function handleDelete(item: T) {
    setEditItem(item);
    setOpenDeleteDialog(true);
  }

  async function handleConfirmDelete() {
    if (!editItem) return;
    try {
      await deleteItem(editItem.id);
      console.log(`${itemName} deleted: `, editItem);
      setOpenDeleteDialog(false);
      loadItems();
    } catch (error) {
      console.error(`Failed to delete ${itemName}:`, error);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!openForm)
      loadItems();
  }, [openForm, query, filter, page]);

  return (
    <div className='px-32 py-8'>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <AddForm closeForm={() => setOpenForm(false)} item={editItem} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure you want to delete this {itemName}?</AlertDialogTitle>
          <AlertDialogFooter className='space-x-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Yes, delete it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='flex flex-row items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold'>
          {title}
        </h1>
        <Button onClick={handleAdd}>
          <LucidePlus /><span className="capitalize">Add {itemName}</span>
        </Button>
      </div>

      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={items}
        filter={filter}
        setFilter={setFilter}
        page={page}
        pageSize={10}
        setPage={setPage}
        setQuery={setQuery}
      />
      
    </div>
  )
}