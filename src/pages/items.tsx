import { LucidePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ItemForm from '../components/items/item-form';
import { deleteItem, fetchItems } from '../api/items';
import type { Item } from '../types/item';
import { DataTable } from '../components/ui/data-table';
import { itemColumns } from '../components/items/item-columns';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogTitle } from '../components/ui/alert-dialog';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';

export default function Items() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [items, setItems] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);

  async function loadItems() {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  }

  function handleAdd() {
    setEditItem(null);
    setOpenForm(true);
  }

  function handleEdit(item: Item) {
    setEditItem(item);
    setOpenForm(true);
  }

  function handleDelete(item: Item) {
    setEditItem(item);
    setOpenDeleteDialog(true);
  }

  async function handleConfirmDelete() {
    if (!editItem) return;
    try {
      await deleteItem(editItem.id);
      console.log("Item deleted:", editItem);
      setOpenDeleteDialog(false);
      loadItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!openForm)
      loadItems();
  }, [openForm]);

  return (
    <div className='px-32 py-8'>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <ItemForm closeForm={() => setOpenForm(false)} item={editItem}/>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
          <AlertDialogFooter className='space-x-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Yes, delete it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

      </AlertDialog>

      <div className='flex flex-row items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-primary'>
          Items
        </h1>
        <Button onClick={handleAdd}>
          <LucidePlus /> Add Item
        </Button>
      </div>

      <DataTable columns={itemColumns(handleEdit, handleDelete)} data={items} />
      
    </div>
  )
}