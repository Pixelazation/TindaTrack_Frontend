import { LucidePlus } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Orders() {
  return (
    <div className='px-32 py-8'>

      {/* <Dialog open={openForm} onOpenChange={setOpenForm}>
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
      </AlertDialog> */}

      <div className='flex flex-row items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-primary'>
          Orders
        </h1>
        <Button>
          <LucidePlus /> Add Order
        </Button>
      </div>

      {/* <DataTable columns={itemColumns(handleEdit, handleDelete)} data={items} /> */}
      
    </div>
  )
}