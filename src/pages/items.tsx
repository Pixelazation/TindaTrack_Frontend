import { LucidePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ItemForm from '../components/items/item-form';

export default function Items() {
  const [openForm, setOpenForm] = useState<boolean>(false);

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
      
    </div>
  )
}