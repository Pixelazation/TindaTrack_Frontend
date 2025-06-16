import { LucidePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ItemForm from '../components/items/item-form';
import { fetchItems } from '../api/items';
import type { Item } from '../types/item';
import { DataTable } from '../components/ui/data-table';
import { itemColumns } from '../components/items/item-columns';

export default function Items() {
  const [openForm, setOpenForm] = useState<boolean>(false);
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

      <div className='flex flex-row items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-primary'>
          Items
        </h1>
        <Button onClick={handleAdd}>
          <LucidePlus /> Add Item
        </Button>
      </div>

      <DataTable columns={itemColumns(handleEdit)} data={items} />
      
    </div>
  )
}