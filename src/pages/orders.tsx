import { LucidePlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import OrderForm from '../components/orders/order-form';

export default function Orders() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  // const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  return (
    <div className='px-32 py-8'>

      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <OrderForm closeForm={() => setOpenForm(false)} order={null}/>
        </DialogContent>
      </Dialog>

      {/* <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
          <AlertDialogFooter className='space-x-2'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Yes, delete it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      <div className='flex flex-row items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-primary'>
          Orders
        </h1>
        <Button onClick={() => setOpenForm(true)}>
          <LucidePlus /> Add Order
        </Button>
      </div>

      {/* <DataTable columns={itemColumns(handleEdit, handleDelete)} data={items} /> */}
      
    </div>
  )
}