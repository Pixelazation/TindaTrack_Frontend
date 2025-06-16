import { LucidePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ItemForm from '../components/items/item-form';
import { fetchItems } from '../api/items';
import type { Item } from '../types/item';

export default function Items() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    }
    loadItems();
  });

  return (
    <div className='px-32 py-8'>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <ItemForm closeForm={() => setOpenForm(false)}/>
        </DialogContent>
      </Dialog>

      <div className='flex flex-row items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-primary'>
          Items
        </h1>
        <Button onClick={() => setOpenForm(true)}>
          <LucidePlus /> Add Item
        </Button>
      </div>

      {items.map((item) => (
        <div key={item.id} className='mb-4 p-4 border rounded-lg shadow-sm'>
          <h2 className='text-xl font-semibold'>{item.name}</h2>
          <p className='text-gray-600'>Code: {item.itemCode}</p>
          <p className='text-gray-600'>Price: PHP {item.unitPrice.toFixed(2)}</p>
          <p className='text-gray-600'>Description: {item.description}</p>
        </div>
      ))}
      
    </div>
  )
}