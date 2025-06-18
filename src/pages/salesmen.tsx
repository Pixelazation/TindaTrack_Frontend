import { useEffect, useState } from 'react';
import type { Salesman } from '../types/salesman';
import { deleteSalesman, fetchSalesmen } from '../api/salesmen';
import { Button } from '../components/ui/button';
import { LucidePlus } from 'lucide-react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTitle } from '../components/ui/alert-dialog';
import SalesmanForm from '../components/salesmen/salesman-form';
import { DataTable } from '../components/ui/data-table';
import { salesmanColumns } from '../components/salesmen/salesman-columns';

export default function Salesmen() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [salesmen, setSalesmen] = useState<Salesman[]>([]);
  const [editSalesman, setEditSalesman] = useState<Salesman | null>(null);

  const [filter, setFilter] = useState<string>("");

  async function loadSalesmen() {
    try {
      const data = await fetchSalesmen();
      setSalesmen(data);
    } catch (error) {
      console.error("Failed to fetch salesmen:", error);
    }
  }

  function handleAdd() {
    setEditSalesman(null);
    setOpenForm(true);
  }

  function handleEdit(salesman: Salesman) {
    setEditSalesman(salesman);
    setOpenForm(true);
  }

  function handleDelete(salesman: Salesman) {
    setEditSalesman(salesman);
    setOpenDeleteDialog(true);
  }

  async function handleConfirmDelete() {
    if (!editSalesman) return;
    try {
      await deleteSalesman(editSalesman.id);
      console.log("Salesman deleted:", editSalesman);
      setOpenDeleteDialog(false);
      loadSalesmen();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  useEffect(() => {
    loadSalesmen();
  }, []);

  useEffect(() => {
    if (!openForm)
      loadSalesmen();
  }, [openForm]);

  return (
    <div className='px-32 py-8'>
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <SalesmanForm closeForm={() => setOpenForm(false)} salesman={editSalesman}/>
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
        <h1 className='text-3xl font-bold'>
          Salesmen
        </h1>
        <Button onClick={handleAdd}>
          <LucidePlus /> Add Salesman
        </Button>
      </div>

      <DataTable 
        columns={salesmanColumns(handleEdit, handleDelete)} 
        data={salesmen} 
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  )
}